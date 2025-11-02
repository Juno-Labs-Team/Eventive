import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { SkeletonLoader } from '../components/SkeletonLoader';

export default function Account() {
  const { user, profile, refreshProfile, loading: authLoading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    display_name: profile?.display_name || '',
    username: profile?.username || '',
    bio: profile?.bio || '',
  });

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: formData.display_name,
          username: formData.username,
          bio: formData.bio,
        })
        .eq('id', user.id);

      if (error) throw error;

      await refreshProfile();
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert(`Failed to update profile: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      display_name: profile?.display_name || '',
      username: profile?.username || '',
      bio: profile?.bio || '',
    });
    setEditing(false);
  };

  // Show skeleton loader while auth is loading
  if (authLoading) {
    return (
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Account</h1>
        <div style={{ marginTop: '24px' }}>
          <SkeletonLoader type="profile" />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Account</h1>

      <div style={{ 
        background: 'white', 
        padding: '24px', 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginTop: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          {profile?.avatar_url && (
            <img 
              src={profile.avatar_url} 
              alt="Avatar" 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%',
                marginRight: '16px'
              }} 
            />
          )}
          <div>
            <h2 style={{ margin: '0 0 4px 0' }}>{profile?.display_name || 'User'}</h2>
            <p style={{ margin: 0, color: '#666' }}>
              {profile?.username ? `@${profile.username}` : 'No username set'}
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#999' }}>
              Role: {profile?.role || 'user'}
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Email
          </label>
          <input 
            type="text" 
            value={user?.email || ''} 
            disabled 
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              borderRadius: '4px',
              border: '1px solid #ddd',
              background: '#f5f5f5',
              boxSizing: 'border-box'
            }} 
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Display Name
          </label>
          <input 
            type="text" 
            value={formData.display_name} 
            onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
            disabled={!editing}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              borderRadius: '4px',
              border: '1px solid #ddd',
              background: editing ? 'white' : '#f5f5f5',
              boxSizing: 'border-box'
            }} 
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Username
          </label>
          <input 
            type="text" 
            value={formData.username} 
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            disabled={!editing}
            placeholder="username"
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              borderRadius: '4px',
              border: '1px solid #ddd',
              background: editing ? 'white' : '#f5f5f5',
              boxSizing: 'border-box'
            }} 
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Bio
          </label>
          <textarea 
            value={formData.bio} 
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={!editing}
            placeholder="Tell us about yourself..."
            rows={4}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              borderRadius: '4px',
              border: '1px solid #ddd',
              background: editing ? 'white' : '#f5f5f5',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }} 
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {!editing ? (
            <button 
              onClick={() => setEditing(true)}
              style={{ 
                padding: '10px 20px',
                borderRadius: '6px',
                border: 'none',
                background: '#667eea',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button 
                onClick={handleSave}
                disabled={saving}
                style={{ 
                  padding: '10px 20px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#48bb78',
                  color: 'white',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  opacity: saving ? 0.6 : 1
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                onClick={handleCancel}
                disabled={saving}
                style={{ 
                  padding: '10px 20px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  background: 'white',
                  color: '#333',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        <p>Account created: {new Date(profile?.created_at || '').toLocaleDateString()}</p>
      </div>
    </div>
  );
}