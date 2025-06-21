module.exports = {

"[project]/apps/customer/.next-internal/server/app/api/tenant/[tenantId]/food/[slug]/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/apps/customer/src/app/utils/slugGenerator.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Slug Generation Utility for Multi-Tenant Food App
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "generateCategorySlug": (()=>generateCategorySlug),
    "generateFoodSlug": (()=>generateFoodSlug),
    "generateRestaurantSlug": (()=>generateRestaurantSlug),
    "generateUniqueId": (()=>generateUniqueId),
    "isValidSlug": (()=>isValidSlug),
    "parseSlug": (()=>parseSlug)
});
const generateFoodSlug = (options)=>{
    const { tenantId, foodName, categorySlug, restaurantSlug, uniqueId } = options;
    // Clean food name for slug
    const cleanFoodName = foodName.toLowerCase().replace(/[^\u0E00-\u0E7F\w\s-]/g, '') // Keep Thai, English, numbers, spaces, hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
    // Strategy 1: Tenant + Food Name + Unique ID (Recommended)
    if (uniqueId) {
        return `${tenantId}-${cleanFoodName}-${uniqueId}`;
    }
    // Strategy 2: Tenant + Category + Food Name
    if (categorySlug) {
        return `${tenantId}-${categorySlug}-${cleanFoodName}`;
    }
    // Strategy 3: Restaurant + Food Name
    if (restaurantSlug) {
        return `${restaurantSlug}-${cleanFoodName}`;
    }
    // Fallback: Tenant + Food Name
    return `${tenantId}-${cleanFoodName}`;
};
const parseSlug = (slug)=>{
    const parts = slug.split('-');
    if (parts.length >= 2) {
        const tenantId = parts[0];
        const remainingParts = parts.slice(1);
        // Check if last part is a unique ID (numeric or alphanumeric)
        const lastPart = remainingParts[remainingParts.length - 1];
        const isUniqueId = /^[a-z0-9]{6,}$/i.test(lastPart);
        if (isUniqueId) {
            const uniqueId = lastPart;
            const foodSlug = remainingParts.slice(0, -1).join('-');
            return {
                tenantId,
                foodSlug,
                uniqueId
            };
        }
        const foodSlug = remainingParts.join('-');
        return {
            tenantId,
            foodSlug
        };
    }
    return {
        tenantId: null,
        foodSlug: slug
    };
};
const generateUniqueId = (length = 8)=>{
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for(let i = 0; i < length; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
const isValidSlug = (slug)=>{
    const slugPattern = /^[a-z0-9\u0E00-\u0E7F-]+$/;
    return slugPattern.test(slug) && slug.length > 0 && slug.length <= 100;
};
const generateCategorySlug = (categoryName)=>{
    return categoryName.toLowerCase().replace(/[^\u0E00-\u0E7F\w\s]/g, '').replace(/\s+/g, '-').trim();
};
const generateRestaurantSlug = (restaurantName)=>{
    return restaurantName.toLowerCase().replace(/[^\u0E00-\u0E7F\w\s]/g, '').replace(/\s+/g, '-').trim();
};
const __TURBOPACK__default__export__ = {
    generateFoodSlug,
    parseSlug,
    generateUniqueId,
    isValidSlug,
    generateCategorySlug,
    generateRestaurantSlug
};
}}),
"[project]/apps/customer/src/app/api/tenant/[tenantId]/food/[slug]/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$tenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/customer/src/app/utils/tenant.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$slugGenerator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/customer/src/app/utils/slugGenerator.ts [app-route] (ecmascript)");
;
;
;
// Import menu data from menu API
const TENANT_MENUS = {
    restaurant1: [
        {
            id: 'r1-001',
            slug: 'restaurant1-green-power-bowl-abc123',
            name: 'Green Power Bowl',
            description: 'สลัดผักใบเขียวสดใส อะโวคาโด และชีสเฟต้า รสชาติสดชื่น เหมาะสำหรับคนรักสุขภาพ',
            price: 189,
            originalPrice: 225,
            discountPercent: 16,
            imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&crop=center',
            emoji: '🥗',
            rating: 4.8,
            isVegan: true,
            isGlutenFree: true,
            category: 'Healthy Bowls',
            available: true,
            tenantId: 'restaurant1',
            nutritionalInfo: {
                protein: '12g',
                carbs: '24g',
                fat: '15g',
                fiber: '8g'
            },
            restaurant: {
                name: 'Green Garden Organic',
                deliveryTime: '25-30 นาที'
            },
            addOns: [
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
            ]
        },
        {
            id: 'r1-002',
            slug: 'restaurant1-quinoa-protein-bowl-def456',
            name: 'Quinoa Protein Bowl',
            description: 'ควินัวออร์แกนิค โปรตีนไก่ย่าง และผักโอร์แกนิคหลากสี',
            price: 219,
            originalPrice: 265,
            discountPercent: 17,
            imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop&crop=center',
            emoji: '🍗',
            rating: 4.9,
            isVegan: false,
            isGlutenFree: true,
            category: 'Protein Bowls',
            available: true,
            tenantId: 'restaurant1',
            nutritionalInfo: {
                protein: '28g',
                carbs: '32g',
                fat: '12g',
                fiber: '6g'
            },
            restaurant: {
                name: 'Green Garden Organic',
                deliveryTime: '25-30 นาที'
            },
            addOns: [
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
                    id: '7',
                    name: 'ไก่ย่างเพิ่ม',
                    description: 'เนื้อไก่ย่างหอมๆ เพิ่ม',
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
            originalPrice: 195,
            discountPercent: 15,
            imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop&crop=center',
            emoji: '🍓',
            rating: 4.7,
            isVegan: true,
            isGlutenFree: false,
            category: 'Smoothie Bowls',
            available: true,
            tenantId: 'restaurant1',
            nutritionalInfo: {
                protein: '8g',
                carbs: '45g',
                fat: '10g',
                fiber: '12g'
            },
            restaurant: {
                name: 'Green Garden Organic',
                deliveryTime: '25-30 นาที'
            },
            addOns: [
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
                    id: '8',
                    name: 'แกรนโนล่าเพิ่ม',
                    description: 'แกรนโนล่าโฮมเมดกรอบหอม',
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
            description: 'สลัดแบบเซน ผักใบเขียวออร์แกนิค เต้าหู้นุ่ม และงาดำหอมๆ',
            price: 169,
            originalPrice: 199,
            discountPercent: 15,
            imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop&crop=center',
            emoji: '🧘',
            rating: 4.6,
            isVegan: true,
            isGlutenFree: true,
            category: 'Zen Salads',
            available: true,
            tenantId: 'restaurant2',
            nutritionalInfo: {
                protein: '14g',
                carbs: '18g',
                fat: '11g',
                fiber: '7g'
            },
            restaurant: {
                name: 'Zen Healthy Treats',
                deliveryTime: '20-25 นาที'
            },
            addOns: [
                {
                    id: '1',
                    name: 'เต้าหู้เพิ่ม',
                    description: 'เต้าหู้นุ่มๆ แบบญี่ปุ่น',
                    price: 40
                },
                {
                    id: '2',
                    name: 'งาดำ',
                    description: 'งาดำคั่วหอม',
                    price: 25
                },
                {
                    id: '3',
                    name: 'น้ำสลัดงา',
                    description: 'น้ำสลัดงาโฮมเมด',
                    price: 35
                }
            ]
        },
        {
            id: 'r2-002',
            slug: 'restaurant2-buddha-bowl-mno345',
            name: 'Buddha Bowl',
            description: 'ข้าวกล้องออร์แกนิค ผักต่างๆ และซอสถั่วเหลืองแบบดั้งเดิม',
            price: 199,
            originalPrice: 235,
            discountPercent: 15,
            imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
            emoji: '🍚',
            rating: 4.8,
            isVegan: true,
            isGlutenFree: true,
            category: 'Buddha Bowls',
            available: true,
            tenantId: 'restaurant2',
            nutritionalInfo: {
                protein: '16g',
                carbs: '42g',
                fat: '8g',
                fiber: '9g'
            },
            restaurant: {
                name: 'Zen Healthy Treats',
                deliveryTime: '20-25 นาที'
            },
            addOns: [
                {
                    id: '1',
                    name: 'เต้าหู้เพิ่ม',
                    description: 'เต้าหู้นุ่มๆ แบบญี่ปุ่น',
                    price: 40
                },
                {
                    id: '4',
                    name: 'ถั่วเหลืองต้ม',
                    description: 'ถั่วเหลืองต้มนุ่ม',
                    price: 30
                }
            ]
        },
        {
            id: 'r2-003',
            slug: 'restaurant2-meditation-tea-bowl-pqr678',
            name: 'Meditation Tea Bowl',
            description: 'ชาเขียวมัทฉะแท้ ข้าวโอ๊ต เซียซีด และน้ำผึ้งมานูกาแท้',
            price: 145,
            originalPrice: 175,
            discountPercent: 17,
            imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&h=600&fit=crop&crop=center',
            emoji: '🍵',
            rating: 4.5,
            isVegan: true,
            isGlutenFree: true,
            category: 'Tea Bowls',
            available: true,
            tenantId: 'restaurant2',
            nutritionalInfo: {
                protein: '6g',
                carbs: '28g',
                fat: '9g',
                fiber: '8g'
            },
            restaurant: {
                name: 'Zen Healthy Treats',
                deliveryTime: '20-25 นาที'
            },
            addOns: [
                {
                    id: '1',
                    name: 'เต้าหู้เพิ่ม',
                    description: 'เต้าหู้นุ่มๆ แบบญี่ปุ่น',
                    price: 40
                },
                {
                    id: '5',
                    name: 'เซียซีดเพิ่ม',
                    description: 'เซียซีดออร์แกนิค',
                    price: 30
                },
                {
                    id: '6',
                    name: 'น้ำผึ้งมานูกา',
                    description: 'น้ำผึ้งมานูกาแท้นำเข้า',
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
            description: 'อาซาอิเบอรี่แท้จากบราซิล พร้อมผลไม้สดและแกรนโนล่าโฮมเมด',
            price: 159,
            originalPrice: 189,
            discountPercent: 16,
            imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop&crop=center',
            emoji: '🫐',
            rating: 4.9,
            isVegan: true,
            isGlutenFree: false,
            category: 'Fresh Bowls',
            available: true,
            tenantId: 'restaurant3',
            nutritionalInfo: {
                protein: '5g',
                carbs: '38g',
                fat: '12g',
                fiber: '11g'
            },
            restaurant: {
                name: 'Fresh Bowl Co.',
                deliveryTime: '15-20 นาที'
            },
            addOns: [
                {
                    id: '1',
                    name: 'แกรนโนล่าเพิ่ม',
                    description: 'แกรนโนล่าโฮมเมดกรอบหอม',
                    price: 35
                },
                {
                    id: '2',
                    name: 'ผลไม้ตามฤดูกาล',
                    description: 'ผลไม้สดใหม่ตามฤดู',
                    price: 45
                },
                {
                    id: '3',
                    name: 'น้ำผึ้งแท้',
                    description: 'น้ำผึ้งดอกไม้แท้',
                    price: 25
                }
            ]
        },
        {
            id: 'r3-002',
            slug: 'restaurant3-tropical-smoothie-bowl-vwx234',
            name: 'Tropical Smoothie Bowl',
            description: 'สมูทตี้โบล์รสเมืองร้อน มะม่วงหวาน มะพร้าวหอม และผลไม้เมืองร้อน',
            price: 179,
            originalPrice: 215,
            discountPercent: 17,
            imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
            emoji: '🥭',
            rating: 4.8,
            isVegan: true,
            isGlutenFree: true,
            category: 'Smoothie Bowls',
            available: true,
            tenantId: 'restaurant3',
            nutritionalInfo: {
                protein: '7g',
                carbs: '42g',
                fat: '11g',
                fiber: '9g'
            },
            restaurant: {
                name: 'Fresh Bowl Co.',
                deliveryTime: '15-20 นาที'
            },
            addOns: [
                {
                    id: '1',
                    name: 'แกรนโนล่าเพิ่ม',
                    description: 'แกรนโนล่าโฮมเมดกรอบหอม',
                    price: 35
                },
                {
                    id: '4',
                    name: 'เชียซีด',
                    description: 'เซียซีดออร์แกนิค',
                    price: 40
                },
                {
                    id: '5',
                    name: 'มะพร้าวขูด',
                    description: 'มะพร้าวขูดสดใหม่',
                    price: 30
                }
            ]
        },
        {
            id: 'r3-003',
            slug: 'restaurant3-coconut-chia-pudding-yzab567',
            name: 'Coconut Chia Pudding',
            description: 'พุดดิ้งเซียมะพร้าว ผลไม้เมืองร้อนสดใหม่ และเกล็ดมะพร้าวหอมกรอบ',
            price: 135,
            originalPrice: 165,
            discountPercent: 18,
            imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
            emoji: '🥥',
            rating: 4.7,
            isVegan: true,
            isGlutenFree: true,
            category: 'Puddings',
            available: true,
            tenantId: 'restaurant3',
            nutritionalInfo: {
                protein: '4g',
                carbs: '22g',
                fat: '14g',
                fiber: '10g'
            },
            restaurant: {
                name: 'Fresh Bowl Co.',
                deliveryTime: '15-20 นาที'
            },
            addOns: [
                {
                    id: '1',
                    name: 'แกรนโนล่าเพิ่ม',
                    description: 'แกรนโนล่าโฮมเมดกรอบหอม',
                    price: 35
                },
                {
                    id: '6',
                    name: 'เกล็ดมะพร้าวเพิ่ม',
                    description: 'เกล็ดมะพร้าวคั่วหอม',
                    price: 25
                },
                {
                    id: '7',
                    name: 'ผลไม้ดราย',
                    description: 'ผลไม้อบแห้งหวานหอม',
                    price: 40
                }
            ]
        }
    ]
};
async function GET(request, { params }) {
    try {
        const { tenantId, slug } = await params;
        // Validate tenant
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$tenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateTenant"])(tenantId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid tenant'
            }, {
                status: 400
            });
        }
        // Get menu for tenant
        const menu = TENANT_MENUS[tenantId];
        if (!menu) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Menu not found for tenant'
            }, {
                status: 404
            });
        }
        // Parse slug to extract tenant and food info
        const parsedSlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$customer$2f$src$2f$app$2f$utils$2f$slugGenerator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSlug"])(slug);
        // Find food item by slug
        const foodItem = menu.find((item)=>item.slug === slug);
        if (!foodItem) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Food item not found'
            }, {
                status: 404
            });
        }
        // Verify tenant matches
        if (foodItem.tenantId !== tenantId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Food item does not belong to this tenant'
            }, {
                status: 403
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: foodItem,
            tenant: tenantId,
            parsedSlug
        });
    } catch (error) {
        console.error('Error fetching food item:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__fa478bb2._.js.map