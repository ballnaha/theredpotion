# 🔐 LINE Login Integration Guide
## The Red Potion - Food Delivery Platform

### 📋 สารบัญ
1. [ภาพรวมระบบ](#ภาพรวมระบบ)
2. [การติดตั้งและตั้งค่า](#การติดตั้งและตั้งค่า)
3. [โครงสร้างไฟล์](#โครงสร้างไฟล์)
4. [การใช้งาน](#การใช้งาน)
5. [การทดสอบ](#การทดสอบ)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 ภาพรวมระบบ

### **คุณสมบัติหลัก**
- ✅ **LINE LIFF Integration**: เชื่อมต่อกับ LINE Official Account
- ✅ **Multi-Tenant Support**: แยก LOGIN ตาม tenant (ร้านอาหาร)
- ✅ **Auto Registration**: สร้างบัญชีอัตโนมัติเมื่อ LOGIN ครั้งแรก
- ✅ **Profile Management**: จัดการข้อมูลโปรไฟล์ผู้ใช้
- ✅ **Session Management**: JWT Token + localStorage
- ✅ **Responsive UI**: รองรับทั้ง mobile และ desktop

### **สถาปัตยกรรม**
```
LINE App → LIFF → React App → API Routes → Mock Database
```

---

## ⚙️ การติดตั้งและตั้งค่า

### **1. ติดตั้ง Dependencies**
```bash
# ไม่ต้องติดตั้งเพิ่ม - ใช้ LIFF SDK ผ่าน CDN
```

### **2. ตั้งค่า LINE LIFF**
1. เข้าไปที่ [LINE Developers Console](https://developers.line.biz/)
2. สร้าง Channel ใหม่ (Messaging API)
3. เพิ่ม LIFF App:
   - **Endpoint URL**: `https://your-domain.com`
   - **Size**: Full
   - **Features**: Profile, OpenID

### **3. อัปเดต LIFF ID ในระบบ**
```typescript
// apps/customer/src/app/utils/tenant.ts
export const TENANT_CONFIGS: Record<string, TenantConfig> = {
  'restaurant1': {
    // ... other configs
    liffId: 'YOUR_LIFF_ID_HERE', // 🔥 เปลี่ยนตรงนี้
  },
  // ...
};
```

---

## 📁 โครงสร้างไฟล์

### **ไฟล์หลัก**
```
apps/customer/src/app/
├── contexts/
│   ├── AuthContext.tsx          # 🔐 จัดการ Authentication
│   └── TenantContext.tsx        # 🏪 จัดการ Multi-tenant
├── api/
│   └── auth/
│       ├── line/route.ts        # 📡 LINE Login API
│       └── me/route.ts          # 👤 User Profile API
├── profile/
│   └── page.tsx                 # 👤 หน้าโปรไฟล์
├── utils/
│   ├── liff.ts                  # 🛠️ LIFF Utilities
│   └── tenant.ts                # 🏪 Tenant Management
└── layout.tsx                   # 🎨 Layout + LIFF SDK
```

### **Components ที่สำคัญ**

#### 1. **AuthContext** (`contexts/AuthContext.tsx`)
```typescript
// การใช้งาน
const { user, isAuthenticated, login, logout } = useAuth();

// ข้อมูลผู้ใช้
interface User {
  id: string;
  lineId: string;
  displayName: string;
  email?: string;
  pictureUrl?: string;
  role: string;
  loginProvider: string;
}
```

#### 2. **LINE Login API** (`api/auth/line/route.ts`)
```typescript
// Request Body
{
  lineId: string;
  lineProfile: {
    displayName: string;
    email?: string;
    pictureUrl?: string;
  };
  idToken: string;
  tenantId: string;
}

// Response
{
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}
```

---

## 🚀 การใช้งาน

### **1. การเข้าสู่ระบบ**
```typescript
// ใน Component
import { useAuth } from '../contexts/AuthContext';

function LoginButton() {
  const { login, isAuthenticated, user } = useAuth();
  
  return (
    <Button onClick={login}>
      {isAuthenticated ? `สวัสดี ${user?.displayName}` : 'LINE Login'}
    </Button>
  );
}
```

### **2. การตรวจสอบสถานะ**
```typescript
// Protected Route
function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <Loading />;
  if (!isAuthenticated) return <LoginRequired />;
  
  return <YourContent />;
}
```

### **3. การออกจากระบบ**
```typescript
function LogoutButton() {
  const { logout } = useAuth();
  
  return (
    <Button onClick={logout}>
      ออกจากระบบ
    </Button>
  );
}
```

---

## 🧪 การทดสอบ

### **1. ทดสอบใน Browser (Development)**
```bash
# รันโปรเจ็กต์
cd apps/customer
npm run dev

# เปิด http://localhost:3000
# กดปุ่ม "LINE Login"
# จะแสดงข้อความ "LINE Login ไม่พร้อมใช้งาน กรุณาเปิดผ่าน LINE App"
```

### **2. ทดสอบใน LINE App (Production)**
1. Deploy โปรเจ็กต์ไปยัง server
2. ตั้งค่า LIFF Endpoint URL
3. เปิด LIFF ผ่าน LINE App
4. ทดสอบการ Login/Logout

### **3. ทดสอบ Mock Data**
```javascript
// ตรวจสอบใน Console
console.log('Mock Users:', localStorage.getItem('mock_users'));

// ข้อมูลที่เก็บ
{
  "lineId123": {
    "id": "user_123",
    "lineId": "lineId123",
    "displayName": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER",
    "status": "ACTIVE",
    "loginProvider": "LINE"
  }
}
```

---

## 🔧 Troubleshooting

### **ปัญหาที่พบบ่อย**

#### 1. **LIFF SDK ไม่โหลด**
```javascript
// ตรวจสอบใน Console
console.log('LIFF Available:', !!window.liff);

// แก้ไข: ตรวจสอบ script tag ใน layout.tsx
<script src="https://static.line-scdn.net/liff/edge/2/sdk.js" async></script>
```

#### 2. **LIFF ID ไม่ถูกต้อง**
```typescript
// ตรวจสอบ LIFF ID
const { tenant } = useTenant();
console.log('LIFF ID:', tenant?.liffId);

// แก้ไข: อัปเดตใน tenant.ts
liffId: 'YOUR_CORRECT_LIFF_ID'
```

#### 3. **Token หมดอายุ**
```javascript
// ตรวจสอบ Token
const token = localStorage.getItem('auth_token');
if (token?.startsWith('mock_token_')) {
  const payload = JSON.parse(atob(token.replace('mock_token_', '')));
  console.log('Token expires at:', new Date(payload.exp * 1000));
}
```

#### 4. **Hydration Mismatch**
```typescript
// ใช้ ClientOnly wrapper
import ClientOnly from './components/ClientOnly';

<ClientOnly>
  <AuthSensitiveComponent />
</ClientOnly>
```

### **Error Messages**

| Error | สาเหตุ | วิธีแก้ไข |
|-------|--------|----------|
| `LIFF SDK not available` | ไม่ได้โหลด LIFF SDK | เพิ่ม script tag |
| `No LIFF ID configured` | ไม่ได้ตั้งค่า LIFF ID | อัปเดตใน tenant config |
| `Token ไม่ถูกต้อง` | JWT Token ผิดรูปแบบ | ล้าง localStorage |
| `LINE Login ไม่พร้อมใช้งาน` | ไม่ได้เปิดใน LINE App | ทดสอบใน LINE App |

---

## 📊 การจัดการข้อมูล

### **localStorage Keys**
```javascript
// Authentication
'auth_token'                    // JWT Token
'mock_users'                   // Mock user database

// Tenant-specific (แยกตาม tenant)
'restaurant1_cart'             // Cart data
'restaurant1_favorites'        // Favorite items
'restaurant1_addresses'        // Delivery addresses
```

### **API Endpoints**
```
POST /api/auth/line           # LINE Login
GET  /api/auth/me            # Get user profile
GET  /api/auth/line          # Check auth status
```

---

## 🎨 UI Components

### **Login Button Styles**
```typescript
// Login Button (Green)
background: 'rgba(34, 197, 94, 0.1)',
color: '#22c55e',
border: '1px solid rgba(34, 197, 94, 0.2)',

// Logout Button (Red)  
background: 'rgba(239, 68, 68, 0.1)',
color: '#ef4444',
border: '1px solid rgba(239, 68, 68, 0.2)',
```

### **Profile Avatar**
```typescript
// แสดงรูปจาก LINE หรือตัวอักษรแรก
<Avatar src={user?.pictureUrl}>
  {user?.displayName?.charAt(0)}
</Avatar>
```

---

## 🔒 Security Considerations

### **ในระบบจริง (Production)**
1. **JWT Verification**: ใช้ proper JWT library
2. **ID Token Validation**: ตรวจสอบกับ LINE API
3. **Database**: ใช้ database จริงแทน mock data
4. **HTTPS**: บังคับใช้ HTTPS
5. **Rate Limiting**: จำกัดจำนวน API calls

### **Mock Implementation**
- ใช้สำหรับ development เท่านั้น
- ข้อมูลเก็บใน memory (หายเมื่อ refresh)
- ไม่มีการ validate ID Token
- JWT เป็น mock format

---

## 📱 Mobile Optimization

### **LINE App Integration**
- ✅ LIFF SDK รองรับ mobile
- ✅ Responsive design
- ✅ Touch-friendly buttons
- ✅ Native LINE experience

### **Browser Fallback**
- แสดงข้อความแจ้งเตือน
- ไม่สามารถ login ได้
- แนะนำให้เปิดใน LINE App

---

## 🚀 Next Steps

### **Production Deployment**
1. ตั้งค่า real database (PostgreSQL/MySQL)
2. ใช้ proper JWT library
3. เพิ่ม ID Token validation
4. ตั้งค่า environment variables
5. เพิ่ม error monitoring

### **Feature Enhancements**
1. Push notifications ผ่าน LINE
2. LINE Pay integration
3. Rich menu integration
4. Chatbot integration
5. Analytics tracking

---

## 📞 Support

หากมีปัญหาหรือข้อสงสัย:
1. ตรวจสอบ Console errors
2. ดู Network tab ใน DevTools
3. ตรวจสอบ LIFF configuration
4. ทดสอบใน LINE App

---

**🎉 ขอให้สนุกกับการใช้งาน LINE Login!** 