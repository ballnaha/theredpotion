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

async function main() {
  console.log('🔐 เริ่มต้น Secure Seeding with Password Hashing...');

  // ล้างข้อมูลเดิม
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.restaurantUser.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 ลบข้อมูลเดิมเสร็จแล้ว');

  // สร้าง Super Admin with hashed password
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
    },
  });

  console.log('👑 Super Admin สร้างแล้ว:', superAdmin.email);
  console.log('🔒 Password: AdminSecure123! (hashed)');

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

  // สร้าง Owner ของ Pizza Palace with hashed password
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
  console.log('🔒 Owner Password: Owner123! (hashed)');

  // สร้างหมวดหมู่อาหารสำหรับ Pizza Palace
  const pizzaCategories = await prisma.category.createMany({
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

  console.log('🍔 Burger Bros ร้านที่ 2 พร้อมแล้ว');

  // สร้างลูกค้าตัวอย่าง with hashed passwords
  const customerPassword = hashPassword('Customer123!');
  const customers = await prisma.user.createMany({
    data: [
      {
        email: 'somchai@example.com',
        password: customerPassword,
        firstName: 'สมชาย',
        lastName: 'ใจดี',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        phone: '+66-81-111-1111',
      },
      {
        email: 'somying@example.com',
        password: customerPassword,
        firstName: 'สมหญิง',
        lastName: 'รักการกิน',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        phone: '+66-82-222-2222',
      },
      {
        email: 'john.doe@example.com',
        password: customerPassword,
        firstName: 'John',
        lastName: 'Doe',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        phone: '+66-83-333-3333',
      },
    ],
  });

  console.log('👥 ลูกค้า 3 คน พร้อมแล้ว');
  console.log('🔒 Customer Password: Customer123! (hashed)');

  // สร้างไรเดอร์ with hashed passwords
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
        phone: '+66-84-444-4444',
      },
      {
        email: 'rider.raeng@example.com',
        password: riderPassword,
        firstName: 'นายแรง',
        lastName: 'วิ่งไว',
        role: 'RIDER',
        status: 'ACTIVE',
        phone: '+66-85-555-5555',
      },
    ],
  });

  console.log('🏍️ ไรเดอร์ 2 คน พร้อมแล้ว');
  console.log('🔒 Rider Password: Rider123! (hashed)');

  console.log('\n✅ Secure Seed เสร็จสิ้น!');
  console.log('\n📋 รายการ Login ทดสอบ:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👑 SUPER ADMIN:');
  console.log('   Email: admin@theredpotion.com');
  console.log('   Password: AdminSecure123!');
  console.log('\n🍕 RESTAURANT OWNER:');
  console.log('   Email: owner@pizzapalace.com');
  console.log('   Password: Owner123!');
  console.log('\n👥 CUSTOMERS:');
  console.log('   Email: somchai@example.com | Password: Customer123!');
  console.log('   Email: somying@example.com | Password: Customer123!');
  console.log('\n🏍️ RIDERS:');
  console.log('   Email: rider.rung@example.com | Password: Rider123!');
  console.log('   Email: rider.raeng@example.com | Password: Rider123!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => {
    console.error('❌ เกิดข้อผิดพลาดใน Secure Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 