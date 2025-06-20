import { useState, useEffect, useCallback } from 'react';

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

  // Set mounted flag first
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    if (!isMounted) return;
    
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedMetadata = localStorage.getItem(CART_METADATA_STORAGE_KEY);

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
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_METADATA_STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, [isMounted]);

  // Save cart to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (isLoaded && isMounted) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isLoaded, isMounted]);

  // Save metadata to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (isLoaded && isMounted) {
      try {
        localStorage.setItem(CART_METADATA_STORAGE_KEY, JSON.stringify(cartMetadata));
      } catch (error) {
        console.error('Error saving cart metadata to localStorage:', error);
      }
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
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_METADATA_STORAGE_KEY);
    }
  }, [isMounted]);

  // Calculate total price
  const calculateTotalPrice = useCallback(() => {
    return Object.entries(cart).reduce((total, [cartKey, quantity]) => {
      const metadata = cartMetadata[cartKey];
      if (!metadata) return total;
      
      const itemTotal = metadata.basePrice * quantity;
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