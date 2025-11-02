import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { SkeletonLoader } from '../components/SkeletonLoader';

export default function Settings() {
  const { profile, refreshProfile, loading: authLoading } = useAuth();
  const [settings, setSettings] = useState(profile?.settings || {});
  const [saving, setSaving] = useState(false);

  const handleToggle = (key: string) => {
    setSettings((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    if (!profile) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ settings })
        .eq('id', profile.id);

      if (error) throw error;

      await refreshProfile();
      alert('Settings saved successfully!');
    } catch (error: any) {
      console.error('Error saving settings:', error);
      alert(`Failed to save settings: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Show skeleton loader while auth is loading
  if (authLoading) {
    return (
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Settings</h1>
        <div style={{ marginTop: '24px' }}>
          <SkeletonLoader type="card" count={2} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Settings</h1>

      <div style={{ 
        background: 'white', 
        padding: '24px', 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginTop: '24px'
      }}>
        <h2 style={{ marginTop: 0 }}>Preferences</h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={settings.emailNotifications || false}
              onChange={() => handleToggle('emailNotifications')}
              style={{ marginRight: '12px', width: '18px', height: '18px' }}
            />
            <div>
              <div style={{ fontWeight: '500' }}>Email Notifications</div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Receive email updates about your account
              </div>
            </div>
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={settings.darkMode || false}
              onChange={() => handleToggle('darkMode')}
              style={{ marginRight: '12px', width: '18px', height: '18px' }}
            />
            <div>
              <div style={{ fontWeight: '500' }}>Dark Mode</div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Use dark theme (coming soon)
              </div>
            </div>
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={settings.publicProfile || false}
              onChange={() => handleToggle('publicProfile')}
              style={{ marginRight: '12px', width: '18px', height: '18px' }}
            />
            <div>
              <div style={{ fontWeight: '500' }}>Public Profile</div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Make your profile visible to other users
              </div>
            </div>
          </label>
        </div>

        <button 
          onClick={handleSave}
          disabled={saving}
          style={{ 
            padding: '10px 24px',
            borderRadius: '6px',
            border: 'none',
            background: '#667eea',
            color: 'white',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            opacity: saving ? 0.6 : 1,
            marginTop: '8px'
          }}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '24px', 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginTop: '24px'
      }}>
        <h2 style={{ marginTop: 0, color: '#e53e3e' }}>Danger Zone</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button 
          style={{ 
            padding: '10px 24px',
            borderRadius: '6px',
            border: '1px solid #e53e3e',
            background: 'white',
            color: '#e53e3e',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            marginTop: '8px'
          }}
          onClick={() => alert('Account deletion not implemented yet')}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}