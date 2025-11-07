/**
 * Onboarding Modal Component
 * 
 * Shows a welcome modal for new users to complete their profile.
 * Tracks completion status in localStorage and profile settings.
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { supabase } from '../lib/supabaseClient';
import { uploadAvatar, validateAvatarFile } from '../lib/avatarUpload';
import '../styles/onboarding.css';

export function OnboardingModal() {
  const { user, profile, refreshProfile } = useAuth();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // Start at 0 for avatar selection
  const [saving, setSaving] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    display_name: '',
    bio: '',
    avatar_url: '',
    useOAuthAvatar: true, // Default to using OAuth avatar
  });

  // Check if onboarding should be shown
  useEffect(() => {
    if (!profile || !user) return;

    // Check if onboarding already completed
    const hasCompletedOnboarding = profile.settings?.onboardingCompleted;
    const hasUsername = profile.username && profile.username.trim() !== '';
    const hasDisplayName = profile.display_name && profile.display_name.trim() !== '';

    // Show onboarding if not completed AND missing essential info
    if (!hasCompletedOnboarding && (!hasUsername || !hasDisplayName)) {
      setIsOpen(true);
      
      // Pre-fill with existing data
      setFormData({
        username: profile.username || '',
        display_name: profile.display_name || user.email?.split('@')[0] || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || user.user_metadata?.avatar_url || '',
        useOAuthAvatar: !!profile.avatar_url || !!user.user_metadata?.avatar_url,
      });
    }
  }, [profile, user]);

  // Validate username format
  const validateUsername = async (username: string): Promise<boolean> => {
    setUsernameError('');
    
    // Basic validation
    if (!username || username.trim() === '') {
      setUsernameError('Username is required');
      return false;
    }

    if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return false;
    }

    if (username.length > 20) {
      setUsernameError('Username must be less than 20 characters');
      return false;
    }

    // Only allow alphanumeric and underscores
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameError('Username can only contain letters, numbers, and underscores');
      return false;
    }

    // Check if username is taken (if it's different from current)
    if (username !== profile?.username) {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle(); // avoids the 406 error that might be returned

      if (data) {
        setUsernameError('Username is already taken');
        return false;
      }
    }

    return true;
  };

  // Handle avatar upload to Supabase Storage
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file first
    const validation = validateAvatarFile(file);
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid file');
      return;
    }

    setUploading(true);
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

      // Update form data with the new avatar URL
      setFormData({ ...formData, avatar_url: result.url || '', useOAuthAvatar: false });
      toast.success('Avatar uploaded successfully!');
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast.error(`Failed to upload avatar: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      // Validate username before proceeding
      const isValid = await validateUsername(formData.username);
      if (!isValid) return;
    }

    if (currentStep === 2) {
      // Validate display name
      if (!formData.display_name || formData.display_name.trim() === '') {
        toast.warning('Please enter a display name');
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = async () => {
    // Mark as completed even if skipped
    try {
      await supabase
        .from('profiles')
        .update({
          settings: {
            ...profile?.settings,
            onboardingCompleted: true,
            onboardingSkipped: true,
          }
        })
        .eq('id', user?.id);

      setIsOpen(false);
      await refreshProfile();
    } catch (error) {
      console.error('Error skipping onboarding:', error);
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    // Final validation
    const isUsernameValid = await validateUsername(formData.username);
    if (!isUsernameValid) {
      setCurrentStep(1); // Go back to username step
      return;
    }

    if (!formData.display_name || formData.display_name.trim() === '') {
      toast.warning('Please enter a display name');
      setCurrentStep(2);
      return;
    }

    setSaving(true);
    try {
      // Determine which avatar to use
      const avatarToUse = formData.useOAuthAvatar 
        ? (user.user_metadata?.avatar_url || profile?.avatar_url) 
        : formData.avatar_url;

      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username.toLowerCase(), // Store username in lowercase
          display_name: formData.display_name,
          bio: formData.bio || null,
          avatar_url: avatarToUse || null,
          settings: {
            ...profile?.settings,
            onboardingCompleted: true,
            onboardingCompletedAt: new Date().toISOString(),
          }
        })
        .eq('id', user.id);

      if (error) throw error;

      setIsOpen(false);
      await refreshProfile();
      
      // Show success message
      toast.success('🎉 Welcome to Eventive! Your profile has been set up.');
    } catch (error: any) {
      console.error('Error completing onboarding:', error);
      toast.error(`Failed to save profile: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !profile) return null;

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        {/* Header */}
        <div className="onboarding-header">
          <h2>Welcome to Eventive! 🎉</h2>
          <p>Let's set up your profile in just a few steps</p>
          <div className="onboarding-progress">
            <div className={`progress-step ${currentStep >= 0 ? 'active' : ''}`}>1</div>
            <div className={`progress-line ${currentStep >= 1 ? 'active' : ''}`}></div>
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>2</div>
            <div className={`progress-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>3</div>
            <div className={`progress-line ${currentStep >= 3 ? 'active' : ''}`}></div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>4</div>
          </div>
        </div>

        {/* Step 0: Avatar Selection */}
        {currentStep === 0 && (
          <div className="onboarding-step">
            <h3>Choose your avatar</h3>
            <p className="step-description">
              Select an avatar for your profile. You can use your OAuth provider avatar or upload a custom one.
            </p>
            
            <div className="avatar-preview-container">
              <img 
                src={formData.useOAuthAvatar 
                  ? (user?.user_metadata?.avatar_url || profile?.avatar_url || '/default-avatar.png')
                  : (formData.avatar_url || '/default-avatar.png')
                }
                alt="Avatar preview"
                className="avatar-preview-large"
              />
            </div>

            <div className="avatar-options">
              <label className="avatar-option">
                <input
                  type="radio"
                  name="avatarChoice"
                  checked={formData.useOAuthAvatar}
                  onChange={() => setFormData({ ...formData, useOAuthAvatar: true })}
                />
                <div className="avatar-option-content">
                  <strong>Use {user?.app_metadata?.provider || 'OAuth'} Avatar</strong>
                  <span>Keep your avatar from {user?.app_metadata?.provider || 'your provider'}</span>
                </div>
              </label>

              <label className="avatar-option">
                <input
                  type="radio"
                  name="avatarChoice"
                  checked={!formData.useOAuthAvatar}
                  onChange={() => setFormData({ ...formData, useOAuthAvatar: false })}
                />
                <div className="avatar-option-content">
                  <strong>Upload Custom Avatar</strong>
                  <span>Choose your own profile picture</span>
                </div>
              </label>
            </div>

            {!formData.useOAuthAvatar && (
              <div className="avatar-upload-section">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                  id="avatar-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="avatar-upload" className="btn-upload">
                  {uploading ? `Uploading... ${uploadProgress}%` : formData.avatar_url && !formData.useOAuthAvatar ? 'Change Avatar' : 'Upload Avatar'}
                </label>
                <p className="hint">PNG, JPG, GIF, or WebP. Max 5MB.</p>
                {uploading && (
                  <div className="upload-progress-bar">
                    <div className="upload-progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 1: Username */}
        {currentStep === 1 && (
          <div className="onboarding-step">
            <h3>Choose your username</h3>
            <p className="step-description">
              This is your unique identifier. You can't change it later, so choose wisely!
            </p>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="username-input-wrapper">
                <span className="username-prefix">@</span>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                    setUsernameError(''); // Clear error on change
                  }}
                  placeholder="johndoe"
                  className={usernameError ? 'error' : ''}
                  autoFocus
                  maxLength={20}
                />
              </div>
              {usernameError && <p className="error-message">{usernameError}</p>}
              <p className="hint">3-20 characters, letters, numbers, and underscores only</p>
            </div>
          </div>
        )}

        {/* Step 2: Display Name */}
        {currentStep === 2 && (
          <div className="onboarding-step">
            <h3>What should we call you?</h3>
            <p className="step-description">
              Your display name is how you'll appear to others. You can change this anytime.
            </p>
            <div className="form-group">
              <label htmlFor="display_name">Display Name</label>
              <input
                id="display_name"
                type="text"
                value={formData.display_name}
                onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                placeholder="John Doe"
                autoFocus
                maxLength={50}
              />
              <p className="hint">Your full name or nickname</p>
            </div>
          </div>
        )}

        {/* Step 3: Bio (Optional) */}
        {currentStep === 3 && (
          <div className="onboarding-step">
            <h3>Tell us about yourself</h3>
            <p className="step-description">
              Share a little about who you are. This is optional but helps others get to know you!
            </p>
            <div className="form-group">
              <label htmlFor="bio">Bio (Optional)</label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Event organizer, tech enthusiast, coffee lover..."
                rows={4}
                autoFocus
                maxLength={200}
              />
              <p className="hint">{formData.bio.length}/200 characters</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="onboarding-footer">
          <button 
            onClick={handleSkip}
            className="btn-text"
            disabled={saving}
          >
            Skip for now
          </button>
          
          <div className="footer-actions">
            {currentStep > 0 && (
              <button 
                onClick={handleBack}
                className="btn-secondary"
                disabled={saving || uploading}
              >
                Back
              </button>
            )}
            
            {currentStep < 3 ? (
              <button 
                onClick={handleNext}
                className="btn-primary"
                disabled={saving || uploading || (currentStep === 0 && !formData.useOAuthAvatar && !formData.avatar_url)}
              >
                Next
              </button>
            ) : (
              <button 
                onClick={handleComplete}
                className="btn-primary"
                disabled={saving || uploading}
              >
                {saving ? 'Saving...' : 'Complete Setup'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
