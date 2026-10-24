import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Magnetic, MaskLines, useIsDesktop } from './motion';

const V = '/images/v3/';
const GROUPS = 6;
// Scroll window in which the skyline goes from dusk to fully lit.
const START = 0.12;
const END = 0.68;
const STEP = (END - START) / GROUPS;

// One group of windows: switches on over a short slice of scroll so it reads as a clear "click", not a slow fade.
const WindowGroup = ({ p, i, mobile }) => {
  const s = START + i * STEP;
  const opacity = useTransform(p, [s, s + STEP * 0.35, s + STEP * 0.5, s + STEP * 0.65], [0, 1, 0.82, 1]);
  const k = `${V}closing${mobile ? '-mobile' : ''}`;
  return <motion.div style={{ opacity }} className="absolute inset-0">
    <img src={`${k}-lights-${i + 1}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-bottom [filter:brightness(1.35)_saturate(1.1)]" />
    <img src={`${k}-bloom-${i + 1}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-bottom opacity-100 mix-blend-screen" />
  </motion.div>;
};

const toTime = v => {
  const mins = 18 * 60 + 40 + Math.round(v * 70); // 6:40 pm → 7:50 pm
  const h = Math.floor(mins / 60) - 12;
  return `${h}:${String(mins % 60).padStart(2, '0')} pm`;
};

// Pinned night scene: the sky deepens and the towers light up group by group, locked to scroll.
export default function ClosingScene() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const mobile = !desktop;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const dusk = useTransform(p, [0, END], [0.05, 0.45]);
  const nightVeil = useTransform(p, [0, END], [0, 0.55]);
  const glow = useTransform(p, [START, END], [0, 0.6]);
  const sceneScale = useTransform(p, [0, 1], [1.06, 1]);
  const treesY = useTransform(p, [0, 1], ['8%', '0%']);
  const progress = useTransform(p, [START, END], ['0%', '100%']);
  const time = useTransform(p, v => toTime(Math.max(0, Math.min(1, (v - START) / (END - START)))));
  const ctaOpacity = useTransform(p, [END - 0.08, END + 0.04], [0, 1]);
  const ctaY = useTransform(p, [END - 0.08, END + 0.04], [24, 0]);
  const copyY = useTransform(p, [0, 1], ['0%', '-6%']);

  return (
    <section ref={ref} className="relative h-[260vh] bg-[#140006]" aria-label="Begin your search">
      <div className="sticky top-0 h-[100svh] min-h-[620px] overflow-hidden text-white">
        <motion.div style={{ scale: sceneScale, transformOrigin: '50% 100%' }} className="absolute inset-0">
          <div className="absolute inset-0">
            <picture>
              <source media="(max-width: 1023px)" srcSet={`${V}closing-mobile-dark.webp`} />
              <img src={`${V}closing-dark.webp`} alt="Residential towers at dusk, lights switching on" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-bottom" />
            </picture>
          </div>
          {/* Dimming via an overlay (cheaper than animating CSS filters on mobile Safari) */}
          <motion.div style={{ opacity: reduce ? 0.45 : dusk }} className="absolute inset-0 bg-[#07050f]" />
          <motion.div style={{ opacity: nightVeil }} className="absolute inset-0 bg-[linear-gradient(180deg,#0b0a1c_0%,rgba(11,10,28,.6)_45%,transparent_75%)]" />
          {reduce
            ? Array.from({ length: GROUPS }, (_, i) => <img key={i} src={`${V}closing${mobile ? '-mobile' : ''}-lights-${i + 1}.webp`} alt="" className="absolute inset-0 h-full w-full object-cover object-bottom" />)
            : Array.from({ length: GROUPS }, (_, i) => <WindowGroup key={`${mobile}-${i}`} p={p} i={i} mobile={mobile} />)}
          <motion.div style={{ opacity: glow }} className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(230,169,95,.38),transparent_70%)] mix-blend-screen" />
        </motion.div>
        <div className="absolute inset-x-0 -bottom-2 flex justify-center"><motion.img style={{ y: treesY }} src={`${V}closing-trees-front.webp`} alt="" loading="lazy" className="w-[260%] max-w-none shrink-0 sm:w-[150%] lg:w-[110%]" /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a1c]/80 via-transparent to-transparent" />

        <motion.div style={{ y: copyY }} className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col items-center px-5 pt-[15vh] text-center">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[.3em] text-[#e6cf9f]">Begin your search</p>
          <h2 className="font-serif text-5xl leading-[.95] tracking-[-.04em] sm:text-7xl lg:text-8xl"><MaskLines lines={['The right space', <span>changes <span className="italic text-[#f6dce1]">everything.</span></span>]} /></h2>
          <motion.div style={reduce ? undefined : { opacity: ctaOpacity, y: ctaY }} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Magnetic><Link to="/contact" className="inline-flex items-center gap-3 bg-[#f6dce1] px-8 py-5 text-xs font-bold uppercase tracking-[.18em] text-[#4b0617] transition hover:bg-white">Talk to an advisor</Link></Magnetic>
            <a href="tel:+919712345802" className="inline-flex items-center gap-3 border border-white/30 px-8 py-5 text-xs font-bold uppercase tracking-[.18em] backdrop-blur-md transition hover:bg-white/10"><Phone size={14} /> +91 97123 45802</a>
          </motion.div>
        </motion.div>

        {/* Evening clock tied to the lighting sequence */}
        <div className="absolute bottom-6 left-5 right-5 z-10 flex items-center gap-4 text-[10px] uppercase tracking-[.24em] text-white/60 sm:left-14 sm:right-auto sm:w-80">
          <motion.span className="w-20 shrink-0 tabular-nums text-[#e6cf9f]">{time}</motion.span>
          <span className="h-px flex-1 bg-white/15"><motion.span style={{ width: progress }} className="block h-full bg-[#e6cf9f]" /></span>
          <span className="shrink-0">Evening</span>
        </div>
      </div>
    </section>
  );
}
