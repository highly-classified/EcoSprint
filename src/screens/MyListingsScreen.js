import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import ProductCard from '../components/ProductCard';

export default function MyListingsScreen() {
  const navigation = useNavigation();
  const { products, currentUser, deleteProduct } = useApp();
  const { colors } = useTheme(); // Added theme support
  
  const myProducts = products.filter(product => 
    currentUser && product.sellerId === currentUser.id
  );

  const totalValue = myProducts.reduce((sum, product) => sum + product.price, 0);

  const handleDelete = (productId) => {
    Alert.alert(
      'Delete Listing',
      'Are you sure you want to delete this listing?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteProduct(productId)
        }
      ]
    );
  };

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.primary }]}>
      <View style={styles.headerContent}>
        <Text style={[styles.headerTitle, { color: colors.white }]}>
          My Sustainable Listings
        </Text>
        <View style={styles.headerStats}>
          <View style={styles.statItem}>
            <Ionicons name="list-outline" size={16} color={colors.white} />
            <Text style={[styles.statText, { color: colors.white }]}>
              {myProducts.length} items listed
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="trending-up-outline" size={16} color={colors.white} />
            <Text style={[styles.statText, { color: colors.white }]}>
              Total value: ${totalValue.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.white }]}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Ionicons name="add" size={20} color={colors.primary} />
        <Text style={[styles.addButtonText, { color: colors.primary }]}>
          Add Item
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <ProductCard
        product={item}
        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        showActions={false}
      />
      <View style={styles.productActions}>
        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: colors.info }]}
          onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        >
          <Ionicons name="create-outline" size={16} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: colors.error }]}
          onPress={() => handleDelete(item.id)}
        >
          <Ionicons name="trash-outline" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="list-outline" size={60} color={colors.textTertiary} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No listings yet
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        Start your sustainable selling journey by listing your first item
      </Text>
      <TouchableOpacity
        style={[styles.emptyButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Text style={[styles.emptyButtonText, { color: colors.white }]}>
          List Your First Item
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={myProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={myProducts.length > 0 ? styles.row : null}
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
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  header: {
    margin: 16,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
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
    marginLeft: 6,
    opacity: 0.9,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addButtonText: {
    fontWeight: '600',
    marginLeft: 6,
  },
  productContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  productActions: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    borderRadius: 16,
    padding: 8,
  },
  deleteButton: {
    borderRadius: 16,
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
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
  emptyButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});