const SESSION_KEY = 'silfira-admin-session';
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export function getAdminSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (!session) return null;
    if (session.expiresAt && session.expiresAt < Date.now()) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function signInAdmin(email, password) {
  // Production path: Supabase GoTrue email/password authentication.
  if (isSupabaseConfigured) {
    const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: supabaseKey },
      body: JSON.stringify({ email, password }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error_description || payload.msg || 'Unable to sign in.');
    const session = {
      email: payload.user?.email || email,
      accessToken: payload.access_token,
      refreshToken: payload.refresh_token,
      expiresAt: Date.now() + (payload.expires_in || 3600) * 1000,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  // Local preview fallback. It is intentionally session-only and is replaced
  // automatically as soon as Supabase environment variables are supplied.
  if (email.toLowerCase() !== 'admin@silfira.co.in' || password !== 'Silfira@2026') {
    throw new Error('Incorrect preview email or password.');
  }
  const session = { email, preview: true, expiresAt: Date.now() + 8 * 60 * 60 * 1000 };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function signOutAdmin() {
  sessionStorage.removeItem(SESSION_KEY);
}
