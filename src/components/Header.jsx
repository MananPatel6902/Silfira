import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { EASE } from './motion';

const links = [['Properties', '/properties'], ['About', '/about'], ['Team', '/agents'], ['Valuation', '/valuation']];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 300 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return <motion.header animate={{ y: hidden && !open ? '-100%' : '0%' }} transition={{ duration: 0.6, ease: EASE }}
    className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || open ? 'border-b border-white/10 bg-[#2a020b]/80 backdrop-blur-xl' : 'bg-gradient-to-b from-black/40 to-transparent'}`}>
    <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-24 lg:px-14">
      <Link to="/" className="flex items-center gap-3.5" aria-label="Silfira Realtors home"><img src="/images/v2/brand/silfira-monogram-ivory.png" alt="" className="h-10 w-auto lg:h-11" /><span className="h-8 w-px bg-white/25" /><img src="/images/v2/brand/silfira-wordmark-ivory.png" alt="Silfira Realtors" className="h-7 w-auto lg:h-8" /></Link>
      <nav className="hidden items-center gap-9 lg:flex">
        {links.map(([label, path]) => <NavLink key={path} to={path} className={({ isActive }) => `group relative py-2 text-[11px] font-semibold uppercase tracking-[.16em] transition ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}>
          {({ isActive }) => <>{label}<span className={`absolute -bottom-0.5 left-0 h-px bg-[#e6cf9f] transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} /></>}
        </NavLink>)}
        <Link to="/contact" className="flex items-center gap-3 border border-white/30 px-5 py-3 text-[10px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-md transition hover:border-[#f6dce1] hover:bg-[#f6dce1] hover:text-[#4b0617]">Enquire</Link>
      </nav>
      <button onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white lg:hidden" aria-label="Toggle navigation" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>
      {open && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: '100svh', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} className="overflow-hidden px-5 lg:hidden">
        <div className="pt-6">
          {links.map(([label, path], i) => <motion.div key={path} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: EASE }}>
            <Link to={path} className="flex items-center justify-between border-b border-white/10 py-5 font-serif text-4xl text-white">{label}</Link>
          </motion.div>)}
          <Link to="/contact" className="mt-8 flex justify-center bg-[#f6dce1] px-5 py-5 text-xs font-bold uppercase tracking-[.15em] text-[#4b0617]">Enquire now</Link>
          <a href="tel:+919712345802" className="mt-3 flex justify-center border border-white/25 px-5 py-5 text-xs font-bold uppercase tracking-[.15em] text-white">Call +91 97123 45802</a>
        </div>
      </motion.nav>}
    </AnimatePresence>
  </motion.header>;
}
