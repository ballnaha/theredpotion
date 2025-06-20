'use client';

import { useState, useRef } from 'react';
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
  Collapse
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
  X
} from 'lucide-react';

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { name: 'Hamburger', emoji: '🍔' },
    { name: 'Pizza', emoji: '🍕' },
    { name: 'Noodles', emoji: '🍜' },
    { name: 'Meat', emoji: '🥩' },
    { name: 'Vegetables', emoji: '🥬' },
    { name: 'Dessert', emoji: '🧁' },
    { name: 'Drink', emoji: '🍺' },
    { name: 'More', emoji: '🥮' }
  ];

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 300); // รอให้ animation เสร็จก่อน focus
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchValue('');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(34,197,94,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.1) 0%, transparent 50%)',
          zIndex: 0,
          pointerEvents: 'none'
        }
      }}
    >
      {/* Fixed Header */}
      <Paper
        elevation={0}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <Container maxWidth="sm" sx={{ px: 2 }}>
          <Box sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                }}
              >
                👨‍🦱
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  Deliver to
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Times Square
                  </Typography>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22C55E' }} />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                onClick={handleSearchClick}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                }}
              >
                <Search size={20} />
              </IconButton>
              <IconButton 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                }}
              >
                <Bell size={20} />
              </IconButton>
              <IconButton 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                }}
              >
                <ShoppingBag size={20} />
              </IconButton>
            </Box>
          </Box>

          {/* Search Bar */}
          <Collapse in={isSearchOpen} timeout={300}>
            <Box sx={{ mb: 2 }}>
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
                      <Search size={20} style={{ color: '#6b7280' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSearchClose}
                        size="small"
                        sx={{ 
                          color: '#6b7280',
                          '&:hover': { color: '#374151' }
                        }}
                      >
                        <X size={18} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(34, 197, 94, 0.3)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#22C55E',
                    },
                  }
                }}
              />
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
           pt: 20, // Space for fixed header
           pb: 12, // Space for fixed footer
           px: 2,
           position: 'relative',
           zIndex: 1,
           // Hide scrollbar
           '&::-webkit-scrollbar': {
             display: 'none'
           },
           scrollbarWidth: 'none', // Firefox
           msOverflowStyle: 'none', // IE and Edge
         }}
       >

        {/* Special Offers */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Special Offers
            </Typography>
            <Typography variant="body2" sx={{ color: '#22C55E', fontWeight: 600 }}>
              See All
            </Typography>
          </Box>

          <Card
            sx={{
              background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              mb: 3
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 0.5 }}>
                    30%
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                    DISCOUNT ONLY
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                    VALID FOR TODAY!
                  </Typography>
                </Box>
                <Box sx={{ fontSize: '80px', transform: 'rotate(10deg)' }}>
                  🍔
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

                 {/* Categories */}
         <Box sx={{ 
           display: 'grid', 
           gridTemplateColumns: 'repeat(4, 1fr)', 
           gap: 1, 
           mb: 3 
         }}>
           {categories.map((category, index) => (
             <Paper
               key={index}
               elevation={0}
               sx={{
                 p: 2,
                 textAlign: 'center',
                 backgroundColor: 'rgba(255, 255, 255, 0.7)',
                 backdropFilter: 'blur(15px) saturate(180%)',
                 border: '1px solid rgba(255, 255, 255, 0.3)',
                 borderRadius: '20px',
                 cursor: 'pointer',
                 transition: 'all 0.3s ease',
                 '&:hover': {
                   backgroundColor: 'rgba(255, 255, 255, 0.9)',
                   transform: 'translateY(-2px)',
                   boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                 }
               }}
             >
               <Typography sx={{ fontSize: '28px', mb: 1 }}>
                 {category.emoji}
               </Typography>
               <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>
                 {category.name}
               </Typography>
             </Paper>
           ))}
         </Box>

        {/* Discount Guaranteed */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                Discount Guaranteed!
              </Typography>
              <Typography sx={{ fontSize: '20px' }}>👍</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#22C55E', fontWeight: 600 }}>
              See All
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {[1, 2].map((item) => (
              <Card
                key={item}
                sx={{
                  minWidth: 200,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ position: 'relative', height: 120 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      backgroundColor: '#22C55E',
                      color: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      zIndex: 2
                    }}
                  >
                    PROMO
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: item === 1 
                        ? 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(22,163,74,0.2) 100%)'
                        : 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(37,99,235,0.2) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '48px'
                    }}
                  >
                    {item === 1 ? '🥗' : '🍳'}
                  </Box>
                </Box>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                    {item === 1 ? 'Fresh Salad Bowl' : 'Breakfast Special'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {item === 1 ? 'Healthy & Delicious' : 'Start your day right'}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Bottom Navigation */}
        <Paper
          elevation={0}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px) saturate(180%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '24px 24px 0 0',
            zIndex: 1000
          }}
        >
          <Container maxWidth="sm" sx={{ px: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 2 }}>
              {[
                { icon: <Home size={20} />, label: 'Home', active: true },
                { icon: <Search size={20} />, label: 'Search' },
                { icon: <Heart size={20} />, label: 'Favorites' },
                { icon: <Receipt size={20} />, label: 'Orders' },
                { icon: <User size={20} />, label: 'Profile' }
              ].map((item, index) => (
                <Box key={index} sx={{ textAlign: 'center', minWidth: 60 }}>
                  <IconButton
                    sx={{
                      color: item.active ? '#22C55E' : 'text.secondary',
                      '&:hover': { color: '#22C55E' }
                    }}
                  >
                    {item.icon}
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      color: item.active ? '#22C55E' : 'text.secondary',
                      fontWeight: item.active ? 600 : 400,
                      fontSize: '10px'
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Paper>

               </Container>
     </Box>
  );
}
