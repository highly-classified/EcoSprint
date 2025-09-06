import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../utils/constants';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { products } = useApp();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Improved filtering with useMemo for performance
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }

    return products.filter(product => {
      // Ensure product has required fields
      if (!product.title || !product.description) {
        return false;
      }

      // Search matching - case insensitive and trimmed
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = query === '' || 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.brand && product.brand.toLowerCase().includes(query)) ||
        (product.condition && product.condition.toLowerCase().includes(query));

      // Category matching
      const matchesCategory = !selectedCategory || 
        selectedCategory === '' || 
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    // Optionally close filters after selection
    // setShowFilters(false);
  };

  const renderHeader = () => (
    <View>
      {/* Hero Section */}
      <View style={[styles.heroSection, { backgroundColor: colors.primary }]}>
        <View style={styles.heroContent}>
          <View style={styles.heroHeader}>
            <Ionicons name="star" size={24} color={colors.white} />
            <Text style={[styles.heroTitle, { color: colors.white }]}>
              Discover Sustainable Treasures
            </Text>
          </View>
          <Text style={[styles.heroSubtitle, { color: colors.white }]}>
            Find unique pre-loved items and give them a new life while reducing environmental impact.
          </Text>
          <TouchableOpacity
            style={[styles.heroButton, { backgroundColor: colors.white }]}
            onPress={() => navigation.navigate('AddProduct')}
          >
            <Ionicons name="add" size={20} color={colors.primary} />
            <Text style={[styles.heroButtonText, { color: colors.primary }]}>
              List Your Item
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <View style={[styles.searchInputContainer, { 
            backgroundColor: colors.surface,
            shadowColor: colors.cardShadow 
          }]}>
            <Ionicons name="search" size={20} color={colors.textTertiary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search for sustainable products..."
              placeholderTextColor={colors.textTertiary}
              value={searchQuery}
              onChangeText={handleSearchChange}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSearchQuery('')}
              >
                <Ionicons name="close-circle" size={20} color={colors.textTertiary} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.filterButton,
              { 
                backgroundColor: showFilters ? colors.primary : colors.surface,
                borderColor: showFilters ? colors.primary : colors.border 
              }
            ]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons 
              name="filter" 
              size={20} 
              color={showFilters ? colors.white : colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>

        {/* Category Filters */}
        {showFilters && (
          <View style={[styles.filtersContainer, { 
            backgroundColor: colors.surface,
            shadowColor: colors.cardShadow 
          }]}>
            <Text style={[styles.filtersTitle, { color: colors.textSecondary }]}>
              Filter by Category
            </Text>
            <View style={styles.categoriesContainer}>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  { 
                    backgroundColor: selectedCategory === '' ? colors.primary : colors.gray100
                  }
                ]}
                onPress={() => selectCategory('')}
              >
                <Text style={[
                  styles.categoryButtonText,
                  { 
                    color: selectedCategory === '' ? colors.white : colors.textSecondary
                  }
                ]}>
                  All Categories
                </Text>
              </TouchableOpacity>
              {CATEGORIES.map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    { 
                      backgroundColor: selectedCategory === category ? colors.primary : colors.gray100
                    }
                  ]}
                  onPress={() => selectCategory(category)}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    { 
                      color: selectedCategory === category ? colors.white : colors.textSecondary
                    }
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Results Info */}
        <View style={styles.resultsInfo}>
          <Text style={[styles.resultsText, { color: colors.textSecondary }]}>
            {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''} found
            {searchQuery.trim() && (
              <Text style={{ fontWeight: '600' }}> for "{searchQuery.trim()}"</Text>
            )}
            {selectedCategory && (
              <Text style={{ fontWeight: '600' }}> in {selectedCategory}</Text>
            )}
          </Text>
          {(searchQuery.trim() || selectedCategory) && (
            <TouchableOpacity onPress={clearFilters}>
              <Text style={[styles.clearFiltersText, { color: colors.primary }]}>
                Clear filters
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const renderProduct = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={60} color={colors.textTertiary} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        {searchQuery.trim() || selectedCategory ? 'No items found' : 'No items yet'}
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        {searchQuery.trim() || selectedCategory 
          ? 'Try adjusting your search terms or browse different categories' 
          : 'Be the first to list a sustainable item in our marketplace'
        }
      </Text>
      {(searchQuery.trim() || selectedCategory) && (
        <TouchableOpacity
          style={[styles.clearFiltersButton, { borderColor: colors.primary }]}
          onPress={clearFilters}
        >
          <Text style={[styles.clearFiltersButtonText, { color: colors.primary }]}>
            Clear Search & Filters
          </Text>
        </TouchableOpacity>
      )}
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
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={filteredProducts.length > 0 ? styles.row : null}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        keyboardShouldPersistTaps="handled"
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
  heroSection: {
    margin: 16,
    borderRadius: 16,
    padding: 24,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
    opacity: 0.9,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  heroButtonText: {
    fontWeight: '600',
    marginLeft: 8,
  },
  searchSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  filtersContainer: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  filtersTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  resultsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  clearFiltersText: {
    fontSize: 14,
    fontWeight: '500',
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
  clearFiltersButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  clearFiltersButtonText: {
    fontSize: 16,
    fontWeight: '600',
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