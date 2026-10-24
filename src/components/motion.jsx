import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, animate } from 'framer-motion';

// Shared easing: slow, expensive-feeling expo-out.
export const EASE = [0.16, 1, 0.3, 1];

export const useIsDesktop = () => {
  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const on = () => setDesktop(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return desktop;
};

export const Reveal = ({ children, className = '', delay = 0, y = 36, as = 'div' }) => {
  const Tag = motion[as];
  return <Tag initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1, ease: EASE, delay }} className={className}>{children}</Tag>;
};

// Headline lines rise from behind a mask, one after another.
export const MaskLines = ({ lines, className = '', lineClassName = '', delay = 0, animateOnMount = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  const reduce = useReducedMotion();
  const show = animateOnMount || inView;
  return <span ref={ref} className={`block ${className}`}>
    {lines.map((line, i) => <span key={i} className="block overflow-hidden pb-[.08em] -mb-[.08em]">
      <motion.span className={`block ${lineClassName}`} initial={reduce ? false : { y: '105%' }}
        animate={show || reduce ? { y: '0%' } : undefined} transition={{ duration: 1.2, ease: EASE, delay: delay + i * 0.12 }}>{line}</motion.span>
    </span>)}
  </span>;
};

// Image that drifts inside its frame while the frame passes through the viewport.
export const ParallaxImage = ({ src, alt = '', className = '', imgClassName = '', amount = 12, sizes, srcSet, loading = 'lazy' }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return <div ref={ref} className={`overflow-hidden ${className.includes("absolute") ? "" : "relative"} ${className}`}>
    <motion.img src={src} srcSet={srcSet} sizes={sizes} alt={alt} loading={loading} decoding="async" style={reduce ? undefined : { y, scale: 1 + amount / 50 }} className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`} />
  </div>;
};

// Arch-shaped clip reveal, echoing the roofline in the Silfira monogram.
// Visibility is observed on an unclipped wrapper so the hidden state can't block its own trigger.
export const ArchReveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  return <div ref={ref} className={className}>
    <motion.div className="safari-clip relative h-full w-full overflow-hidden" style={{ borderRadius: '999px 999px 0 0' }}
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }} animate={inView || reduce ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
      transition={{ duration: 1.4, ease: EASE, delay }}>{children}</motion.div>
  </div>;
};

export const CountUp = ({ value, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const match = String(value).match(/^(\d+)(.*)$/);
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value);
  useEffect(() => {
    if (!inView || !match) return;
    const target = Number(match[1]);
    const controls = animate(0, target, { duration: 2, ease: EASE, onUpdate: v => setDisplay(`${Math.round(v)}${match[2]}`) });
    return () => controls.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={ref} className={className}>{display}</span>;
};

// Button that leans toward the cursor on desktop.
export const Magnetic = ({ children, className = '', strength = 0.3 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const move = e => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  return <motion.div ref={ref} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy }} className={`inline-block ${className}`}>{children}</motion.div>;
};

export const Eyebrow = ({ children, light = false, className = '' }) => <p className={`mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.28em] ${light ? 'text-[#f0c5ce]' : 'text-[#9d3a52]'} ${className}`}><span className={`h-px w-8 ${light ? 'bg-[#d9b77e]' : 'bg-[#c9a46a]'}`} />{children}</p>;
