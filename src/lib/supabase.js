import { createClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_SUPABASE_URL;
const publishableKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && publishableKey);

export const supabase = isSupabaseConfigured
  ? createClient(url, publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export function assetUrl(bucket, path) {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('/') || path.startsWith('./')) return path;
  if (!supabase) return path;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

