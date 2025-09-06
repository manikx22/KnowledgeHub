import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Download,
  Trash2,
  Save,
  Moon,
  Sun,
  Globe,
  Lock
} from 'lucide-react';

interface SettingsProps {
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: false,
      synthesis: true,
      insights: true
    },
    privacy: {
      dataCollection: true,
      analytics: false,
      shareInsights: false
    },
    analysis: {
      autoProcess: true,
      detailedNotes: true,
      conceptExtraction: true,
      difficultyAssessment: true
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'analysis', label: 'Analysis', icon: Database }
  ];

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // Here you would typically save to backend/localStorage
    onClose();
  };

  const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-indigo-600' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-50 border-r border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Settings</h2>
          </div>
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 capitalize">{activeTab} Settings</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-semibold text-slate-900 mb-4">Appearance</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {settings.theme === 'light' ? <Sun className="w-5 h-5 text-slate-600" /> : <Moon className="w-5 h-5 text-slate-600" />}
                        <div>
                          <label className="text-sm font-medium text-slate-900">Theme</label>
                          <p className="text-xs text-slate-500">Choose your preferred theme</p>
                        </div>
                      </div>
                      <select
                        value={settings.theme}
                        onChange={(e) => handleSettingChange('', 'theme', e.target.value)}
                        className="px-3 py-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-slate-600" />
                        <div>
                          <label className="text-sm font-medium text-slate-900">Language</label>
                          <p className="text-xs text-slate-500">Select your preferred language</p>
                        </div>
                      </div>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSettingChange('', 'language', e.target.value)}
                        className="px-3 py-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-slate-900 mb-4">Data Management</h4>
                  <div className="space-y-4">
                    <button className="flex items-center space-x-3 px-4 py-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors w-full text-left">
                      <Download className="w-5 h-5 text-slate-600" />
                      <div>
                        <div className="text-sm font-medium text-slate-900">Export Data</div>
                        <div className="text-xs text-slate-500">Download all your sources and analysis</div>
                      </div>
                    </button>
                    <button className="flex items-center space-x-3 px-4 py-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors w-full text-left">
                      <Trash2 className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="text-sm font-medium text-red-900">Clear All Data</div>
                        <div className="text-xs text-red-500">Permanently delete all sources and analysis</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-semibold text-slate-900 mb-4">Notification Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-slate-900">Email Notifications</label>
                        <p className="text-xs text-slate-500">Receive updates via email</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.notifications.email}
                        onChange={(value) => handleSettingChange('notifications', 'email', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-slate-900">Push Notifications</label>
                        <p className="text-xs text-slate-500">Browser push notifications</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.notifications.push}
                        onChange={(value) => handleSettingChange('notifications', 'push', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-slate-900">Synthesis Complete</label>
                        <p className="text-xs text-slate-500">Notify when analysis is finished</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.notifications.synthesis}
                        onChange={(value) => handleSettingChange('notifications', 'synthesis', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-slate-900">New Insights</label>
                        <p className="text-xs text-slate-500">Alert when new insights are discovered</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.notifications.insights}
                        onChange={(value) => handleSettingChange('notifications', 'insights', value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-semibold text-slate-900 mb-4">Privacy Controls</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-slate-900">Data Collection</label>
                        <p className="text-xs text-slate-500">Allow collection of usage data for improvements</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.privacy.dataCollection}
                        onChange={(value) => handleSettingChange('privacy', 'dataCollection', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-slate-900">Analytics</label>
                        <p className="text-xs text-slate-500">Share anonymous analytics data</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.privacy.analytics}
                        onChange={(value) => handleSettingChange('privacy', 'analytics', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-slate-900">Share Insights</label>
                        <p className="text-xs text-slate-500">Allow sharing of anonymized insights</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.privacy.shareInsights}
                        onChange={(value) => handleSettingChange('privacy', 'shareInsights', value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analysis' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-semibold text-slate-900 mb-4">Analysis Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-slate-900">Auto-Process Sources</label>
                        <p className="text-xs text-slate-500">Automatically analyze new sources</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.analysis.autoProcess}
                        onChange={(value) => handleSettingChange('analysis', 'autoProcess', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-slate-900">Detailed Notes</label>
                        <p className="text-xs text-slate-500">Generate comprehensive detailed notes</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.analysis.detailedNotes}
                        onChange={(value) => handleSettingChange('analysis', 'detailedNotes', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-slate-900">Concept Extraction</label>
                        <p className="text-xs text-slate-500">Extract and define key concepts</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.analysis.conceptExtraction}
                        onChange={(value) => handleSettingChange('analysis', 'conceptExtraction', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-slate-900">Difficulty Assessment</label>
                        <p className="text-xs text-slate-500">Automatically assess content difficulty</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.analysis.difficultyAssessment}
                        onChange={(value) => handleSettingChange('analysis', 'difficultyAssessment', value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};