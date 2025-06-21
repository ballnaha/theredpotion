module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/apps/customer/theme.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "liquidGlassTheme": (()=>liquidGlassTheme)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/createTheme.js [app-ssr] (ecmascript) <export default as createTheme>");
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
const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])(themeOptions);
const liquidGlassTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
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
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/apps/customer/src/app/utils/tenant.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
    if ("TURBOPACK compile-time truthy", 1) return null;
    "TURBOPACK unreachable";
    const hostname = undefined;
    const pathname = undefined;
    // Method 2: Path-based detection
    const pathSegments = undefined;
    // Method 3: URL parameter (for development/testing)
    const urlParams = undefined;
    const tenantParam = undefined;
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
        if ("TURBOPACK compile-time truthy", 1) return null;
        "TURBOPACK unreachable";
        const tenantKey = undefined;
    } catch (error) {
        console.warn('getTenantLSItem failed:', error);
        return null;
    }
};
const setTenantLSItem = (key, value)=>{
    try {
        if ("TURBOPACK compile-time truthy", 1) return false;
        "TURBOPACK unreachable";
        const tenantKey = undefined;
    } catch (error) {
        console.warn('setTenantLSItem failed:', error);
        return false;
    }
};
const removeTenantLSItem = (key)=>{
    try {
        if ("TURBOPACK compile-time truthy", 1) return false;
        "TURBOPACK unreachable";
        const tenantKey = undefined;
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
    const protocol = ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'https:';
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
}}),
"[project]/apps/customer/src/app/contexts/TenantContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TenantProvider": (()=>TenantProvider),
    "useTenant": (()=>useTenant),
    "useTenantApi": (()=>useTenantApi),
    "useTenantSettings": (()=>useTenantSettings)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$tenant$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/customer/src/app/utils/tenant.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const TenantContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Client-side tenant detection
const detectTenantFromClient = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return null;
    "TURBOPACK unreachable";
    const hostname = undefined;
    const pathname = undefined;
    const urlParams = undefined;
    // Mock tenant configs for detection
    const TENANT_CONFIGS = undefined;
    // Method 2: Path-based detection
    const pathSegments = undefined;
    // Method 3: URL parameter (for development/testing)
    const tenantParam = undefined;
};
const TenantProvider = ({ children })=>{
    const [tenant, setTenant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tenantId, setTenantId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const refreshTenant = ()=>{
        if (!isMounted) return;
        const detectedTenantId = detectTenantFromClient();
        const tenantConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$tenant$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTenantConfig"])(detectedTenantId || undefined);
        console.log('Tenant refresh:', {
            detectedTenantId,
            tenantConfig
        });
        setTenantId(detectedTenantId);
        setTenant(tenantConfig);
        setIsLoading(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isMounted) {
            refreshTenant();
        }
    }, [
        isMounted,
        searchParams,
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isMounted) return;
        // Listen for popstate events (browser back/forward)
        const handleLocationChange = ()=>{
            refreshTenant();
        };
        window.addEventListener('popstate', handleLocationChange);
        return ()=>{
            window.removeEventListener('popstate', handleLocationChange);
        };
    }, [
        isMounted
    ]);
    const value = {
        tenant,
        tenantId,
        isLoading,
        refreshTenant
    };
    // Show loading state until mounted to prevent hydration mismatch
    if (!isMounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TenantContext.Provider, {
            value: {
                tenant: null,
                tenantId: null,
                isLoading: true,
                refreshTenant: ()=>{}
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/apps/customer/src/app/contexts/TenantContext.tsx",
            lineNumber: 119,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TenantContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/customer/src/app/contexts/TenantContext.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
};
const useTenant = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(TenantContext);
    if (context === undefined) {
        throw new Error('useTenant must be used within a TenantProvider');
    }
    return context;
};
const useTenantSettings = ()=>{
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
const useTenantApi = ()=>{
    const { tenantId } = useTenant();
    const getApiUrl = (endpoint)=>{
        if (!tenantId) return `/api${endpoint}`;
        return `/api/tenant/${tenantId}${endpoint}`;
    };
    return {
        getApiUrl
    };
};
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__d2f6b0c5._.js.map