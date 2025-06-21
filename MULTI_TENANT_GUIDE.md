# 🏪 คู่มือระบบ Multi-Tenant - The Red Potion

## 📋 ภาพรวมระบบ

ระบบ Multi-Tenant ของ The Red Potion ช่วยให้ Admin สามารถจัดการร้านอาหารหลายร้านในแพลตฟอร์มเดียว โดยแต่ละร้านจะมี:
- **URL เฉพาะตัว** (Subdomain)
- **LINE LIFF แยกกัน**
- **การตั้งค่าเฉพาะร้าน**
- **ข้อมูลแยกกัน** (Cart, Orders, Menu)

---

## 🏗️ สถาปัตยกรรมระบบ

### 1. **Subdomain-based Tenancy (แนะนำ)**
```
restaurant1.theredpotion.com → Green Garden Organic
restaurant2.theredpotion.com → Zen Healthy Treats  
restaurant3.theredpotion.com → Fresh Bowl Co.
admin.theredpotion.com → Admin Dashboard
```

### 2. **Path-based Tenancy (ทางเลือก)**
```
theredpotion.com/restaurant1 → Green Garden Organic
theredpotion.com/restaurant2 → Zen Healthy Treats
theredpotion.com/restaurant3 → Fresh Bowl Co.
theredpotion.com/admin → Admin Dashboard
```

---

## 🔧 การตั้งค่าระบบ

### **1. การสร้างร้านค้าใหม่**

#### ขั้นตอนที่ 1: เข้าสู่ Admin Dashboard
```bash
# เข้าไปที่
https://admin.theredpotion.com/tenants
```

#### ขั้นตอนที่ 2: กรอกข้อมูลร้านค้า
- **ชื่อร้านค้า**: Green Garden Organic
- **Subdomain**: restaurant1 (จะสร้าง URL เป็น restaurant1.theredpotion.com)
- **ชื่อแบรนด์**: Green Garden
- **สีหลัก**: #10b981
- **ค่าส่ง**: 39 บาท
- **ฟรีส่งเมื่อซื้อครบ**: 200 บาท
- **ค่าบริการ**: 2%

#### ขั้นตอนที่ 3: สร้าง LINE LIFF
1. เข้าไปที่ [LINE Developers Console](https://developers.line.biz/)
2. สร้าง LIFF App ใหม่
3. ตั้งค่า Endpoint URL: `https://restaurant1.theredpotion.com`
4. คัดลอก LIFF ID มาใส่ในระบบ

---

## 📱 การเชื่อมต่อ LINE LIFF

### **การตั้งค่า LIFF สำหรับแต่ละร้าน**

```typescript
// ตัวอย่างการตั้งค่า LIFF
const LIFF_CONFIGS = {
  'restaurant1': {
    liffId: 'xxx-restaurant1',
    endpointUrl: 'https://restaurant1.theredpotion.com'
  },
  'restaurant2': {
    liffId: 'yyy-restaurant2', 
    endpointUrl: 'https://restaurant2.theredpotion.com'
  },
  'restaurant3': {
    liffId: 'zzz-restaurant3',
    endpointUrl: 'https://restaurant3.theredpotion.com'
  }
};
```

### **ขั้นตอนการตั้งค่า DNS**

```bash
# ตั้งค่า DNS Records
restaurant1.theredpotion.com → CNAME → your-server.com
restaurant2.theredpotion.com → CNAME → your-server.com
restaurant3.theredpotion.com → CNAME → your-server.com
admin.theredpotion.com → CNAME → your-server.com
```

---

## 💾 การจัดการข้อมูล

### **1. Tenant-aware Storage**

ระบบจะแยกข้อมูลของแต่ละร้านโดยใช้ prefix:

```typescript
// localStorage keys
restaurant1_cart → ข้อมูล cart ของร้าน 1
restaurant2_cart → ข้อมูล cart ของร้าน 2
restaurant3_cart → ข้อมูล cart ของร้าน 3

// API endpoints
/api/tenant/restaurant1/menu → เมนูร้าน 1
/api/tenant/restaurant2/menu → เมนูร้าน 2
/api/tenant/restaurant3/menu → เมนูร้าน 3
```

### **2. Database Schema**

```sql
-- ตาราง tenants
CREATE TABLE tenants (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subdomain VARCHAR(100) UNIQUE NOT NULL,
  domain VARCHAR(255) NOT NULL,
  liff_id VARCHAR(100),
  theme_config JSON,
  settings_config JSON,
  status ENUM('active', 'inactive', 'pending') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ตาราง menu_items (เชื่อมกับ tenant)
CREATE TABLE menu_items (
  id VARCHAR(50) PRIMARY KEY,
  tenant_id VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500),
  category VARCHAR(100),
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- ตาราง orders (เชื่อมกับ tenant)
CREATE TABLE orders (
  id VARCHAR(50) PRIMARY KEY,
  tenant_id VARCHAR(50) NOT NULL,
  user_id VARCHAR(50),
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

---

## 🔄 การทำงานของระบบ

### **1. Tenant Detection**

```typescript
// ระบบจะ detect tenant จาก:
1. Subdomain (restaurant1.theredpotion.com)
2. Path (/restaurant1)
3. URL Parameter (?tenant=restaurant1)
4. Default สำหรับ development
```

### **2. Dynamic Theming**

```typescript
// ระบบจะเปลี่ยนสีและธีมตาม tenant
const tenantTheme = {
  restaurant1: { primaryColor: '#10b981', brandName: 'Green Garden' },
  restaurant2: { primaryColor: '#7c3aed', brandName: 'Zen Treats' },
  restaurant3: { primaryColor: '#f59e0b', brandName: 'Fresh Bowl' }
};
```

### **3. Tenant-specific Settings**

```typescript
// การตั้งค่าเฉพาะร้าน
const tenantSettings = {
  restaurant1: { deliveryFee: 39, freeDeliveryThreshold: 200 },
  restaurant2: { deliveryFee: 49, freeDeliveryThreshold: 250 },
  restaurant3: { deliveryFee: 35, freeDeliveryThreshold: 180 }
};
```

---

## 🚀 การ Deploy

### **1. Environment Variables**

```bash
# .env
NEXT_PUBLIC_BASE_URL=https://theredpotion.com
NEXT_PUBLIC_ADMIN_URL=https://admin.theredpotion.com
DATABASE_URL=your_database_url
LIFF_CHANNEL_SECRET=your_liff_secret
```

### **2. Nginx Configuration**

```nginx
# nginx.conf
server {
    server_name *.theredpotion.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### **3. Next.js Configuration**

```typescript
// next.config.ts
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/tenant/:tenant/:path*',
        destination: '/api/:path*?tenant=:tenant',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL', // สำหรับ LIFF
          },
        ],
      },
    ];
  },
};
```

---

## 📊 การ Monitor และ Analytics

### **1. Tenant Usage Tracking**

```typescript
// ติดตามการใช้งานของแต่ละร้าน
const trackTenantUsage = (tenantId: string, action: string) => {
  analytics.track('tenant_action', {
    tenant_id: tenantId,
    action: action,
    timestamp: new Date().toISOString()
  });
};
```

### **2. Performance Monitoring**

```typescript
// ติดตาม performance ของแต่ละ tenant
const monitorTenantPerformance = (tenantId: string) => {
  const startTime = performance.now();
  
  // ... do operations
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  console.log(`Tenant ${tenantId} operation took ${duration}ms`);
};
```

---

## 🔐 Security Considerations

### **1. Tenant Isolation**

```typescript
// ตรวจสอบสิทธิ์การเข้าถึงข้อมูล
const validateTenantAccess = (requestedTenant: string, userTenant: string) => {
  if (requestedTenant !== userTenant) {
    throw new Error('Unauthorized tenant access');
  }
};
```

### **2. CORS Configuration**

```typescript
// ตั้งค่า CORS สำหรับ subdomains
const corsOptions = {
  origin: [
    'https://restaurant1.theredpotion.com',
    'https://restaurant2.theredpotion.com', 
    'https://restaurant3.theredpotion.com',
    'https://admin.theredpotion.com'
  ],
  credentials: true
};
```

---

## 🛠️ การ Troubleshooting

### **ปัญหาที่พบบ่อย**

1. **LIFF ไม่ทำงาน**
   - ตรวจสอบ LIFF ID ถูกต้อง
   - ตรวจสอบ Endpoint URL
   - ตรวจสอบ SSL Certificate

2. **Tenant ไม่ถูก detect**
   - ตรวจสอบ DNS settings
   - ตรวจสอบ subdomain configuration
   - ตรวจสอบ browser cache

3. **ข้อมูล Cart หาย**
   - ตรวจสอบ localStorage keys
   - ตรวจสอบ tenant detection
   - ตรวจสอบ browser storage

### **Debug Commands**

```javascript
// ตรวจสอบ tenant ปัจจุบัน
console.log('Current tenant:', detectTenant());

// ตรวจสอบ tenant config
console.log('Tenant config:', getCurrentTenant());

// ตรวจสอบ localStorage
console.log('Tenant storage:', getTenantLSItem('cart'));
```

---

## 📞 การติดต่อ Support

หากมีปัญหาหรือข้อสงสัย สามารถติดต่อได้ที่:
- **Email**: support@theredpotion.com
- **LINE**: @theredpotion
- **Phone**: 02-xxx-xxxx

---

## 🔄 การอัปเดตระบบ

### **Version History**
- **v1.0.0**: ระบบ Multi-Tenant พื้นฐาน
- **v1.1.0**: เพิ่ม LINE LIFF Integration
- **v1.2.0**: เพิ่ม Dynamic Theming
- **v1.3.0**: เพิ่ม Advanced Analytics

### **Roadmap**
- [ ] White-label Mobile App
- [ ] Advanced Reporting Dashboard
- [ ] Multi-language Support
- [ ] Advanced Tenant Management
- [ ] API Rate Limiting per Tenant

---

## 🎯 Best Practices

1. **ใช้ Subdomain approach** สำหรับ production
2. **แยก LIFF ID** สำหรับแต่ละร้าน
3. **ใช้ tenant-aware storage** ทุกที่
4. **Monitor performance** ของแต่ละ tenant
5. **Backup ข้อมูล** แยกตาม tenant
6. **Test บน multiple subdomains** ก่อน deploy

---

*สร้างโดย The Red Potion Development Team 🚀* 