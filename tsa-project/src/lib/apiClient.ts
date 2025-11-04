/**
 * API Client for EventiveAPI Backend
 * 
 * This client handles all HTTP requests to the backend API.
 * Automatically includes JWT token in requests for authentication.
 */

import { supabase } from './supabaseClient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Get authentication headers with JWT token
 */
async function getAuthHeaders(): Promise<HeadersInit> {
  const { data: { session } } = await supabase.auth.getSession();
  
  return {
    'Authorization': session?.access_token ? `Bearer ${session.access_token}` : '',
    'Content-Type': 'application/json',
  };
}

/**
 * Handle API response
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || 'API request failed');
  }
  
  return data;
}

/**
 * API Client
 */
export const api = {
  // ==================== USERS ====================
  
  /**
   * Get current user profile
   */
  async getProfile() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/api/users/me`, {
      method: 'GET',
      headers,
    });
    return handleResponse(response);
  },

  /**
   * Update current user's profile
   */
  async updateProfile(data: {
    display_name?: string;
    username?: string;
    bio?: string;
    avatar_url?: string | null;
  }) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/api/users/me`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  /**
   * Get user profile by ID (public profiles only)
   */
  async getUserById(userId: string) {
    const response = await fetch(`${API_URL}/api/users/${userId}`);
    return handleResponse(response);
  },

  // ==================== SETTINGS ====================
  
  /**
   * Get user settings
   */
  async getSettings() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/api/settings`, {
      method: 'GET',
      headers,
    });
    return handleResponse(response);
  },

  /**
   * Update user settings
   */
  async updateSettings(settings: Record<string, any>) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/api/settings`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(settings),
    });
    return handleResponse(response);
  },

  // ==================== UPLOADS ====================
  
  /**
   * Upload user avatar
   */
  async uploadAvatar(file: File) {
    const { data: { session } } = await supabase.auth.getSession();
    
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await fetch(`${API_URL}/api/uploads/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': session?.access_token ? `Bearer ${session.access_token}` : '',
      },
      body: formData,
    });
    
    return handleResponse(response);
  },

  /**
   * Delete user avatar
   */
  async deleteAvatar() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/api/uploads/avatar`, {
      method: 'DELETE',
      headers,
    });
    return handleResponse(response);
  },

  // ==================== HEALTH CHECK ====================
  
  /**
   * Check API health status
   */
  async healthCheck() {
    const response = await fetch(`${API_URL}/health`);
    return handleResponse(response);
  },
};

export default api;
