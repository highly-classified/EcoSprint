import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle({ style, showLabel = false }) {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface }, style]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Ionicons
          name={isDarkMode ? 'moon' : 'sunny'}
          size={20}
          color={colors.text}
        />
        {showLabel && (
          <Text style={[styles.label, { color: colors.text }]}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

// Alternative animated toggle switch component
export function ThemeSwitch({ style }) {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.switchContainer, style]}>
      <View style={styles.switchRow}>
        <Ionicons name="sunny" size={20} color={colors.textTertiary} />
        <TouchableOpacity
          style={[
            styles.switch,
            { backgroundColor: isDarkMode ? colors.primary : colors.gray300 }
          ]}
          onPress={toggleTheme}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.switchThumb,
              {
                backgroundColor: colors.white,
                transform: [{ translateX: isDarkMode ? 20 : 0 }]
              }
            ]}
          />
        </TouchableOpacity>
        <Ionicons name="moon" size={20} color={colors.textTertiary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  switchContainer: {
    alignItems: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 2,
    justifyContent: 'center',
  },
  switchThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
});