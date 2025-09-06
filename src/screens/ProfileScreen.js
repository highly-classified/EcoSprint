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
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { formatDateTime } from '../utils/formatPrice';

export default function ProfileScreen() {
  const { currentUser, updateProfile, logout } = useApp();
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
    location: currentUser?.location || '',
  });

  if (!currentUser) return null;

  const handleSave = async () => {
    await updateProfile(formData);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      username: currentUser.username,
      fullName: currentUser.fullName,
      email: currentUser.email,
      bio: currentUser.bio,
      location: currentUser.location,
    });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.white }]}>
            My Profile
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.white }]}>
            Manage your sustainable marketplace profile
          </Text>
        </View>
        
        {/* Clean Header Actions - Only Edit/Save/Cancel */}
        <View style={styles.headerActions}>
          {!isEditing ? (
            <TouchableOpacity 
              style={[styles.editButton, { backgroundColor: colors.primaryDark }]} 
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="create-outline" size={16} color={colors.white} />
              <Text style={[styles.editButtonText, { color: colors.white }]}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActions}>
              <TouchableOpacity 
                style={[styles.saveButton, { backgroundColor: colors.success }]} 
                onPress={handleSave}
              >
                <Ionicons name="checkmark-outline" size={16} color={colors.white} />
                <Text style={[styles.saveButtonText, { color: colors.white }]}>
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.cancelButton, { backgroundColor: colors.textSecondary }]} 
                onPress={handleCancel}
              >
                <Ionicons name="close-outline" size={16} color={colors.white} />
                <Text style={[styles.cancelButtonText, { color: colors.white }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          {/* Clean Profile Header */}
          <View style={[styles.profileHeader, { 
            backgroundColor: colors.surface,
            shadowColor: colors.cardShadow 
          }]}>
            <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="person" size={40} color={colors.primary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                {currentUser.fullName || currentUser.username}
              </Text>
              <Text style={[styles.profileUsername, { color: colors.primary }]}>
                @{currentUser.username}
              </Text>
              <View style={[styles.profileBadge, { backgroundColor: colors.warning + '20' }]}>
                <Ionicons name="trophy" size={16} color={colors.warning} />
                <Text style={[styles.profileBadgeText, { color: colors.warning }]}>
                  Eco Warrior
                </Text>
              </View>
            </View>
          </View>

          {/* Profile Form */}
          <View style={[styles.form, { 
            backgroundColor: colors.surface,
            shadowColor: colors.cardShadow 
          }]}>
            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Ionicons name="person-outline" size={20} color={colors.textTertiary} />
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Username
                </Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    color: colors.text
                  }]}
                  value={formData.username}
                  onChangeText={(value) => handleChange('username', value)}
                  placeholderTextColor={colors.textTertiary}
                />
              ) : (
                <Text style={[styles.value, { color: colors.text }]}>
                  {currentUser.username}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Ionicons name="person-outline" size={20} color={colors.textTertiary} />
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Full Name
                </Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    color: colors.text
                  }]}
                  value={formData.fullName}
                  onChangeText={(value) => handleChange('fullName', value)}
                  placeholderTextColor={colors.textTertiary}
                />
              ) : (
                <Text style={[styles.value, { color: colors.text }]}>
                  {currentUser.fullName || 'Not provided'}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Ionicons name="mail-outline" size={20} color={colors.textTertiary} />
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Email
                </Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    color: colors.text
                  }]}
                  value={formData.email}
                  onChangeText={(value) => handleChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={colors.textTertiary}
                />
              ) : (
                <Text style={[styles.value, { color: colors.text }]}>
                  {currentUser.email}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Ionicons name="location-outline" size={20} color={colors.textTertiary} />
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Location
                </Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    color: colors.text
                  }]}
                  value={formData.location}
                  onChangeText={(value) => handleChange('location', value)}
                  placeholder="Enter your location"
                  placeholderTextColor={colors.textTertiary}
                />
              ) : (
                <Text style={[styles.value, { color: colors.text }]}>
                  {currentUser.location || 'Not provided'}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Ionicons name="document-text-outline" size={20} color={colors.textTertiary} />
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Bio
                </Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={[styles.input, styles.textArea, { 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    color: colors.text
                  }]}
                  value={formData.bio}
                  onChangeText={(value) => handleChange('bio', value)}
                  placeholder="Tell us about your sustainability journey..."
                  placeholderTextColor={colors.textTertiary}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              ) : (
                <Text style={[styles.value, { color: colors.text }]}>
                  {currentUser.bio || 'No bio provided'}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Ionicons name="calendar-outline" size={20} color={colors.textTertiary} />
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Member Since
                </Text>
              </View>
              <Text style={[styles.value, { color: colors.text }]}>
                {formatDateTime(currentUser.joinDate)}
              </Text>
            </View>
          </View>

          {/* Stats Card */}
          <View style={[styles.statsCard, { 
            backgroundColor: colors.surface,
            shadowColor: colors.cardShadow 
          }]}>
            <Text style={[styles.statsTitle, { color: colors.text }]}>
              Sustainability Stats
            </Text>
            <View style={[styles.statsBadge, { backgroundColor: colors.success + '20' }]}>
              <View style={[styles.statsIcon, { backgroundColor: colors.success }]}>
                <Ionicons name="trophy" size={16} color={colors.white} />
              </View>
              <View>
                <Text style={[styles.statsLabel, { color: colors.success }]}>
                  Eco Warrior
                </Text>
                <Text style={[styles.statsSubLabel, { color: colors.success }]}>
                  Active member
                </Text>
              </View>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Items Listed
                </Text>
                <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Items Purchased
                </Text>
                <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  CO₂ Saved
                </Text>
                <Text style={[styles.statValue, { color: colors.success }]}>0 kg</Text>
              </View>
            </View>
          </View>

          {/* Impact Card */}
          <View style={[styles.impactCard, { 
            backgroundColor: colors.success + '10',
            borderColor: colors.success + '30' 
          }]}>
            <Text style={[styles.impactTitle, { color: colors.success }]}>
              Your Impact
            </Text>
            <Text style={[styles.impactDescription, { color: colors.success }]}>
              Every item you buy or sell helps create a more sustainable future.
            </Text>
            <View style={styles.impactList}>
              <Text style={[styles.impactItem, { color: colors.success }]}>
                🌱 Extending product lifecycles
              </Text>
              <Text style={[styles.impactItem, { color: colors.success }]}>
                ♻️ Reducing manufacturing demand
              </Text>
              <Text style={[styles.impactItem, { color: colors.success }]}>
                🌍 Lowering carbon footprint
              </Text>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity 
            style={[styles.logoutButton, { 
              backgroundColor: colors.surface,
              borderColor: colors.error + '30',
              shadowColor: colors.cardShadow
            }]} 
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
            <Text style={[styles.logoutButtonText, { color: colors.error }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.9,
  },
  headerActions: {
    alignItems: 'flex-start',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  editButtonText: {
    fontWeight: '600',
    marginLeft: 6,
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  saveButtonText: {
    fontWeight: '600',
    marginLeft: 6,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  cancelButtonText: {
    fontWeight: '600',
    marginLeft: 6,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileHeader: {
    margin: 16,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    marginBottom: 8,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  profileBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  editProfileButtonText: {
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
  editProfileActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  saveProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  saveProfileButtonText: {
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
  cancelProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  cancelProfileButtonText: {
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
  form: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  value: {
    fontSize: 16,
    paddingVertical: 4,
  },
  statsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  statsIcon: {
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  statsLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsSubLabel: {
    fontSize: 12,
    opacity: 0.8,
  },
  statsGrid: {
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  impactCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  impactDescription: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.8,
  },
  impactList: {
    gap: 6,
  },
  impactItem: {
    fontSize: 12,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});