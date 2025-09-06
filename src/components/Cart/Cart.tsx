import React from 'react';
import { Trash2, ShoppingBag, CreditCard, Leaf, Minus, Plus } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function Cart() {
  const { cartItems, removeFromCart, completePurchase } = useApp();

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    completePurchase();
    alert('🎉 Purchase completed! Thank you for choosing sustainable shopping. Check your order history.');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-100 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
          <ShoppingBag className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600 mb-8">
          Discover sustainable products and add them to your cart
        </p>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 max-w-md mx-auto">
          <div className="flex items-center space-x-2 text-emerald-700">
            <Leaf className="h-5 w-5" />
            <span className="text-sm font-medium">Every purchase makes a difference for our planet</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <div className="flex items-center space-x-6 text-emerald-100">
          <span>{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
          <div className="flex items-center space-x-2">
            <Leaf className="h-4 w-4" />
            <span>Sustainable choices</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-6">
              {/* Product Image */}
              <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={item.product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'}
                  alt={item.product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{item.product.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded-full">{item.product.category}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.product.condition === 'Like New' ? 'bg-emerald-100 text-emerald-700' :
                    item.product.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
                    item.product.condition === 'Fair' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {item.product.condition}
                  </span>
                </div>
                <p className="text-emerald-600 font-semibold mt-2">${item.product.price}</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Qty:</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">{item.quantity}</span>
              </div>

              {/* Total Price */}
              <div className="text-right">
                <p className="font-bold text-lg text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="space-y-6">
          {/* Environmental Impact */}
          <div className="bg-emerald-50 rounded-xl p-6">
            <h3 className="font-semibold text-emerald-900 mb-3 flex items-center space-x-2">
              <Leaf className="h-5 w-5" />
              <span>Your Environmental Impact</span>
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-emerald-700">
              <div>✅ {totalItems} items saved from waste</div>
              <div>✅ Reduced carbon footprint</div>
              <div>✅ Supporting circular economy</div>
              <div>✅ Promoting sustainability</div>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between text-2xl font-bold border-t pt-6">
            <span className="text-gray-900">Total:</span>
            <span className="text-emerald-600">${totalAmount.toFixed(2)}</span>
          </div>
          
          <button
            onClick={handleCheckout}
            className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
          >
            <CreditCard className="h-5 w-5" />
            <span>Complete Sustainable Purchase</span>
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            🌱 This is a demo - no actual payment will be processed
          </p>
        </div>
      </div>
    </div>
  );
}