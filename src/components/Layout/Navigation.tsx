import React from 'react';
import { Home, Package, ShoppingCart, User, History, Plus } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'feed', label: 'Discover', icon: Home },
    { id: 'my-listings', label: 'My Items', icon: Package },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'purchases', label: 'Orders', icon: History },
    { id: 'dashboard', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 md:relative md:border-t-0 md:border-r md:w-64 md:bg-gray-50 md:min-h-screen">
      <div className="flex md:flex-col md:h-full md:py-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 md:flex-none flex items-center justify-center md:justify-start space-x-0 md:space-x-3 py-3 px-4 md:mx-4 md:rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-emerald-600 bg-emerald-50 md:bg-emerald-100'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-100 md:hover:bg-emerald-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          );
        })}
        
        {/* Add Product Button - Desktop Only */}
        <div className="hidden md:block mt-6 mx-4">
          <button
            onClick={() => onTabChange('add-product')}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>List Item</span>
          </button>
        </div>
      </div>
    </nav>
  );
}