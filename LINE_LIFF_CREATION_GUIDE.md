# 🚀 LINE LIFF App Creation Guide - The Red Potion

## 📋 Overview
คู่มือการสร้าง LINE LIFF (LINE Front-end Framework) App สำหรับ The Red Potion Food Delivery System

---

## 🎯 Prerequisites
- LINE Business Account
- Domain name (SSL Certificate required)
- Basic understanding of web development

---

## 📝 Step-by-Step Guide

### 1. 🏢 สร้าง LINE Business Account

#### 1.1 สมัคร LINE Business Account
```
1. ไปที่ https://www.linebiz.com/
2. คลิก "Get Started"
3. เลือก "LINE Official Account"
4. กรอกข้อมูลธุรกิจ
5. ยืนยัน Email และ Phone Number
```

#### 1.2 ยืนยันตัวตน
```
1. อัปโหลดเอกสารยืนยันตัวตน
2. รอการอนุมัติ (1-3 วันทำการ)
3. ได้รับ Email ยืนยัน
```

### 2. 🔧 สร้าง LINE Developer Account

#### 2.1 เข้าสู่ LINE Developers Console
```
1. ไปที่ https://developers.line.biz/console/
2. Login ด้วย LINE Account
3. ยอมรับ Terms of Service
4. เข้าสู่ Console Dashboard
```

#### 2.2 สร้าง Provider
```
1. คลิก "Create a new provider"
2. กรอก Provider name: "The Red Potion"
3. คลิก "Create"
```

### 3. 📱 สร้าง Messaging API Channel

#### 3.1 สร้าง Channel
```
1. ใน Provider Dashboard คลิก "Create a Messaging API channel"
2. กรอกข้อมูล:
   - Channel name: "The Red Potion Food Delivery"
   - Channel description: "Food delivery service with healthy options"
   - Category: "Food & Beverage"
   - Subcategory: "Restaurant"
   - Email address: your-email@domain.com
```

#### 3.2 ตั้งค่า Channel
```
1. Channel icon: อัปโหลดโลโก้ร้าน (1:1 ratio, 1024x1024px)
2. Privacy policy URL: https://theredpotion.treetelu.com/privacy
3. Terms of use URL: https://theredpotion.treetelu.com/terms
4. คลิก "Create"
```

### 4. 🔑 รับ Channel Credentials

#### 4.1 Channel Basic Settings
```
1. ไปที่ Channel Settings > Basic Settings
2. บันทึกข้อมูลสำคัญ:
   - Channel ID: 1234567890
   - Channel secret: abcdef1234567890abcdef1234567890
```

#### 4.2 Messaging API Settings
```
1. ไปที่ Channel Settings > Messaging API
2. สร้าง Channel access token:
   - คลิก "Issue"
   - บันทึก Token: abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890
```

#### 4.3 Webhook Settings
```
1. ใน Messaging API Settings
2. ตั้งค่า Webhook URL:
   - URL: https://theredpotion.treetelu.com/api/webhook/line
   - Use webhook: เปิดใช้งาน
   - Verify: คลิกเพื่อทดสอบ
```

### 5. 🖥️ สร้าง LIFF App

#### 5.1 เพิ่ม LIFF App
```
1. ไปที่ Channel Settings > LIFF
2. คลิก "Add"
3. กรอกข้อมูล LIFF App:
```

#### 5.2 LIFF App Configuration
```
LIFF app name: The Red Potion
Size: Full
Endpoint URL: https://theredpotion.treetelu.com
Scope: 
  ☑️ profile
  ☑️ openid
  ☐ chat_message.write (optional)
Bot link feature: On (Aggressive)
Scan QR: On
Module mode: Off
```

#### 5.3 บันทึก LIFF ID
```
หลังจากสร้างเสร็จจะได้ LIFF ID เช่น:
LIFF ID: 1234567890-abcdefgh
```

### 6. 🎨 สร้าง Rich Menu (Optional)

#### 6.1 ออกแบบ Rich Menu
```
ขนาดภาพ: 2500 x 1686 pixels
รูปแบบ: JPEG หรือ PNG
ขนาดไฟล์: ไม่เกิน 1MB
```

#### 6.2 Rich Menu Layout แนะนำ
```
┌─────────┬─────────┬─────────┐
│  เมนู   │ สถานะ   │ ตะกร้า  │
│  อาหาร  │ ออเดอร์  │ สินค้า  │
├─────────┼─────────┼─────────┤
│ ช่วยเหลือ│ โปรไฟล์ │ ติดต่อ  │
│         │         │  เรา    │
└─────────┴─────────┴─────────┘
```

#### 6.3 สร้าง Rich Menu ผ่าน API
```bash
curl -X POST https://api.line.me/v2/bot/richmenu \
-H 'Authorization: Bearer YOUR_CHANNEL_ACCESS_TOKEN' \
-H 'Content-Type: application/json' \
-d '{
  "size": {
    "width": 2500,
    "height": 1686
  },
  "selected": false,
  "name": "The Red Potion Menu",
  "chatBarText": "เมนู",
  "areas": [
    {
      "bounds": {
        "x": 0,
        "y": 0,
        "width": 833,
        "height": 843
      },
      "action": {
        "type": "uri",
        "uri": "https://theredpotion.treetelu.com?action=menu"
      }
    }
  ]
}'
```

### 7. 🔧 Environment Variables Setup

#### 7.1 สร้างไฟล์ .env.local
```env
# LINE Configuration
LINE_CHANNEL_ID=1234567890
LINE_CHANNEL_SECRET=abcdef1234567890abcdef1234567890
LINE_CHANNEL_ACCESS_TOKEN=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890
LINE_LIFF_ID=1234567890-abcdefgh

# Webhook URL
LINE_WEBHOOK_URL=https://theredpotion.treetelu.com/api/webhook/line

# LIFF URL
NEXT_PUBLIC_LINE_LIFF_ID=1234567890-abcdefgh
```

#### 7.2 Production Environment
```bash
# Vercel
vercel env add LINE_CHANNEL_ID
vercel env add LINE_CHANNEL_SECRET
vercel env add LINE_CHANNEL_ACCESS_TOKEN
vercel env add NEXT_PUBLIC_LINE_LIFF_ID

# หรือ
# Netlify, Railway, etc.
```

### 8. 🧪 Testing LIFF App

#### 8.1 ทดสอบใน LINE App
```
1. เพิ่ม Official Account เป็นเพื่อน
2. พิมพ์ข้อความใดๆ เพื่อเปิด Rich Menu
3. คลิกปุ่มใน Rich Menu
4. ตรวจสอบว่า LIFF App เปิดขึ้นมา
```

#### 8.2 ทดสอบใน Browser
```
1. เปิด https://liff.line.me/1234567890-abcdefgh
2. Login ด้วย LINE Account
3. ตรวจสอบ LIFF functions
```

#### 8.3 ใช้ LIFF Inspector
```
1. ไปที่ https://liff-inspector.line.me/
2. ใส่ LIFF URL
3. ตรวจสอบ LIFF configuration
4. ทดสอบ API calls
```

### 9. 🔍 Debugging & Troubleshooting

#### 9.1 Common Issues

**LIFF App ไม่เปิด**
```
- ตรวจสอบ LIFF ID ถูกต้อง
- ตรวจสอบ Endpoint URL accessible
- ตรวจสอบ SSL Certificate valid
```

**Login ไม่ทำงาน**
```
- ตรวจสอบ Scope configuration
- ตรวจสอบ Bot link feature enabled
- ตรวจสอบ LIFF SDK integration
```

**Webhook ไม่ได้รับ Event**
```
- ตรวจสอบ Webhook URL reachable
- ตรวจสอบ Signature verification
- ตรวจสอบ Response status 200
```

#### 9.2 Debug Tools
```
1. LIFF Inspector: https://liff-inspector.line.me/
2. LINE Simulator: ใน Developer Console
3. Browser Developer Tools
4. Server logs
```

### 10. 📊 Analytics & Monitoring

#### 10.1 LINE Official Account Manager
```
1. ไปที่ https://manager.line.biz/
2. เลือก Account
3. ดู Analytics:
   - จำนวน Friends
   - Message delivery
   - Rich Menu clicks
   - LIFF App usage
```

#### 10.2 Custom Analytics
```javascript
// Google Analytics 4
gtag('event', 'liff_login', {
  event_category: 'user',
  event_label: 'line_login'
});

// Custom tracking
fetch('/api/analytics/liff-usage', {
  method: 'POST',
  body: JSON.stringify({
    event: 'liff_open',
    userId: profile.userId,
    timestamp: new Date().toISOString()
  })
});
```

### 11. 🚀 Production Deployment

#### 11.1 Pre-deployment Checklist
```
✅ SSL Certificate installed
✅ Domain configured
✅ Environment variables set
✅ Database ready
✅ LIFF App tested
✅ Webhook tested
✅ Rich Menu uploaded
```

#### 11.2 Go Live Steps
```
1. Deploy application to production
2. Update Webhook URL in LINE Console
3. Test LIFF App in production
4. Monitor logs and analytics
5. Announce to users
```

### 12. 📱 Multiple Restaurant Setup

#### 12.1 Shared LIFF Strategy
```
1 LIFF App สำหรับทุกร้าน:
- URL: https://theredpotion.treetelu.com
- Query parameter: ?tenant=restaurant1
- Single login experience
- Shared user database
```

#### 12.2 Separate LIFF Strategy
```
แยก LIFF App แต่ละร้าน:
- Restaurant 1: https://restaurant1.theredpotion.com
- Restaurant 2: https://restaurant2.theredpotion.com
- Restaurant 3: https://restaurant3.theredpotion.com
- Separate login for each
- Isolated user data
```

---

## 📋 Checklist Summary

### LINE Developer Console
- [ ] Provider created
- [ ] Messaging API Channel created
- [ ] Channel credentials saved
- [ ] Webhook URL configured
- [ ] LIFF App created
- [ ] LIFF ID saved
- [ ] Rich Menu designed (optional)
- [ ] Rich Menu uploaded (optional)

### Application Setup
- [ ] Environment variables configured
- [ ] LIFF SDK integrated
- [ ] Authentication implemented
- [ ] Webhook handler created
- [ ] Database schema updated
- [ ] Error handling added

### Testing
- [ ] LIFF App opens in LINE
- [ ] Login/logout works
- [ ] Profile data retrieved
- [ ] Webhook receives events
- [ ] Rich Menu functions
- [ ] Cross-browser compatibility

### Production
- [ ] SSL Certificate valid
- [ ] Domain configured
- [ ] Production deployment
- [ ] Monitoring setup
- [ ] Analytics configured
- [ ] Documentation updated

---

## 📚 Additional Resources

### Official Documentation
- [LINE Developers](https://developers.line.biz/)
- [LIFF Documentation](https://developers.line.biz/en/docs/liff/)
- [Messaging API](https://developers.line.biz/en/docs/messaging-api/)

### Tools & Utilities
- [LIFF Inspector](https://liff-inspector.line.me/)
- [Rich Menu Designer](https://developers.line.biz/console/)
- [LINE Simulator](https://developers.line.biz/en/docs/messaging-api/simulator/)

### Community
- [LINE Developer Community](https://www.line-community.me/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/line-liff)
- [GitHub Examples](https://github.com/line)

---

## 🆘 Support Contacts

### Technical Issues
- LINE Developer Support: https://developers.line.biz/en/support/
- Community Forum: https://www.line-community.me/

### Business Account Issues
- LINE Business Support: https://www.linebiz.com/contact/

---

*สร้างโดย: The Red Potion Development Team*  
*อัปเดตล่าสุด: 2024*  
*เวอร์ชัน: 1.0* 