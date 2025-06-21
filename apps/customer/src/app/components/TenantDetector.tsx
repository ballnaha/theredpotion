'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

interface TenantDetectorProps {
  children: ReactNode;
  onTenantDetected?: (tenantId: string | null) => void;
}

// Client-side only tenant detection
const detectTenantFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const urlParams = new URLSearchParams(window.location.search);
  
  const TENANT_CONFIGS = ['restaurant1', 'restaurant2', 'restaurant3'];
  
  // Method 1: Subdomain detection
  if (hostname !== 'localhost' && hostname !== '127.0.0.1' && hostname !== 'theredpotion.com') {
    const subdomain = hostname.split('.')[0];
    if (TENANT_CONFIGS.includes(subdomain)) {
      return subdomain;
    }
  }
  
  // Method 2: Path-based detection
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0) {
    const potentialTenant = pathSegments[0];
    if (TENANT_CONFIGS.includes(potentialTenant)) {
      return potentialTenant;
    }
  }
  
  // Method 3: URL parameter
  const tenantParam = urlParams.get('tenant');
  if (tenantParam && TENANT_CONFIGS.includes(tenantParam)) {
    return tenantParam;
  }
  
  // Default for development
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'theredpotion.com') {
    return 'restaurant1';
  }
  
  return null;
};

export default function TenantDetector({ children, onTenantDetected }: TenantDetectorProps) {
  const [detectedTenant, setDetectedTenant] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const tenant = detectTenantFromUrl();
      setDetectedTenant(tenant);
      onTenantDetected?.(tenant);
    }
  }, [isClient, searchParams, pathname, onTenantDetected]);

  // Don't render children until client-side
  if (!isClient) {
    return null;
  }

  return <>{children}</>;
} 