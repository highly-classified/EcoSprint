import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

// Screens
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import AddProductScreen from '../screens/AddProductScreen';
import MyListingsScreen from '../screens/MyListingsScreen';
import CartScreen from '../screens/CartScreen';
import PurchaseHistoryScreen from '../screens/PurchaseHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Header Title Component with Logo
const CustomHeaderTitle = ({ title = 'EcoSprint' }) => {
  const { colors } = useTheme();
  
  return (
    <View style={styles.headerContainer}>
      <Ionicons name="leaf" size={22} color={colors.primary} />
      <Text style={[styles.headerText, { color: colors.text }]}>
        {title}
      </Text>
    </View>
  );
};

function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MyListings') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        // Enable headers for all tab screens
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        // Add theme toggle to all headers
        headerRight: () => <ThemeToggle style={{ marginRight: 16 }} />,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          headerTitle: () => <CustomHeaderTitle title="EcoSprint" />
        }}
      />
      <Tab.Screen 
        name="MyListings" 
        component={MyListingsScreen}
        options={{ title: 'My Listings' }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
        options={{ title: 'Shopping Cart' }}
      />
      <Tab.Screen 
        name="Orders" 
        component={PurchaseHistoryScreen}
        options={{ title: 'Order History' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { currentUser } = useApp();
  const { colors } = useTheme();

  return (
    <Stack.Navigator 
      screenOptions={{ 
        cardStyle: { backgroundColor: colors.background },
        headerStyle: {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      {!currentUser ? (
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen}
            options={{ 
              title: 'Product Details',
              headerRight: () => <ThemeToggle style={{ marginRight: 16 }} />,
            }}
          />
          <Stack.Screen 
            name="AddProduct" 
            component={AddProductScreen}
            options={{ 
              title: 'Add Product',
              headerRight: () => <ThemeToggle style={{ marginRight: 16 }} />,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
});