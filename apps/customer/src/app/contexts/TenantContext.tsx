'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TenantConfig, getTenantConfig } from '../utils/tenant';
import TenantDetector from '../components/TenantDetector';

interface TenantContextType {
  tenant: TenantConfig | null;
  tenantId: string | null;
  isLoading: boolean;
  refreshTenant: () => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

interface TenantProviderProps {
  children: ReactNode;
}



export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleTenantDetected = async (detectedTenantId: string | null) => {
    if (!detectedTenantId) {
      setTenantId(null);
      setTenant(null);
      setIsLoading(false);
      return;
    }

    try {
      console.log('🏪 Fetching tenant config for:', detectedTenantId);
      
      // Fetch tenant configuration from API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(`/api/liff/config?tenantId=${detectedTenantId}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('🏪 API Response:', result);
      
      if (result.success) {
        const apiConfig = result.data;
        
        // Convert API response to TenantConfig format
        const tenantConfig: TenantConfig = {
          id: apiConfig.tenantId,
          name: apiConfig.name,
          subdomain: apiConfig.tenantId,
          domain: apiConfig.domain || `${apiConfig.tenantId}.theredpotion.com`,
          liffId: apiConfig.liffId,
          theme: {
            primaryColor: apiConfig.theme.primaryColor,
            logo: apiConfig.theme.logo,
            brandName: apiConfig.name
          },
          settings: {
            deliveryFee: 39,
            freeDeliveryThreshold: 200,
            serviceFeeRate: 0.02,
            currency: 'THB'
          }
        };
        
        console.log('🏪 Tenant config from API:', tenantConfig);
        setTenantId(detectedTenantId);
        setTenant(tenantConfig);
      } else {
        console.error('Failed to fetch tenant config:', result.message);
        // Fallback to static config
        const tenantConfig = getTenantConfig(detectedTenantId);
        setTenantId(detectedTenantId);
        setTenant(tenantConfig);
      }
    } catch (error) {
      console.error('Error fetching tenant config:', error);
      // Fallback to static config
      const tenantConfig = getTenantConfig(detectedTenantId);
      setTenantId(detectedTenantId);
      setTenant(tenantConfig);
    }
    
    setIsLoading(false);
  };

  const refreshTenant = () => {
    // This will be handled by TenantDetector
    setIsLoading(true);
  };

  const value: TenantContextType = {
    tenant,
    tenantId,
    isLoading,
    refreshTenant
  };

  return (
    <TenantContext.Provider value={value}>
      <TenantDetector onTenantDetected={handleTenantDetected}>
        {children}
      </TenantDetector>
    </TenantContext.Provider>
  );
};

export const useTenant = (): TenantContextType => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

// Hook for getting tenant-specific settings
export const useTenantSettings = () => {
  const { tenant } = useTenant();
  
  return {
    deliveryFee: tenant?.settings.deliveryFee || 39,
    freeDeliveryThreshold: tenant?.settings.freeDeliveryThreshold || 200,
    serviceFeeRate: tenant?.settings.serviceFeeRate || 0.02,
    currency: tenant?.settings.currency || 'THB',
    primaryColor: tenant?.theme.primaryColor || '#10b981',
    brandName: tenant?.theme.brandName || 'The Red Potion',
    logo: tenant?.theme.logo || '/images/logo.png'
  };
};

// Hook for tenant-aware API calls
export const useTenantApi = () => {
  const { tenantId } = useTenant();
  
  const getApiUrl = (endpoint: string) => {
    if (!tenantId) return `/api${endpoint}`;
    return `/api/tenant/${tenantId}${endpoint}`;
  };
  
  return { getApiUrl };
}; 