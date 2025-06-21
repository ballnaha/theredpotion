# 🏗️ LIFF Architecture Guide
## Multi-Tenant Food Delivery Platform

### 🎯 Recommended Architecture: **Shared LIFF + Database Isolation**

## 📋 เหตุผลที่แนะนำ Shared LIFF

### **1. User Experience ที่ดีกว่า**
```
ลูกค้าคนเดียว → สามารถใช้บัญชี LINE เดียวกันในทุกร้าน
├── ร้าน A: ซื้อพิซซ่า
├── ร้าน B: ซื้อเครื่องดื่ม  
└── ร้าน C: ซื้อขนม
```

### **2. การจัดการที่ง่ายกว่า**
- สร้าง LIFF App เพียงตัวเดียว
- Maintenance ง่ายกว่า
- Cost ต่ำกว่า (LINE LIFF มี quota limit)

### **3. Business Logic ที่สมเหตุสมผล**
- ลูกค้าจริง ๆ ต้องการความสะดวก
- ไม่ต้อง login ซ้ำเมื่อเปลี่ยนร้าน
- สามารถเก็บประวัติการซื้อรวมได้

---

## 🔐 การแยกข้อมูลด้วย Database Design

### **Database Schema**
```sql
-- Users Table (Global)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  line_id VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(255),
  email VARCHAR(255),
  picture_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tenants Table (ร้านค้า)
CREATE TABLE tenants (
  id VARCHAR(50) PRIMARY KEY, -- 'shop-a', 'shop-b'
  name VARCHAR(255) NOT NULL,
  subdomain VARCHAR(100) UNIQUE,
  liff_id VARCHAR(255), -- ใช้เดียวกันหมด
  settings JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User-Tenant Relationships (แยกข้อมูลตาม tenant)
CREATE TABLE user_tenant_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  tenant_id VARCHAR(50) REFERENCES tenants(id),
  -- ข้อมูลเฉพาะร้าน
  display_name VARCHAR(255), -- อาจต่างกันในแต่ละร้าน
  phone VARCHAR(50),
  addresses JSONB,
  preferences JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, tenant_id)
);

-- Orders (แยกตาม tenant)
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  tenant_id VARCHAR(50) REFERENCES tenants(id),
  items JSONB,
  total_amount DECIMAL(10,2),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **การทำงานของระบบ**
```typescript
// 1. ลูกค้า login ด้วย LINE (LIFF เดียวกัน)
const lineProfile = await liff.getProfile();

// 2. สร้าง/อัปเดต Global User
const user = await createOrUpdateUser({
  lineId: lineProfile.userId,
  displayName: lineProfile.displayName,
  // ...
});

// 3. สร้าง/อัปเดต User-Tenant Profile
const userTenantProfile = await createOrUpdateUserTenantProfile({
  userId: user.id,
  tenantId: currentTenant, // 'shop-a', 'shop-b', etc.
  displayName: lineProfile.displayName,
  // ข้อมูลเฉพาะร้านนี้
});

// 4. ใช้ข้อมูลเฉพาะร้าน
const userOrders = await getOrdersByUserAndTenant(user.id, currentTenant);
```

---

## 🔧 Implementation

### **1. อัปเดต Tenant Config**
```typescript
// apps/customer/src/app/utils/tenant.ts
export const TENANT_CONFIGS: Record<string, TenantConfig> = {
  'shop-a': {
    id: 'shop-a',
    name: 'Pizza Paradise',
    subdomain: 'pizza',
    domain: 'pizza.theredpotion.com',
    liffId: 'liff-1234567890-shared', // 🔥 ใช้เดียวกันหมด
    // ...
  },
  'shop-b': {
    id: 'shop-b', 
    name: 'Burger House',
    subdomain: 'burger',
    domain: 'burger.theredpotion.com',
    liffId: 'liff-1234567890-shared', // 🔥 ใช้เดียวกันหมด
    // ...
  },
  'shop-c': {
    id: 'shop-c',
    name: 'Coffee Corner', 
    subdomain: 'coffee',
    domain: 'coffee.theredpotion.com',
    liffId: 'liff-1234567890-shared', // 🔥 ใช้เดียวกันหมด
    // ...
  }
};
```

### **2. อัปเดต AuthContext**
```typescript
// apps/customer/src/app/contexts/AuthContext.tsx
const checkAuthStatus = async () => {
  // ... existing code ...
  
  if (liffInitialized && window.liff && window.liff.isLoggedIn()) {
    const profile = await window.liff.getProfile();
    const idToken = window.liff.getIDToken();

    // ส่ง tenantId ไปด้วย
    const response = await fetch('/api/auth/line', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lineId: profile.userId,
        lineProfile: {
          displayName: profile.displayName,
          email: profile.email,
          pictureUrl: profile.pictureUrl,
        },
        idToken,
        tenantId, // 🔥 ส่ง tenant context
      }),
    });
    
    // ...
  }
};
```

### **3. อัปเดต API**
```typescript
// apps/customer/src/app/api/auth/line/route.ts
export async function POST(request: NextRequest) {
  const { lineId, lineProfile, tenantId } = await request.json();

  // 1. Create/Update Global User
  let globalUser = await findUserByLineId(lineId);
  if (!globalUser) {
    globalUser = await createUser({
      lineId,
      displayName: lineProfile.displayName,
      email: lineProfile.email,
      pictureUrl: lineProfile.pictureUrl,
    });
  }

  // 2. Create/Update User-Tenant Profile
  let userTenantProfile = await findUserTenantProfile(globalUser.id, tenantId);
  if (!userTenantProfile) {
    userTenantProfile = await createUserTenantProfile({
      userId: globalUser.id,
      tenantId,
      displayName: lineProfile.displayName,
      // อื่น ๆ
    });
  }

  // 3. Generate Token with tenant context
  const token = generateToken({
    userId: globalUser.id,
    tenantId,
    // ...
  });

  return NextResponse.json({
    success: true,
    data: {
      user: {
        ...globalUser,
        tenantProfile: userTenantProfile,
      },
      token,
    },
  });
}
```

---

## 🎯 Benefits of This Approach

### **1. ✅ User Experience**
```
ลูกค้า: "ใช้ LINE เดียวกัน ไม่ต้อง login ซ้ำ"
├── เข้าร้าน Pizza → เห็นประวัติการสั่งพิซซ่า
├── เข้าร้าน Burger → เห็นประวัติการสั่งเบอร์เกอร์
└── เข้าร้าน Coffee → เห็นประวัติการสั่งกาแฟ
```

### **2. ✅ Data Privacy**
```
ร้าน Pizza: เห็นเฉพาะข้อมูลลูกค้าที่สั่งพิซซ่า
ร้าน Burger: เห็นเฉพาะข้อมูลลูกค้าที่สั่งเบอร์เกอร์
ร้าน Coffee: เห็นเฉพาะข้อมูลลูกค้าที่สั่งกาแฟ
```

### **3. ✅ Business Intelligence**
```
Admin Dashboard:
├── รายงานรวมทุกร้าน
├── ลูกค้าที่ใช้บริการหลายร้าน
├── Cross-selling opportunities
└── Customer lifetime value
```

### **4. ✅ Technical Benefits**
- Single LIFF maintenance
- Consistent authentication flow
- Easier user management
- Better analytics
- Cost effective

---

## 🚀 Migration Strategy

### **Phase 1: Shared LIFF Setup**
1. สร้าง LIFF App เดียว
2. ตั้งค่า Endpoint URL: `https://theredpotion.com`
3. Configure ทุก subdomain ให้ใช้ LIFF เดียวกัน

### **Phase 2: Database Schema**
1. สร้าง tables ตาม schema ข้างต้น
2. Migrate ข้อมูลเก่า (ถ้ามี)
3. Update API endpoints

### **Phase 3: Frontend Updates**
1. อัปเดต AuthContext
2. อัปเดต tenant detection
3. อัปเดต UI components

### **Phase 4: Testing**
1. ทดสอบ cross-tenant login
2. ทดสอบ data isolation
3. ทดสอบ performance

---

## 🔒 Security Considerations

### **Data Isolation Rules**
```typescript
// Middleware to ensure tenant isolation
export function withTenantIsolation(handler: Function) {
  return async (req: NextRequest) => {
    const tenantId = getTenantFromRequest(req);
    const userId = getUserFromToken(req);
    
    // Ensure user can only access their data in current tenant
    req.tenantContext = { tenantId, userId };
    
    return handler(req);
  };
}

// Usage in API routes
export const GET = withTenantIsolation(async (req) => {
  const { tenantId, userId } = req.tenantContext;
  
  // Only return data for this user in this tenant
  const orders = await getOrdersByUserAndTenant(userId, tenantId);
  return NextResponse.json(orders);
});
```

### **Permission Matrix**
| Role | Global Data | Tenant A Data | Tenant B Data |
|------|-------------|---------------|---------------|
| Customer | Own profile | Own orders in A | Own orders in B |
| Tenant A Admin | ❌ | All A data | ❌ |
| Tenant B Admin | ❌ | ❌ | All B data |
| Super Admin | ✅ All | ✅ All | ✅ All |

---

## 📊 Example Scenarios

### **Scenario 1: ลูกค้าใหม่**
```
1. ลูกค้าเข้า pizza.theredpotion.com
2. กด LINE Login (LIFF เดียวกัน)
3. ระบบสร้าง:
   - Global user record
   - User-tenant profile for 'pizza'
4. ลูกค้าสั่งพิซซ่า
```

### **Scenario 2: ลูกค้าเก่าเข้าร้านใหม่**
```
1. ลูกค้าเข้า burger.theredpotion.com  
2. LINE Login (รู้จักแล้ว - ไม่ต้อง login ซ้ำ)
3. ระบบสร้าง:
   - User-tenant profile for 'burger' (ถ้ายังไม่มี)
4. ลูกค้าเห็นประวัติเฉพาะร้าน burger
```

### **Scenario 3: Admin Dashboard**
```
1. Super Admin login
2. เห็นข้อมูลรวม:
   - ลูกค้าทั้งหมด: 1,000 คน
   - ลูกค้าที่ใช้เฉพาะร้าน pizza: 300 คน
   - ลูกค้าที่ใช้หลายร้าน: 150 คน
   - Cross-selling opportunity: 550 คน
```

---

## 🎯 Conclusion

**แนะนำใช้ LIFF ID เดียวกัน** เพราะ:

1. **User Experience ดีกว่า** - ไม่ต้อง login ซ้ำ
2. **Business Logic สมเหตุสมผล** - ลูกค้าจริงต้องการความสะดวก
3. **Technical Implementation ง่ายกว่า** - maintenance ง่าย
4. **Data Privacy ยังคงได้** - แยกข้อมูลด้วย database design
5. **Cost Effective** - LIFF quota ประหยัด

การแยกข้อมูลทำได้ดีด้วย **Database Design** ไม่จำเป็นต้องแยก LIFF ID

---

**🚀 Ready to implement? ให้ผมช่วยอัปเดตโค้ดได้เลยครับ!** 