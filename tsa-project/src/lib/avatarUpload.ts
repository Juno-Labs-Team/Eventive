/**
 * Avatar Upload Utilities
 * 
 * Handles avatar uploads to Supabase Storage with validation and error handling.
 */

import { supabase } from './supabaseClient';

export interface UploadAvatarOptions {
  file: File;
  userId: string;
  onProgress?: (progress: number) => void;
}

export interface UploadAvatarResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Validates an image file for avatar upload
 */
export function validateAvatarFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Please upload an image file (PNG, JPG, GIF, or WebP)' };
  }

  // Check file size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be less than 5MB' };
  }

  // Check specific image types
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only PNG, JPG, GIF, and WebP images are supported' };
  }

  return { valid: true };
}

/**
 * Uploads an avatar to Supabase Storage and returns the public URL
 */
export async function uploadAvatar({ 
  file, 
  userId, 
  onProgress 
}: UploadAvatarOptions): Promise<UploadAvatarResult> {
  try {
    // Validate file first
    const validation = validateAvatarFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Generate unique filename with timestamp
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    // Report initial progress
    onProgress?.(10);

    // Delete old avatar if exists (cleanup)
    const { data: existingFiles } = await supabase.storage
      .from('avatars')
      .list(userId);

    if (existingFiles && existingFiles.length > 0) {
      const filesToDelete = existingFiles.map(f => `${userId}/${f.name}`);
      await supabase.storage
        .from('avatars')
        .remove(filesToDelete);
    }

    onProgress?.(30);

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return { 
        success: false, 
        error: `Failed to upload avatar: ${uploadError.message}` 
      };
    }

    onProgress?.(80);

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    if (!urlData?.publicUrl) {
      return { 
        success: false, 
        error: 'Failed to get avatar URL' 
      };
    }

    onProgress?.(100);

    return { 
      success: true, 
      url: urlData.publicUrl 
    };

  } catch (error: any) {
    console.error('Unexpected error uploading avatar:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred' 
    };
  }
}

/**
 * Deletes a user's avatar from Supabase Storage
 */
export async function deleteAvatar(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: files, error: listError } = await supabase.storage
      .from('avatars')
      .list(userId);

    if (listError) {
      return { success: false, error: listError.message };
    }

    if (!files || files.length === 0) {
      return { success: true }; // Nothing to delete
    }

    const filesToDelete = files.map(f => `${userId}/${f.name}`);
    const { error: deleteError } = await supabase.storage
      .from('avatars')
      .remove(filesToDelete);

    if (deleteError) {
      return { success: false, error: deleteError.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting avatar:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Converts a File to a base64 data URL (fallback if Storage not available)
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
