// Slug Generation Utility for Multi-Tenant Food App

export interface SlugOptions {
  tenantId: string;
  foodName: string;
  categorySlug?: string;
  restaurantSlug?: string;
  uniqueId?: string;
}

// Generate SEO-friendly slug
export const generateFoodSlug = (options: SlugOptions): string => {
  const { tenantId, foodName, categorySlug, restaurantSlug, uniqueId } = options;
  
  // Clean food name for slug
  const cleanFoodName = foodName
    .toLowerCase()
    .replace(/[^\u0E00-\u0E7F\w\s-]/g, '') // Keep Thai, English, numbers, spaces, hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
  
  // Strategy 1: Tenant + Food Name + Unique ID (Recommended)
  if (uniqueId) {
    return `${tenantId}-${cleanFoodName}-${uniqueId}`;
  }
  
  // Strategy 2: Tenant + Category + Food Name
  if (categorySlug) {
    return `${tenantId}-${categorySlug}-${cleanFoodName}`;
  }
  
  // Strategy 3: Restaurant + Food Name
  if (restaurantSlug) {
    return `${restaurantSlug}-${cleanFoodName}`;
  }
  
  // Fallback: Tenant + Food Name
  return `${tenantId}-${cleanFoodName}`;
};

// Parse slug to extract tenant and food info
export const parseSlug = (slug: string): {
  tenantId: string | null;
  foodSlug: string;
  uniqueId?: string;
} => {
  const parts = slug.split('-');
  
  if (parts.length >= 2) {
    const tenantId = parts[0];
    const remainingParts = parts.slice(1);
    
    // Check if last part is a unique ID (numeric or alphanumeric)
    const lastPart = remainingParts[remainingParts.length - 1];
    const isUniqueId = /^[a-z0-9]{6,}$/i.test(lastPart);
    
    if (isUniqueId) {
      const uniqueId = lastPart;
      const foodSlug = remainingParts.slice(0, -1).join('-');
      return { tenantId, foodSlug, uniqueId };
    }
    
    const foodSlug = remainingParts.join('-');
    return { tenantId, foodSlug };
  }
  
  return { tenantId: null, foodSlug: slug };
};

// Generate unique ID for food items
export const generateUniqueId = (length: number = 8): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Validate slug format
export const isValidSlug = (slug: string): boolean => {
  const slugPattern = /^[a-z0-9\u0E00-\u0E7F-]+$/;
  return slugPattern.test(slug) && slug.length > 0 && slug.length <= 100;
};

// Generate category slug
export const generateCategorySlug = (categoryName: string): string => {
  return categoryName
    .toLowerCase()
    .replace(/[^\u0E00-\u0E7F\w\s]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

// Generate restaurant slug
export const generateRestaurantSlug = (restaurantName: string): string => {
  return restaurantName
    .toLowerCase()
    .replace(/[^\u0E00-\u0E7F\w\s]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

// SEO-friendly URL structure examples:
/*
Strategy 1 (Recommended): Tenant + Food + Unique ID
- restaurant1-green-power-bowl-abc123
- restaurant2-zen-garden-salad-def456
- restaurant3-fresh-acai-bowl-ghi789

Strategy 2: Tenant + Category + Food
- restaurant1-healthy-bowls-green-power-bowl
- restaurant2-zen-salads-zen-garden-salad
- restaurant3-fresh-bowls-fresh-acai-bowl

Strategy 3: Restaurant Name + Food
- green-garden-organic-green-power-bowl
- zen-healthy-treats-zen-garden-salad
- fresh-bowl-co-fresh-acai-bowl

Benefits:
✅ Unique across all tenants
✅ SEO-friendly with keywords
✅ Human-readable
✅ Contains tenant context
✅ Supports Thai language
*/

export default {
  generateFoodSlug,
  parseSlug,
  generateUniqueId,
  isValidSlug,
  generateCategorySlug,
  generateRestaurantSlug
}; 