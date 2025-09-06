import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { User, Product, CartItem, Purchase } from '../types';

interface AppContextType {
  // Auth
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'joinDate'>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'datePosted'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  
  // Purchases
  purchases: Purchase[];
  completePurchase: () => void;
  
  // Users (for demo purposes)
  users: User[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample data for demo
const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Leather Jacket',
    description: 'Classic brown leather jacket in excellent condition. Perfect for fall weather.',
    price: 85,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    sellerId: 'demo-seller',
    sellerName: 'Sarah M.',
    datePosted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    condition: 'Good',
    location: 'New York, NY'
  },
  {
    id: '2',
    title: 'iPhone 12 Pro',
    description: 'Unlocked iPhone 12 Pro in space gray. Minor scratches on back, screen is perfect.',
    price: 450,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    sellerId: 'demo-seller-2',
    sellerName: 'Mike R.',
    datePosted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    condition: 'Good',
    location: 'San Francisco, CA'
  },
  {
    id: '3',
    title: 'Wooden Coffee Table',
    description: 'Beautiful handcrafted oak coffee table. Some wear but very sturdy.',
    price: 120,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    sellerId: 'demo-seller-3',
    sellerName: 'Emma L.',
    datePosted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    condition: 'Fair',
    location: 'Austin, TX'
  },
  {
    id: '4',
    title: 'Road Bike - Trek',
    description: 'Trek road bike in great condition. Recently serviced, new tires.',
    price: 280,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    sellerId: 'demo-seller-4',
    sellerName: 'Alex K.',
    datePosted: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    condition: 'Like New',
    location: 'Portland, OR'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [products, setProducts] = useLocalStorage<Product[]>('products', sampleProducts);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cartItems', []);
  const [purchases, setPurchases] = useLocalStorage<Purchase[]>('purchases', []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'joinDate'>): Promise<boolean> => {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return false;
    }
    
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString(),
    };
    
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setCartItems([]);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    }
  };

  const addProduct = (productData: Omit<Product, 'id' | 'datePosted'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      datePosted: new Date().toISOString(),
    };
    setProducts([newProduct, ...products]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { 
        product, 
        quantity: 1, 
        addedAt: new Date().toISOString() 
      }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const completePurchase = () => {
    if (!currentUser || cartItems.length === 0) return;
    
    const newPurchases = cartItems.map(item => ({
      id: `${Date.now()}-${item.product.id}`,
      product: item.product,
      quantity: item.quantity,
      totalPrice: item.product.price * item.quantity,
      purchaseDate: new Date().toISOString(),
      buyerId: currentUser.id,
    }));
    
    setPurchases([...newPurchases, ...purchases]);
    clearCart();
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      login,
      register,
      logout,
      updateProfile,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      purchases,
      completePurchase,
      users,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};