import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { session, authorized, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(params.get('error') === 'unauthorized' ? 'This account does not have admin access.' : '');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && session && authorized) navigate(location.state?.from?.pathname || '/admin', { replace: true });
  }, [authorized, loading, location.state, navigate, session]);

  if (!loading && session && authorized) return <Navigate to="/admin" replace />;

  const submit = async event => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: signInError } = await signIn(email.trim(), password);
    if (signInError) setError(signInError.message === 'Invalid login credentials' ? 'Incorrect email or password.' : signInError.message);
    setSubmitting(false);
  };

  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#250108] px-5 py-12 text-white">
    <img src="/images/v3/n01-avenue.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
    <div className="absolute inset-0 bg-gradient-to-br from-[#1e0108]/95 via-[#4b0617]/90 to-[#220108]/95" />
    <section className="relative w-full max-w-md border border-white/15 bg-white/[.07] p-7 shadow-[0_40px_100px_rgba(0,0,0,.45)] backdrop-blur-2xl sm:p-10">
      <div className="mb-10 flex items-center gap-4">
        <img src="/images/Silfira_logo.svg" alt="Silfira Realtors" className="h-14 w-14 brightness-0 invert" />
        <div><h1 className="font-serif text-2xl tracking-[.12em]">SILFIRA</h1><p className="mt-1 text-[9px] uppercase tracking-[.28em] text-[#f0c5ce]">Admin studio</p></div>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#e6cf9f]">Secure access</p>
      <h2 className="mt-3 font-serif text-4xl">Welcome back.</h2>
      <p className="mt-3 text-sm leading-6 text-white/55">Sign in with your authorised owner or administrator account.</p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[.16em] text-white/60">Email address</span><span className="relative block"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"/><input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="h-12 w-full border border-white/15 bg-black/15 pl-11 pr-4 text-sm outline-none transition focus:border-[#e6cf9f]/70" /></span></label>
        <label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[.16em] text-white/60">Password</span><span className="relative block"><LockKeyhole size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"/><input type={show?'text':'password'} required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} className="h-12 w-full border border-white/15 bg-black/15 pl-11 pr-12 text-sm outline-none transition focus:border-[#e6cf9f]/70" /><button type="button" onClick={()=>setShow(x=>!x)} aria-label={show?'Hide password':'Show password'} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 hover:text-white">{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></span></label>
        {error && <p role="alert" className="border border-red-300/20 bg-red-950/30 px-4 py-3 text-xs leading-5 text-red-100">{error}</p>}
        <button disabled={submitting} className="w-full bg-[#f6dce1] px-5 py-4 text-[10px] font-bold uppercase tracking-[.22em] text-[#4b0617] transition hover:bg-white disabled:opacity-60">{submitting?'Signing in…':'Sign in'}</button>
      </form>
      <a href="/" className="mt-7 block text-center text-[10px] uppercase tracking-[.18em] text-white/45 transition hover:text-white">Back to website</a>
    </section>
  </main>;
}

