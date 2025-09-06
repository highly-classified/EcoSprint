import React from 'react';
import { Package, Calendar, DollarSign, Leaf, Award } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function PurchaseHistory() {
  const { purchases } = useApp();

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.totalPrice, 0);
  const totalItems = purchases.reduce((sum, purchase) => sum + purchase.quantity, 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (purchases.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-100 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Package className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No purchases yet</h3>
        <p className="text-gray-600 mb-8">
          Start your sustainable shopping journey by purchasing eco-friendly items
        </p>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 max-w-md mx-auto">
          <div className="flex items-center space-x-2 text-emerald-700 mb-2">
            <Leaf className="h-5 w-5" />
            <span className="font-medium">Why shop sustainably?</span>
          </div>
          <div className="text-sm text-emerald-600 space-y-1">
            <p>🌱 Reduce environmental impact</p>
            <p>♻️ Support circular economy</p>
            <p>💚 Give items a second life</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Purchase History</h1>
        <div className="flex items-center space-x-6 text-emerald-100">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>{purchases.length} {purchases.length === 1 ? 'purchase' : 'purchases'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Total spent: ${totalSpent.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5" />
            <span>{totalItems} items saved</span>
          </div>
        </div>
      </div>

      {/* Environmental Impact Summary */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Award className="h-6 w-6 text-emerald-600" />
          <h3 className="text-lg font-semibold text-emerald-900">Your Environmental Impact</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">{totalItems}</p>
            <p className="text-sm text-emerald-700">Items Rescued</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">{(totalItems * 2.5).toFixed(1)}</p>
            <p className="text-sm text-emerald-700">kg CO₂ Saved</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">{totalItems * 15}</p>
            <p className="text-sm text-emerald-700">Liters Water Saved</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">{purchases.length}</p>
            <p className="text-sm text-emerald-700">Sustainable Choices</p>
          </div>
        </div>
      </div>

      {/* Purchase List */}
      <div className="space-y-4">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-6">
              {/* Product Image */}
              <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={purchase.product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'}
                  alt={purchase.product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{purchase.product.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Package className="h-4 w-4" />
                    <span>{purchase.product.category}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(purchase.purchaseDate)}</span>
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    purchase.product.condition === 'Like New' ? 'bg-emerald-100 text-emerald-700' :
                    purchase.product.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
                    purchase.product.condition === 'Fair' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {purchase.product.condition}
                  </span>
                </div>
              </div>

              {/* Purchase Details */}
              <div className="text-right">
                <div className="flex items-center space-x-2 text-gray-600 text-sm mb-1">
                  <span>Qty: {purchase.quantity}</span>
                </div>
                <div className="flex items-center space-x-1 text-xl font-bold text-emerald-600">
                  <DollarSign className="h-5 w-5" />
                  <span>{purchase.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Seller Info & Impact */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Purchased from <span className="font-medium text-gray-900">{purchase.product.sellerName}</span>
              </p>
              <div className="flex items-center space-x-2 text-sm text-emerald-600">
                <Leaf className="h-4 w-4" />
                <span>Saved ~{(purchase.quantity * 2.5).toFixed(1)} kg CO₂</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}