'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  Chip,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  Shield,
  Bell,
  Gift
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTenant, useTenantSettings } from '../contexts/TenantContext';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, refreshUser } = useAuth();
  const { tenant, tenantId } = useTenant();
  const { brandName, primaryColor } = useTenantSettings();
  const [refreshing, setRefreshing] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshUser();
    setRefreshing(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <Box
        sx={{
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
        }}
      >
        <CircularProgress sx={{ color: primaryColor }} />
      </Box>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3
        }}
      >
        <Alert severity="warning">
          กรุณาเข้าสู่ระบบเพื่อดูข้อมูลโปรไฟล์
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)
        `,
        pb: 10
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Container maxWidth="sm" sx={{ px: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            py: 2 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={() => router.back()}
                sx={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  '&:hover': { background: 'rgba(16, 185, 129, 0.2)' }
                }}
              >
                <ArrowLeft size={20} color={primaryColor} />
              </IconButton>
              <Typography variant="h6" fontWeight="bold">
                โปรไฟล์ของฉัน
              </Typography>
            </Box>
            
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              size="small"
              sx={{
                minWidth: 'auto',
                px: 2,
                color: primaryColor,
                textTransform: 'none'
              }}
            >
              {refreshing ? <CircularProgress size={16} /> : 'รีเฟรช'}
            </Button>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="sm" sx={{ px: 2, py: 3 }}>
        {/* Profile Card */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
              <Avatar
                src={user.pictureUrl}
                sx={{
                  width: 80,
                  height: 80,
                  background: `linear-gradient(135deg, ${primaryColor}20, ${primaryColor}40)`,
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: primaryColor
                }}
              >
                {user.displayName?.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {user.displayName}
                </Typography>
                <Chip
                  label={`LINE ID: ${user.lineId}`}
                  size="small"
                  sx={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    color: '#22c55e',
                    mb: 1
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  ลูกค้าของ {brandName}
                </Typography>
              </Box>
            </Box>

            {user.email && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Mail size={18} color="#64748b" />
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Shield size={18} color="#64748b" />
              <Typography variant="body2" color="text.secondary">
                เข้าสู่ระบบด้วย LINE Login
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Menu Options */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
          }}
        >
          <List sx={{ p: 0 }}>
            <ListItemButton sx={{ px: 3, py: 2 }}>
              <ListItemIcon>
                <User size={20} color="#64748b" />
              </ListItemIcon>
              <ListItemText 
                primary="แก้ไขข้อมูลส่วนตัว"
                secondary="ชื่อ, อีเมล, เบอร์โทร"
              />
            </ListItemButton>
            
            <Divider sx={{ mx: 3 }} />
            
            <ListItemButton sx={{ px: 3, py: 2 }}>
              <ListItemIcon>
                <MapPin size={20} color="#64748b" />
              </ListItemIcon>
              <ListItemText 
                primary="ที่อยู่จัดส่ง"
                secondary="จัดการที่อยู่สำหรับการส่งอาหาร"
              />
            </ListItemButton>
            
            <Divider sx={{ mx: 3 }} />
            
            <ListItemButton sx={{ px: 3, py: 2 }}>
              <ListItemIcon>
                <CreditCard size={20} color="#64748b" />
              </ListItemIcon>
              <ListItemText 
                primary="วิธีการชำระเงิน"
                secondary="บัตรเครดิต, โอนเงิน, เงินสด"
              />
            </ListItemButton>
            
            <Divider sx={{ mx: 3 }} />
            
            <ListItemButton sx={{ px: 3, py: 2 }}>
              <ListItemIcon>
                <Heart size={20} color="#64748b" />
              </ListItemIcon>
              <ListItemText 
                primary="รายการโปรด"
                secondary="อาหารที่คุณชื่นชอบ"
              />
            </ListItemButton>
          </List>
        </Card>

        {/* Settings */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
          }}
        >
          <List sx={{ p: 0 }}>
            <ListItemButton sx={{ px: 3, py: 2 }}>
              <ListItemIcon>
                <Bell size={20} color="#64748b" />
              </ListItemIcon>
              <ListItemText 
                primary="การแจ้งเตือน"
                secondary="ตั้งค่าการแจ้งเตือนผ่าน LINE"
              />
            </ListItemButton>
            
            <Divider sx={{ mx: 3 }} />
            
            <ListItemButton sx={{ px: 3, py: 2 }}>
              <ListItemIcon>
                <Gift size={20} color="#64748b" />
              </ListItemIcon>
              <ListItemText 
                primary="โปรโมชั่น"
                secondary="คูปองส่วนลดและข้อเสนอพิเศษ"
              />
            </ListItemButton>
            
            <Divider sx={{ mx: 3 }} />
            
            <ListItemButton sx={{ px: 3, py: 2 }}>
              <ListItemIcon>
                <HelpCircle size={20} color="#64748b" />
              </ListItemIcon>
              <ListItemText 
                primary="ช่วยเหลือ"
                secondary="คำถามที่พบบ่อยและการติดต่อ"
              />
            </ListItemButton>
          </List>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          fullWidth
          variant="outlined"
          size="large"
          startIcon={<LogOut size={20} />}
          sx={{
            py: 1.5,
            borderColor: '#ef4444',
            color: '#ef4444',
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              borderColor: '#dc2626',
              background: 'rgba(239, 68, 68, 0.05)',
            }
          }}
        >
          ออกจากระบบ
        </Button>
      </Container>
    </Box>
  );
} 