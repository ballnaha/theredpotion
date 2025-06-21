// Tenant-aware Payment System

import { getTenantConfig, detectTenant } from './tenant';

export interface PaymentConfig {
  merchantId: string;
  publicKey: string;
  secretKey?: string; // Only for server-side
  webhookUrl: string;
  supportedMethods: string[];
  currency: string;
  environment: 'sandbox' | 'production';
}

export interface OrderData {
  orderId: string;
  tenantId: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    addOns?: { [key: string]: boolean };
  }>;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  discount: number;
  total: number;
  customerInfo: {
    lineUserId?: string;
    name: string;
    phone: string;
    address: string;
  };
}

// Payment configurations for each tenant
const PAYMENT_CONFIGS: { [tenantId: string]: PaymentConfig } = {
  restaurant1: {
    merchantId: 'MERCHANT_GREEN_GARDEN',
    publicKey: 'pk_green_garden_12345',
    secretKey: 'sk_green_garden_12345', // Server-side only
    webhookUrl: 'https://restaurant1.theredpotion.com/api/webhook/payment',
    supportedMethods: ['credit_card', 'promptpay', 'truemoney'],
    currency: 'THB',
    environment: 'sandbox'
  },
  restaurant2: {
    merchantId: 'MERCHANT_ZEN_TREATS',
    publicKey: 'pk_zen_treats_67890',
    secretKey: 'sk_zen_treats_67890',
    webhookUrl: 'https://restaurant2.theredpotion.com/api/webhook/payment',
    supportedMethods: ['credit_card', 'promptpay', 'shopeepay'],
    currency: 'THB',
    environment: 'sandbox'
  },
  restaurant3: {
    merchantId: 'MERCHANT_FRESH_BOWL',
    publicKey: 'pk_fresh_bowl_abcde',
    secretKey: 'sk_fresh_bowl_abcde',
    webhookUrl: 'https://restaurant3.theredpotion.com/api/webhook/payment',
    supportedMethods: ['credit_card', 'promptpay', 'linepay'],
    currency: 'THB',
    environment: 'sandbox'
  }
};

// Get payment configuration for current tenant
export const getTenantPaymentConfig = (tenantId?: string): PaymentConfig | null => {
  const tenant = tenantId || detectTenant();
  if (!tenant) return null;
  
  return PAYMENT_CONFIGS[tenant] || null;
};

// Generate tenant-specific order ID
export const generateTenantOrderId = (tenantId?: string): string => {
  const tenant = tenantId || detectTenant();
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const timeStr = now.getTime().toString().slice(-6);
  
  const prefixes: { [key: string]: string } = {
    restaurant1: 'GG',  // Green Garden
    restaurant2: 'ZT',  // Zen Treats
    restaurant3: 'FB'   // Fresh Bowl
  };
  
  const prefix = prefixes[tenant || 'default'] || 'TRP';
  return `${prefix}-${dateStr}-${timeStr}`;
};

// Calculate tenant-specific fees
export const calculateTenantFees = (subtotal: number, tenantId?: string) => {
  const tenantConfig = getTenantConfig(tenantId);
  if (!tenantConfig) {
    return {
      deliveryFee: 39,
      serviceFee: 0,
      discount: 0,
      freeDeliveryThreshold: 200
    };
  }
  
  const { settings } = tenantConfig;
  const deliveryFee = subtotal >= settings.freeDeliveryThreshold ? 0 : settings.deliveryFee;
  const serviceFee = Math.round(subtotal * settings.serviceFeeRate);
  
  return {
    deliveryFee,
    serviceFee,
    discount: 0, // Can be enhanced with promotion logic
    freeDeliveryThreshold: settings.freeDeliveryThreshold
  };
};

// Create payment intent for specific tenant
export const createTenantPaymentIntent = async (orderData: OrderData) => {
  const paymentConfig = getTenantPaymentConfig(orderData.tenantId);
  if (!paymentConfig) {
    throw new Error('Payment configuration not found for tenant');
  }
  
  try {
    const response = await fetch(`/api/tenant/${orderData.tenantId}/payment/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: orderData.orderId,
        amount: orderData.total,
        currency: paymentConfig.currency,
        merchantId: paymentConfig.merchantId,
        webhookUrl: paymentConfig.webhookUrl,
        metadata: {
          tenantId: orderData.tenantId,
          customerInfo: orderData.customerInfo,
          items: orderData.items
        }
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Process tenant-specific payment
export const processTenantPayment = async (
  paymentMethod: string,
  paymentData: any,
  orderData: OrderData
) => {
  const paymentConfig = getTenantPaymentConfig(orderData.tenantId);
  if (!paymentConfig) {
    throw new Error('Payment configuration not found for tenant');
  }
  
  // Validate payment method is supported
  if (!paymentConfig.supportedMethods.includes(paymentMethod)) {
    throw new Error(`Payment method ${paymentMethod} is not supported for this restaurant`);
  }
  
  try {
    const response = await fetch(`/api/tenant/${orderData.tenantId}/payment/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethod,
        paymentData,
        orderData,
        merchantId: paymentConfig.merchantId
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Payment processing failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

// Get payment status for tenant order
export const getTenantPaymentStatus = async (orderId: string, tenantId?: string) => {
  const tenant = tenantId || detectTenant();
  if (!tenant) {
    throw new Error('Tenant not detected');
  }
  
  try {
    const response = await fetch(`/api/tenant/${tenant}/payment/status/${orderId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get payment status');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};

// Validate payment webhook for tenant
export const validateTenantWebhook = (
  webhookData: any,
  signature: string,
  tenantId: string
): boolean => {
  const paymentConfig = getTenantPaymentConfig(tenantId);
  if (!paymentConfig || !paymentConfig.secretKey) {
    return false;
  }
  
  // Implement signature validation logic here
  // This is a simplified version - use proper crypto verification
  const expectedSignature = generateWebhookSignature(webhookData, paymentConfig.secretKey);
  return signature === expectedSignature;
};

// Generate webhook signature (simplified)
const generateWebhookSignature = (data: any, secretKey: string): string => {
  // In real implementation, use proper HMAC-SHA256
  const crypto = require('crypto');
  const payload = JSON.stringify(data);
  return crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
};

// Get supported payment methods for tenant
export const getTenantPaymentMethods = (tenantId?: string) => {
  const paymentConfig = getTenantPaymentConfig(tenantId);
  if (!paymentConfig) {
    return ['credit_card']; // Default fallback
  }
  
  return paymentConfig.supportedMethods;
};

// Format payment method display name
export const getPaymentMethodDisplayName = (method: string): string => {
  const displayNames: { [key: string]: string } = {
    'credit_card': '💳 บัตรเครดิต/เดบิต',
    'promptpay': '📱 พร้อมเพย์',
    'truemoney': '💰 TrueMoney Wallet',
    'shopeepay': '🛒 ShopeePay',
    'linepay': '💚 LINE Pay',
    'bank_transfer': '🏦 โอนเงินผ่านธนาคาร'
  };
  
  return displayNames[method] || method;
};

// Check if payment method requires additional verification
export const requiresAdditionalVerification = (method: string): boolean => {
  const verificationRequired = ['credit_card', 'bank_transfer'];
  return verificationRequired.includes(method);
};

// Get payment processing fee for tenant
export const getTenantPaymentFee = (method: string, amount: number, tenantId?: string): number => {
  // Different tenants might have different payment processing fees
  const tenant = tenantId || detectTenant();
  
  const feeStructure: { [tenantId: string]: { [method: string]: number } } = {
    restaurant1: {
      'credit_card': amount * 0.029, // 2.9%
      'promptpay': 0, // Free
      'truemoney': amount * 0.015 // 1.5%
    },
    restaurant2: {
      'credit_card': amount * 0.032, // 3.2%
      'promptpay': 0, // Free
      'shopeepay': amount * 0.018 // 1.8%
    },
    restaurant3: {
      'credit_card': amount * 0.025, // 2.5%
      'promptpay': 0, // Free
      'linepay': amount * 0.020 // 2.0%
    }
  };
  
  if (!tenant || !feeStructure[tenant] || !feeStructure[tenant][method]) {
    return 0;
  }
  
  return Math.round(feeStructure[tenant][method]);
};

// Export order data for tenant analytics
export const exportTenantOrderData = (orderData: OrderData) => {
  return {
    ...orderData,
    tenantInfo: getTenantConfig(orderData.tenantId),
    paymentConfig: getTenantPaymentConfig(orderData.tenantId),
    exportedAt: new Date().toISOString()
  };
}; 