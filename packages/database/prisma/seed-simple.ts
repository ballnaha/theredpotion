import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ล้างข้อมูลเดิม
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.restaurantUser.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 ลบข้อมูลเดิมเสร็จแล้ว');

  // สร้าง Super Admin
  const superAdmin = await prisma.user.create({
    data: {
      id: 'super-admin-01',
      email: 'admin@theredpotion.com',
      password: 'password123', // ไม่เข้ารหัสก่อน
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
    },
  });

  console.log('👑 Super Admin:', superAdmin.email);

  // สร้างร้านอาหาร 1: Pizza Palace
  const pizzaPalace = await prisma.restaurant.create({
    data: {
      id: 'restaurant-pizza-palace',
      name: 'Pizza Palace',
      slug: 'pizza-palace',
      description: 'ร้านพิซซ่าแสนอร่อยที่ทำด้วยความรักและวัตถุดิบคุณภาพ',
      address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
      phone: '02-123-4567',
      email: 'info@pizzapalace.com',
      status: 'ACTIVE',
      logo: '/logos/pizza-palace.png',
      banner: '/banners/pizza-palace.jpg',
      primaryColor: '#e74c3c',
      secondaryColor: '#c0392b',
    },
  });

  // สร้าง Owner ของ Pizza Palace
  const pizzaOwner = await prisma.user.create({
    data: {
      id: 'owner-pizza-palace',
      email: 'owner@pizzapalace.com',
      password: 'password123',
      firstName: 'Mario',
      lastName: 'Rossi',
      role: 'RESTAURANT_OWNER',
      status: 'ACTIVE',
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

  // สร้างหมวดหมู่อาหารสำหรับ Pizza Palace
  await prisma.category.createMany({
    data: [
      {
        id: 'cat-pizza-classic',
        name: 'พิซซ่าคลาสสิค',
        description: 'พิซซ่าแบบดั้งเดิมที่ทุกคนชอบ',
        sortOrder: 1,
        isActive: true,
        restaurantId: pizzaPalace.id,
      },
      {
        id: 'cat-pizza-premium',
        name: 'พิซซ่าพรีเมียม',
        description: 'พิซซ่าสูตรพิเศษด้วยวัตถุดิบชั้นเลิศ',
        sortOrder: 2,
        isActive: true,
        restaurantId: pizzaPalace.id,
      },
    ],
  });

  console.log('🍕 Pizza Palace พร้อมหมวดหมู่แล้ว');

  // สร้างร้านอาหาร 2: Burger Bros
  const burgerBros = await prisma.restaurant.create({
    data: {
      id: 'restaurant-burger-bros',
      name: 'Burger Bros',
      slug: 'burger-bros',
      description: 'เบอร์เกอร์สไตล์อเมริกันแท้ จัดเต็มไปกับเนื้อชั้นเลิศ',
      address: '456 ถนนพระราม 4 กรุงเทพฯ 10500',
      phone: '02-234-5678',
      email: 'info@burgerbros.com',
      status: 'ACTIVE',
      logo: '/logos/burger-bros.png',
      banner: '/banners/burger-bros.jpg',
      primaryColor: '#f39c12',
      secondaryColor: '#e67e22',
    },
  });

  console.log('🍔 Burger Bros พร้อมแล้ว');

  // สร้างลูกค้าตัวอย่าง
  await prisma.user.createMany({
    data: [
      {
        id: 'customer-01',
        email: 'customer1@example.com',
        password: 'password123',
        firstName: 'สมชาย',
        lastName: 'ใจดี',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        phone: '081-111-1111',
      },
      {
        id: 'customer-02',
        email: 'customer2@example.com',
        password: 'password123',
        firstName: 'สมหญิง',
        lastName: 'รักการกิน',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        phone: '082-222-2222',
      },
    ],
  });

  console.log('👥 ลูกค้าตัวอย่าง 2 คน พร้อมแล้ว');

  // สร้างไรเดอร์
  await prisma.user.createMany({
    data: [
      {
        id: 'rider-01',
        email: 'rider1@example.com',
        password: 'password123',
        firstName: 'นายรุ่ง',
        lastName: 'ส่งเร็ว',
        role: 'RIDER',
        status: 'ACTIVE',
        phone: '083-333-3333',
      },
      {
        id: 'rider-02',
        email: 'rider2@example.com',
        password: 'password123',
        firstName: 'นายแรง',
        lastName: 'วิ่งไว',
        role: 'RIDER',
        status: 'ACTIVE',
        phone: '084-444-4444',
      },
    ],
  });

  console.log('🏍️ ไรเดอร์ 2 คน พร้อมแล้ว');

  console.log('✅ Seed เสร็จสิ้น! ข้อมูลเริ่มต้นพร้อมใช้งาน');
}

main()
  .catch((e) => {
    console.error('❌ เกิดข้อผิดพลาดใน Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 