import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { api } from '../lib/apiClient';
import { uploadAvatar, validateAvatarFile, deleteAvatar } from '../lib/avatarUpload';
import { SkeletonLoader } from '../components/SkeletonLoader';
import '../styles/account.css';

export default function Account() {
  const { user, profile, refreshProfile, loading: authLoading } = useAuth();
  const toast = useToast();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    display_name: profile?.display_name || '',
    username: profile?.username || '',
    bio: profile?.bio || '',
    avatar_url: profile?.avatar_url || '',
  });

  // Handle avatar upload
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file first
    const validation = validateAvatarFile(file);
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid file');
      return;
    }

    setUploadingAvatar(true);
    setUploadProgress(0);

    try {
      // Upload to Supabase Storage
      const result = await uploadAvatar({
        file,
        userId: user.id,
        onProgress: setUploadProgress,
      });

      if (!result.success) {
        toast.error(result.error || 'Failed to upload avatar');
        return;
      }

      // Update profile with new avatar URL
      await api.updateProfile({ avatar_url: result.url });
      await refreshProfile();
      setFormData({ ...formData, avatar_url: result.url || '' });
      toast.success('Avatar updated successfully!');
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast.error(`Failed to upload avatar: ${error.message}`);
    } finally {
      setUploadingAvatar(false);
      setUploadProgress(0);
    }
  };

  // Handle avatar removal
  const handleRemoveAvatar = async () => {
    if (!user) return;

    const confirmDelete = confirm('Are you sure you want to remove your avatar?');
    if (!confirmDelete) return;

    setUploadingAvatar(true);
    try {
      // Delete avatar via API
      await deleteAvatar();

      // Update profile to remove avatar URL
      await api.updateProfile({ avatar_url: null });
      await refreshProfile();
      setFormData({ ...formData, avatar_url: '' });
      toast.success('Avatar removed successfully');
    } catch (error: any) {
      console.error('Error removing avatar:', error);
      toast.error(`Failed to remove avatar: ${error.message}`);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      await api.updateProfile({
        display_name: formData.display_name,
        username: formData.username,
        bio: formData.bio,
      });

      await refreshProfile();
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      display_name: profile?.display_name || '',
      username: profile?.username || '',
      bio: profile?.bio || '',
      avatar_url: profile?.avatar_url || '',
    });
    setEditing(false);
  };

  // Update formData when profile changes (after onboarding)
  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        username: profile.username || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
      });
    }
  }, [profile]);

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

      <div className="account-card">
        <div className="account-header">
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img 
                src={formData.avatar_url || '/default-avatar.png'} 
                alt="Avatar" 
                className="avatar-large"
              />
              {uploadingAvatar && (
                <div className="avatar-overlay">
                  <span>Uploading... {uploadProgress}%</span>
                </div>
              )}
            </div>
            <div className="avatar-actions">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={uploadingAvatar}
                id="avatar-upload-input"
                style={{ display: 'none' }}
              />
              <label htmlFor="avatar-upload-input" className="btn-small btn-primary">
                {uploadingAvatar ? 'Uploading...' : 'Change Avatar'}
              </label>
              {formData.avatar_url && (
                <button 
                  onClick={handleRemoveAvatar}
                  disabled={uploadingAvatar}
                  className="btn-small btn-secondary"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
          
          <div className="profile-summary">
            <h2>{profile?.display_name || 'User'}</h2>
            <p className="username-text">
              {profile?.username ? `@${profile.username}` : 'No username set'}
            </p>
            <p className="role-text">
              Role: {profile?.role || 'user'}
            </p>
          </div>
        </div>

        <div className="form-field">
          <label>Email</label>
          <input 
            type="text" 
            value={user?.email || ''} 
            disabled 
          />
        </div>

        <div className="form-field">
          <label>Display Name</label>
          <input 
            type="text" 
            value={formData.display_name} 
            onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
            disabled={!editing}
          />
        </div>

        <div className="form-field">
          <label>Username</label>
          <div className="username-input-wrapper">
            <span className="username-prefix">@</span>
            <input 
              type="text" 
              value={formData.username} 
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              disabled={!editing}
              placeholder="username"
            />
          </div>
          {!formData.username && (
            <p style={{ fontSize: '12px', color: 'var(--color-error)', marginTop: '4px' }}>
              You haven't set a username yet. Set one now!
            </p>
          )}
        </div>

        <div className="form-field">
          <label>Bio</label>
          <textarea 
            value={formData.bio} 
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={!editing}
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </div>

        <div className="action-buttons">
          {!editing ? (
            <button 
              onClick={() => setEditing(true)}
              className="btn-action primary"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="btn-action success"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                onClick={handleCancel}
                disabled={saving}
                className="btn-action secondary"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="account-info">
        <p>Account created: {new Date(profile?.created_at || '').toLocaleDateString()}</p>
      </div>
    </div>
  );
}