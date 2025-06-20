
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simplified admin check - just check if user email is admin email and has admin role in profile
  // Removed email confirmation requirement for now to allow access
  const isAdmin = user?.email === 'vanshichoudhary40@gmail.com' && 
                  (profile?.role === 'admin' || user?.email === 'vanshichoudhary40@gmail.com');

  const fetchProfile = async (userId: string, userEmail: string) => {
    try {
      console.log('Fetching profile for user:', userId, userEmail);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        // If no profile exists, create one
        if (error.code === 'PGRST116') {
          console.log('Creating new profile for user');
          const newProfile = {
            id: userId,
            email: userEmail,
            role: userEmail === 'vanshichoudhary40@gmail.com' ? 'admin' : 'customer'
          };
          
          const { data: insertedData, error: insertError } = await supabase
            .from('profiles')
            .insert([newProfile])
            .select()
            .single();
          
          if (!insertError && insertedData) {
            const profileData: Profile = {
              id: insertedData.id,
              email: insertedData.email,
              role: insertedData.role as 'admin' | 'customer',
              created_at: insertedData.created_at
            };
            setProfile(profileData);
            console.log('New profile created:', profileData);
          } else {
            console.error('Error creating profile:', insertError);
          }
        }
        setIsLoading(false);
        return;
      }

      if (data) {
        // Properly type the role and set default if needed
        const roleValue = data.role === 'admin' || data.role === 'customer' ? data.role : 'customer';
        
        let profileData: Profile = {
          id: data.id,
          email: data.email,
          role: roleValue,
          created_at: data.created_at
        };

        // If this is the admin email but role is not admin, update it
        if (userEmail === 'vanshichoudhary40@gmail.com' && data.role !== 'admin') {
          console.log('Updating admin role for admin email');
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: 'admin' })
            .eq('id', userId);
          
          if (!updateError) {
            profileData.role = 'admin';
          }
        }

        setProfile(profileData);
        console.log('Profile loaded:', profileData);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id, session.user.email || '');
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Existing session:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email || '');
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName
        }
      }
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Add debug logging for admin status
  useEffect(() => {
    if (user && profile) {
      console.log('Admin check:', {
        email: user.email,
        isCorrectEmail: user.email === 'vanshichoudhary40@gmail.com',
        profileRole: profile.role,
        isAdmin
      });
    }
  }, [user, profile, isAdmin]);

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      isLoading,
      isAdmin,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};
