import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// LINE Message Types
export interface TextMessage {
  type: 'text';
  text: string;
  emojis?: {
    index: number;
    productId: string;
    emojiId: string;
  }[];
}

export interface TemplateMessage {
  type: 'template';
  altText: string;
  template: ButtonsTemplate | CarouselTemplate | ConfirmTemplate;
}

export interface ButtonsTemplate {
  type: 'buttons';
  title?: string;
  text: string;
  thumbnailImageUrl?: string;
  imageAspectRatio?: 'rectangle' | 'square';
  imageSize?: 'cover' | 'contain';
  actions: Action[];
}

export interface CarouselTemplate {
  type: 'carousel';
  columns: CarouselColumn[];
  imageAspectRatio?: 'rectangle' | 'square';
  imageSize?: 'cover' | 'contain';
}

export interface CarouselColumn {
  title?: string;
  text: string;
  thumbnailImageUrl?: string;
  actions: Action[];
}

export interface ConfirmTemplate {
  type: 'confirm';
  text: string;
  actions: Action[];
}

export interface Action {
  type: 'message' | 'postback' | 'uri' | 'datetimepicker';
  label?: string;
  text?: string;
  data?: string;
  uri?: string;
  mode?: string;
  initial?: string;
  max?: string;
  min?: string;
}

export interface FlexMessage {
  type: 'flex';
  altText: string;
  contents: FlexContainer;
}

export interface FlexContainer {
  type: 'bubble' | 'carousel';
  body?: FlexBox;
  header?: FlexBox;
  footer?: FlexBox;
  hero?: FlexComponent;
  styles?: FlexBubbleStyles;
}

export interface FlexBox {
  type: 'box';
  layout: 'vertical' | 'horizontal' | 'baseline';
  contents: FlexComponent[];
  spacing?: string;
  margin?: string;
  paddingAll?: string;
}

export interface FlexComponent {
  type: 'text' | 'button' | 'image' | 'spacer' | 'separator';
  text?: string;
  size?: string;
  color?: string;
  weight?: string;
  action?: Action;
  url?: string;
  aspectRatio?: string;
  aspectMode?: string;
  height?: string;
  margin?: string;
}

export interface FlexBubbleStyles {
  header?: { backgroundColor?: string };
  body?: { backgroundColor?: string };
  footer?: { backgroundColor?: string };
}

export type LineMessage = TextMessage | TemplateMessage | FlexMessage;

// Get restaurant LINE configuration
export async function getRestaurantLineConfig(tenantId: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { slug: tenantId },
    select: {
      lineChannelId: true,
      lineChannelSecret: true,
      lineChannelAccessToken: true,
      name: true,
      primaryColor: true,
    }
  });

  return restaurant;
}

// Send reply message
export async function sendReplyMessage(
  replyToken: string,
  messages: LineMessage[],
  channelAccessToken: string
): Promise<boolean> {
  try {
    const response = await fetch('https://api.line.me/v2/bot/message/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${channelAccessToken}`,
      },
      body: JSON.stringify({
        replyToken,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LINE Reply API Error:', response.status, errorText);
      return false;
    }

    console.log('Reply message sent successfully');
    return true;

  } catch (error) {
    console.error('Failed to send reply message:', error);
    return false;
  }
}

// Send push message
export async function sendPushMessage(
  userId: string,
  messages: LineMessage[],
  channelAccessToken: string
): Promise<boolean> {
  try {
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${channelAccessToken}`,
      },
      body: JSON.stringify({
        to: userId,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LINE Push API Error:', response.status, errorText);
      return false;
    }

    console.log('Push message sent successfully');
    return true;

  } catch (error) {
    console.error('Failed to send push message:', error);
    return false;
  }
}

// Send multicast message (to multiple users)
export async function sendMulticastMessage(
  userIds: string[],
  messages: LineMessage[],
  channelAccessToken: string
): Promise<boolean> {
  try {
    const response = await fetch('https://api.line.me/v2/bot/message/multicast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${channelAccessToken}`,
      },
      body: JSON.stringify({
        to: userIds,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LINE Multicast API Error:', response.status, errorText);
      return false;
    }

    console.log('Multicast message sent successfully');
    return true;

  } catch (error) {
    console.error('Failed to send multicast message:', error);
    return false;
  }
}

// Create order status message
export function createOrderStatusMessage(order: any, tenantId: string): FlexMessage {
  const statusEmoji = {
    'PENDING': '⏳',
    'CONFIRMED': '✅',
    'PREPARING': '👨‍🍳',
    'READY': '🎉',
    'DELIVERING': '🚗',
    'DELIVERED': '✅',
    'CANCELLED': '❌'
  };

  const statusText = {
    'PENDING': 'รอการยืนยัน',
    'CONFIRMED': 'ยืนยันแล้ว',
    'PREPARING': 'กำลังเตรียม',
    'READY': 'พร้อมส่ง',
    'DELIVERING': 'กำลังจัดส่ง',
    'DELIVERED': 'จัดส่งสำเร็จ',
    'CANCELLED': 'ยกเลิกแล้ว'
  };

  return {
    type: 'flex',
    altText: `สถานะออเดอร์ #${order.orderNumber}`,
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `${statusEmoji[order.status as keyof typeof statusEmoji]} สถานะออเดอร์`,
            size: 'lg',
            weight: 'bold',
            color: '#ffffff'
          }
        ]
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `#${order.orderNumber}`,
            size: 'xl',
            weight: 'bold'
          },
          {
            type: 'text',
            text: statusText[order.status as keyof typeof statusText],
            size: 'md',
            color: '#10b981'
          },
          {
            type: 'separator',
            margin: 'md'
          },
          {
            type: 'text',
            text: `ยอดรวม: ฿${order.total}`,
            size: 'md',
            margin: 'md'
          },
          {
            type: 'text',
            text: `วันที่สั่ง: ${new Date(order.createdAt).toLocaleDateString('th-TH')}`,
            size: 'sm',
            color: '#666666'
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'uri',
              label: 'ดูรายละเอียด',
              uri: `https://theredpotion.treetelu.com/order/${order.id}?tenant=${tenantId}`
            }
          }
        ]
      },
      styles: {
        header: { backgroundColor: '#10b981' },
        body: { backgroundColor: '#ffffff' },
        footer: { backgroundColor: '#f8f9fa' }
      }
    }
  };
}

// Create menu carousel message
export function createMenuCarouselMessage(menuItems: any[], tenantId: string): TemplateMessage {
  const columns = menuItems.slice(0, 10).map(item => ({
    title: item.name,
    text: item.description || 'อาหารเพื่อสุขภาพ',
    thumbnailImageUrl: item.image || 'https://theredpotion.treetelu.com/images/default-food.jpg',
    actions: [
      {
        type: 'uri' as const,
        label: `฿${item.price}`,
        uri: `https://theredpotion.treetelu.com/food/detail/${item.slug}?tenant=${tenantId}`
      },
      {
        type: 'postback' as const,
        label: 'เพิ่มในตะกร้า',
        data: `add_to_cart_${item.id}`
      }
    ]
  }));

  return {
    type: 'template',
    altText: 'เมนูอาหาร',
    template: {
      type: 'carousel',
      columns,
      imageAspectRatio: 'rectangle',
      imageSize: 'cover'
    }
  };
}

// Create welcome message
export function createWelcomeMessage(tenantId: string): FlexMessage {
  return {
    type: 'flex',
    altText: 'ยินดีต้อนรับสู่ The Red Potion',
    contents: {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://theredpotion.treetelu.com/images/logo_1_1_bg.png',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover'
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '🎉 ยินดีต้อนรับ!',
            size: 'xl',
            weight: 'bold'
          },
          {
            type: 'text',
            text: 'สั่งอาหารเพื่อสุขภาพได้ง่ายๆ ผ่าน LINE',
            size: 'md',
            margin: 'md'
          },
          {
            type: 'separator',
            margin: 'md'
          },
          {
            type: 'text',
            text: '💬 คำสั่งที่ใช้ได้:',
            size: 'md',
            weight: 'bold',
            margin: 'md'
          },
          {
            type: 'text',
            text: '• "เมนู" - ดูเมนูอาหาร\n• "สถานะ" - ตรวจสอบออเดอร์\n• "ช่วยเหลือ" - ดูคำสั่งทั้งหมด',
            size: 'sm',
            margin: 'sm'
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'uri',
              label: '🍽️ เริ่มสั่งอาหาร',
              uri: `https://theredpotion.treetelu.com?tenant=${tenantId}`
            }
          }
        ]
      },
      styles: {
        body: { backgroundColor: '#ffffff' },
        footer: { backgroundColor: '#f8f9fa' }
      }
    }
  };
}

// Send order notification to customer
export async function sendOrderNotification(
  orderId: string,
  status: string,
  tenantId: string
): Promise<boolean> {
  try {
    // Get order details
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        orderItems: {
          include: {
            menuItem: true
          }
        }
      }
    });

    if (!order || !order.customer.lineId) {
      console.log('Order not found or customer has no LINE ID');
      return false;
    }

    // Get restaurant LINE config
    const restaurant = await getRestaurantLineConfig(tenantId);
    if (!restaurant?.lineChannelAccessToken) {
      console.log('Restaurant LINE config not found');
      return false;
    }

    // Create status message
    const message = createOrderStatusMessage(order, tenantId);

    // Send push message
    return await sendPushMessage(
      order.customer.lineId,
      [message],
      restaurant.lineChannelAccessToken
    );

  } catch (error) {
    console.error('Failed to send order notification:', error);
    return false;
  }
}

// Send promotional message
export async function sendPromotionalMessage(
  tenantId: string,
  userIds: string[],
  message: LineMessage
): Promise<boolean> {
  try {
    const restaurant = await getRestaurantLineConfig(tenantId);
    if (!restaurant?.lineChannelAccessToken) {
      console.log('Restaurant LINE config not found');
      return false;
    }

    return await sendMulticastMessage(
      userIds,
      [message],
      restaurant.lineChannelAccessToken
    );

  } catch (error) {
    console.error('Failed to send promotional message:', error);
    return false;
  }
}

export default {
  sendReplyMessage,
  sendPushMessage,
  sendMulticastMessage,
  createOrderStatusMessage,
  createMenuCarouselMessage,
  createWelcomeMessage,
  sendOrderNotification,
  sendPromotionalMessage,
  getRestaurantLineConfig,
}; 