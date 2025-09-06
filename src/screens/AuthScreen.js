import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';

export default function AuthScreen() {
  const { login, register } = useApp();
  const { colors } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    fullName: '',
    bio: '',
    location: '',
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (!success) {
          Alert.alert('Error', 'Invalid email or password');
        }
      } else {
        if (!formData.username || !formData.email || !formData.password) {
          Alert.alert('Error', 'Please fill in all required fields');
          return;
        }
        const success = await register({
          ...formData,
          avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
        });
        if (!success) {
          Alert.alert('Error', 'User with this email already exists');
        }
      }
    } catch (err) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={[styles.logoContainer, { backgroundColor: colors.primaryDark }]}>
              <Ionicons name="leaf" size={40} color={colors.white} />
            </View>
            <Text style={[styles.title, { color: colors.white }]}>
              {isLogin ? 'Welcome back to EcoSprint' : 'Join EcoSprint'}
            </Text>
            <Text style={[styles.subtitle, { color: colors.white }]}>
              {isLogin ? 'Continue your sustainable journey' : 'Start your eco-friendly marketplace experience'}
            </Text>
          </View>

          <View style={[styles.formContainer, { 
            backgroundColor: colors.surface,
            shadowColor: colors.cardShadow 
          }]}>
            {!isLogin && (
              <>
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>Username *</Text>
                  <View style={[styles.inputWrapper, { 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    shadowColor: colors.cardShadow
                  }]}>
                    <Ionicons name="person-outline" size={20} color={colors.textTertiary} />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Choose a username"
                      placeholderTextColor={colors.textTertiary}
                      value={formData.username}
                      onChangeText={(value) => handleChange('username', value)}
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>Full Name</Text>
                  <View style={[styles.inputWrapper, { 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    shadowColor: colors.cardShadow
                  }]}>
                    <Ionicons name="person" size={20} color={colors.textTertiary} />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Your full name"
                      placeholderTextColor={colors.textTertiary}
                      value={formData.fullName}
                      onChangeText={(value) => handleChange('fullName', value)}
                    />
                  </View>
                </View>
              </>
            )}

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Email Address *</Text>
              <View style={[styles.inputWrapper, { 
                borderColor: colors.border,
                backgroundColor: colors.background,
                shadowColor: colors.cardShadow
              }]}>
                <Ionicons name="mail-outline" size={20} color={colors.textTertiary} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.textTertiary}
                  value={formData.email}
                  onChangeText={(value) => handleChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Password *</Text>
              <View style={[styles.inputWrapper, { 
                borderColor: colors.border,
                backgroundColor: colors.background,
                shadowColor: colors.cardShadow
              }]}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.textTertiary} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textTertiary}
                  value={formData.password}
                  onChangeText={(value) => handleChange('password', value)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons 
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                    size={20} 
                    color={colors.textTertiary} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {!isLogin && (
              <>
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>Location</Text>
                  <View style={[styles.inputWrapper, { 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    shadowColor: colors.cardShadow
                  }]}>
                    <Ionicons name="location-outline" size={20} color={colors.textTertiary} />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Your city, state"
                      placeholderTextColor={colors.textTertiary}
                      value={formData.location}
                      onChangeText={(value) => handleChange('location', value)}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>Bio</Text>
                  <View style={[styles.inputWrapper, styles.textAreaWrapper, { 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    shadowColor: colors.cardShadow
                  }]}>
                    <Ionicons name="document-text-outline" size={20} color={colors.textTertiary} style={styles.textAreaIcon} />
                    <TextInput
                      style={[styles.input, styles.textArea, { color: colors.text }]}
                      placeholder="Tell us about your sustainability journey..."
                      placeholderTextColor={colors.textTertiary}
                      value={formData.bio}
                      onChangeText={(value) => handleChange('bio', value)}
                      multiline
                      numberOfLines={3}
                      textAlignVertical="top"
                    />
                  </View>
                </View>
              </>
            )}

            <TouchableOpacity
              style={[
                styles.submitButton, 
                { 
                  backgroundColor: colors.primary,
                  shadowColor: colors.cardShadow
                },
                loading && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading && <Ionicons name="hourglass-outline" size={20} color={colors.white} style={styles.loadingIcon} />}
              <Text style={[styles.submitButtonText, { color: colors.white }]}>
                {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={[styles.toggleButtonText, { color: colors.textSecondary }]}>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <Text style={[styles.toggleButtonLink, { color: colors.primary }]}>
                  {isLogin ? "Sign up" : 'Sign in'}
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Features Section */}
            <View style={[styles.featuresContainer, { borderTopColor: colors.border }]}>
              <Text style={[styles.featuresTitle, { color: colors.textSecondary }]}>
                Why choose EcoSprint?
              </Text>
              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons name="leaf-outline" size={16} color={colors.success} />
                  <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                    Sustainable marketplace
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="shield-checkmark-outline" size={16} color={colors.success} />
                  <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                    Secure transactions
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="people-outline" size={16} color={colors.success} />
                  <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                    Trusted community
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
  },
  formContainer: {
    borderRadius: 20,
    padding: 30,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
    paddingTop: 16,
    paddingBottom: 16,
  },
  textAreaIcon: {
    marginTop: -4,
    alignSelf: 'flex-start',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    paddingVertical: 0,
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
    paddingTop: 0,
    marginTop: -4,
  },
  eyeIcon: {
    padding: 4,
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  loadingIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  toggleButtonLink: {
    fontWeight: '600',
  },
  featuresContainer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 14,
    marginLeft: 8,
  },
});