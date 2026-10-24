import React, { useCallback, useRef } from 'react';
import { motion, useAnimationControls, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EASE, MaskLines, useIsDesktop } from './motion';
import FallingLeaves from './FallingLeaves';

const locations = ['All locations', 'Sargasan', 'Kudasan', 'Raysan', 'PDEU'];
const V = '/images/v2/hero/';
const V3 = '/images/v3/';

// A layered dusk scene. Each layer moves at its own speed as the visitor scrolls,
// so the camera seems to walk forward through the garden toward the towers.
export default function Hero({ filters, setFilters }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Pointer depth (desktop only): layers shift by different amounts.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const onMove = e => {
    if (!desktop || reduce) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };
  const depth = n => ({ x: useTransform(sx, v => v * -n * 0.5), y: useTransform(sy, v => v * -n * 0.25) }); // eslint-disable-line react-hooks/rules-of-hooks
  const d1 = depth(8), d2 = depth(16), d3 = depth(28), d4 = depth(44), d5 = depth(60);

  const skyY = useTransform(p, [0, 1], ['0%', '-6%']);
  const skyScale = useTransform(p, [0, 1], [1.04, 1.14]);
  const skylineY = useTransform(p, [0, 1], ['0%', '-8%']);
  const towerY = useTransform(p, [0, 1], ['0%', '-11%']);
  const towerScale = useTransform(p, [0, 1], [1, 1.08]);
  const treeY = useTransform(p, [0, 1], ['0%', '-15%']);
  const treeScale = useTransform(p, [0, 1], [1, 1.14]);
  const rightX = useTransform(p, [0, 1], ['0%', '38%']);
  const backTowerY = useTransform(p, [0, 1], ['0%', '-7%']);
  const mistY = useTransform(p, [0, 1], ['0%', '-12%']);
  const frontY = useTransform(p, [0, 1], ['0%', '-35%']);
  // Leaves recede as you scroll: fade out and soften, instead of staying lit while the scene darkens
  const leafFade = useTransform(p, [0.05, 0.85], [1, 0]);
  const copyY = useTransform(p, [0, 0.6], ['0%', '-40%']);
  const copyOpacity = useTransform(p, [0, 0.45], [1, 0]);
  const curtain = useTransform(p, [0.72, 1], [0, 1]);
  const rayOpacity = useTransform(p, [0, 0.5], [0.27, 0]);

  const leaves = useRef(null);
  const rustle = useAnimationControls();
  const shake = e => {
    const host = ref.current?.firstElementChild?.getBoundingClientRect();
    if (!host) return;
    leaves.current?.drop(e.clientX - host.left, e.clientY - host.top, 4 + Math.floor(Math.random() * 3));
    if (!reduce) rustle.start({ rotate: [0, -2.2, 1.4, -0.6, 0], transition: { duration: 1.4, ease: 'easeOut' } });
  };
  // Ambient leaves start from the front branch, around its lower edge
  const ambientFrom = useCallback(w => ({ x: w - (w < 768 ? 60 : 120 + Math.random() * 160), y: 120 + Math.random() * 380 }), []);

  const search = () => {
    const q = new URLSearchParams();
    if (filters.location !== 'All locations') q.set('location', filters.location);
    if (filters.bhk !== 'Any BHK') q.set('bhk', filters.bhk.replace(' BHK', ''));
    navigate(`/properties?${q.toString()}`);
  };

  const enter = (delay, from = {}) => reduce ? {} : { initial: { opacity: 0, ...from }, animate: { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }, transition: { duration: 2, ease: EASE, delay } };

  return (
    <section ref={ref} className="relative h-[175vh] bg-[#2a020b]" onPointerMove={onMove}>
      <div className="sticky top-0 h-[100svh] overflow-hidden text-white">
        {/* 1 · Sky */}
        <motion.div style={{ y: skyY, scale: skyScale }} className="absolute inset-0">
          <motion.div style={d1} className="absolute -inset-6">
            <picture>
              <source media="(max-width: 767px)" srcSet={`${V3}hero-sky-mobile.webp`} />
              <img src={`${V3}hero-sky-desktop.webp`} alt="" fetchpriority="high" className="h-full w-full object-cover" />
            </picture>
          </motion.div>
        </motion.div>

        {/* 2 · Distant skyline */}
        <motion.div style={{ y: skylineY }} className="absolute inset-x-0 bottom-[16%] flex transform-gpu justify-center lg:bottom-[12%]">
          <motion.img style={d2} {...enter(0.2, { y: 40 })} src={`${V}hero-skyline-far.webp`} alt="" className="img-soft w-[220%] max-w-none shrink-0 opacity-75 blur-[1px] sm:w-[150%] lg:w-[110%] lg:opacity-60" />
        </motion.div>

        {/* Aerial haze at the horizon: pushes the skyline back and separates it from the towers */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[10%] h-[34%] bg-[linear-gradient(0deg,transparent_0%,rgba(214,168,152,.22)_45%,transparent_100%)]" />
        {/* Warm afterglow behind the towers, from the light source at the upper left */}
        <div className="pointer-events-none absolute bottom-[8%] right-[2%] hidden h-[70%] w-[48%] rounded-full bg-[radial-gradient(closest-side,rgba(232,170,128,.22),transparent)] blur-2xl lg:block" />

        {/* 2b · A second tower of the same development, further back: hazier, smaller, cooler */}
        <motion.div style={{ y: backTowerY }} className="pointer-events-none absolute bottom-[12%] hidden lg:right-[37%] lg:block">
          <motion.img style={d2} {...enter(0.1, { y: 60 })} src={`${V3}story-tower-day.webp`} alt="" className="h-[50svh] w-auto max-w-none opacity-[.5] blur-[1.6px] brightness-[.62] saturate-[.55] contrast-[.9]" />
        </motion.div>
        {/* Phone & tablet: two hazy towers of the same development flank the main building so the sides never feel empty */}
        <motion.div style={{ y: backTowerY }} className="pointer-events-none absolute bottom-[14%] -left-[6%] sm:left-[26%] md:bottom-[13%] lg:hidden">
          <img src={`${V3}story-tower-day.webp`} alt="" className="h-[42svh] w-auto max-w-none opacity-[.78] blur-[1px] brightness-[.7] saturate-[.6] contrast-[.9] sm:h-[44svh]" />
        </motion.div>
        <motion.div style={{ y: backTowerY }} className="pointer-events-none absolute bottom-[15%] -right-[7%] sm:-right-[3%] md:bottom-[14%] lg:hidden">
          <img src={`${V3}story-tower-dusk.webp`} alt="" className="h-[35svh] w-auto max-w-none -scale-x-100 opacity-[.7] blur-[1.3px] brightness-[.62] saturate-[.55] contrast-[.9] sm:h-[37svh]" />
        </motion.div>
        {/* Haze veil between the back tower and the main towers */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[linear-gradient(0deg,rgba(52,22,40,.55)_0%,rgba(92,52,70,.22)_45%,transparent_100%)]" />

        {/* 3 · Hero towers */}
        <div className="absolute inset-x-0 bottom-[7%] flex justify-center sm:justify-end sm:pr-[5%] lg:bottom-[2%] lg:pr-[5%] xl:pr-[12%] 2xl:pr-[16%]">
        <motion.div style={{ y: towerY, scale: towerScale, transformOrigin: '50% 100%' }} className="h-[58svh] transform-gpu sm:h-[54svh] lg:h-[74svh] xl:h-[84svh]">
          <motion.div style={d3} className="h-full">
            <picture>
              <source media="(max-width: 767px)" srcSet={`${V3}hero-towers-mobile.webp`} />
              <motion.img {...enter(0.15, { y: 120, filter: 'blur(8px)' })} src={`${V3}hero-towers.webp`} alt="Silfira residences at dusk" fetchpriority="high" className="h-full w-auto max-w-none drop-shadow-[0_30px_50px_rgba(20,0,6,.45)]" />
            </picture>
          </motion.div>
        </motion.div>
        </div>

        {/* Low evening mist settling at the tower bases */}
        <motion.div style={{ y: mistY }} className="pointer-events-none absolute inset-x-0 bottom-[6%] h-[22%] bg-[radial-gradient(60%_100%_at_70%_100%,rgba(214,176,166,.22),transparent_70%)] blur-xl" />

        {/* 4 · Mid-ground garden */}
        {/* Composed as a garden cluster under the towers, fading out toward the copy */}
        <motion.div style={{ y: treeY, scale: treeScale, transformOrigin: '70% 100%' }} className="hero-garden absolute inset-x-0 transform-gpu -bottom-[9%] flex justify-center sm:-bottom-[7%] sm:justify-end lg:-bottom-[9%]">
          <motion.img style={d4} {...enter(0.35, { y: 80 })} src={`${V3}hero-garden-cluster.webp`} alt="" className="w-[118%] max-w-none shrink-0 sm:-mr-[6%] sm:w-[84%] lg:mr-[3%] lg:w-[64%] 2xl:mr-[5%]" />
        </motion.div>

        {/* Soft ground shadow so the garden settles into the page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-t from-[#1e0108]/70 to-transparent" />

        {/* Shade for legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,2,10,.78)_0%,rgba(30,2,10,.35)_42%,transparent_70%)] max-lg:bg-[linear-gradient(180deg,rgba(30,2,10,.85)_0%,rgba(30,2,10,.55)_38%,transparent_62%)]" />

        {/* 5 · Corner canopy: two overlapping branches anchored above and beyond the top-right corner,
              so neither image's cut edge is ever on screen. Back branch is wider and softer; front branch cascades. */}
        <motion.div style={{ x: rightX, opacity: leafFade }} className="absolute right-0 top-0 h-full w-0">
          <motion.div animate={rustle} style={{ transformOrigin: '100% 0%' }} className="absolute right-0 top-0 h-full">
            <motion.img style={{ ...d4, scaleX: -1 }} {...enter(0.45, { x: 80 })} src={`${V}foliage-left.webp`} alt="" onPointerDown={shake} draggable="false"
              className="leaf-fade foliage-back absolute -right-[3vw] -top-[8svh] h-[44svh] w-auto max-w-none cursor-pointer blur-[1px] md:-right-[2vw] md:-top-[10svh] md:h-[62svh] lg:-right-[1vw] lg:-top-[14svh] lg:h-[124svh]" />
            <motion.img style={d5} {...enter(0.55, { x: 80 })} src={`${V}foliage-right.webp`} alt="" onPointerDown={shake} draggable="false"
              className="leaf-fade foliage-front absolute -right-[4vw] -top-[5svh] h-[52svh] w-auto max-w-none cursor-pointer blur-[.5px] md:-right-[3vw] md:-top-[6svh] md:h-[70svh] lg:-right-[3vw] lg:-top-[8svh] lg:h-[132svh]" />
          </motion.div>
        </motion.div>

        {/* Falling leaves layer */}
        <FallingLeaves ref={leaves} ambientFrom={ambientFrom} />

        {/* 5c · Out-of-focus foreground foliage in the corner: the closest plane to the camera */}
        <motion.div style={{ y: frontY, opacity: leafFade }} className="pointer-events-none absolute -bottom-[16%] -right-[6%] hidden h-[52svh] lg:block">
          <img src={`${V3}foliage-left.webp`} alt="" className="h-full w-auto max-w-none rotate-180 blur-[7px] brightness-[.38] saturate-[.8]" />
        </motion.div>

        {/* 6 · Soft sun rays from the upper left, breathing slowly, fading as you scroll */}
        <motion.div style={{ opacity: rayOpacity }} className="pointer-events-none absolute inset-0">
          <motion.img animate={reduce ? {} : { opacity: [0.75, 1, 0.75], scale: [1, 1.03, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} src={`${V}hero-light-haze.webp`} alt="" className="h-full w-full origin-top-left object-cover mix-blend-screen" />
        </motion.div>

        {/* Copy */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="pointer-events-none relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-start px-5 pt-28 sm:px-8 lg:justify-center lg:px-14 lg:pt-0">
          <motion.p {...enter(0.6, { y: 20 })} className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.3em] text-[#f6dce1]">
            <span className="h-px w-10 bg-[#d9b77e]" /> Curated homes in Gandhinagar
          </motion.p>
          <h1 className="max-w-4xl font-serif text-[clamp(3rem,6.2vw,7.6rem)] font-normal leading-[.86] tracking-[-.05em]">
            <MaskLines animateOnMount delay={0.7} lines={['Discover your', <span className="italic text-[#f6dce1]">dream space.</span>]} />
          </h1>
          <motion.p {...enter(1.2, { y: 20 })} className="mt-7 hidden max-w-[19rem] text-[15px] leading-7 text-white/70 sm:block lg:max-w-sm">
            Considered homes. Clear advice. A personal real estate experience built around how you want to live.
          </motion.p>
        </motion.div>

        {/* Search: frosted glass panel */}
        <motion.div style={{ opacity: copyOpacity }} {...enter(1.35, { y: 30 })} className="absolute bottom-5 left-4 right-24 z-20 sm:inset-x-8 sm:right-auto mx-auto max-w-[1440px] sm:inset-x-8 lg:inset-x-14 lg:bottom-10">
          <div className="grid grid-cols-[1fr_auto] overflow-hidden border border-white/20 bg-white/[.12] text-white shadow-[0_30px_80px_rgba(20,0,6,.45)] backdrop-blur-2xl lg:max-w-[880px] lg:grid-cols-[1.2fr_1fr_1fr_auto]">
            <label className="px-5 py-3.5 lg:border-r lg:border-white/15 lg:px-7 lg:py-4">
              <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[.22em] text-white/55">Where</span>
              <span className="flex items-center gap-2"><MapPin size={15} className="text-[#e6cf9f]" /><select value={filters.location} onChange={e => setFilters({ ...filters, location: e.target.value })} className="w-full bg-transparent text-base outline-none lg:text-sm [&>option]:text-[#4b0617]">{locations.map(x => <option key={x}>{x}</option>)}</select></span>
            </label>
            <label className="hidden border-r border-white/15 px-7 py-4 lg:block">
              <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[.22em] text-white/55">Configuration</span>
              <select value={filters.bhk} onChange={e => setFilters({ ...filters, bhk: e.target.value })} className="w-full bg-transparent text-base outline-none lg:text-sm [&>option]:text-[#4b0617]">{['Any BHK', '2 BHK', '3 BHK', '4 BHK'].map(x => <option key={x}>{x}</option>)}</select>
            </label>
            <label className="hidden px-7 py-4 lg:block">
              <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[.22em] text-white/55">Budget</span>
              <select value={filters.budget} onChange={e => setFilters({ ...filters, budget: e.target.value })} className="w-full bg-transparent text-base outline-none lg:text-sm [&>option]:text-[#4b0617]">{['Any budget', 'Under ₹75L', '₹75L to ₹1Cr', 'Above ₹1Cr'].map(x => <option key={x}>{x}</option>)}</select>
            </label>
            <button onClick={search} className="flex items-center justify-center gap-3 bg-[#f6dce1] px-6 text-[11px] font-bold uppercase tracking-[.18em] text-[#4b0617] transition hover:bg-white lg:px-9"><Search size={17} /><span className="hidden sm:inline">Search</span></button>
          </div>
        </motion.div>

        {/* Curtain into the maroon intro */}
        <motion.div style={{ opacity: curtain }} className="pointer-events-none absolute inset-0 z-30 bg-[#4b0617]" />
      </div>
    </section>
  );
}
