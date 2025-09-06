import React from 'react';
import { Plus, Edit, Trash2, Package, TrendingUp } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ProductCard } from './ProductCard';

interface MyListingsProps {
  onAddProduct: () => void;
  onEditProduct: (productId: string) => void;
  onProductClick: (productId: string) => void;
}

export function MyListings({ onAddProduct, onEditProduct, onProductClick }: MyListingsProps) {
  const { products, currentUser, deleteProduct } = useApp();
  
  const myProducts = products.filter(product => 
    currentUser && product.sellerId === currentUser.id
  );

  const handleDelete = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this listing?')) {
      deleteProduct(productId);
    }
  };

  const totalValue = myProducts.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Sustainable Listings</h1>
            <div className="flex items-center space-x-6 text-emerald-100">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>{myProducts.length} items listed</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Total value: ${totalValue.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onAddProduct}
            className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center space-x-2 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {myProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-100 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Package className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start your sustainable selling journey by listing your first item
          </p>
          <button
            onClick={onAddProduct}
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
          >
            List Your First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myProducts.map(product => (
            <div key={product.id} className="relative group">
              <ProductCard
                product={product}
                onClick={() => onProductClick(product.id)}
                showActions={false}
              />
              
              {/* Action Buttons */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditProduct(product.id);
                  }}
                  className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                  title="Edit listing"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => handleDelete(product.id, e)}
                  className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors"
                  title="Delete listing"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}