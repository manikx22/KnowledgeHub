import React, { useState } from 'react';
import { User, Mail, Calendar, BookOpen, TrendingUp, Settings, Save, Edit3, Camera } from 'lucide-react';

interface ProfileProps {
  onClose: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Passionate learner exploring AI, machine learning, and cognitive science. Always seeking to synthesize knowledge from diverse sources.',
    joinDate: '2024-01-15',
    learningGoals: 'Master machine learning fundamentals, understand cognitive psychology, improve knowledge synthesis skills',
    interests: ['Artificial Intelligence', 'Cognitive Science', 'Digital Learning', 'Psychology']
  });

  const stats = [
    { label: 'Sources Processed', value: '127', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Insights Generated', value: '234', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Learning Hours', value: '64', icon: Calendar, color: 'text-purple-600' },
    { label: 'Knowledge Areas', value: '8', icon: Settings, color: 'text-orange-600' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
    console.log('Profile saved:', profileData);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors">
                  <Camera className="w-4 h-4 text-slate-600" />
                </button>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-bold text-slate-900 bg-transparent border-b-2 border-slate-300 focus:border-indigo-500 outline-none w-full"
                  />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="text-slate-600 bg-transparent border-b border-slate-300 focus:border-indigo-500 outline-none w-full"
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{profileData.name}</h3>
                  <p className="text-slate-600 flex items-center space-x-2 mt-1">
                    <Mail className="w-4 h-4" />
                    <span>{profileData.email}</span>
                  </p>
                </div>
              )}
              <p className="text-sm text-slate-500 flex items-center space-x-2 mt-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(profileData.joinDate).toLocaleDateString()}</span>
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-4 text-center">
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Bio Section */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-slate-900 mb-3">About</h4>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-slate-700">{profileData.bio}</p>
            )}
          </div>

          {/* Learning Goals */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-slate-900 mb-3">Learning Goals</h4>
            {isEditing ? (
              <textarea
                value={profileData.learningGoals}
                onChange={(e) => handleInputChange('learningGoals', e.target.value)}
                rows={2}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                placeholder="What are your learning objectives?"
              />
            ) : (
              <p className="text-slate-700">{profileData.learningGoals}</p>
            )}
          </div>

          {/* Interests */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-slate-900 mb-3">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {profileData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
              {isEditing && (
                <button className="px-3 py-1 border-2 border-dashed border-slate-300 text-slate-500 rounded-full text-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                  + Add Interest
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};