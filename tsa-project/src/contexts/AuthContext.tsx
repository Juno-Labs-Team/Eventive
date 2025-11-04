import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { AuthContextType, Profile } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In-memory cache for profiles (faster than localStorage)
const profileCache = new Map<string, { profile: Profile; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if cached profile is still valid
  const getCachedProfile = (userId: string): Profile | null => {
    // Check memory cache first (fastest)
    const memoryCache = profileCache.get(userId);
    if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_DURATION) {
      console.log('[Auth] Using memory cached profile');
      return memoryCache.profile;
    }

    // Check localStorage as fallback
    try {
      const cached = localStorage.getItem(`profile_${userId}`);
      if (cached) {
        const { profile, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          console.log('[Auth] Using localStorage cached profile');
          // Also update memory cache
          profileCache.set(userId, { profile, timestamp });
          return profile;
        }
      }
    } catch (error) {
      console.error('[Auth] Error reading cache:', error);
    }

    return null;
  };

  // Save profile to cache
  const cacheProfile = (userId: string, profile: Profile) => {
    const cacheData = { profile, timestamp: Date.now() };
    
    // Save to memory cache
    profileCache.set(userId, cacheData);
    
    // Save to localStorage
    try {
      localStorage.setItem(`profile_${userId}`, JSON.stringify(cacheData));
    } catch (error) {
      console.error('[Auth] Error saving to cache:', error);
    }
  };

  // Clear profile cache
  const clearProfileCache = (userId: string) => {
    profileCache.delete(userId);
    try {
      localStorage.removeItem(`profile_${userId}`);
    } catch (error) {
      console.error('[Auth] Error clearing cache:', error);
    }
  };

  // Fetch user profile from database
  const fetchProfile = async (userId: string, force = false) => {
    console.log('[Auth] Fetching profile for user:', userId);
    
    // Check cache first (unless force refresh)
    if (!force) {
      const cached = getCachedProfile(userId);
      if (cached) {
        setProfile(cached);
        return;
      }
    }
    
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Profile fetch timeout')), 10000)
    );
    
    try {
      const fetchPromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle(); // Use maybeSingle() instead of single() to avoid 406 error
      
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

      if (error) {
        console.error('[Auth] Profile fetch error:', error);
        setProfile(null);
        return;
      }
      
      // If profile doesn't exist, create it
      if (!data) {
        console.log('[Auth] Profile not found, creating...');
        const currentUser = (await supabase.auth.getUser()).data.user;
        
        if (currentUser) {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              display_name: currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || currentUser.email?.split('@')[0],
              avatar_url: currentUser.user_metadata?.avatar_url,
            })
            .select()
            .maybeSingle(); // Use maybeSingle() here too
          
          if (createError) {
            console.error('[Auth] Error creating profile:', createError);
            // If it's a duplicate key error, try fetching again
            if (createError.code === '23505') {
              console.log('[Auth] Profile already exists, fetching again...');
              const { data: existingProfile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle();
              
              if (existingProfile) {
                setProfile(existingProfile);
                cacheProfile(userId, existingProfile);
              }
            } else {
              setProfile(null);
            }
          } else if (newProfile) {
            console.log('[Auth] Profile created successfully:', newProfile);
            setProfile(newProfile);
            cacheProfile(userId, newProfile); // Cache the new profile
          }
        }
        return;
      }
      
      console.log('[Auth] Profile fetched successfully:', data);
      setProfile(data);
      cacheProfile(userId, data); // Cache the profile
    } catch (error: any) {
      console.error('[Auth] Error fetching profile (caught):', error.message);
      setProfile(null);
    }
  };

  // Refresh profile (useful after updates - force fetch from DB)
  const refreshProfile = async () => {
    if (user?.id) {
      clearProfileCache(user.id); // Clear cache before refreshing
      await fetchProfile(user.id, true); // Force fetch
    }
  };

  // Initialize auth state
  useEffect(() => {
    console.log('[Auth] Initializing auth state...');
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('[Auth] Error getting session:', error);
      }
      console.log('[Auth] Session:', session ? 'Found' : 'None');
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log('[Auth] Fetching profile for user:', session.user.id);
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[Auth] Auth state changed:', event, session ? 'User logged in' : 'User logged out');
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  // Sign in with Discord
  const signInWithDiscord = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Discord:', error);
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    console.log('[Auth] Signing out...');
    try {
      // Clear cache before signing out
      if (user?.id) {
        clearProfileCache(user.id);
      }
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('[Auth] Sign out error:', error);
        throw error;
      }
      console.log('[Auth] Successfully signed out');
    } catch (error) {
      console.error('[Auth] Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    signInWithGoogle,
    signInWithDiscord,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
