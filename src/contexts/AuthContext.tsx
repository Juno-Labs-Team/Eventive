import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { AuthContextType, Profile } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const profileCache = new Map<string, { profile: Profile; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if cached profile is still valid
  const getCachedProfile = (userId: string): Profile | null => {
    const memoryCache = profileCache.get(userId);
    if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_DURATION) {
      console.log('[Auth] Using memory cached profile');
      return memoryCache.profile;
    }

    try {
      const cached = localStorage.getItem(`profile_${userId}`);
      if (cached) {
        const { profile, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          console.log('[Auth] Using localStorage cached profile');
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
    profileCache.set(userId, cacheData);
    
    try {
      localStorage.setItem(`profile_${userId}`, JSON.stringify(cacheData));
    } catch (error) {
      console.error('[Auth] Error saving to cache:', error);
    }
  };

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
    
    if (!force) {
      const cached = getCachedProfile(userId);
      if (cached) {
        setProfile(cached);
        return;
      }
    }
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Profile fetch timeout')), 10000)
    );
    
    try {
      const fetchPromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

      if (error) {
        console.error('[Auth] Profile fetch error:', error);
        setProfile(null);
        return;
      }
      
      if (!data) {
        console.log('[Auth] Profile not found, creating...');
        const currentUser = (await supabase.auth.getUser()).data.user;
        
        if (currentUser) {
          console.log('[Auth] User metadata:', currentUser.user_metadata);
          console.log('[Auth] Avatar URL from OAuth:', currentUser.user_metadata?.avatar_url);
          
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              display_name: currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || currentUser.email?.split('@')[0],
              avatar_url: currentUser.user_metadata?.avatar_url,
            })
            .select()
            .maybeSingle();
          
          if (createError) {
            console.error('[Auth] Error creating profile:', createError);
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
            cacheProfile(userId, newProfile);
          }
        }
        return;
      }
      
      console.log('[Auth] Profile fetched successfully:', data);
      
      if (data && !data.avatar_url) {
        console.log('[Auth] Profile has no avatar, checking OAuth metadata...');
        const currentUser = (await supabase.auth.getUser()).data.user;
        const oauthAvatar = currentUser?.user_metadata?.avatar_url;
        
        if (oauthAvatar) {
          console.log('[Auth] Updating profile with OAuth avatar:', oauthAvatar);
          const { data: updatedProfile } = await supabase
            .from('profiles')
            .update({ avatar_url: oauthAvatar })
            .eq('id', userId)
            .select()
            .maybeSingle();
          
          if (updatedProfile) {
            setProfile(updatedProfile);
            cacheProfile(userId, updatedProfile);
            return;
          }
        }
      }
      
      setProfile(data);
      cacheProfile(userId, data);
    } catch (error: any) {
      console.error('[Auth] Error fetching profile (caught):', error.message);
      setProfile(null);
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      clearProfileCache(user.id);
      await fetchProfile(user.id, true);
    }
  };

  useEffect(() => {
    console.log('[Auth] Initializing auth state...');
    
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

  const generateUsername = (): string => {
    const randomString = Math.random().toString(36).substring(2, 10);
    return `user_${randomString}`;
  };

  const signUpWithEmail = async (email: string, password: string, username?: string) => {
    try {
      console.log('[Auth] Signing up with email:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      if (!data.user) {
        throw new Error('Failed to create user');
      }

      console.log('[Auth] User created successfully:', data.user.id);

      const finalUsername = username || generateUsername();
      
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          username: finalUsername,
          display_name: email.split('@')[0],
          role: 'user',
        });

      if (profileError) {
        console.error('[Auth] Error creating profile:', profileError);
      } else {
        console.log('[Auth] Profile created with username:', finalUsername);
      }
    } catch (error) {
      console.error('Error signing up with email:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      console.log('[Auth] Signing in with email:', email);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      console.log('[Auth] Successfully signed in with email');
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  const signOut = async () => {
    console.log('[Auth] Signing out...');
    try {
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
    signInWithEmail,
    signUpWithEmail,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
