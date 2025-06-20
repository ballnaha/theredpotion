import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Function to hash password using Node.js crypto
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

// Function to verify password (for future use)
function verifyPassword(password: string, hashedPassword: string): boolean {
  const [salt, hash] = hashedPassword.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

// Generate fake LINE ID for demo
function generateLineId(): string {
  return `U${crypto.randomBytes(16).toString('hex').substring(0, 32)}`;
}

async function main() {
  console.log('🔐💚 เริ่มต้น LINE + Secure Seeding...');

  // ล้างข้อมูลเดิม
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.restaurantUser.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 ลบข้อมูลเดิมเสร็จแล้ว');

  // ==================== ADMIN & STAFF ====================
  // สร้าง Super Admin (Email/Password Login)
  const adminPassword = hashPassword('AdminSecure123!');
  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@theredpotion.com',
      password: adminPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      phone: '+66-2-000-0001',
      loginProvider: 'EMAIL',
    },
  });

  console.log('👑 Super Admin สร้างแล้ว:', superAdmin.email);

  // ==================== RESTAURANTS ====================
  // สร้างร้านอาหาร 1: Pizza Palace
  const pizzaPalace = await prisma.restaurant.create({
    data: {
      name: 'Pizza Palace',
      slug: 'pizza-palace',
      description: 'ร้านพิซซ่าแสนอร่อยที่ทำด้วยความรักและวัตถุดิบคุณภาพ',
      address: '123 ถนนสุขุมวิท แขวงคลองเตย กรุงเทพฯ 10110',
      city: 'กรุงเทพมหานคร',
      zipCode: '10110',
      phone: '02-123-4567',
      email: 'info@pizzapalace.com',
      status: 'ACTIVE',
      logo: '/logos/pizza-palace.png',
      banner: '/banners/pizza-palace.jpg',
      primaryColor: '#e74c3c',
      secondaryColor: '#c0392b',
      avgDeliveryTime: 25,
      deliveryRadius: 5.0,
    },
  });

  // สร้าง Owner ของ Pizza Palace (Email/Password Login)
  const ownerPassword = hashPassword('Owner123!');
  const pizzaOwner = await prisma.user.create({
    data: {
      email: 'owner@pizzapalace.com',
      password: ownerPassword,
      firstName: 'Mario',
      lastName: 'Rossi',
      role: 'RESTAURANT_OWNER',
      status: 'ACTIVE',
      phone: '+66-2-123-4567',
      loginProvider: 'EMAIL',
    },
  });

  // เชื่อม Owner กับ Restaurant
  await prisma.restaurantUser.create({
    data: {
      userId: pizzaOwner.id,
      restaurantId: pizzaPalace.id,
      role: 'OWNER',
    },
  });

  console.log('🍕 Pizza Palace พร้อม Owner แล้ว');

  // สร้างร้านอาหาร 2: Burger Bros
  const burgerBros = await prisma.restaurant.create({
    data: {
      name: 'Burger Bros',
      slug: 'burger-bros',
      description: 'เบอร์เกอร์สไตล์อเมริกันแท้ จัดเต็มไปกับเนื้อชั้นเลิศ',
      address: '456 ถนนพระราม 4 แขวงคลองตัน กรุงเทพฯ 10500',
      city: 'กรุงเทพมหานคร',
      zipCode: '10500',
      phone: '02-234-5678',
      email: 'info@burgerbros.com',
      status: 'ACTIVE',
      logo: '/logos/burger-bros.png',
      banner: '/banners/burger-bros.jpg',
      primaryColor: '#f39c12',
      secondaryColor: '#e67e22',
      avgDeliveryTime: 20,
      deliveryRadius: 4.5,
    },
  });

  // สร้างหมวดหมู่อาหารสำหรับ Pizza Palace
  await prisma.category.createMany({
    data: [
      {
        name: 'พิซซ่าคลาสสิค',
        description: 'พิซซ่าแบบดั้งเดิมที่ทุกคนชอบ',
        sortOrder: 1,
        isActive: true,
        restaurantId: pizzaPalace.id,
      },
      {
        name: 'พิซซ่าพรีเมียม',
        description: 'พิซซ่าสูตรพิเศษด้วยวัตถุดิบชั้นเลิศ',
        sortOrder: 2,
        isActive: true,
        restaurantId: pizzaPalace.id,
      },
      {
        name: 'เครื่องดื่ม',
        description: 'เครื่องดื่มเย็น ๆ คู่กับพิซซ่า',
        sortOrder: 3,
        isActive: true,
        restaurantId: pizzaPalace.id,
      },
    ],
  });

  console.log('🍔 Burger Bros ร้านที่ 2 พร้อมแล้ว');

  // ==================== CUSTOMERS (LINE LOGIN) ====================
  // สร้างลูกค้าที่ใช้ LINE Login
  const lineCustomers = await prisma.user.createMany({
    data: [
      {
        // ลูกค้า LINE #1
        lineId: generateLineId(),
        lineDisplayName: 'สมชาย ใจดี',
        lineEmail: 'somchai.line@example.com',
        linePictureUrl: 'https://profile.line-scdn.net/0h1a2b3c4d5e6f',
        firstName: 'สมชาย',
        lastName: 'ใจดี',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        phone: '+66-81-111-1111',
        loginProvider: 'LINE',
      },
      {
        // ลูกค้า LINE #2
        lineId: generateLineId(),
        lineDisplayName: 'สมหญิง รักการกิน',
        lineEmail: 'somying.line@example.com',
        linePictureUrl: 'https://profile.line-scdn.net/0h7f8e9d0c1b2a',
        firstName: 'สมหญิง',
        lastName: 'รักการกิน',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        phone: '+66-82-222-2222',
        loginProvider: 'LINE',
      },
      {
        // ลูกค้า LINE #3
        lineId: generateLineId(),
        lineDisplayName: 'John LINE User',
        linePictureUrl: 'https://profile.line-scdn.net/0h9d8c7b6a5f4e',
        firstName: 'John',
        lastName: 'Doe',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        phone: '+66-83-333-3333',
        loginProvider: 'LINE',
      },
    ],
  });

  // สร้างลูกค้าที่ใช้ Email/Password (ผสม)
  const customerPassword = hashPassword('Customer123!');
  const emailCustomers = await prisma.user.createMany({
    data: [
      {
        email: 'regular.customer@example.com',
        password: customerPassword,
        firstName: 'ลูกค้า',
        lastName: 'ปกติ',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        phone: '+66-84-444-4444',
        loginProvider: 'EMAIL',
      },
    ],
  });

  console.log('👥💚 ลูกค้า LINE Login: 3 คน');
  console.log('👥📧 ลูกค้า Email Login: 1 คน');

  // ==================== RIDERS (EMAIL LOGIN) ====================
  // สร้างไรเดอร์ที่ใช้ Email/Password
  const riderPassword = hashPassword('Rider123!');
  const riders = await prisma.user.createMany({
    data: [
      {
        email: 'rider.rung@example.com',
        password: riderPassword,
        firstName: 'นายรุ่ง',
        lastName: 'ส่งเร็ว',
        role: 'RIDER',
        status: 'ACTIVE',
        phone: '+66-85-555-5555',
        loginProvider: 'EMAIL',
      },
      {
        email: 'rider.raeng@example.com',
        password: riderPassword,
        firstName: 'นายแรง',
        lastName: 'วิ่งไว',
        role: 'RIDER',
        status: 'ACTIVE',
        phone: '+66-86-666-6666',
        loginProvider: 'EMAIL',
      },
    ],
  });

  console.log('🏍️ ไรเดอร์ 2 คน พร้อมแล้ว');

  console.log('\n✅ LINE + Secure Seed เสร็จสิ้น!');
  console.log('\n📋 รายการ Login ทดสอบ:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  console.log('\n👑 SUPER ADMIN (Email Login):');
  console.log('   Email: admin@theredpotion.com');
  console.log('   Password: AdminSecure123!');
  
  console.log('\n🍕 RESTAURANT OWNER (Email Login):');
  console.log('   Email: owner@pizzapalace.com');
  console.log('   Password: Owner123!');
  
  console.log('\n👥💚 CUSTOMERS (LINE Login):');
  console.log('   ✓ สมชาย ใจดี (LINE ID: U1234...)');
  console.log('   ✓ สมหญิง รักการกิน (LINE ID: U5678...)');
  console.log('   ✓ John LINE User (LINE ID: U9abc...)');
  
  console.log('\n👥📧 CUSTOMERS (Email Login):');
  console.log('   Email: regular.customer@example.com');
  console.log('   Password: Customer123!');
  
  console.log('\n🏍️ RIDERS (Email Login):');
  console.log('   Email: rider.rung@example.com | Password: Rider123!');
  console.log('   Email: rider.raeng@example.com | Password: Rider123!');
  
  console.log('\n🔐 Login Methods Summary:');
  console.log('   📧 Email/Password: Admin, Restaurant, Rider, Some Customers');
  console.log('   💚 LINE Login: Most Customers');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => {
    console.error('❌ เกิดข้อผิดพลาดใน LINE Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 