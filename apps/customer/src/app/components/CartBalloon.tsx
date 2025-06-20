'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  IconButton,
  Fab,
  Collapse,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import {
  ShoppingBag,
  X,
  Eye,
  Plus,
  Minus,
  Trash2,
} from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function CartBalloon() {
  const router = useRouter();
  const {
    getCartItems,
    calculateTotalPrice,
    increaseCartItem,
    removeFromCart,
    removeItemFromCart,
    cartCount,
    isLoaded,
  } = useCart();

  const [isExpanded, setIsExpanded] = useState(false);
  const cartItems = getCartItems();
  const totalPrice = calculateTotalPrice();

  // Don't render until cart is loaded from localStorage to prevent hydration mismatch
  if (!isLoaded) return null;
  if (cartCount === 0) return null;

  const handleViewCart = () => {
    router.push('/cart');
  };

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <Box
          onClick={() => setIsExpanded(false)}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1200,
          }}
        />
      )}

      {/* Cart Balloon */}
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: '180px', sm: '140px' }, // Above the taller mobile footer
          right: { xs: 4, sm: 16, md: 32 }, // Almost touching right edge on mobile
          left: 'auto', // Force right alignment
          zIndex: 1300,
          maxWidth: isExpanded ? { xs: '280px', sm: '400px' } : 'auto',
          width: isExpanded ? { xs: 'calc(100vw - 20px)', sm: '85vw', md: 'auto' } : 'auto',
          maxHeight: isExpanded ? '60vh' : 'auto',
          transform: { 
            xs: isExpanded ? 'translateX(calc(-100% + 60px))' : 'translateX(0)', 
            sm: 'translateX(0)', 
            md: 'translateX(0)' 
          }
        }}
      >
        {/* Expanded Cart */}
        <Collapse in={isExpanded}>
          <Card
            sx={{
              borderRadius: '20px',
              mb: 2,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              maxHeight: '60vh',
              overflow: 'auto',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Header */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#0f172a' }}
                >
                  ตะกร้าสินค้า ({cartCount})
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setIsExpanded(false)}
                  sx={{
                    color: '#64748b',
                    '&:hover': { background: 'rgba(0, 0, 0, 0.1)' },
                  }}
                >
                  <X size={18} />
                </IconButton>
              </Box>

              {/* Cart Items */}
              <Box sx={{ mb: 3 }}>
                {cartItems.slice(0, 3).map((item, index) => (
                  <Box key={item.cartKey}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        py: 2,
                      }}
                    >
                      <Box sx={{ flex: 1, mr: 2 }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: '#0f172a',
                            fontSize: '14px',
                            mb: 0.5,
                          }}
                        >
                          {item.itemName}
                        </Typography>

                        {/* Add-ons */}
                        {Object.keys(item.addOns).filter(key => item.addOns[key]).length > 0 && (
                          <Box sx={{ mb: 1 }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {Object.keys(item.addOns)
                                .filter(key => item.addOns[key])
                                .slice(0, 2)
                                .map(addOnKey => (
                                  <Chip
                                    key={addOnKey}
                                    label={addOnKey.replace(/-/g, ' ')}
                                    size="small"
                                    sx={{
                                      background: 'rgba(16, 185, 129, 0.1)',
                                      color: '#059669',
                                      fontSize: '10px',
                                      height: '20px',
                                    }}
                                  />
                                ))}
                              {Object.keys(item.addOns).filter(key => item.addOns[key]).length > 2 && (
                                <Chip
                                  label={`+${Object.keys(item.addOns).filter(key => item.addOns[key]).length - 2}`}
                                  size="small"
                                  sx={{
                                    background: 'rgba(100, 116, 139, 0.1)',
                                    color: '#64748b',
                                    fontSize: '10px',
                                    height: '20px',
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        )}

                        <Typography
                          sx={{
                            color: '#10b981',
                            fontWeight: 600,
                            fontSize: '14px',
                          }}
                        >
                          ฿{item.basePrice.toLocaleString()}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'end',
                          gap: 1,
                        }}
                      >
                        {/* Quantity Controls */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => removeFromCart(item.cartKey)}
                            sx={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              color: '#ef4444',
                              width: 24,
                              height: 24,
                              '&:hover': { background: 'rgba(239, 68, 68, 0.2)' },
                            }}
                          >
                            <Minus size={12} />
                          </IconButton>

                          <Typography
                            sx={{
                              minWidth: '30px',
                              textAlign: 'center',
                              fontWeight: 600,
                              fontSize: '14px',
                            }}
                          >
                            {item.quantity}
                          </Typography>

                          <IconButton
                            size="small"
                            onClick={() => increaseCartItem(item.cartKey)}
                            sx={{
                              background: 'rgba(16, 185, 129, 0.1)',
                              color: '#10b981',
                              width: 24,
                              height: 24,
                              '&:hover': { background: 'rgba(16, 185, 129, 0.2)' },
                            }}
                          >
                            <Plus size={12} />
                          </IconButton>
                        </Box>

                        <IconButton
                          size="small"
                          onClick={() => removeItemFromCart(item.cartKey)}
                          sx={{
                            color: '#ef4444',
                            '&:hover': { background: 'rgba(239, 68, 68, 0.1)' },
                          }}
                        >
                          <Trash2 size={14} />
                        </IconButton>
                      </Box>
                    </Box>
                    {index < Math.min(cartItems.length, 3) - 1 && <Divider />}
                  </Box>
                ))}

                {cartItems.length > 3 && (
                  <Typography
                    sx={{
                      textAlign: 'center',
                      color: '#64748b',
                      fontSize: '12px',
                      py: 1,
                    }}
                  >
                    และอีก {cartItems.length - 3} รายการ
                  </Typography>
                )}
              </Box>

              {/* Total */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  py: 2,
                  background: 'rgba(16, 185, 129, 0.05)',
                  borderRadius: '12px',
                  px: 2,
                }}
              >
                <Typography sx={{ fontWeight: 600, color: '#0f172a' }}>
                  ยอดรวม
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: '#10b981',
                    fontSize: '18px',
                  }}
                >
                  ฿{totalPrice.toLocaleString()}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Button
                fullWidth
                onClick={handleViewCart}
                sx={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  borderRadius: '12px',
                  textTransform: 'none',
                  py: 1.5,
                  fontSize: '14px',
                  fontWeight: 600,
                  boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
                  },
                }}
                startIcon={<Eye size={16} />}
              >
                ดูตะกร้าสินค้า
              </Button>
            </CardContent>
          </Card>
        </Collapse>

        {/* Cart FAB */}
        <Fab
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            width: 64,
            height: 64,
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #059669, #047857)',
              boxShadow: '0 12px 40px rgba(16, 185, 129, 0.5)',
            },
            position: 'relative',
          }}
        >
          <ShoppingBag size={28} />
          
          {/* Cart Count Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              background: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)',
            }}
          >
            {cartCount > 99 ? '99+' : cartCount}
          </Box>
        </Fab>
      </Box>
    </>
  );
} 