import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../contexts/AppContext';
import { COLORS } from '../utils/constants';

export default function CartScreen() {
  const { cartItems, removeFromCart, completePurchase } = useApp();

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    Alert.alert(
      'Complete Purchase',
      'Are you sure you want to complete this purchase?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Purchase', 
          onPress: () => {
            completePurchase();
            Alert.alert('Success', '🎉 Purchase completed! Thank you for choosing sustainable shopping. Check your order history.');
          }
        }
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Shopping Cart</Text>
      <View style={styles.headerStats}>
        <Text style={styles.headerStat}>{totalItems} {totalItems === 1 ? 'item' : 'items'}</Text>
        <View style={styles.headerStatItem}>
          <Ionicons name="leaf" size={16} color={COLORS.white} />
          <Text style={styles.headerStat}>Sustainable choices</Text>
        </View>
      </View>
    </View>
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop' }}
        style={styles.itemImage}
      />
      
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.product.title}</Text>
        <View style={styles.itemMeta}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.product.category}</Text>
          </View>
          <View style={[styles.conditionBadge, { backgroundColor: getConditionColor(item.product.condition) }]}>
            <Text style={styles.conditionText}>{item.product.condition}</Text>
          </View>
        </View>
        <Text style={styles.itemPrice}>${item.product.price}</Text>
      </View>

      <View style={styles.itemActions}>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Qty:</Text>
          <View style={styles.quantityBadge}>
            <Text style={styles.quantityText}>{item.quantity}</Text>
          </View>
        </View>
        
        <Text style={styles.itemTotal}>
          ${(item.product.price * item.quantity).toFixed(2)}
        </Text>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.product.id)}
        >
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Like New':
        return COLORS.success + '20';
      case 'Good':
        return COLORS.info + '20';
      case 'Fair':
        return COLORS.warning + '20';
      default:
        return COLORS.gray200;
    }
  };

  const renderSummary = () => (
    <View style={styles.summaryContainer}>
      <View style={styles.impactSection}>
        <View style={styles.impactHeader}>
          <Ionicons name="leaf" size={20} color={COLORS.success} />
          <Text style={styles.impactTitle}>Your Environmental Impact</Text>
        </View>
        <View style={styles.impactGrid}>
          <View style={styles.impactItem}>
            <Text style={styles.impactValue}>✅ {totalItems} items saved from waste</Text>
          </View>
          <View style={styles.impactItem}>
            <Text style={styles.impactValue}>✅ Reduced carbon footprint</Text>
          </View>
          <View style={styles.impactItem}>
            <Text style={styles.impactValue}>✅ Supporting circular economy</Text>
          </View>
          <View style={styles.impactItem}>
            <Text style={styles.impactValue}>✅ Promoting sustainability</Text>
          </View>
        </View>
      </View>

      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
        </View>
        
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Ionicons name="card-outline" size={20} color={COLORS.white} />
          <Text style={styles.checkoutButtonText}>Complete Sustainable Purchase</Text>
        </TouchableOpacity>
        
        <Text style={styles.demoNote}>
          🌱 This is a demo - no actual payment will be processed
        </Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={60} color={COLORS.gray400} />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>
        Discover sustainable products and add them to your cart
      </Text>
      <View style={styles.emptyImpact}>
        <View style={styles.emptyImpactHeader}>
          <Ionicons name="leaf" size={20} color={COLORS.success} />
          <Text style={styles.emptyImpactText}>Every purchase makes a difference for our planet</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {cartItems.length === 0 ? (
        renderEmpty()
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.product.id}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderSummary}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: COLORS.primary,
    margin: 16,
    borderRadius: 16,
    padding: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  headerStat: {
    fontSize: 14,
    color: COLORS.gray100,
  },
  headerStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cartItem: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: COLORS.gray100,
  },
  itemContent: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    color: COLORS.gray600,
  },
  conditionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  conditionText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.gray700,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  itemActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityLabel: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  quantityBadge: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  itemTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
  },
  summaryContainer: {
    margin: 16,
    gap: 16,
  },
  impactSection: {
    backgroundColor: COLORS.success + '10',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.success + '30',
  },
  impactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.success,
    marginLeft: 8,
  },
  impactGrid: {
    gap: 8,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactValue: {
    fontSize: 14,
    color: COLORS.success,
  },
  totalSection: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  demoNote: {
    fontSize: 12,
    color: COLORS.gray500,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.gray900,
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  emptyImpact: {
    backgroundColor: COLORS.success + '10',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.success + '30',
  },
  emptyImpactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyImpactText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.success,
    marginLeft: 8,
  },
});