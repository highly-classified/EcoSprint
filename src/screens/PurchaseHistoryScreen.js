import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { formatDateTime } from '../utils/formatPrice';

export default function PurchaseHistoryScreen() {
  const { purchases } = useApp();
  const { colors } = useTheme(); // Added theme support

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.totalPrice, 0);
  const totalItems = purchases.reduce((sum, purchase) => sum + purchase.quantity, 0);

  const renderHeader = () => (
    <View>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={[styles.headerTitle, { color: colors.white }]}>Purchase History</Text>
        <View style={styles.headerStats}>
          <View style={styles.statItem}>
            <Ionicons name="receipt-outline" size={16} color={colors.white} />
            <Text style={[styles.statText, { color: colors.white }]}>
              {purchases.length} {purchases.length === 1 ? 'purchase' : 'purchases'}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="card-outline" size={16} color={colors.white} />
            <Text style={[styles.statText, { color: colors.white }]}>
              Total spent: ${totalSpent.toFixed(2)}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="leaf" size={16} color={colors.white} />
            <Text style={[styles.statText, { color: colors.white }]}>
              {totalItems} items saved
            </Text>
          </View>
        </View>
      </View>

      {purchases.length > 0 && (
        <View style={[styles.impactSection, { 
          backgroundColor: colors.success + '10',
          borderColor: colors.success + '30' 
        }]}>
          <View style={styles.impactHeader}>
            <Ionicons name="trophy" size={24} color={colors.success} />
            <Text style={[styles.impactTitle, { color: colors.success }]}>
              Your Environmental Impact
            </Text>
          </View>
          <View style={styles.impactGrid}>
            <View style={[styles.impactCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.impactValue, { color: colors.success }]}>
                {totalItems}
              </Text>
              <Text style={[styles.impactLabel, { color: colors.success }]}>
                Items Rescued
              </Text>
            </View>
            <View style={[styles.impactCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.impactValue, { color: colors.success }]}>
                {(totalItems * 2.5).toFixed(1)}
              </Text>
              <Text style={[styles.impactLabel, { color: colors.success }]}>
                kg CO₂ Saved
              </Text>
            </View>
            <View style={[styles.impactCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.impactValue, { color: colors.success }]}>
                {totalItems * 15}
              </Text>
              <Text style={[styles.impactLabel, { color: colors.success }]}>
                Liters Water Saved
              </Text>
            </View>
            <View style={[styles.impactCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.impactValue, { color: colors.success }]}>
                {purchases.length}
              </Text>
              <Text style={[styles.impactLabel, { color: colors.success }]}>
                Sustainable Choices
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );

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

  const renderPurchase = ({ item }) => (
    <View style={[styles.purchaseItem, { 
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
          <View style={styles.metaItem}>
            <Ionicons name="pricetag-outline" size={14} color={colors.textTertiary} />
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
              {item.product.category}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color={colors.textTertiary} />
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
              {formatDateTime(item.purchaseDate)}
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
      </View>

      <View style={styles.itemActions}>
        <View style={styles.quantityInfo}>
          <Text style={[styles.quantityText, { color: colors.textSecondary }]}>
            Qty: {item.quantity}
          </Text>
        </View>
        <View style={styles.priceInfo}>
          <Ionicons name="card-outline" size={16} color={colors.primary} />
          <Text style={[styles.priceText, { color: colors.primary }]}>
            ${item.totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="receipt-outline" size={60} color={colors.textTertiary} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No purchases yet
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        Start your sustainable shopping journey by purchasing eco-friendly items
      </Text>
      <View style={[styles.emptyImpact, { 
        backgroundColor: colors.success + '10',
        borderColor: colors.success + '30' 
      }]}>
        <View style={styles.emptyImpactHeader}>
          <Ionicons name="leaf" size={20} color={colors.success} />
          <Text style={[styles.emptyImpactTitle, { color: colors.success }]}>
            Why shop sustainably?
          </Text>
        </View>
        <View style={styles.emptyImpactList}>
          <Text style={[styles.emptyImpactItem, { color: colors.success }]}>
            🌱 Reduce environmental impact
          </Text>
          <Text style={[styles.emptyImpactItem, { color: colors.success }]}>
            ♻️ Support circular economy
          </Text>
          <Text style={[styles.emptyImpactItem, { color: colors.success }]}>
            💚 Give items a second life
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={purchases}
        renderItem={renderPurchase}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
      />
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
    marginBottom: 12,
  },
  headerStats: {
    gap: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    marginLeft: 8,
  },
  impactSection: {
    marginHorizontal: 16,
    marginBottom: 16,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  impactCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
  },
  impactValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  impactLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  purchaseItem: {
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
    flexWrap: 'wrap',
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
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
  itemActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  quantityInfo: {
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 12,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 4,
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
    padding: 20,
    borderWidth: 1,
    width: '100%',
  },
  emptyImpactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyImpactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyImpactList: {
    gap: 6,
  },
  emptyImpactItem: {
    fontSize: 14,
  },
});