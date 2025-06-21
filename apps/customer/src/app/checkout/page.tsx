'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Alert,
  Chip,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from '@mui/material';
import {
  ArrowLeft,
  MapPin,
  Clock,
  CreditCard,
  Wallet,
  Plus,
  Edit,
  CheckCircle,
  Receipt,
  Home,
  Building,
  Banknote,
  Smartphone,
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useTenant, useTenantSettings } from '../contexts/TenantContext';
import { 
  generateTenantOrderId, 
  calculateTenantFees, 
  getTenantPaymentMethods,
  getPaymentMethodDisplayName,
  createTenantPaymentIntent,
  processTenantPayment,
  OrderData
} from '../utils/payment';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    getCartItems,
    calculateTotalPrice,
    cartCount,
    isLoaded,
  } = useCart();
  const { tenant, tenantId } = useTenant();
  const { brandName, deliveryFee: defaultDeliveryFee, freeDeliveryThreshold } = useTenantSettings();

  // States
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedPayment, setSelectedPayment] = useState('promptpay');
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('asap');
  const [orderNotes, setOrderNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data - ในอนาคตจะดึงจากฐานข้อมูล
  const addresses = [
    {
      id: 'home',
      type: 'บ้าน',
      name: 'บ้าน',
      address: '123/45 ซอยสุขุมวิท 21, คลองเตยเหนือ, วัฒนา, กรุงเทพฯ 10110',
      phone: '081-234-5678',
      icon: Home
    },
    {
      id: 'office',
      type: 'ออฟฟิศ',
      name: 'ออฟฟิศ',
      address: '456/78 อาคารสาธรซิตี้ทาวเวอร์, ถนนสาธร, สีลม, บางรัก, กรุงเทพฯ 10500',
      phone: '02-234-5678',
      icon: Building
    }
  ];

  // Get tenant-specific payment methods
  const tenantPaymentMethods = getTenantPaymentMethods(tenantId || undefined);
  
  const paymentMethods = [
    {
      id: 'promptpay',
      name: 'PromptPay',
      description: 'ชำระผ่าน QR Code',
      icon: Smartphone,
      color: '#1976d2'
    },
    {
      id: 'cash',
      name: 'เงินสด',
      description: 'ชำระเมื่อได้รับสินค้า',
      icon: Banknote,
      color: '#10b981'
    },
    {
      id: 'credit_card',
      name: 'บัตรเครดิต/เดบิต',
      description: 'Visa, Mastercard',
      icon: CreditCard,
      color: '#7c3aed'
    },
    {
      id: 'truemoney',
      name: 'TrueMoney Wallet',
      description: 'ชำระผ่าน Wallet',
      icon: Wallet,
      color: '#f59e0b'
    }
  ].filter(method => tenantPaymentMethods.includes(method.id) || method.id === 'cash');

  const deliveryTimes = [
    { id: 'asap', label: 'เร็วที่สุด (30-45 นาที)', time: 'ตอนนี้' },
    { id: '1hour', label: '1 ชั่วโมง', time: '14:00-14:30' },
    { id: '2hour', label: '2 ชั่วโมง', time: '15:00-15:30' },
    { id: 'evening', label: 'ช่วงเย็น', time: '18:00-19:00' }
  ];

  const cartItems = getCartItems();
  const totalPrice = calculateTotalPrice();
  
  // Use tenant-specific fee calculation
  const fees = calculateTenantFees(totalPrice, tenantId || undefined);
  const deliveryFee = fees.deliveryFee;
  const serviceFee = fees.serviceFee;
  const finalTotal = totalPrice + deliveryFee + serviceFee;

  // Add-on name mapping (same as cart)
  const addOnNames: { [key: string]: string } = {
    '1': 'ชีสเฟต้าเพิ่ม',
    '2': 'อะโวคาโด',
    '3': 'มะกอกดำ',
    '4': 'อัลมอนด์แผ่น',
    '5': 'เมล็ดทานตะวัน',
    '6': 'น้ำสลัดบัลซามิค'
  };

  const getAddOnDisplayName = (addOnId: string) => {
    return addOnNames[addOnId] || addOnId.replace(/-/g, ' ');
  };

  const calculateItemTotalPrice = (item: any) => {
    const addOnPrices: { [key: string]: number } = {
      '1': 45, '2': 60, '3': 35, '4': 40, '5': 25, '6': 30
    };

    let total = item.basePrice * item.quantity;
    
    if (item.addOns) {
      Object.keys(item.addOns).forEach(addOnId => {
        if (item.addOns[addOnId] && addOnPrices[addOnId]) {
          total += addOnPrices[addOnId] * item.quantity;
        }
      });
    }
    
    return total;
  };

  const handlePlaceOrder = async () => {
    if (!tenantId) {
      alert('ไม่สามารถระบุร้านค้าได้ กรุณาลองใหม่อีกครั้ง');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Generate tenant-specific order ID
      const orderId = generateTenantOrderId(tenantId);
      
      // Prepare order data
      const orderData: OrderData = {
        orderId,
        tenantId,
        items: cartItems.map(item => ({
          productId: item.productId,
          name: item.itemName,
          quantity: item.quantity,
          price: item.basePrice,
          addOns: item.addOns
        })),
        subtotal: totalPrice,
        deliveryFee,
        serviceFee,
        discount: 0,
        total: finalTotal,
        customerInfo: {
          name: 'ลูกค้า', // Should get from user profile
          phone: addresses.find(a => a.id === selectedAddress)?.phone || '',
          address: addresses.find(a => a.id === selectedAddress)?.address || ''
        }
      };

      // Create payment intent (for non-cash payments)
      if (selectedPayment !== 'cash') {
        const paymentIntent = await createTenantPaymentIntent(orderData);
        console.log('Payment intent created:', paymentIntent);
        
        // Process payment
        const paymentResult = await processTenantPayment(
          selectedPayment,
          { paymentIntentId: paymentIntent.id },
          orderData
        );
        
        console.log('Payment processed:', paymentResult);
      }
      
      // Clear cart after successful order
      // clearCart(); // Uncomment when ready
      
      // Navigate to order success page
      router.push(`/order-success?orderId=${orderId}&tenant=${tenantId}`);
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsProcessing(false);
    }
  };

  // Show loading while cart data is being loaded
  if (!isLoaded) {
    return (
      <Box sx={{ 
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `
          linear-gradient(135deg, 
            rgba(16, 185, 129, 0.08) 0%, 
            rgba(5, 150, 105, 0.05) 25%,
            rgba(52, 211, 153, 0.03) 50%,
            rgba(255, 255, 255, 0.95) 75%,
            rgba(248, 250, 252, 1) 100%
          )
        `
      }}>
        <CircularProgress size={60} sx={{ color: '#10b981' }} />
      </Box>
    );
  }

  // Redirect to cart if empty
  if (cartItems.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: `
        linear-gradient(135deg, 
          rgba(16, 185, 129, 0.08) 0%, 
          rgba(5, 150, 105, 0.05) 25%,
          rgba(52, 211, 153, 0.03) 50%,
          rgba(255, 255, 255, 0.95) 75%,
          rgba(248, 250, 252, 1) 100%
        )
      `
    }}>
      {/* Header */}
      <Box sx={{ 
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          py: 1.5,
          px: 1
        }}>
          <IconButton 
            onClick={() => router.back()}
            sx={{ 
              background: 'rgba(16, 185, 129, 0.1)',
              '&:hover': { background: 'rgba(16, 185, 129, 0.2)' },
              mr: 2
            }}
          >
            <ArrowLeft color="#10b981" />
          </IconButton>
          
          <Typography variant="h6" sx={{ 
            fontWeight: 700, 
            color: '#0f172a'
          }}>
            ยืนยันคำสั่งซื้อ - {brandName}
          </Typography>
        </Box>

        {/* Progress Stepper */}
        <Box sx={{ px: 1, pb: 1 }}>
          <Stepper activeStep={1} alternativeLabel>
            <Step completed>
              <StepLabel>ตะกร้าสินค้า</StepLabel>
            </Step>
            <Step>
              <StepLabel>ยืนยันคำสั่งซื้อ</StepLabel>
            </Step>
            <Step>
              <StepLabel>ชำระเงิน</StepLabel>
            </Step>
          </Stepper>
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        pb: '120px' // Space for fixed bottom button
      }}>
        {/* Delivery Address Section */}
        <Card sx={{ 
          mx: 0.5, 
          mb: 1,
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(30px)',
          boxShadow: 'none'
        }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1.5 }}>
              <Box sx={{
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '12px',
                p: 0.8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin size={18} color="#10b981" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', fontSize: '17px' }}>
                ที่อยู่จัดส่ง
              </Typography>
            </Box>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                {addresses.map((address) => {
                  const IconComponent = address.icon;
                  return (
                    <Box key={address.id} sx={{ mb: 1 }}>
                      <FormControlLabel
                        value={address.id}
                        control={<Radio sx={{ color: '#10b981' }} />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5, py: 1 }}>
                            <Box sx={{
                              background: 'rgba(16, 185, 129, 0.1)',
                              borderRadius: '8px',
                              p: 0.5,
                              mt: 0.5
                            }}>
                              <IconComponent size={16} color="#10b981" />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{ fontWeight: 600, color: '#111827', fontSize: '15px' }}>
                                {address.name}
                              </Typography>
                              <Typography sx={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.4 }}>
                                {address.address}
                              </Typography>
                              <Typography sx={{ color: '#6b7280', fontSize: '13px', mt: 0.5 }}>
                                📞 {address.phone}
                              </Typography>
                            </Box>
                          </Box>
                        }
                        sx={{ 
                          background: selectedAddress === address.id ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                          borderRadius: '12px',
                          border: selectedAddress === address.id ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                          m: 0,
                          p: 1,
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </Box>
                  );
                })}
              </RadioGroup>
            </FormControl>

            <Button
              startIcon={<Plus size={16} />}
              sx={{
                color: '#10b981',
                textTransform: 'none',
                fontSize: '14px',
                mt: 1,
                '&:hover': {
                  background: 'rgba(16, 185, 129, 0.1)'
                }
              }}
            >
              เพิ่มที่อยู่ใหม่
            </Button>
          </CardContent>
        </Card>

        {/* Payment Method Section */}
        <Card sx={{ 
          mx: 0.5, 
          mb: 1,
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(30px)',
          boxShadow: 'none'
        }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1.5 }}>
              <Box sx={{
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '12px',
                p: 0.8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CreditCard size={18} color="#10b981" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', fontSize: '17px' }}>
                วิธีชำระเงิน
              </Typography>
            </Box>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
              >
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <FormControlLabel
                      key={method.id}
                      value={method.id}
                      control={<Radio sx={{ color: '#10b981' }} />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
                          <Box sx={{
                            background: `${method.color}15`,
                            borderRadius: '8px',
                            p: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <IconComponent size={16} color={method.color} />
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 600, color: '#111827', fontSize: '15px' }}>
                              {method.name}
                            </Typography>
                            <Typography sx={{ color: '#6b7280', fontSize: '13px' }}>
                              {method.description}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      sx={{ 
                        background: selectedPayment === method.id ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                        borderRadius: '12px',
                        border: selectedPayment === method.id ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                        m: 0,
                        mb: 0.5,
                        p: 1,
                        transition: 'all 0.3s ease'
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        {/* Order Notes */}
        <Card sx={{ 
          mx: 0.5, 
          mb: 1,
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(30px)',
          boxShadow: 'none'
        }}>
          <CardContent sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 600, color: '#111827', fontSize: '16px', mb: 1 }}>
              หมายเหตุเพิ่มเติม
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="เช่น วางไว้หน้าบ้าน , โทรติดต่อก่อนมาส่งของ ฯลฯ"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.5)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(16, 185, 129, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#10b981',
                  },
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card sx={{ 
          mx: 0.5,
          borderRadius: '24px',
          boxShadow: 'none',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(30px)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1.5 }}>
              <Box sx={{
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '12px',
                p: 0.8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <Receipt size={18} color="#6b7280" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', fontSize: '17px' }}>
                สรุปคำสั่งซื้อ
              </Typography>
            </Box>

            {/* Items Summary */}
            <Box sx={{ mb: 2 }}>
              {cartItems.map((item, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'start',
                  mb: 1.5,
                  pb: 1.5,
                  borderBottom: index < cartItems.length - 1 ? '1px solid rgba(255, 255, 255, 0.3)' : 'none'
                }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600, color: '#111827', fontSize: '15px' }}>
                      {item.quantity}x {item.itemName}
                    </Typography>
                    {Object.keys(item.addOns).filter(key => item.addOns[key]).length > 0 && (
                      <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {Object.keys(item.addOns).filter(key => item.addOns[key]).map((addOnId) => (
                          <Chip
                            key={addOnId}
                            label={getAddOnDisplayName(addOnId)}
                            size="small"
                            sx={{
                              background: 'rgba(16, 185, 129, 0.1)',
                              color: '#10b981',
                              fontSize: '10px',
                              height: 'auto',
                              '& .MuiChip-label': { px: 0.8, py: 0.2 }
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    {item.specialInstructions && (
                      <Typography sx={{ color: '#6b7280', fontSize: '12px', fontStyle: 'italic', mt: 0.5 }}>
                        "{item.specialInstructions}"
                      </Typography>
                    )}
                  </Box>
                  <Typography sx={{ fontWeight: 600, color: '#111827', fontSize: '15px' }}>
                    ฿{calculateItemTotalPrice(item).toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />

            {/* Price Breakdown */}
            <Box sx={{ 
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '16px',
              p: 1.5,
              mb: 1.5,
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: '#4b5563', fontSize: '15px' }}>ราคาสินค้า</Typography>
                <Typography sx={{ fontWeight: 500, fontSize: '15px', color: '#111827' }}>฿{totalPrice.toLocaleString()}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: '#4b5563', fontSize: '15px' }}>
                  ค่าจัดส่ง {deliveryFee === 0 && `(ฟรีเมื่อซื้อครบ ฿${freeDeliveryThreshold})`}
                </Typography>
                <Typography sx={{ 
                  fontWeight: 500, 
                  color: deliveryFee === 0 ? '#10b981' : '#111827',
                  fontSize: '15px'
                }}>
                  {deliveryFee === 0 ? 'ฟรี!' : `฿${deliveryFee}`}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: '#4b5563', fontSize: '15px' }}>ค่าบริการ</Typography>
                <Typography sx={{ fontWeight: 500, fontSize: '15px', color: '#111827' }}>
                  ฿{serviceFee.toLocaleString()}
                </Typography>
              </Box>
            </Box>

            {/* Final Total */}
            <Box sx={{ 
              background: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '20px',
              p: 2,
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.4)'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ 
                  fontWeight: 600, 
                  color: '#111827',
                  fontSize: '17px'
                }}>
                  ยอดรวมทั้งหมด
                </Typography>
                <Typography sx={{ 
                  fontWeight: 700, 
                  color: '#111827',
                  fontSize: '21px'
                }}>
                  ฿{finalTotal.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Fixed Bottom Button */}
      <Box sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 1,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        zIndex: 1000
      }}>
        <Button
          fullWidth
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          sx={{
            background: isProcessing 
              ? 'rgba(107, 114, 128, 0.5)' 
              : 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            borderRadius: '20px',
            textTransform: 'none',
            py: 2,
            fontSize: '17px',
            fontWeight: 600,
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: isProcessing 
                ? 'rgba(107, 114, 128, 0.5)' 
                : 'linear-gradient(135deg, #059669, #047857)',
              boxShadow: '0 12px 40px rgba(16, 185, 129, 0.4)',
              transform: isProcessing ? 'none' : 'translateY(-2px)'
            },
            '&:disabled': {
              color: 'white'
            }
          }}
          startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <CheckCircle size={20} />}
        >
          {isProcessing ? 'กำลังดำเนินการ...' : `ยืนยันสั่งซื้อ ฿${finalTotal.toLocaleString()}`}
        </Button>
      </Box>
    </Box>
  );
} 