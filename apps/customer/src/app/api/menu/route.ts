import { NextResponse } from 'next/server';

// Professional healthy food menu data with real images
const mockMenuItems = [
  {
    id: 'cm001',
    slug: 'organic-quinoa-bowl',
    name: 'โบวล์ควินัวออร์แกนิก',
    description: 'ควินัวสีแดงอินทรีย์ อะโวคาโดสดสไลซ์ ผักโขมอ่อน เพอโรนิค่า เมล็ดซันฟลาวเวอร์ ราดด้วยน้ำสลัดมะนาวผสมเฮมป์ออยล์',
    originalPrice: 350.00,
    price: 285.00,
    discountPercent: 19,
    imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop&crop=center',
    emoji: '🥗',
    calories: 420,
    preparationTime: 15,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 156,
    nutritionalInfo: {
      protein: '14g',
      carbs: '32g',
      fat: '18g',
      fiber: '8g'
    },
    ingredients: ['ควินัวแดงอินทรีย์', 'อะโวคาโดเฮส', 'ผักโขมเบบี้', 'เมล็ดซันฟลาวเวอร์', 'น้ำสลัดเฮมป์ออยล์'],
    allergens: ['ถั่ว'],
    isVegan: true,
    isGlutenFree: true,
    category: {
      id: 'cat001',
      name: 'Superfood Bowls'
    },
    restaurant: {
      id: 'rest001',
      name: 'Green Garden Organic',
      logo: '🌱',
      rating: 4.9,
      deliveryTime: '25-30 นาที'
    }
  },
  {
    id: 'cm002',
    slug: 'premium-acai-bowl',
    name: 'อาซาอิโบวล์พรีเมี่ยม',
    description: 'อาซาอิเบอรี่แท้จากบราซิล ผสมกล้วยโฮมสดแช่แข็ง โรยด้วยโกรนลาฮาร์ดเมด บลูเบอรี่สด สตรอเบอรี่ กีวีฟรุต กะลามะพร้าวคั่ว',
    originalPrice: 295.00,
    price: 245.00,
    discountPercent: 17,
    imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop&crop=center',
    emoji: '🍓',
    calories: 310,
    preparationTime: 8,
    isAvailable: true,
    rating: 4.9,
    reviewCount: 203,
    nutritionalInfo: {
      protein: '8g',
      carbs: '45g',
      fat: '12g',
      fiber: '11g'
    },
    ingredients: ['อาซาอิเบอรี่แท้', 'กล้วยโฮมแช่แข็ง', 'โกรนลาฮาร์ดเมด', 'บลูเบอรี่สด', 'กะลามะพร้าว'],
    allergens: ['ถั่ว', 'ธัญพืช'],
    isVegan: true,
    isGlutenFree: false,
    category: {
      id: 'cat002',
      name: 'Superfruit Bowls'
    },
    restaurant: {
      id: 'rest002',
      name: 'Amazon Açaí House',
      logo: '🍓',
      rating: 4.8,
      deliveryTime: '15-20 นาที'
    }
  },
  {
    id: 'cm003',
    slug: 'teriyaki-salmon-vegetables',
    name: 'แซลมอนเทริยากิพร้อมผัก',
    description: 'แซลมอนนอร์เวย์เกรดพรีเมี่ยม หมักซอสเทริยากิโฮมเมด เสิร์ฟพร้อมบรอกโคลี่อบ แครอทเบบี้ ข้าวไรซ์เบอรี่ หน่อไผ่ญี่ปุ่น',
    originalPrice: 590.00,
    price: 485.00,
    discountPercent: 18,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop&crop=center',
    emoji: '🍣',
    calories: 380,
    preparationTime: 22,
    isAvailable: true,
    rating: 4.7,
    reviewCount: 89,
    nutritionalInfo: {
      protein: '32g',
      carbs: '28g',
      fat: '16g',
      fiber: '6g'
    },
    ingredients: ['แซลมอนนอร์เวย์', 'ซอสเทริยากิโฮมเมด', 'บรอกโคลี่', 'ข้าวไรซ์เบอรี่', 'หน่อไผ่'],
    allergens: ['ปลา', 'ข้าวโพด', 'ซอย'],
    isVegan: false,
    isGlutenFree: false,
    category: {
      id: 'cat003',
      name: 'Premium Protein'
    },
    restaurant: {
      id: 'rest003',
      name: 'Ocean Kitchen',
      logo: '🐟',
      rating: 4.8,
      deliveryTime: '30-35 นาที'
    }
  },
  {
    id: 'cm004',
    slug: 'green-detox-smoothie',
    name: 'กรีนดีท็อกซ์สมูธี่',
    description: 'เครื่องดื่มล้างพิษ ผสมผักเคลคัดพิเศษ คื่นช่าย แอปเปิ้ลเขียว แตงกวาอินทรีย์ มะนาวสด ขิงแก่ สไปรูลิน่า',
    originalPrice: 155.00,
    price: 125.00,
    discountPercent: 19,
    imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&h=600&fit=crop&crop=center',
    emoji: '🥬',
    calories: 85,
    preparationTime: 5,
    isAvailable: true,
    rating: 4.6,
    reviewCount: 142,
    nutritionalInfo: {
      protein: '4g',
      carbs: '18g',
      fat: '1g',
      fiber: '5g'
    },
    ingredients: ['ผักเคลออร์แกนิก', 'คื่นช่าย', 'แอปเปิ้ลเขียว', 'สไปรูลิน่า', 'ขิงแก่'],
    allergens: [],
    isVegan: true,
    isGlutenFree: true,
    category: {
      id: 'cat004',
      name: 'Detox Drinks'
    },
    restaurant: {
      id: 'rest004',
      name: 'Pure Wellness Bar',
      logo: '💚',
      rating: 4.7,
      deliveryTime: '10-15 นาที'
    }
  },
  {
    id: 'cm005',
    slug: 'lavender-chia-pudding',
    name: 'เชียพุดดิ้งลัเวนเดอร์',
    description: 'เมล็ดเชียชั้นเยี่ยม แช่นมอัลมอนด์ ผสมน้ำผึ้งมานูกา กลีบลัเวนเดอร์อบแห้ง โรยด้วยบลูเบอรี่สด ฟลอสมิ๊กซ์ เกล็ดมะพร้าว',
    originalPrice: 220.00,
    price: 185.00,
    discountPercent: 16,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
    emoji: '🥥',
    calories: 220,
    preparationTime: 3,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 97,
    nutritionalInfo: {
      protein: '6g',
      carbs: '24g',
      fat: '11g',
      fiber: '8g'
    },
    ingredients: ['เมล็ดเชียออร์แกนิก', 'นมอัลมอนด์', 'น้ำผึ้งมานูกา', 'ลัเวนเดอร์', 'บลูเบอรี่สด'],
    allergens: ['ถั่ว'],
    isVegan: true,
    isGlutenFree: true,
    category: {
      id: 'cat005',
      name: 'Healthy Desserts'
    },
    restaurant: {
      id: 'rest005',
      name: 'Zen Healthy Treats',
      logo: '🌸',
      rating: 4.9,
      deliveryTime: '15-20 นาที'
    }
  },
  {
    id: 'cm006',
    slug: 'premium-avocado-toast',
    name: 'อะโวคาโดโทสต์พรีเมี่ยม',
    description: 'ขนมปังซาวร์โดเซเกิร์ด เนื้อแท้ 100% โรยด้วยอะโวคาโดเฮสแมช เพิ่มไข่ดาวออร์แกนิก เมล็ดเซีย เกล็ดพริกแดง ปรุงรสเกลือหิมาลัย',
    originalPrice: 275.00,
    price: 225.00,
    discountPercent: 18,
    imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&h=600&fit=crop&crop=center',
    emoji: '🥑',
    calories: 340,
    preparationTime: 10,
    isAvailable: true,
    rating: 4.7,
    reviewCount: 134,
    nutritionalInfo: {
      protein: '14g',
      carbs: '26g',
      fat: '22g',
      fiber: '12g'
    },
    ingredients: ['ขนมปังซาวร์โด', 'อะโวคาโดเฮส', 'ไข่ออร์แกนิก', 'เมล็ดเซีย', 'เกลือหิมาลัย'],
    allergens: ['ธัญพืช', 'ไข่'],
    isVegan: false,
    isGlutenFree: false,
    category: {
      id: 'cat006',
      name: 'Artisan Toasts'
    },
    restaurant: {
      id: 'rest006',
      name: 'Morning Craft Kitchen',
      logo: '🍞',
      rating: 4.6,
      deliveryTime: '20-25 นาที'
    }
  },
  {
    id: 'cm007',
    name: 'สลัดไก่ออร์แกนิกเมดิเตอร์เรเนียน',
    description: 'อกไก่ออร์แกนิกย่างเครื่องเทศ เสิร์ฟพร้อมผักสลัดผสม มะเขือเทศเชอรี่ ชีสเฟต้า โอลีฟคาลามาต้า ซอสโยเกิร์ตกรีกโฮมเมด',
    originalPrice: 320.00,
    price: 265.00,
    discountPercent: 17,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop&crop=center',
    emoji: '🥙',
    calories: 285,
    preparationTime: 18,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 178,
    nutritionalInfo: {
      protein: '28g',
      carbs: '12g',
      fat: '16g',
      fiber: '4g'
    },
    ingredients: ['อกไก่ออร์แกนิก', 'ผักสลัดผสม', 'ชีสเฟต้า', 'โอลีฟคาลามาต้า', 'ซอสโยเกิร์ตกรีก'],
    allergens: ['นม'],
    isVegan: false,
    isGlutenFree: true,
    category: {
      id: 'cat007',
      name: 'Power Salads'
    },
    restaurant: {
      id: 'rest007',
      name: 'Mediterranean Garden',
      logo: '🫒',
      rating: 4.7,
      deliveryTime: '25-30 นาที'
    }
  },
  {
    id: 'cm008',
    name: 'ทูเมอริกลาเต้ทองคำ',
    description: 'เครื่องดื่มเพื่อสุขภาพ ผสมขมิ้นชันแท้ นมมะพร้าวครีมมี่ ขิงสด ผงอบเชย น้ำผึ้งป่าแท้ กะทิสกัดเย็น เพิ่มกิมป์แห่งพลัง',
    originalPrice: 115.00,
    price: 95.00,
    discountPercent: 17,
    imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&h=600&fit=crop&crop=center',
    emoji: '🧡',
    calories: 95,
    preparationTime: 6,
    isAvailable: true,
    rating: 4.5,
    reviewCount: 156,
    nutritionalInfo: {
      protein: '2g',
      carbs: '15g',
      fat: '4g',
      fiber: '1g'
    },
    ingredients: ['ขมิ้นชันแท้', 'นมมะพร้าว', 'ขิงสด', 'ผงอบเชย', 'น้ำผึ้งป่า'],
    allergens: [],
    isVegan: true,
    isGlutenFree: true,
    category: {
      id: 'cat008',
      name: 'Wellness Drinks'
    },
    restaurant: {
      id: 'rest008',
      name: 'Golden Spice Café',
      logo: '✨',
      rating: 4.6,
      deliveryTime: '15-20 นาที'
    }
  }
];

export async function GET() {
  try {
    // จำลองการดึงข้อมูลจาก database (เพิ่ม delay เล็กน้อย)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const menuItems = mockMenuItems.filter(item => item.isAvailable);

    return NextResponse.json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch menu items',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 