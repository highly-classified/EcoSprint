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
import { useTheme } from '../contexts/ThemeContext';
import { formatDateTime } from '../utils/formatPrice';

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;
  const { products, addToCart, currentUser } = useApp();
  const { colors } = useTheme(); // Added theme support
  
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { 
          backgroundColor: colors.surface,
          borderBottomColor: colors.border 
        }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={[styles.notFoundText, { color: colors.text }]}>
            Product not found
          </Text>
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
        return { bg: colors.success + '20', text: colors.success };
      case 'Good':
        return { bg: colors.info + '20', text: colors.info };
      case 'Fair':
        return { bg: colors.warning + '20', text: colors.warning };
      default:
        return { bg: colors.gray200, text: colors.textSecondary };
    }
  };

  const conditionColors = getConditionColor(product.condition);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { 
        backgroundColor: colors.surface,
        borderBottomColor: colors.border 
      }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Product Details
        </Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.imageContainer, { backgroundColor: colors.gray100 }]}>
          <Image
            source={{ uri: product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop' }}
            style={styles.image}
          />
          <View style={[styles.ecoBadge, { backgroundColor: colors.overlay }]}>
            <Ionicons name="leaf" size={16} color={colors.success} />
            <Text style={[styles.ecoText, { color: colors.success }]}>
              Eco-Friendly
            </Text>
          </View>
        </View>

        <View style={[styles.productInfo, { backgroundColor: colors.surface }]}>
          <View style={styles.titleSection}>
            <Text style={[styles.title, { color: colors.text }]}>
              {product.title}
            </Text>
            <Text style={[styles.price, { color: colors.primary }]}>
              ${product.price}
            </Text>
          </View>

          <View style={styles.metaSection}>
            <View style={styles.metaItem}>
              <Ionicons name="pricetag-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                {product.category}
              </Text>
            </View>
            <View style={[styles.conditionBadge, { backgroundColor: conditionColors.bg }]}>
              <Text style={[styles.conditionText, { color: conditionColors.text }]}>
                {product.condition}
              </Text>
            </View>
          </View>

          <View style={[styles.impactSection, { backgroundColor: colors.success + '10' }]}>
            <Text style={[styles.impactTitle, { color: colors.text }]}>
              Environmental Impact
            </Text>
            <View style={styles.impactList}>
              <Text style={[styles.impactItem, { color: colors.textSecondary }]}>
                ✅ Extends product lifecycle
              </Text>
              <Text style={[styles.impactItem, { color: colors.textSecondary }]}>
                ✅ Reduces manufacturing demand
              </Text>
              <Text style={[styles.impactItem, { color: colors.textSecondary }]}>
                ✅ Prevents landfill waste
              </Text>
              <Text style={[styles.impactItem, { color: colors.textSecondary }]}>
                ✅ Lower carbon footprint
              </Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Description
            </Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {product.description}
            </Text>
          </View>

          <View style={[styles.sellerSection, { backgroundColor: colors.gray100 }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Seller Information
            </Text>
            <View style={styles.sellerInfo}>
              <View style={[styles.sellerAvatar, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="person" size={20} color={colors.primary} />
              </View>
              <View style={styles.sellerDetails}>
                <Text style={[styles.sellerName, { color: colors.text }]}>
                  {product.sellerName}
                </Text>
                <Text style={[styles.sellerBadge, { color: colors.textSecondary }]}>
                  Verified Seller
                </Text>
              </View>
            </View>
            <View style={styles.sellerMeta}>
              <View style={styles.sellerMetaItem}>
                <Ionicons name="location-outline" size={16} color={colors.textTertiary} />
                <Text style={[styles.sellerMetaText, { color: colors.textSecondary }]}>
                  {product.location || 'Location not specified'}
                </Text>
              </View>
              <View style={styles.sellerMetaItem}>
                <Ionicons name="calendar-outline" size={16} color={colors.textTertiary} />
                <Text style={[styles.sellerMetaText, { color: colors.textSecondary }]}>
                  Listed on {formatDateTime(product.datePosted)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {!isOwnProduct && (
        <View style={[styles.actionSection, { 
          backgroundColor: colors.surface,
          borderTopColor: colors.border 
        }]}>
          <TouchableOpacity 
            style={[styles.addToCartButton, { backgroundColor: colors.primary }]} 
            onPress={handleAddToCart}
          >
            <Ionicons name="cart-outline" size={20} color={colors.white} />
            <Text style={[styles.addToCartText, { color: colors.white }]}>
              Add to Cart
            </Text>
          </TouchableOpacity>
          <Text style={[styles.actionNote, { color: colors.textTertiary }]}>
            Secure checkout • Support sustainable commerce
          </Text>
        </View>
      )}

      {isOwnProduct && (
        <View style={[styles.ownProductSection, { 
          backgroundColor: colors.info + '10',
          borderTopColor: colors.border 
        }]}>
          <View style={styles.ownProductInfo}>
            <Ionicons name="person-outline" size={20} color={colors.info} />
            <View style={styles.ownProductText}>
              <Text style={[styles.ownProductTitle, { color: colors.info }]}>
                This is your listing
              </Text>
              <Text style={[styles.ownProductSubtitle, { color: colors.info }]}>
                Manage your listing from the "My Items" section
              </Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ecoBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ecoText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  productInfo: {
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
    marginRight: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  impactList: {
    gap: 6,
  },
  impactItem: {
    fontSize: 14,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  sellerSection: {
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
  },
  sellerBadge: {
    fontSize: 12,
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
    marginLeft: 8,
  },
  actionSection: {
    padding: 20,
    borderTopWidth: 1,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  actionNote: {
    fontSize: 12,
    textAlign: 'center',
  },
  ownProductSection: {
    padding: 20,
    borderTopWidth: 1,
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
  },
  ownProductSubtitle: {
    fontSize: 12,
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
  },
});