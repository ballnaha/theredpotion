# 🚀 LINE LIFF Implementation Guide - The Red Potion

## 📋 Overview
คู่มือการใช้งาน LINE LIFF (LINE Front-end Framework) สำหรับระบบ Multi-Tenant Food Delivery App

---

## 🎯 LIFF Strategy แนะนำ

### Option 1: Shared LIFF (แนะนำ) ⭐
```
✅ ข้อดี:
- UX ดีกว่า (ไม่ต้อง login ซ้ำ)
- การจัดการง่าย
- Cost effective
- ลูกค้าสามารถเปรียบเทียบร้านได้

❌ ข้อเสีย:
- ข้อมูลลูกค้า shared ระหว่างร้าน
```

### Option 2: Separate LIFF
```
✅ ข้อดี:
- ข้อมูลแยกสมบูรณ์
- ความปลอดภัยสูง
- ปรับแต่งได้เฉพาะร้าน

❌ ข้อเสีย:
- ต้อง login ใหม่ทุกร้าน
- การจัดการซับซ้อน
- Cost สูงกว่า
```

---

## 🏗️ Architecture Design

### Database Schema
```sql
-- Global Users Table
CREATE TABLE users (
  id VARCHAR PRIMARY KEY,
  line_id VARCHAR UNIQUE,
  line_display_name VARCHAR,
  line_picture_url VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR,
  phone VARCHAR,
  role ENUM('CUSTOMER', 'ADMIN'),
  status ENUM('ACTIVE', 'INACTIVE'),
  login_provider ENUM('LINE', 'EMAIL'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  last_login_at TIMESTAMP
);

-- Restaurant/Tenant Table
CREATE TABLE restaurants (
  id VARCHAR PRIMARY KEY,
  name VARCHAR,
  slug VARCHAR UNIQUE,
  line_channel_id VARCHAR,
  line_channel_secret VARCHAR,
  line_channel_access_token VARCHAR,
  line_liff_id VARCHAR,
  status ENUM('ACTIVE', 'INACTIVE'),
  created_at TIMESTAMP
);

-- Tenant-specific User Profiles
CREATE TABLE user_tenant_profiles (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id),
  restaurant_id VARCHAR REFERENCES restaurants(id),
  preferences JSON,
  delivery_addresses JSON,
  created_at TIMESTAMP,
  UNIQUE(user_id, restaurant_id)
);

-- Orders (Tenant-isolated)
CREATE TABLE orders (
  id VARCHAR PRIMARY KEY,
  restaurant_id VARCHAR REFERENCES restaurants(id),
  customer_id VARCHAR REFERENCES users(id),
  order_number VARCHAR,
  status ENUM('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERING', 'DELIVERED', 'CANCELLED'),
  total DECIMAL(10,2),
  created_at TIMESTAMP
);
```

---

## 🔧 Implementation Steps

### 1. LINE Developer Console Setup

#### สร้าง LINE Channel
```bash
1. ไปที่ https://developers.line.biz/console/
2. สร้าง Provider ใหม่
3. สร้าง Messaging API Channel
4. บันทึก Channel ID, Channel Secret, Channel Access Token
```

#### สร้าง LIFF App
```bash
1. ไปที่ Channel Settings > LIFF
2. Add LIFF App
3. ตั้งค่า:
   - LIFF app name: "The Red Potion"
   - Size: Full
   - Endpoint URL: "https://theredpotion.treetelu.com"
   - Scope: profile, openid
   - Bot link feature: On (Aggressive)
4. บันทึก LIFF ID
```

### 2. Environment Variables
```env
# .env.local
LINE_CHANNEL_ID=your_channel_id
LINE_CHANNEL_SECRET=your_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=your_access_token
LINE_LIFF_ID=your_liff_id

# Webhook URL
LINE_WEBHOOK_URL=https://theredpotion.treetelu.com/api/webhook/line
```

### 3. Frontend Integration

#### Install LIFF SDK
```bash
npm install @line/liff
```

#### LIFF Initialization
```typescript
// utils/liff.ts
import liff from '@line/liff';

const LIFF_ID = process.env.NEXT_PUBLIC_LINE_LIFF_ID!;

export const initializeLiff = async () => {
  try {
    await liff.init({ liffId: LIFF_ID });
    console.log('LIFF initialized successfully');
    return true;
  } catch (error) {
    console.error('LIFF initialization failed:', error);
    return false;
  }
};

export const isLiffReady = () => {
  return liff.isReady();
};

export const isLoggedIn = () => {
  return liff.isLoggedIn();
};

export const login = () => {
  liff.login();
};

export const logout = () => {
  liff.logout();
};

export const getProfile = async () => {
  try {
    return await liff.getProfile();
  } catch (error) {
    console.error('Failed to get profile:', error);
    return null;
  }
};

export const closeWindow = () => {
  liff.closeWindow();
};

export const sendMessages = (messages: any[]) => {
  if (liff.isApiAvailable('sendMessages')) {
    liff.sendMessages(messages);
  }
};
```

#### Auth Context
```typescript
// contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeLiff, isLoggedIn, getProfile, login, logout } from '@/utils/liff';

interface User {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const liffReady = await initializeLiff();
        
        if (liffReady && isLoggedIn()) {
          const profile = await getProfile();
          if (profile) {
            setUser(profile);
            
            // Send profile to backend
            await fetch('/api/auth/line', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ profile })
            });
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login: handleLogin,
      logout: handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### 4. Backend API Endpoints

#### LINE Login Handler
```typescript
// app/api/auth/line/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { profile } = await request.json();
    
    if (!profile?.userId) {
      return NextResponse.json({ error: 'Invalid profile' }, { status: 400 });
    }

    // Upsert user
    const user = await prisma.user.upsert({
      where: { lineId: profile.userId },
      update: {
        lineDisplayName: profile.displayName,
        linePictureUrl: profile.pictureUrl,
        lastLoginAt: new Date(),
      },
      create: {
        lineId: profile.userId,
        lineDisplayName: profile.displayName,
        linePictureUrl: profile.pictureUrl,
        firstName: profile.displayName.split(' ')[0] || 'ลูกค้า',
        lastName: profile.displayName.split(' ').slice(1).join(' ') || 'LINE',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        loginProvider: 'LINE',
        lastLoginAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('LINE login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
```

#### Webhook Handler
```typescript
// app/api/webhook/line/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-line-signature');
    
    // Verify signature
    const hash = crypto
      .createHmac('SHA256', process.env.LINE_CHANNEL_SECRET!)
      .update(body)
      .digest('base64');
    
    if (signature !== hash) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const webhookBody = JSON.parse(body);
    
    // Process events
    for (const event of webhookBody.events) {
      await processLineEvent(event);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
```

---

## 🎨 UI Components

### Login Button
```typescript
// components/LineLoginButton.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@mui/material';

export default function LineLoginButton() {
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();

  if (isLoading) {
    return <Button disabled>กำลังโหลด...</Button>;
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <img 
          src={user?.pictureUrl} 
          alt={user?.displayName}
          className="w-8 h-8 rounded-full"
        />
        <span>{user?.displayName}</span>
        <Button onClick={logout} variant="outlined" size="small">
          ออกจากระบบ
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={login}
      variant="contained"
      sx={{
        backgroundColor: '#00B900',
        '&:hover': { backgroundColor: '#009900' }
      }}
    >
      เข้าสู่ระบบด้วย LINE
    </Button>
  );
}
```

### LIFF Safe Wrapper
```typescript
// components/LiffSafeWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { initializeLiff } from '@/utils/liff';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function LiffSafeWrapper({ children, fallback }: Props) {
  const [isLiffReady, setIsLiffReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const ready = await initializeLiff();
        setIsLiffReady(ready);
      } catch (error) {
        console.error('LIFF init error:', error);
        setIsLiffReady(false);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  if (isLoading) {
    return <div>กำลังโหลด LIFF...</div>;
  }

  if (!isLiffReady) {
    return fallback || <div>LIFF ไม่พร้อมใช้งาน</div>;
  }

  return <>{children}</>;
}
```

---

## 🔧 Multi-Tenant Integration

### Tenant-Aware Cart
```typescript
// hooks/useCart.ts
import { useTenant } from '@/contexts/TenantContext';

export const useCart = () => {
  const { currentTenant } = useTenant();
  const storageKey = `cart_${currentTenant?.slug || 'default'}`;

  const getCart = () => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  };

  const setCart = (items: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(storageKey, JSON.stringify(items));
  };

  // ... rest of cart logic
};
```

### Tenant-Specific LINE Configuration
```typescript
// utils/tenant.ts
export const getTenantLineConfig = async (tenantSlug: string) => {
  const response = await fetch(`/api/tenant/${tenantSlug}/line-config`);
  return response.json();
};
```

---

## 📱 Rich Menu Setup

### Rich Menu Configuration
```typescript
const RICH_MENU_CONFIG = {
  size: { width: 2500, height: 1686 },
  selected: false,
  name: "The Red Potion Menu",
  chatBarText: "เมนู",
  areas: [
    {
      bounds: { x: 0, y: 0, width: 833, height: 843 },
      action: { type: "uri", uri: "https://theredpotion.treetelu.com?action=menu" }
    },
    {
      bounds: { x: 833, y: 0, width: 834, height: 843 },
      action: { type: "postback", data: "check_order_status" }
    },
    {
      bounds: { x: 1667, y: 0, width: 833, height: 843 },
      action: { type: "uri", uri: "https://theredpotion.treetelu.com/cart" }
    }
  ]
};
```

---

## 🚀 Deployment Checklist

### 1. LINE Developer Console
- [ ] Channel created
- [ ] LIFF App configured
- [ ] Webhook URL set
- [ ] Rich Menu uploaded

### 2. Environment Variables
- [ ] LINE_CHANNEL_ID
- [ ] LINE_CHANNEL_SECRET
- [ ] LINE_CHANNEL_ACCESS_TOKEN
- [ ] LINE_LIFF_ID

### 3. Database
- [ ] Schema updated
- [ ] Prisma client generated
- [ ] Seed data added

### 4. Frontend
- [ ] LIFF SDK integrated
- [ ] Auth context implemented
- [ ] Components created
- [ ] Error handling added

### 5. Backend
- [ ] API endpoints created
- [ ] Webhook handler implemented
- [ ] Message handlers added
- [ ] Rich Menu API ready

---

## 🐛 Troubleshooting

### Common Issues

#### 1. LIFF ไม่โหลด
```typescript
// ตรวจสอบ LIFF ID
console.log('LIFF ID:', process.env.NEXT_PUBLIC_LINE_LIFF_ID);

// ตรวจสอบ domain
// LIFF endpoint URL ต้องตรงกับ domain ที่เรียกใช้
```

#### 2. Login ไม่ทำงาน
```typescript
// ตรวจสอบ scope
const liffConfig = {
  liffId: LIFF_ID,
  withLoginOnExternalBrowser: true
};

await liff.init(liffConfig);
```

#### 3. Webhook ไม่ได้รับ event
```bash
# ตรวจสอบ signature verification
# ตรวจสอบ HTTPS certificate
# ตรวจสอบ response status (ต้องเป็น 200)
```

#### 4. Rich Menu ไม่แสดง
```bash
# ตรวจสอบ image size (2500x1686 pixels)
# ตรวจสอบ image format (JPEG/PNG)
# ตรวจสอบ areas configuration
```

---

## 📚 Resources

### Official Documentation
- [LINE LIFF Documentation](https://developers.line.biz/en/docs/liff/)
- [Messaging API Documentation](https://developers.line.biz/en/docs/messaging-api/)
- [Rich Menu Documentation](https://developers.line.biz/en/docs/messaging-api/using-rich-menus/)

### Tools
- [LIFF Inspector](https://liff-inspector.line.me/)
- [LINE Simulator](https://developers.line.biz/console/)
- [Rich Menu Designer](https://developers.line.biz/console/)

---

## 🎯 Next Steps

1. **Testing**: ทดสอบ LIFF App ใน LINE environment
2. **Monitoring**: ติดตั้ง logging และ monitoring
3. **Analytics**: เพิ่ม tracking สำหรับ user behavior
4. **Optimization**: ปรับปรุง performance และ UX
5. **Security**: เพิ่ม security measures และ validation

---

*สร้างโดย: The Red Potion Development Team*  
*อัปเดตล่าสุด: 2024* 