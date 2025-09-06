import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApp } from '../contexts/AppContext';
import { COLORS } from '../utils/constants';
import { formatDateTime } from '../utils/formatPrice';

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;
  const { products, addToCart, currentUser } = useApp();
  
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.gray900} />
          </TouchableOpacity>
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isOwnProduct = currentUser?.id === product.sellerId;

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Success', 'Item added to cart!');
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Like New':
        return { bg: '#dcfce7', text: '#166534' };
      case 'Good':
        return { bg: '#dbeafe', text: '#1d4ed8' };
      case 'Fair':
        return { bg: '#fef3c7', text: '#d97706' };
      default:
        return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const conditionColors = getConditionColor(product.condition);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.gray900} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color={COLORS.gray900} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop' }}
            style={styles.image}
          />
          <View style={styles.ecoBadge}>
            <Ionicons name="leaf" size={16} color={COLORS.success} />
            <Text style={styles.ecoText}>Eco-Friendly</Text>
          </View>
        </View>

        <View style={styles.productInfo}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>

          <View style={styles.metaSection}>
            <View style={styles.metaItem}>
              <Ionicons name="pricetag-outline" size={16} color={COLORS.gray600} />
              <Text style={styles.metaText}>{product.category}</Text>
            </View>
            <View style={[styles.conditionBadge, { backgroundColor: conditionColors.bg }]}>
              <Text style={[styles.conditionText, { color: conditionColors.text }]}>
                {product.condition}
              </Text>
            </View>
          </View>

          <View style={styles.impactSection}>
            <Text style={styles.impactTitle}>Environmental Impact</Text>
            <View style={styles.impactList}>
              <Text style={styles.impactItem}>✅ Extends product lifecycle</Text>
              <Text style={styles.impactItem}>✅ Reduces manufacturing demand</Text>
              <Text style={styles.impactItem}>✅ Prevents landfill waste</Text>
              <Text style={styles.impactItem}>✅ Lower carbon footprint</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.sellerSection}>
            <Text style={styles.sectionTitle}>Seller Information</Text>
            <View style={styles.sellerInfo}>
              <View style={styles.sellerAvatar}>
                <Ionicons name="person" size={20} color={COLORS.primary} />
              </View>
              <View style={styles.sellerDetails}>
                <Text style={styles.sellerName}>{product.sellerName}</Text>
                <Text style={styles.sellerBadge}>Verified Seller</Text>
              </View>
            </View>
            <View style={styles.sellerMeta}>
              <View style={styles.sellerMetaItem}>
                <Ionicons name="location-outline" size={16} color={COLORS.gray500} />
                <Text style={styles.sellerMetaText}>{product.location || 'Location not specified'}</Text>
              </View>
              <View style={styles.sellerMetaItem}>
                <Ionicons name="calendar-outline" size={16} color={COLORS.gray500} />
                <Text style={styles.sellerMetaText}>Listed on {formatDateTime(product.datePosted)}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {!isOwnProduct && (
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Ionicons name="cart-outline" size={20} color={COLORS.white} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          <Text style={styles.actionNote}>Secure checkout • Support sustainable commerce</Text>
        </View>
      )}

      {isOwnProduct && (
        <View style={styles.ownProductSection}>
          <View style={styles.ownProductInfo}>
            <Ionicons name="person-outline" size={20} color={COLORS.info} />
            <View style={styles.ownProductText}>
              <Text style={styles.ownProductTitle}>This is your listing</Text>
              <Text style={styles.ownProductSubtitle}>Manage your listing from the "My Items" section</Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
    backgroundColor: COLORS.gray100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ecoBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ecoText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.success,
    marginLeft: 6,
  },
  productInfo: {
    backgroundColor: COLORS.white,
    padding: 20,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginRight: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  metaSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: COLORS.gray600,
    marginLeft: 6,
  },
  conditionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  conditionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  impactSection: {
    backgroundColor: COLORS.success + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 12,
  },
  impactList: {
    gap: 6,
  },
  impactItem: {
    fontSize: 14,
    color: COLORS.gray700,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray700,
    lineHeight: 20,
  },
  sellerSection: {
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sellerAvatar: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary + '20',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  sellerBadge: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  sellerMeta: {
    gap: 8,
  },
  sellerMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerMetaText: {
    fontSize: 12,
    color: COLORS.gray600,
    marginLeft: 8,
  },
  actionSection: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  addToCartText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  actionNote: {
    fontSize: 12,
    color: COLORS.gray500,
    textAlign: 'center',
  },
  ownProductSection: {
    backgroundColor: COLORS.info + '10',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  ownProductInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownProductText: {
    marginLeft: 12,
  },
  ownProductTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.info,
  },
  ownProductSubtitle: {
    fontSize: 12,
    color: COLORS.info,
    opacity: 0.8,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray900,
  },
});