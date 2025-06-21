'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
  Chip,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  CreditCard,
  Receipt,
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useTenant } from '../contexts/TenantContext';
import { debugCart } from '../utils/cartDebug';

export default function CartPage() {
  const router = useRouter();
  const { tenant, tenantId } = useTenant();
  const {
    getCartItems,
    calculateTotalPrice,
    increaseCartItem,
    removeFromCart,
    removeItemFromCart,
    clearCart,
    cartCount,
    isLoaded,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  // Add-on name mapping
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

  // Calculate item total price including add-ons
  const calculateItemTotalPrice = (item: any) => {
    const addOnPrices: { [key: string]: number } = {
      '1': 45, // ชีสเฟต้าเพิ่ม
      '2': 60, // อะโวคาโด
      '3': 35, // มะกอกดำ
      '4': 40, // อัลมอนด์แผ่น
      '5': 25, // เมล็ดทานตะวัน
      '6': 30  // น้ำสลัดบัลซามิค
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

  // Get all cart items (already filtered by tenant in useCart hook)
  const cartItems = getCartItems();
  
  // Debug: Log current tenant and cart items
  console.log('Cart Page - Current Tenant:', tenantId);
  console.log('Cart Page - Cart Items:', cartItems);
  
  // Run debug utility on mount
  useEffect(() => {
    debugCart();
  }, []);
  
  const totalPrice = calculateTotalPrice();
  const deliveryFee = totalPrice > 200 ? 0 : 39;
  const discount = promoApplied ? totalPrice * 0.1 : 0;
  const finalTotal = totalPrice + deliveryFee - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    router.push('/checkout');
  };

  // Quantity control handlers
  const handleIncreaseQuantity = (cartKey: string) => {
    increaseCartItem(cartKey);
  };

  const handleDecreaseQuantity = (cartKey: string) => {
    const item = cartItems.find(item => item.cartKey === cartKey);
    if (item && item.quantity > 1) {
      // Decrease quantity by removing one item
      removeFromCart(cartKey);
    } else {
      // Remove item completely if quantity would be 0
      handleRemoveItem(cartKey);
    }
  };

  const handleRemoveItem = (cartKey: string) => {
    if (confirm('คุณต้องการลบสินค้านี้ออกจากตะกร้าหรือไม่?')) {
      removeItemFromCart(cartKey);
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

  if (cartItems.length === 0) {
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
          
          <Box>
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              color: '#0f172a'
            }}>
              ตะกร้าสินค้า
            </Typography>
            {tenant && (
              <Typography variant="caption" sx={{ 
                color: '#64748b',
                fontSize: '12px'
              }}>
                {tenant.theme.brandName}
              </Typography>
            )}
          </Box>
        </Box>
        </Box>

        {/* Empty Cart */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4, 
          px: 1 
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '96px', mb: 2 }}>🛒</Typography>
            <Typography variant="h4" sx={{ color: '#0f172a', fontWeight: 700, mb: 2 }}>
              ตะกร้าว่างเปล่า
            </Typography>
            <Typography sx={{ color: '#64748b', mb: 2, fontSize: '18px' }}>
              เริ่มช้อปปิ้งและเพิ่มอาหารเสริมสุขภาพลงในตะกร้าของคุณ
            </Typography>
            {tenant && (
              <Typography sx={{ color: '#10b981', mb: 4, fontSize: '14px', fontWeight: 500 }}>
                ร้าน: {tenant.theme.brandName}
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={() => router.push('/')}
              sx={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '12px',
                textTransform: 'none',
                px: 4,
                py: 1.5,
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
                '&:hover': {
                  boxShadow: '0 12px 40px rgba(16, 185, 129, 0.4)',
                }
              }}
            >
              เริ่มช้อปปิ้ง
            </Button>
          </Box>
        </Box>
      </Box>
    );
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
          justifyContent: 'space-between',
          py: 1.5,
          px: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
              ตะกร้าสินค้า ({cartCount} รายการ)
            </Typography>
          </Box>

          <Button
            onClick={clearCart}
            sx={{
              color: '#ef4444',
              textTransform: 'none',
              '&:hover': { background: 'rgba(239, 68, 68, 0.1)' }
            }}
          >
            ล้างตะกร้า
          </Button>
        </Box>
      </Box>

      {/* Scrollable Content Area */}
      <Box sx={{ 
        flex: 1,
        overflowY: 'auto',
        py: 1, 
        px: 0.5,
        pb: '100px', // เพิ่ม padding bottom เพื่อไม่ให้ fixed button ทับ
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none'
      }}>
        {/* Cart Items */}
        <Box sx={{ mb: 1, mx: 0.5 }}>
          {cartItems.map((item) => (
            <Card key={item.cartKey} sx={{ 
              mb: 0.5, 
              borderRadius: '24px',
              boxShadow: 'none',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(30px)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.6)',
                transform: 'translateY(-1px)',
                backdropFilter: 'blur(40px)'
              }
            }}>
                              <CardContent sx={{ p: 1.5 }}>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                  {/* Product Image - Larger */}
                  <Box sx={{ 
                    width: { xs: 80, sm: 100 }, 
                    height: { xs: 80, sm: 100 }, 
                    borderRadius: '20px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    position: 'relative'
                  }}>
                    <img
                      src={`https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop&crop=center`}
                      alt={item.itemName}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.9
                      }}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        const fallback = target.nextElementSibling as HTMLElement;
                        target.style.display = 'none';
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                    <Box sx={{ 
                      width: '100%', 
                      height: '100%', 
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: '32px', sm: '40px' },
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)'
                    }}>
                      🍽️
                    </Box>
                  </Box>

                  {/* Product Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                      <Typography sx={{ 
                        fontWeight: 600, 
                        color: '#111827',
                        fontSize: '16px',
                        lineHeight: 1.4
                      }}>
                        {item.itemName}
                      </Typography>

                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography sx={{ 
                        color: '#4b5563', 
                        fontWeight: 500, 
                        fontSize: '15px'
                      }}>
                        ฿{item.basePrice.toLocaleString()}
                      </Typography>
                      <Typography sx={{ 
                        fontSize: '12px',
                        color: '#6b7280',
                        background: 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(10px)',
                        px: 1,
                        py: 0.2,
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}>
                        ต่อชิ้น
                      </Typography>
                    </Box>

                    {/* Add-ons - Minimal Display */}
                    {Object.keys(item.addOns).filter(key => item.addOns[key]).length > 0 && (
                      <Box sx={{ mb: 1 }}>
                        <Typography sx={{ 
                          fontSize: '13px', 
                          color: '#6b7280', 
                          fontWeight: 500,
                          mb: 0.5
                        }}>
                          เสริม:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {Object.keys(item.addOns).filter(key => item.addOns[key]).map((addOnId) => (
                            <Chip
                              key={addOnId}
                              label={getAddOnDisplayName(addOnId)}
                              size="small"
                              sx={{
                                background: 'rgba(255, 255, 255, 0.6)',
                                color: '#4b5563',
                                fontSize: '11px',
                                height: 'auto',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                backdropFilter: 'blur(10px)',
                                '& .MuiChip-label': {
                                  px: 1,
                                  py: 0.3
                                }
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Special Instructions - Minimal */}
                    {item.specialInstructions && (
                      <Box sx={{ 
                        background: 'rgba(255, 255, 255, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)',
                        p: 1,
                        mb: 1
                      }}>
                        <Typography sx={{ 
                          fontSize: '12px', 
                          color: '#6b7280', 
                          fontWeight: 500,
                          mb: 0.3
                        }}>
                          คำสั่งพิเศษ:
                        </Typography>
                        <Typography sx={{ 
                          fontSize: '12px', 
                          color: '#4b5563',
                          fontStyle: 'italic',
                          lineHeight: 1.3
                        }}>
                          "{item.specialInstructions}"
                        </Typography>
                      </Box>
                    )}

                    {/* Bottom Row: Minimal Quantity + Total Price */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Enhanced Quantity Controls */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* Delete Button */}
                        <IconButton
                          onClick={() => handleRemoveItem(item.cartKey)}
                          sx={{ 
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            width: 32,
                            height: 32,
                            borderRadius: '12px',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': { 
                              background: 'rgba(239, 68, 68, 0.2)',
                              transform: 'scale(1.05)',
                              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                            }
                          }}
                        >
                          <Trash2 size={14} />
                        </IconButton>

                        {/* Quantity Controls */}
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          background: 'rgba(255, 255, 255, 0.6)',
                          borderRadius: '16px',
                          border: '1px solid rgba(255, 255, 255, 0.4)',
                          backdropFilter: 'blur(20px)',
                          p: 0.3,
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}>
                          <IconButton
                            onClick={() => handleDecreaseQuantity(item.cartKey)}
                            sx={{ 
                              background: item.quantity === 1 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                              color: item.quantity === 1 ? '#ef4444' : '#6b7280',
                              width: 30,
                              height: 30,
                              borderRadius: '12px',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              '&:hover': { 
                                background: item.quantity === 1 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                transform: 'scale(1.1)'
                              }
                            }}
                          >
                            <Minus size={14} />
                          </IconButton>
                          
                          <Typography sx={{ 
                            minWidth: '36px', 
                            textAlign: 'center',
                            fontWeight: 700,
                            fontSize: '16px',
                            color: '#111827',
                            mx: 0.5,
                            userSelect: 'none'
                          }}>
                            {item.quantity}
                          </Typography>
                          
                          <IconButton
                            onClick={() => handleIncreaseQuantity(item.cartKey)}
                            sx={{ 
                              background: 'rgba(16, 185, 129, 0.1)',
                              color: '#10b981',
                              width: 30,
                              height: 30,
                              borderRadius: '12px',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              '&:hover': { 
                                background: 'rgba(16, 185, 129, 0.2)',
                                transform: 'scale(1.1)',
                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                              }
                            }}
                          >
                            <Plus size={14} />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Total Price - Minimal */}
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ 
                          fontSize: '12px',
                          color: '#6b7280',
                          lineHeight: 1
                        }}>
                          รวม
                        </Typography>
                        <Typography sx={{ 
                          fontWeight: 600, 
                          fontSize: '17px',
                          color: '#111827',
                          lineHeight: 1.2
                        }}>
                          ฿{calculateItemTotalPrice(item).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Promo Code - Minimal */}
        <Card sx={{ 
          mb: 1, 
          mx: 0.5,
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(30px)',
          boxShadow: 'none'
        }}>
          <CardContent sx={{ p: 1.5 }}>
            <Typography sx={{ 
              fontWeight: 500, 
              mb: 1, 
              color: '#374151',
              fontSize: '16px'
            }}>
              รหัสส่วนลด
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 1
            }}>
              <TextField
                fullWidth
                placeholder="ใส่รหัสส่วนลด (ลอง: SAVE10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    fontSize: '14px',
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    '& fieldset': {
                      border: 'none'
                    }
                  },
                  '& .MuiInputBase-input': {
                    padding: '10px 14px'
                  }
                }}
              />
              <Button
                onClick={handleApplyPromo}
                disabled={!promoCode || promoApplied}
                sx={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  color: '#6b7280',
                  borderRadius: '16px',
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  fontSize: '14px',
                  minWidth: '80px',
                  minHeight: '40px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981'
                  },
                  '&:disabled': {
                    background: 'rgba(255, 255, 255, 0.5)',
                    color: '#9ca3af'
                  }
                }}
              >
                ใช้รหัส
              </Button>
            </Box>
            {promoApplied && (
              <Alert severity="success" sx={{ 
                mt: 1, 
                borderRadius: '16px',
                fontSize: '14px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                backdropFilter: 'blur(10px)',
                '& .MuiAlert-icon': {
                  color: '#10b981'
                }
              }}>
                ส่วนลด 10% ถูกใช้แล้ว!
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Minimal Order Summary */}
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
                สรุปการสั่งซื้อ
              </Typography>
            </Box>

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
                <Typography sx={{ color: '#4b5563', fontSize: '15px' }}>ค่าจัดส่ง</Typography>
                <Typography sx={{ 
                  fontWeight: 500, 
                  color: deliveryFee === 0 ? '#10b981' : '#111827',
                  fontSize: '15px'
                }}>
                  {deliveryFee === 0 ? 'ฟรี!' : `฿${deliveryFee}`}
                </Typography>
              </Box>

              {discount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: '#4b5563', fontSize: '15px' }}>ส่วนลด (SAVE10)</Typography>
                  <Typography sx={{ 
                    fontWeight: 500, 
                    color: '#10b981',
                    fontSize: '15px'
                  }}>
                    -฿{discount.toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />

            <Box sx={{ 
              background: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '20px',
              p: 2,
              mb: 1.5,
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

            {totalPrice < 200 && (
              <Alert 
                severity="info" 
                sx={{ 
                  mb: 1.5, 
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(15px)',
                  color: '#6b7280',
                  fontSize: '14px',
                  '& .MuiAlert-icon': {
                    color: '#6b7280'
                  }
                }}
              >
                🚚 สั่งซื้อเพิ่ม ฿{(200 - totalPrice).toLocaleString()} เพื่อได้ส่งฟรี!
              </Alert>
            )}


          </CardContent>
        </Card>
      </Box>

      {/* Fixed Bottom Checkout Button */}
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
          onClick={handleCheckout}
          sx={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            borderRadius: '20px',
            textTransform: 'none',
            py: 2,
            fontSize: '17px',
            fontWeight: 600,
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #059669, #047857)',
              boxShadow: '0 12px 40px rgba(16, 185, 129, 0.4)',
              transform: 'translateY(-2px)'
            }
          }}
          startIcon={<CreditCard size={20} />}
        >
          ดำเนินการต่อ ฿{finalTotal.toLocaleString()}
        </Button>
      </Box>
    </Box>
  );
} 