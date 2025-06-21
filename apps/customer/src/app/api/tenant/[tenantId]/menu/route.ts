import { NextRequest, NextResponse } from 'next/server';
import { validateTenant } from '../../../../utils/tenant';

import { generateFoodSlug, generateUniqueId } from '../../../../utils/slugGenerator';

// Mock menu data for different tenants
const TENANT_MENUS = {
  restaurant1: [
    {
      id: 'r1-001',
      slug: 'restaurant1-green-power-bowl-abc123',
      name: 'Green Power Bowl',
      description: 'สลัดผักใบเขียวสดใส อะโวคาโด และชีสเฟต้า',
      price: 189,
      image: '/images/green-power-bowl.jpg',
      category: 'Healthy Bowls',
      available: true,
      tenantId: 'restaurant1',
      addOns: [
        { id: '1', name: 'ชีสเฟต้าเพิ่ม', price: 45 },
        { id: '2', name: 'อะโวคาโด', price: 60 },
        { id: '3', name: 'มะกอกดำ', price: 35 },
        { id: '4', name: 'อัลมอนด์แผ่น', price: 40 },
        { id: '5', name: 'เมล็ดทานตะวัน', price: 25 },
        { id: '6', name: 'น้ำสลัดบัลซามิค', price: 30 }
      ]
    },
    {
      id: 'r1-002',
      slug: 'restaurant1-quinoa-protein-bowl-def456',
      name: 'Quinoa Protein Bowl',
      description: 'ควินัว โปรตีนไก่ย่าง และผักโอร์แกนิค',
      price: 219,
      image: '/images/quinoa-bowl.jpg',
      category: 'Protein Bowls',
      available: true,
      tenantId: 'restaurant1',
      addOns: [
        { id: '1', name: 'ชีสเฟต้าเพิ่ม', price: 45 },
        { id: '2', name: 'อะโวคาโด', price: 60 },
        { id: '7', name: 'ไก่ย่างเพิ่ม', price: 80 }
      ]
    },
    {
      id: 'r1-003',
      slug: 'restaurant1-organic-smoothie-bowl-ghi789',
      name: 'Organic Smoothie Bowl',
      description: 'สมูทตี้โบวล์ออร์แกนิค ผลไม้สดใหม่ แกรนโนล่าโฮมเมด',
      price: 165,
      image: '/images/smoothie-bowl.jpg',
      category: 'Smoothie Bowls',
      available: true,
      tenantId: 'restaurant1',
      addOns: [
        { id: '1', name: 'ชีสเฟต้าเพิ่ม', price: 45 },
        { id: '2', name: 'อะโวคาโด', price: 60 },
        { id: '8', name: 'แกรนโนล่าเพิ่ม', price: 35 }
      ]
    }
  ],
  restaurant2: [
    {
      id: 'r2-001',
      slug: 'restaurant2-zen-garden-salad-jkl012',
      name: 'Zen Garden Salad',
      description: 'สลัดแบบเซน ผักใบเขียว เต้าหู้ และงา',
      price: 169,
      image: '/images/zen-salad.jpg',
      category: 'Zen Salads',
      available: true,
      tenantId: 'restaurant2',
      addOns: [
        { id: '1', name: 'เต้าหู้เพิ่ม', price: 40 },
        { id: '2', name: 'งาดำ', price: 25 },
        { id: '3', name: 'น้ำสลัดงา', price: 35 }
      ]
    },
    {
      id: 'r2-002',
      slug: 'restaurant2-buddha-bowl-mno345',
      name: 'Buddha Bowl',
      description: 'ข้าวกล้อง ผักต่างๆ และซอสถั่วเหลือง',
      price: 199,
      image: '/images/buddha-bowl.jpg',
      category: 'Buddha Bowls',
      available: true,
      tenantId: 'restaurant2',
      addOns: [
        { id: '1', name: 'เต้าหู้เพิ่ม', price: 40 },
        { id: '4', name: 'ถั่วเหลืองต้ม', price: 30 }
      ]
    },
    {
      id: 'r2-003',
      slug: 'restaurant2-meditation-tea-bowl-pqr678',
      name: 'Meditation Tea Bowl',
      description: 'ชาเขียวมัทฉะ ข้าวโอ๊ต เซียซีด และน้ำผึ้งแท้',
      price: 145,
      image: '/images/tea-bowl.jpg',
      category: 'Tea Bowls',
      available: true,
      tenantId: 'restaurant2',
      addOns: [
        { id: '1', name: 'เต้าหู้เพิ่ม', price: 40 },
        { id: '5', name: 'เซียซีดเพิ่ม', price: 30 },
        { id: '6', name: 'น้ำผึ้งมานูกา', price: 45 }
      ]
    }
  ],
  restaurant3: [
    {
      id: 'r3-001',
      slug: 'restaurant3-fresh-acai-bowl-stu901',
      name: 'Fresh Acai Bowl',
      description: 'อาซาอิ โบล์ พร้อมผลไม้สดและแกรนโนล่า',
      price: 159,
      image: '/images/acai-bowl.jpg',
      category: 'Fresh Bowls',
      available: true,
      tenantId: 'restaurant3',
      addOns: [
        { id: '1', name: 'แกรนโนล่าเพิ่ม', price: 35 },
        { id: '2', name: 'ผลไม้ตามฤดูกาล', price: 45 },
        { id: '3', name: 'น้ำผึ้งแท้', price: 25 }
      ]
    },
    {
      id: 'r3-002',
      slug: 'restaurant3-tropical-smoothie-bowl-vwx234',
      name: 'Tropical Smoothie Bowl',
      description: 'สมูทตี้โบล์รสเมืองร้อน มะม่วง มะพร้าว',
      price: 179,
      image: '/images/tropical-bowl.jpg',
      category: 'Smoothie Bowls',
      available: true,
      tenantId: 'restaurant3',
      addOns: [
        { id: '1', name: 'แกรนโนล่าเพิ่ม', price: 35 },
        { id: '4', name: 'เชียซีด', price: 40 },
        { id: '5', name: 'มะพร้าวขูด', price: 30 }
      ]
    },
    {
      id: 'r3-003',
      slug: 'restaurant3-coconut-chia-pudding-yzab567',
      name: 'Coconut Chia Pudding',
      description: 'พุดดิ้งเซียมะพร้าว ผลไม้เมืองร้อน และเกล็ดมะพร้าว',
      price: 135,
      image: '/images/coconut-pudding.jpg',
      category: 'Puddings',
      available: true,
      tenantId: 'restaurant3',
      addOns: [
        { id: '1', name: 'แกรนโนล่าเพิ่ม', price: 35 },
        { id: '6', name: 'เกล็ดมะพร้าวเพิ่ม', price: 25 },
        { id: '7', name: 'ผลไม้ดราย', price: 40 }
      ]
    }
  ]
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  try {
    const { tenantId } = await params;
    
    // Validate tenant exists
    if (!validateTenant(tenantId)) {
      return NextResponse.json(
        { error: 'Invalid tenant' },
        { status: 404 }
      );
    }
    
    // Get tenant-specific menu
    const menu = TENANT_MENUS[tenantId as keyof typeof TENANT_MENUS] || [];
    
    return NextResponse.json({
      success: true,
      data: menu,
      tenant: tenantId
    });
    
  } catch (error) {
    console.error('Error fetching tenant menu:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 