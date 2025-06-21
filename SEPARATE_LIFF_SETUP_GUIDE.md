# 🔗 คู่มือการตั้งค่า LIFF แยกตามร้าน
## The Red Potion - Multi-Tenant LIFF Configuration

### 🎯 Overview

ระบบปัจจุบัน **รองรับการแยก LIFF ID และ Subdomain แล้ว** ✅

การแยก LIFF ID ตามร้านจะทำให้:
- ✅ ข้อมูลลูกค้าแยกสมบูรณ์
- ✅ ความปลอดภัยสูงกว่า
- ✅ ร้านค้าไม่เห็นข้อมูลกันและกัน
- ✅ สามารถปรับแต่ง LIFF ได้เฉพาะร้าน

---

## 🏗️ สถาปัตยกรรมที่อัปเดตแล้ว

### **Separate LIFF Architecture**
```
restaurant1.theredpotion.com → LIFF ID: liff-restaurant1-12345
restaurant2.theredpotion.com → LIFF ID: liff-restaurant2-67890  
restaurant3.theredpotion.com → LIFF ID: liff-restaurant3-abcde
```

### **การทำงานของระบบ**
1. ลูกค้าเข้า `restaurant1.theredpotion.com`
2. ระบบ detect tenant = `restaurant1`
3. ดึง LIFF ID = `liff-restaurant1-12345`
4. Initialize LIFF ด้วย LIFF ID เฉพาะร้าน
5. ลูกค้า login ผ่าน LINE LIFF ของร้านนั้น
6. ข้อมูลถูกเก็บแยกตาม tenant

---

## 🔧 การตั้งค่า LINE LIFF

### **Step 1: สร้าง LIFF Apps ใน LINE Developers Console**

#### **Restaurant 1 - Green Garden Organic**
```
Channel Name: Green Garden Organic
LIFF App Name: Green Garden Food Delivery
Endpoint URL: https://restaurant1.theredpotion.com
Size: Full
Features: Profile, OpenID
LIFF ID: liff-restaurant1-12345 (ตัวอย่าง)
```

#### **Restaurant 2 - Zen Healthy Treats**
```
Channel Name: Zen Healthy Treats  
LIFF App Name: Zen Healthy Food Delivery
Endpoint URL: https://restaurant2.theredpotion.com
Size: Full
Features: Profile, OpenID
LIFF ID: liff-restaurant2-67890 (ตัวอย่าง)
```

#### **Restaurant 3 - Fresh Bowl Co.**
```
Channel Name: Fresh Bowl Co.
LIFF App Name: Fresh Bowl Food Delivery
Endpoint URL: https://restaurant3.theredpotion.com
Size: Full
Features: Profile, OpenID
LIFF ID: liff-restaurant3-abcde (ตัวอย่าง)
```

### **Step 2: อัปเดต LIFF ID ในระบบ**

ระบบได้อัปเดตแล้วใน `apps/customer/src/app/utils/tenant.ts`:

```typescript
const TENANT_CONFIGS: { [key: string]: TenantConfig } = {
  'restaurant1': {
    id: 'restaurant1',
    name: 'Green Garden Organic',
    subdomain: 'restaurant1',
    domain: 'restaurant1.theredpotion.com',
    liffId: 'liff-restaurant1-12345', // ✅ แยก LIFF ID
    // ...
  },
  'restaurant2': {
    id: 'restaurant2',
    name: 'Zen Healthy Treats',
    subdomain: 'restaurant2',
    domain: 'restaurant2.theredpotion.com',
    liffId: 'liff-restaurant2-67890', // ✅ แยก LIFF ID
    // ...
  },
  'restaurant3': {
    id: 'restaurant3',
    name: 'Fresh Bowl Co.',
    subdomain: 'restaurant3',
    domain: 'restaurant3.theredpotion.com',
    liffId: 'liff-restaurant3-abcde', // ✅ แยก LIFF ID
    // ...
  }
};
```

---

## 🔍 ระบบที่รองรับอยู่แล้ว

### **1. ✅ Tenant Detection**
```typescript
// Automatic tenant detection from subdomain
export const detectTenant = (): string | null => {
  const hostname = window.location.hostname;
  
  if (hostname === 'restaurant1.theredpotion.com') return 'restaurant1';
  if (hostname === 'restaurant2.theredpotion.com') return 'restaurant2';  
  if (hostname === 'restaurant3.theredpotion.com') return 'restaurant3';
  
  // Fallback methods: path-based, URL parameter
}
```

### **2. ✅ LIFF ID per Tenant**
```typescript
// Get LIFF ID สำหรับ tenant ปัจจุบัน
export const getTenantLiffId = (tenantId?: string): string | null => {
  const tenant = tenantId || detectTenant();
  const config = TENANT_CONFIGS[tenant];
  return config?.liffId || null;
}

// Usage in AuthContext
const liffId = tenant?.liffId; // ได้ LIFF ID เฉพาะร้าน
await window.liff.init({ liffId });
```

### **3. ✅ Isolated Authentication**
```typescript
// AuthContext จะใช้ LIFF ID ที่ถูกต้องตาม tenant
const initializeLIFF = async (): Promise<boolean> => {
  const liffId = tenant?.liffId; // ✅ LIFF ID เฉพาะร้าน
  if (!liffId) return false;
  
  await window.liff.init({ liffId }); // ✅ Initialize แยกตาม tenant
  return true;
};
```

### **4. ✅ Data Isolation**
```typescript
// Cart แยกตาม tenant
const cartKey = getTenantStorageKey('cart'); // restaurant1_cart, restaurant2_cart

// API calls แยกตาม tenant  
const apiUrl = `/api/tenant/${tenantId}/menu`;

// Orders แยกตาม tenant
const orders = await getOrdersByTenant(tenantId);
```

### **5. ✅ Admin Management**
```typescript
// Admin Dashboard รองรับการจัดการ LIFF แยกกัน
const handleGenerateLiff = (tenant: TenantConfig) => {
  // สร้าง LIFF ID ใหม่สำหรับร้านนั้น ๆ
  const newLiffId = generateLiffId(tenant.id);
  updateTenantLiffId(tenant.id, newLiffId);
};
```

---

## 🚀 การ Deploy และ DNS Setup

### **DNS Configuration**
```bash
# ตั้งค่า DNS Records
restaurant1.theredpotion.com → CNAME → your-server.com
restaurant2.theredpotion.com → CNAME → your-server.com  
restaurant3.theredpotion.com → CNAME → your-server.com
```

### **Nginx Configuration**
```nginx
# /etc/nginx/sites-available/theredpotion
server {
    listen 443 ssl;
    server_name restaurant1.theredpotion.com;
    
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Tenant restaurant1;
    }
}

server {
    listen 443 ssl;
    server_name restaurant2.theredpotion.com;
    
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Tenant restaurant2;
    }
}

server {
    listen 443 ssl;
    server_name restaurant3.theredpotion.com;
    
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Tenant restaurant3;
    }
}
```

---

## 🧪 การทดสอบ

### **Test Scenarios**

#### **Scenario 1: ลูกค้าใหม่ร้าน 1**
```
1. เข้า https://restaurant1.theredpotion.com
2. กด LINE Login → ใช้ LIFF liff-restaurant1-12345
3. Login สำเร็จ → สร้าง profile ใน restaurant1
4. สั่งอาหาร → order เก็บใน restaurant1
```

#### **Scenario 2: ลูกค้าเดิมเข้าร้าน 2**
```
1. เข้า https://restaurant2.theredpotion.com  
2. กด LINE Login → ใช้ LIFF liff-restaurant2-67890
3. ต้อง Login ใหม่ (เพราะ LIFF ต่างกัน)
4. สร้าง profile ใหม่ใน restaurant2
5. ไม่เห็นประวัติจาก restaurant1
```

#### **Scenario 3: Admin Management**
```
1. เข้า Admin Dashboard
2. ดู tenant list → เห็น LIFF ID แยกกัน
3. สร้าง LIFF ใหม่ → อัปเดตเฉพาะร้านนั้น
4. ตรวจสอบ logs → แยกข้อมูลตาม tenant
```

### **Testing Commands**
```bash
# Test tenant detection
curl -H "Host: restaurant1.theredpotion.com" http://localhost:3000/api/tenant/current

# Test LIFF ID retrieval  
curl -H "Host: restaurant2.theredpotion.com" http://localhost:3000/api/tenant/current

# Test authentication
curl -X POST http://localhost:3000/api/auth/line \
  -H "Content-Type: application/json" \
  -d '{"tenantId": "restaurant1", "lineId": "test123"}'
```

---

## 🔒 Security & Privacy Benefits

### **Complete Data Isolation**
```
Restaurant 1 ลูกค้า:
├── Profile: เฉพาะ restaurant1
├── Orders: เฉพาะ restaurant1  
├── Cart: เฉพาะ restaurant1
└── LIFF Session: เฉพาะ restaurant1

Restaurant 2 ลูกค้า:
├── Profile: เฉพาะ restaurant2
├── Orders: เฉพาะ restaurant2
├── Cart: เฉพาะ restaurant2
└── LIFF Session: เฉพาะ restaurant2
```

### **Privacy Protection**
- ✅ ร้าน A ไม่เห็นลูกค้าของร้าน B
- ✅ ข้อมูลการสั่งซื้อแยกสมบูรณ์
- ✅ LINE Profile แยกตาม LIFF
- ✅ Session management แยกกัน

### **Business Benefits**
- ✅ แต่ละร้านมีอิสระในการจัดการ
- ✅ สามารถปรับแต่ง LIFF ได้เฉพาะร้าน
- ✅ Analytics แยกชัดเจน
- ✅ Compliance ที่ดีกว่า

---

## 📊 Monitoring & Analytics

### **Tenant-specific Metrics**
```typescript
// Track LIFF usage per tenant
const trackLiffUsage = (tenantId: string, action: string) => {
  analytics.track('liff_action', {
    tenant_id: tenantId,
    liff_id: getTenantLiffId(tenantId),
    action: action,
    timestamp: new Date().toISOString()
  });
};

// Monitor authentication success rate
const monitorAuthSuccess = (tenantId: string, success: boolean) => {
  analytics.track('auth_attempt', {
    tenant_id: tenantId,
    success: success,
    liff_id: getTenantLiffId(tenantId)
  });
};
```

### **Dashboard Metrics**
```
Restaurant 1 Metrics:
├── LIFF ID: liff-restaurant1-12345
├── Active Users: 150
├── Login Success Rate: 95%
├── Orders Today: 45
└── Revenue: ฿12,500

Restaurant 2 Metrics:  
├── LIFF ID: liff-restaurant2-67890
├── Active Users: 120
├── Login Success Rate: 92%
├── Orders Today: 38
└── Revenue: ฿9,800
```

---

## 🛠️ Troubleshooting

### **Common Issues**

#### **1. LIFF ID ไม่ถูกต้อง**
```javascript
// Debug LIFF ID
console.log('Current tenant:', detectTenant());
console.log('LIFF ID:', getTenantLiffId());

// Expected output:
// Current tenant: restaurant1
// LIFF ID: liff-restaurant1-12345
```

#### **2. Cross-tenant Data Leakage**
```javascript
// Verify data isolation
const cartKey = getTenantStorageKey('cart');
console.log('Cart key:', cartKey); // Should be: restaurant1_cart

const apiUrl = getTenantApiUrl();
console.log('API URL:', apiUrl); // Should be: /api/tenant/restaurant1
```

#### **3. Authentication Issues**
```javascript
// Check LIFF initialization
if (window.liff) {
  console.log('LIFF ready:', window.liff.ready);
  console.log('LIFF logged in:', window.liff.isLoggedIn());
} else {
  console.error('LIFF SDK not loaded');
}
```

### **Error Handling**
```typescript
// Handle tenant-specific errors
const handleTenantError = (error: Error, tenantId: string) => {
  console.error(`Tenant ${tenantId} error:`, error);
  
  // Log to tenant-specific error tracking
  errorTracking.captureException(error, {
    tags: { tenant_id: tenantId },
    extra: { liff_id: getTenantLiffId(tenantId) }
  });
};
```

---

## 🎯 Summary

### **✅ ระบบปัจจุบันรองรับ:**
1. **Subdomain Detection** - แยก tenant จาก URL
2. **LIFF ID per Tenant** - LIFF ID เฉพาะร้าน
3. **Isolated Authentication** - Login แยกตาม tenant
4. **Data Separation** - ข้อมูลแยกสมบูรณ์
5. **Admin Management** - จัดการ LIFF ผ่าน dashboard

### **✅ ได้อัปเดตแล้ว:**
- เปลี่ยนจาก Shared LIFF เป็น Separate LIFF
- อัปเดต LIFF ID ใน tenant configuration
- ระบบพร้อมใช้งานทันที

### **🚀 Next Steps:**
1. สร้าง LIFF Apps จริงใน LINE Developers Console
2. อัปเดต LIFF ID จริงในระบบ
3. ตั้งค่า DNS และ SSL certificates
4. Deploy และทดสอบในสภาพแวดล้อมจริง

---

**🎉 ระบบพร้อมสำหรับการแยก LIFF ID และ Subdomain แล้ว!** 