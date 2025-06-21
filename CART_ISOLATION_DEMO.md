# 🛒 ตัวอย่างการทำงานของระบบตะกร้าแยกตาม Tenant

## 📱 สถานการณ์จริงที่เกิดขึ้น

### **ลูกค้าคนเดียวกัน เข้าร้านต่างๆ:**

```
👤 ลูกค้า: นาย A
📱 LINE ID: U1234567890abcdef

🕐 เวลา 10:00 - เข้าร้าน Green Garden
🌐 URL: restaurant1.theredpotion.com
🛒 ใส่ตะกร้า: Green Power Bowl x2 + ชีสเฟต้า
💾 localStorage: restaurant1_cart = {"green_bowl_cheese": 2}

🕐 เวลา 11:00 - เข้าร้าน Zen Treats  
🌐 URL: restaurant2.theredpotion.com
🛒 ใส่ตะกร้า: Zen Garden Salad x1 + เต้าหู้
💾 localStorage: restaurant2_cart = {"zen_salad_tofu": 1}

🕐 เวลา 12:00 - กลับไปร้าน Green Garden
🌐 URL: restaurant1.theredpotion.com  
🛒 ตะกร้าเดิมยังอยู่: Green Power Bowl x2 + ชีสเฟต้า ✅
```

### **ผลลัพธ์:**
- ✅ แต่ละร้านมีตะกร้าแยกกัน
- ✅ ข้อมูลไม่หายเมื่อเปลี่ยนร้าน
- ✅ ไม่สามารถผสมสินค้าจากคนละร้าน
- ✅ การคำนวณราคาถูกต้องตามร้าน

---

## 💳 การชำระเงินแยกตาม Tenant

### **Order Summary แต่ละร้าน:**

#### 🌱 Green Garden (restaurant1)
```
Green Power Bowl x2           ฿378
+ ชีสเฟต้าเพิ่ม x2            ฿90
รวมสินค้า                    ฿468
ค่าส่ง                       ฿39
รวมทั้งหมด                   ฿507

Order ID: GG-20240120-001
Merchant: Green Garden Organic
```

#### 🧘 Zen Treats (restaurant2)  
```
Zen Garden Salad x1          ฿169
+ เต้าหู้เพิ่ม x1             ฿40
รวมสินค้า                    ฿209
ค่าส่ง                       ฿49
รวมทั้งหมด                   ฿258

Order ID: ZT-20240120-001
Merchant: Zen Healthy Treats
```

### **ไม่สามารถรวมกันได้:**
```
❌ ไม่ได้: Mixed Order
Green Power Bowl (ร้าน 1)     ฿189
Zen Garden Salad (ร้าน 2)     ฿169
รวม                          ฿358
ค่าส่ง                       ??? (ร้านไหน?)
```

---

## 🔄 Flow การสั่งซื้อแยกตาม Tenant

### **Step 1: เลือกร้าน**
```
Customer เข้า LINE → เลือก Rich Menu
├── Green Garden → LIFF: restaurant1.theredpotion.com
├── Zen Treats → LIFF: restaurant2.theredpotion.com  
└── Fresh Bowl → LIFF: restaurant3.theredpotion.com
```

### **Step 2: Shopping (แยกตาม Tenant)**
```
🏪 ใน restaurant1.theredpotion.com
├── Menu: เฉพาะเมนูร้าน Green Garden
├── Cart: เฉพาะสินค้าร้าน Green Garden
├── Pricing: ตามราคาร้าน Green Garden
└── Add-ons: เฉพาะ Add-ons ร้าน Green Garden
```

### **Step 3: Checkout (แยกตาม Tenant)**
```
🏪 Green Garden Checkout
├── Items: เฉพาะสินค้าร้าน Green Garden
├── Delivery Fee: ฿39 (ตามร้าน Green Garden)
├── Free Shipping: เมื่อซื้อครบ ฿200
├── Payment Gateway: เชื่อมกับบัญชีร้าน Green Garden
└── Order Tracking: ระบบร้าน Green Garden
```

---

## 💰 ระบบการชำระเงินแยกตาม Tenant

### **Payment Gateway Configuration:**

```typescript
// Payment configuration per tenant
const PAYMENT_CONFIGS = {
  restaurant1: {
    merchantId: 'MERCHANT_GREEN_GARDEN',
    publicKey: 'pk_green_garden_xxx',
    secretKey: 'sk_green_garden_xxx',
    webhookUrl: 'https://restaurant1.theredpotion.com/api/webhook/payment'
  },
  restaurant2: {
    merchantId: 'MERCHANT_ZEN_TREATS', 
    publicKey: 'pk_zen_treats_xxx',
    secretKey: 'sk_zen_treats_xxx',
    webhookUrl: 'https://restaurant2.theredpotion.com/api/webhook/payment'
  },
  restaurant3: {
    merchantId: 'MERCHANT_FRESH_BOWL',
    publicKey: 'pk_fresh_bowl_xxx', 
    secretKey: 'sk_fresh_bowl_xxx',
    webhookUrl: 'https://restaurant3.theredpotion.com/api/webhook/payment'
  }
};
```

### **เงินเข้าบัญชีแยกกัน:**
```
💳 การชำระเงิน:
├── Green Garden Order ฿507 → บัญชี Green Garden
├── Zen Treats Order ฿258 → บัญชี Zen Treats  
└── Fresh Bowl Order ฿180 → บัญชี Fresh Bowl

📊 รายงานยอดขาย:
├── Green Garden: ดูได้เฉพาะยอดขายตัวเอง
├── Zen Treats: ดูได้เฉพาะยอดขายตัวเอง
└── Fresh Bowl: ดูได้เฉพาะยอดขายตัวเอง
```

---

## 🎯 ข้อดีของการแยกระบบ

### **สำหรับร้านค้า:**
- ✅ จัดการยอดขายได้อิสระ
- ✅ ตั้งราคาและโปรโมชั่นได้เอง
- ✅ รับเงินเข้าบัญชีตัวเอง
- ✅ ควบคุมสต็อกและเมนูได้เอง

### **สำหรับลูกค้า:**
- ✅ ไม่สับสนสินค้าจากคนละร้าน
- ✅ เห็นราคาและค่าส่งชัดเจน
- ✅ สามารถสั่งจากหลายร้านได้ (แยกออเดอร์)
- ✅ ติดตามสถานะแต่ละออเดอร์ได้

### **สำหรับแพลตฟอร์ม:**
- ✅ ลดความซับซ้อนในการจัดการ
- ✅ ป้องกันข้อผิดพลาดการผสมออเดอร์
- ✅ รายงานแยกชัดเจน
- ✅ ง่ายต่อการ scale

---

## ⚠️ สิ่งที่ต้องระวัง

### **UX Considerations:**
```
❌ สิ่งที่อาจทำให้ลูกค้าสับสน:
├── ต้องชำระแยกกันถ้าสั่งหลายร้าน
├── ค่าส่งคิดแยกกันถ้าไม่ครบเงื่อนไขฟรีส่ง
└── ไม่สามารถใช้โปรโมชั่นข้ามร้านได้

✅ วิธีแก้:
├── แจ้งให้ลูกค้าทราบชัดเจน
├── แสดง UI ที่เข้าใจง่าย
└── ให้ตัวเลือกในการสั่งเพิ่มจากร้านเดียว
```

### **Technical Considerations:**
```
⚠️ สิ่งที่ต้องจัดการ:
├── Session timeout แยกตาม tenant
├── Payment webhook แยกตาม tenant  
├── Order notification แยกตาม tenant
└── Database isolation
```

---

## 🔧 Implementation Notes

1. **Cart Storage**: ใช้ `tenant_cart` แทน `cart`
2. **Payment Flow**: แยก payment gateway ตาม tenant
3. **Order Management**: แยก order ID format ตาม tenant
4. **Notification**: แยก LINE notification ตาม tenant
5. **Analytics**: แยกรายงานตาม tenant

นี่คือเหตุผลที่ระบบตะกร้าและการชำระเงินต้องแยกกันครับ! 🎯 