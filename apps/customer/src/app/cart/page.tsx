'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function CartPage() {
  const router = useRouter();
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

  const cartItems = getCartItems();
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
    // Navigate to checkout page (you can implement this later)
    alert('ระบบชำระเงินจะพร้อมใช้งานเร็วๆ นี้!');
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
        minHeight: '100vh',
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
          <Container maxWidth="lg">
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              py: 2
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
                ตะกร้าสินค้า
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Empty Cart */}
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ fontSize: '96px', mb: 2 }}>🛒</Typography>
            <Typography variant="h4" sx={{ color: '#0f172a', fontWeight: 700, mb: 2 }}>
              ตะกร้าว่างเปล่า
            </Typography>
            <Typography sx={{ color: '#64748b', mb: 4, fontSize: '18px' }}>
              เริ่มช้อปปิ้งและเพิ่มอาหารเสริมสุขภาพลงในตะกร้าของคุณ
            </Typography>
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
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
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
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            py: 2
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
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Cart Items */}
        <Box sx={{ mb: 4 }}>
          {cartItems.map((item) => (
            <Card key={item.cartKey} sx={{ 
              mb: 2, 
              borderRadius: { xs: '12px', sm: '16px' },
              boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.06)'
            }}>
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 } }}>
                  {/* Product Image */}
                  <Box sx={{ 
                    width: { xs: 60, sm: 80 }, 
                    height: { xs: 60, sm: 80 }, 
                    borderRadius: { xs: '8px', sm: '12px' },
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#f8fafc'
                  }}>
                    <img
                      src={`https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop&crop=center`}
                      alt={item.itemName}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
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
                      fontSize: { xs: '24px', sm: '32px' }
                    }}>
                      🍽️
                    </Box>
                  </Box>

                  {/* Product Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                      <Typography sx={{ 
                        fontWeight: 700, 
                        color: '#0f172a',
                        fontSize: { xs: '15px', sm: '16px' },
                        lineHeight: 1.3
                      }}>
                        {item.itemName}
                      </Typography>
                      <IconButton
                        onClick={() => removeItemFromCart(item.cartKey)}
                        sx={{ 
                          color: '#ef4444',
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32  , sm: 40 },
                          ml: 1,
                          '&:hover': { background: 'rgba(239, 68, 68, 0.1)' }
                        }}
                      >
                        <Trash2 size={24} />
                      </IconButton>
                    </Box>
                    
                    <Typography sx={{ 
                      color: '#10b981', 
                      fontWeight: 600, 
                      fontSize: { xs: '15px', sm: '16px' }, 
                      mb: 1
                    }}>
                      ฿{item.basePrice.toLocaleString()}
                    </Typography>

                    {/* Add-ons - Compact */}
                    {Object.keys(item.addOns).filter(key => item.addOns[key]).length > 0 && (
                      <Typography sx={{ 
                        fontSize: { xs: '11px', sm: '12px' }, 
                        color: '#64748b', 
                        mb: 0.5,
                        lineHeight: 1.2
                      }}>
                        เสริม: {Object.keys(item.addOns).filter(key => item.addOns[key]).join(', ').replace(/-/g, ' ')}
                      </Typography>
                    )}

                    {/* Special Instructions - Compact */}
                    {item.specialInstructions && (
                      <Typography sx={{ 
                        fontSize: { xs: '11px', sm: '12px' }, 
                        color: '#64748b', 
                        mb: 1,
                        fontStyle: 'italic',
                        lineHeight: 1.2
                      }}>
                        "{item.specialInstructions}"
                      </Typography>
                    )}

                    {/* Bottom Row: Quantity + Total Price */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Quantity Controls */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton
                          onClick={() => removeFromCart(item.cartKey)}
                          sx={{ 
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            width: { xs: 28, sm: 32 },
                            height: { xs: 28, sm: 32 },
                            '&:hover': { background: 'rgba(239, 68, 68, 0.2)' }
                          }}
                        >
                          <Minus size={12} />
                        </IconButton>
                        
                        <Typography sx={{ 
                          minWidth: { xs: '28px', sm: '32px' }, 
                          textAlign: 'center',
                          fontWeight: 600,
                          fontSize: { xs: '12px', sm: '14px' }
                        }}>
                          {item.quantity}
                        </Typography>
                        
                        <IconButton
                          onClick={() => increaseCartItem(item.cartKey)}
                          sx={{ 
                            background: 'rgba(16, 185, 129, 0.1)',
                            color: '#10b981',
                            width: { xs: 28, sm: 32 },
                            height: { xs: 28, sm: 32 },
                            '&:hover': { background: 'rgba(16, 185, 129, 0.2)' }
                          }}
                        >
                          <Plus size={12} />
                        </IconButton>
                      </Box>

                      {/* Total Price */}
                      <Typography sx={{ 
                        fontWeight: 700, 
                        fontSize: { xs: '14px', sm: '16px' },
                        color: '#0f172a'
                      }}>
                        ฿{(item.basePrice * item.quantity).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Promo Code */}
        <Card sx={{ 
          mb: 4, 
          borderRadius: { xs: '12px', sm: '16px' },
          border: '1px solid rgba(16, 185, 129, 0.2)',
          background: 'rgba(16, 185, 129, 0.02)'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography sx={{ 
              fontWeight: 600, 
              mb: { xs: 1.5, sm: 2 }, 
              color: '#0f172a',
              fontSize: { xs: '16px', sm: '18px' }
            }}>
              รหัสส่วนลด
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1.5, sm: 2 }
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
                    borderRadius: { xs: '8px', sm: '12px' },
                    fontSize: { xs: '14px', sm: '16px' },
                    height: { xs: '40px', sm: '48px' },
                    background: '#fff'
                  },
                  '& .MuiInputBase-input': {
                    padding: { xs: '8px 12px', sm: '12px 16px' }
                  }
                }}
              />
              <Button
                onClick={handleApplyPromo}
                disabled={!promoCode || promoApplied}
                sx={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  borderRadius: { xs: '8px', sm: '12px' },
                  textTransform: 'none',
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1, sm: 1.5 },
                  fontSize: { xs: '14px', sm: '16px' },
                  minWidth: { xs: '80px', sm: '120px' },
                  minHeight: { xs: '40px', sm: '48px' },
                  '&:disabled': {
                    background: '#e2e8f0',
                    color: '#94a3b8'
                  }
                }}
              >
                ใช้รหัส
              </Button>
            </Box>
            {promoApplied && (
              <Alert severity="success" sx={{ 
                mt: { xs: 1.5, sm: 2 }, 
                borderRadius: { xs: '8px', sm: '12px' },
                fontSize: { xs: '14px', sm: '16px' }
              }}>
                ส่วนลด 10% ถูกใช้แล้ว!
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card sx={{ 
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#0f172a' }}>
              สรุปการสั่งซื้อ
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: '#64748b' }}>ราคาสินค้า</Typography>
              <Typography sx={{ fontWeight: 600 }}>฿{totalPrice.toLocaleString()}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: '#64748b' }}>ค่าจัดส่ง</Typography>
              <Typography sx={{ fontWeight: 600, color: deliveryFee === 0 ? '#10b981' : '#0f172a' }}>
                {deliveryFee === 0 ? 'ฟรี!' : `฿${deliveryFee}`}
              </Typography>
            </Box>

            {discount > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ color: '#64748b' }}>ส่วนลด</Typography>
                <Typography sx={{ fontWeight: 600, color: '#10b981' }}>
                  -฿{discount.toLocaleString()}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                ยอดรวม
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981' }}>
                ฿{finalTotal.toLocaleString()}
              </Typography>
            </Box>

            {totalPrice < 200 && (
              <Alert severity="info" sx={{ mb: 3, borderRadius: '12px' }}>
                สั่งซื้อเพิ่ม ฿{(200 - totalPrice).toLocaleString()} เพื่อได้ส่งฟรี!
              </Alert>
            )}

            <Button
              fullWidth
              onClick={handleCheckout}
              sx={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                borderRadius: '12px',
                textTransform: 'none',
                py: 1.5,
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
                '&:hover': {
                  boxShadow: '0 12px 40px rgba(16, 185, 129, 0.4)',
                }
              }}
              startIcon={<CreditCard size={20} />}
            >
              ดำเนินการชำระเงิน
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
} 