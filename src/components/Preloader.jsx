import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from './motion';

// Brief monogram reveal on first visit per session, then a maroon curtain lifts.
export default function Preloader() {
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem('silfira-intro') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
  });
  useEffect(() => {
    if (!show) return;
    try { sessionStorage.setItem('silfira-intro', '1'); } catch {}
    const t = setTimeout(() => setShow(false), 1300);
    return () => clearTimeout(t);
  }, [show]);
  return <AnimatePresence>
    {show && <motion.div key="pre" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 1.1, ease: EASE }} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2a020b]">
      <div className="flex flex-col items-center gap-6">
        <motion.img initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1.1, ease: EASE }} src="/images/v2/brand/silfira-monogram-ivory.png" alt="" className="w-16 sm:w-20" />
        <div className="overflow-hidden"><motion.img initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.35 }} src="/images/v2/brand/silfira-wordmark-ivory.png" alt="Silfira Realtors" className="h-8 w-auto" /></div>
        <div className="h-px w-40 overflow-hidden bg-white/10"><motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: 1.4, ease: EASE }} className="h-full w-full bg-[#e6cf9f]" /></div>
      </div>
    </motion.div>}
  </AnimatePresence>;
}
