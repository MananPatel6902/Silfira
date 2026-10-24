import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async currentSession => {
    if (!currentSession?.user || !supabase) {
      setProfile(null);
      return;
    }
    const { data, error } = await supabase.from('profiles').select('*').eq('user_id', currentSession.user.id).eq('is_active', true).maybeSingle();
    if (error) throw error;
    setProfile(data || null);
  };

  useEffect(() => {
    let mounted = true;
    if (!supabase) { setLoading(false); return undefined; }
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      try { await loadProfile(data.session); } catch { setProfile(null); }
      if (mounted) setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setTimeout(async () => {
        try { await loadProfile(nextSession); } catch { setProfile(null); }
        setLoading(false);
      }, 0);
    });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  const value = useMemo(() => ({
    session,
    profile,
    loading,
    authorized: Boolean(profile && ['owner', 'admin', 'editor'].includes(profile.role)),
    signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signOut: () => supabase.auth.signOut(),
  }), [session, profile, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}

