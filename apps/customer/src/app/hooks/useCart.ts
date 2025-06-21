import { useState, useEffect, useCallback } from 'react';
import { isInLiffEnvironment, getLiffDelay, safeLSGetItem, safeLSSetItem, safeLSRemoveItem } from '../utils/liff';
import { getTenantLSItem, setTenantLSItem, removeTenantLSItem } from '../utils/tenant';

// Types
interface CartItem {
  productId: string;
  quantity: number;
  addOns: { [key: string]: boolean };
  specialInstructions: string;
  basePrice: number;
  itemName: string;
}

interface CartState {
  [cartKey: string]: number;
}

interface CartMetadata {
  [cartKey: string]: {
    productId: string;
    addOns: { [key: string]: boolean };
    specialInstructions: string;
    basePrice: number;
    itemName: string;
  };
}

// localStorage keys
const CART_STORAGE_KEY = 'theredpotion_cart';
const CART_METADATA_STORAGE_KEY = 'theredpotion_cart_metadata';

export const useCart = () => {
  const [cart, setCart] = useState<CartState>({});
  const [cartMetadata, setCartMetadata] = useState<CartMetadata>({});
  const [cartCount, setCartCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Generate unique cart key
  const generateCartKey = useCallback((
    productId: string, 
    addOns: { [key: string]: boolean }, 
    specialInstructions: string
  ) => {
    const addOnKeys = Object.keys(addOns).filter(key => addOns[key]).sort();
    const addOnString = addOnKeys.join(',');
    const instructionsKey = specialInstructions.trim().toLowerCase().replace(/\s+/g, '_');
    return `${productId}_${addOnString}_${instructionsKey}`;
  }, []);

  // Set mounted flag first with LIFF consideration
  useEffect(() => {
    const delay = getLiffDelay();
    
    if (delay > 0) {
      // In LIFF environment, wait for everything to be ready
      setTimeout(() => {
        setIsMounted(true);
      }, delay);
    } else {
      // Normal browser
      setIsMounted(true);
    }
  }, []);

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    if (!isMounted) return;
    
    try {
      // Try tenant-aware storage first, fallback to regular storage
      let savedCart = getTenantLSItem(CART_STORAGE_KEY);
      let savedMetadata = getTenantLSItem(CART_METADATA_STORAGE_KEY);
      
      if (!savedCart) {
        savedCart = safeLSGetItem(CART_STORAGE_KEY);
      }
      if (!savedMetadata) {
        savedMetadata = safeLSGetItem(CART_METADATA_STORAGE_KEY);
      }

      if (savedCart) {
        const parsedCart: CartState = JSON.parse(savedCart);
        setCart(parsedCart);
        
        // Calculate total count
        const totalCount = Object.values(parsedCart).reduce((sum: number, qty: number) => sum + qty, 0);
        setCartCount(totalCount);
      }

      if (savedMetadata) {
        setCartMetadata(JSON.parse(savedMetadata));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // Clear corrupted data
      removeTenantLSItem(CART_STORAGE_KEY);
      removeTenantLSItem(CART_METADATA_STORAGE_KEY);
      safeLSRemoveItem(CART_STORAGE_KEY);
      safeLSRemoveItem(CART_METADATA_STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, [isMounted]);

  // Save cart to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (isLoaded && isMounted) {
      // Use tenant-aware storage
      setTenantLSItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isLoaded, isMounted]);

  // Save metadata to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (isLoaded && isMounted) {
      // Use tenant-aware storage
      setTenantLSItem(CART_METADATA_STORAGE_KEY, JSON.stringify(cartMetadata));
    }
  }, [cartMetadata, isLoaded, isMounted]);

  // Add item to cart
  const addToCart = useCallback((
    productId: string,
    itemName: string = '',
    quantity: number = 1,
    addOns: { [key: string]: boolean } = {},
    specialInstructions: string = '',
    basePrice: number = 0
  ) => {
    const cartKey = generateCartKey(productId, addOns, specialInstructions);
    
    setCart(prev => ({
      ...prev,
      [cartKey]: (prev[cartKey] || 0) + quantity
    }));
    
    setCartMetadata(prev => ({
      ...prev,
      [cartKey]: {
        productId,
        addOns,
        specialInstructions,
        basePrice,
        itemName
      }
    }));
    
    setCartCount(prev => prev + quantity);
  }, [generateCartKey]);

  // Remove one item from cart
  const removeFromCart = useCallback((cartKey: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[cartKey] > 1) {
        newCart[cartKey] -= 1;
      } else {
        delete newCart[cartKey];
        // Also remove metadata
        setCartMetadata(prevMetadata => {
          const newMetadata = { ...prevMetadata };
          delete newMetadata[cartKey];
          return newMetadata;
        });
      }
      return newCart;
    });
    setCartCount(prev => prev - 1);
  }, []);

  // Remove entire item from cart
  const removeItemFromCart = useCallback((cartKey: string) => {
    const itemQuantity = cart[cartKey] || 0;
    
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[cartKey];
      return newCart;
    });
    
    setCartMetadata(prev => {
      const newMetadata = { ...prev };
      delete newMetadata[cartKey];
      return newMetadata;
    });
    
    setCartCount(prev => prev - itemQuantity);
  }, [cart]);

  // Increase cart item quantity
  const increaseCartItem = useCallback((cartKey: string) => {
    setCart(prev => ({
      ...prev,
      [cartKey]: (prev[cartKey] || 0) + 1
    }));
    setCartCount(prev => prev + 1);
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCart({});
    setCartMetadata({});
    setCartCount(0);
    if (isMounted) {
      // Clear tenant-aware storage
      removeTenantLSItem(CART_STORAGE_KEY);
      removeTenantLSItem(CART_METADATA_STORAGE_KEY);
    }
  }, [isMounted]);

  // Calculate total price
  const calculateTotalPrice = useCallback(() => {
    // Add-on name to price mapping
    const addOnPrices: { [key: string]: number } = {
      '1': 45, // ชีสเฟต้าเพิ่ม
      '2': 60, // อะโวคาโด
      '3': 35, // มะกอกดำ
      '4': 40, // อัลมอนด์แผ่น
      '5': 25, // เมล็ดทานตะวัน
      '6': 30  // น้ำสลัดบัลซามิค
    };

    return Object.entries(cart).reduce((total, [cartKey, quantity]) => {
      const metadata = cartMetadata[cartKey];
      if (!metadata) return total;
      
      // Calculate base price
      let itemTotal = metadata.basePrice * quantity;
      
      // Add add-on prices
      if (metadata.addOns) {
        Object.keys(metadata.addOns).forEach(addOnId => {
          if (metadata.addOns[addOnId] && addOnPrices[addOnId]) {
            itemTotal += addOnPrices[addOnId] * quantity;
          }
        });
      }
      
      return total + itemTotal;
    }, 0);
  }, [cart, cartMetadata]);

  // Get cart items with full details
  const getCartItems = useCallback(() => {
    return Object.entries(cart).map(([cartKey, quantity]) => ({
      cartKey,
      quantity,
      ...cartMetadata[cartKey]
    })).filter(item => item.productId); // Filter out items without metadata
  }, [cart, cartMetadata]);

  return {
    // State
    cart,
    cartMetadata,
    cartCount,
    isLoaded: isLoaded && isMounted,
    
    // Actions
    addToCart,
    removeFromCart,
    removeItemFromCart,
    increaseCartItem,
    clearCart,
    
    // Computed
    calculateTotalPrice,
    getCartItems,
    
    // Utils
    generateCartKey
  };
}; 