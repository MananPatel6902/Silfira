import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// Palette pulled from the hero foliage: olive, sage, deep green, a little dry gold, one muted bougainvillea.
const TONES = [['#5d6b3a', '#879450'], ['#46552f', '#6f7d45'], ['#6b7448', '#a3a466'], ['#7c7a3c', '#b8a65a'], ['#3f4d2c', '#62703f']];
const BRACT = ['#8e3a58', '#b45c7a'];

const Leaf = ({ tone, bract }) => {
  const [a, b] = bract ? BRACT : tone;
  const id = useRef(`lg${Math.random().toString(36).slice(2, 8)}`).current;
  return bract
    ? <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-[0_6px_6px_rgba(20,0,6,.35)]"><defs><radialGradient id={id} cx="40%" cy="35%"><stop offset="0" stopColor={b} /><stop offset="1" stopColor={a} /></radialGradient></defs><path d="M12 2c5 3 9 7 8 12-1 4-5 7-8 8-3-1-7-4-8-8-1-5 3-9 8-12z" fill={`url(#${id})`} opacity=".92" /><path d="M12 5v15" stroke="rgba(255,255,255,.18)" strokeWidth=".6" /></svg>
    : <svg viewBox="0 0 20 44" className="h-full w-full drop-shadow-[0_6px_6px_rgba(20,0,6,.35)]"><defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={b} /><stop offset="1" stopColor={a} /></linearGradient></defs><path d="M10 1C3 9 1 19 3 28c1.5 7 4.5 12 7 15 2.5-3 5.5-8 7-15 2-9 0-19-7-27z" fill={`url(#${id})`} /><path d="M10 3v39" stroke="rgba(255,255,255,.22)" strokeWidth=".7" /><path d="M10 14l-4 3M10 20l5 3M10 26l-5 3M10 32l4 3" stroke="rgba(255,255,255,.1)" strokeWidth=".5" /></svg>;
};

const rand = (a, b) => a + Math.random() * (b - a);

// A fixed-size pool of drifting leaves. Parent calls drop(x, y, count) with coordinates inside this layer.
const FallingLeaves = forwardRef(function FallingLeaves({ ambientFrom }, ref) {
  const reduce = useReducedMotion();
  const [leaves, setLeaves] = useState([]);
  const layer = useRef(null);

  const drop = useCallback((x, y, count = 4) => {
    if (reduce) return;
    const h = layer.current?.offsetHeight || 800;
    const born = Date.now();
    setLeaves(ls => [...ls.slice(-14), ...Array.from({ length: count }, (_, i) => {
      const fall = rand(h * 0.55, h * 0.95) - y * 0.3;
      const drift = rand(-160, 40);
      return {
        id: `${born}-${i}-${Math.random()}`, x: x + rand(-40, 40), y: y + rand(-30, 30), size: rand(20, 34), fall, drift,
        dur: rand(4.2, 6.8), delay: i * rand(0.08, 0.22), spin: rand(-260, 260), tone: TONES[Math.floor(Math.random() * TONES.length)], bract: Math.random() < 0.18,
        sway: [0, rand(20, 45), rand(-30, -10), rand(25, 50), drift],
      };
    })]);
  }, [reduce]);

  useImperativeHandle(ref, () => ({ drop }), [drop]);

  // Ambient: every so often a single leaf lets go on its own.
  useEffect(() => {
    if (reduce || !ambientFrom) return;
    let t;
    const tick = () => {
      if (document.visibilityState === 'visible' && window.scrollY < window.innerHeight * 0.6) {
        const w = layer.current?.offsetWidth || 1200;
        const { x, y } = ambientFrom(w);
        drop(x, y, 1);
      }
      t = setTimeout(tick, rand(6500, 11000));
    };
    t = setTimeout(tick, 3500);
    return () => clearTimeout(t);
  }, [ambientFrom, drop, reduce]);

  return <div ref={layer} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <AnimatePresence>
      {leaves.map(l => <motion.div key={l.id} className="absolute will-change-transform" style={{ left: l.x, top: l.y, width: l.bract ? l.size * 0.9 : l.size * 0.55, height: l.bract ? l.size * 0.9 : l.size * 1.2 }}
        initial={{ opacity: 0, y: 0, x: 0, rotate: rand(-40, 40) }}
        animate={{ opacity: [0, 1, 1, 0], y: l.fall, x: l.sway, rotate: l.spin, rotateX: [0, 50, -30, 60, 0], rotateY: [0, 70, -50, 40, 0] }}
        transition={{ duration: l.dur, delay: l.delay, ease: [0.25, 0.1, 0.25, 1], opacity: { duration: l.dur, delay: l.delay, times: [0, 0.08, 0.8, 1] } }}
        onAnimationComplete={() => setLeaves(ls => ls.filter(x => x.id !== l.id))}>
        <Leaf tone={l.tone} bract={l.bract} />
      </motion.div>)}
    </AnimatePresence>
  </div>;
});

export default FallingLeaves;
