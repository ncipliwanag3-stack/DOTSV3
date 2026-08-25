import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import your UI components
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Toggle from '../components/Toggle';
import Select from '../components/Select';
import Alert from '../components/Alert';

const Settings = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    language: 'en',
    notifications: true,
    darkMode: false,
    timezone: 'UTC',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        language: user.language || 'en',
        notifications: user.notifications !== false,
        darkMode: theme === 'dark',
        timezone: user.timezone || 'UTC',
      });
    }
  }, [user, theme]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle toggle changes
  const handleToggle = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Update user settings
      const response = await axios.put('/api/users/profile', formData);
      
      // Update theme if changed
      if (formData.darkMode !== (theme === 'dark')) {
        toggleTheme();
      }

      setSuccess('Settings updated successfully!');
      
      // Optional: Refresh user context
      // await refreshUser();
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete('/api/users/account');
      logout();
      navigate('/');
    } catch (err) {
      setError('Failed to delete account');
    }
  };

  // Handle password change
  const handlePasswordChange = async (oldPassword, newPassword) => {
    try {
      await axios.post('/api/users/change-password', {
        oldPassword,
        newPassword,
      });
      setSuccess('Password changed successfully!');
    } catch (err) {
      setError('Failed to change password');
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Settings
        </h1>

        {error && (
          <Alert variant="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Section */}
          <Card title="Profile Information">
            <div className="space-y-4">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </Card>

          {/* Preferences Section */}
          <Card title="Preferences">
            <div className="space-y-4">
              <Select
                label="Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' },
                  { value: 'de', label: 'German' },
                ]}
              />
              
              <Select
                label="Timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                options={[
                  { value: 'UTC', label: 'UTC' },
                  { value: 'America/New_York', label: 'Eastern Time' },
                  { value: 'America/Los_Angeles', label: 'Pacific Time' },
                  { value: 'Europe/London', label: 'London' },
                ]}
              />

              <Toggle
                label="Email Notifications"
                name="notifications"
                checked={formData.notifications}
                onChange={(checked) => handleToggle('notifications', checked)}
              />

              <Toggle
                label="Dark Mode"
                name="darkMode"
                checked={formData.darkMode}
                onChange={(checked) => handleToggle('darkMode', checked)}
              />
            </div>
          </Card>

          {/* Security Section */}
          <Card title="Security">
            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // Open password change modal or navigate to change password page
                  navigate('/change-password');
                }}
              >
                Change Password
              </Button>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card title="Danger Zone" variant="danger">
            <div className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button
                type="button"
                variant="danger"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </div>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Settings;