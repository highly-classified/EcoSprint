import React, { createContext, useContext, useState, useEffect } from 'react';
import { storeData, getData } from '../services/storage';

const AppContext = createContext();

// Sample data for demo
const sampleProducts = [
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

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState(sampleProducts);
  const [cartItems, setCartItems] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const userData = await getData('currentUser');
    const usersData = await getData('users');
    const productsData = await getData('products');
    const cartData = await getData('cartItems');
    const purchasesData = await getData('purchases');

    if (userData) setCurrentUser(userData);
    if (usersData) setUsers(usersData);
    if (productsData) setProducts(productsData);
    if (cartData) setCartItems(cartData);
    if (purchasesData) setPurchases(purchasesData);
  };

  const login = async (email, password) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      await storeData('currentUser', user);
      return true;
    }
    return false;
  };

  const register = async (userData) => {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return false;
    }
    
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString(),
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    await storeData('users', updatedUsers);
    await storeData('currentUser', newUser);
    return true;
  };

  const logout = async () => {
    setCurrentUser(null);
    setCartItems([]);
    await storeData('currentUser', null);
    await storeData('cartItems', []);
  };

  const updateProfile = async (updates) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
      setUsers(updatedUsers);
      await storeData('currentUser', updatedUser);
      await storeData('users', updatedUsers);
    }
  };

  const addProduct = async (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      datePosted: new Date().toISOString(),
    };
    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);
    await storeData('products', updatedProducts);
  };

  const updateProduct = async (id, updates) => {
    const updatedProducts = products.map(p => p.id === id ? { ...p, ...updates } : p);
    setProducts(updatedProducts);
    await storeData('products', updatedProducts);
  };

  const deleteProduct = async (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    await storeData('products', updatedProducts);
  };

  const addToCart = async (product) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cartItems.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { 
        product, 
        quantity: 1, 
        addedAt: new Date().toISOString() 
      }];
    }
    
    setCartItems(updatedCart);
    await storeData('cartItems', updatedCart);
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cartItems.filter(item => item.product.id !== productId);
    setCartItems(updatedCart);
    await storeData('cartItems', updatedCart);
  };

  const clearCart = async () => {
    setCartItems([]);
    await storeData('cartItems', []);
  };

  const completePurchase = async () => {
    if (!currentUser || cartItems.length === 0) return;
    
    const newPurchases = cartItems.map(item => ({
      id: `${Date.now()}-${item.product.id}`,
      product: item.product,
      quantity: item.quantity,
      totalPrice: item.product.price * item.quantity,
      purchaseDate: new Date().toISOString(),
      buyerId: currentUser.id,
    }));
    
    const updatedPurchases = [...newPurchases, ...purchases];
    setPurchases(updatedPurchases);
    await storeData('purchases', updatedPurchases);
    await clearCart();
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