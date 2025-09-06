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
import { COLORS } from '../utils/constants';
import { formatDateTime } from '../utils/formatPrice';

export default function ProfileScreen() {
  const { currentUser, updateProfile, logout } = useApp();
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <Text style={styles.headerSubtitle}>Manage your sustainable marketplace profile</Text>
        {!isEditing ? (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Ionicons name="create-outline" size={16} color={COLORS.white} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.editActions}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Ionicons name="checkmark-outline" size={16} color={COLORS.white} />
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Ionicons name="close-outline" size={16} color={COLORS.white} />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={COLORS.primary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{currentUser.fullName || currentUser.username}</Text>
              <Text style={styles.profileUsername}>@{currentUser.username}</Text>
              <View style={styles.profileBadge}>
                <Ionicons name="trophy" size={16} color={COLORS.warning} />
                <Text style={styles.profileBadgeText}>Eco Warrior</Text>
              </View>
            </View>
          </View>

          {/* Profile Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Ionicons name="person-outline" size={20} color={COLORS.gray400} />
                <Text style={styles.label}>Username</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={formData.username}
                  onChangeText={(value) => handleChange('username', value)}
                />
              ) : (
                <Text style={styles.value}>{currentUser.username}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Ionicons name="person-outline" size={20} color={COLORS.gray400} />
                <Text style={styles.label}>Full Name</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={formData.fullName}
                  onChangeText={(value) => handleChange('fullName', value)}
                />
              ) : (
                <Text style={styles.value}>{currentUser.fullName || 'Not provided'}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Ionicons name="mail-outline" size={20} color={COLORS.gray400} />
                <Text style={styles.label}>Email</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(value) => handleChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.value}>{currentUser.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Ionicons name="location-outline" size={20} color={COLORS.gray400} />
                <Text style={styles.label}>Location</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={formData.location}
                  onChangeText={(value) => handleChange('location', value)}
                  placeholder="Enter your location"
                />
              ) : (
                <Text style={styles.value}>{currentUser.location || 'Not provided'}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Ionicons name="document-text-outline" size={20} color={COLORS.gray400} />
                <Text style={styles.label}>Bio</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={formData.bio}
                  onChangeText={(value) => handleChange('bio', value)}
                  placeholder="Tell us about your sustainability journey..."
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              ) : (
                <Text style={styles.value}>{currentUser.bio || 'No bio provided'}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Ionicons name="calendar-outline" size={20} color={COLORS.gray400} />
                <Text style={styles.label}>Member Since</Text>
              </View>
              <Text style={styles.value}>{formatDateTime(currentUser.joinDate)}</Text>
            </View>
          </View>

          {/* Stats Card */}
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Sustainability Stats</Text>
            <View style={styles.statsBadge}>
              <View style={styles.statsIcon}>
                <Ionicons name="trophy" size={16} color={COLORS.white} />
              </View>
              <View>
                <Text style={styles.statsLabel}>Eco Warrior</Text>
                <Text style={styles.statsSubLabel}>Active member</Text>
              </View>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Items Listed</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Items Purchased</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>CO₂ Saved</Text>
                <Text style={[styles.statValue, { color: COLORS.success }]}>0 kg</Text>
              </View>
            </View>
          </View>

          {/* Impact Card */}
          <View style={styles.impactCard}>
            <Text style={styles.impactTitle}>Your Impact</Text>
            <Text style={styles.impactDescription}>
              Every item you buy or sell helps create a more sustainable future.
            </Text>
            <View style={styles.impactList}>
              <Text style={styles.impactItem}>🌱 Extending product lifecycles</Text>
              <Text style={styles.impactItem}>♻️ Reducing manufacturing demand</Text>
              <Text style={styles.impactItem}>🌍 Lowering carbon footprint</Text>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 24,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.gray100,
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: COLORS.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: 6,
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    backgroundColor: COLORS.success,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: 6,
  },
  cancelButton: {
    backgroundColor: COLORS.gray600,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: COLORS.white,
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
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
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
    backgroundColor: COLORS.primary + '20',
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
    color: COLORS.gray900,
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 8,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warning + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  profileBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.warning,
    marginLeft: 4,
  },
  form: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
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
    color: COLORS.gray700,
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: COLORS.white,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  value: {
    fontSize: 16,
    color: COLORS.gray900,
    paddingVertical: 4,
  },
  statsCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
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
    color: COLORS.gray900,
    marginBottom: 16,
  },
  statsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success + '20',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  statsIcon: {
    backgroundColor: COLORS.success,
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  statsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.success,
  },
  statsSubLabel: {
    fontSize: 12,
    color: COLORS.success,
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
    color: COLORS.gray600,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  impactCard: {
    backgroundColor: COLORS.success + '10',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.success + '30',
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.success,
    marginBottom: 8,
  },
  impactDescription: {
    fontSize: 14,
    color: COLORS.success,
    marginBottom: 16,
    opacity: 0.8,
  },
  impactList: {
    gap: 6,
  },
  impactItem: {
    fontSize: 12,
    color: COLORS.success,
  },
  logoutButton: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.error + '30',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.error,
    marginLeft: 8,
  },
});