'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
} from '@mui/material';
import {
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Receipt,
  Home,
  ShoppingBag,
  Truck,
  ChefHat,
} from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function OrderSuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [orderStatus, setOrderStatus] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(35);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state and generate order data client-side only
  useEffect(() => {
    setIsMounted(true);
    setOrderNumber(`TRP${Date.now().toString().slice(-6)}`);
    setOrderTime(new Date().toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }));
  }, []);

  const orderSteps = [
    { label: 'ได้รับคำสั่งซื้อ', icon: Receipt, completed: true },
    { label: 'กำลังเตรียมอาหาร', icon: ChefHat, completed: false },
    { label: 'กำลังจัดส่ง', icon: Truck, completed: false },
    { label: 'จัดส่งสำเร็จ', icon: CheckCircle, completed: false }
  ];

  // Simulate order progress
  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setOrderStatus(prev => {
        if (prev < 3) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
      
      setEstimatedTime(prev => Math.max(0, prev - 8));
    }, 8000); // Progress every 8 seconds

    // Clear cart after successful order
    const clearCartTimer = setTimeout(() => {
      clearCart();
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(clearCartTimer);
    };
  }, [clearCart, isMounted]);

  return (
    <Box sx={{ 
      minHeight: '100vh',
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
      `,
      py: 2
    }}>
      {/* Success Header */}
      <Box sx={{ textAlign: 'center', mb: 3, px: 2 }}>
        <Box sx={{ 
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          mb: 2,
          animation: 'pulse 2s infinite'
        }}>
          <CheckCircle size={40} color="white" />
        </Box>
        
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          color: '#0f172a',
          mb: 1
        }}>
          สั่งซื้อสำเร็จ! 🎉
        </Typography>
        
        <Typography sx={{ 
          color: '#6b7280', 
          fontSize: '16px',
          mb: 2
        }}>
          ขอบคุณสำหรับคำสั่งซื้อของคุณ
        </Typography>

        <Box sx={{
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '16px',
          p: 2,
          border: '1px solid rgba(16, 185, 129, 0.2)',
          display: 'inline-block'
        }}>
          <Typography sx={{ 
            color: '#10b981', 
            fontWeight: 600,
            fontSize: '14px'
          }}>
            หมายเลขคำสั่งซื้อ
          </Typography>
          <Typography sx={{ 
            color: '#10b981', 
            fontWeight: 700,
            fontSize: '18px'
          }}>
            #{orderNumber || 'Loading...'}
          </Typography>
        </Box>
      </Box>

      {/* Order Status */}
      <Card sx={{ 
        mx: 1, 
        mb: 2,
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(30px)',
        boxShadow: 'none'
      }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
            <Box sx={{
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '12px',
              p: 0.8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={18} color="#10b981" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', fontSize: '17px' }}>
                สถานะคำสั่งซื้อ
              </Typography>
              <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>
                เวลาประมาณ: {estimatedTime} นาที
              </Typography>
            </Box>
          </Box>

          {/* Progress Bar */}
          <Box sx={{ mb: 3 }}>
            <LinearProgress 
              variant="determinate" 
              value={(orderStatus / 3) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  background: 'linear-gradient(90deg, #10b981, #059669)',
                }
              }}
            />
          </Box>

          {/* Order Steps */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {orderSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index <= orderStatus;
              const isCurrent = index === orderStatus;
              
              return (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    opacity: isActive ? 1 : 0.5,
                    transform: isCurrent ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: isActive 
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : 'rgba(107, 114, 128, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: isCurrent ? 'pulse 2s infinite' : 'none'
                  }}>
                    <IconComponent size={18} color={isActive ? 'white' : '#6b7280'} />
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ 
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#111827' : '#6b7280',
                      fontSize: '15px'
                    }}>
                      {step.label}
                    </Typography>
                    {isCurrent && (
                      <Typography sx={{ 
                        color: '#10b981', 
                        fontSize: '13px',
                        fontWeight: 500
                      }}>
                        กำลังดำเนินการ...
                      </Typography>
                    )}
                  </Box>

                  {isActive && index < orderStatus && (
                    <CheckCircle size={20} color="#10b981" />
                  )}
                </Box>
              );
            })}
          </Box>
        </CardContent>
      </Card>

      {/* Delivery Info */}
      <Card sx={{ 
        mx: 1, 
        mb: 2,
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
              ข้อมูลการจัดส่ง
            </Typography>
          </Box>

          <Box sx={{ 
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            p: 1.5,
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5, mb: 1 }}>
              <Box sx={{
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '8px',
                p: 0.5,
                mt: 0.5
              }}>
                <Home size={16} color="#10b981" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 600, color: '#111827', fontSize: '15px' }}>
                  บ้าน
                </Typography>
                <Typography sx={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.4 }}>
                  123/45 ซอยสุขุมวิท 21, คลองเตยเหนือ, วัฒนา, กรุงเทพฯ 10110
                </Typography>
                <Typography sx={{ color: '#6b7280', fontSize: '13px', mt: 0.5 }}>
                  📞 081-234-5678
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>
                เวลาสั่งซื้อ
              </Typography>
              <Typography sx={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>
                {orderTime || 'Loading...'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Support Info */}
      <Card sx={{ 
        mx: 1, 
        mb: 3,
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
              <Phone size={18} color="#10b981" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', fontSize: '17px' }}>
              ต้องการความช่วยเหลือ?
            </Typography>
          </Box>

          <Typography sx={{ color: '#6b7280', fontSize: '14px', mb: 2 }}>
            หากมีปัญหาหรือข้อสงสัยเกี่ยวกับคำสั่งซื้อ สามารถติดต่อเราได้
          </Typography>

          <Button
            variant="outlined"
            startIcon={<Phone size={16} />}
            sx={{
              borderColor: '#10b981',
              color: '#10b981',
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '14px',
              '&:hover': {
                borderColor: '#059669',
                background: 'rgba(16, 185, 129, 0.05)'
              }
            }}
          >
            โทร 02-123-4567
          </Button>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Box sx={{ px: 1, mt: 'auto' }}>
        <Button
          fullWidth
          onClick={() => router.push('/')}
          sx={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            borderRadius: '20px',
            textTransform: 'none',
            py: 2,
            fontSize: '16px',
            fontWeight: 600,
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            mb: 1,
            '&:hover': {
              background: 'linear-gradient(135deg, #059669, #047857)',
              boxShadow: '0 12px 40px rgba(16, 185, 129, 0.4)',
              transform: 'translateY(-2px)'
            }
          }}
          startIcon={<Home size={20} />}
        >
          กลับสู่หน้าหลัก
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => router.push('/orders')}
          sx={{
            borderColor: '#10b981',
            color: '#10b981',
            borderRadius: '20px',
            textTransform: 'none',
            py: 2,
            fontSize: '16px',
            fontWeight: 600,
            '&:hover': {
              borderColor: '#059669',
              background: 'rgba(16, 185, 129, 0.05)'
            }
          }}
          startIcon={<ShoppingBag size={20} />}
        >
          ดูประวัติคำสั่งซื้อ
        </Button>
      </Box>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </Box>
  );
} 