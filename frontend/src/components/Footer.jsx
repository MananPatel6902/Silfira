import React, { useState } from 'react';
import { ArrowRight, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const [email,setEmail]=useState('');
  const [joined,setJoined]=useState(false);
  return <footer className="bg-[#38020f] px-5 pb-8 pt-20 text-white sm:px-8 lg:px-14">
    <div className="mx-auto max-w-[1440px]"><div className="grid gap-14 border-b border-white/15 pb-16 lg:grid-cols-[1.2fr_.7fr_.7fr_1.2fr]">
      <div><div className="mb-7"><BrandLogo className="ring-1 ring-white/15" /></div><p className="max-w-xs text-sm leading-7 text-white/55">Where considered spaces become meaningful homes.</p><a href="https://instagram.com/silfira_realtors" className="mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-[#4b0617]" aria-label="Instagram"><Instagram size={16}/></a></div>
      <div><h3 className="mb-6 text-[10px] font-bold uppercase tracking-[.22em] text-[#f0c5ce]">Explore</h3><div className="space-y-3 text-sm text-white/60"><Link className="block hover:text-white" to="/properties">Properties</Link><Link className="block hover:text-white" to="/about">Our story</Link><Link className="block hover:text-white" to="/agents">The team</Link><Link className="block hover:text-white" to="/valuation">Valuation</Link></div></div>
      <div><h3 className="mb-6 text-[10px] font-bold uppercase tracking-[.22em] text-[#f0c5ce]">Visit</h3><div className="space-y-4 text-sm text-white/60"><div className="flex gap-3"><MapPin size={17} className="shrink-0 text-[#f0c5ce]"/><span>Kudasan, Gandhinagar<br/>Gujarat 382421</span></div><a className="flex gap-3 hover:text-white" href="tel:+919712345802"><Phone size={16} className="text-[#f0c5ce]"/>+91 97123 45802</a><a className="flex gap-3 hover:text-white" href="mailto:rohanrealtor20@gmail.com"><Mail size={16} className="text-[#f0c5ce]"/>Email us</a></div></div>
      <div><h3 className="font-serif text-3xl">Good homes. First.</h3><p className="mt-3 text-sm leading-6 text-white/55">Join our private list for selected launches and local market notes.</p><form onSubmit={e=>{e.preventDefault();setJoined(true)}} className="mt-7 flex border-b border-white/30"><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address" className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-white/35"/><button className="px-2" aria-label="Subscribe"><ArrowRight size={18}/></button></form>{joined&&<p className="mt-3 text-xs text-[#f0c5ce]">Welcome to the list.</p>}</div>
    </div><div className="flex flex-col gap-3 pt-7 text-[10px] uppercase tracking-[.15em] text-white/35 sm:flex-row sm:justify-between"><span>© 2026 Silfira Realtors</span><div className="flex gap-5"><Link to="/privacy">Privacy</Link><Link to="/admin">Admin</Link></div></div></div>
  </footer>;
}
