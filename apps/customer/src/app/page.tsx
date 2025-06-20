'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
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
  CircularProgress,
  Snackbar,
  Alert
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
  X,
  Star
} from 'lucide-react';

import { LocationOn } from '@mui/icons-material';
import { useCart } from './hooks/useCart';
import ClientOnly from './components/ClientOnly';

export default function HomePage() {
  const router = useRouter();
  const { cartCount, isLoaded } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
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
                      บ้านของคุณ
                  </Typography>
                    <LocationOn sx={{ fontSize: 16, color: '#10b981' }} />
                </Box>
              </Box>
            </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <IconButton 
                  onClick={handleSearchClick}
                sx={{ 
                    width: 42, 
                    height: 42,
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '14px',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      background: 'rgba(16, 185, 129, 0.2)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.25)',
                    }
                  }}
                >
                  <Search size={20} color="#10b981" />
                </IconButton>

                <IconButton 
                  sx={{ 
                    width: 42, 
                    height: 42,
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '14px',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      background: 'rgba(59, 130, 246, 0.2)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.25)',
                    }
                  }}
                >
                  <Bell size={20} color="#3b82f6" />
                </IconButton>

                <ClientOnly>
                  <Badge badgeContent={cartCount} color="error">
                    <IconButton 
                      onClick={() => router.push('/cart')}
                sx={{ 
                        width: 42, 
                        height: 42,
                        background: 'rgba(236, 72, 153, 0.1)',
                        border: '1px solid rgba(236, 72, 153, 0.2)',
                        borderRadius: '14px',
                        transition: 'all 0.3s ease',
                      '&:hover': {
                          background: 'rgba(236, 72, 153, 0.2)',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 8px 25px rgba(236, 72, 153, 0.25)',
                        }
                      }}
                    >
                      <ShoppingBag size={20} color="#ec4899" />
                    </IconButton>
                  </Badge>
                </ClientOnly>
            </Box>
          </Box>

            {/* Search Overlay */}
            {isSearchOpen && (
                <Box
                  sx={{
                  position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                  bottom: 0,
                  zIndex: 2000,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 2,
                  animation: 'fadeIn 0.3s ease-out',
                  '@keyframes fadeIn': {
                    from: { opacity: 0 },
                    to: { opacity: 1 }
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <TextField
                ref={searchInputRef}
                fullWidth
                size="small"
                placeholder="ค้นหาอาหารที่คุณชอบ..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: { xs: '8px', sm: '12px' },
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: { xs: '14px', sm: '16px' },
                    minHeight: { xs: '40px', sm: '48px' },
                    '& fieldset': {
                      borderColor: 'rgba(16, 185, 129, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(16, 185, 129, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#10b981',
                    },
                  },
                  '& .MuiInputBase-input': {
                    padding: { xs: '8px 0', sm: '12px 0' },
                    fontSize: { xs: '14px', sm: '16px' }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="#10b981" size={18} />
                    </InputAdornment>
                  ),
                }}
              />
                  <IconButton 
                        onClick={handleSearchClose}
                        sx={{ 
                      width: { xs: 40, sm: 48 },
                      height: { xs: 40, sm: 48 },
                      background: 'rgba(255, 255, 255, 0.9)',
                              '&:hover': {
                        background: 'rgba(255, 255, 255, 1)'
                              }
                            }}
                          >
                    <X size={20} />
                  </IconButton>
                          </Box>
                </Box>
            )}
           </Box>
         </Container>
       </Paper>

      {/* Main Content */}
       <Container 
         maxWidth="sm" 
         sx={{ 
          mt: 12, 
          mb: 12, 
          px: 1,
          flex: 1, 
          overflowY: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none'
        }}
      >
        {/* Hero Banner Carousel */}
        <Box sx={{ mb: 4, borderRadius: '24px', overflow: 'hidden' }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={false}
            pagination={{ 
              clickable: true,
              dynamicBullets: true
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={true}
            style={{
              borderRadius: '24px',
              minHeight: '280px'
            }}
          >
            {/* Slide 1 - อาหารสุขภาพ */}
            <SwiperSlide>
              <Box sx={{
                minHeight: '280px',
                background: `
                  linear-gradient(135deg, 
                    rgba(16, 185, 129, 0.9) 0%, 
                    rgba(5, 150, 105, 0.8) 50%,
                    rgba(8, 145, 178, 0.9) 100%
                  ),
                  url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=600&fit=crop&crop=center')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.3)',
                  zIndex: 1
                }
              }}>
                <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h3" sx={{ 
                      fontWeight: 800, 
                      color: 'white', 
                      mb: 2,
                      letterSpacing: '-1px',
                      textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}>
                      อาหารสุขภาพ
                    </Typography>
            <Typography variant="h6" sx={{ 
                      color: 'rgba(255,255,255,0.95)', 
                      maxWidth: '380px', 
                      mx: 'auto',
                      lineHeight: 1.6,
                      fontWeight: 400,
                      textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                      mb: 3
                    }}>
                      เลือกอาหารอร่อยและดีต่อสุขภาพจากร้านค้าคุณภาพ
            </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      gap: 3,
                      flexWrap: 'wrap'
                    }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700, 
                          color: 'white',
                          textShadow: '0 3px 15px rgba(0,0,0,0.4)'
                        }}>
                          100+
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500
                        }}>
                          เมนูอาหาร
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700, 
                          color: 'white',
                          textShadow: '0 3px 15px rgba(0,0,0,0.4)'
                        }}>
                          4.8⭐
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500
                        }}>
                          คะแนนเฉลี่ย
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700, 
                          color: 'white',
                          textShadow: '0 3px 15px rgba(0,0,0,0.4)'
                        }}>
                          15min
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500
                        }}>
                          จัดส่งเร็ว
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </SwiperSlide>

            {/* Slide 2 - สำหรับคนรักสุขภาพ */}
            <SwiperSlide>
              <Box sx={{
                minHeight: '280px',
                background: `
                  linear-gradient(135deg, 
                    rgba(168, 85, 247, 0.9) 0%, 
                    rgba(139, 92, 246, 0.8) 50%,
                    rgba(124, 58, 237, 0.9) 100%
                  ),
                  url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop&crop=center')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.3)',
                  zIndex: 1
                }
              }}>
                <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h3" sx={{ 
                  fontWeight: 800,
                      color: 'white', 
                      mb: 2,
                      letterSpacing: '-1px',
                      textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}>
                      สำหรับคนรักสุขภาพ
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      color: 'rgba(255,255,255,0.95)', 
                      maxWidth: '380px', 
                      mx: 'auto',
                      lineHeight: 1.6,
                      fontWeight: 400,
                      textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                      mb: 3
                    }}>
                      วัตถุดิบคุณภาพ สูตรโภชนาการสมดุล
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      gap: 3,
                      flexWrap: 'wrap'
                    }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700, 
                          color: 'white',
                          textShadow: '0 3px 15px rgba(0,0,0,0.4)'
                        }}>
                          ✅
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500
                        }}>
                          ออร์แกนิก
            </Typography>
            </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700, 
                          color: 'white',
                          textShadow: '0 3px 15px rgba(0,0,0,0.4)'
                        }}>
                          🌱
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500
                        }}>
                          ธรรมชาติ
                        </Typography>
          </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700, 
                          color: 'white',
                          textShadow: '0 3px 15px rgba(0,0,0,0.4)'
                        }}>
                          💪
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500
                        }}>
                          สุขภาพดี
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </SwiperSlide>

            {/* Slide 3 - ส่งฟรี */}
            <SwiperSlide>
              <Box sx={{
                minHeight: '280px',
              background: `
                linear-gradient(135deg, 
                    rgba(251, 146, 60, 0.9) 0%, 
                    rgba(245, 158, 11, 0.8) 50%,
                    rgba(217, 119, 6, 0.9) 100%
                  ),
                  url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop&crop=center')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.3)',
                  zIndex: 1
                }
              }}>
                <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h3" sx={{ 
                      fontWeight: 800, 
                    color: 'white', 
                      mb: 2,
                      letterSpacing: '-1px',
                      textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}>
                      ส่งฟรี!
                  </Typography>
                    <Typography variant="h6" sx={{ 
                      color: 'rgba(255,255,255,0.95)', 
                      maxWidth: '380px', 
                      mx: 'auto',
                      lineHeight: 1.6,
                      fontWeight: 400,
                      textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                      mb: 3
                    }}>
                      สั่งขั้นต่ำ 500 บาท ส่งฟรีทั่วกรุงเทพ
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      gap: 3,
                      flexWrap: 'wrap'
                    }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700, 
                    color: 'white', 
                          textShadow: '0 3px 15px rgba(0,0,0,0.4)'
                        }}>
                          🚚
                  </Typography>
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500
                        }}>
                          ส่งฟรี
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700, 
                    color: 'white', 
                          textShadow: '0 3px 15px rgba(0,0,0,0.4)'
                        }}>
                          ⚡
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500
                        }}>
                          ส่งเร็ว
                  </Typography>
                </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700, 
                          color: 'white',
                          textShadow: '0 3px 15px rgba(0,0,0,0.4)'
                        }}>
                          📦
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500
                        }}>
                          ปลอดภัย
                        </Typography>
                </Box>
              </Box>
          </Box>
                </Container>
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>

        {/* Categories */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 700, 
            color: '#0f172a', 
            mb: 3,
            fontSize: '20px'
          }}>
            หมวดหมู่อาหาร
          </Typography>
          
         <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            '@media (max-width: 640px)': {
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1.5,
            }
         }}>
           {categories.map((category, index) => (
              <Box
               key={index}
                onClick={() => setActiveCategory(activeCategory === index ? null : index)}
               sx={{
                  textAlign: 'center',
                  p: 2,
                  borderRadius: '20px',
                  background: activeCategory === index 
                    ? `linear-gradient(135deg, ${category.color}40, ${category.color}20)`
                    : `
                    linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.7) 0%, 
                        rgba(255, 255, 255, 0.4) 100%
                      )
                    `,
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: activeCategory === index 
                    ? `2px solid ${category.color}80`
                    : '1px solid rgba(255, 255, 255, 0.3)',
                 cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'translateY(0)',
                 '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 40px ${category.color}30`,
                    background: `linear-gradient(135deg, ${category.color}30, ${category.color}15)`,
                  },
                  '&:active': {
                    transform: 'translateY(-2px) scale(0.98)',
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
                  <Typography sx={{ color: '#64748b', fontSize: '24px' }}>
                    Loading...
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
                      // นำทางไปหน้ารายละเอียดอาหาร
                      router.push(`/food/detail/${food.slug || food.id}`);
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
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
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
                        <Star size={12} fill="currentColor" />
                        {food.rating}
                      </Box>

                      {/* Food Image */}
                      {food.imageUrl ? (
                        <Box
                          component="img"
                          src={food.imageUrl}
                          alt={food.name}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <Box sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          height: '100%',
                          fontSize: '80px',
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02))'
                        }}>
                          {food.emoji || '🍽️'}
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600, 
                        color: '#0f172a', 
                        mb: 1,
                        fontSize: '18px',
                        lineHeight: 1.3
                      }}>
                        {food.name}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ 
                        color: '#64748b', 
                        mb: 2, 
                        fontSize: '14px',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {food.description}
                      </Typography>

                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center'
                      }}>
                        <Box>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 700, 
                            color: '#10b981',
                            fontSize: '20px'
                          }}>
                            ฿{food.price?.toFixed(0)}
                          </Typography>
                          {food.originalPrice && (
                              <Typography variant="caption" sx={{ 
                                color: '#94a3b8',
                              textDecoration: 'line-through'
                              }}>
                                ฿{food.originalPrice?.toFixed(0)}
                              </Typography>
                          )}
                        </Box>
                        
                            <Typography variant="caption" sx={{ 
                              color: '#64748b',
                          fontWeight: 500
                            }}>
                          แตะเพื่อดูรายละเอียด
                            </Typography>
                        </Box>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          )}
        </Box>
      </Container>

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

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            borderRadius: '12px',
            '& .MuiAlert-icon': {
              color: '#10b981'
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
     </Box>
  );
} 