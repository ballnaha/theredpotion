(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/apps/customer/src/app/utils/liff.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// LIFF Environment Detection and Utilities
__turbopack_context__.s({
    "getLiffDelay": (()=>getLiffDelay),
    "isInLiffEnvironment": (()=>isInLiffEnvironment),
    "safeLSGetItem": (()=>safeLSGetItem),
    "safeLSRemoveItem": (()=>safeLSRemoveItem),
    "safeLSSetItem": (()=>safeLSSetItem),
    "waitForLiffReady": (()=>waitForLiffReady)
});
const isInLiffEnvironment = ()=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
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
const waitForLiffReady = async (timeout = 3000)=>{
    if (!isInLiffEnvironment()) return true;
    return new Promise((resolve)=>{
        const startTime = Date.now();
        let attempts = 0;
        const maxAttempts = 30; // 3 seconds / 100ms = 30 attempts
        const checkReady = ()=>{
            attempts++;
            // Timeout or max attempts reached - just proceed
            if (Date.now() - startTime > timeout || attempts >= maxAttempts) {
                console.log('LIFF timeout reached, proceeding anyway');
                resolve(true);
                return;
            }
            // If LIFF exists, try to check if it's ready
            if ("object" !== 'undefined' && window.liff) {
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
const getLiffDelay = ()=>{
    return isInLiffEnvironment() ? 500 : 0; // Reduced from 1000ms to 500ms
};
const safeLSGetItem = (key)=>{
    try {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return localStorage.getItem(key);
    } catch (error) {
        console.warn('localStorage.getItem failed:', error);
        return null;
    }
};
const safeLSSetItem = (key, value)=>{
    try {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.warn('localStorage.setItem failed:', error);
        return false;
    }
};
const safeLSRemoveItem = (key)=>{
    try {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.warn('localStorage.removeItem failed:', error);
        return false;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/customer/src/app/hooks/useCart.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useCart": (()=>useCart)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$liff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/customer/src/app/utils/liff.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
// localStorage keys
const CART_STORAGE_KEY = 'theredpotion_cart';
const CART_METADATA_STORAGE_KEY = 'theredpotion_cart_metadata';
const useCart = ()=>{
    _s();
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [cartMetadata, setCartMetadata] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [cartCount, setCartCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Generate unique cart key
    const generateCartKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[generateCartKey]": (productId, addOns, specialInstructions)=>{
            const addOnKeys = Object.keys(addOns).filter({
                "useCart.useCallback[generateCartKey].addOnKeys": (key)=>addOns[key]
            }["useCart.useCallback[generateCartKey].addOnKeys"]).sort();
            const addOnString = addOnKeys.join(',');
            const instructionsKey = specialInstructions.trim().toLowerCase().replace(/\s+/g, '_');
            return `${productId}_${addOnString}_${instructionsKey}`;
        }
    }["useCart.useCallback[generateCartKey]"], []);
    // Set mounted flag first with LIFF consideration
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCart.useEffect": ()=>{
            const delay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$liff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLiffDelay"])();
            if (delay > 0) {
                // In LIFF environment, wait for everything to be ready
                setTimeout({
                    "useCart.useEffect": ()=>{
                        setIsMounted(true);
                    }
                }["useCart.useEffect"], delay);
            } else {
                // Normal browser
                setIsMounted(true);
            }
        }
    }["useCart.useEffect"], []);
    // Load cart from localStorage on mount (client-side only)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCart.useEffect": ()=>{
            if (!isMounted) return;
            try {
                const savedCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$liff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeLSGetItem"])(CART_STORAGE_KEY);
                const savedMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$liff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeLSGetItem"])(CART_METADATA_STORAGE_KEY);
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart);
                    setCart(parsedCart);
                    // Calculate total count
                    const totalCount = Object.values(parsedCart).reduce({
                        "useCart.useEffect.totalCount": (sum, qty)=>sum + qty
                    }["useCart.useEffect.totalCount"], 0);
                    setCartCount(totalCount);
                }
                if (savedMetadata) {
                    setCartMetadata(JSON.parse(savedMetadata));
                }
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
                // Clear corrupted data
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$liff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeLSRemoveItem"])(CART_STORAGE_KEY);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$liff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeLSRemoveItem"])(CART_METADATA_STORAGE_KEY);
            } finally{
                setIsLoaded(true);
            }
        }
    }["useCart.useEffect"], [
        isMounted
    ]);
    // Save cart to localStorage whenever it changes (client-side only)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCart.useEffect": ()=>{
            if (isLoaded && isMounted) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$liff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeLSSetItem"])(CART_STORAGE_KEY, JSON.stringify(cart));
            }
        }
    }["useCart.useEffect"], [
        cart,
        isLoaded,
        isMounted
    ]);
    // Save metadata to localStorage whenever it changes (client-side only)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCart.useEffect": ()=>{
            if (isLoaded && isMounted) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$liff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeLSSetItem"])(CART_METADATA_STORAGE_KEY, JSON.stringify(cartMetadata));
            }
        }
    }["useCart.useEffect"], [
        cartMetadata,
        isLoaded,
        isMounted
    ]);
    // Add item to cart
    const addToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[addToCart]": (productId, itemName = '', quantity = 1, addOns = {}, specialInstructions = '', basePrice = 0)=>{
            const cartKey = generateCartKey(productId, addOns, specialInstructions);
            setCart({
                "useCart.useCallback[addToCart]": (prev)=>({
                        ...prev,
                        [cartKey]: (prev[cartKey] || 0) + quantity
                    })
            }["useCart.useCallback[addToCart]"]);
            setCartMetadata({
                "useCart.useCallback[addToCart]": (prev)=>({
                        ...prev,
                        [cartKey]: {
                            productId,
                            addOns,
                            specialInstructions,
                            basePrice,
                            itemName
                        }
                    })
            }["useCart.useCallback[addToCart]"]);
            setCartCount({
                "useCart.useCallback[addToCart]": (prev)=>prev + quantity
            }["useCart.useCallback[addToCart]"]);
        }
    }["useCart.useCallback[addToCart]"], [
        generateCartKey
    ]);
    // Remove one item from cart
    const removeFromCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[removeFromCart]": (cartKey)=>{
            setCart({
                "useCart.useCallback[removeFromCart]": (prev)=>{
                    const newCart = {
                        ...prev
                    };
                    if (newCart[cartKey] > 1) {
                        newCart[cartKey] -= 1;
                    } else {
                        delete newCart[cartKey];
                        // Also remove metadata
                        setCartMetadata({
                            "useCart.useCallback[removeFromCart]": (prevMetadata)=>{
                                const newMetadata = {
                                    ...prevMetadata
                                };
                                delete newMetadata[cartKey];
                                return newMetadata;
                            }
                        }["useCart.useCallback[removeFromCart]"]);
                    }
                    return newCart;
                }
            }["useCart.useCallback[removeFromCart]"]);
            setCartCount({
                "useCart.useCallback[removeFromCart]": (prev)=>prev - 1
            }["useCart.useCallback[removeFromCart]"]);
        }
    }["useCart.useCallback[removeFromCart]"], []);
    // Remove entire item from cart
    const removeItemFromCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[removeItemFromCart]": (cartKey)=>{
            const itemQuantity = cart[cartKey] || 0;
            setCart({
                "useCart.useCallback[removeItemFromCart]": (prev)=>{
                    const newCart = {
                        ...prev
                    };
                    delete newCart[cartKey];
                    return newCart;
                }
            }["useCart.useCallback[removeItemFromCart]"]);
            setCartMetadata({
                "useCart.useCallback[removeItemFromCart]": (prev)=>{
                    const newMetadata = {
                        ...prev
                    };
                    delete newMetadata[cartKey];
                    return newMetadata;
                }
            }["useCart.useCallback[removeItemFromCart]"]);
            setCartCount({
                "useCart.useCallback[removeItemFromCart]": (prev)=>prev - itemQuantity
            }["useCart.useCallback[removeItemFromCart]"]);
        }
    }["useCart.useCallback[removeItemFromCart]"], [
        cart
    ]);
    // Increase cart item quantity
    const increaseCartItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[increaseCartItem]": (cartKey)=>{
            setCart({
                "useCart.useCallback[increaseCartItem]": (prev)=>({
                        ...prev,
                        [cartKey]: (prev[cartKey] || 0) + 1
                    })
            }["useCart.useCallback[increaseCartItem]"]);
            setCartCount({
                "useCart.useCallback[increaseCartItem]": (prev)=>prev + 1
            }["useCart.useCallback[increaseCartItem]"]);
        }
    }["useCart.useCallback[increaseCartItem]"], []);
    // Clear entire cart
    const clearCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[clearCart]": ()=>{
            setCart({});
            setCartMetadata({});
            setCartCount(0);
            if (isMounted) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$liff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeLSRemoveItem"])(CART_STORAGE_KEY);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$liff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeLSRemoveItem"])(CART_METADATA_STORAGE_KEY);
            }
        }
    }["useCart.useCallback[clearCart]"], [
        isMounted
    ]);
    // Calculate total price
    const calculateTotalPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[calculateTotalPrice]": ()=>{
            // Add-on name to price mapping
            const addOnPrices = {
                '1': 45,
                '2': 60,
                '3': 35,
                '4': 40,
                '5': 25,
                '6': 30 // น้ำสลัดบัลซามิค
            };
            return Object.entries(cart).reduce({
                "useCart.useCallback[calculateTotalPrice]": (total, [cartKey, quantity])=>{
                    const metadata = cartMetadata[cartKey];
                    if (!metadata) return total;
                    // Calculate base price
                    let itemTotal = metadata.basePrice * quantity;
                    // Add add-on prices
                    if (metadata.addOns) {
                        Object.keys(metadata.addOns).forEach({
                            "useCart.useCallback[calculateTotalPrice]": (addOnId)=>{
                                if (metadata.addOns[addOnId] && addOnPrices[addOnId]) {
                                    itemTotal += addOnPrices[addOnId] * quantity;
                                }
                            }
                        }["useCart.useCallback[calculateTotalPrice]"]);
                    }
                    return total + itemTotal;
                }
            }["useCart.useCallback[calculateTotalPrice]"], 0);
        }
    }["useCart.useCallback[calculateTotalPrice]"], [
        cart,
        cartMetadata
    ]);
    // Get cart items with full details
    const getCartItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[getCartItems]": ()=>{
            return Object.entries(cart).map({
                "useCart.useCallback[getCartItems]": ([cartKey, quantity])=>({
                        cartKey,
                        quantity,
                        ...cartMetadata[cartKey]
                    })
            }["useCart.useCallback[getCartItems]"]).filter({
                "useCart.useCallback[getCartItems]": (item)=>item.productId
            }["useCart.useCallback[getCartItems]"]); // Filter out items without metadata
        }
    }["useCart.useCallback[getCartItems]"], [
        cart,
        cartMetadata
    ]);
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
_s(useCart, "P9CDntp/Y3gr8L+LVQNZPIWmeN0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/customer/src/app/utils/deepLink.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Deep Link Utilities for Mobile Payment Integration
__turbopack_context__.s({
    "detectAppReturn": (()=>detectAppReturn),
    "generateQRCodeUrl": (()=>generateQRCodeUrl),
    "isAndroidDevice": (()=>isAndroidDevice),
    "isIOSDevice": (()=>isIOSDevice),
    "isLineApp": (()=>isLineApp),
    "isMobileDevice": (()=>isMobileDevice),
    "openAppStore": (()=>openAppStore),
    "openLinePay": (()=>openLinePay),
    "openPromptPayApp": (()=>openPromptPayApp),
    "openTrueMoneyWallet": (()=>openTrueMoneyWallet),
    "redirectToPaymentGateway": (()=>redirectToPaymentGateway)
});
const isMobileDevice = ()=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};
const isIOSDevice = ()=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};
const isAndroidDevice = ()=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return /Android/i.test(navigator.userAgent);
};
const isLineApp = ()=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return navigator.userAgent.includes('Line') || navigator.userAgent.includes('LINE');
};
const openPromptPayApp = (options)=>{
    return new Promise((resolve)=>{
        if (!isMobileDevice()) {
            resolve(false);
            return;
        }
        const { amount, orderId, description } = options;
        // Different URL schemes for different platforms
        const promptPayUrls = {
            // Generic PromptPay
            generic: `promptpay://pay?amount=${amount}&ref=${orderId}${description ? `&memo=${encodeURIComponent(description)}` : ''}`,
            // Bank-specific deep links
            scb: `scbeasy://payments/promptpay?amount=${amount}&ref=${orderId}`,
            kbank: `kplus://payment/promptpay?amount=${amount}&reference=${orderId}`,
            bbl: `bualuang://promptpay?amount=${amount}&ref=${orderId}`,
            ktb: `krungthai://payment/promptpay?amount=${amount}&reference=${orderId}`,
            // Mobile banking apps
            truemoney: `truemoney://payment?amount=${amount}&ref=${orderId}`,
            rabbitmoney: `rabbit://payment/promptpay?amount=${amount}&ref=${orderId}`
        };
        // Try generic PromptPay first
        try {
            window.location.href = promptPayUrls.generic;
            // Check if app opened successfully
            const startTime = Date.now();
            const checkAppOpened = ()=>{
                if (Date.now() - startTime > 2000) {
                    // App didn't open, try fallback
                    resolve(false);
                    return;
                }
                if (document.hidden || document.webkitHidden) {
                    // App opened successfully
                    resolve(true);
                    return;
                }
                setTimeout(checkAppOpened, 100);
            };
            setTimeout(checkAppOpened, 500);
        } catch (error) {
            resolve(false);
        }
    });
};
const openTrueMoneyWallet = (options)=>{
    return new Promise((resolve)=>{
        if (!isMobileDevice()) {
            resolve(false);
            return;
        }
        const { amount, orderId, merchantId = 'THEREDPOTION' } = options;
        const walletUrl = `truemoney://payment?amount=${amount}&merchantId=${merchantId}&ref=${orderId}`;
        try {
            window.location.href = walletUrl;
            // Check if app opened
            setTimeout(()=>{
                if (document.hidden || document.webkitHidden) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);
        } catch (error) {
            resolve(false);
        }
    });
};
const openLinePay = (options)=>{
    return new Promise((resolve)=>{
        if (!isLineApp()) {
            resolve(false);
            return;
        }
        const { amount, orderId } = options;
        // LINE Pay deep link
        const linePayUrl = `line://pay?amount=${amount}&orderId=${orderId}`;
        try {
            window.location.href = linePayUrl;
            resolve(true);
        } catch (error) {
            resolve(false);
        }
    });
};
const openAppStore = (appName)=>{
    const appStoreUrls = {
        promptpay: {
            ios: 'https://apps.apple.com/th/app/promptpay/id1234567890',
            android: 'https://play.google.com/store/apps/details?id=com.promptpay'
        },
        truemoney: {
            ios: 'https://apps.apple.com/th/app/truemoney-wallet/id1234567890',
            android: 'https://play.google.com/store/apps/details?id=com.truemoney.wallet'
        },
        scb: {
            ios: 'https://apps.apple.com/th/app/scb-easy/id1234567890',
            android: 'https://play.google.com/store/apps/details?id=com.scb.phone'
        }
    };
    const urls = appStoreUrls[appName];
    if (!urls) return;
    if (isIOSDevice()) {
        window.open(urls.ios, '_blank');
    } else if (isAndroidDevice()) {
        window.open(urls.android, '_blank');
    }
};
const redirectToPaymentGateway = (options)=>{
    const { amount, orderId, returnUrl, cancelUrl, paymentMethod } = options;
    // In real implementation, redirect to actual payment gateway
    // e.g., Omise, 2C2P, SCB Payment Gateway, etc.
    const paymentGatewayUrl = `https://payment-gateway.example.com/checkout?` + `amount=${amount}&` + `orderId=${orderId}&` + `method=${paymentMethod}&` + `returnUrl=${encodeURIComponent(returnUrl)}&` + `cancelUrl=${encodeURIComponent(cancelUrl)}`;
    window.location.href = paymentGatewayUrl;
};
const generateQRCodeUrl = (options)=>{
    const { amount, orderId } = options;
    // In real implementation, generate actual PromptPay QR code
    // This would typically call your backend API
    return `https://api.theredpotion.com/qr/promptpay?amount=${amount}&ref=${orderId}`;
};
const detectAppReturn = (callback, timeout = 5000)=>{
    let returned = false;
    const handleVisibilityChange = ()=>{
        if (!document.hidden && !returned) {
            returned = true;
            callback();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
    };
    const handleFocus = ()=>{
        if (!returned) {
            returned = true;
            callback();
            window.removeEventListener('focus', handleFocus);
        }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    // Cleanup after timeout
    setTimeout(()=>{
        if (!returned) {
            returned = true;
            callback();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocus);
        }
    }, timeout);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/customer/src/app/checkout/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CheckoutPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Card/Card.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CardContent/CardContent.js [app-client] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Divider/Divider.js [app-client] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Radio/Radio.js [app-client] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$RadioGroup$2f$RadioGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RadioGroup$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/RadioGroup/RadioGroup.js [app-client] (ecmascript) <export default as RadioGroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControlLabel/FormControlLabel.js [app-client] (ecmascript) <export default as FormControlLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControl/FormControl.js [app-client] (ecmascript) <export default as FormControl>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-client] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-client] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stepper$2f$Stepper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stepper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stepper/Stepper.js [app-client] (ecmascript) <export default as Stepper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Step$2f$Step$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Step$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Step/Step.js [app-client] (ecmascript) <export default as Step>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$StepLabel$2f$StepLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StepLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/StepLabel/StepLabel.js [app-client] (ecmascript) <export default as StepLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-client] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/apps/customer/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/apps/customer/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/apps/customer/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/apps/customer/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/apps/customer/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/apps/customer/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ = __turbopack_context__.i("[project]/apps/customer/node_modules/lucide-react/dist/esm/icons/receipt.js [app-client] (ecmascript) <export default as Receipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/apps/customer/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/apps/customer/node_modules/lucide-react/dist/esm/icons/building.js [app-client] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__ = __turbopack_context__.i("[project]/apps/customer/node_modules/lucide-react/dist/esm/icons/banknote.js [app-client] (ecmascript) <export default as Banknote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/apps/customer/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-client] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/customer/src/app/hooks/useCart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$deepLink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/customer/src/app/utils/deepLink.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function CheckoutPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { getCartItems, calculateTotalPrice, cartCount, isLoaded } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    // States
    const [selectedAddress, setSelectedAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('home');
    const [selectedPayment, setSelectedPayment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('promptpay');
    const [selectedDeliveryTime, setSelectedDeliveryTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('asap');
    const [orderNotes, setOrderNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paymentStatus, setPaymentStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showPaymentAlert, setShowPaymentAlert] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Mock data - ในอนาคตจะดึงจากฐานข้อมูล
    const addresses = [
        {
            id: 'home',
            type: 'บ้าน',
            name: 'บ้าน',
            address: '123/45 ซอยสุขุมวิท 21, คลองเตยเหนือ, วัฒนา, กรุงเทพฯ 10110',
            phone: '081-234-5678',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
        },
        {
            id: 'office',
            type: 'ออฟฟิศ',
            name: 'ออฟฟิศ',
            address: '456/78 อาคารสาธรซิตี้ทาวเวอร์, ถนนสาธร, สีลม, บางรัก, กรุงเทพฯ 10500',
            phone: '02-234-5678',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"]
        }
    ];
    // Detect mobile environment
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$deepLink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMobileDevice"])();
    const isLineAppEnv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$deepLink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLineApp"])();
    const paymentMethods = [
        {
            id: 'promptpay',
            name: 'PromptPay',
            description: (()=>{
                if (isLineAppEnv) return 'LINE Pay หรือ QR Code';
                if (isMobile) return 'เปิดแอปธนาคารเพื่อชำระ';
                return 'ชำระผ่าน QR Code';
            })(),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"],
            color: '#1976d2'
        },
        {
            id: 'cash',
            name: 'เงินสด',
            description: 'ชำระเมื่อได้รับสินค้า',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__["Banknote"],
            color: '#10b981'
        },
        {
            id: 'card',
            name: 'บัตรเครดิต/เดบิต',
            description: 'Visa, Mastercard, JCB',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
            color: '#7c3aed'
        },
        {
            id: 'wallet',
            name: 'TrueMoney Wallet',
            description: isMobile ? 'เปิดแอป TrueMoney Wallet' : 'ชำระผ่านเว็บไซต์ Wallet',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"],
            color: '#f59e0b'
        }
    ];
    const deliveryTimes = [
        {
            id: 'asap',
            label: 'เร็วที่สุด (30-45 นาที)',
            time: 'ตอนนี้'
        },
        {
            id: '1hour',
            label: '1 ชั่วโมง',
            time: '14:00-14:30'
        },
        {
            id: '2hour',
            label: '2 ชั่วโมง',
            time: '15:00-15:30'
        },
        {
            id: 'evening',
            label: 'ช่วงเย็น',
            time: '18:00-19:00'
        }
    ];
    const cartItems = getCartItems();
    const totalPrice = calculateTotalPrice();
    const deliveryFee = totalPrice > 200 ? 0 : 39;
    const serviceFee = Math.ceil(totalPrice * 0.02); // 2% service fee
    const finalTotal = totalPrice + deliveryFee + serviceFee;
    // Add-on name mapping (same as cart)
    const addOnNames = {
        '1': 'ชีสเฟต้าเพิ่ม',
        '2': 'อะโวคาโด',
        '3': 'มะกอกดำ',
        '4': 'อัลมอนด์แผ่น',
        '5': 'เมล็ดทานตะวัน',
        '6': 'น้ำสลัดบัลซามิค'
    };
    const getAddOnDisplayName = (addOnId)=>{
        return addOnNames[addOnId] || addOnId.replace(/-/g, ' ');
    };
    const calculateItemTotalPrice = (item)=>{
        const addOnPrices = {
            '1': 45,
            '2': 60,
            '3': 35,
            '4': 40,
            '5': 25,
            '6': 30
        };
        let total = item.basePrice * item.quantity;
        if (item.addOns) {
            Object.keys(item.addOns).forEach((addOnId)=>{
                if (item.addOns[addOnId] && addOnPrices[addOnId]) {
                    total += addOnPrices[addOnId] * item.quantity;
                }
            });
        }
        return total;
    };
    const handlePlaceOrder = async ()=>{
        setIsProcessing(true);
        try {
            // Handle different payment methods
            if (selectedPayment === 'promptpay') {
                await handlePromptPayPayment();
            } else if (selectedPayment === 'wallet') {
                await handleWalletPayment();
            } else if (selectedPayment === 'card') {
                await handleCardPayment();
            } else {
                // Cash payment - proceed directly
                setTimeout(()=>{
                    setIsProcessing(false);
                    router.push('/order-success');
                }, 1000);
            }
        } catch (error) {
            setIsProcessing(false);
            console.error('Payment error:', error);
        }
    };
    const handlePromptPayPayment = async ()=>{
        const orderId = `TRP${Date.now()}`;
        const paymentOptions = {
            amount: finalTotal,
            orderId,
            description: `The Red Potion - Order ${orderId}`
        };
        // Try LINE Pay first if in LINE app
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$deepLink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLineApp"])()) {
            const linePaySuccess = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$deepLink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openLinePay"])(paymentOptions);
            if (linePaySuccess) {
                // Wait for user to return from LINE Pay
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$deepLink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectAppReturn"])(()=>{
                    setIsProcessing(false);
                    router.push('/order-success');
                });
                return;
            }
        }
        // Try PromptPay app on mobile
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$deepLink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMobileDevice"])()) {
            setPaymentStatus('กำลังเปิดแอปธนาคาร...');
            setShowPaymentAlert(true);
            const promptPaySuccess = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$deepLink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openPromptPayApp"])(paymentOptions);
            if (promptPaySuccess) {
                setPaymentStatus('รอการชำระเงินจากแอปธนาคาร');
                // Wait for user to return from banking app
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$deepLink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectAppReturn"])(()=>{
                    setIsProcessing(false);
                    setShowPaymentAlert(false);
                    router.push('/order-success');
                });
                return;
            } else {
                setPaymentStatus('ไม่สามารถเปิดแอปธนาคารได้ กำลังแสดง QR Code');
            }
        }
        // Fallback to QR code
        setIsProcessing(false);
        showQRCodeModal();
    };
    const handleWalletPayment = async ()=>{
        const orderId = `TRP${Date.now()}`;
        const paymentOptions = {
            amount: finalTotal,
            orderId,
            merchantId: 'THEREDPOTION',
            description: `The Red Potion - Order ${orderId}`
        };
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$deepLink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMobileDevice"])()) {
            setPaymentStatus('กำลังเปิดแอป TrueMoney Wallet...');
            setShowPaymentAlert(true);
            // Try to open TrueMoney Wallet app
            const walletSuccess = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$deepLink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openTrueMoneyWallet"])(paymentOptions);
            if (walletSuccess) {
                setPaymentStatus('รอการชำระเงินจาก TrueMoney Wallet');
                // Wait for user to return from wallet app
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$deepLink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectAppReturn"])(()=>{
                    setIsProcessing(false);
                    setShowPaymentAlert(false);
                    router.push('/order-success');
                });
            } else {
                setPaymentStatus('ไม่สามารถเปิดแอป Wallet ได้ กำลังเปิดเว็บไซต์');
                // Fallback to web payment
                setIsProcessing(false);
                window.open('https://wallet.truemoney.com/payment', '_blank');
            }
        } else {
            // Desktop - open web wallet
            setIsProcessing(false);
            window.open('https://wallet.truemoney.com/payment', '_blank');
        }
    };
    const handleCardPayment = async ()=>{
        const orderId = `TRP${Date.now()}`;
        // Redirect to payment gateway
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$deepLink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["redirectToPaymentGateway"])({
            amount: finalTotal,
            orderId,
            returnUrl: `${window.location.origin}/order-success`,
            cancelUrl: `${window.location.origin}/checkout`,
            paymentMethod: 'card'
        });
        // For demo purposes, simulate redirect
        setTimeout(()=>{
            setIsProcessing(false);
            router.push('/order-success');
        }, 2000);
    };
    const showQRCodeModal = ()=>{
        // In real app, show QR code modal
        // For demo, just proceed to success
        setTimeout(()=>{
            router.push('/order-success');
        }, 3000);
    };
    // Show loading while cart data is being loaded
    if (!isLoaded) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `
          linear-gradient(135deg, 
            rgba(16, 185, 129, 0.08) 0%, 
            rgba(5, 150, 105, 0.05) 25%,
            rgba(52, 211, 153, 0.03) 50%,
            rgba(255, 255, 255, 0.95) 75%,
            rgba(248, 250, 252, 1) 100%
          )
        `
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                size: 60,
                sx: {
                    color: '#10b981'
                }
            }, void 0, false, {
                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                lineNumber: 328,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
            lineNumber: 313,
            columnNumber: 7
        }, this);
    }
    // Redirect to cart if empty
    if (cartItems.length === 0) {
        router.push('/cart');
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: `
        linear-gradient(135deg, 
          rgba(16, 185, 129, 0.08) 0%, 
          rgba(5, 150, 105, 0.05) 25%,
          rgba(52, 211, 153, 0.03) 50%,
          rgba(255, 255, 255, 0.95) 75%,
          rgba(248, 250, 252, 1) 100%
        )
      `
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            display: 'flex',
                            alignItems: 'center',
                            py: 1.5,
                            px: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                onClick: ()=>router.back(),
                                sx: {
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    '&:hover': {
                                        background: 'rgba(16, 185, 129, 0.2)'
                                    },
                                    mr: 2
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    color: "#10b981"
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 377,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                lineNumber: 369,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h6",
                                sx: {
                                    fontWeight: 700,
                                    color: '#0f172a'
                                },
                                children: "ยืนยันคำสั่งซื้อ"
                            }, void 0, false, {
                                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                        lineNumber: 363,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            px: 1,
                            pb: 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stepper$2f$Stepper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stepper$3e$__["Stepper"], {
                            activeStep: 1,
                            alternativeLabel: true,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Step$2f$Step$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Step$3e$__["Step"], {
                                    completed: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$StepLabel$2f$StepLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StepLabel$3e$__["StepLabel"], {
                                        children: "ตะกร้าสินค้า"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                        lineNumber: 392,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 391,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Step$2f$Step$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Step$3e$__["Step"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$StepLabel$2f$StepLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StepLabel$3e$__["StepLabel"], {
                                        children: "ยืนยันคำสั่งซื้อ"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                        lineNumber: 395,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 394,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Step$2f$Step$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Step$3e$__["Step"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$StepLabel$2f$StepLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StepLabel$3e$__["StepLabel"], {
                                        children: "ชำระเงิน"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                        lineNumber: 398,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 397,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                            lineNumber: 390,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                lineNumber: 355,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    flex: 1,
                    overflow: 'auto',
                    pb: '120px' // Space for fixed bottom button
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                        sx: {
                            mx: 0.5,
                            mb: 1,
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            background: 'rgba(255, 255, 255, 0.4)',
                            backdropFilter: 'blur(30px)',
                            boxShadow: 'none'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                            sx: {
                                p: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 1.5,
                                        gap: 1.5
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                background: 'rgba(16, 185, 129, 0.1)',
                                                borderRadius: '12px',
                                                p: 0.8,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                size: 18,
                                                color: "#10b981"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                lineNumber: 430,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                            lineNumber: 422,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "h6",
                                            sx: {
                                                fontWeight: 600,
                                                color: '#111827',
                                                fontSize: '17px'
                                            },
                                            children: "ที่อยู่จัดส่ง"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                            lineNumber: 432,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 421,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
                                    component: "fieldset",
                                    fullWidth: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$RadioGroup$2f$RadioGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RadioGroup$3e$__["RadioGroup"], {
                                        value: selectedAddress,
                                        onChange: (e)=>setSelectedAddress(e.target.value),
                                        children: addresses.map((address)=>{
                                            const IconComponent = address.icon;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    mb: 1
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                                    value: address.id,
                                                    control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                                        sx: {
                                                            color: '#10b981'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                        lineNumber: 448,
                                                        columnNumber: 34
                                                    }, void 0),
                                                    label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            display: 'flex',
                                                            alignItems: 'start',
                                                            gap: 1.5,
                                                            py: 1
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                sx: {
                                                                    background: 'rgba(16, 185, 129, 0.1)',
                                                                    borderRadius: '8px',
                                                                    p: 0.5,
                                                                    mt: 0.5
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                                    size: 16,
                                                                    color: "#10b981"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                                    lineNumber: 457,
                                                                    columnNumber: 31
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                                lineNumber: 451,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                sx: {
                                                                    flex: 1
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        sx: {
                                                                            fontWeight: 600,
                                                                            color: '#111827',
                                                                            fontSize: '15px'
                                                                        },
                                                                        children: address.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                                        lineNumber: 460,
                                                                        columnNumber: 31
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        sx: {
                                                                            color: '#6b7280',
                                                                            fontSize: '14px',
                                                                            lineHeight: 1.4
                                                                        },
                                                                        children: address.address
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                                        lineNumber: 463,
                                                                        columnNumber: 31
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        sx: {
                                                                            color: '#6b7280',
                                                                            fontSize: '13px',
                                                                            mt: 0.5
                                                                        },
                                                                        children: [
                                                                            "📞 ",
                                                                            address.phone
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                                        lineNumber: 466,
                                                                        columnNumber: 31
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                                lineNumber: 459,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 27
                                                    }, void 0),
                                                    sx: {
                                                        background: selectedAddress === address.id ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                                                        borderRadius: '12px',
                                                        border: selectedAddress === address.id ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                                                        m: 0,
                                                        p: 1,
                                                        transition: 'all 0.3s ease'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 23
                                                }, this)
                                            }, address.id, false, {
                                                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                lineNumber: 445,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                        lineNumber: 438,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 437,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                        lineNumber: 488,
                                        columnNumber: 26
                                    }, void 0),
                                    sx: {
                                        color: '#10b981',
                                        textTransform: 'none',
                                        fontSize: '14px',
                                        mt: 1,
                                        '&:hover': {
                                            background: 'rgba(16, 185, 129, 0.1)'
                                        }
                                    },
                                    children: "เพิ่มที่อยู่ใหม่"
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 487,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                            lineNumber: 420,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                        lineNumber: 411,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                        sx: {
                            mx: 0.5,
                            mb: 1,
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            background: 'rgba(255, 255, 255, 0.4)',
                            backdropFilter: 'blur(30px)',
                            boxShadow: 'none'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                            sx: {
                                p: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 1.5,
                                        gap: 1.5
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                background: 'rgba(16, 185, 129, 0.1)',
                                                borderRadius: '12px',
                                                p: 0.8,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                size: 18,
                                                color: "#10b981"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                lineNumber: 524,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                            lineNumber: 516,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "h6",
                                            sx: {
                                                fontWeight: 600,
                                                color: '#111827',
                                                fontSize: '17px'
                                            },
                                            children: "วิธีชำระเงิน"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                            lineNumber: 526,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 515,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
                                    component: "fieldset",
                                    fullWidth: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$RadioGroup$2f$RadioGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RadioGroup$3e$__["RadioGroup"], {
                                        value: selectedPayment,
                                        onChange: (e)=>setSelectedPayment(e.target.value),
                                        children: paymentMethods.map((method)=>{
                                            const IconComponent = method.icon;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                                value: method.id,
                                                control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                                    sx: {
                                                        color: '#10b981'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                    lineNumber: 542,
                                                    columnNumber: 32
                                                }, void 0),
                                                label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1.5,
                                                        py: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            sx: {
                                                                background: `${method.color}15`,
                                                                borderRadius: '8px',
                                                                p: 0.5,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                                size: 16,
                                                                color: method.color
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                                lineNumber: 553,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                            lineNumber: 545,
                                                            columnNumber: 27
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    sx: {
                                                                        fontWeight: 600,
                                                                        color: '#111827',
                                                                        fontSize: '15px'
                                                                    },
                                                                    children: method.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                                    lineNumber: 556,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    sx: {
                                                                        color: '#6b7280',
                                                                        fontSize: '13px'
                                                                    },
                                                                    children: method.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                                    lineNumber: 559,
                                                                    columnNumber: 29
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                            lineNumber: 555,
                                                            columnNumber: 27
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                    lineNumber: 544,
                                                    columnNumber: 25
                                                }, void 0),
                                                sx: {
                                                    background: selectedPayment === method.id ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                                                    borderRadius: '12px',
                                                    border: selectedPayment === method.id ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                                                    m: 0,
                                                    mb: 0.5,
                                                    p: 1,
                                                    transition: 'all 0.3s ease'
                                                }
                                            }, method.id, false, {
                                                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                lineNumber: 539,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                        lineNumber: 532,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 531,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                            lineNumber: 514,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                        lineNumber: 505,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                        sx: {
                            mx: 0.5,
                            mb: 1,
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            background: 'rgba(255, 255, 255, 0.4)',
                            backdropFilter: 'blur(30px)',
                            boxShadow: 'none'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                            sx: {
                                p: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    sx: {
                                        fontWeight: 600,
                                        color: '#111827',
                                        fontSize: '16px',
                                        mb: 1
                                    },
                                    children: "หมายเหตุเพิ่มเติม"
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 593,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                    fullWidth: true,
                                    multiline: true,
                                    rows: 3,
                                    placeholder: "เช่น วางไว้หน้าบ้าน , โทรติดต่อก่อนมาส่งของ ฯลฯ",
                                    value: orderNotes,
                                    onChange: (e)=>setOrderNotes(e.target.value),
                                    sx: {
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            background: 'rgba(255, 255, 255, 0.5)',
                                            '& fieldset': {
                                                borderColor: 'rgba(255, 255, 255, 0.3)'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'rgba(16, 185, 129, 0.5)'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#10b981'
                                            }
                                        }
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 596,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                            lineNumber: 592,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                        lineNumber: 583,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                        sx: {
                            mx: 0.5,
                            borderRadius: '24px',
                            boxShadow: 'none',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            background: 'rgba(255, 255, 255, 0.4)',
                            backdropFilter: 'blur(30px)',
                            position: 'relative',
                            overflow: 'hidden'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                            sx: {
                                p: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 1.5,
                                        gap: 1.5
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                background: 'rgba(255, 255, 255, 0.7)',
                                                borderRadius: '12px',
                                                p: 0.8,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backdropFilter: 'blur(10px)'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"], {
                                                size: 18,
                                                color: "#6b7280"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                lineNumber: 644,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                            lineNumber: 635,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "h6",
                                            sx: {
                                                fontWeight: 600,
                                                color: '#111827',
                                                fontSize: '17px'
                                            },
                                            children: "สรุปคำสั่งซื้อ"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                            lineNumber: 646,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 634,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        mb: 2
                                    },
                                    children: cartItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'start',
                                                mb: 1.5,
                                                pb: 1.5,
                                                borderBottom: index < cartItems.length - 1 ? '1px solid rgba(255, 255, 255, 0.3)' : 'none'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        flex: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            sx: {
                                                                fontWeight: 600,
                                                                color: '#111827',
                                                                fontSize: '15px'
                                                            },
                                                            children: [
                                                                item.quantity,
                                                                "x ",
                                                                item.itemName
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                            lineNumber: 663,
                                                            columnNumber: 21
                                                        }, this),
                                                        Object.keys(item.addOns).filter((key)=>item.addOns[key]).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            sx: {
                                                                mt: 0.5,
                                                                display: 'flex',
                                                                flexWrap: 'wrap',
                                                                gap: 0.5
                                                            },
                                                            children: Object.keys(item.addOns).filter((key)=>item.addOns[key]).map((addOnId)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                                    label: getAddOnDisplayName(addOnId),
                                                                    size: "small",
                                                                    sx: {
                                                                        background: 'rgba(16, 185, 129, 0.1)',
                                                                        color: '#10b981',
                                                                        fontSize: '10px',
                                                                        height: 'auto',
                                                                        '& .MuiChip-label': {
                                                                            px: 0.8,
                                                                            py: 0.2
                                                                        }
                                                                    }
                                                                }, addOnId, false, {
                                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                                    lineNumber: 669,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                            lineNumber: 667,
                                                            columnNumber: 23
                                                        }, this),
                                                        item.specialInstructions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            sx: {
                                                                color: '#6b7280',
                                                                fontSize: '12px',
                                                                fontStyle: 'italic',
                                                                mt: 0.5
                                                            },
                                                            children: [
                                                                '"',
                                                                item.specialInstructions,
                                                                '"'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                            lineNumber: 685,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                    lineNumber: 662,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontWeight: 600,
                                                        color: '#111827',
                                                        fontSize: '15px'
                                                    },
                                                    children: [
                                                        "฿",
                                                        calculateItemTotalPrice(item).toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                    lineNumber: 690,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                            lineNumber: 654,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 652,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                    sx: {
                                        my: 1.5,
                                        borderColor: 'rgba(255, 255, 255, 0.3)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 697,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        background: 'rgba(255, 255, 255, 0.5)',
                                        borderRadius: '16px',
                                        p: 1.5,
                                        mb: 1.5,
                                        backdropFilter: 'blur(15px)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mb: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        color: '#4b5563',
                                                        fontSize: '15px'
                                                    },
                                                    children: "ราคาสินค้า"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                    lineNumber: 709,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontWeight: 500,
                                                        fontSize: '15px',
                                                        color: '#111827'
                                                    },
                                                    children: [
                                                        "฿",
                                                        totalPrice.toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                    lineNumber: 710,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                            lineNumber: 708,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mb: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        color: '#4b5563',
                                                        fontSize: '15px'
                                                    },
                                                    children: "ค่าจัดส่ง"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                    lineNumber: 714,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontWeight: 500,
                                                        color: deliveryFee === 0 ? '#10b981' : '#111827',
                                                        fontSize: '15px'
                                                    },
                                                    children: deliveryFee === 0 ? 'ฟรี!' : `฿${deliveryFee}`
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                    lineNumber: 715,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                            lineNumber: 713,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mb: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        color: '#4b5563',
                                                        fontSize: '15px'
                                                    },
                                                    children: "ค่าบริการ"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                    lineNumber: 725,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontWeight: 500,
                                                        fontSize: '15px',
                                                        color: '#111827'
                                                    },
                                                    children: [
                                                        "฿",
                                                        serviceFee.toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                    lineNumber: 726,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                            lineNumber: 724,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 700,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        background: 'rgba(255, 255, 255, 0.6)',
                                        borderRadius: '20px',
                                        p: 2,
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255, 255, 255, 0.4)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                sx: {
                                                    fontWeight: 600,
                                                    color: '#111827',
                                                    fontSize: '17px'
                                                },
                                                children: "ยอดรวมทั้งหมด"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                lineNumber: 741,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                sx: {
                                                    fontWeight: 700,
                                                    color: '#111827',
                                                    fontSize: '21px'
                                                },
                                                children: [
                                                    "฿",
                                                    finalTotal.toLocaleString()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                                lineNumber: 748,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                        lineNumber: 740,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                                    lineNumber: 733,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                            lineNumber: 633,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                        lineNumber: 623,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                lineNumber: 405,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 1,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    zIndex: 1000
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                    fullWidth: true,
                    onClick: handlePlaceOrder,
                    disabled: isProcessing,
                    sx: {
                        background: isProcessing ? 'rgba(107, 114, 128, 0.5)' : 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        borderRadius: '20px',
                        textTransform: 'none',
                        py: 2,
                        fontSize: '17px',
                        fontWeight: 600,
                        boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            background: isProcessing ? 'rgba(107, 114, 128, 0.5)' : 'linear-gradient(135deg, #059669, #047857)',
                            boxShadow: '0 12px 40px rgba(16, 185, 129, 0.4)',
                            transform: isProcessing ? 'none' : 'translateY(-2px)'
                        },
                        '&:disabled': {
                            color: 'white'
                        }
                    },
                    startIcon: isProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                        size: 20,
                        color: "inherit"
                    }, void 0, false, {
                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                        lineNumber: 800,
                        columnNumber: 37
                    }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                        lineNumber: 800,
                        columnNumber: 86
                    }, void 0),
                    children: isProcessing ? 'กำลังดำเนินการ...' : `ยืนยันสั่งซื้อ ฿${finalTotal.toLocaleString()}`
                }, void 0, false, {
                    fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                    lineNumber: 773,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                lineNumber: 762,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                severity: "info",
                sx: {
                    position: 'fixed',
                    top: 20,
                    left: 20,
                    right: 20,
                    zIndex: 2000,
                    borderRadius: '16px',
                    backdropFilter: 'blur(20px)',
                    background: 'rgba(33, 150, 243, 0.1)',
                    border: '1px solid rgba(33, 150, 243, 0.3)',
                    display: showPaymentAlert ? 'flex' : 'none'
                },
                onClose: ()=>setShowPaymentAlert(false),
                children: paymentStatus
            }, void 0, false, {
                fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
                lineNumber: 807,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/customer/src/app/checkout/page.tsx",
        lineNumber: 340,
        columnNumber: 5
    }, this);
}
_s(CheckoutPage, "X4DZw0GImgpAFfItg0/Wkc15uis=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = CheckoutPage;
var _c;
__turbopack_context__.k.register(_c, "CheckoutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_customer_src_app_716a4f86._.js.map