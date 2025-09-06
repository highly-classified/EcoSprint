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
import { useTheme } from '../contexts/ThemeContext';

export default function CartScreen() {
  const { cartItems, removeFromCart, completePurchase } = useApp();
  const { colors } = useTheme(); // Added theme support

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

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Like New':
        return colors.success + '20';
      case 'Good':
        return colors.info + '20';
      case 'Fair':
        return colors.warning + '20';
      default:
        return colors.gray200;
    }
  };

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.primary }]}>
      <Text style={[styles.headerTitle, { color: colors.white }]}>
        Shopping Cart
      </Text>
      <View style={styles.headerStats}>
        <Text style={[styles.headerStat, { color: colors.white }]}>
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </Text>
        <View style={styles.headerStatItem}>
          <Ionicons name="leaf" size={16} color={colors.white} />
          <Text style={[styles.headerStat, { color: colors.white }]}>
            Sustainable choices
          </Text>
        </View>
      </View>
    </View>
  );

  const renderCartItem = ({ item }) => (
    <View style={[styles.cartItem, { 
      backgroundColor: colors.surface,
      shadowColor: colors.cardShadow 
    }]}>
      <Image
        source={{ uri: item.product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop' }}
        style={[styles.itemImage, { backgroundColor: colors.gray100 }]}
      />
      
      <View style={styles.itemContent}>
        <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={2}>
          {item.product.title}
        </Text>
        <View style={styles.itemMeta}>
          <View style={[styles.categoryBadge, { backgroundColor: colors.gray100 }]}>
            <Text style={[styles.categoryText, { color: colors.textSecondary }]}>
              {item.product.category}
            </Text>
          </View>
          <View style={[styles.conditionBadge, { 
            backgroundColor: getConditionColor(item.product.condition) 
          }]}>
            <Text style={[styles.conditionText, { color: colors.text }]}>
              {item.product.condition}
            </Text>
          </View>
        </View>
        <Text style={[styles.itemPrice, { color: colors.primary }]}>
          ${item.product.price}
        </Text>
      </View>

      <View style={styles.itemActions}>
        <View style={styles.quantityContainer}>
          <Text style={[styles.quantityLabel, { color: colors.textSecondary }]}>
            Qty:
          </Text>
          <View style={[styles.quantityBadge, { backgroundColor: colors.gray100 }]}>
            <Text style={[styles.quantityText, { color: colors.text }]}>
              {item.quantity}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.itemTotal, { color: colors.text }]}>
          ${(item.product.price * item.quantity).toFixed(2)}
        </Text>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.product.id)}
        >
          <Ionicons name="trash-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSummary = () => (
    <View style={styles.summaryContainer}>
      <View style={[styles.impactSection, { 
        backgroundColor: colors.success + '10',
        borderColor: colors.success + '30' 
      }]}>
        <View style={styles.impactHeader}>
          <Ionicons name="leaf" size={20} color={colors.success} />
          <Text style={[styles.impactTitle, { color: colors.success }]}>
            Your Environmental Impact
          </Text>
        </View>
        <View style={styles.impactGrid}>
          <View style={styles.impactItem}>
            <Text style={[styles.impactValue, { color: colors.success }]}>
              ✅ {totalItems} items saved from waste
            </Text>
          </View>
          <View style={styles.impactItem}>
            <Text style={[styles.impactValue, { color: colors.success }]}>
              ✅ Reduced carbon footprint
            </Text>
          </View>
          <View style={styles.impactItem}>
            <Text style={[styles.impactValue, { color: colors.success }]}>
              ✅ Supporting circular economy
            </Text>
          </View>
          <View style={styles.impactItem}>
            <Text style={[styles.impactValue, { color: colors.success }]}>
              ✅ Promoting sustainability
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.totalSection, { 
        backgroundColor: colors.surface,
        shadowColor: colors.cardShadow 
      }]}>
        <View style={[styles.totalRow, { borderTopColor: colors.border }]}>
          <Text style={[styles.totalLabel, { color: colors.text }]}>
            Total:
          </Text>
          <Text style={[styles.totalAmount, { color: colors.primary }]}>
            ${totalAmount.toFixed(2)}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.checkoutButton, { 
            backgroundColor: colors.primary,
            shadowColor: colors.cardShadow 
          }]} 
          onPress={handleCheckout}
        >
          <Ionicons name="card-outline" size={20} color={colors.white} />
          <Text style={[styles.checkoutButtonText, { color: colors.white }]}>
            Complete Sustainable Purchase
          </Text>
        </TouchableOpacity>
        
        <Text style={[styles.demoNote, { color: colors.textTertiary }]}>
          🌱 This is a demo - no actual payment will be processed
        </Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={60} color={colors.textTertiary} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        Your cart is empty
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        Discover sustainable products and add them to your cart
      </Text>
      <View style={[styles.emptyImpact, { 
        backgroundColor: colors.success + '10',
        borderColor: colors.success + '30' 
      }]}>
        <View style={styles.emptyImpactHeader}>
          <Ionicons name="leaf" size={20} color={colors.success} />
          <Text style={[styles.emptyImpactText, { color: colors.success }]}>
            Every purchase makes a difference for our planet
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
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
  },
  listContent: {
    flexGrow: 1,
  },
  header: {
    margin: 16,
    borderRadius: 16,
    padding: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  headerStat: {
    fontSize: 14,
    opacity: 0.9,
  },
  headerStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cartItem: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  itemContent: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
  },
  conditionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  conditionText: {
    fontSize: 10,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  quantityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  itemTotal: {
    fontSize: 18,
    fontWeight: 'bold',
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
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  impactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: '600',
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
  },
  totalSection: {
    borderRadius: 16,
    padding: 20,
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
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  demoNote: {
    fontSize: 12,
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
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  emptyImpact: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  emptyImpactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyImpactText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
});