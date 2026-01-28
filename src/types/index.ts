export interface Product {
  id: string;
  name: string; // Title
  slug?: string; // URL Slug
  price: number; // Real Price
  originalPrice?: number; // Old Price (Discount Price)
  categories: string[]; // Replaces single category
  category?: string; // Deprecated, kept for backward compat if needed temporarily
  image: string; // Main Big Image (index 0 of images)
  images: string[]; // Gallery
  shortDescription: string; // Small Description
  description?: string; // Detailed Description (Optional)
  sizes?: string[];
  colors?: string[];
  isNew?: boolean;
  inStock: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviews: number;
  stockQuantity: number;
  tags?: string[];
  discountPrice?: number; 
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  };
  date: string;
  status: OrderStatus;
}

export interface Category {
  id: string;
  name: string;
  image?: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}
