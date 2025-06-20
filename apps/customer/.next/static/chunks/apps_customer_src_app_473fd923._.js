(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/apps/customer/src/app/hooks/useCart.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useCart": (()=>useCart)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
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
    // Set mounted flag first
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCart.useEffect": ()=>{
            setIsMounted(true);
        }
    }["useCart.useEffect"], []);
    // Load cart from localStorage on mount (client-side only)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCart.useEffect": ()=>{
            if (!isMounted) return;
            try {
                const savedCart = localStorage.getItem(CART_STORAGE_KEY);
                const savedMetadata = localStorage.getItem(CART_METADATA_STORAGE_KEY);
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
                localStorage.removeItem(CART_STORAGE_KEY);
                localStorage.removeItem(CART_METADATA_STORAGE_KEY);
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
                try {
                    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
                } catch (error) {
                    console.error('Error saving cart to localStorage:', error);
                }
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
                try {
                    localStorage.setItem(CART_METADATA_STORAGE_KEY, JSON.stringify(cartMetadata));
                } catch (error) {
                    console.error('Error saving cart metadata to localStorage:', error);
                }
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
                localStorage.removeItem(CART_STORAGE_KEY);
                localStorage.removeItem(CART_METADATA_STORAGE_KEY);
            }
        }
    }["useCart.useCallback[clearCart]"], [
        isMounted
    ]);
    // Calculate total price
    const calculateTotalPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[calculateTotalPrice]": ()=>{
            return Object.entries(cart).reduce({
                "useCart.useCallback[calculateTotalPrice]": (total, [cartKey, quantity])=>{
                    const metadata = cartMetadata[cartKey];
                    if (!metadata) return total;
                    const itemTotal = metadata.basePrice * quantity;
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
"[project]/apps/customer/src/app/food/detail/[slug]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>FoodDetailPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControlLabel/FormControlLabel.js [app-client] (ecmascript) <export default as FormControlLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Checkbox/Checkbox.js [app-client] (ecmascript) <export default as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-client] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Snackbar$2f$Snackbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Snackbar$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Snackbar/Snackbar.js [app-client] (ecmascript) <export default as Snackbar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-client] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Divider/Divider.js [app-client] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/customer/src/app/hooks/useCart.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function FoodDetailPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const { addToCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const [foodItem, setFoodItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [selectedAddOns, setSelectedAddOns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [specialInstructions, setSpecialInstructions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [snackbarOpen, setSnackbarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [snackbarMessage, setSnackbarMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FoodDetailPage.useEffect": ()=>{
            const fetchFoodItem = {
                "FoodDetailPage.useEffect.fetchFoodItem": async ()=>{
                    // Mock data - ในการทำงานจริงจะดึงจาก API
                    const slug = params.slug;
                    // สร้าง mock data ตาม slug
                    const mockFoodItems = {
                        'organic-quinoa-bowl': {
                            id: 'cm001',
                            slug: 'organic-quinoa-bowl',
                            name: 'โบวล์ควินัวออร์แกนิก',
                            description: 'ควินัวสีแดงอินทรีย์ อะโวคาโดสดสไลซ์ ผักโขมอ่อน เพอโรนิค่า เมล็ดซันฟลาวเวอร์ ราดด้วยน้ำสลัดมะนาวผสมเฮมป์ออยล์',
                            price: 285,
                            originalPrice: 350,
                            discountPercent: 19,
                            imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop&crop=center',
                            emoji: '🥗',
                            rating: 4.8,
                            isVegan: true,
                            isGlutenFree: true,
                            nutritionalInfo: {
                                protein: '14g',
                                carbs: '32g',
                                fat: '18g',
                                fiber: '8g'
                            },
                            restaurant: {
                                name: 'Green Garden Organic',
                                deliveryTime: '25-30 นาที'
                            }
                        },
                        'premium-acai-bowl': {
                            id: 'cm002',
                            slug: 'premium-acai-bowl',
                            name: 'อาซาอิโบวล์พรีเมี่ยม',
                            description: 'อาซาอิเบอรี่แท้จากบราซิล ผสมกล้วยโฮมสดแช่แข็ง โรยด้วยโกรนลาฮาร์ดเมด บลูเบอรี่สด สตรอเบอรี่ กีวีฟรุต กะลามะพร้าวคั่ว',
                            price: 245,
                            originalPrice: 295,
                            discountPercent: 17,
                            imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop&crop=center',
                            emoji: '🍓',
                            rating: 4.9,
                            isVegan: true,
                            isGlutenFree: false,
                            nutritionalInfo: {
                                protein: '8g',
                                carbs: '45g',
                                fat: '12g',
                                fiber: '11g'
                            },
                            restaurant: {
                                name: 'Amazon Açaí House',
                                deliveryTime: '15-20 นาที'
                            }
                        },
                        'teriyaki-salmon-vegetables': {
                            id: 'cm003',
                            slug: 'teriyaki-salmon-vegetables',
                            name: 'แซลมอนเทริยากิพร้อมผัก',
                            description: 'แซลมอนนอร์เวย์เกรดพรีเมี่ยม หมักซอสเทริยากิโฮมเมด เสิร์ฟพร้อมบรอกโคลี่อบ แครอทเบบี้ ข้าวไรซ์เบอรี่ หน่อไผ่ญี่ปุ่น',
                            price: 485,
                            originalPrice: 590,
                            discountPercent: 18,
                            imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop&crop=center',
                            emoji: '🍣',
                            rating: 4.7,
                            isVegan: false,
                            isGlutenFree: false,
                            nutritionalInfo: {
                                protein: '32g',
                                carbs: '28g',
                                fat: '16g',
                                fiber: '6g'
                            },
                            restaurant: {
                                name: 'Ocean Kitchen',
                                deliveryTime: '30-35 นาที'
                            }
                        },
                        'green-detox-smoothie': {
                            id: 'cm004',
                            slug: 'green-detox-smoothie',
                            name: 'กรีนดีท็อกซ์สมูธี่',
                            description: 'เครื่องดื่มล้างพิษ ผสมผักเคลคัดพิเศษ คื่นช่าย แอปเปิ้ลเขียว แตงกวาอินทรีย์ มะนาวสด ขิงแก่ สไปรูลิน่า',
                            price: 125,
                            originalPrice: 155,
                            discountPercent: 19,
                            imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&h=600&fit=crop&crop=center',
                            emoji: '🥬',
                            rating: 4.6,
                            isVegan: true,
                            isGlutenFree: true,
                            nutritionalInfo: {
                                protein: '4g',
                                carbs: '18g',
                                fat: '1g',
                                fiber: '5g'
                            },
                            restaurant: {
                                name: 'Pure Wellness Bar',
                                deliveryTime: '10-15 นาที'
                            }
                        },
                        'lavender-chia-pudding': {
                            id: 'cm005',
                            slug: 'lavender-chia-pudding',
                            name: 'เชียพุดดิ้งลัเวนเดอร์',
                            description: 'เมล็ดเชียชั้นเยี่ยม แช่นมอัลมอนด์ ผสมน้ำผึ้งมานูกา กลีบลัเวนเดอร์อบแห้ง โรยด้วยบลูเบอรี่สด ฟลอสมิ๊กซ์ เกล็ดมะพร้าว',
                            price: 185,
                            originalPrice: 220,
                            discountPercent: 16,
                            imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
                            emoji: '🥥',
                            rating: 4.8,
                            isVegan: true,
                            isGlutenFree: true,
                            nutritionalInfo: {
                                protein: '6g',
                                carbs: '24g',
                                fat: '11g',
                                fiber: '8g'
                            },
                            restaurant: {
                                name: 'Zen Healthy Treats',
                                deliveryTime: '15-20 นาที'
                            }
                        },
                        'premium-avocado-toast': {
                            id: 'cm006',
                            slug: 'premium-avocado-toast',
                            name: 'อะโวคาโดโทสต์พรีเมี่ยม',
                            description: 'ขนมปังซาวร์โดเซเกิร์ด เนื้อแท้ 100% โรยด้วยอะโวคาโดเฮสแมช เพิ่มไข่ดาวออร์แกนิก เมล็ดเซีย เกล็ดพริกแดง ปรุงรสเกลือหิมาลัย',
                            price: 225,
                            originalPrice: 275,
                            discountPercent: 18,
                            imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&h=600&fit=crop&crop=center',
                            emoji: '🥑',
                            rating: 4.7,
                            isVegan: false,
                            isGlutenFree: false,
                            nutritionalInfo: {
                                protein: '14g',
                                carbs: '32g',
                                fat: '18g',
                                fiber: '9g'
                            },
                            restaurant: {
                                name: 'Artisan Bread Co.',
                                deliveryTime: '20-25 นาที'
                            }
                        }
                    };
                    const item = mockFoodItems[slug] || mockFoodItems['organic-quinoa-bowl'];
                    setFoodItem(item);
                }
            }["FoodDetailPage.useEffect.fetchFoodItem"];
            fetchFoodItem();
        }
    }["FoodDetailPage.useEffect"], [
        params.slug
    ]);
    const handleAddOnChange = (addOnId)=>{
        setSelectedAddOns((prev)=>({
                ...prev,
                [addOnId]: !prev[addOnId]
            }));
    };
    const calculateTotalPrice = ()=>{
        if (!foodItem) return 0;
        let total = foodItem.price * quantity;
        // Add selected add-ons
        availableAddOns.forEach((addOn)=>{
            if (selectedAddOns[addOn.id]) {
                total += addOn.price * quantity;
            }
        });
        return total;
    };
    const increaseQuantity = ()=>setQuantity((prev)=>prev + 1);
    const decreaseQuantity = ()=>setQuantity((prev)=>prev > 1 ? prev - 1 : 1);
    const handleAddToCart = ()=>{
        if (!foodItem) return;
        // Convert selected add-ons to the format expected by useCart
        const addOnsMap = {};
        availableAddOns.forEach((addOn)=>{
            addOnsMap[addOn.id] = selectedAddOns[addOn.id] || false;
        });
        addToCart(foodItem.id, foodItem.name, quantity, addOnsMap, specialInstructions.trim(), foodItem.price);
        setSnackbarMessage(`เพิ่ม ${foodItem.name} ลงตะกร้าแล้ว!`);
        setSnackbarOpen(true);
    };
    const availableAddOns = [
        {
            id: '1',
            name: 'ชีสเฟต้าเพิ่ม',
            description: 'ชีสเฟต้านำเข้าคุณภาพสูง',
            price: 45
        },
        {
            id: '2',
            name: 'อะโวคาโด',
            description: 'อะโวคาโดสดใหม่หั่นชิ้น',
            price: 60
        },
        {
            id: '3',
            name: 'มะกอกดำ',
            description: 'มะกอกดำคาลามาต้า',
            price: 35
        },
        {
            id: '4',
            name: 'อัลมอนด์แผ่น',
            description: 'อัลมอนด์แผ่นคั่วหอม',
            price: 40
        },
        {
            id: '5',
            name: 'เมล็ดทานตะวัน',
            description: 'เมล็ดทานตะวันคั่วกรอบ',
            price: 25
        },
        {
            id: '6',
            name: 'น้ำสลัดบัลซามิค',
            description: 'น้ำสลัดบัลซามิคพิเศษ',
            price: 30
        }
    ];
    if (!foodItem) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    color: '#64748b',
                    fontSize: '24px'
                },
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                lineNumber: 298,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
            lineNumber: 292,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    p: 2,
                    '@media (min-width: 600px)': {
                        p: 3
                    },
                    '@media (min-width: 900px)': {
                        px: 4
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                            onClick: ()=>router.back(),
                            sx: {
                                width: 48,
                                height: 48,
                                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.2) 0%, 
                    rgba(255, 255, 255, 0.1) 100%
                  )
                `,
                                backdropFilter: 'blur(30px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '50%',
                                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                                '@media (min-width: 600px)': {
                                    width: 52,
                                    height: 52
                                },
                                '&:hover': {
                                    background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.3) 0%, 
                      rgba(255, 255, 255, 0.15) 100%
                    )
                  `,
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.1)'
                                }
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                size: 22,
                                color: "#0f172a"
                            }, void 0, false, {
                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                lineNumber: 359,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                            lineNumber: 329,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: 'flex',
                                gap: 2
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                sx: {
                                    width: 48,
                                    height: 48,
                                    background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.2) 0%, 
                    rgba(255, 255, 255, 0.1) 100%
                  )
                `,
                                    backdropFilter: 'blur(30px) saturate(180%)',
                                    WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '50%',
                                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.3s ease',
                                    '@media (min-width: 600px)': {
                                        width: 52,
                                        height: 52
                                    },
                                    '&:hover': {
                                        background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.3) 0%, 
                      rgba(255, 255, 255, 0.15) 100%
                    )
                  `,
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.1)'
                                    }
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                    size: 20,
                                    color: "#0f172a"
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                    lineNumber: 390,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                lineNumber: 363,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                            lineNumber: 362,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                    lineNumber: 323,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    position: 'relative',
                    width: '100%',
                    height: '360px',
                    mt: '0px',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02))',
                    '@media (min-width: 600px)': {
                        height: '440px'
                    },
                    '@media (min-width: 900px)': {
                        height: '520px'
                    }
                },
                children: [
                    foodItem.discountPercent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            position: 'absolute',
                            bottom: 20,
                            left: 20,
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            color: 'white',
                            px: 2.5,
                            py: 1.2,
                            borderRadius: '18px',
                            fontSize: '15px',
                            fontWeight: 600,
                            zIndex: 2,
                            boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)'
                        },
                        children: [
                            "-",
                            foodItem.discountPercent,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                        lineNumber: 409,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            position: 'absolute',
                            bottom: 20,
                            right: 20,
                            background: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            px: 2,
                            py: 1,
                            borderRadius: '14px',
                            fontSize: '15px',
                            fontWeight: 500,
                            zIndex: 2,
                            backdropFilter: 'blur(15px)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                size: 16,
                                fill: "currentColor"
                            }, void 0, false, {
                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                lineNumber: 445,
                                columnNumber: 11
                            }, this),
                            foodItem.rating
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                        lineNumber: 428,
                        columnNumber: 9
                    }, this),
                    foodItem.imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        component: "img",
                        src: foodItem.imageUrl,
                        alt: foodItem.name,
                        sx: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                        lineNumber: 450,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            fontSize: '140px'
                        },
                        children: foodItem.emoji || '🍽️'
                    }, void 0, false, {
                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                        lineNumber: 461,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                lineNumber: 397,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    flex: 1,
                    overflowY: 'auto',
                    mb: '100px',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    scrollbarWidth: 'none'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            py: 3,
                            px: 2,
                            background: 'rgba(255, 255, 255, 0.5)',
                            backdropFilter: 'blur(10px)',
                            '@media (min-width: 600px)': {
                                px: 3
                            },
                            '@media (min-width: 900px)': {
                                px: 4
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                    mb: 2
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "h4",
                                                sx: {
                                                    fontWeight: 700,
                                                    color: '#0f172a',
                                                    mb: 1,
                                                    fontSize: '24px',
                                                    '@media (min-width: 600px)': {
                                                        fontSize: '28px'
                                                    }
                                                },
                                                children: foodItem.name
                                            }, void 0, false, {
                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                lineNumber: 493,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: 'flex',
                                                    gap: 1,
                                                    mb: 2
                                                },
                                                children: [
                                                    foodItem.isVegan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                        label: "Vegan",
                                                        size: "small",
                                                        sx: {
                                                            background: 'linear-gradient(135deg, #10b981, #059669)',
                                                            color: 'white',
                                                            fontWeight: 500,
                                                            fontSize: '12px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 23
                                                    }, this),
                                                    foodItem.isGlutenFree && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                        label: "Gluten Free",
                                                        size: "small",
                                                        sx: {
                                                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                                            color: 'white',
                                                            fontWeight: 500,
                                                            fontSize: '12px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                        lineNumber: 517,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                lineNumber: 503,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                        lineNumber: 492,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            textAlign: 'right'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "h5",
                                                sx: {
                                                    fontWeight: 700,
                                                    color: '#10b981',
                                                    fontSize: '24px',
                                                    '@media (min-width: 600px)': {
                                                        fontSize: '28px'
                                                    }
                                                },
                                                children: [
                                                    "฿",
                                                    foodItem.price
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                lineNumber: 532,
                                                columnNumber: 19
                                            }, this),
                                            foodItem.originalPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "body2",
                                                sx: {
                                                    color: '#94a3b8',
                                                    textDecoration: 'line-through',
                                                    fontSize: '16px'
                                                },
                                                children: [
                                                    "฿",
                                                    foodItem.originalPrice
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                lineNumber: 541,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                        lineNumber: 531,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                lineNumber: 491,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "body1",
                                sx: {
                                    color: '#475569',
                                    mb: 3,
                                    lineHeight: 1.6,
                                    fontSize: '14px',
                                    '@media (min-width: 600px)': {
                                        fontSize: '16px'
                                    }
                                },
                                children: foodItem.description
                            }, void 0, false, {
                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                lineNumber: 552,
                                columnNumber: 15
                            }, this),
                            foodItem.restaurant && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    background: 'rgba(16, 185, 129, 0.2)',
                                    borderRadius: '12px',
                                    p: 2,
                                    mb: 3
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "subtitle2",
                                        sx: {
                                            fontWeight: 600,
                                            color: '#0f172a',
                                            mb: 0.5
                                        },
                                        children: foodItem.restaurant.name
                                    }, void 0, false, {
                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                        lineNumber: 570,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        sx: {
                                            color: '#10b981'
                                        },
                                        children: [
                                            "เวลาจัดส่ง: ",
                                            foodItem.restaurant.deliveryTime
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                        lineNumber: 577,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                lineNumber: 564,
                                columnNumber: 17
                            }, this),
                            foodItem.nutritionalInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "h6",
                                        sx: {
                                            fontWeight: 600,
                                            color: '#0f172a',
                                            mb: 2,
                                            fontSize: '16px',
                                            '@media (min-width: 600px)': {
                                                fontSize: '18px'
                                            }
                                        },
                                        children: "ข้อมูลโภชนาการ"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                        lineNumber: 586,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(2, 1fr)',
                                            gap: 2,
                                            mb: 3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    background: 'rgba(59, 130, 246, 0.15)',
                                                    borderRadius: '8px',
                                                    p: 1.5,
                                                    textAlign: 'center'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "caption",
                                                        sx: {
                                                            color: '#64748b'
                                                        },
                                                        children: "โปรตีน"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                        lineNumber: 607,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "subtitle2",
                                                        sx: {
                                                            fontWeight: 600,
                                                            color: '#3b82f6'
                                                        },
                                                        children: foodItem.nutritionalInfo.protein
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                        lineNumber: 608,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                lineNumber: 601,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    background: 'rgba(245, 158, 11, 0.15)',
                                                    borderRadius: '8px',
                                                    p: 1.5,
                                                    textAlign: 'center'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "caption",
                                                        sx: {
                                                            color: '#64748b'
                                                        },
                                                        children: "คาร์บ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                        lineNumber: 618,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "subtitle2",
                                                        sx: {
                                                            fontWeight: 600,
                                                            color: '#f59e0b'
                                                        },
                                                        children: foodItem.nutritionalInfo.carbs
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                        lineNumber: 619,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                lineNumber: 612,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    background: 'rgba(239, 68, 68, 0.15)',
                                                    borderRadius: '8px',
                                                    p: 1.5,
                                                    textAlign: 'center'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "caption",
                                                        sx: {
                                                            color: '#64748b'
                                                        },
                                                        children: "ไขมัน"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                        lineNumber: 629,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "subtitle2",
                                                        sx: {
                                                            fontWeight: 600,
                                                            color: '#ef4444'
                                                        },
                                                        children: foodItem.nutritionalInfo.fat
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                        lineNumber: 630,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                lineNumber: 623,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    background: 'rgba(16, 185, 129, 0.15)',
                                                    borderRadius: '8px',
                                                    p: 1.5,
                                                    textAlign: 'center'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "caption",
                                                        sx: {
                                                            color: '#64748b'
                                                        },
                                                        children: "ไฟเบอร์"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                        lineNumber: 640,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "subtitle2",
                                                        sx: {
                                                            fontWeight: 600,
                                                            color: '#10b981'
                                                        },
                                                        children: foodItem.nutritionalInfo.fiber
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                        lineNumber: 641,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                lineNumber: 634,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                        lineNumber: 595,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                        lineNumber: 483,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            py: 3,
                            px: 2,
                            background: 'rgba(255, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                            '@media (min-width: 600px)': {
                                px: 3
                            },
                            '@media (min-width: 900px)': {
                                px: 4
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h6",
                                sx: {
                                    fontWeight: 600,
                                    color: '#0f172a',
                                    mb: 2,
                                    fontSize: '16px',
                                    '@media (min-width: 600px)': {
                                        fontSize: '18px'
                                    }
                                },
                                children: "เสริมเพิ่มเติม"
                            }, void 0, false, {
                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                lineNumber: 659,
                                columnNumber: 15
                            }, this),
                            availableAddOns.map((addOn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                            control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                                                checked: selectedAddOns[addOn.id] || false,
                                                onChange: ()=>handleAddOnChange(addOn.id),
                                                sx: {
                                                    color: '#10b981',
                                                    '&.Mui-checked': {
                                                        color: '#10b981'
                                                    }
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                lineNumber: 673,
                                                columnNumber: 23
                                            }, void 0),
                                            label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            width: '100%'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "subtitle2",
                                                                sx: {
                                                                    fontWeight: 500,
                                                                    color: '#0f172a'
                                                                },
                                                                children: addOn.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                                lineNumber: 687,
                                                                columnNumber: 27
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "subtitle2",
                                                                sx: {
                                                                    fontWeight: 600,
                                                                    color: '#10b981'
                                                                },
                                                                children: [
                                                                    "+฿",
                                                                    addOn.price
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                                lineNumber: 690,
                                                                columnNumber: 27
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                        lineNumber: 686,
                                                        columnNumber: 25
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "caption",
                                                        sx: {
                                                            color: '#64748b'
                                                        },
                                                        children: addOn.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                        lineNumber: 694,
                                                        columnNumber: 25
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                lineNumber: 685,
                                                columnNumber: 23
                                            }, void 0),
                                            sx: {
                                                width: '100%',
                                                ml: 0,
                                                mr: 0,
                                                '& .MuiFormControlLabel-label': {
                                                    width: '100%'
                                                }
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                            lineNumber: 671,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                            sx: {
                                                my: 1.5
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                            lineNumber: 706,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, addOn.id, true, {
                                    fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                    lineNumber: 670,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                        lineNumber: 651,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            py: 3,
                            px: 2,
                            background: 'rgba(255, 255, 255, 0.4)',
                            backdropFilter: 'blur(10px)',
                            '@media (min-width: 600px)': {
                                px: 3
                            },
                            '@media (min-width: 900px)': {
                                px: 4
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h6",
                                sx: {
                                    fontWeight: 600,
                                    color: '#0f172a',
                                    mb: 2,
                                    fontSize: '16px',
                                    '@media (min-width: 600px)': {
                                        fontSize: '18px'
                                    }
                                },
                                children: "คำสั่งพิเศษ"
                            }, void 0, false, {
                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                lineNumber: 720,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                fullWidth: true,
                                multiline: true,
                                rows: 2,
                                variant: "outlined",
                                placeholder: "เช่น ไม่ใส่หอม, ใส่พริกเพิ่ม, ฯลฯ",
                                value: specialInstructions,
                                onChange: (e)=>setSpecialInstructions(e.target.value),
                                sx: {
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '16px',
                                        background: 'rgba(248, 250, 252, 0.8)',
                                        fontSize: '14px',
                                        '@media (min-width: 600px)': {
                                            fontSize: '16px'
                                        },
                                        '& fieldset': {
                                            borderColor: 'rgba(16, 185, 129, 0.3)'
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
                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                lineNumber: 730,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                        lineNumber: 712,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                lineNumber: 474,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                    p: 2,
                    '@media (min-width: 600px)': {
                        p: 3,
                        px: 4
                    },
                    '@media (min-width: 900px)': {
                        px: 4
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        justifyContent: 'space-between',
                        gap: 2,
                        maxWidth: '100%',
                        '@media (min-width: 600px)': {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 3
                        }
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                order: 1,
                                '@media (min-width: 600px)': {
                                    justifyContent: 'flex-start'
                                }
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "subtitle1",
                                    sx: {
                                        fontWeight: 500,
                                        color: '#0f172a',
                                        fontSize: '16px'
                                    },
                                    children: "จำนวน:"
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                    lineNumber: 798,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                            onClick: decreaseQuantity,
                                            disabled: quantity <= 1,
                                            sx: {
                                                width: 32,
                                                height: 32,
                                                background: '#f1f5f9',
                                                '&:hover': {
                                                    background: '#e2e8f0'
                                                },
                                                '&.Mui-disabled': {
                                                    background: '#f8fafc',
                                                    color: '#cbd5e1'
                                                },
                                                '@media (min-width: 600px)': {
                                                    width: 36,
                                                    height: 36
                                                }
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                lineNumber: 818,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                            lineNumber: 806,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            sx: {
                                                mx: 1,
                                                minWidth: '24px',
                                                textAlign: 'center',
                                                fontWeight: 600,
                                                fontSize: '16px'
                                            },
                                            children: quantity
                                        }, void 0, false, {
                                            fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                            lineNumber: 820,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                            onClick: increaseQuantity,
                                            sx: {
                                                width: 32,
                                                height: 32,
                                                background: '#f1f5f9',
                                                '&:hover': {
                                                    background: '#e2e8f0'
                                                },
                                                '@media (min-width: 600px)': {
                                                    width: 36,
                                                    height: 36
                                                }
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                                lineNumber: 839,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                            lineNumber: 829,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                    lineNumber: 805,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                            lineNumber: 788,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 2,
                                order: 2,
                                width: '100%',
                                '@media (min-width: 600px)': {
                                    gap: 3,
                                    width: 'auto'
                                }
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        textAlign: 'left',
                                        '@media (min-width: 600px)': {
                                            textAlign: 'right'
                                        }
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                color: '#64748b',
                                                fontSize: '12px'
                                            },
                                            children: "ราคารวม"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                            lineNumber: 861,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "h6",
                                            sx: {
                                                fontWeight: 700,
                                                color: '#10b981',
                                                fontSize: '20px',
                                                '@media (min-width: 600px)': {
                                                    fontSize: '24px'
                                                }
                                            },
                                            children: [
                                                "฿",
                                                calculateTotalPrice().toFixed(0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                            lineNumber: 864,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                    lineNumber: 857,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    variant: "contained",
                                    onClick: handleAddToCart,
                                    sx: {
                                        background: 'linear-gradient(135deg, #10b981, #059669)',
                                        color: 'white',
                                        borderRadius: '16px',
                                        px: 3,
                                        py: 1.2,
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                                        minHeight: '40px',
                                        flex: 1,
                                        '@media (min-width: 600px)': {
                                            px: 4,
                                            py: 1.4,
                                            fontSize: '16px',
                                            minHeight: '44px',
                                            flex: 'none'
                                        },
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #059669, #047857)',
                                            boxShadow: '0 12px 30px rgba(16, 185, 129, 0.4)'
                                        }
                                    },
                                    children: "เพิ่มลงตะกร้า"
                                }, void 0, false, {
                                    fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                                    lineNumber: 874,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                            lineNumber: 845,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                    lineNumber: 774,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                lineNumber: 760,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Snackbar$2f$Snackbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Snackbar$3e$__["Snackbar"], {
                open: snackbarOpen,
                autoHideDuration: 3000,
                onClose: ()=>setSnackbarOpen(false),
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                    onClose: ()=>setSnackbarOpen(false),
                    severity: "success",
                    sx: {
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        '& .MuiAlert-icon': {
                            color: 'white'
                        }
                    },
                    children: snackbarMessage
                }, void 0, false, {
                    fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                    lineNumber: 915,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
                lineNumber: 909,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/customer/src/app/food/detail/[slug]/page.tsx",
        lineNumber: 306,
        columnNumber: 5
    }, this);
}
_s(FoodDetailPage, "yceSuXhaHoC7WQrja/v1EQzLJNg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = FoodDetailPage;
var _c;
__turbopack_context__.k.register(_c, "FoodDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_customer_src_app_473fd923._.js.map