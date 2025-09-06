import React, { createContext, useContext, useState, useEffect } from 'react';
import { storeData, getData } from '../services/storage';

const ThemeContext = createContext();

export const LIGHT_COLORS = {
  primary: '#059669',
  primaryLight: '#10b981',
  primaryDark: '#047857',
  secondary: '#0d9488',
  background: '#f9fafb',
  surface: '#ffffff',
  white: '#ffffff',
  black: '#000000',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  text: '#111827',
  textSecondary: '#4b5563',
  textTertiary: '#6b7280',
  border: '#e5e7eb',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  cardShadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(255, 255, 255, 0.9)',
};

export const DARK_COLORS = {
  primary: '#10b981',
  primaryLight: '#34d399',
  primaryDark: '#047857',
  secondary: '#14b8a6',
  background: '#111827',
  surface: '#1f2937',
  white: '#ffffff',
  black: '#000000',
  gray100: '#374151',
  gray200: '#4b5563',
  gray300: '#6b7280',
  gray400: '#9ca3af',
  gray500: '#d1d5db',
  gray600: '#e5e7eb',
  gray700: '#f3f4f6',
  gray800: '#f9fafb',
  gray900: '#ffffff',
  text: '#f9fafb',
  textSecondary: '#e5e7eb',
  textTertiary: '#d1d5db',
  border: '#374151',
  success: '#10b981',
  warning: '#fbbf24',
  error: '#f87171',
  info: '#60a5fa',
  cardShadow: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(31, 41, 55, 0.9)',
};

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colors, setColors] = useState(LIGHT_COLORS);

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    setColors(isDarkMode ? DARK_COLORS : LIGHT_COLORS);
  }, [isDarkMode]);

  const loadTheme = async () => {
    try {
      const savedTheme = await getData('isDarkMode');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await storeData('isDarkMode', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const value = {
    isDarkMode,
    colors,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};