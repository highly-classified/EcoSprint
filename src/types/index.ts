export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  bio: string;
  location: string;
  joinDate: string;
  avatar: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sellerId: string;
  sellerName: string;
  datePosted: string;
  condition: 'Like New' | 'Good' | 'Fair' | 'Poor';
  location?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface Purchase {
  id: string;
  product: Product;
  quantity: number;
  totalPrice: number;
  purchaseDate: string;
  buyerId: string;
}

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Books',
  'Toys',
  'Automotive',
  'Art & Crafts',
  'Music',
  'Other'
] as const;

export type Category = typeof CATEGORIES[number];