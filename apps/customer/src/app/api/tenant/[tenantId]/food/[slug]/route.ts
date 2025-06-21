import { NextRequest, NextResponse } from 'next/server';
import { validateTenant } from '../../../../../utils/tenant';
import { parseSlug } from '../../../../../utils/slugGenerator';

// Import menu data from menu API
const TENANT_MENUS = {
  restaurant1: [
    {
      id: 'r1-001',
      slug: 'restaurant1-green-power-bowl-abc123',
      name: 'Green Power Bowl',
      description: 'สลัดผักใบเขียวสดใส อะโวคาโด และชีสเฟต้า รสชาติสดชื่น เหมาะสำหรับคนรักสุขภาพ',
      price: 189,
      originalPrice: 225,
      discountPercent: 16,
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&crop=center',
      emoji: '🥗',
      rating: 4.8,
      isVegan: true,
      isGlutenFree: true,
      category: 'Healthy Bowls',
      available: true,
      tenantId: 'restaurant1',
      nutritionalInfo: {
        protein: '12g',
        carbs: '24g',
        fat: '15g',
        fiber: '8g'
      },
      restaurant: {
        name: 'Green Garden Organic',
        deliveryTime: '25-30 นาที'
      },
      addOns: [
        { id: '1', name: 'ชีสเฟต้าเพิ่ม', description: 'ชีสเฟต้านำเข้าคุณภาพสูง', price: 45 },
        { id: '2', name: 'อะโวคาโด', description: 'อะโวคาโดสดใหม่หั่นชิ้น', price: 60 },
        { id: '3', name: 'มะกอกดำ', description: 'มะกอกดำคาลามาต้า', price: 35 },
        { id: '4', name: 'อัลมอนด์แผ่น', description: 'อัลมอนด์แผ่นคั่วหอม', price: 40 },
        { id: '5', name: 'เมล็ดทานตะวัน', description: 'เมล็ดทานตะวันคั่วกรอบ', price: 25 },
        { id: '6', name: 'น้ำสลัดบัลซามิค', description: 'น้ำสลัดบัลซามิคพิเศษ', price: 30 }
      ]
    },
    {
      id: 'r1-002',
      slug: 'restaurant1-quinoa-protein-bowl-def456',
      name: 'Quinoa Protein Bowl',
      description: 'ควินัวออร์แกนิค โปรตีนไก่ย่าง และผักโอร์แกนิคหลากสี',
      price: 219,
      originalPrice: 265,
      discountPercent: 17,
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop&crop=center',
      emoji: '🍗',
      rating: 4.9,
      isVegan: false,
      isGlutenFree: true,
      category: 'Protein Bowls',
      available: true,
      tenantId: 'restaurant1',
      nutritionalInfo: {
        protein: '28g',
        carbs: '32g',
        fat: '12g',
        fiber: '6g'
      },
      restaurant: {
        name: 'Green Garden Organic',
        deliveryTime: '25-30 นาที'
      },
      addOns: [
        { id: '1', name: 'ชีสเฟต้าเพิ่ม', description: 'ชีสเฟต้านำเข้าคุณภาพสูง', price: 45 },
        { id: '2', name: 'อะโวคาโด', description: 'อะโวคาโดสดใหม่หั่นชิ้น', price: 60 },
        { id: '7', name: 'ไก่ย่างเพิ่ม', description: 'เนื้อไก่ย่างหอมๆ เพิ่ม', price: 80 }
      ]
    },
    {
      id: 'r1-003',
      slug: 'restaurant1-organic-smoothie-bowl-ghi789',
      name: 'Organic Smoothie Bowl',
      description: 'สมูทตี้โบวล์ออร์แกนิค ผลไม้สดใหม่ แกรนโนล่าโฮมเมด',
      price: 165,
      originalPrice: 195,
      discountPercent: 15,
      imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop&crop=center',
      emoji: '🍓',
      rating: 4.7,
      isVegan: true,
      isGlutenFree: false,
      category: 'Smoothie Bowls',
      available: true,
      tenantId: 'restaurant1',
      nutritionalInfo: {
        protein: '8g',
        carbs: '45g',
        fat: '10g',
        fiber: '12g'
      },
      restaurant: {
        name: 'Green Garden Organic',
        deliveryTime: '25-30 นาที'
      },
      addOns: [
        { id: '1', name: 'ชีสเฟต้าเพิ่ม', description: 'ชีสเฟต้านำเข้าคุณภาพสูง', price: 45 },
        { id: '2', name: 'อะโวคาโด', description: 'อะโวคาโดสดใหม่หั่นชิ้น', price: 60 },
        { id: '8', name: 'แกรนโนล่าเพิ่ม', description: 'แกรนโนล่าโฮมเมดกรอบหอม', price: 35 }
      ]
    }
  ],
  restaurant2: [
    {
      id: 'r2-001',
      slug: 'restaurant2-zen-garden-salad-jkl012',
      name: 'Zen Garden Salad',
      description: 'สลัดแบบเซน ผักใบเขียวออร์แกนิค เต้าหู้นุ่ม และงาดำหอมๆ',
      price: 169,
      originalPrice: 199,
      discountPercent: 15,
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop&crop=center',
      emoji: '🧘',
      rating: 4.6,
      isVegan: true,
      isGlutenFree: true,
      category: 'Zen Salads',
      available: true,
      tenantId: 'restaurant2',
      nutritionalInfo: {
        protein: '14g',
        carbs: '18g',
        fat: '11g',
        fiber: '7g'
      },
      restaurant: {
        name: 'Zen Healthy Treats',
        deliveryTime: '20-25 นาที'
      },
      addOns: [
        { id: '1', name: 'เต้าหู้เพิ่ม', description: 'เต้าหู้นุ่มๆ แบบญี่ปุ่น', price: 40 },
        { id: '2', name: 'งาดำ', description: 'งาดำคั่วหอม', price: 25 },
        { id: '3', name: 'น้ำสลัดงา', description: 'น้ำสลัดงาโฮมเมด', price: 35 }
      ]
    },
    {
      id: 'r2-002',
      slug: 'restaurant2-buddha-bowl-mno345',
      name: 'Buddha Bowl',
      description: 'ข้าวกล้องออร์แกนิค ผักต่างๆ และซอสถั่วเหลืองแบบดั้งเดิม',
      price: 199,
      originalPrice: 235,
      discountPercent: 15,
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
      emoji: '🍚',
      rating: 4.8,
      isVegan: true,
      isGlutenFree: true,
      category: 'Buddha Bowls',
      available: true,
      tenantId: 'restaurant2',
      nutritionalInfo: {
        protein: '16g',
        carbs: '42g',
        fat: '8g',
        fiber: '9g'
      },
      restaurant: {
        name: 'Zen Healthy Treats',
        deliveryTime: '20-25 นาที'
      },
      addOns: [
        { id: '1', name: 'เต้าหู้เพิ่ม', description: 'เต้าหู้นุ่มๆ แบบญี่ปุ่น', price: 40 },
        { id: '4', name: 'ถั่วเหลืองต้ม', description: 'ถั่วเหลืองต้มนุ่ม', price: 30 }
      ]
    },
    {
      id: 'r2-003',
      slug: 'restaurant2-meditation-tea-bowl-pqr678',
      name: 'Meditation Tea Bowl',
      description: 'ชาเขียวมัทฉะแท้ ข้าวโอ๊ต เซียซีด และน้ำผึ้งมานูกาแท้',
      price: 145,
      originalPrice: 175,
      discountPercent: 17,
      imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&h=600&fit=crop&crop=center',
      emoji: '🍵',
      rating: 4.5,
      isVegan: true,
      isGlutenFree: true,
      category: 'Tea Bowls',
      available: true,
      tenantId: 'restaurant2',
      nutritionalInfo: {
        protein: '6g',
        carbs: '28g',
        fat: '9g',
        fiber: '8g'
      },
      restaurant: {
        name: 'Zen Healthy Treats',
        deliveryTime: '20-25 นาที'
      },
      addOns: [
        { id: '1', name: 'เต้าหู้เพิ่ม', description: 'เต้าหู้นุ่มๆ แบบญี่ปุ่น', price: 40 },
        { id: '5', name: 'เซียซีดเพิ่ม', description: 'เซียซีดออร์แกนิค', price: 30 },
        { id: '6', name: 'น้ำผึ้งมานูกา', description: 'น้ำผึ้งมานูกาแท้นำเข้า', price: 45 }
      ]
    }
  ],
  restaurant3: [
    {
      id: 'r3-001',
      slug: 'restaurant3-fresh-acai-bowl-stu901',
      name: 'Fresh Acai Bowl',
      description: 'อาซาอิเบอรี่แท้จากบราซิล พร้อมผลไม้สดและแกรนโนล่าโฮมเมด',
      price: 159,
      originalPrice: 189,
      discountPercent: 16,
      imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop&crop=center',
      emoji: '🫐',
      rating: 4.9,
      isVegan: true,
      isGlutenFree: false,
      category: 'Fresh Bowls',
      available: true,
      tenantId: 'restaurant3',
      nutritionalInfo: {
        protein: '5g',
        carbs: '38g',
        fat: '12g',
        fiber: '11g'
      },
      restaurant: {
        name: 'Fresh Bowl Co.',
        deliveryTime: '15-20 นาที'
      },
      addOns: [
        { id: '1', name: 'แกรนโนล่าเพิ่ม', description: 'แกรนโนล่าโฮมเมดกรอบหอม', price: 35 },
        { id: '2', name: 'ผลไม้ตามฤดูกาล', description: 'ผลไม้สดใหม่ตามฤดู', price: 45 },
        { id: '3', name: 'น้ำผึ้งแท้', description: 'น้ำผึ้งดอกไม้แท้', price: 25 }
      ]
    },
    {
      id: 'r3-002',
      slug: 'restaurant3-tropical-smoothie-bowl-vwx234',
      name: 'Tropical Smoothie Bowl',
      description: 'สมูทตี้โบล์รสเมืองร้อน มะม่วงหวาน มะพร้าวหอม และผลไม้เมืองร้อน',
      price: 179,
      originalPrice: 215,
      discountPercent: 17,
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
      emoji: '🥭',
      rating: 4.8,
      isVegan: true,
      isGlutenFree: true,
      category: 'Smoothie Bowls',
      available: true,
      tenantId: 'restaurant3',
      nutritionalInfo: {
        protein: '7g',
        carbs: '42g',
        fat: '11g',
        fiber: '9g'
      },
      restaurant: {
        name: 'Fresh Bowl Co.',
        deliveryTime: '15-20 นาที'
      },
      addOns: [
        { id: '1', name: 'แกรนโนล่าเพิ่ม', description: 'แกรนโนล่าโฮมเมดกรอบหอม', price: 35 },
        { id: '4', name: 'เชียซีด', description: 'เซียซีดออร์แกนิค', price: 40 },
        { id: '5', name: 'มะพร้าวขูด', description: 'มะพร้าวขูดสดใหม่', price: 30 }
      ]
    },
    {
      id: 'r3-003',
      slug: 'restaurant3-coconut-chia-pudding-yzab567',
      name: 'Coconut Chia Pudding',
      description: 'พุดดิ้งเซียมะพร้าว ผลไม้เมืองร้อนสดใหม่ และเกล็ดมะพร้าวหอมกรอบ',
      price: 135,
      originalPrice: 165,
      discountPercent: 18,
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
      emoji: '🥥',
      rating: 4.7,
      isVegan: true,
      isGlutenFree: true,
      category: 'Puddings',
      available: true,
      tenantId: 'restaurant3',
      nutritionalInfo: {
        protein: '4g',
        carbs: '22g',
        fat: '14g',
        fiber: '10g'
      },
      restaurant: {
        name: 'Fresh Bowl Co.',
        deliveryTime: '15-20 นาที'
      },
      addOns: [
        { id: '1', name: 'แกรนโนล่าเพิ่ม', description: 'แกรนโนล่าโฮมเมดกรอบหอม', price: 35 },
        { id: '6', name: 'เกล็ดมะพร้าวเพิ่ม', description: 'เกล็ดมะพร้าวคั่วหอม', price: 25 },
        { id: '7', name: 'ผลไม้ดราย', description: 'ผลไม้อบแห้งหวานหอม', price: 40 }
      ]
    }
  ]
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tenantId: string; slug: string }> }
) {
  try {
    const { tenantId, slug } = await params;

    // Validate tenant
    if (!validateTenant(tenantId)) {
      return NextResponse.json(
        { error: 'Invalid tenant' },
        { status: 400 }
      );
    }

    // Get menu for tenant
    const menu = TENANT_MENUS[tenantId as keyof typeof TENANT_MENUS];
    if (!menu) {
      return NextResponse.json(
        { error: 'Menu not found for tenant' },
        { status: 404 }
      );
    }

    // Parse slug to extract tenant and food info
    const parsedSlug = parseSlug(slug);
    
    // Find food item by slug
    const foodItem = menu.find(item => item.slug === slug);
    
    if (!foodItem) {
      return NextResponse.json(
        { error: 'Food item not found' },
        { status: 404 }
      );
    }

    // Verify tenant matches
    if (foodItem.tenantId !== tenantId) {
      return NextResponse.json(
        { error: 'Food item does not belong to this tenant' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: foodItem,
      tenant: tenantId,
      parsedSlug
    });

  } catch (error) {
    console.error('Error fetching food item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 