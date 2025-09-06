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
import { COLORS } from '../utils/constants';
import { formatDateTime } from '../utils/formatPrice';

export default function PurchaseHistoryScreen() {
  const { purchases } = useApp();

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.totalPrice, 0);
  const totalItems = purchases.reduce((sum, purchase) => sum + purchase.quantity, 0);

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Purchase History</Text>
        <View style={styles.headerStats}>
          <View style={styles.statItem}>
            <Ionicons name="receipt-outline" size={16} color={COLORS.white} />
            <Text style={styles.statText}>{purchases.length} {purchases.length === 1 ? 'purchase' : 'purchases'}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="card-outline" size={16} color={COLORS.white} />
            <Text style={styles.statText}>Total spent: ${totalSpent.toFixed(2)}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="leaf" size={16} color={COLORS.white} />
            <Text style={styles.statText}>{totalItems} items saved</Text>
          </View>
        </View>
      </View>

      {purchases.length > 0 && (
        <View style={styles.impactSection}>
          <View style={styles.impactHeader}>
            <Ionicons name="trophy" size={24} color={COLORS.success} />
            <Text style={styles.impactTitle}>Your Environmental Impact</Text>
          </View>
          <View style={styles.impactGrid}>
            <View style={styles.impactCard}>
              <Text style={styles.impactValue}>{totalItems}</Text>
              <Text style={styles.impactLabel}>Items Rescued</Text>
            </View>
            <View style={styles.impactCard}>
              <Text style={styles.impactValue}>{(totalItems * 2.5).toFixed(1)}</Text>
              <Text style={styles.impactLabel}>kg CO₂ Saved</Text>
            </View>
            <View style={styles.impactCard}>
              <Text style={styles.impactValue}>{totalItems * 15}</Text>
              <Text style={styles.impactLabel}>Liters Water Saved</Text>
            </View>
            <View style={styles.impactCard}>
              <Text style={styles.impactValue}>{purchases.length}</Text>
              <Text style={styles.impactLabel}>Sustainable Choices</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const renderPurchase = ({ item }) => (
    <View style={styles.purchaseItem}>
      <Image
        source={{ uri: item.product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop' }}
        style={styles.itemImage}
      />
      
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.product.title}</Text>
        <View style={styles.itemMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="pricetag-outline" size={14} color={COLORS.gray500} />
            <Text style={styles.metaText}>{item.product.category}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.gray500} />
            <Text style={styles.metaText}>{formatDateTime(item.purchaseDate)}</Text>
          </View>
          <View style={[styles.conditionBadge, { backgroundColor: getConditionColor(item.product.condition) }]}>
            <Text style={styles.conditionText}>{item.product.condition}</Text>
          </View>
        </View>
      </View>

      <View style={styles.itemActions}>
        <View style={styles.quantityInfo}>
          <Text style={styles.quantityText}>Qty: {item.quantity}</Text>
        </View>
        <View style={styles.priceInfo}>
          <Ionicons name="card-outline" size={16} color={COLORS.primary} />
          <Text style={styles.priceText}>${item.totalPrice.toFixed(2)}</Text>
        </View>
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

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="receipt-outline" size={60} color={COLORS.gray400} />
      <Text style={styles.emptyTitle}>No purchases yet</Text>
      <Text style={styles.emptySubtitle}>
        Start your sustainable shopping journey by purchasing eco-friendly items
      </Text>
      <View style={styles.emptyImpact}>
        <View style={styles.emptyImpactHeader}>
          <Ionicons name="leaf" size={20} color={COLORS.success} />
          <Text style={styles.emptyImpactTitle}>Why shop sustainably?</Text>
        </View>
        <View style={styles.emptyImpactList}>
          <Text style={styles.emptyImpactItem}>🌱 Reduce environmental impact</Text>
          <Text style={styles.emptyImpactItem}>♻️ Support circular economy</Text>
          <Text style={styles.emptyImpactItem}>💚 Give items a second life</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
    color: COLORS.gray100,
    marginLeft: 8,
  },
  impactSection: {
    backgroundColor: COLORS.success + '10',
    marginHorizontal: 16,
    marginBottom: 16,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  impactCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
  },
  impactValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  impactLabel: {
    fontSize: 12,
    color: COLORS.success,
    marginTop: 4,
  },
  purchaseItem: {
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
    flexWrap: 'wrap',
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: COLORS.gray600,
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
    color: COLORS.gray700,
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
    color: COLORS.gray600,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
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
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.success + '30',
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
    color: COLORS.success,
    marginLeft: 8,
  },
  emptyImpactList: {
    gap: 6,
  },
  emptyImpactItem: {
    fontSize: 14,
    color: COLORS.success,
  },
});