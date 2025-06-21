// 📱 LIFF Configuration Seed Script
// ใช้สำหรับ populate LIFF configuration ลงฐานข้อมูล

import { config } from 'dotenv';
config(); // โหลด .env file

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedLiffConfiguration() {
  console.log('🚀 Starting LIFF Configuration Seed...');

  try {
    // 🍕 Restaurant 1 - Green Garden Organic
    const restaurant1 = await prisma.restaurant.upsert({
      where: { slug: 'restaurant1' },
      update: {
        liffId: process.env.LIFF_ID_RESTAURANT1 || '2007609360-3Z0L8Ekg',
        lineChannelId: process.env.LINE_CHANNEL_ID_RESTAURANT1 || '12345678',
        lineChannelSecret: process.env.LINE_CHANNEL_SECRET_RESTAURANT1 || 'channel-secret-1',
        lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN_RESTAURANT1 || 'access-token-1',
        webhookUrl: process.env.WEBHOOK_URL_RESTAURANT1 || 'https://restaurant1.theredpotion.com/api/webhook/line',
      },
      create: {
        name: 'Green Garden Organic',
        slug: 'restaurant1',
        domain: 'restaurant1.theredpotion.com',
        description: 'อาหารออร์แกนิคสดใหม่ เพื่อสุขภาพที่ดี',
        phone: '02-123-4567',
        email: 'info@greengarden.com',
        address: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
        city: 'กรุงเทพมหานคร',
        state: 'กรุงเทพมหานคร',
        zipCode: '10110',
        country: 'TH',
        primaryColor: '#10b981',
        secondaryColor: '#059669',
        logo: '/images/restaurant1-logo.png',
        banner: '/images/restaurant1-banner.jpg',
        status: 'ACTIVE',
        
        // LINE LIFF Configuration
        liffId: process.env.LIFF_ID_RESTAURANT1 || 'liff-restaurant1-12345',
        lineChannelId: process.env.LINE_CHANNEL_ID_RESTAURANT1 || '12345678',
        lineChannelSecret: process.env.LINE_CHANNEL_SECRET_RESTAURANT1 || 'channel-secret-1',
        lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN_RESTAURANT1 || 'access-token-1',
        webhookUrl: process.env.WEBHOOK_URL_RESTAURANT1 || 'https://restaurant1.theredpotion.com/api/webhook/line',
      },
    });

    // 🥗 Restaurant 2 - Zen Healthy Treats
    const restaurant2 = await prisma.restaurant.upsert({
      where: { slug: 'restaurant2' },
      update: {
        liffId: process.env.LIFF_ID_RESTAURANT2 || 'liff-restaurant2-67890',
        lineChannelId: process.env.LINE_CHANNEL_ID_RESTAURANT2 || '87654321',
        lineChannelSecret: process.env.LINE_CHANNEL_SECRET_RESTAURANT2 || 'channel-secret-2',
        lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN_RESTAURANT2 || 'access-token-2',
        webhookUrl: process.env.WEBHOOK_URL_RESTAURANT2 || 'https://restaurant2.theredpotion.com/api/webhook/line',
      },
      create: {
        name: 'Zen Healthy Treats',
        slug: 'restaurant2',
        domain: 'restaurant2.theredpotion.com',
        description: 'ขนมและเครื่องดื่มเพื่อสุขภาพ สไตล์เซน',
        phone: '02-234-5678',
        email: 'info@zenhealthy.com',
        address: '456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500',
        city: 'กรุงเทพมหานคร',
        state: 'กรุงเทพมหานคร',
        zipCode: '10500',
        country: 'TH',
        primaryColor: '#7c3aed',
        secondaryColor: '#6d28d9',
        logo: '/images/restaurant2-logo.png',
        banner: '/images/restaurant2-banner.jpg',
        status: 'ACTIVE',
        
        // LINE LIFF Configuration
        liffId: process.env.LIFF_ID_RESTAURANT2 || 'liff-restaurant2-67890',
        lineChannelId: process.env.LINE_CHANNEL_ID_RESTAURANT2 || '87654321',
        lineChannelSecret: process.env.LINE_CHANNEL_SECRET_RESTAURANT2 || 'channel-secret-2',
        lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN_RESTAURANT2 || 'access-token-2',
        webhookUrl: process.env.WEBHOOK_URL_RESTAURANT2 || 'https://restaurant2.theredpotion.com/api/webhook/line',
      },
    });

    // 🥙 Restaurant 3 - Fresh Bowl Co.
    const restaurant3 = await prisma.restaurant.upsert({
      where: { slug: 'restaurant3' },
      update: {
        liffId: process.env.LIFF_ID_RESTAURANT3 || 'liff-restaurant3-abcde',
        lineChannelId: process.env.LINE_CHANNEL_ID_RESTAURANT3 || '13579246',
        lineChannelSecret: process.env.LINE_CHANNEL_SECRET_RESTAURANT3 || 'channel-secret-3',
        lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN_RESTAURANT3 || 'access-token-3',
        webhookUrl: process.env.WEBHOOK_URL_RESTAURANT3 || 'https://restaurant3.theredpotion.com/api/webhook/line',
      },
      create: {
        name: 'Fresh Bowl Co.',
        slug: 'restaurant3',
        domain: 'restaurant3.theredpotion.com',
        description: 'โบลว์สดใหม่ เต็มไปด้วยคุณค่าทางโภชนาการ',
        phone: '02-345-6789',
        email: 'info@freshbowl.com',
        address: '789 ถนนพญาไท แขวงพญาไท เขตราชเทวี กรุงเทพฯ 10400',
        city: 'กรุงเทพมหานคร',
        state: 'กรุงเทพมหานคร',
        zipCode: '10400',
        country: 'TH',
        primaryColor: '#f59e0b',
        secondaryColor: '#d97706',
        logo: '/images/restaurant3-logo.png',
        banner: '/images/restaurant3-banner.jpg',
        status: 'ACTIVE',
        
        // LINE LIFF Configuration
        liffId: process.env.LIFF_ID_RESTAURANT3 || 'liff-restaurant3-abcde',
        lineChannelId: process.env.LINE_CHANNEL_ID_RESTAURANT3 || '13579246',
        lineChannelSecret: process.env.LINE_CHANNEL_SECRET_RESTAURANT3 || 'channel-secret-3',
        lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN_RESTAURANT3 || 'access-token-3',
        webhookUrl: process.env.WEBHOOK_URL_RESTAURANT3 || 'https://restaurant3.theredpotion.com/api/webhook/line',
      },
    });

    console.log('✅ LIFF Configuration seeded successfully!');
    console.log(`📱 Restaurant 1 LIFF ID: ${restaurant1.liffId}`);
    console.log(`📱 Restaurant 2 LIFF ID: ${restaurant2.liffId}`);
    console.log(`📱 Restaurant 3 LIFF ID: ${restaurant3.liffId}`);

    // 📊 Summary
    console.log('\n🎉 LIFF Configuration Summary:');
    console.log('=====================================');
    console.log(`🍕 ${restaurant1.name}: ${restaurant1.liffId}`);
    console.log(`🥗 ${restaurant2.name}: ${restaurant2.liffId}`);
    console.log(`🥙 ${restaurant3.name}: ${restaurant3.liffId}`);
    console.log('=====================================');

  } catch (error) {
    console.error('❌ Error seeding LIFF configuration:', error);
    throw error;
  }
}

async function main() {
  await seedLiffConfiguration();
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default seedLiffConfiguration; 