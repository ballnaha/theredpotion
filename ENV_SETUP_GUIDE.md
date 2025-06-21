# 🔧 Environment Variables Setup Guide
## การตั้งค่า Environment Variables สำหรับ LIFF และ LINE

### 🎯 Overview
คู่มือนี้จะแนะนำการตั้งค่า Environment Variables ที่จำเป็นสำหรับระบบ Multi-tenant LIFF

---

## 📋 **Step 1: สร้างไฟล์ .env**

### **1.1 สร้างไฟล์ .env ใน root directory**
```bash
# ใน root directory ของโปรเจ็กต์
touch .env
```

### **1.2 สร้างไฟล์ .env ใน apps/customer**
```bash
# ใน apps/customer directory
touch apps/customer/.env
```

---

## 🗄️ **Step 2: Database Configuration**

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/theredpotion"

# Authentication
NEXTAUTH_URL="https://theredpotion.com"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
JWT_SECRET="your-jwt-secret-key-here"
```

---

## 📱 **Step 3: LINE LIFF Configuration**

### **3.1 Restaurant 1 - Green Garden Organic**
```env
# เปลี่ยน xxxxxxxxx เป็น LIFF ID จริงที่ได้จาก LINE Developers Console
LIFF_ID_RESTAURANT1="liff-xxxxxxxxx-xxxxxxxxx"
LINE_CHANNEL_ID_RESTAURANT1="xxxxxxxxx"
LINE_CHANNEL_SECRET_RESTAURANT1="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
LINE_CHANNEL_ACCESS_TOKEN_RESTAURANT1="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
WEBHOOK_URL_RESTAURANT1="https://restaurant1.theredpotion.com/api/webhook/line"
```

### **3.2 Restaurant 2 - Zen Healthy Treats**
```env
# เปลี่ยน yyyyyyyyy เป็น LIFF ID จริงที่ได้จาก LINE Developers Console
LIFF_ID_RESTAURANT2="liff-yyyyyyyyy-yyyyyyyyy"
LINE_CHANNEL_ID_RESTAURANT2="yyyyyyyyy"
LINE_CHANNEL_SECRET_RESTAURANT2="yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
LINE_CHANNEL_ACCESS_TOKEN_RESTAURANT2="yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
WEBHOOK_URL_RESTAURANT2="https://restaurant2.theredpotion.com/api/webhook/line"
```

### **3.3 Restaurant 3 - Fresh Bowl Co.**
```env
# เปลี่ยน zzzzzzzzz เป็น LIFF ID จริงที่ได้จาก LINE Developers Console
LIFF_ID_RESTAURANT3="liff-zzzzzzzzz-zzzzzzzzz"
LINE_CHANNEL_ID_RESTAURANT3="zzzzzzzzz"
LINE_CHANNEL_SECRET_RESTAURANT3="zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
LINE_CHANNEL_ACCESS_TOKEN_RESTAURANT3="zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
WEBHOOK_URL_RESTAURANT3="https://restaurant3.theredpotion.com/api/webhook/line"
```

---

## 🌍 **Step 4: Domain Configuration**

```env
# Domains
MAIN_DOMAIN="theredpotion.com"
RESTAURANT1_DOMAIN="restaurant1.theredpotion.com"
RESTAURANT2_DOMAIN="restaurant2.theredpotion.com"
RESTAURANT3_DOMAIN="restaurant3.theredpotion.com"
ADMIN_DOMAIN="admin.theredpotion.com"
```

---

## 💳 **Step 5: Payment Configuration**

```env
# Payment Gateway
OMISE_PUBLIC_KEY="pkey_test_xxxxxxxxxxxxxxxxxxxxxxxxx"
OMISE_SECRET_KEY="skey_test_xxxxxxxxxxxxxxxxxxxxxxxxx"

# PromptPay
PROMPTPAY_MERCHANT_ID="your-promptpay-merchant-id"
PROMPTPAY_TERMINAL_ID="your-promptpay-terminal-id"

# True Money Wallet
TRUEMONEY_APP_ID="your-truemoney-app-id"
TRUEMONEY_APP_SECRET="your-truemoney-app-secret"
```

---

## 🚀 **Step 6: Development Configuration**

```env
# Environment
NODE_ENV="development"
PORT="3000"
ADMIN_PORT="3001"

# CORS
CORS_ORIGIN="https://theredpotion.com,https://restaurant1.theredpotion.com,https://restaurant2.theredpotion.com,https://restaurant3.theredpotion.com,https://admin.theredpotion.com"
```

---

## 📧 **Step 7: Email Configuration (Optional)**

```env
# SMTP Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
FROM_EMAIL="noreply@theredpotion.com"
```

---

## ☁️ **Step 8: Cloud Storage (Optional)**

```env
# AWS S3
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="ap-southeast-1"
AWS_S3_BUCKET="theredpotion-assets"

# หรือใช้ Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

---

## 🔒 **Step 9: Security Best Practices**

### **9.1 ไม่เผยแพร่ Secret Keys**
```bash
# เพิ่มใน .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore
```

### **9.2 ใช้ Strong Secrets**
```bash
# Generate strong secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **9.3 แยก Environment**
```env
# Development
NODE_ENV="development"
DATABASE_URL="postgresql://localhost:5432/theredpotion_dev"

# Production
NODE_ENV="production"
DATABASE_URL="postgresql://production-host:5432/theredpotion_prod"
```

---

## 📋 **Step 10: Validation Checklist**

### **✅ ตรวจสอบก่อนรัน**
- [ ] DATABASE_URL เชื่อมต่อได้
- [ ] LIFF ID ทั้ง 3 ร้านถูกต้อง
- [ ] Channel Secret และ Access Token ถูกต้อง
- [ ] Domain configuration ถูกต้อง
- [ ] Payment gateway keys ถูกต้อง
- [ ] CORS origin รวม domain ทั้งหมด

### **🧪 ทดสอบ Environment**
```bash
# ทดสอบ database connection
npm run db:test

# ทดสอบ LIFF configuration
npm run test:liff

# ทดสอบ environment variables
npm run test:env
```

---

## 🚨 **Troubleshooting**

### **ปัญหาที่พบบ่อย:**

1. **LIFF ID ไม่ถูกต้อง**
   ```
   Error: Invalid LIFF ID format
   Solution: ตรวจสอบ format liff-xxxxxxxxx-xxxxxxxxx
   ```

2. **Database connection failed**
   ```
   Error: Connection refused
   Solution: ตรวจสอบ DATABASE_URL และ database server
   ```

3. **CORS Error**
   ```
   Error: Access blocked by CORS policy
   Solution: เพิ่ม domain ใน CORS_ORIGIN
   ```

---

## 📞 **Support**

หากมีปัญหา:
1. ตรวจสอบ logs ใน console
2. ทดสอบ environment variables ทีละตัว
3. ดู documentation ของ LINE LIFF
4. ติดต่อทีมพัฒนา

---

**🎉 เมื่อตั้งค่าเสร็จแล้ว ระบบจะพร้อมใช้งาน LIFF แยกตามร้าน!** 