import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';
import { isSupabaseConfigured, signInAdmin } from '../lib/adminAuth';

export default function AdminLogin({ onAuthenticated }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async event => {
    event.preventDefault();
    setBusy(true); setError('');
    try {
      const session = await signInAdmin(form.email.trim(), form.password);
      onAuthenticated(session);
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-[#f5f1ea] lg:grid-cols-[1.08fr_.92fr]">
      <section className="relative hidden min-h-screen overflow-hidden lg:block">
        <img src="/images/editorial/gandhinagar-residence-interior.png" alt="Luxury residence in Gandhinagar" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-white xl:p-16">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.3em] text-white/65">Silfira private office</p>
          <h1 className="max-w-xl font-serif text-6xl leading-[.92] tracking-[-.045em]">Thoughtful service,<br /><span className="italic text-[#f0c5ce]">managed beautifully.</span></h1>
          <p className="mt-7 max-w-md text-sm leading-7 text-white/65">One secure workspace for listings, enquiries, partners, reviews and client billing.</p>
        </div>
      </section>

      <section className="flex min-h-screen flex-col px-6 py-7 sm:px-12 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between">
          <span className="bg-[#4b0617] px-3"><BrandLogo compact /></span>
          <Link to="/" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#725f64]"><ArrowLeft size={14}/> Website</Link>
        </div>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="my-auto w-full max-w-md py-16">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[.26em] text-[#9d3a52]">Administrator access</p>
          <h2 className="font-serif text-5xl tracking-[-.035em] text-[#34131b]">Welcome back.</h2>
          <p className="mt-4 text-sm leading-6 text-[#806f73]">Sign in to manage the Silfira digital experience.</p>

          <form onSubmit={submit} className="mt-10 space-y-5">
            <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.14em] text-[#745f64]">Email address</span><span className="relative block"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9d858b]" size={17}/><input required type="email" autoComplete="username" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@silfira.co.in" className="h-14 w-full border border-[#4b0617]/15 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#7f2038]"/></span></label>
            <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.14em] text-[#745f64]">Password</span><span className="relative block"><LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9d858b]" size={17}/><input required minLength={8} type={showPassword?'text':'password'} autoComplete="current-password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Enter your password" className="h-14 w-full border border-[#4b0617]/15 bg-white pl-11 pr-12 text-sm outline-none transition focus:border-[#7f2038]"/><button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8f777d]" aria-label={showPassword?'Hide password':'Show password'}>{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></span></label>
            <div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2 text-[#745f64]"><input type="checkbox" className="accent-[#4b0617]"/> Remember me</label><button type="button" className="font-semibold text-[#7f2038]">Forgot password?</button></div>
            {error && <p role="alert" className="border-l-2 border-[#9d3a52] bg-[#f7e9ec] px-4 py-3 text-xs text-[#7f2038]">{error}</p>}
            <button disabled={busy} className="group flex h-14 w-full items-center justify-between bg-[#4b0617] px-6 text-[11px] font-bold uppercase tracking-[.17em] text-white transition hover:bg-[#6a1328] disabled:opacity-60"><span>{busy?'Signing in…':'Sign in securely'}</span><ArrowRight size={16} className="transition group-hover:translate-x-1"/></button>
          </form>

          {!isSupabaseConfigured && <div className="mt-7 border border-[#4b0617]/10 bg-white/55 p-4 text-xs leading-5 text-[#806f73]"><strong className="block text-[#4b0617]">Local preview access</strong><span>admin@silfira.co.in · Silfira@2026</span></div>}
        </motion.div>
        <p className="text-[9px] uppercase tracking-[.14em] text-[#9d8b8f]">Protected administration · Silfira Realtors</p>
      </section>
    </main>
  );
}
