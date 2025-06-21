'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  IconButton,
  Alert,
  Snackbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Store as StoreIcon,
  Link as LinkIcon,
  Settings as SettingsIcon,
  Visibility as VisibilityIcon,
  ContentCopy as CopyIcon,
  QrCode as QrCodeIcon
} from '@mui/icons-material';

// Types
interface TenantConfig {
  id: string;
  name: string;
  subdomain: string;
  domain: string;
  liffId?: string;
  theme: {
    primaryColor: string;
    logo: string;
    brandName: string;
  };
  settings: {
    deliveryFee: number;
    freeDeliveryThreshold: number;
    serviceFeeRate: number;
    currency: string;
  };
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastAccess?: string;
}

// Mock data - in real app, this would come from API
const mockTenants: TenantConfig[] = [
  {
    id: 'restaurant1',
    name: 'Green Garden Organic',
    subdomain: 'restaurant1',
    domain: 'restaurant1.theredpotion.com',
    liffId: 'xxx-restaurant1',
    theme: {
      primaryColor: '#10b981',
      logo: '/images/restaurant1-logo.png',
      brandName: 'Green Garden'
    },
    settings: {
      deliveryFee: 39,
      freeDeliveryThreshold: 200,
      serviceFeeRate: 0.02,
      currency: 'THB'
    },
    status: 'active',
    createdAt: '2024-01-15',
    lastAccess: '2024-01-20'
  },
  {
    id: 'restaurant2',
    name: 'Zen Healthy Treats',
    subdomain: 'restaurant2',
    domain: 'restaurant2.theredpotion.com',
    liffId: 'yyy-restaurant2',
    theme: {
      primaryColor: '#7c3aed',
      logo: '/images/restaurant2-logo.png',
      brandName: 'Zen Treats'
    },
    settings: {
      deliveryFee: 49,
      freeDeliveryThreshold: 250,
      serviceFeeRate: 0.025,
      currency: 'THB'
    },
    status: 'active',
    createdAt: '2024-01-10',
    lastAccess: '2024-01-19'
  },
  {
    id: 'restaurant3',
    name: 'Fresh Bowl Co.',
    subdomain: 'restaurant3',
    domain: 'restaurant3.theredpotion.com',
    liffId: 'zzz-restaurant3',
    theme: {
      primaryColor: '#f59e0b',
      logo: '/images/restaurant3-logo.png',
      brandName: 'Fresh Bowl'
    },
    settings: {
      deliveryFee: 35,
      freeDeliveryThreshold: 180,
      serviceFeeRate: 0.015,
      currency: 'THB'
    },
    status: 'pending',
    createdAt: '2024-01-18',
    lastAccess: undefined
  }
];

const TenantsPage: React.FC = () => {
  const [tenants, setTenants] = useState<TenantConfig[]>(mockTenants);
  const [selectedTenant, setSelectedTenant] = useState<TenantConfig | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'create' | 'edit' | 'view'>('view');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Form state
  const [formData, setFormData] = useState<Partial<TenantConfig>>({});

  const handleCreateTenant = () => {
    setDialogType('create');
    setFormData({
      name: '',
      subdomain: '',
      theme: {
        primaryColor: '#10b981',
        logo: '',
        brandName: ''
      },
      settings: {
        deliveryFee: 39,
        freeDeliveryThreshold: 200,
        serviceFeeRate: 0.02,
        currency: 'THB'
      },
      status: 'pending'
    });
    setDialogOpen(true);
  };

  const handleEditTenant = (tenant: TenantConfig) => {
    setDialogType('edit');
    setSelectedTenant(tenant);
    setFormData(tenant);
    setDialogOpen(true);
  };

  const handleViewTenant = (tenant: TenantConfig) => {
    setDialogType('view');
    setSelectedTenant(tenant);
    setDialogOpen(true);
  };

  const handleSaveTenant = () => {
    if (dialogType === 'create') {
      const newTenant: TenantConfig = {
        ...formData as TenantConfig,
        id: `restaurant${tenants.length + 1}`,
        domain: `${formData.subdomain}.theredpotion.com`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTenants([...tenants, newTenant]);
      setSnackbar({ open: true, message: 'สร้างร้านค้าใหม่สำเร็จ!', severity: 'success' });
    } else if (dialogType === 'edit' && selectedTenant) {
      const updatedTenants = tenants.map(t => 
        t.id === selectedTenant.id ? { ...formData as TenantConfig, id: selectedTenant.id } : t
      );
      setTenants(updatedTenants);
      setSnackbar({ open: true, message: 'อัปเดตข้อมูลร้านค้าสำเร็จ!', severity: 'success' });
    }
    setDialogOpen(false);
  };

  const handleDeleteTenant = (tenantId: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบร้านค้านี้?')) {
      setTenants(tenants.filter(t => t.id !== tenantId));
      setSnackbar({ open: true, message: 'ลบร้านค้าสำเร็จ!', severity: 'success' });
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(`https://${url}`);
    setSnackbar({ open: true, message: 'คัดลอก URL สำเร็จ!', severity: 'success' });
  };

  const handleGenerateLiff = (tenant: TenantConfig) => {
    // Mock LIFF generation
    const mockLiffId = `liff-${Math.random().toString(36).substr(2, 9)}`;
    const updatedTenants = tenants.map(t => 
      t.id === tenant.id ? { ...t, liffId: mockLiffId } : t
    );
    setTenants(updatedTenants);
    setSnackbar({ open: true, message: `สร้าง LIFF ID: ${mockLiffId}`, severity: 'success' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'เปิดใช้งาน';
      case 'inactive': return 'ปิดใช้งาน';
      case 'pending': return 'รอการอนุมัติ';
      default: return status;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          🏪 จัดการร้านค้า (Multi-Tenant)
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateTenant}
          sx={{ borderRadius: 2 }}
        >
          เพิ่มร้านค้าใหม่
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ 
        display: 'flex', 
        gap: 3, 
        mb: 4,
        flexWrap: 'wrap'
      }}>
        <Box sx={{ flex: 1, minWidth: '200px' }}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              {tenants.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ร้านค้าทั้งหมด
            </Typography>
          </Card>
        </Box>
        <Box sx={{ flex: 1, minWidth: '200px' }}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h3" color="success.main" fontWeight="bold">
              {tenants.filter(t => t.status === 'active').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              เปิดใช้งาน
            </Typography>
          </Card>
        </Box>
        <Box sx={{ flex: 1, minWidth: '200px' }}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h3" color="warning.main" fontWeight="bold">
              {tenants.filter(t => t.status === 'pending').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              รอการอนุมัติ
            </Typography>
          </Card>
        </Box>
        <Box sx={{ flex: 1, minWidth: '200px' }}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h3" color="info.main" fontWeight="bold">
              {tenants.filter(t => t.liffId).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              มี LIFF ID
            </Typography>
          </Card>
        </Box>
      </Box>

      {/* Tenants Grid */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3 
      }}>
        {tenants.map((tenant) => (
          <Box key={tenant.id} sx={{ 
            flex: '1 1 300px',
            maxWidth: '400px',
            minWidth: '300px'
          }}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                '&:hover': { boxShadow: 6 }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Header with Status */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" fontWeight="bold">
                    {tenant.theme.brandName}
                  </Typography>
                  <Chip 
                    label={getStatusText(tenant.status)}
                    color={getStatusColor(tenant.status) as any}
                    size="small"
                  />
                </Box>

                {/* Restaurant Info */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  📍 {tenant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  🌐 {tenant.domain}
                </Typography>

                {/* LIFF Status */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    📱 LINE LIFF:
                  </Typography>
                  {tenant.liffId ? (
                    <Chip label={tenant.liffId} size="small" color="success" />
                  ) : (
                    <Chip label="ยังไม่ได้ตั้งค่า" size="small" color="default" />
                  )}
                </Box>

                {/* Settings Preview */}
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                  ⚙️ การตั้งค่า
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  💰 ค่าส่ง: ฿{tenant.settings.deliveryFee}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  🚚 ฟรีส่งเมื่อซื้อครบ: ฿{tenant.settings.freeDeliveryThreshold}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📊 ค่าบริการ: {(tenant.settings.serviceFeeRate * 100).toFixed(1)}%
                </Typography>

                {/* Last Access */}
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                  📅 สร้างเมื่อ: {tenant.createdAt}
                  {tenant.lastAccess && (
                    <><br />🕒 เข้าใช้ล่าสุด: {tenant.lastAccess}</>
                  )}
                </Typography>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleViewTenant(tenant)}
                  sx={{ mr: 1 }}
                >
                  ดูรายละเอียด
                </Button>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditTenant(tenant)}
                  sx={{ mr: 1 }}
                >
                  แก้ไข
                </Button>
                <IconButton
                  size="small"
                  onClick={() => handleCopyUrl(tenant.domain)}
                  title="คัดลอก URL"
                >
                  <CopyIcon />
                </IconButton>
                {!tenant.liffId && (
                  <IconButton
                    size="small"
                    onClick={() => handleGenerateLiff(tenant)}
                    title="สร้าง LIFF"
                    color="primary"
                  >
                    <QrCodeIcon />
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  onClick={() => handleDeleteTenant(tenant.id)}
                  title="ลบร้านค้า"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Dialog for Create/Edit/View */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogType === 'create' && '🏪 เพิ่มร้านค้าใหม่'}
          {dialogType === 'edit' && '✏️ แก้ไขข้อมูลร้านค้า'}
          {dialogType === 'view' && '👁️ รายละเอียดร้านค้า'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 3 
            }}>
              <Box sx={{ flex: '1 1 45%', minWidth: '250px' }}>
                <TextField
                  fullWidth
                  label="ชื่อร้านค้า"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={dialogType === 'view'}
                />
              </Box>
              <Box sx={{ flex: '1 1 45%', minWidth: '250px' }}>
                <TextField
                  fullWidth
                  label="Subdomain"
                  value={formData.subdomain || ''}
                  onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
                  disabled={dialogType === 'view'}
                  helperText="จะสร้าง URL เป็น: {subdomain}.theredpotion.com"
                />
              </Box>
              <Box sx={{ flex: '1 1 45%', minWidth: '250px' }}>
                <TextField
                  fullWidth
                  label="ชื่อแบรนด์"
                  value={formData.theme?.brandName || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    theme: { ...formData.theme!, brandName: e.target.value }
                  })}
                  disabled={dialogType === 'view'}
                />
              </Box>
              <Box sx={{ flex: '1 1 45%', minWidth: '250px' }}>
                <TextField
                  fullWidth
                  label="สีหลัก"
                  type="color"
                  value={formData.theme?.primaryColor || '#10b981'}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    theme: { ...formData.theme!, primaryColor: e.target.value }
                  })}
                  disabled={dialogType === 'view'}
                />
              </Box>
              <Box sx={{ flex: '1 1 45%', minWidth: '250px' }}>
                <TextField
                  fullWidth
                  label="ค่าส่ง (บาท)"
                  type="number"
                  value={formData.settings?.deliveryFee || 39}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    settings: { ...formData.settings!, deliveryFee: Number(e.target.value) }
                  })}
                  disabled={dialogType === 'view'}
                />
              </Box>
              <Box sx={{ flex: '1 1 45%', minWidth: '250px' }}>
                <TextField
                  fullWidth
                  label="ฟรีส่งเมื่อซื้อครบ (บาท)"
                  type="number"
                  value={formData.settings?.freeDeliveryThreshold || 200}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    settings: { ...formData.settings!, freeDeliveryThreshold: Number(e.target.value) }
                  })}
                  disabled={dialogType === 'view'}
                />
              </Box>
              {formData.liffId && (
                <Box sx={{ flex: '1 1 100%' }}>
                  <TextField
                    fullWidth
                    label="LINE LIFF ID"
                    value={formData.liffId || ''}
                    disabled
                    helperText="LIFF ID ที่เชื่อมต่อกับ LINE"
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            ยกเลิก
          </Button>
          {dialogType !== 'view' && (
            <Button 
              onClick={handleSaveTenant}
              variant="contained"
            >
              {dialogType === 'create' ? 'สร้างร้านค้า' : 'บันทึกการเปลี่ยนแปลง'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TenantsPage; 