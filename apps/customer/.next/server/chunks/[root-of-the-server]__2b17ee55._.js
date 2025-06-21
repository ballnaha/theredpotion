module.exports = {

"[project]/apps/customer/.next-internal/server/app/api/tenant/[tenantId]/menu/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/apps/customer/src/app/utils/tenant.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
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
        domain: 'theredpotion.treetelu.com',
        liffId: '2007609360-3Z0L8Ekg',
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
        liffId: '2007609360-3Z0L8Ekg',
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
        liffId: '2007609360-3Z0L8Ekg',
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
"[project]/apps/customer/src/app/api/tenant/[tenantId]/menu/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$tenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/customer/src/app/utils/tenant.ts [app-route] (ecmascript)");
;
;
// Mock menu data for different tenants
const TENANT_MENUS = {
    restaurant1: [
        {
            id: 'r1-001',
            slug: 'restaurant1-green-power-bowl-abc123',
            name: 'Green Power Bowl',
            description: 'สลัดผักใบเขียวสดใส อะโวคาโด และชีสเฟต้า',
            price: 189,
            image: '/images/green-power-bowl.jpg',
            category: 'Healthy Bowls',
            available: true,
            tenantId: 'restaurant1',
            addOns: [
                {
                    id: '1',
                    name: 'ชีสเฟต้าเพิ่ม',
                    price: 45
                },
                {
                    id: '2',
                    name: 'อะโวคาโด',
                    price: 60
                },
                {
                    id: '3',
                    name: 'มะกอกดำ',
                    price: 35
                },
                {
                    id: '4',
                    name: 'อัลมอนด์แผ่น',
                    price: 40
                },
                {
                    id: '5',
                    name: 'เมล็ดทานตะวัน',
                    price: 25
                },
                {
                    id: '6',
                    name: 'น้ำสลัดบัลซามิค',
                    price: 30
                }
            ]
        },
        {
            id: 'r1-002',
            slug: 'restaurant1-quinoa-protein-bowl-def456',
            name: 'Quinoa Protein Bowl',
            description: 'ควินัว โปรตีนไก่ย่าง และผักโอร์แกนิค',
            price: 219,
            image: '/images/quinoa-bowl.jpg',
            category: 'Protein Bowls',
            available: true,
            tenantId: 'restaurant1',
            addOns: [
                {
                    id: '1',
                    name: 'ชีสเฟต้าเพิ่ม',
                    price: 45
                },
                {
                    id: '2',
                    name: 'อะโวคาโด',
                    price: 60
                },
                {
                    id: '7',
                    name: 'ไก่ย่างเพิ่ม',
                    price: 80
                }
            ]
        },
        {
            id: 'r1-003',
            slug: 'restaurant1-organic-smoothie-bowl-ghi789',
            name: 'Organic Smoothie Bowl',
            description: 'สมูทตี้โบวล์ออร์แกนิค ผลไม้สดใหม่ แกรนโนล่าโฮมเมด',
            price: 165,
            image: '/images/smoothie-bowl.jpg',
            category: 'Smoothie Bowls',
            available: true,
            tenantId: 'restaurant1',
            addOns: [
                {
                    id: '1',
                    name: 'ชีสเฟต้าเพิ่ม',
                    price: 45
                },
                {
                    id: '2',
                    name: 'อะโวคาโด',
                    price: 60
                },
                {
                    id: '8',
                    name: 'แกรนโนล่าเพิ่ม',
                    price: 35
                }
            ]
        }
    ],
    restaurant2: [
        {
            id: 'r2-001',
            slug: 'restaurant2-zen-garden-salad-jkl012',
            name: 'Zen Garden Salad',
            description: 'สลัดแบบเซน ผักใบเขียว เต้าหู้ และงา',
            price: 169,
            image: '/images/zen-salad.jpg',
            category: 'Zen Salads',
            available: true,
            tenantId: 'restaurant2',
            addOns: [
                {
                    id: '1',
                    name: 'เต้าหู้เพิ่ม',
                    price: 40
                },
                {
                    id: '2',
                    name: 'งาดำ',
                    price: 25
                },
                {
                    id: '3',
                    name: 'น้ำสลัดงา',
                    price: 35
                }
            ]
        },
        {
            id: 'r2-002',
            slug: 'restaurant2-buddha-bowl-mno345',
            name: 'Buddha Bowl',
            description: 'ข้าวกล้อง ผักต่างๆ และซอสถั่วเหลือง',
            price: 199,
            image: '/images/buddha-bowl.jpg',
            category: 'Buddha Bowls',
            available: true,
            tenantId: 'restaurant2',
            addOns: [
                {
                    id: '1',
                    name: 'เต้าหู้เพิ่ม',
                    price: 40
                },
                {
                    id: '4',
                    name: 'ถั่วเหลืองต้ม',
                    price: 30
                }
            ]
        },
        {
            id: 'r2-003',
            slug: 'restaurant2-meditation-tea-bowl-pqr678',
            name: 'Meditation Tea Bowl',
            description: 'ชาเขียวมัทฉะ ข้าวโอ๊ต เซียซีด และน้ำผึ้งแท้',
            price: 145,
            image: '/images/tea-bowl.jpg',
            category: 'Tea Bowls',
            available: true,
            tenantId: 'restaurant2',
            addOns: [
                {
                    id: '1',
                    name: 'เต้าหู้เพิ่ม',
                    price: 40
                },
                {
                    id: '5',
                    name: 'เซียซีดเพิ่ม',
                    price: 30
                },
                {
                    id: '6',
                    name: 'น้ำผึ้งมานูกา',
                    price: 45
                }
            ]
        }
    ],
    restaurant3: [
        {
            id: 'r3-001',
            slug: 'restaurant3-fresh-acai-bowl-stu901',
            name: 'Fresh Acai Bowl',
            description: 'อาซาอิ โบล์ พร้อมผลไม้สดและแกรนโนล่า',
            price: 159,
            image: '/images/acai-bowl.jpg',
            category: 'Fresh Bowls',
            available: true,
            tenantId: 'restaurant3',
            addOns: [
                {
                    id: '1',
                    name: 'แกรนโนล่าเพิ่ม',
                    price: 35
                },
                {
                    id: '2',
                    name: 'ผลไม้ตามฤดูกาล',
                    price: 45
                },
                {
                    id: '3',
                    name: 'น้ำผึ้งแท้',
                    price: 25
                }
            ]
        },
        {
            id: 'r3-002',
            slug: 'restaurant3-tropical-smoothie-bowl-vwx234',
            name: 'Tropical Smoothie Bowl',
            description: 'สมูทตี้โบล์รสเมืองร้อน มะม่วง มะพร้าว',
            price: 179,
            image: '/images/tropical-bowl.jpg',
            category: 'Smoothie Bowls',
            available: true,
            tenantId: 'restaurant3',
            addOns: [
                {
                    id: '1',
                    name: 'แกรนโนล่าเพิ่ม',
                    price: 35
                },
                {
                    id: '4',
                    name: 'เชียซีด',
                    price: 40
                },
                {
                    id: '5',
                    name: 'มะพร้าวขูด',
                    price: 30
                }
            ]
        },
        {
            id: 'r3-003',
            slug: 'restaurant3-coconut-chia-pudding-yzab567',
            name: 'Coconut Chia Pudding',
            description: 'พุดดิ้งเซียมะพร้าว ผลไม้เมืองร้อน และเกล็ดมะพร้าว',
            price: 135,
            image: '/images/coconut-pudding.jpg',
            category: 'Puddings',
            available: true,
            tenantId: 'restaurant3',
            addOns: [
                {
                    id: '1',
                    name: 'แกรนโนล่าเพิ่ม',
                    price: 35
                },
                {
                    id: '6',
                    name: 'เกล็ดมะพร้าวเพิ่ม',
                    price: 25
                },
                {
                    id: '7',
                    name: 'ผลไม้ดราย',
                    price: 40
                }
            ]
        }
    ]
};
async function GET(request, { params }) {
    try {
        const { tenantId } = await params;
        // Validate tenant exists
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$tenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateTenant"])(tenantId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid tenant'
            }, {
                status: 404
            });
        }
        // Get tenant-specific menu
        const menu = TENANT_MENUS[tenantId] || [];
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: menu,
            tenant: tenantId
        });
    } catch (error) {
        console.error('Error fetching tenant menu:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__2b17ee55._.js.map