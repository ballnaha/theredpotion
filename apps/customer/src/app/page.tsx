'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Paper,
  TextField,
  Avatar,
  Chip,
  IconButton,
  InputAdornment,
  Badge,
  Collapse,
  CircularProgress,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { 
  Search,
  Bell,
  ShoppingBag,
  MapPin,
  Heart,
  Home,
  Receipt,
  User,
  MoreHorizontal,
  X,
  Plus,
  Minus,
  Clock,
  Star,
  Trash2
} from 'lucide-react';

import { LocationOn } from '@mui/icons-material';

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [cartCount, setCartCount] = useState(0);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<{[key: string]: boolean}>({});
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [modalQuantity, setModalQuantity] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ป้องกัน hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    
    // Dynamic blur based on scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/menu');
        const result = await response.json();
        
        if (result.success) {
          setMenuItems(result.data);
        } else {
          setError(result.message || 'ไม่สามารถโหลดข้อมูลเมนูได้');
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
        console.error('Error fetching menu items:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isMounted) {
      fetchMenuItems();
    }
  }, [isMounted]);

  const categories = [
    { name: 'Hamburger', emoji: '🍔', color: '#FF6B6B' },
    { name: 'Pizza', emoji: '🍕', color: '#4ECDC4' },
    { name: 'Noodles', emoji: '🍜', color: '#45B7D1' },
    { name: 'Meat', emoji: '🥩', color: '#96CEB4' },
    { name: 'Vegetables', emoji: '🥬', color: '#FFEAA7' },
    { name: 'Dessert', emoji: '🧁', color: '#DDA0DD' },
    { name: 'Drink', emoji: '🍺', color: '#98D8C8' },
    { name: 'More', emoji: '🥮', color: '#F7DC6F' }
  ];

  // Mock add-ons data
  const availableAddOns = [
    { id: 'extra-protein', name: 'เพิ่มโปรตีน', price: 25, description: 'ไข่ดาว หรือ เต้าหู้' },
    { id: 'extra-veggies', name: 'ผักเพิ่ม', price: 15, description: 'ผักใบเขียวมิกซ์' },
    { id: 'extra-sauce', name: 'ซอสพิเศษ', price: 10, description: 'ซอสโฮมเมด' },
    { id: 'extra-nuts', name: 'ถั่วและเมล็ดพืช', price: 20, description: 'อัลมอนด์ เมล็ดเชีย' },
    { id: 'extra-cheese', name: 'ชีสออร์แกนิก', price: 30, description: 'ชีสเฟต้า หรือ โมซาเรลล่า' },
    { id: 'gluten-free-bread', name: 'ขนมปังไร้กลูเตน', price: 35, description: 'ขนมปังธัญพืชพิเศษ' }
  ];

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 300);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchValue('');
  };

  // Generate unique cart key based on item + addons + instructions
  const generateCartKey = (productId: string, addOns: {[key: string]: boolean}, specialInstructions: string) => {
    const addOnKeys = Object.keys(addOns).filter(key => addOns[key]).sort();
    const addOnString = addOnKeys.join(',');
    const instructionsKey = specialInstructions.trim().toLowerCase().replace(/\s+/g, '_');
    return `${productId}_${addOnString}_${instructionsKey}`;
  };

  // Store cart metadata separately
  const [cartMetadata, setCartMetadata] = useState<{[key: string]: {
    productId: string;
    addOns: {[key: string]: boolean};
    specialInstructions: string;
    basePrice: number;
    itemName: string;
  }}>({});

  const addToCart = (productId: string, itemName?: string, quantity: number = 1, addOns: {[key: string]: boolean} = {}, specialInstructions: string = '') => {
    const cartKey = generateCartKey(productId, addOns, specialInstructions);
    const item = menuItems.find(item => item.id === productId);
    const basePrice = item?.price || 0;
    
    setCart(prev => ({
      ...prev,
      [cartKey]: (prev[cartKey] || 0) + quantity
    }));
    
    setCartMetadata(prev => ({
      ...prev,
      [cartKey]: {
        productId,
        addOns,
        specialInstructions,
        basePrice,
        itemName: itemName || item?.name || ''
      }
    }));
    
    setCartCount(prev => prev + quantity);
    
    // Show snackbar notification
    if (itemName) {
      setSnackbarMessage(`เพิ่ม ${itemName} ${quantity > 1 ? `จำนวน ${quantity} ` : ''}ลงตะกร้าแล้ว`);
      setSnackbarOpen(true);
    }
  };

  const removeFromCart = (cartKey: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[cartKey] > 1) {
        newCart[cartKey] -= 1;
      } else {
        delete newCart[cartKey];
        delete cartMetadata[cartKey];
      }
      return newCart;
    });
    setCartCount(prev => prev - 1);
  };

  const handleAddOnChange = (addOnId: string) => {
    setSelectedAddOns(prev => ({
      ...prev,
      [addOnId]: !prev[addOnId]
    }));
  };

  const calculateTotalPrice = () => {
    if (!selectedItem) return 0;
    const basePrice = selectedItem.price || 0;
    const addOnPrice = Object.keys(selectedAddOns)
      .filter(key => selectedAddOns[key])
      .reduce((total, key) => {
        const addOn = availableAddOns.find(addon => addon.id === key);
        return total + (addOn?.price || 0);
      }, 0);
    return (basePrice + addOnPrice) * modalQuantity;
  };

  const resetModalState = () => {
    setSelectedAddOns({});
    setSpecialInstructions('');
    setModalQuantity(1);
  };

  const increaseModalQuantity = () => {
    setModalQuantity(prev => prev + 1);
  };

  const decreaseModalQuantity = () => {
    setModalQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const removeItemFromCart = (cartKey: string) => {
    const itemQuantity = cart[cartKey] || 0;
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[cartKey];
      return newCart;
    });
    setCartMetadata(prev => {
      const newMetadata = { ...prev };
      delete newMetadata[cartKey];
      return newMetadata;
    });
    setCartCount(prev => prev - itemQuantity);
  };

  const increaseCartItem = (cartKey: string) => {
    setCart(prev => ({
      ...prev,
      [cartKey]: (prev[cartKey] || 0) + 1
    }));
    setCartCount(prev => prev + 1);
  };

  // Dynamic blur calculation with SSR safety
  const headerBlur = isMounted ? Math.min(20 + scrollY * 0.1, 40) : 20;
  const headerOpacity = isMounted ? Math.min(0.7 + scrollY * 0.001, 0.95) : 0.7;

  if (!isMounted) {
    return (
      <Box
        sx={{
          height: '100vh',
          background: `
            radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at bottom left, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        background: `
          radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)
        `,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        touchAction: 'pan-y',

        '@keyframes liquidPulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        '@keyframes liquidFloat': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        '@keyframes liquidBlob': {
          '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }
        }
      }}
    >
      {/* Liquid Glass Header */}
      <Paper
        elevation={0}
        sx={{
          position: 'fixed',
          
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: `rgba(255, 255, 255, ${headerOpacity})`,
          backdropFilter: `blur(${headerBlur}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${headerBlur}px) saturate(180%)`,
          borderRadius: '0px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            borderRadius: 'inherit',
          }
        }}
      >
        <Container maxWidth="sm" sx={{ px: 1, position: 'relative', zIndex: 1 }}>
          <Box sx={{ py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: -3,
                      background: 'linear-gradient(135deg, #10b981, #059669, #0891b2)',
                      borderRadius: '50%',

                      opacity: 0.3,
                    }
                  }}
                >
              <Avatar
                sx={{
                      width: 48,
                      height: 48,
                      background: `
                        linear-gradient(135deg, 
                          rgba(16, 185, 129, 0.9) 0%, 
                          rgba(5, 150, 105, 0.9) 50%,
                          rgba(8, 145, 178, 0.9) 100%
                        )
                      `,

                      position: 'relative',
                      zIndex: 1,
                }}
              >
                👨‍🦱
              </Avatar>
                </Box>
              <Box>
                  <Typography variant="caption" sx={{ 
                    color: 'rgba(100, 116, 139, 0.8)', 
                    display: 'block', 
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.5px'
                  }}>
                  จัดส่งที่
                </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" sx={{ 
                      fontWeight: 500, 
                      color: '#0f172a', 
                      fontSize: '13px',
                      letterSpacing: '-0.3px' 
                    }}>
                    <LocationOn sx={{ fontSize: '16px' }}></LocationOn> ศูนย์การค้าที่มหาวิทยาลัยศรีนครินทร์
                  </Typography>
                    
                </Box>
              </Box>
            </Box>
              
            <Box sx={{ display: 'flex', gap: 1 }}>
                {[
                  { icon: <Search size={20} />, action: handleSearchClick },
                  { icon: <Bell size={20} />, action: () => {} },
                  { 
                    icon: (
                      <Box sx={{ position: 'relative' }}>
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                          <Box
                sx={{ 
                              position: 'absolute',
                              top: -8,
                              right: -8,
                              width: 18,
                              height: 18,
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                              color: 'white',
                              fontSize: '11px',
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                              
                            }}
                          >
                            {cartCount}
                          </Box>
                        )}
                      </Box>
                    ), 
                    action: () => setCartDrawerOpen(true)
                  }
                ].map((item, index) => (
                  <Box
                    key={index}
                    onClick={item.action}
                sx={{ 
                      width: 48,
                      height: 48,
                      borderRadius: '16px',
                      background: `
                        linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.25) 0%, 
                          rgba(255, 255, 255, 0.1) 100%
                        )
                      `,
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                        transition: 'left 0.6s ease',
                      },
                      '&:hover': {
                        transform: 'translateY(-2px) scale(1.05)',
                        background: `
                          linear-gradient(135deg, 
                            rgba(255, 255, 255, 0.4) 0%, 
                            rgba(255, 255, 255, 0.2) 100%
                          )
                        `,
                        boxShadow: `
                          0 12px 40px rgba(0, 0, 0, 0.15),
                          inset 0 1px 0 rgba(255, 255, 255, 0.6)
                        `,
                        '&::before': {
                          left: '100%',
                        }
                      },
                      '&:active': { 
                        transform: 'translateY(0px) scale(0.95)',
                        transition: 'all 0.1s ease'
                      }
                    }}
                  >
                    <Box sx={{ color: '#475569', zIndex: 1 }}>
                      {item.icon}
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>

            {/* Liquid Search Bar */}
            <Collapse in={isSearchOpen} timeout={400}>
            <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '20px',
                    background: `
                      linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.4) 0%, 
                        rgba(255, 255, 255, 0.1) 100%
                      )
                    `,
                    backdropFilter: 'blur(40px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 1,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                    }
                  }}
                >
              <TextField
                ref={searchInputRef}
                fullWidth
                placeholder="What are you craving?"
                variant="outlined"
                size="medium"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                          <Search size={20} style={{ color: '#64748b' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                          <Box
                        onClick={handleSearchClose}
                        sx={{ 
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              background: 'rgba(100, 116, 139, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                background: 'rgba(100, 116, 139, 0.2)',
                                transform: 'scale(1.1)',
                              }
                            }}
                          >
                            <X size={16} />
                          </Box>
                    </InputAdornment>
                  ),
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '& input': {
                          padding: '16px 12px',
                          fontSize: '16px',
                          fontWeight: 500,
                        }
                  }
                }}
              />
                </Box>
            </Box>
          </Collapse>
           </Box>
         </Container>
       </Paper>

       {/* Scrollable Content */}
       <Container 
         maxWidth="sm" 
         sx={{ 
           flex: 1,
           overflow: 'auto',
          pt: 18,
          pb: 14,
          px: 1,
           position: 'relative',
           zIndex: 1,
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Liquid Special Offers */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 900, 
              color: '#0f172a', 
              fontSize: '22px',
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Special Offers
            </Typography>
            <Box
              sx={{
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '12px',
                background: `
                  linear-gradient(135deg, 
                    rgba(16, 185, 129, 0.1) 0%, 
                    rgba(5, 150, 105, 0.05) 100%
                  )
                `,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  background: `
                    linear-gradient(135deg, 
                      rgba(16, 185, 129, 0.2) 0%, 
                      rgba(5, 150, 105, 0.1) 100%
                    )
                  `,
                }
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#10b981', 
                  fontWeight: 800,
                  fontSize: '13px',
                  letterSpacing: '0.5px'
                }}
              >
              See All
            </Typography>
            </Box>
          </Box>

          {/* Liquid Offer Card */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: '28px',
              background: `
                linear-gradient(135deg, 
                  rgba(16, 185, 129, 0.95) 0%, 
                  rgba(5, 150, 105, 0.95) 50%,
                  rgba(8, 145, 178, 0.95) 100%
                )
              `,
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: 'liquidFloat 6s ease-in-out infinite',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                borderRadius: 'inherit',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                background: 'linear-gradient(135deg, #ffffff40, #ffffff20, #ffffff40)',
                borderRadius: 'inherit',
                zIndex: -1,
                opacity: 0,
                transition: 'opacity 0.3s ease',
              },
              '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: `
                  0 25px 60px rgba(16, 185, 129, 0.4),
                  0 0 0 1px rgba(255, 255, 255, 0.1)
                `,
                '&::after': {
                  opacity: 1,
                }
              },
              '&:active': {
                transform: 'translateY(-4px) scale(0.98)',
                transition: 'all 0.2s ease'
              }
            }}
          >
            <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h2" sx={{ 
                    color: 'white', 
                    fontWeight: 900, 
                    mb: 1, 
                    fontSize: '42px',
                    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    letterSpacing: '-1px'
                  }}>
                    30%
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: 'white', 
                    fontWeight: 800, 
                    mb: 0.5, 
                    fontSize: '17px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    letterSpacing: '1px'
                  }}>
                    DISCOUNT ONLY
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: 'white', 
                    fontWeight: 800, 
                    fontSize: '17px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    letterSpacing: '1px'
                  }}>
                    VALID FOR TODAY!
                  </Typography>
                </Box>
                <Box sx={{ 
                  fontSize: '96px', 
                  filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))'
                }}>
                  🍔
                </Box>
              </Box>
            </CardContent>
          </Box>
        </Box>

        {/* Liquid Categories */}
        <Box sx={{ mb: 5 }}>
         <Box sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'space-between'
         }}>
           {categories.map((category, index) => (
              <Box
               key={index}
                onMouseEnter={() => setActiveCategory(index)}
                onMouseLeave={() => setActiveCategory(null)}
               sx={{
                  width: 'calc(25% - 12px)',
                  minWidth: '75px',
                  aspectRatio: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '24px',
                  background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, ${activeCategory === index ? '0.5' : '0.25'}) 0%, 
                      rgba(255, 255, 255, ${activeCategory === index ? '0.3' : '0.1'}) 100%
                    )
                  `,
                  backdropFilter: `blur(${activeCategory === index ? '30px' : '20px'}) saturate(180%)`,
                  WebkitBackdropFilter: `blur(${activeCategory === index ? '30px' : '20px'}) saturate(180%)`,
                  border: `1px solid ${activeCategory === index ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'}`,
                 cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                 '&:hover': {
                    opacity: 0.9,
                  },
                  '&:active': {
                    opacity: 0.7,
                  }
                }}
              >
                <Typography sx={{ 
                  fontSize: '36px', 
                  mb: 1,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                }}>
                 {category.emoji}
               </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontWeight: 800, 
                    color: '#334155',
                    fontSize: '11px',
                    textAlign: 'center',
                    lineHeight: 1.2,
                    letterSpacing: '0.5px',
                    textShadow: '0 1px 2px rgba(255,255,255,0.8)'
                  }}
                >
                 {category.name}
               </Typography>
              </Box>
           ))}
          </Box>
         </Box>

        {/* Menu Items from Database */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              color: '#0f172a', 
              fontSize: '22px',
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              เมนูอาหารสุขภาพ
            </Typography>
            <Box
              sx={{
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '12px',
                background: `
                  linear-gradient(135deg, 
                    rgba(16, 185, 129, 0.1) 0%, 
                    rgba(5, 150, 105, 0.05) 100%
                  )
                `,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  background: `
                    linear-gradient(135deg, 
                      rgba(16, 185, 129, 0.2) 0%, 
                      rgba(5, 150, 105, 0.1) 100%
                    )
                  `,
                }
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#10b981', 
                  fontWeight: 500,
                  fontSize: '13px',
                  letterSpacing: '0.5px'
                }}
              >
                ดูทั้งหมด
              </Typography>
            </Box>
          </Box>

          {/* Loading State */}
          {loading && (
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 3,
              '@media (max-width: 640px)': {
                gridTemplateColumns: '1fr',
                gap: 2,
              }
            }}>
              {[1, 2, 3, 4].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    borderRadius: '24px',
                    background: `
                      linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.4) 0%, 
                        rgba(255, 255, 255, 0.2) 100%
                      )
                    `,
                    backdropFilter: 'blur(30px) saturate(180%)',
                    height: 320,

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography sx={{ color: '#64748b', fontSize: '48px' }}>
                    ⏳
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Box sx={{ 
              textAlign: 'center', 
              py: 4,
              borderRadius: '24px',
              background: `
                linear-gradient(135deg, 
                  rgba(239, 68, 68, 0.1) 0%, 
                  rgba(220, 38, 38, 0.05) 100%
                )
              `,
              backdropFilter: 'blur(30px) saturate(180%)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}>
              <Typography sx={{ fontSize: '48px', mb: 2 }}>😔</Typography>
              <Typography variant="h6" sx={{ color: '#ef4444', fontWeight: 700, mb: 1 }}>
                เกิดข้อผิดพลาด
              </Typography>
              <Typography sx={{ color: '#64748b' }}>
                {error}
              </Typography>
            </Box>
          )}

          {/* Menu Items from Database */}
          {!loading && !error && (
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 3,
              '@media (max-width: 640px)': {
                gridTemplateColumns: '1fr',
                gap: 2,
              }
            }}>
              {menuItems.length === 0 ? (
                <Box sx={{ 
                  gridColumn: '1 / -1',
                  textAlign: 'center', 
                  py: 4,
                  borderRadius: '24px',
                  background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.4) 0%, 
                      rgba(255, 255, 255, 0.2) 100%
                    )
                  `,
                  backdropFilter: 'blur(30px) saturate(180%)',
                }}>
                  <Typography sx={{ fontSize: '48px', mb: 2 }}>🍽️</Typography>
                  <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 700 }}>
                    ยังไม่มีเมนูอาหาร
                  </Typography>
                </Box>
              ) : (
                menuItems.map((food, index) => (
                  <Box
                    key={food.id}
                    onClick={() => {
                      setSelectedItem(food);
                      setModalOpen(true);
                    }}
                    sx={{
                      borderRadius: '24px',
                      background: `
                        linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.3) 0%, 
                          rgba(255, 255, 255, 0.1) 100%
                        )
                      `,
                      backdropFilter: 'blur(30px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'opacity 0.2s ease',
                      position: 'relative',
                      '&:hover': {
                        opacity: 0.9,
                      },
                      '&:active': {
                        opacity: 0.7,
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                      {/* Category Badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          background: food.isVegan ? 'linear-gradient(135deg, #10b981, #059669)' : food.isGlutenFree ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                          color: 'white',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 500,
                          zIndex: 2,
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {food.isVegan ? 'VEGAN' : food.isGlutenFree ? 'GLUTEN FREE' : 'HEALTHY'}
                      </Box>
                      
                      {/* Rating Badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          background: 'rgba(0, 0, 0, 0.6)',
                          color: 'white',
                          px: 1,
                          py: 0.5,
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: 500,
                          zIndex: 2,
                          backdropFilter: 'blur(10px)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        ⭐ {food.rating}
                      </Box>

                      {/* Food Image */}
                      {food.imageUrl ? (
                        <img
                          src={food.imageUrl}
                          alt={food.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '64px',
                            filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))',
                          }}
                        >
                          {food.emoji || '🍽️'}
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 500, 
                        color: '#0f172a', 
                        mb: 0.5, 
                        fontSize: '16px',
                        letterSpacing: '-0.3px'
                      }}>
                        {food.name}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: '#64748b', 
                        mb: 2, 
                        fontSize: '13px',
                        lineHeight: 1.4,
                        fontWeight: 400
                      }}>
                        {food.description}
                      </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 700, 
                            color: '#10b981',
                            fontSize: '18px',
                            letterSpacing: '-0.5px'
                          }}>
                            ฿{food.price?.toFixed(0)}
                          </Typography>
                          {food.originalPrice && food.discountPercent && (
                            <>
                              <Typography variant="caption" sx={{ 
                                color: '#94a3b8',
                                fontSize: '13px',
                                textDecoration: 'line-through',
                                fontWeight: 400
                              }}>
                                ฿{food.originalPrice?.toFixed(0)}
                              </Typography>
                              <Typography variant="caption" sx={{ 
                                color: '#ef4444',
                                fontSize: '11px',
                                fontWeight: 600,
                                background: 'rgba(239, 68, 68, 0.1)',
                                px: 1,
                                py: 0.25,
                                borderRadius: '6px'
                              }}>
                                -{food.discountPercent}%
                              </Typography>
                            </>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          
                          <Typography variant="caption" sx={{ 
                            color: '#10b981',
                            fontSize: '10px',
                            fontWeight: 400,
                            background: 'rgba(16, 185, 129, 0.1)',
                            px: 1,
                            py: 0.25,
                            borderRadius: '6px'
                          }}>
                            ⭐ {food.restaurant?.rating}
                          </Typography>
                        </Box>
                      </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          {food.calories && (
                            <Typography variant="caption" sx={{ 
                              color: '#10b981',
                              fontSize: '11px',
                              fontWeight: 400,
                              background: 'rgba(16, 185, 129, 0.1)',
                              px: 1,
                              py: 0.25,
                              borderRadius: '6px'
                            }}>
                              {food.calories} cal
                            </Typography>
                          )}
                          {food.preparationTime && (
                            <Typography variant="caption" sx={{ 
                              color: '#64748b',
                              fontSize: '11px',
                              fontWeight: 400
                            }}>
                              ⏱️ {food.preparationTime} นาที
                            </Typography>
                          )}
                        </Box>
                        
                        {/* แสดงจำนวนสินค้าในตะกร้า (ถ้ามี) แต่ไม่ให้กดเปลี่ยนจำนวนได้ */}
                        {cart[food.id] > 0 && (
                          <Box sx={{ 
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            px: 2,
                            py: 0.5,
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 500
                          }}>
                            ในตะกร้า {cart[food.id]}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          )}
        </Box>

        {/* Liquid Discount Cards */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 900, 
                color: '#0f172a', 
                fontSize: '22px',
                letterSpacing: '-0.5px',
                background: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Discount Guaranteed!
              </Typography>
              <Typography sx={{ 
                fontSize: '28px'
              }}>
                💰
              </Typography>
            </Box>
            <Box
              sx={{
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '12px',
                background: `
                  linear-gradient(135deg, 
                    rgba(16, 185, 129, 0.1) 0%, 
                    rgba(5, 150, 105, 0.05) 100%
                  )
                `,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  background: `
                    linear-gradient(135deg, 
                      rgba(16, 185, 129, 0.2) 0%, 
                      rgba(5, 150, 105, 0.1) 100%
                    )
                  `,
                }
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#10b981', 
                  fontWeight: 800,
                  fontSize: '13px',
                  letterSpacing: '0.5px'
                }}
              >
                See All
              </Typography>
            </Box>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            overflowX: 'auto',
            pb: 3,
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': { display: 'none' }
          }}>
            {[
              { name: 'Fresh Salad Bowl', desc: 'Healthy & Delicious', emoji: '🥗', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
              { name: 'Breakfast Special', desc: 'Start your day right', emoji: '🍳', gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)' }
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: 220,
                  maxWidth: 220,
                  scrollSnapAlign: 'start',
                  borderRadius: '24px',
                  background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.3) 0%, 
                      rgba(255, 255, 255, 0.1) 100%
                    )
                  `,
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                  position: 'relative',
                  '&:hover': {
                    opacity: 0.9,
                  },
                  '&:active': {
                    opacity: 0.7,
                  }
                }}
              >
                <Box sx={{ position: 'relative', height: 140, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      background: item.gradient,
                      color: 'white',
                      px: 2,
                      py: 1,
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: 800,
                      zIndex: 2,
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                      letterSpacing: '0.5px'
                    }}
                  >
                    PROMO
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: item.gradient + '20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '64px',
                      filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))',
                      animation: 'none'
                    }}
                  >
                    {item.emoji}
                  </Box>
                </Box>
                <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                  <Typography variant="body2" sx={{ 
                    fontWeight: 800, 
                    color: '#0f172a', 
                    mb: 0.5, 
                    fontSize: '15px',
                    letterSpacing: '-0.2px'
                  }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: '#64748b', 
                    fontSize: '13px',
                    fontWeight: 500
                  }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Bottom Drawer Modal */}
      {modalOpen && selectedItem && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.3s ease-out',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 }
            }
          }}
          onClick={() => setModalOpen(false)}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'white',
              borderRadius: '24px 24px 0 0',
              maxHeight: '80vh',
              overflowY: 'auto',
              transform: 'translateY(0)',
              animation: 'slideUp 0.3s ease-out',
              '@keyframes slideUp': {
                from: { transform: 'translateY(100%)' },
                to: { transform: 'translateY(0)' }
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Handle */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              pt: 2, 
              pb: 1 
            }}>
              <Box sx={{
                width: 40,
                height: 4,
                background: '#e2e8f0',
                borderRadius: 2
              }} />
            </Box>

            {/* Modal Content */}
            <Box sx={{ p: 3 }}>
              {/* Food Image */}
              <Box sx={{ 
                position: 'relative',
                width: '100%',
                height: 200,
                mb: 3,
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                {selectedItem.imageUrl ? (
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <Box sx={{ 
                    textAlign: 'center', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
                    fontSize: '80px'
                  }}>
                    {selectedItem.emoji || '🍽️'}
                  </Box>
                )}
                
                {/* Rating Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    px: 2,
                    py: 1,
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  ⭐ {selectedItem.rating} ({selectedItem.reviewCount} รีวิว)
                </Box>
              </Box>

              {/* Food Info */}
              <Typography variant="h5" sx={{ 
                fontWeight: 600, 
                color: '#0f172a', 
                mb: 1,
                textAlign: 'center'
              }}>
                {selectedItem.name}
              </Typography>

              <Typography variant="body1" sx={{ 
                color: '#64748b', 
                mb: 3,
                textAlign: 'center',
                lineHeight: 1.6,
                fontWeight: 400
              }}>
                {selectedItem.description}
              </Typography>

              {/* Price and Restaurant */}
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                py: 2,
                px: 3,
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
                borderRadius: '16px'
              }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 700, 
                      color: '#10b981'
                    }}>
                      ฿{selectedItem.price?.toFixed(0)}
                    </Typography>
                    {selectedItem.originalPrice && selectedItem.discountPercent && (
                      <>
                        <Typography variant="body2" sx={{ 
                          color: '#94a3b8',
                          fontSize: '16px',
                          textDecoration: 'line-through',
                          fontWeight: 400
                        }}>
                          ฿{selectedItem.originalPrice?.toFixed(0)}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: '#ef4444',
                          fontSize: '12px',
                          fontWeight: 600,
                          background: 'rgba(239, 68, 68, 0.15)',
                          px: 2,
                          py: 0.5,
                          borderRadius: '8px'
                        }}>
                          ลด {selectedItem.discountPercent}%
                        </Typography>
                      </>
                    )}
                  </Box>
                  {selectedItem.originalPrice && selectedItem.discountPercent && (
                    <Typography variant="caption" sx={{ 
                      color: '#10b981',
                      fontSize: '12px',
                      fontWeight: 500
                    }}>
                      ประหยัด ฿{(selectedItem.originalPrice - selectedItem.price).toFixed(0)}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  
                  <Typography variant="caption" sx={{ 
                    color: '#64748b',
                    fontWeight: 400
                  }}>
                    🚚 {selectedItem.restaurant?.deliveryTime}
                  </Typography>
                </Box>
              </Box>

              {/* Nutritional Info */}
              {selectedItem.nutritionalInfo && (
                <Box sx={{ 
                  mb: 3,
                  p: 3,
                  background: '#f8fafc',
                  borderRadius: '16px'
                }}>
                  <Typography variant="body2" sx={{ 
                    fontWeight: 500, 
                    color: '#0f172a',
                    mb: 2,
                    textAlign: 'center'
                  }}>
                    ข้อมูลโภชนาการ
                  </Typography>
                  <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 2
                  }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        color: '#10b981',
                        fontSize: '16px'
                      }}>
                        {selectedItem.nutritionalInfo.protein}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: '#64748b',
                        fontWeight: 400
                      }}>
                        โปรตีน
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        color: '#f59e0b',
                        fontSize: '16px'
                      }}>
                        {selectedItem.nutritionalInfo.carbs}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: '#64748b',
                        fontWeight: 400
                      }}>
                        คาร์บ
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        color: '#ef4444',
                        fontSize: '16px'
                      }}>
                        {selectedItem.nutritionalInfo.fat}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: '#64748b',
                        fontWeight: 400
                      }}>
                        ไขมัน
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        color: '#8b5cf6',
                        fontSize: '16px'
                      }}>
                        {selectedItem.nutritionalInfo.fiber}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: '#64748b',
                        fontWeight: 400
                      }}>
                        ไฟเบอร์
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Additional Details */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                mb: 4,
                py: 3,
                background: '#f8fafc',
                borderRadius: '16px'
              }}>
                {selectedItem.calories && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '24px', mb: 1 }}>🔥</Typography>
                    <Typography variant="caption" sx={{ 
                      color: '#64748b',
                      fontWeight: 400
                    }}>
                      {selectedItem.calories} cal
                    </Typography>
                  </Box>
                )}
                {selectedItem.preparationTime && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '24px', mb: 1 }}>⏱️</Typography>
                    <Typography variant="caption" sx={{ 
                      color: '#64748b',
                      fontWeight: 400
                    }}>
                      {selectedItem.preparationTime} นาที
                    </Typography>
                  </Box>
                )}
                {selectedItem.isVegan && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '24px', mb: 1 }}>🌱</Typography>
                                         <Typography variant="caption" sx={{ 
                       color: '#64748b',
                       fontWeight: 400
                     }}>
                       Vegan
                     </Typography>
                  </Box>
                )}
                {selectedItem.isGlutenFree && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '24px', mb: 1 }}>🌾</Typography>
                                         <Typography variant="caption" sx={{ 
                       color: '#64748b',
                       fontWeight: 400
                     }}>
                       Gluten Free
                     </Typography>
                  </Box>
                )}
              </Box>

              {/* Add-ons Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  color: '#0f172a',
                  mb: 1,
                  textAlign: 'center'
                }}>
                  เสริมเพิ่มเติม
                </Typography>
                
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}>
                  {availableAddOns.map((addOn) => (
                    <Box
                      key={addOn.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1,
                        background: selectedAddOns[addOn.id] 
                          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))'
                          : '#f8fafc',
                        borderRadius: '16px',
                        border: selectedAddOns[addOn.id] 
                          ? '2px solid rgba(16, 185, 129, 0.3)'
                          : '2px solid transparent',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleAddOnChange(addOn.id)}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 500,
                          color: '#0f172a',
                          mb: 0.5
                        }}>
                          {addOn.name}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: '#64748b',
                          fontWeight: 400
                        }}>
                          {addOn.description}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                      }}>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 600,
                          color: '#10b981'
                        }}>
                          +฿{addOn.price}
                        </Typography>
                        
                        <Checkbox
                          checked={selectedAddOns[addOn.id] || false}
                          onChange={() => handleAddOnChange(addOn.id)}
                          sx={{
                            color: '#10b981',
                            '&.Mui-checked': {
                              color: '#10b981',
                            },
                            padding: 0
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Special Instructions */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  color: '#0f172a',
                  mb: 2,
                  textAlign: 'center'
                }}>
                  คำขอพิเศษ
                </Typography>
                
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="เช่น ไม่เอาผัก, เผ็ดน้อย, ปรุงรสจืด..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '16px',
                      background: '#f8fafc',
                      '& fieldset': {
                        border: '2px solid transparent',
                      },
                      '&:hover fieldset': {
                        border: '2px solid rgba(16, 185, 129, 0.2)',
                      },
                      '&.Mui-focused fieldset': {
                        border: '2px solid rgba(16, 185, 129, 0.5)',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontFamily: 'Prompt',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#0f172a'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#94a3b8',
                      opacity: 1
                    }
                  }}
                />
              </Box>

              {/* Add to Cart Section */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mb: 3
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 500, 
                  color: '#0f172a' 
                }}>
                  จำนวน
                </Typography>
                
                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                   <Box
                     onClick={decreaseModalQuantity}
                     sx={{
                       width: 40,
                       height: 40,
                       borderRadius: '50%',
                       background: modalQuantity > 1 ? 'linear-gradient(135deg, #ef4444, #dc2626)' : '#e2e8f0',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       cursor: modalQuantity > 1 ? 'pointer' : 'not-allowed',
                       color: modalQuantity > 1 ? 'white' : '#94a3b8',
                       fontSize: '18px',
                       fontWeight: 800,
                       transition: 'opacity 0.2s ease',
                       opacity: modalQuantity > 1 ? 1 : 0.5,
                       userSelect: 'none',
                       WebkitTapHighlightColor: 'transparent',
                       WebkitTouchCallout: 'none',
                       '&:hover': { 
                         opacity: modalQuantity > 1 ? 0.9 : 0.5,
                       },
                       '&:active': { 
                         opacity: modalQuantity > 1 ? 0.7 : 0.5,
                         transform: 'scale(0.98)'
                       },
                       '&:focus': {
                         outline: 'none',
                         boxShadow: 'none'
                       }
                     }}
                   >
                     -
                   </Box>
                   
                   <Typography sx={{ 
                     fontWeight: 800, 
                     color: '#0f172a',
                     minWidth: '40px',
                     textAlign: 'center',
                     fontSize: '18px'
                   }}>
                     {modalQuantity}
                   </Typography>
                   
                   <Box
                     onClick={increaseModalQuantity}
                     sx={{
                       width: 40,
                       height: 40,
                       borderRadius: '50%',
                       background: 'linear-gradient(135deg, #10b981, #059669)',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       cursor: 'pointer',
                       color: 'white',
                       fontSize: '18px',
                       fontWeight: 800,
                       transition: 'opacity 0.2s ease',
                       userSelect: 'none',
                       WebkitTapHighlightColor: 'transparent',
                       WebkitTouchCallout: 'none',
                       '&:hover': { 
                         opacity: 0.9,
                       },
                       '&:active': { 
                         opacity: 0.7,
                         transform: 'scale(0.98)'
                       },
                       '&:focus': {
                         outline: 'none',
                         boxShadow: 'none'
                       }
                     }}
                   >
                     +
                   </Box>
                 </Box>
              </Box>

                             {/* Total Price Summary */}
               <Box sx={{ 
                 mb: 3,
                 p: 3,
                 background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
                 borderRadius: '16px',
                 border: '2px solid rgba(16, 185, 129, 0.2)'
               }}>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                   <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 400 }}>
                     ราคาเมนู {modalQuantity > 1 ? `x ${modalQuantity}` : ''}
                   </Typography>
                   <Typography variant="body2" sx={{ color: '#0f172a', fontWeight: 500 }}>
                     ฿{((selectedItem.price || 0) * modalQuantity).toFixed(0)}
                   </Typography>
                 </Box>
                 
                 {Object.keys(selectedAddOns).filter(key => selectedAddOns[key]).map(key => {
                   const addOn = availableAddOns.find(addon => addon.id === key);
                   return addOn ? (
                     <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                       <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 400 }}>
                         + {addOn.name} {modalQuantity > 1 ? `x ${modalQuantity}` : ''}
                       </Typography>
                       <Typography variant="body2" sx={{ color: '#0f172a', fontWeight: 500 }}>
                         ฿{(addOn.price * modalQuantity).toFixed(0)}
                       </Typography>
                     </Box>
                   ) : null;
                 })}
                 
                 <Divider sx={{ my: 2 }} />
                 
                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                   <Typography variant="h6" sx={{ color: '#0f172a', fontWeight: 600 }}>
                     ราคารวม
                   </Typography>
                   <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 700 }}>
                     ฿{calculateTotalPrice().toFixed(0)}
                   </Typography>
                 </Box>
               </Box>

              {/* Add to Cart Button */}
               <Box
                 onClick={() => {
                   addToCart(selectedItem.id, selectedItem.name, modalQuantity, selectedAddOns, specialInstructions);
                   resetModalState();
                   setModalOpen(false);
                 }}
                 sx={{
                   width: '100%',
                   py: 2,
                   borderRadius: '16px',
                   background: 'linear-gradient(135deg, #10b981, #059669)',
                   color: 'white',
                   textAlign: 'center',
                   cursor: 'pointer',
                   transition: 'opacity 0.2s ease',
                   userSelect: 'none',
                   WebkitTapHighlightColor: 'transparent',
                   WebkitTouchCallout: 'none',
                   '&:hover': {
                     opacity: 0.9,
                   },
                   '&:active': {
                     opacity: 0.7,
                     transform: 'scale(0.98)'
                   },
                   '&:focus': {
                     outline: 'none',
                     boxShadow: 'none'
                   }
                 }}
               >
                 <Typography variant="h6" sx={{ 
                   fontWeight: 800,
                   fontSize: '16px'
                 }}>
                   {isMounted && cart[selectedItem.id] ? `อัพเดทตะกร้า ฿${calculateTotalPrice().toFixed(0)}` : `เพิ่มลงตะกร้า ฿${calculateTotalPrice().toFixed(0)}`}
                 </Typography>
               </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Liquid Glass Bottom Navigation */}
      <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
          zIndex: 1000,
          padding: '0 8px 8px',
        }}
      >
        <Box
          sx={{
            borderRadius: '32px',
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.4) 0%, 
                rgba(255, 255, 255, 0.2) 100%
              )
            `,
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -1,
              left: '20%',
              right: '20%',
              height: 4,
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '2px',
            }
          }}
        >
        <Container maxWidth="sm" sx={{ px: 1, position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 1 }}>
              {[
                { icon: <Home size={24} />, label: 'Home', active: true },
                { icon: <Search size={24} />, label: 'Search' },
                { icon: <Heart size={24} />, label: 'Favorites' },
                { icon: <Receipt size={24} />, label: 'Orders' },
                { icon: <User size={24} />, label: 'Profile' }
              ].map((item, index) => (
                <Box 
                  key={index} 
                    sx={{
                    textAlign: 'center', 
                    minWidth: 60,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:active': { transform: 'scale(0.9)' }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '20px',
                      background: item.active ? `
                        linear-gradient(135deg, 
                          rgba(16, 185, 129, 0.25) 0%, 
                          rgba(5, 150, 105, 0.15) 100%
                        )
                      ` : 'transparent',
                      backdropFilter: item.active ? 'blur(20px)' : 'none',
                      border: item.active ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
                      margin: '0 auto 6px',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      color: item.active ? '#10b981' : '#64748b',
                      boxShadow: item.active ? '0 8px 25px rgba(16, 185, 129, 0.3)' : 'none',
                      transform: item.active ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      color: item.active ? '#10b981' : '#64748b',
                      fontWeight: item.active ? 800 : 600,
                      fontSize: '11px',
                      letterSpacing: '0.3px',
                      textShadow: item.active ? '0 1px 2px rgba(16, 185, 129, 0.3)' : 'none'
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
               </Container>
        </Box>
      </Box>

      {/* Cart Drawer */}
      {cartDrawerOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.3s ease-out',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 }
            }
          }}
          onClick={() => setCartDrawerOpen(false)}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'white',
              borderRadius: '24px 24px 0 0',
              maxHeight: '85vh',
              overflowY: 'auto',
              transform: 'translateY(0)',
              animation: 'slideUp 0.3s ease-out',
              '@keyframes slideUp': {
                from: { transform: 'translateY(100%)' },
                to: { transform: 'translateY(0)' }
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          pt: 2, 
          pb: 1 
        }}>
          <Box sx={{
            width: 40,
            height: 4,
            background: '#e2e8f0',
            borderRadius: 2
          }} />
        </Box>

        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 600, 
            color: '#0f172a', 
            mb: 3,
            textAlign: 'center'
          }}>
            ตะกร้าสินค้า
          </Typography>

          {cartCount === 0 ? (
            <Box sx={{ 
              textAlign: 'center',
              py: 8
            }}>
              <Typography sx={{ fontSize: '80px', mb: 2 }}>🛒</Typography>
              <Typography variant="h6" sx={{ 
                color: '#64748b',
                fontWeight: 500,
                mb: 1
              }}>
                ตะกร้าของคุณยังว่างเปล่า
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#94a3b8',
                fontWeight: 400
              }}>
                เริ่มเลือกอาหารอร่อย ๆ กันเถอะ!
              </Typography>
            </Box>
          ) : (
            <>
              <List sx={{ mb: 3 }}>
                {Object.entries(cart).map(([cartKey, quantity]) => {
                  const metadata = cartMetadata[cartKey];
                  if (!metadata) return null;
                  const item = menuItems.find(item => item.id === metadata.productId);
                  if (!item) return null;
                  
                  return (
                    <ListItem
                      key={cartKey}
                      sx={{
                        mb: 2,
                        p: 3,
                        background: '#f8fafc',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        gap: 3
                      }}>
                        {/* Item Image */}
                        <Box sx={{ 
                          width: 60,
                          height: 60,
                          borderRadius: '12px',
                          overflow: 'hidden',
                          flexShrink: 0
                        }}>
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          ) : (
                            <Box sx={{ 
                              width: '100%',
                              height: '100%',
                              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '24px'
                            }}>
                              {item.emoji || '🍽️'}
                            </Box>
                          )}
                        </Box>

                        {/* Item Details */}
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                            <Typography variant="body1" sx={{ 
                              fontWeight: 500,
                              color: '#0f172a',
                              flex: 1
                            }}>
                              {item.name}
                            </Typography>
                            <Box
                              onClick={() => removeItemFromCart(cartKey)}
                              sx={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                background: '#fee2e2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#ef4444',
                                transition: 'all 0.2s ease',
                                userSelect: 'none',
                                WebkitTapHighlightColor: 'transparent',
                                '&:hover': {
                                  background: '#fecaca',
                                  transform: 'scale(1.1)'
                                },
                                '&:active': {
                                  transform: 'scale(0.95)'
                                }
                              }}
                            >
                              <Trash2 size={12} />
                            </Box>
                          </Box>
                          <Typography variant="body2" sx={{ 
                            color: '#64748b',
                            fontWeight: 400,
                            mb: 1
                          }}>
                            ฿{item.price?.toFixed(0)} x {quantity}
                          </Typography>
                          
                          {/* Add-ons Display */}
                          {Object.keys(metadata.addOns).filter(key => metadata.addOns[key]).length > 0 && (
                            <Box sx={{ mb: 1 }}>
                              {Object.keys(metadata.addOns).filter(key => metadata.addOns[key]).map(addOnId => {
                                const addOn = availableAddOns.find(a => a.id === addOnId);
                                return addOn ? (
                                  <Chip
                                    key={addOnId}
                                    label={`+ ${addOn.name} (฿${addOn.price})`}
                                    size="small"
                                    sx={{
                                      fontSize: '10px',
                                      height: '20px',
                                      mr: 0.5,
                                      mb: 0.5,
                                      background: 'rgba(16, 185, 129, 0.1)',
                                      color: '#10b981',
                                      border: '1px solid rgba(16, 185, 129, 0.2)'
                                    }}
                                  />
                                ) : null;
                              })}
                            </Box>
                          )}
                          
                          {/* Special Instructions Display */}
                          {metadata.specialInstructions && (
                            <Typography variant="caption" sx={{ 
                              color: '#94a3b8',
                              fontStyle: 'italic',
                              fontSize: '11px',
                              display: 'block'
                            }}>
                              หมายเหตุ: {metadata.specialInstructions}
                            </Typography>
                          )}
                          
                          {/* Quantity Controls */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                              onClick={() => quantity > 1 && removeFromCart(cartKey)}
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                background: quantity > 1 ? 'linear-gradient(135deg, #ef4444, #dc2626)' : '#e2e8f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: quantity > 1 ? 'pointer' : 'not-allowed',
                                color: quantity > 1 ? 'white' : '#94a3b8',
                                fontSize: '14px',
                                fontWeight: 800,
                                transition: 'opacity 0.2s ease',
                                opacity: quantity > 1 ? 1 : 0.5,
                                userSelect: 'none',
                                WebkitTapHighlightColor: 'transparent',
                                '&:hover': { 
                                  opacity: quantity > 1 ? 0.9 : 0.5,
                                },
                                '&:active': { 
                                  opacity: quantity > 1 ? 0.7 : 0.5,
                                  transform: quantity > 1 ? 'scale(0.95)' : 'none'
                                }
                              }}
                            >
                              -
                            </Box>
                            
                            <Typography sx={{ 
                              fontWeight: 600,
                              color: '#0f172a',
                              minWidth: '24px',
                              textAlign: 'center'
                            }}>
                              {quantity}
                            </Typography>
                            
                            <Box
                              onClick={() => increaseCartItem(cartKey)}
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 800,
                                transition: 'transform 0.2s ease',
                                userSelect: 'none',
                                WebkitTapHighlightColor: 'transparent',
                                '&:active': { 
                                  transform: 'scale(0.95)'
                                }
                              }}
                            >
                              +
                            </Box>
                          </Box>
                        </Box>

                        {/* Total Price */}
                        <Typography variant="h6" sx={{ 
                          fontWeight: 700,
                          color: '#10b981'
                        }}>
                          ฿{(() => {
                            const basePrice = item.price || 0;
                            const addOnPrice = Object.keys(metadata.addOns)
                              .filter(key => metadata.addOns[key])
                              .reduce((total, key) => {
                                const addOn = availableAddOns.find(addon => addon.id === key);
                                return total + (addOn?.price || 0);
                              }, 0);
                            return ((basePrice + addOnPrice) * quantity).toFixed(0);
                          })()}
                        </Typography>
                      </Box>
                    </ListItem>
                  );
                })}
              </List>

              {/* Cart Summary */}
              <Box sx={{ 
                p: 3,
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
                borderRadius: '16px',
                border: '2px solid rgba(16, 185, 129, 0.2)',
                mb: 3
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 400 }}>
                    รวมจำนวน {cartCount} รายการ
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#0f172a', fontWeight: 600 }}>
                    ฿{Object.entries(cart).reduce((total, [cartKey, quantity]) => {
                      const metadata = cartMetadata[cartKey];
                      if (!metadata) return total;
                      const item = menuItems.find(item => item.id === metadata.productId);
                      if (!item) return total;
                      const basePrice = item.price || 0;
                      const addOnPrice = Object.keys(metadata.addOns)
                        .filter(key => metadata.addOns[key])
                        .reduce((sum, key) => {
                          const addOn = availableAddOns.find(addon => addon.id === key);
                          return sum + (addOn?.price || 0);
                        }, 0);
                      return total + ((basePrice + addOnPrice) * quantity);
                    }, 0).toFixed(0)}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ color: '#0f172a', fontWeight: 600 }}>
                    ยอดรวมทั้งหมด
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#10b981', fontWeight: 700 }}>
                    ฿{Object.entries(cart).reduce((total, [cartKey, quantity]) => {
                      const metadata = cartMetadata[cartKey];
                      if (!metadata) return total;
                      const item = menuItems.find(item => item.id === metadata.productId);
                      if (!item) return total;
                      const basePrice = item.price || 0;
                      const addOnPrice = Object.keys(metadata.addOns)
                        .filter(key => metadata.addOns[key])
                        .reduce((sum, key) => {
                          const addOn = availableAddOns.find(addon => addon.id === key);
                          return sum + (addOn?.price || 0);
                        }, 0);
                      return total + ((basePrice + addOnPrice) * quantity);
                    }, 0).toFixed(0)}
                  </Typography>
                </Box>
              </Box>

              {/* Checkout Button */}
              <Box
                sx={{
                  width: '100%',
                  py: 2.5,
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                  userSelect: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  '&:hover': {
                    opacity: 0.9,
                  },
                  '&:active': {
                    opacity: 0.7,
                    transform: 'scale(0.98)'
                  }
                }}
              >
                <Typography variant="h6" sx={{ 
                  fontWeight: 800,
                  fontSize: '18px'
                }}>
                  ดำเนินการสั่งซื้อ
                </Typography>
              </Box>
            </>
          )}
                 </Box>
          </Box>
        </Box>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 8 }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            fontWeight: 500,
            fontSize: '14px'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
     </Box>
  );
} 