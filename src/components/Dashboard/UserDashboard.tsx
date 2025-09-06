import React, { useState } from 'react';
import { Edit3, Save, X, User, Mail, MapPin, FileText, Calendar, Award } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function UserDashboard() {
  const { currentUser, updateProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
    location: currentUser?.location || '',
  });

  if (!currentUser) return null;

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your sustainable marketplace profile</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center space-x-2 shadow-lg"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-12">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-12 w-12 text-emerald-600" />
                </div>
                <div className="text-white">
                  <h2 className="text-3xl font-bold">{currentUser.fullName || currentUser.username}</h2>
                  <p className="text-emerald-100 text-lg">@{currentUser.username}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Award className="h-4 w-4" />
                    <span className="text-emerald-100">Eco Warrior</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="px-8 py-8 space-y-8">
              {/* Username */}
              <div className="flex items-center space-x-4">
                <User className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{currentUser.username}</p>
                  )}
                </div>
              </div>

              {/* Full Name */}
              <div className="flex items-center space-x-4">
                <User className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{currentUser.fullName || 'Not provided'}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{currentUser.email}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter your location"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{currentUser.location || 'Not provided'}</p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="flex items-start space-x-4">
                <FileText className="h-5 w-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your sustainability journey..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                    />
                  ) : (
                    <p className="text-gray-900">{currentUser.bio || 'No bio provided'}</p>
                  )}
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Member Since</label>
                  <p className="text-gray-900 font-medium">{formatDate(currentUser.joinDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sustainability Stats</h3>
            <div className="space-y-4">
              <div className="bg-emerald-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-600 p-2 rounded-full">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Eco Warrior</p>
                    <p className="text-sm text-emerald-700">Active member</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Listed</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Purchased</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CO₂ Saved</span>
                  <span className="font-medium text-emerald-600">0 kg</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <h3 className="font-semibold text-emerald-900 mb-3">Your Impact</h3>
            <p className="text-sm text-emerald-700 mb-4">
              Every item you buy or sell helps create a more sustainable future.
            </p>
            <div className="space-y-2 text-xs text-emerald-600">
              <p>🌱 Extending product lifecycles</p>
              <p>♻️ Reducing manufacturing demand</p>
              <p>🌍 Lowering carbon footprint</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}