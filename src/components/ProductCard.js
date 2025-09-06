import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../contexts/AppContext';
import { COLORS } from '../utils/constants';
import { formatDate } from '../utils/formatPrice';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export default function ProductCard({ product, onPress, showActions = true }) {
  const { addToCart, currentUser } = useApp();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const isOwnProduct = currentUser?.id === product.sellerId;

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Like New':
        return COLORS.success;
      case 'Good':
        return COLORS.info;
      case 'Fair':
        return COLORS.warning;
      default:
        return COLORS.gray500;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop' }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={16} color={COLORS.gray600} />
        </TouchableOpacity>
        <View style={styles.conditionBadge}>
          <Text style={[styles.conditionText, { color: getConditionColor(product.condition) }]}>
            {product.condition}
          </Text>
        </View>
        <View style={styles.ecoBadge}>
          <Ionicons name="leaf" size={12} color={COLORS.success} />
          <Text style={styles.ecoText}>Eco-Friendly</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={12} color={COLORS.gray500} />
            <Text style={styles.metaText}>{product.location || product.sellerName}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={12} color={COLORS.gray500} />
            <Text style={styles.metaText}>{formatDate(product.datePosted)}</Text>
          </View>
        </View>

        {showActions && !isOwnProduct && (
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Ionicons name="cart-outline" size={16} color={COLORS.white} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        )}

        {isOwnProduct && (
          <View style={styles.ownProductButton}>
            <Text style={styles.ownProductText}>Your Listing</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    height: cardWidth,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  conditionBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  conditionText: {
    fontSize: 10,
    fontWeight: '600',
  },
  ecoBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ecoText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.success,
    marginLeft: 4,
  },
  content: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray900,
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  description: {
    fontSize: 12,
    color: COLORS.gray600,
    marginBottom: 12,
    lineHeight: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  metaText: {
    fontSize: 10,
    color: COLORS.gray500,
    marginLeft: 4,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  addToCartText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  ownProductButton: {
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  ownProductText: {
    color: COLORS.gray600,
    fontSize: 12,
    fontWeight: '600',
  },
});