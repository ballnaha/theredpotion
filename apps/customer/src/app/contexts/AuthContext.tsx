'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTenant } from './TenantContext';

// Types
interface LineProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
  email?: string;
}

interface User {
  id: string;
  lineId: string;
  displayName: string;
  email?: string;
  pictureUrl?: string;
  role: string;
  loginProvider: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Use existing LIFF types from utils/liff.ts

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { tenant, tenantId } = useTenant();

  // Initialize LIFF with tenant-specific LIFF ID
  const initializeLIFF = async (): Promise<boolean> => {
    try {
      // Check if LIFF is available
      if (typeof window === 'undefined' || !window.liff) {
        console.log('LIFF SDK not available');
        return false;
      }

      // Wait for tenant to be loaded
      if (!tenant || !tenant.liffId) {
        console.log('Waiting for tenant configuration...', { tenant, tenantId });
        return false;
      }

      // Get LIFF ID for current tenant
      const liffId = tenant.liffId;
      if (!liffId) {
        console.log('No LIFF ID configured for tenant:', tenantId);
        return false;
      }

      // Check if LIFF is already initialized with the same LIFF ID
      if (window.liff.isReady && window.liff.isReady()) {
        console.log('LIFF already initialized');
        return true;
      }

      // Initialize LIFF with tenant-specific LIFF ID
      console.log(`🔥 Initializing LIFF for tenant: ${tenantId} with LIFF ID: ${liffId}`);
      await window.liff.init({ liffId });
      console.log('✅ LIFF initialized successfully for tenant:', tenantId);
      return true;
    } catch (error) {
      console.error('❌ LIFF initialization failed:', error);
      return false;
    }
  };

  // Check authentication status
  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);

      // Skip if tenant is not loaded yet
      if (!tenant || !tenant.liffId) {
        console.log('Skipping auth check - tenant not ready');
        setIsLoading(false);
        return;
      }

      // Try to initialize LIFF first
      const liffInitialized = await initializeLIFF();
      
             if (liffInitialized && window.liff && window.liff.isLoggedIn()) {
         // User is logged in with LINE
         const profile = await window.liff.getProfile();
         const idToken = window.liff.getIDToken();

        // Send LINE profile to backend for authentication
        const response = await fetch('/api/auth/line', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lineId: profile.userId,
            lineProfile: {
              displayName: profile.displayName,
              email: profile.email,
              pictureUrl: profile.pictureUrl,
            },
            idToken,
            tenantId,
          }),
        });

        const result = await response.json();

        if (result.success) {
          const userData: User = {
            id: result.data.user.id,
            lineId: result.data.user.lineId,
            displayName: result.data.user.lineDisplayName || profile.displayName,
            email: result.data.user.email || profile.email,
            pictureUrl: result.data.user.linePictureUrl || profile.pictureUrl,
            role: result.data.user.role,
            loginProvider: result.data.user.loginProvider,
          };

          setUser(userData);
          setIsAuthenticated(true);

          // Store token for API calls
          localStorage.setItem('auth_token', result.data.token);
        } else {
          console.error('Backend authentication failed:', result.message);
          setIsAuthenticated(false);
        }
      } else {
        // Not logged in or LIFF not available
        setIsAuthenticated(false);
        
        // Check if we have stored token (fallback)
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) {
          try {
            const response = await fetch('/api/auth/me', {
              headers: {
                'Authorization': `Bearer ${storedToken}`,
              },
            });

            const result = await response.json();
            if (result.success) {
              const userData: User = {
                id: result.data.user.id,
                lineId: result.data.user.lineId,
                displayName: result.data.user.lineDisplayName || result.data.user.firstName,
                email: result.data.user.email,
                pictureUrl: result.data.user.linePictureUrl,
                role: result.data.user.role,
                loginProvider: result.data.user.loginProvider,
              };

              setUser(userData);
              setIsAuthenticated(true);
            } else {
              localStorage.removeItem('auth_token');
            }
          } catch (error) {
            console.error('Token validation failed:', error);
            localStorage.removeItem('auth_token');
          }
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (): Promise<void> => {
    try {
      const liffInitialized = await initializeLIFF();
      
             if (liffInitialized && window.liff) {
         if (!window.liff.isLoggedIn()) {
           // Redirect to LINE login
           window.liff.login();
        } else {
          // Already logged in, just refresh user data
          await checkAuthStatus();
        }
      } else {
        // LIFF not available, show error or fallback
        alert('LINE Login ไม่พร้อมใช้งาน กรุณาเปิดผ่าน LINE App');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  // Logout function
  const logout = (): void => {
    try {
      // Clear local storage
      localStorage.removeItem('auth_token');
      
      // Clear state
      setUser(null);
      setIsAuthenticated(false);

      // Logout from LIFF if available
      if (typeof window !== 'undefined' && window.liff && window.liff.isLoggedIn()) {
        window.liff.logout();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Refresh user data
  const refreshUser = async (): Promise<void> => {
    await checkAuthStatus();
  };

  // Initialize auth on mount and tenant change
  useEffect(() => {
    // Only run when tenant is fully loaded with LIFF ID
    if (tenant && tenant.liffId) {
      checkAuthStatus();
    }
  }, [tenant, tenantId]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 