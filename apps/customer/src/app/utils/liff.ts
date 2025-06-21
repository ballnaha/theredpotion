// @ts-nocheck
// LIFF Environment Detection and Utilities

export const isInLiffEnvironment = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent;
  const href = window.location.href;
  const hostname = window.location.hostname;
  
  // Primary LIFF indicators
  const isLiffUrl = href.includes('liff://') || href.includes('liff-');
  const isLiffHostname = hostname.includes('liff');
  
  // LINE browser indicators (less strict)
  const isLineUA = userAgent.includes('Line') || userAgent.includes('LINE');
  
  console.log('LIFF Detection:', {
    userAgent,
    href,
    hostname,
    isLiffUrl,
    isLiffHostname,
    isLineUA
  });
  
  // Only consider it LIFF if we have strong indicators
  return isLiffUrl || isLiffHostname;
};

export const waitForLiffReady = async (timeout: number = 3000): Promise<boolean> => {
  if (!isInLiffEnvironment()) return true;
  
  return new Promise((resolve) => {
    const startTime = Date.now();
    let attempts = 0;
    const maxAttempts = 30; // 3 seconds / 100ms = 30 attempts
    
    const checkReady = () => {
      attempts++;
      
      // Timeout or max attempts reached - just proceed
      if (Date.now() - startTime > timeout || attempts >= maxAttempts) {
        console.log('LIFF timeout reached, proceeding anyway');
        resolve(true);
        return;
      }
      
              // If LIFF exists, try to check if it's ready
        if (typeof window !== 'undefined' && window.liff) {
          try {
            // Try different ways to check if LIFF is ready
            if (typeof window.liff.isLoggedIn === 'function') {
              resolve(true);
              return;
            }
            if (window.liff.ready && typeof window.liff.ready === 'object') {
              resolve(true);
              return;
            }
          } catch (error) {
            // LIFF might not be fully ready yet, continue checking
          }
        }
      
      // If we're in LIFF but no LIFF object yet, wait a bit more
      // But if too many attempts, just proceed
      if (attempts < 10) {
        setTimeout(checkReady, 100);
      } else {
        // After 1 second, just proceed regardless
        console.log('LIFF not detected after 1s, proceeding anyway');
        resolve(true);
      }
    };
    
    checkReady();
  });
};

export const getLiffDelay = (): number => {
  return isInLiffEnvironment() ? 500 : 0; // Reduced from 1000ms to 500ms
};

// Safe localStorage access for LIFF
export const safeLSGetItem = (key: string): string | null => {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  } catch (error) {
    console.warn('localStorage.getItem failed:', error);
    return null;
  }
};

export const safeLSSetItem = (key: string, value: string): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn('localStorage.setItem failed:', error);
    return false;
  }
};

export const safeLSRemoveItem = (key: string): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn('localStorage.removeItem failed:', error);
    return false;
  }
};

// Type declarations
declare global {
  interface Window {
    liff?: {
      isLoggedIn: () => boolean;
      init: (config: any) => Promise<void>;
      ready: Promise<void>;
      [key: string]: any;
    };
  }
}

// 📱 LINE LIFF Utility Functions
// Multi-tenant LIFF management

import { getTenantLiffId, detectTenant } from './tenant';

// LIFF Types
export interface LiffProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
  email?: string;
}

export interface LiffContext {
  type: 'utou' | 'room' | 'group' | 'square_chat';
  viewType: 'compact' | 'tall' | 'full';
  userId?: string;
  utouId?: string;
  roomId?: string;
  groupId?: string;
  squareChatId?: string;
}

// Use existing LIFF types from the global window object

// Check if LIFF is available
export const isLiffAvailable = (): boolean => {
  return typeof window !== 'undefined' && !!window.liff;
};

// Initialize LIFF for current tenant
export const initializeTenantLiff = async (tenantId?: string): Promise<boolean> => {
  try {
    if (!isLiffAvailable() || !window.liff) {
      console.warn('LIFF SDK not available');
      return false;
    }

    const currentTenant = tenantId || detectTenant();
    const liffId = getTenantLiffId(currentTenant || '');

    if (!liffId) {
      console.error('No LIFF ID found for tenant:', currentTenant);
      return false;
    }

    // Check if already initialized
    if (window.liff.isReady && window.liff.isReady()) {
      console.log('LIFF already initialized');
      return true;
    }

    console.log(`🚀 Initializing LIFF for tenant: ${currentTenant}`);
    console.log(`📱 LIFF ID: ${liffId}`);

    await window.liff.init({ liffId });
    
    console.log('✅ LIFF initialized successfully');
    return true;

  } catch (error) {
    console.error('❌ LIFF initialization failed:', error);
    return false;
  }
};

// Get user profile from LIFF
export const getLiffProfile = async (): Promise<LiffProfile | null> => {
  try {
    if (!isLiffAvailable() || !window.liff!.isLoggedIn()) {
      return null;
    }

    const profile = await window.liff!.getProfile();
    return profile;

  } catch (error) {
    console.error('Failed to get LIFF profile:', error);
    return null;
  }
};

// Check if user is logged in via LIFF
export const isLiffLoggedIn = (): boolean => {
  if (!isLiffAvailable()) return false;
  return window.liff!.isLoggedIn();
};

// Login via LIFF
export const liffLogin = async (redirectUri?: string): Promise<void> => {
  try {
    if (!isLiffAvailable()) {
      throw new Error('LIFF SDK not available');
    }

    // Initialize LIFF first if not ready
    if (!window.liff.isReady()) {
      const initialized = await initializeTenantLiff();
      if (!initialized) {
        throw new Error('Failed to initialize LIFF');
      }
    }

    // Perform login
    window.liff.login({ redirectUri });

  } catch (error) {
    console.error('LIFF login failed:', error);
    throw error;
  }
};

// Logout from LIFF
export const liffLogout = (): void => {
  try {
    if (isLiffAvailable() && window.liff.isLoggedIn()) {
      window.liff.logout();
    }
  } catch (error) {
    console.error('LIFF logout failed:', error);
  }
};

// Get LIFF context (chat type, etc.)
export const getLiffContext = (): LiffContext | null => {
  try {
    if (!isLiffAvailable()) return null;
    return window.liff.getContext();
  } catch (error) {
    console.error('Failed to get LIFF context:', error);
    return null;
  }
};

// Check if running in LINE client
export const isInLineClient = (): boolean => {
  if (!isLiffAvailable()) return false;
  return window.liff.isInClient();
};

// Open external URL
export const openExternalUrl = (url: string): void => {
  try {
    if (isLiffAvailable()) {
      window.liff.openWindow({ url, external: true });
    } else {
      window.open(url, '_blank');
    }
  } catch (error) {
    console.error('Failed to open external URL:', error);
    window.open(url, '_blank');
  }
};

// Close LIFF window
export const closeLiffWindow = (): void => {
  try {
    if (isLiffAvailable()) {
      window.liff.closeWindow();
    }
  } catch (error) {
    console.error('Failed to close LIFF window:', error);
  }
};

// Send LINE messages
export const sendLineMessage = async (messages: any[]): Promise<boolean> => {
  try {
    if (!isLiffAvailable() || !window.liff.isLoggedIn()) {
      console.warn('LIFF not available or user not logged in');
      return false;
    }

    await window.liff.sendMessages(messages);
    return true;

  } catch (error) {
    console.error('Failed to send LINE message:', error);
    return false;
  }
};

// QR Code scanner
export const scanQRCode = async (): Promise<string | null> => {
  try {
    if (!isLiffAvailable()) {
      console.warn('LIFF not available');
      return null;
    }

    const result = await window.liff.scanCode();
    return result.value;

  } catch (error) {
    console.error('QR scan failed:', error);
    return null;
  }
};

// Get ID Token for authentication
export const getLiffIdToken = (): string | null => {
  try {
    if (!isLiffAvailable() || !window.liff.isLoggedIn()) {
      return null;
    }

    return window.liff.getIDToken();

  } catch (error) {
    console.error('Failed to get ID token:', error);
    return null;
  }
};

// Get Access Token
export const getLiffAccessToken = (): string | null => {
  try {
    if (!isLiffAvailable() || !window.liff.isLoggedIn()) {
      return null;
    }

    return window.liff.getAccessToken();

  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
};

// Validate LIFF environment
export const validateLiffEnvironment = (): {
  isValid: boolean;
  issues: string[];
} => {
  const issues: string[] = [];

  // Check LIFF SDK availability
  if (!isLiffAvailable()) {
    issues.push('LIFF SDK not loaded');
  }

  // Check tenant configuration
  const tenantId = detectTenant();
  if (!tenantId) {
    issues.push('No tenant detected');
  }

  // Check LIFF ID configuration
  const liffId = getTenantLiffId(tenantId);
  if (!liffId) {
    issues.push('No LIFF ID configured for tenant');
  }

  return {
    isValid: issues.length === 0,
    issues
  };
};

// Debug LIFF status
export const debugLiffStatus = (): void => {
  console.log('🔍 LIFF Debug Information:');
  console.log('========================');
  
  const validation = validateLiffEnvironment();
  console.log('Valid:', validation.isValid);
  
  if (validation.issues.length > 0) {
    console.log('Issues:', validation.issues);
  }

  if (isLiffAvailable()) {
    console.log('LIFF Ready:', window.liff.isReady());
    console.log('Logged In:', window.liff.isLoggedIn());
    console.log('In Client:', window.liff.isInClient());
    
    const context = getLiffContext();
    if (context) {
      console.log('Context:', context);
    }
  }

  const tenantId = detectTenant();
  const liffId = getTenantLiffId(tenantId);
  console.log('Tenant:', tenantId);
  console.log('LIFF ID:', liffId);
  console.log('========================');
};

export default {
  initializeTenantLiff,
  getLiffProfile,
  isLiffLoggedIn,
  liffLogin,
  liffLogout,
  getLiffContext,
  isInLineClient,
  openExternalUrl,
  closeLiffWindow,
  sendLineMessage,
  scanQRCode,
  getLiffIdToken,
  getLiffAccessToken,
  validateLiffEnvironment,
  debugLiffStatus,
}; 