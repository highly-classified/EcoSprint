import React from 'react';
import { ArrowLeft, Calendar, MapPin, Tag, ShoppingCart, User, Leaf, Heart } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
}

export function ProductDetail({ productId, onBack }: ProductDetailProps) {
  const { products, addToCart, currentUser } = useApp();
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Product not found</h2>
        <button onClick={onBack} className="mt-4 text-emerald-600 hover:text-emerald-700">
          Go back
        </button>
      </div>
    );
  }

  const isOwnProduct = currentUser?.id === product.sellerId;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="p-3 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
          <p className="text-gray-600">Sustainable marketplace item</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
            <img
              src={product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm hover:bg-white transition-colors">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="absolute top-4 left-4">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center space-x-2">
                <Leaf className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-600">Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Tag className="h-4 w-4" />
                    <span>{product.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.condition === 'Like New' ? 'bg-emerald-100 text-emerald-700' :
                      product.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
                      product.condition === 'Fair' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {product.condition}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-4xl font-bold text-emerald-600">${product.price}</span>
                <p className="text-sm text-gray-500">Best offer</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Environmental Impact</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>✅ Extends product lifecycle</p>
              <p>✅ Reduces manufacturing demand</p>
              <p>✅ Prevents landfill waste</p>
              <p>✅ Lower carbon footprint</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <User className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{product.sellerName}</p>
                  <p className="text-sm text-gray-600">Verified Seller</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{product.location || 'Location not specified'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 text-sm">Listed on {formatDate(product.datePosted)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {!isOwnProduct && (
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <p className="text-xs text-gray-500 text-center">
                Secure checkout • Support sustainable commerce
              </p>
            </div>
          )}

          {isOwnProduct && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">This is your listing</p>
                  <p className="text-sm text-blue-700">Manage your listing from the "My Items" section</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}