'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Typography,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
  Snackbar,
  Alert,
  Chip,
  Divider,
  Badge
} from '@mui/material';
import {
  ArrowLeft,
  Share2,
  Minus,
  Plus,
  Star,
  ShoppingCart,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import ClientOnly from '../../../components/ClientOnly';

// Types
interface NutritionalInfo {
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface FoodItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  imageUrl?: string;
  emoji: string;
  rating: number;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  nutritionalInfo?: NutritionalInfo;
  restaurant?: {
    name: string;
    deliveryTime: string;
  };
  addOns?: AddOn[];
}

export default function FoodDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { addToCart, cartCount } = useCart();
  
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<{ [key: string]: boolean }>({});
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
    const fetchFoodItem = async () => {
      const slug = params.slug as string;
      
      // Extract tenant from slug
      const tenantId = slug.split('-')[0];
      
      try {
        const response = await fetch(`/api/tenant/${tenantId}/food/${slug}`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setFoodItem(result.data);
        } else {
          console.error('Food item not found:', result.error);
        }
      } catch (error) {
        console.error('Error fetching food item:', error);
        
        // Fallback to mock data
        const mockFoodItems: { [key: string]: FoodItem } = {
          'organic-quinoa-bowl': {
            id: 'cm001',
            slug: 'organic-quinoa-bowl',
            name: 'โบวล์ควินัวออร์แกนิก',
            description: 'ควินัวสีแดงอินทรีย์ อะโวคาโดสดสไลซ์ ผักโขมอ่อน เพอโรนิค่า เมล็ดซันฟลาวเวอร์ ราดด้วยน้ำสลัดมะนาวผสมเฮมป์ออยล์',
            price: 285,
            originalPrice: 350,
            discountPercent: 19,
            imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop&crop=center',
            emoji: '🥗',
            rating: 4.8,
            isVegan: true,
            isGlutenFree: true,
            nutritionalInfo: {
              protein: '14g',
              carbs: '32g',
              fat: '18g',
              fiber: '8g'
            },
            restaurant: {
              name: 'Green Garden Organic',
              deliveryTime: '25-30 นาที'
            }
          },
          'premium-acai-bowl': {
            id: 'cm002',
            slug: 'premium-acai-bowl',
            name: 'อาซาอิโบวล์พรีเมี่ยม',
            description: 'อาซาอิเบอรี่แท้จากบราซิล ผสมกล้วยโฮมสดแช่แข็ง โรยด้วยโกรนลาฮาร์ดเมด บลูเบอรี่สด สตรอเบอรี่ กีวีฟรุต กะลามะพร้าวคั่ว',
            price: 245,
            originalPrice: 295,
            discountPercent: 17,
            imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop&crop=center',
            emoji: '🍓',
            rating: 4.9,
            isVegan: true,
            isGlutenFree: false,
            nutritionalInfo: {
              protein: '8g',
              carbs: '45g',
              fat: '12g',
              fiber: '11g'
            },
            restaurant: {
              name: 'Amazon Açaí House',
              deliveryTime: '15-20 นาที'
            }
          },
          'teriyaki-salmon-vegetables': {
            id: 'cm003',
            slug: 'teriyaki-salmon-vegetables',
            name: 'แซลมอนเทริยากิพร้อมผัก',
            description: 'แซลมอนนอร์เวย์เกรดพรีเมี่ยม หมักซอสเทริยากิโฮมเมด เสิร์ฟพร้อมบรอกโคลี่อบ แครอทเบบี้ ข้าวไรซ์เบอรี่ หน่อไผ่ญี่ปุ่น',
            price: 485,
            originalPrice: 590,
            discountPercent: 18,
            imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop&crop=center',
            emoji: '🍣',
            rating: 4.7,
            isVegan: false,
            isGlutenFree: false,
            nutritionalInfo: {
              protein: '32g',
              carbs: '28g',
              fat: '16g',
              fiber: '6g'
            },
            restaurant: {
              name: 'Ocean Kitchen',
              deliveryTime: '30-35 นาที'
            }
          },
          'green-detox-smoothie': {
            id: 'cm004',
            slug: 'green-detox-smoothie',
            name: 'กรีนดีท็อกซ์สมูธี่',
            description: 'เครื่องดื่มล้างพิษ ผสมผักเคลคัดพิเศษ คื่นช่าย แอปเปิ้ลเขียว แตงกวาอินทรีย์ มะนาวสด ขิงแก่ สไปรูลิน่า',
            price: 125,
            originalPrice: 155,
            discountPercent: 19,
            imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&h=600&fit=crop&crop=center',
            emoji: '🥬',
            rating: 4.6,
            isVegan: true,
            isGlutenFree: true,
            nutritionalInfo: {
              protein: '4g',
              carbs: '18g',
              fat: '1g',
              fiber: '5g'
            },
            restaurant: {
              name: 'Pure Wellness Bar',
              deliveryTime: '10-15 นาที'
            }
          },
          'lavender-chia-pudding': {
            id: 'cm005',
            slug: 'lavender-chia-pudding',
            name: 'เชียพุดดิ้งลัเวนเดอร์',
            description: 'เมล็ดเชียชั้นเยี่ยม แช่นมอัลมอนด์ ผสมน้ำผึ้งมานูกา กลีบลัเวนเดอร์อบแห้ง โรยด้วยบลูเบอรี่สด ฟลอสมิ๊กซ์ เกล็ดมะพร้าว',
            price: 185,
            originalPrice: 220,
            discountPercent: 16,
            imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
            emoji: '🥥',
            rating: 4.8,
            isVegan: true,
            isGlutenFree: true,
            nutritionalInfo: {
              protein: '6g',
              carbs: '24g',
              fat: '11g',
              fiber: '8g'
            },
            restaurant: {
              name: 'Zen Healthy Treats',
              deliveryTime: '15-20 นาที'
            }
          }
        };
        
        const item = mockFoodItems[slug];
        if (item) {
          setFoodItem(item);
        }
      }
    };

    fetchFoodItem();
  }, [params.slug]);

  const handleAddOnChange = (addOnId: string) => {
    setSelectedAddOns(prev => ({
      ...prev,
      [addOnId]: !prev[addOnId]
    }));
  };

  const calculateTotalPrice = () => {
    if (!foodItem) return 0;
    
    let total = foodItem.price * quantity;
    
    const addOns = foodItem.addOns || availableAddOns;
    addOns.forEach(addOn => {
      if (selectedAddOns[addOn.id]) {
        total += addOn.price * quantity;
      }
    });
    
    return total;
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleAddToCart = () => {
    if (!foodItem) return;
    
    const addOns = foodItem.addOns || availableAddOns;
    const selectedAddOnsList = addOns.filter(addOn => selectedAddOns[addOn.id]);
    
    addToCart(
      foodItem.id,
      foodItem.name,
      quantity,
      selectedAddOns,
      specialInstructions.trim(),
      foodItem.price
    );

    setSnackbarMessage(`เพิ่ม ${foodItem.name} (${quantity} รายการ) ลงในตะกร้าแล้ว!`);
    setSnackbarOpen(true);
  };

  const availableAddOns: AddOn[] = [
    { id: '1', name: 'ชีสเฟต้าเพิ่ม', description: 'ชีสเฟต้านำเข้าคุณภาพสูง', price: 45 },
    { id: '2', name: 'อะโวคาโด', description: 'อะโวคาโดสดใหม่หั่นชิ้น', price: 60 },
    { id: '3', name: 'มะกอกดำ', description: 'มะกอกดำคาลามาต้า', price: 35 },
    { id: '4', name: 'อัลมอนด์แผ่น', description: 'อัลมอนด์แผ่นคั่วหอม', price: 40 },
    { id: '5', name: 'เมล็ดทานตะวัน', description: 'เมล็ดทานตะวันคั่วกรอบ', price: 25 },
    { id: '6', name: 'น้ำสลัดบัลซามิค', description: 'น้ำสลัดบัลซามิคพิเศษ', price: 30 }
  ];

  if (!foodItem) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography sx={{ color: '#64748b', fontSize: '24px' }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  const totalPrice = calculateTotalPrice();

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Box sx={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        p: 2,
        '@media (min-width: 600px)': { p: 3 },
        '@media (min-width: 900px)': { px: 4 }
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          width: '100%'
        }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <ClientOnly>
              <Badge badgeContent={cartCount} color="error">
                <IconButton 
                  onClick={() => router.push('/cart')}
                  sx={{ 
                    width: 48,
                    height: 48,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    backdropFilter: 'blur(30px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '@media (min-width: 600px)': { width: 52, height: 52 },
                    '&:hover': { 
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  <ShoppingBag size={20} color="#0f172a" />
                </IconButton>
              </Badge>
            </ClientOnly>
          </Box>
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ 
        flex: 1,
        overflowY: 'auto',
        pb: '120px', // space for fixed footer
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none'
      }}>
        {/* Food Image */}
        <Box sx={{ 
          position: 'relative',
          width: '100%',
          height: '300px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02))',
          '@media (min-width: 600px)': { height: '360px' },
          '@media (min-width: 900px)': { height: '420px' }
        }}>
          {/* Discount Badge */}
          {foodItem.discountPercent && (
            <Box sx={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              px: 2.5,
              py: 1.2,
              borderRadius: '18px',
              fontSize: '15px',
              fontWeight: 600,
              zIndex: 2,
              boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)'
            }}>
              -{foodItem.discountPercent}%
            </Box>
          )}

          {/* Rating Badge */}
          <Box sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: '14px',
            fontSize: '15px',
            fontWeight: 500,
            zIndex: 2,
            backdropFilter: 'blur(15px)',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}>
            <Star size={16} fill="currentColor" />
            {foodItem.rating}
          </Box>

          {foodItem.imageUrl ? (
            <Box
              component="img"
              src={foodItem.imageUrl}
              alt={foodItem.name}
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
              fontSize: '140px'
            }}>
              {foodItem.emoji || '🍽️'}
            </Box>
          )}
        </Box>

        {/* Food Info */}
        <Box sx={{ 
          py: 3,
          px: 2,
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          '@media (min-width: 600px)': { px: 3 },
          '@media (min-width: 900px)': { px: 4 }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                color: '#0f172a',
                mb: 1,
                fontSize: '24px',
                '@media (min-width: 600px)': { fontSize: '28px' }
              }}>
                {foodItem.name}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {foodItem.isVegan && (
                  <Chip
                    label="Vegan"
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      fontWeight: 500,
                      fontSize: '12px'
                    }}
                  />
                )}
                {foodItem.isGlutenFree && (
                  <Chip
                    label="Gluten Free"
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: 'white',
                      fontWeight: 500,
                      fontSize: '12px'
                    }}
                  />
                )}
              </Box>
            </Box>

            <Box sx={{ textAlign: 'right', ml: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {foodItem.originalPrice && (
                  <Typography variant="body2" sx={{ 
                    textDecoration: 'line-through', 
                    color: '#94a3b8',
                    fontSize: '16px'
                  }}>
                    ฿{foodItem.originalPrice}
                  </Typography>
                )}
                <Typography variant="h5" sx={{ 
                  fontWeight: 700, 
                  color: '#10b981',
                  fontSize: '24px'
                }}>
                  ฿{foodItem.price}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography variant="body1" sx={{ 
            color: '#475569', 
            lineHeight: 1.7,
            mb: 3,
            fontSize: '15px',
            '@media (min-width: 600px)': { fontSize: '16px' }
          }}>
            {foodItem.description}
          </Typography>

          {/* Restaurant Info */}
          {foodItem.restaurant && (
            <Box sx={{ 
              background: 'rgba(16, 185, 129, 0.08)',
              borderRadius: '16px',
              p: 2.5,
              mb: 3
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ 
                    fontWeight: 600, 
                    color: '#0f172a',
                    fontSize: '14px'
                  }}>
                    {foodItem.restaurant.name}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: '#64748b',
                    fontSize: '12px'
                  }}>
                    ร้านอาหาร
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="subtitle2" sx={{ 
                    fontWeight: 600, 
                    color: '#10b981',
                    fontSize: '14px'
                  }}>
                    {foodItem.restaurant.deliveryTime}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: '#64748b',
                    fontSize: '12px'
                  }}>
                    เวลาจัดส่ง
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {/* Nutritional Info */}
          {foodItem.nutritionalInfo && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                color: '#0f172a', 
                mb: 2,
                fontSize: '18px'
              }}>
                ข้อมูลโภชนาการ
              </Typography>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: 2,
                '@media (min-width: 600px)': { gridTemplateColumns: 'repeat(4, 1fr)' }
              }}>
                <Box sx={{ 
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  p: 2,
                  textAlign: 'center'
                }}>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '12px' }}>
                    โปรตีน
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: '#0f172a',
                    fontSize: '16px'
                  }}>
                    {foodItem.nutritionalInfo.protein}
                  </Typography>
                </Box>
                <Box sx={{ 
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  p: 2,
                  textAlign: 'center'
                }}>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '12px' }}>
                    คาร์บ
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: '#0f172a',
                    fontSize: '16px'
                  }}>
                    {foodItem.nutritionalInfo.carbs}
                  </Typography>
                </Box>
                <Box sx={{ 
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  p: 2,
                  textAlign: 'center'
                }}>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '12px' }}>
                    ไขมัน
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: '#0f172a',
                    fontSize: '16px'
                  }}>
                    {foodItem.nutritionalInfo.fat}
                  </Typography>
                </Box>
                <Box sx={{ 
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  p: 2,
                  textAlign: 'center'
                }}>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '12px' }}>
                    ไฟเบอร์
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: '#0f172a',
                    fontSize: '16px'
                  }}>
                    {foodItem.nutritionalInfo.fiber}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 3, borderColor: 'rgba(0, 0, 0, 0.08)' }} />

          {/* Add-ons */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              color: '#0f172a', 
              mb: 2,
              fontSize: '18px'
            }}>
              เพิ่มเติม (ไม่บังคับ)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {(foodItem.addOns || availableAddOns).map((addOn) => (
                <Box key={addOn.id} sx={{ 
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  p: 2,
                  border: selectedAddOns[addOn.id] ? '2px solid #10b981' : '1px solid rgba(0, 0, 0, 0.08)'
                }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedAddOns[addOn.id] || false}
                        onChange={() => handleAddOnChange(addOn.id)}
                        sx={{
                          color: '#10b981',
                          '&.Mui-checked': { color: '#10b981' },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ 
                            fontWeight: 500, 
                            color: '#0f172a',
                            fontSize: '15px'
                          }}>
                            {addOn.name}
                          </Typography>
                          <Typography variant="subtitle1" sx={{ 
                            fontWeight: 600, 
                            color: '#10b981',
                            fontSize: '15px'
                          }}>
                            +฿{addOn.price}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ 
                          color: '#64748b',
                          fontSize: '13px'
                        }}>
                          {addOn.description}
                        </Typography>
                      </Box>
                    }
                    sx={{ width: '100%', m: 0 }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(0, 0, 0, 0.08)' }} />

          {/* Special Instructions */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              color: '#0f172a', 
              mb: 2,
              fontSize: '18px'
            }}>
              คำสั่งพิเศษ
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              placeholder="เช่น ไม่ใส่หอม, ใส่พริกเพิ่ม, ฯลฯ"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  background: 'rgba(248, 250, 252, 0.8)',
                  fontSize: '14px',
                  '@media (min-width: 600px)': { fontSize: '16px' },
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
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Fixed Footer - Price & Actions */}
      <Box sx={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        p: 2,
        '@media (min-width: 600px)': { p: 3, px: 4 },
        '@media (min-width: 900px)': { px: 4 }
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          gap: 2,
          maxWidth: '100%',
          '@media (min-width: 600px)': { 
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3
          }
        }}>
          {/* Quantity Controls */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 2,
            order: 1,
            '@media (min-width: 600px)': { 
              justifyContent: 'flex-start'
            }
          }}>
            <Typography variant="subtitle1" sx={{ 
              fontWeight: 500, 
              color: '#0f172a',
              fontSize: '16px'
            }}>
              จำนวน:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                sx={{
                  width: 32,
                  height: 32,
                  background: '#f1f5f9',
                  '&:hover': { background: '#e2e8f0' },
                  '&.Mui-disabled': { background: '#f8fafc', color: '#cbd5e1' },
                  '@media (min-width: 600px)': { width: 36, height: 36 }
                }}
              >
                <Minus size={16} />
              </IconButton>
              <Typography sx={{ 
                mx: 1, 
                minWidth: '24px', 
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '16px'
              }}>
                {quantity}
              </Typography>
              <IconButton
                onClick={increaseQuantity}
                sx={{
                  width: 32,
                  height: 32,
                  background: '#f1f5f9',
                  '&:hover': { background: '#e2e8f0' },
                  '@media (min-width: 600px)': { width: 36, height: 36 }
                }}
              >
                <Plus size={16} />
              </IconButton>
            </Box>
          </Box>

          {/* Price & Add to Cart */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: 2,
            order: 2,
            width: '100%',
            '@media (min-width: 600px)': { 
              gap: 3,
              width: 'auto'
            }
          }}>
            <Box sx={{ 
              textAlign: 'left',
              '@media (min-width: 600px)': { textAlign: 'right' }
            }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '12px' }}>
                ราคารวม
              </Typography>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                color: '#10b981',
                fontSize: '20px',
                '@media (min-width: 600px)': { fontSize: '24px' }
              }}>
                ฿{totalPrice.toFixed(0)}
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              onClick={handleAddToCart}
              sx={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                borderRadius: '16px',
                px: 3,
                py: 1.2,
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                minHeight: '40px',
                flex: 1,
                '@media (min-width: 600px)': { 
                  px: 4,
                  py: 1.4,
                  fontSize: '16px',
                  minHeight: '44px',
                  flex: 'none'
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  boxShadow: '0 12px 30px rgba(16, 185, 129, 0.4)',
                }
              }}
            >
              เพิ่มลงตะกร้า
            </Button>
          </Box>
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
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            '& .MuiAlert-icon': { color: 'white' }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
} 