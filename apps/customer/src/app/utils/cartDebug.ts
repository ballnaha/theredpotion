// Cart Debug Utility for Multi-Tenant System

export const debugCart = () => {
  if (typeof window === 'undefined') return;
  
  console.group('🛒 Cart Debug Information');
  
  // Check all localStorage keys
  const allKeys = Object.keys(localStorage);
  const cartKeys = allKeys.filter(key => key.includes('cart'));
  
  console.log('📦 All Cart-related localStorage keys:', cartKeys);
  
  // Check tenant-specific cart data
  const tenants = ['restaurant1', 'restaurant2', 'restaurant3'];
  
  tenants.forEach(tenant => {
    const cartKey = `${tenant}_theredpotion_cart`;
    const metadataKey = `${tenant}_theredpotion_cart_metadata`;
    
    const cartData = localStorage.getItem(cartKey);
    const metadataData = localStorage.getItem(metadataKey);
    
    if (cartData || metadataData) {
      console.group(`🏪 ${tenant.toUpperCase()} Cart Data:`);
      if (cartData) {
        console.log('Cart:', JSON.parse(cartData));
      }
      if (metadataData) {
        console.log('Metadata:', JSON.parse(metadataData));
      }
      console.groupEnd();
    }
  });
  
  // Check current URL and tenant detection
  console.log('🌐 Current URL:', window.location.href);
  console.log('🏷️ URL Params:', Object.fromEntries(new URLSearchParams(window.location.search)));
  
  console.groupEnd();
};

export const clearAllCarts = () => {
  if (typeof window === 'undefined') return;
  
  const tenants = ['restaurant1', 'restaurant2', 'restaurant3'];
  
  tenants.forEach(tenant => {
    const cartKey = `${tenant}_theredpotion_cart`;
    const metadataKey = `${tenant}_theredpotion_cart_metadata`;
    
    localStorage.removeItem(cartKey);
    localStorage.removeItem(metadataKey);
  });
  
  // Also clear old format
  localStorage.removeItem('theredpotion_cart');
  localStorage.removeItem('theredpotion_cart_metadata');
  
  console.log('🧹 All carts cleared!');
};

export const switchTenant = (tenantId: string) => {
  if (typeof window === 'undefined') return;
  
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('tenant', tenantId);
  
  window.location.href = currentUrl.toString();
};

// Expose debug functions to window for easy access in browser console
if (typeof window !== 'undefined') {
  (window as any).debugCart = debugCart;
  (window as any).clearAllCarts = clearAllCarts;
  (window as any).switchTenant = switchTenant;
} 