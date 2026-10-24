import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EASE, MaskLines } from './motion';

// Shared inner-page header: photo + garden foliage at three scroll speeds.
export default function PageHero({ image, eyebrow, lines, intro, foliage = true, children }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(p, [0, 1], ['0%', '25%']);
  const bgScale = useTransform(p, [0, 1], [1.08, 1.2]);
  const leafX = useTransform(p, [0, 1], ['0%', '30%']);
  const copyY = useTransform(p, [0, 1], ['0%', '60%']);
  const copyOpacity = useTransform(p, [0, 0.7], [1, 0]);
  return (
    <section ref={ref} className="relative flex min-h-[78svh] items-end overflow-hidden bg-[#2a020b] text-white lg:min-h-[86svh]">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <picture>
          <source media="(max-width: 767px)" srcSet={`/images/v2/inner-pages/${image}-mobile.webp`} />
          <motion.img initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, ease: EASE }} src={`/images/v2/inner-pages/${image}.webp`} alt="" fetchpriority="high" className="h-full w-full object-cover" />
        </picture>
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,1,8,.85)_0%,rgba(30,1,8,.45)_50%,rgba(30,1,8,.1)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e0108]/80 via-transparent to-transparent" />
      {foliage && <motion.img style={{ x: leafX }} initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.8, ease: EASE, delay: 0.2 }} src="/images/v2/hero/foliage-right.webp" alt="" className="pointer-events-none absolute -right-[12%] -top-[6%] h-[70%] w-auto max-w-none blur-[1px] sm:-right-[4%] sm:h-[110%]" />}
      <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-36 sm:px-8 lg:px-14 lg:pb-24">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.28em] text-[#f0c5ce]"><span className="h-px w-8 bg-[#e6cf9f]" />{eyebrow}</motion.p>
        <h1 className="max-w-5xl font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[.9] tracking-[-.05em]"><MaskLines animateOnMount delay={0.35} lines={lines} /></h1>
        {intro && <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="mt-7 max-w-lg text-sm leading-7 text-white/70 sm:text-base">{intro}</motion.p>}
        {children}
      </motion.div>
    </section>
  );
}
