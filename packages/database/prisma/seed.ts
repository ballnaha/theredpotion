import { PrismaClient, UserRole, RestaurantStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create Super Admin
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@theredpotion.com' },
    update: {},
    create: {
      email: 'admin@theredpotion.com',
      password: adminPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: UserRole.SUPER_ADMIN,
    },
  });
  console.log('✅ Created Super Admin:', admin.email);

  // Create Sample Restaurants
  const restaurants = [
    {
      name: 'Pizza Palace',
      slug: 'pizza-palace',
      description: 'Authentic Italian pizzas with fresh ingredients',
      address: '123 Food Street, Bangkok',
      city: 'Bangkok',
      state: 'Bangkok',
      zipCode: '10110',
      latitude: 13.7563,
      longitude: 100.5018,
      phone: '+66-2-123-4567',
      email: 'info@pizzapalace.com',
      primaryColor: '#E53E3E',
      secondaryColor: '#C53030',
      status: RestaurantStatus.APPROVED,
    },
    {
      name: 'Burger Bros',
      slug: 'burger-bros',
      description: 'Premium burgers and sides',
      address: '456 Burger Ave, Bangkok',
      city: 'Bangkok',
      state: 'Bangkok',
      zipCode: '10110',
      latitude: 13.7500,
      longitude: 100.4900,
      phone: '+66-2-987-6543',
      email: 'hello@burgerbros.com',
      primaryColor: '#D69E2E',
      secondaryColor: '#B7791F',
      status: RestaurantStatus.APPROVED,
    },
    {
      name: 'Sushi Zen',
      slug: 'sushi-zen',
      description: 'Fresh sushi and Japanese cuisine',
      address: '789 Japan Street, Bangkok',
      city: 'Bangkok',
      state: 'Bangkok',
      zipCode: '10110',
      latitude: 13.7400,
      longitude: 100.5100,
      phone: '+66-2-555-0123',
      email: 'contact@sushizen.com',
      primaryColor: '#3182CE',
      secondaryColor: '#2C5282',
      status: RestaurantStatus.APPROVED,
    },
  ];

  const createdRestaurants = [];
  for (const restaurantData of restaurants) {
    const restaurant = await prisma.restaurant.upsert({
      where: { slug: restaurantData.slug },
      update: {},
      create: restaurantData,
    });
    createdRestaurants.push(restaurant);
    console.log('✅ Created Restaurant:', restaurant.name);
  }

  // Create Restaurant Owners
  for (const restaurant of createdRestaurants) {
    const ownerPassword = await bcrypt.hash('owner123', 12);
    const owner = await prisma.user.upsert({
      where: { email: `owner@${restaurant.slug}.com` },
      update: {},
      create: {
        email: `owner@${restaurant.slug}.com`,
        password: ownerPassword,
        firstName: 'Restaurant',
        lastName: 'Owner',
        role: UserRole.RESTAURANT_OWNER,
      },
    });

    // Link owner to restaurant
    await prisma.restaurantUser.upsert({
      where: {
        userId_restaurantId: {
          userId: owner.id,
          restaurantId: restaurant.id,
        },
      },
      update: {},
      create: {
        userId: owner.id,
        restaurantId: restaurant.id,
        role: 'OWNER',
      },
    });

    console.log('✅ Created Restaurant Owner:', owner.email);
  }

  // Create Categories and Menu Items
  for (const restaurant of createdRestaurants) {
    let categories = [];
    
    if (restaurant.name === 'Pizza Palace') {
      categories = [
        { name: 'Pizzas', description: 'Delicious wood-fired pizzas' },
        { name: 'Appetizers', description: 'Start your meal right' },
        { name: 'Desserts', description: 'Sweet endings' },
      ];
    } else if (restaurant.name === 'Burger Bros') {
      categories = [
        { name: 'Burgers', description: 'Premium beef burgers' },
        { name: 'Sides', description: 'Crispy sides and more' },
        { name: 'Beverages', description: 'Refreshing drinks' },
      ];
    } else if (restaurant.name === 'Sushi Zen') {
      categories = [
        { name: 'Sushi', description: 'Fresh sushi selections' },
        { name: 'Sashimi', description: 'Premium sashimi cuts' },
        { name: 'Rolls', description: 'Specialty rolls' },
      ];
    }

    for (let i = 0; i < categories.length; i++) {
      const category = await prisma.category.create({
        data: {
          ...categories[i],
          restaurantId: restaurant.id,
          sortOrder: i,
        },
      });

      // Create menu items for each category
      const menuItems = getMenuItems(restaurant.name, category.name);
      for (const itemData of menuItems) {
        await prisma.menuItem.create({
          data: {
            ...itemData,
            restaurantId: restaurant.id,
            categoryId: category.id,
          },
        });
      }
      
      console.log(`✅ Created Category "${category.name}" with menu items for ${restaurant.name}`);
    }
  }

  // Create Sample Customers
  const customerPassword = await bcrypt.hash('customer123', 12);
  const customers = [
    {
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+66-81-123-4567',
    },
    {
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+66-81-987-6543',
    },
  ];

  for (const customerData of customers) {
    const customer = await prisma.user.upsert({
      where: { email: customerData.email },
      update: {},
      create: {
        ...customerData,
        password: customerPassword,
        role: UserRole.CUSTOMER,
      },
    });
    console.log('✅ Created Customer:', customer.email);
  }

  // Create Sample Riders
  const riderPassword = await bcrypt.hash('rider123', 12);
  const riders = [
    {
      email: 'rider1@theredpotion.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      phone: '+66-81-555-1111',
    },
    {
      email: 'rider2@theredpotion.com',
      firstName: 'Sarah',
      lastName: 'Wilson',
      phone: '+66-81-555-2222',
    },
  ];

  for (const riderData of riders) {
    const user = await prisma.user.upsert({
      where: { email: riderData.email },
      update: {},
      create: {
        ...riderData,
        password: riderPassword,
        role: UserRole.RIDER,
      },
    });

    await prisma.rider.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        vehicleType: 'MOTORCYCLE',
        licensePlate: `ABC-${Math.floor(Math.random() * 1000)}`,
        verificationStatus: 'APPROVED',
        verifiedAt: new Date(),
      },
    });

    console.log('✅ Created Rider:', user.email);
  }

  console.log('🎉 Database seeding completed successfully!');
}

function getMenuItems(restaurantName: string, categoryName: string) {
  if (restaurantName === 'Pizza Palace') {
    if (categoryName === 'Pizzas') {
      return [
        { name: 'Margherita', description: 'Classic tomato, mozzarella, basil', price: 350, calories: 280 },
        { name: 'Pepperoni', description: 'Pepperoni with mozzarella cheese', price: 420, calories: 320 },
        { name: 'Hawaiian', description: 'Ham, pineapple, mozzarella', price: 450, calories: 300 },
      ];
    } else if (categoryName === 'Appetizers') {
      return [
        { name: 'Garlic Bread', description: 'Crispy bread with garlic butter', price: 120, calories: 180 },
        { name: 'Bruschetta', description: 'Toasted bread with fresh tomatoes', price: 150, calories: 120 },
      ];
    } else if (categoryName === 'Desserts') {
      return [
        { name: 'Tiramisu', description: 'Classic Italian dessert', price: 180, calories: 450 },
      ];
    }
  } else if (restaurantName === 'Burger Bros') {
    if (categoryName === 'Burgers') {
      return [
        { name: 'Classic Beef', description: 'Angus beef patty with fresh vegetables', price: 280, calories: 520 },
        { name: 'Cheese Deluxe', description: 'Double cheese with bacon', price: 350, calories: 680 },
        { name: 'Chicken Supreme', description: 'Grilled chicken breast burger', price: 320, calories: 480 },
      ];
    } else if (categoryName === 'Sides') {
      return [
        { name: 'French Fries', description: 'Crispy golden fries', price: 80, calories: 320 },
        { name: 'Onion Rings', description: 'Beer-battered onion rings', price: 90, calories: 280 },
      ];
    } else if (categoryName === 'Beverages') {
      return [
        { name: 'Coca Cola', description: 'Classic soft drink', price: 40, calories: 140 },
        { name: 'Fresh Orange Juice', description: '100% fresh squeezed', price: 60, calories: 110 },
      ];
    }
  } else if (restaurantName === 'Sushi Zen') {
    if (categoryName === 'Sushi') {
      return [
        { name: 'Salmon Nigiri', description: 'Fresh Atlantic salmon', price: 120, calories: 60 },
        { name: 'Tuna Nigiri', description: 'Premium bluefin tuna', price: 150, calories: 55 },
        { name: 'Eel Nigiri', description: 'Grilled eel with sweet sauce', price: 140, calories: 80 },
      ];
    } else if (categoryName === 'Sashimi') {
      return [
        { name: 'Salmon Sashimi', description: '6 pieces of fresh salmon', price: 280, calories: 180 },
        { name: 'Tuna Sashimi', description: '6 pieces of premium tuna', price: 320, calories: 165 },
      ];
    } else if (categoryName === 'Rolls') {
      return [
        { name: 'California Roll', description: 'Crab, avocado, cucumber', price: 240, calories: 320 },
        { name: 'Spicy Tuna Roll', description: 'Spicy tuna with sriracha mayo', price: 280, calories: 290 },
      ];
    }
  }
  
  return [];
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 