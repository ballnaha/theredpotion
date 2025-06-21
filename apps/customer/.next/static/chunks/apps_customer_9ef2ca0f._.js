(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/apps/customer/theme.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "liquidGlassTheme": (()=>liquidGlassTheme)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/createTheme.js [app-client] (ecmascript) <export default as createTheme>");
'use client';
;
// iOS Liquid Glass Color Palette
const colors = {
    primary: {
        main: 'rgba(0, 122, 255, 0.85)',
        light: 'rgba(0, 122, 255, 0.6)',
        dark: 'rgba(0, 122, 255, 1)'
    },
    secondary: {
        main: 'rgba(255, 59, 48, 0.85)',
        light: 'rgba(255, 59, 48, 0.6)',
        dark: 'rgba(255, 59, 48, 1)'
    },
    background: {
        default: 'rgba(242, 242, 247, 0.9)',
        paper: 'rgba(255, 255, 255, 0.7)',
        glass: 'rgba(255, 255, 255, 0.25)',
        glassSecondary: 'rgba(255, 255, 255, 0.15)'
    },
    surface: {
        primary: 'rgba(255, 255, 255, 0.8)',
        secondary: 'rgba(248, 248, 248, 0.9)',
        tertiary: 'rgba(242, 242, 247, 0.8)'
    },
    accent: {
        green: 'rgba(52, 199, 89, 0.85)',
        orange: 'rgba(255, 149, 0, 0.85)',
        purple: 'rgba(175, 82, 222, 0.85)',
        pink: 'rgba(255, 45, 85, 0.85)'
    }
};
// Glass morphism shadows and blurs
const glassMorphism = {
    backdrop: 'blur(20px) saturate(180%)',
    backdropSecondary: 'blur(40px) saturate(200%)',
    shadow: {
        glass: '0 8px 32px rgba(31, 38, 135, 0.37)',
        soft: '0 4px 16px rgba(0, 0, 0, 0.1)',
        medium: '0 8px 24px rgba(0, 0, 0, 0.15)',
        strong: '0 12px 40px rgba(0, 0, 0, 0.2)'
    },
    border: 'rgba(255, 255, 255, 0.18)'
};
const themeOptions = {
    palette: {
        mode: 'light',
        primary: colors.primary,
        secondary: colors.secondary,
        background: colors.background,
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)'
        }
    },
    typography: {
        fontFamily: [
            '"Prompt"',
            '-apple-system',
            'BlinkMacSystemFont',
            '"SF Pro Display"',
            '"SF Pro Text"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
        h1: {
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            '@media (min-width:600px)': {
                fontSize: '2.5rem'
            }
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            '@media (min-width:600px)': {
                fontSize: '2rem'
            }
        },
        h3: {
            fontSize: '1.375rem',
            fontWeight: 600,
            '@media (min-width:600px)': {
                fontSize: '1.75rem'
            }
        },
        h4: {
            fontSize: '1.25rem',
            fontWeight: 600,
            '@media (min-width:600px)': {
                fontSize: '1.5rem'
            }
        },
        h5: {
            fontSize: '1.125rem',
            fontWeight: 600,
            '@media (min-width:600px)': {
                fontSize: '1.25rem'
            }
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            '@media (min-width:600px)': {
                fontSize: '1.125rem'
            }
        },
        body1: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
            '@media (min-width:600px)': {
                fontSize: '1rem'
            }
        },
        body2: {
            fontSize: '0.75rem',
            lineHeight: 1.5,
            '@media (min-width:600px)': {
                fontSize: '0.875rem'
            }
        }
    },
    shape: {
        borderRadius: 16
    },
    shadows: [
        'none',
        glassMorphism.shadow.soft,
        glassMorphism.shadow.soft,
        glassMorphism.shadow.medium,
        glassMorphism.shadow.medium,
        glassMorphism.shadow.medium,
        glassMorphism.shadow.strong,
        glassMorphism.shadow.strong,
        glassMorphism.shadow.strong,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass,
        glassMorphism.shadow.glass
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: `
            linear-gradient(135deg, 
              rgba(74, 144, 226, 0.1) 0%, 
              rgba(102, 126, 234, 0.1) 100%
            )
          `,
                    minHeight: '100vh',
                    WebkitBackdropFilter: glassMorphism.backdrop,
                    backdropFilter: glassMorphism.backdrop
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.background.paper,
                    backdropFilter: glassMorphism.backdrop,
                    WebkitBackdropFilter: glassMorphism.backdrop,
                    border: `1px solid ${glassMorphism.border}`,
                    borderRadius: 16
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.background.glass,
                    backdropFilter: glassMorphism.backdropSecondary,
                    WebkitBackdropFilter: glassMorphism.backdropSecondary,
                    border: `1px solid ${glassMorphism.border}`,
                    borderRadius: 20,
                    boxShadow: glassMorphism.shadow.glass,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: glassMorphism.shadow.strong
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontWeight: 600,
                    backdropFilter: glassMorphism.backdrop,
                    WebkitBackdropFilter: glassMorphism.backdrop,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                },
                contained: {
                    backgroundColor: colors.primary.main,
                    color: 'white',
                    border: `1px solid ${glassMorphism.border}`,
                    '&:hover': {
                        backgroundColor: colors.primary.dark,
                        transform: 'translateY(-2px)',
                        boxShadow: glassMorphism.shadow.medium
                    }
                },
                outlined: {
                    backgroundColor: colors.background.glassSecondary,
                    backdropFilter: glassMorphism.backdrop,
                    WebkitBackdropFilter: glassMorphism.backdrop,
                    border: `1px solid ${glassMorphism.border}`,
                    '&:hover': {
                        backgroundColor: colors.background.glass,
                        transform: 'translateY(-1px)'
                    }
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.background.glass,
                    backdropFilter: glassMorphism.backdrop,
                    WebkitBackdropFilter: glassMorphism.backdrop,
                    border: 'none',
                    borderBottom: `1px solid ${glassMorphism.border}`,
                    boxShadow: 'none'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: colors.background.glassSecondary,
                        backdropFilter: glassMorphism.backdrop,
                        WebkitBackdropFilter: glassMorphism.backdrop,
                        borderRadius: {
                            xs: 8,
                            sm: 12
                        },
                        fontSize: {
                            xs: '14px',
                            sm: '16px'
                        },
                        minHeight: {
                            xs: '40px',
                            sm: '48px'
                        },
                        '& fieldset': {
                            border: `1px solid ${glassMorphism.border}`
                        },
                        '&:hover fieldset': {
                            border: `1px solid ${colors.primary.light}`
                        },
                        '&.Mui-focused fieldset': {
                            border: `2px solid ${colors.primary.main}`
                        },
                        '&.MuiInputBase-sizeSmall': {
                            minHeight: {
                                xs: '36px',
                                sm: '40px'
                            },
                            fontSize: {
                                xs: '13px',
                                sm: '14px'
                            }
                        }
                    },
                    '& .MuiInputBase-input': {
                        padding: {
                            xs: '8px 12px',
                            sm: '12px 16px'
                        },
                        fontSize: {
                            xs: '14px',
                            sm: '16px'
                        },
                        '&.MuiInputBase-inputSizeSmall': {
                            padding: {
                                xs: '6px 10px',
                                sm: '8px 12px'
                            },
                            fontSize: {
                                xs: '13px',
                                sm: '14px'
                            }
                        }
                    }
                }
            }
        }
    }
};
const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])(themeOptions);
const liquidGlassTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
    ...themeOptions,
    palette: {
        ...themeOptions.palette,
        glass: {
            primary: colors.surface.primary,
            secondary: colors.surface.secondary,
            tertiary: colors.surface.tertiary
        },
        accent: colors.accent
    }
});
const __TURBOPACK__default__export__ = liquidGlassTheme;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/customer/src/app/utils/tenant.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Multi-Tenant Management System
__turbopack_context__.s({
    "detectTenant": (()=>detectTenant),
    "generateTenantUrl": (()=>generateTenantUrl),
    "getAllTenants": (()=>getAllTenants),
    "getCurrentTenant": (()=>getCurrentTenant),
    "getTenantApiUrl": (()=>getTenantApiUrl),
    "getTenantConfig": (()=>getTenantConfig),
    "getTenantLSItem": (()=>getTenantLSItem),
    "getTenantLiffId": (()=>getTenantLiffId),
    "getTenantStorageKey": (()=>getTenantStorageKey),
    "isTenantRequest": (()=>isTenantRequest),
    "removeTenantLSItem": (()=>removeTenantLSItem),
    "setTenantLSItem": (()=>setTenantLSItem),
    "validateTenant": (()=>validateTenant),
    "validateTenantLiff": (()=>validateTenantLiff)
});
// Mock tenant configurations (จริงๆ จะดึงจาก database)
const TENANT_CONFIGS = {
    'restaurant1': {
        id: 'restaurant1',
        name: 'Green Garden Organic',
        subdomain: 'restaurant1',
        domain: 'restaurant1.theredpotion.com',
        liffId: 'xxx-restaurant1',
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
        domain: 'restaurant2.theredpotion.com',
        liffId: 'yyy-restaurant2',
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
        domain: 'restaurant3.theredpotion.com',
        liffId: 'zzz-restaurant3',
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
const detectTenant = ()=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    // Method 1: Subdomain detection
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
const getTenantConfig = (tenantId)=>{
    const tenant = tenantId || detectTenant();
    if (!tenant) return null;
    return TENANT_CONFIGS[tenant] || null;
};
const getCurrentTenant = ()=>{
    return getTenantConfig();
};
const isTenantRequest = ()=>{
    return detectTenant() !== null;
};
const getTenantApiUrl = (tenantId)=>{
    const tenant = tenantId || detectTenant();
    if (!tenant) return '/api';
    return `/api/tenant/${tenant}`;
};
const getTenantStorageKey = (key, tenantId)=>{
    const tenant = tenantId || detectTenant();
    if (!tenant) return key;
    return `${tenant}_${key}`;
};
const getTenantLSItem = (key)=>{
    try {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        const tenantKey = getTenantStorageKey(key);
        return localStorage.getItem(tenantKey);
    } catch (error) {
        console.warn('getTenantLSItem failed:', error);
        return null;
    }
};
const setTenantLSItem = (key, value)=>{
    try {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        const tenantKey = getTenantStorageKey(key);
        localStorage.setItem(tenantKey, value);
        return true;
    } catch (error) {
        console.warn('setTenantLSItem failed:', error);
        return false;
    }
};
const removeTenantLSItem = (key)=>{
    try {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        const tenantKey = getTenantStorageKey(key);
        localStorage.removeItem(tenantKey);
        return true;
    } catch (error) {
        console.warn('removeTenantLSItem failed:', error);
        return false;
    }
};
const getAllTenants = ()=>{
    return Object.values(TENANT_CONFIGS);
};
const validateTenant = (tenantId)=>{
    return tenantId in TENANT_CONFIGS;
};
const generateTenantUrl = (tenantId, path = '')=>{
    const config = TENANT_CONFIGS[tenantId];
    if (!config) return '';
    const protocol = ("TURBOPACK compile-time truthy", 1) ? window.location.protocol : ("TURBOPACK unreachable", undefined);
    return `${protocol}//${config.domain}${path}`;
};
const getTenantLiffId = (tenantId)=>{
    const tenant = tenantId || detectTenant();
    if (!tenant) return null;
    const config = TENANT_CONFIGS[tenant];
    return config?.liffId || null;
};
const validateTenantLiff = ()=>{
    const currentTenant = detectTenant();
    if (!currentTenant) return true; // Allow if no tenant detected
    const expectedLiffId = getTenantLiffId(currentTenant);
    if (!expectedLiffId) return true; // Allow if no LIFF configured
    // In real implementation, you would check against actual LIFF context
    // For now, just return true
    return true;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/customer/src/app/components/TenantDetector.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TenantDetector)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// Client-side only tenant detection
const detectTenantFromUrl = ()=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const TENANT_CONFIGS = [
        'restaurant1',
        'restaurant2',
        'restaurant3'
    ];
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
function TenantDetector({ children, onTenantDetected }) {
    _s();
    const [detectedTenant, setDetectedTenant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TenantDetector.useEffect": ()=>{
            setIsClient(true);
        }
    }["TenantDetector.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TenantDetector.useEffect": ()=>{
            if (isClient) {
                const tenant = detectTenantFromUrl();
                setDetectedTenant(tenant);
                onTenantDetected?.(tenant);
            }
        }
    }["TenantDetector.useEffect"], [
        isClient,
        searchParams,
        pathname,
        onTenantDetected
    ]);
    // Don't render children until client-side
    if (!isClient) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(TenantDetector, "fBuqFiqMMfru1bUiUEdENO/KfBM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = TenantDetector;
var _c;
__turbopack_context__.k.register(_c, "TenantDetector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/customer/src/app/contexts/TenantContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TenantProvider": (()=>TenantProvider),
    "useTenant": (()=>useTenant),
    "useTenantApi": (()=>useTenantApi),
    "useTenantSettings": (()=>useTenantSettings)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$tenant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/customer/src/app/utils/tenant.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$components$2f$TenantDetector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/customer/src/app/components/TenantDetector.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
;
;
const TenantContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const TenantProvider = ({ children })=>{
    _s();
    const [tenant, setTenant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tenantId, setTenantId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const handleTenantDetected = (detectedTenantId)=>{
        const tenantConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$tenant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTenantConfig"])(detectedTenantId || undefined);
        console.log('Tenant detected:', {
            detectedTenantId,
            tenantConfig
        });
        setTenantId(detectedTenantId);
        setTenant(tenantConfig);
        setIsLoading(false);
    };
    const refreshTenant = ()=>{
        // This will be handled by TenantDetector
        setIsLoading(true);
    };
    const value = {
        tenant,
        tenantId,
        isLoading,
        refreshTenant
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TenantContext.Provider, {
        value: value,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$components$2f$TenantDetector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onTenantDetected: handleTenantDetected,
            children: children
        }, void 0, false, {
            fileName: "[project]/apps/customer/src/app/contexts/TenantContext.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/customer/src/app/contexts/TenantContext.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
};
_s(TenantProvider, "cK45OwmxlezCKWjKGrDn+WGtaao=");
_c = TenantProvider;
const useTenant = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(TenantContext);
    if (context === undefined) {
        throw new Error('useTenant must be used within a TenantProvider');
    }
    return context;
};
_s1(useTenant, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const useTenantSettings = ()=>{
    _s2();
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
_s2(useTenantSettings, "q+ZOhUBhEXapsS8GmMgXyFv8z9Y=", false, function() {
    return [
        useTenant
    ];
});
const useTenantApi = ()=>{
    _s3();
    const { tenantId } = useTenant();
    const getApiUrl = (endpoint)=>{
        if (!tenantId) return `/api${endpoint}`;
        return `/api/tenant/${tenantId}${endpoint}`;
    };
    return {
        getApiUrl
    };
};
_s3(useTenantApi, "gEBnf2sjX35ebSgc6wG9mpY/EdI=", false, function() {
    return [
        useTenant
    ];
});
var _c;
__turbopack_context__.k.register(_c, "TenantProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_customer_9ef2ca0f._.js.map