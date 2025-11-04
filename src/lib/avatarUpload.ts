/**
 * Avatar Upload Utilities
 * 
 * Handles avatar uploads via the backend API with validation and error handling.
 */

import { api } from './apiClient';

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
 * Uploads an avatar via the backend API and returns the public URL
 */
export async function uploadAvatar({ 
  file, 
  onProgress 
}: UploadAvatarOptions): Promise<UploadAvatarResult> {
  try {
    // Validate file first
    const validation = validateAvatarFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Report initial progress
    onProgress?.(10);

    // Call backend API to handle upload
    onProgress?.(30);
    
    const result = await api.uploadAvatar(file) as { 
      success: boolean; 
      data?: { url: string }; 
      error?: { message: string } 
    };
    
    onProgress?.(80);

    if (!result.success) {
      return { 
        success: false, 
        error: result.error?.message || 'Failed to upload avatar' 
      };
    }

    onProgress?.(100);

    return { 
      success: true, 
      url: result.data?.url 
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
 * Deletes a user's avatar via the backend API
 */
export async function deleteAvatar(): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await api.deleteAvatar() as { 
      success: boolean; 
      error?: { message: string } 
    };
    
    if (!result.success) {
      return { 
        success: false, 
        error: result.error?.message || 'Failed to delete avatar' 
      };
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
