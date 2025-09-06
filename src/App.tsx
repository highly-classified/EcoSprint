import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { AuthForm } from './components/Auth/AuthForm';
import { Header } from './components/Layout/Header';
import { Navigation } from './components/Layout/Navigation';
import { ProductFeed } from './components/Products/ProductFeed';
import { ProductDetail } from './components/Products/ProductDetail';
import { AddProduct } from './components/Products/AddProduct';
import { MyListings } from './components/Products/MyListings';
import { Cart } from './components/Cart/Cart';
import { UserDashboard } from './components/Dashboard/UserDashboard';
import { PurchaseHistory } from './components/Dashboard/PurchaseHistory';

function AppContent() {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  if (!currentUser) {
    return <AuthForm isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} />;
  }

  const renderContent = () => {
    if (selectedProductId) {
      return (
        <ProductDetail
          productId={selectedProductId}
          onBack={() => setSelectedProductId(null)}
        />
      );
    }

    switch (activeTab) {
      case 'feed':
        return (
          <ProductFeed
            onAddProduct={() => setActiveTab('add-product')}
            onProductClick={setSelectedProductId}
          />
        );
      case 'add-product':
        return (
          <AddProduct onBack={() => setActiveTab('feed')} />
        );
      case 'my-listings':
        return (
          <MyListings
            onAddProduct={() => setActiveTab('add-product')}
            onEditProduct={(id) => {
              // In a real app, you'd navigate to an edit form
              setSelectedProductId(id);
            }}
            onProductClick={setSelectedProductId}
          />
        );
      case 'cart':
        return <Cart />;
      case 'purchases':
        return <PurchaseHistory />;
      case 'dashboard':
        return <UserDashboard />;
      default:
        return <ProductFeed onAddProduct={() => setActiveTab('add-product')} onProductClick={setSelectedProductId} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={() => {}}
        showSearch={activeTab === 'feed'}
      />
      
      <div className="flex flex-col md:flex-row">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;