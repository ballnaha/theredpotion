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
"[project]/apps/customer/src/app/components/LiffSafeWrapper.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>LiffSafeWrapper)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-client] (ecmascript) <export default as CircularProgress>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function LiffSafeWrapper({ children, fallback }) {
    _s();
    const [isLiffReady, setIsLiffReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiffSafeWrapper.useEffect": ()=>{
            // Check if we're in client-side
            setIsClient(true);
            // Check if we're in LIFF environment
            const isInLiff = "object" !== 'undefined' && (window.location.href.includes('liff://') || window.navigator.userAgent.includes('Line') || window.location.hostname.includes('liff'));
            if (isInLiff) {
                // LIFF environment - wait for LIFF to be ready
                const checkLiffReady = {
                    "LiffSafeWrapper.useEffect.checkLiffReady": ()=>{
                        if ("object" !== 'undefined' && window.liff) {
                            if (window.liff.isLoggedIn && window.liff.isLoggedIn()) {
                                setIsLiffReady(true);
                            } else {
                                // Wait a bit more for LIFF to initialize
                                setTimeout(checkLiffReady, 100);
                            }
                        } else {
                            // LIFF not loaded yet, wait
                            setTimeout(checkLiffReady, 100);
                        }
                    }
                }["LiffSafeWrapper.useEffect.checkLiffReady"];
                // Add a delay to ensure LIFF is fully loaded
                setTimeout({
                    "LiffSafeWrapper.useEffect": ()=>{
                        checkLiffReady();
                    }
                }["LiffSafeWrapper.useEffect"], 500);
            } else {
                // Normal browser - ready immediately after client mount
                setIsLiffReady(true);
            }
        }
    }["LiffSafeWrapper.useEffect"], []);
    // Show loading while waiting for client-side hydration or LIFF ready
    if (!isClient || !isLiffReady) {
        return fallback || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
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
                fileName: "[project]/apps/customer/src/app/components/LiffSafeWrapper.tsx",
                lineNumber: 72,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/customer/src/app/components/LiffSafeWrapper.tsx",
            lineNumber: 57,
            columnNumber: 9
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(LiffSafeWrapper, "A/sWjGbjDtgR49gJw+sF9Qr1ino=");
_c = LiffSafeWrapper;
var _c;
__turbopack_context__.k.register(_c, "LiffSafeWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_customer_539a192b._.js.map