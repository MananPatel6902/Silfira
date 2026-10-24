import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE } from './motion';

const MASK = { WebkitMask: 'url(/images/v2/brand/silfira-wordmark-ivory.png) center / contain no-repeat', mask: 'url(/images/v2/brand/silfira-wordmark-ivory.png) center / contain no-repeat' };

// Studio credit. Details taken from the official site (workaidly.com).
const WORKAIDLY = { name: 'WorkAidly', url: 'https://workaidly.com', contact: 'https://workaidly.com/contact', label: 'workaidly.com', email: 'connect@workaidly.com' };

const explore = [['Properties', '/properties'], ['Our story', '/about'], ['The team', '/agents'], ['Free valuation', '/valuation'], ['Contact', '/contact']];
const areas = ['Sargasan', 'Kudasan', 'Raysan', 'PDEU · Palm Road'];

const Heading = ({ children }) => <h3 className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.26em] text-[#e6cf9f]"><span className="h-px w-5 bg-[#e6cf9f]/60" />{children}</h3>;

function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const submit = e => {
    e.preventDefault();
    setState('sending');
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ 'form-name': 'newsletter', email }).toString() })
      .then(response => { if (!response.ok) throw new Error(`Submission failed with ${response.status}`); setState('done'); setEmail(''); })
      .catch(() => setState('error'));
  };
  return <div>
    <h3 className="font-serif text-3xl leading-tight">First look at <span className="italic text-[#f6dce1]">new launches.</span></h3>
    <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">A short note when a home worth seeing comes to market. Nothing more.</p>
    <form name="newsletter" onSubmit={submit} className="mt-7 flex items-center border-b border-white/25 transition-colors focus-within:border-[#e6cf9f]">
      <input type="hidden" name="form-name" value="newsletter" />
      <label htmlFor="footer-email" className="sr-only">Email address</label>
      <input id="footer-email" required type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" className="min-w-0 flex-1 bg-transparent py-4 text-base outline-none placeholder:text-white/35 sm:text-sm" />
      <button disabled={state === 'sending'} className="px-1 text-[10px] font-bold uppercase tracking-[.22em] text-[#e6cf9f] transition hover:text-white disabled:opacity-50">{state === 'sending' ? 'Joining' : 'Join'}</button>
    </form>
    <AnimatePresence>{state === 'done' && <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 text-xs text-[#f0c5ce]">Thank you. You're on the list.</motion.p>}
      {state === 'error' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-xs text-[#f0c5ce]">Something went wrong. Please try again.</motion.p>}</AnimatePresence>
  </div>;
}

// "Crafted by WorkAidly": a quiet line that opens a small glass card on hover, focus or tap.
function StudioCredit() {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const closeTimer = useRef(null);
  useEffect(() => {
    if (!open) return;
    const away = e => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); };
    const esc = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', esc); };
  }, [open]);
  const enter = e => { if (e.pointerType !== 'mouse') return; clearTimeout(closeTimer.current); setOpen(true); };
  const leave = e => { if (e.pointerType !== 'mouse') return; closeTimer.current = setTimeout(() => setOpen(false), 220); };

  return <div ref={wrap} className="relative" onPointerEnter={enter} onPointerLeave={leave}>
    <AnimatePresence>
      {open && <motion.div id="workaidly-card" role="dialog" aria-label="About WorkAidly"
        initial={{ opacity: 0, y: 12, scale: 0.97, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, y: 8, scale: 0.98, filter: 'blur(4px)' }}
        transition={{ duration: 0.45, ease: EASE }}
        className="absolute bottom-[calc(100%+14px)] left-0 z-20 w-[min(calc(100vw-40px),340px)] origin-bottom-left sm:left-auto sm:right-0 sm:origin-bottom-right overflow-hidden border border-white/15 bg-[#3a0a18]/70 p-6 text-left normal-case tracking-normal shadow-[0_30px_80px_-20px_rgba(0,0,0,.6)] backdrop-blur-2xl">
        <span aria-hidden="true" className="glass-prism pointer-events-none absolute inset-x-0 top-0 h-px opacity-90" />
        <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[#e6cf9f]">Like this website?</p>
        <p className="mt-3 font-serif text-2xl leading-snug text-white">We can build one for your business too.</p>
        <p className="mt-3 text-[13px] leading-6 text-white/65">Tell us what you need and the WorkAidly team will get in touch.</p>
        <div className="mt-5 flex flex-col gap-2.5">
          <a href={WORKAIDLY.contact} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-[#f6dce1] px-5 py-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#4b0617] transition hover:bg-white">Start a project</a>
          <div className="mt-1 flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs text-white/60">
            <a href={`mailto:${WORKAIDLY.email}`} className="underline-offset-4 transition hover:text-white hover:underline">{WORKAIDLY.email}</a>
            <a href={WORKAIDLY.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 transition hover:text-white hover:underline">{WORKAIDLY.label}</a>
          </div>
        </div>
      </motion.div>}
    </AnimatePresence>
    <button type="button" aria-expanded={open} aria-controls="workaidly-card" onClick={() => setOpen(o => !o)}
      className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 py-1.5 pl-2.5 pr-3.5 text-[10px] uppercase tracking-[.18em] text-white/45 transition hover:border-white/25 hover:text-white/80 aria-expanded:border-[#e6cf9f]/40 aria-expanded:text-white/85">
      <span className="relative flex h-2 w-2"><span className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#e6cf9f,#f6dce1,#aabeeb,#e6cf9f)] transition-transform duration-700 group-hover:rotate-180" /></span>
      Crafted by <span className="font-semibold normal-case tracking-[.06em] text-white/70 group-hover:text-white">WorkAidly</span>
    </button>
  </div>;
}

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const wordY = useTransform(scrollYProgress, [0, 1], ['35%', '0%']);
  const sheen = useTransform(scrollYProgress, [0, 1], ['0% 50%', '100% 50%']);
  const lineW = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);

  return <footer ref={ref} className="relative overflow-hidden bg-[#1e0108] px-5 pb-8 pt-20 text-white sm:px-8 lg:px-14 lg:pt-28">
    {/* Soft continuation of the night scene above */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#140006] to-transparent" />
    <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-[#8d2942]/20 blur-[120px]" />

    <div className="relative mx-auto max-w-[1440px]">
      <div className="grid gap-14 pb-16 sm:grid-cols-2 lg:grid-cols-[1.15fr_.65fr_.85fr_1.25fr] lg:gap-10">
        <div>
          <img src="/images/v2/brand/silfira-lockup-ivory.png" alt="Silfira Realtors" className="mb-7 h-20 w-auto lg:h-24" />
          <p className="max-w-xs text-sm leading-7 text-white/55">Curated homes across Gandhinagar, chosen with care and honest advice.</p>
          <a href="https://instagram.com/silfira_realtors" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-3 text-xs text-white/60 transition hover:text-white" aria-label="Silfira on Instagram">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-[#e6cf9f]"><Instagram size={16} /></span>@silfira_realtors
          </a>
        </div>
        <nav aria-label="Footer">
          <Heading>Explore</Heading>
          <ul className="space-y-3 text-sm text-white/60">{explore.map(([l, to]) => <li key={to}><Link to={to} className="group relative inline-block transition hover:text-white">{l}<span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#e6cf9f] transition-all duration-500 group-hover:w-full" /></Link></li>)}</ul>
        </nav>
        <div>
          <Heading>Visit</Heading>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-[#e6cf9f]" /><span>Kudasan, Gandhinagar<br />Gujarat 382421</span></li>
            <li><a className="flex gap-3 transition hover:text-white" href="tel:+919712345802"><Phone size={16} className="shrink-0 text-[#e6cf9f]" />+91 97123 45802</a></li>
            <li><a className="flex gap-3 transition hover:text-white" href="mailto:rohanrealtor20@gmail.com"><Mail size={16} className="shrink-0 text-[#e6cf9f]" />rohanrealtor20@gmail.com</a></li>
          </ul>
          <p className="mt-6 text-[10px] uppercase leading-6 tracking-[.2em] text-white/35">{areas.join('  ·  ')}</p>
        </div>
        <Newsletter />
      </div>

      <div className="h-px w-full bg-white/10"><motion.div style={{ width: lineW }} className="h-full bg-gradient-to-r from-transparent via-[#e6cf9f]/60 to-transparent" /></div>

      <motion.div style={{ y: wordY }} aria-hidden="true" className="pointer-events-none flex select-none justify-center pb-10 pt-14 lg:pt-20">
        {/* Prism glass wordmark: the official logotype as a mask over a slow, scroll-driven iridescent sheen */}
        <div className="relative aspect-[4509/1328] w-[92%] max-w-[1180px]">
          <span style={MASK} className="absolute inset-0 translate-x-[1px] translate-y-[2px] bg-black/40" />
          <motion.span style={{ ...MASK, backgroundPosition: sheen }} className="glass-prism absolute inset-0" />
          <span style={MASK} className="absolute inset-0 -translate-y-[1px] bg-gradient-to-b from-white/25 via-transparent to-transparent opacity-60" />
        </div>
      </motion.div>

      <div className="flex flex-col-reverse items-start gap-5 border-t border-white/10 pt-7 text-[10px] uppercase tracking-[.16em] text-white/35 sm:flex-row sm:items-center sm:justify-between sm:pr-24">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span>© {new Date().getFullYear()} Silfira Realtors</span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <span>Gandhinagar, Gujarat</span>
        </div>
        <StudioCredit />
      </div>
    </div>
  </footer>;
}
