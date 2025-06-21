// Multi-Tenant Management System

export interface TenantConfig {
  id: string;
  name: string;
  subdomain: string;
  domain: string;
  liffId?: string;
  theme: {
    primaryColor: string;
    logo: string;
    brandName: string;
  };
  settings: {
    deliveryFee: number;
    freeDeliveryThreshold: number;
    serviceFeeRate: number;
    currency: string;
  };
}

// Mock tenant configurations (จริงๆ จะดึงจาก database)
const TENANT_CONFIGS: { [key: string]: TenantConfig } = {
  'restaurant1': {
    id: 'restaurant1',
    name: 'Green Garden Organic',
    subdomain: 'restaurant1',
    domain: 'theredpotion.treetelu.com',
    liffId: '2007609360-3Z0L8Ekg', // 🔥 LIFF ID for development
    theme: {
      primaryColor: '#10b981',
      logo: '/images/restaurant1-logo.png',
      brandName: 'Green Garden'
    },
    settings: {
      deliveryFee: 39,
      freeDeliveryThreshold: 200,
      serviceFeeRate: 0.02,
      currency: 'THB'
    }
  },
  'restaurant2': {
    id: 'restaurant2',
    name: 'Zen Healthy Treats',
    subdomain: 'restaurant2',
    domain: 'theredpotion.treetelu.com',
    liffId: '2007609360-3Z0L8Ekg', // 🔥 Same LIFF ID for all restaurants
    theme: {
      primaryColor: '#7c3aed',
      logo: '/images/restaurant2-logo.png',
      brandName: 'Zen Treats'
    },
    settings: {
      deliveryFee: 49,
      freeDeliveryThreshold: 250,
      serviceFeeRate: 0.025,
      currency: 'THB'
    }
  },
  'restaurant3': {
    id: 'restaurant3',
    name: 'Fresh Bowl Co.',
    subdomain: 'restaurant3',
    domain: 'theredpotion.treetelu.com',
    liffId: '2007609360-3Z0L8Ekg', // 🔥 Same LIFF ID for all restaurants
    theme: {
      primaryColor: '#f59e0b',
      logo: '/images/restaurant3-logo.png',
      brandName: 'Fresh Bowl'
    },
    settings: {
      deliveryFee: 35,
      freeDeliveryThreshold: 180,
      serviceFeeRate: 0.015,
      currency: 'THB'
    }
  }
};

// Detect tenant from current URL
export const detectTenant = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  
  // Method 1: Domain detection for theredpotion.treetelu.com
  if (hostname === 'theredpotion.treetelu.com') {
    console.log('Tenant detected from domain: restaurant1 (default)');
    return 'restaurant1';
  }
  
  // Method 1b: Subdomain detection (fallback)
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    const subdomain = hostname.split('.')[0];
    if (TENANT_CONFIGS[subdomain]) {
      console.log('Tenant detected from subdomain:', subdomain);
      return subdomain;
    }
  }
  
  // Method 2: Path-based detection
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0) {
    const potentialTenant = pathSegments[0];
    if (TENANT_CONFIGS[potentialTenant]) {
      console.log('Tenant detected from path:', potentialTenant);
      return potentialTenant;
    }
  }
  
  // Method 3: URL parameter (for development/testing)
  const urlParams = new URLSearchParams(window.location.search);
  const tenantParam = urlParams.get('tenant');
  if (tenantParam && TENANT_CONFIGS[tenantParam]) {
    console.log('Tenant detected from parameter:', tenantParam);
    return tenantParam;
  }
  
  // Default tenant for development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    console.log('Development mode, using default tenant');
    return 'restaurant1';
  }
  
  return null;
};

// Get tenant configuration
export const getTenantConfig = (tenantId?: string): TenantConfig | null => {
  const tenant = tenantId || detectTenant();
  if (!tenant) return null;
  
  return TENANT_CONFIGS[tenant] || null;
};

// Get current tenant configuration
export const getCurrentTenant = (): TenantConfig | null => {
  return getTenantConfig();
};

// Check if current request is for a specific tenant
export const isTenantRequest = (): boolean => {
  return detectTenant() !== null;
};

// Get tenant-specific API base URL
export const getTenantApiUrl = (tenantId?: string): string => {
  const tenant = tenantId || detectTenant();
  if (!tenant) return '/api';
  
  return `/api/tenant/${tenant}`;
};

// Get tenant-specific storage key
export const getTenantStorageKey = (key: string, tenantId?: string): string => {
  const tenant = tenantId || detectTenant();
  if (!tenant) return key;
  
  return `${tenant}_${key}`;
};

// Tenant-aware localStorage
export const getTenantLSItem = (key: string): string | null => {
  try {
    if (typeof window === 'undefined') return null;
    const tenantKey = getTenantStorageKey(key);
    return localStorage.getItem(tenantKey);
  } catch (error) {
    console.warn('getTenantLSItem failed:', error);
    return null;
  }
};

export const setTenantLSItem = (key: string, value: string): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const tenantKey = getTenantStorageKey(key);
    localStorage.setItem(tenantKey, value);
    return true;
  } catch (error) {
    console.warn('setTenantLSItem failed:', error);
    return false;
  }
};

export const removeTenantLSItem = (key: string): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const tenantKey = getTenantStorageKey(key);
    localStorage.removeItem(tenantKey);
    return true;
  } catch (error) {
    console.warn('removeTenantLSItem failed:', error);
    return false;
  }
};

// Get all available tenants (for admin)
export const getAllTenants = (): TenantConfig[] => {
  return Object.values(TENANT_CONFIGS);
};

// Validate tenant exists
export const validateTenant = (tenantId: string): boolean => {
  return tenantId in TENANT_CONFIGS;
};

// Generate tenant URL
export const generateTenantUrl = (tenantId: string, path: string = ''): string => {
  const config = TENANT_CONFIGS[tenantId];
  if (!config) return '';
  
  const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
  return `${protocol}//${config.domain}${path}`;
};

// LINE LIFF integration
export const getTenantLiffId = (tenantId?: string): string | null => {
  const tenant = tenantId || detectTenant();
  if (!tenant) return null;
  
  const config = TENANT_CONFIGS[tenant];
  return config?.liffId || null;
};

// Check if current LIFF matches tenant
export const validateTenantLiff = (): boolean => {
  const currentTenant = detectTenant();
  if (!currentTenant) return true; // Allow if no tenant detected
  
  const expectedLiffId = getTenantLiffId(currentTenant);
  if (!expectedLiffId) return true; // Allow if no LIFF configured
  
  // In real implementation, you would check against actual LIFF context
  // For now, just return true
  return true;
}; 