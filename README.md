# 🍕 Multi-Tenant Food Delivery Platform

**The Red Potion** - ระบบ Food Delivery แบบ Multi-tenant ที่ให้แต่ละร้านมีเว็บไซต์เป็นของตัวเอง พร้อมระบบ Rider และ Real-time Tracking

## 🎯 **Vision & Concept**

สร้างแพลตฟอร์มที่ให้ร้านอาหารแต่ละร้านมีเว็บไซต์เฉพาะของตัวเอง โดยลูกค้าจะเข้าถึงผ่าน URL เฉพาะของร้าน (เช่น `pizzahut.domain.com`) และไม่สามารถดูร้านอื่นได้ พร้อมระบบบริหารจัดการจากส่วนกลาง

## 🏗️ **System Architecture Overview**

```
📱 Customer Apps (Multi-tenant)
├── restaurant1.domain.com
├── restaurant2.domain.com  
└── restaurant3.domain.com

🛵 Rider Mobile App
└── rider-app.domain.com

🏪 Restaurant Dashboard
├── dashboard.restaurant1.com
└── Global Restaurant Panel

👑 Super Admin Panel
└── admin.domain.com

🔄 Real-time Features
├── Socket.io Server
├── Live Order Tracking
└── Push Notifications
```

## 🚀 **Development Phases**

---

## 📋 **Phase 1: Foundation & Core Setup**
**Timeline: 1-2 สัปดาห์**

### 🎯 **Objectives:**
- สร้างโครงสร้างพื้นฐานของระบบ
- ติดตั้ง Dependencies และ Tools
- สร้าง Database Schema
- Authentication System พื้นฐาน

### 📋 **Tasks:**

#### 1.1 **Project Structure Setup**
```
theredpotion/
├── apps/
│   ├── customer/          # Customer app (Next.js)
│   ├── admin/             # Admin dashboard
│   ├── restaurant/        # Restaurant dashboard
│   └── rider/             # Rider app (PWA)
├── packages/
│   ├── database/          # Database schemas & migrations
│   ├── shared-ui/         # Shared components
│   ├── socket-server/     # Socket.io server
│   └── api/               # Backend API
├── docker-compose.yml
└── turbo.json             # Monorepo config
```

#### 1.2 **Technology Stack Installation**
- **Frontend:** Next.js 15, Material-UI v6, TypeScript
- **Backend:** Node.js, Express/Fastify, Prisma/TypeORM
- **Database:** PostgreSQL + Redis
- **Real-time:** Socket.io
- **Monorepo:** Turborepo/Lerna

#### 1.3 **Database Design & Setup**
```sql
-- Core Tables
Users (id, email, password, role, status)
Restaurants (id, name, slug, domain, status, settings)
Restaurant_Users (user_id, restaurant_id, role)
Categories (id, restaurant_id, name, sort_order)
Menu_Items (id, restaurant_id, category_id, name, price, status)
```

#### 1.4 **Basic Authentication**
- JWT-based authentication
- Role-based access control (Customer, Restaurant Owner, Admin)
- Password hashing & security

### ✅ **Deliverables:**
- [x] Monorepo structure
- [x] Database with basic tables
- [x] Authentication API endpoints
- [x] Basic UI components library

---

## 🏪 **Phase 2: Restaurant Management System**
**Timeline: 2-3 สัปดาห์**

### 🎯 **Objectives:**
- สร้างระบบจัดการร้านอาหาร
- Multi-tenant routing
- Restaurant onboarding process
- Menu management

### 📋 **Tasks:**

#### 2.1 **Multi-tenant Architecture**
```javascript
// Middleware สำหรับตรวจสอบ tenant
const tenantMiddleware = (req, res, next) => {
  const subdomain = req.hostname.split('.')[0];
  const restaurant = await getRestaurantBySlug(subdomain);
  req.restaurant = restaurant;
  next();
};
```

#### 2.2 **Restaurant Onboarding**
- Restaurant registration form
- Document upload (business license, etc.)
- Admin approval workflow
- Custom subdomain setup

#### 2.3 **Menu Management System**
- Category management
- Menu item CRUD operations
- Image upload for food items
- Price management
- Availability toggle

#### 2.4 **Restaurant Dashboard**
- Order management interface
- Menu editing interface
- Restaurant settings
- Analytics overview

### ✅ **Deliverables:**
- [x] Multi-tenant routing system
- [x] Restaurant registration & approval
- [x] Complete menu management
- [x] Restaurant dashboard v1

---

## 👑 **Phase 3: Admin & Super Admin System**
**Timeline: 1-2 สัปดาห์**

### 🎯 **Objectives:**
- สร้างระบบบริหารจัดการส่วนกลาง
- Restaurant approval/suspension
- Global analytics
- User management

### 📋 **Tasks:**

#### 3.1 **Super Admin Dashboard**
- Restaurant approval/rejection
- Restaurant suspension/activation
- Global user management
- System-wide settings

#### 3.2 **Analytics & Reporting**
- Revenue analytics
- Restaurant performance metrics
- User behavior tracking
- Order statistics

#### 3.3 **Content Management**
- Global announcements
- Terms & conditions management
- Email templates
- Notification templates

### ✅ **Deliverables:**
- [x] Complete admin dashboard
- [x] Restaurant approval workflow
- [x] Analytics system
- [x] Content management system

---

## 📱 **Phase 4: Customer App & Ordering System**
**Timeline: 3-4 สัปดาห์**

### 🎯 **Objectives:**
- สร้างแอปสำหรับลูกค้า (แยกตามร้าน)
- Shopping cart & checkout
- Payment integration
- Order history

### 📋 **Tasks:**

#### 4.1 **Customer Frontend (Per Restaurant)**
```javascript
// Dynamic theming based on restaurant
const RestaurantTheme = ({ restaurant, children }) => {
  const theme = createTheme({
    palette: {
      primary: { main: restaurant.primaryColor },
      secondary: { main: restaurant.secondaryColor }
    },
    typography: {
      fontFamily: restaurant.fontFamily
    }
  });
  
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
```

#### 4.2 **Shopping Cart System**
- Add/remove items
- Quantity management
- Cart persistence
- Discount codes
- Tax calculation

#### 4.3 **Checkout & Payment**
- Address management
- Payment integration (Stripe/Omise)
- Order confirmation
- Receipt generation

#### 4.4 **Customer Features**
- Order history
- Favorite items
- Reviews & ratings
- Profile management

### ✅ **Deliverables:**
- [x] Customer app with restaurant theming
- [x] Complete shopping cart
- [x] Payment integration
- [x] Order management

---

## 🛵 **Phase 5: Rider Management System**
**Timeline: 3-4 สัปดาห์**

### 🎯 **Objectives:**
- สร้างระบบจัดการ Rider
- Rider onboarding & verification
- Order assignment algorithm
- Rider mobile app

### 📋 **Tasks:**

#### 5.1 **Rider Registration & Verification**
```sql
-- Rider Tables
Riders (id, user_id, vehicle_type, license_plate, status)
Rider_Documents (id, rider_id, document_type, file_url, verified_at)
Rider_Locations (id, rider_id, lat, lng, timestamp)
```

#### 5.2 **Rider Mobile App (PWA)**
- Registration & document upload
- Real-time location tracking
- Order acceptance/rejection
- Navigation integration
- Earnings tracking

#### 5.3 **Smart Order Assignment**
```javascript
const assignRiderToOrder = async (orderId) => {
  const availableRiders = await findNearbyRiders(order.restaurant_location);
  const bestRider = calculateBestRider(availableRiders, order);
  await assignOrder(orderId, bestRider.id);
};
```

#### 5.4 **Rider Management Dashboard**
- Rider approval/suspension
- Performance tracking
- Payout management
- Route optimization

### ✅ **Deliverables:**
- [x] Rider registration system
- [x] Rider mobile app (PWA)
- [x] Order assignment algorithm
- [x] Rider management dashboard

---

## ⚡ **Phase 6: Real-time Features & Socket.io**
**Timeline: 2-3 สัปดาห์**

### 🎯 **Objectives:**
- ระบบ Real-time tracking
- Live notifications
- Order status updates
- Live chat support

### 📋 **Tasks:**

#### 6.1 **Socket.io Server Setup**
```javascript
// Socket Events
const EVENTS = {
  ORDER_PLACED: 'order:placed',
  ORDER_STATUS_UPDATE: 'order:status_update',
  RIDER_LOCATION_UPDATE: 'rider:location_update',
  LIVE_CHAT_MESSAGE: 'chat:message'
};
```

#### 6.2 **Real-time Order Tracking**
- Live order status updates
- Rider location tracking
- ETA calculations
- Delivery notifications

#### 6.3 **Live Features**
- Real-time inventory updates
- Live chat between customer-rider
- Push notifications
- Live analytics dashboard

#### 6.4 **Performance Optimization**
- Redis for session management
- Socket.io clustering
- Database optimization
- Caching strategies

### ✅ **Deliverables:**
- [x] Socket.io server
- [x] Real-time order tracking
- [x] Live notifications
- [x] Performance optimization

---

## 🔧 **Phase 7: Advanced Features & Optimization**
**Timeline: 2-3 สัปดาห์**

### 🎯 **Objectives:**
- Advanced business features
- Performance optimization
- Security hardening
- DevOps & deployment

### 📋 **Tasks:**

#### 7.1 **Business Intelligence**
- Advanced analytics
- Revenue optimization
- Dynamic pricing
- Demand forecasting

#### 7.2 **Performance & Scalability**
- Database optimization
- CDN integration
- Image optimization
- Load balancing

#### 7.3 **Security & Compliance**
- Security auditing
- Data encryption
- GDPR compliance
- API rate limiting

#### 7.4 **DevOps & Deployment**
```yaml
# Production deployment
version: '3.8'
services:
  app:
    image: theredpotion:latest
    deploy:
      replicas: 3
  nginx:
    image: nginx:alpine
  postgres:
    image: postgres:15
  redis:
    image: redis:alpine
```

### ✅ **Deliverables:**
- [x] Production-ready deployment
- [x] Security hardening
- [x] Performance optimization
- [x] Monitoring & logging

---

## 🎨 **Phase 8: UI/UX Enhancements & Mobile Apps**
**Timeline: 2-3 สัปดาห์**

### 🎯 **Objectives:**
- UI/UX improvements
- Native mobile apps
- Accessibility features
- Internationalization

### 📋 **Tasks:**

#### 8.1 **Design System**
- Consistent design language
- Component library expansion
- Dark mode support
- Responsive design

#### 8.2 **Mobile Applications**
- React Native apps
- App store deployment
- Push notifications
- Offline capabilities

#### 8.3 **Accessibility & I18N**
- Screen reader support
- Multi-language support
- Keyboard navigation
- WCAG compliance

### ✅ **Deliverables:**
- [x] Complete design system
- [x] Native mobile apps
- [x] Accessibility compliance
- [x] Multi-language support

---

## 🚀 **Getting Started**

### **Prerequisites:**
```bash
Node.js >= 18
PostgreSQL >= 14
Redis >= 6
Docker & Docker Compose
```

### **Installation:**
```bash
# Clone repository
git clone <repository-url>
cd theredpotion

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development servers
npm run dev
```

### **Development Workflow:**
1. **Phase Selection:** เลือก phase ที่จะทำ
2. **Branch Creation:** สร้าง branch สำหรับ phase นั้น
3. **Development:** พัฒนาตาม tasks ใน phase
4. **Testing:** ทดสอบ features ทั้งหมด
5. **Review:** Code review และ QA
6. **Merge:** Merge เข้า main branch

## 📈 **Current Status**

- ✅ **Phase 0:** Project initialization
- 🔄 **Phase 1:** In progress - Foundation setup
- ⏳ **Phase 2:** Pending - Restaurant management
- ⏳ **Phase 3:** Pending - Admin system
- ⏳ **Phase 4:** Pending - Customer app
- ⏳ **Phase 5:** Pending - Rider system
- ⏳ **Phase 6:** Pending - Real-time features
- ⏳ **Phase 7:** Pending - Advanced features
- ⏳ **Phase 8:** Pending - UI/UX enhancements

## 🤝 **Contributing**

1. เลือก Phase ที่ต้องการทำ
2. สร้าง branch: `git checkout -b phase-X/feature-name`
3. Commit changes: `git commit -m 'Add feature X'`
4. Push branch: `git push origin phase-X/feature-name`
5. Create Pull Request

## 📄 **License**

MIT License - see LICENSE.md for details

---

**Next Action:** เริ่มต้นด้วย Phase 1 - Foundation & Core Setup 🚀
