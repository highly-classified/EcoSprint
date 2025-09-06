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
import { useTheme } from '../contexts/ThemeContext';
import { formatDate } from '../utils/formatPrice';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export default function ProductCard({ product, onPress, showActions = true }) {
  const { addToCart, currentUser } = useApp();
  const { colors } = useTheme();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const isOwnProduct = currentUser?.id === product.sellerId;

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Like New':
        return colors.success;
      case 'Good':
        return colors.info;
      case 'Fair':
        return colors.warning;
      default:
        return colors.textTertiary;
    }
  };

  return (
    <TouchableOpacity style={[styles.container, { 
      backgroundColor: colors.surface,
      shadowColor: colors.cardShadow,
    }]} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop' }}
          style={styles.image}
        />
        <TouchableOpacity style={[styles.favoriteButton, { backgroundColor: colors.overlay }]}>
          <Ionicons name="heart-outline" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
        <View style={[styles.conditionBadge, { backgroundColor: colors.surface }]}>
          <Text style={[styles.conditionText, { color: getConditionColor(product.condition) }]}>
            {product.condition}
          </Text>
        </View>
        <View style={[styles.ecoBadge, { backgroundColor: colors.overlay }]}>
          <Ionicons name="leaf" size={12} color={colors.success} />
          <Text style={[styles.ecoText, { color: colors.success }]}>Eco-Friendly</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={[styles.price, { color: colors.primary }]}>${product.price}</Text>
        </View>
        
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
          {product.description}
        </Text>
        
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={12} color={colors.textTertiary} />
            <Text style={[styles.metaText, { color: colors.textTertiary }]}>
              {product.location || product.sellerName}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={12} color={colors.textTertiary} />
            <Text style={[styles.metaText, { color: colors.textTertiary }]}>
              {formatDate(product.datePosted)}
            </Text>
          </View>
        </View>

        {showActions && !isOwnProduct && (
          <TouchableOpacity 
            style={[styles.addToCartButton, { backgroundColor: colors.primary }]} 
            onPress={handleAddToCart}
          >
            <Ionicons name="cart-outline" size={16} color={colors.white} />
            <Text style={[styles.addToCartText, { color: colors.white }]}>Add to Cart</Text>
          </TouchableOpacity>
        )}

        {isOwnProduct && (
          <View style={[styles.ownProductButton, { backgroundColor: colors.gray100 }]}>
            <Text style={[styles.ownProductText, { color: colors.textSecondary }]}>Your Listing</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: 16,
    marginBottom: 16,
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
    borderRadius: 20,
    padding: 8,
  },
  conditionBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
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
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ecoText: {
    fontSize: 10,
    fontWeight: '600',
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
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
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
    marginLeft: 4,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  ownProductButton: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  ownProductText: {
    fontSize: 12,
    fontWeight: '600',
  },
});