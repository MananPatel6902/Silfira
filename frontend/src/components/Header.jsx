import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

const links = [['Properties','/properties'],['About','/about'],['Team','/agents'],['Valuation','/valuation']];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); onScroll(); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <header className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#4b0617]/95 text-white backdrop-blur-xl transition-shadow duration-500 ${scrolled || open ? 'shadow-[0_8px_40px_rgba(40,15,20,.18)]' : ''}`}>
    <div className="flex h-6 items-center justify-center bg-[#35010d] text-[8px] font-bold uppercase tracking-[.28em] text-white/65">Gandhinagar · GIFT City</div>
    <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[86px] lg:px-14">
      <Link to="/" aria-label="Silfira home"><BrandLogo compact /></Link>
      <nav className="hidden items-center gap-9 lg:flex">{links.map(([label,path])=><NavLink key={path} to={path} className={({isActive})=>`relative py-2 text-[10px] font-semibold uppercase tracking-[.17em] transition ${isActive?'text-white':'text-white/65 hover:text-white'}`}>{label}</NavLink>)}<Link to="/contact" className="flex items-center gap-3 border border-white/35 px-5 py-3 text-[10px] font-bold uppercase tracking-[.16em] text-white transition hover:bg-white hover:text-[#4b0617]">Enquire <ArrowUpRight size={14}/></Link></nav>
      <button onClick={()=>setOpen(!open)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white lg:hidden" aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<nav className="border-t border-white/10 px-5 pb-8 pt-4 lg:hidden">{links.map(([label,path])=><Link key={path} to={path} onClick={()=>setOpen(false)} className="flex items-center justify-between border-b border-white/10 py-4 font-serif text-2xl text-white">{label}<ArrowUpRight size={17}/></Link>)}<Link to="/contact" onClick={()=>setOpen(false)} className="mt-5 flex justify-center bg-white px-5 py-4 text-xs font-bold uppercase tracking-[.15em] text-[#4b0617]">Enquire now</Link></nav>}
  </header>;
}
