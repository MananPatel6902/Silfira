import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import { EASE, Eyebrow, MaskLines } from './motion';

const MAP_URL = 'https://maps.google.com/maps?q=23.172,72.651&z=13&output=embed';
// Pin positions are aligned to the visible Google Maps bounds for south Gandhinagar.
const areas = [
  { key: 'Sargasan', x: 20, y: 28, img: 'locality-sargasan', note: 'Wide boulevards, schools and the city’s most sought-after new launches.' },
  { key: 'Kudasan', x: 31, y: 47, img: 'locality-kudasan', note: 'Cafés, retail and the 45-M Iconic Road, minutes from GIFT City.' },
  { key: 'Raysan', x: 58, y: 58, img: 'locality-raysan', note: 'Calm, green and close to the Sabarmati riverfront.' },
  { key: 'GIFT City', x: 84, y: 68, img: 'locality-pdeu-palm-road', note: 'India’s landmark business district, with premium homes and modern infrastructure close by.' },
];
export default function Neighbourhoods() {
  const { properties } = useSiteData();
  const count = key => properties.filter(p => p.location.toLowerCase().includes(key.toLowerCase())).length;
  const [active, setActive] = useState(areas[0]);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const aerialScale = useTransform(scrollYProgress, [0, 0.5], [1.25, 1]);
  const mapY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#2a020b] text-white">
      <motion.img style={{ scale: aerialScale }} src="/images/v3/n01-avenue.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a020b] via-[#2a020b]/70 to-[#2a020b]" />
      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-14 lg:py-36">
        <div>
          <Eyebrow light>Neighbourhoods</Eyebrow>
          <h2 className="font-serif text-5xl leading-[.95] tracking-[-.04em] sm:text-7xl"><MaskLines lines={['Know the city', <span className="italic text-[#f6dce1]">before you move.</span>]} /></h2>
          <div className="mt-10 border-t border-white/15">
            {areas.map(a => <button key={a.key} onMouseEnter={() => setActive(a)} onFocus={() => setActive(a)} onClick={() => setActive(a)}
              className={`group flex w-full items-center justify-between border-b border-white/15 py-5 text-left transition ${active.key === a.key ? 'text-white' : 'text-white/45 hover:text-white/80'}`}>
              <span className="flex items-baseline gap-4"><span className={`h-2 w-2 rounded-full transition ${active.key === a.key ? 'bg-[#e6cf9f]' : 'bg-white/20'}`} /><span className="font-serif text-2xl sm:text-3xl">{a.label || a.key}</span></span>
              <span className="text-[10px] uppercase tracking-[.2em]">{count(a.key) ? `${count(a.key)} ${count(a.key) === 1 ? 'home' : 'homes'}` : 'Explore'}</span>
            </button>)}
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={active.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="mt-6 max-w-sm text-sm leading-7 text-white/60">{active.note}</motion.p>
          </AnimatePresence>
          <Link to={`/properties?location=${active.key}`} className="mt-6 inline-flex items-center gap-3 border-b border-[#e6cf9f] pb-2 text-xs font-bold uppercase tracking-[.18em] text-[#f6dce1]">Homes in {active.label || active.key}</Link>
        </div>

        <motion.div style={{ y: mapY }} className="relative [perspective:1400px]">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e3dc] shadow-[0_60px_120px_rgba(0,0,0,.5)] [transform:rotateX(8deg)]">
            <iframe
              src={MAP_URL}
              title="Map of Sargasan, Kudasan, Raysan and GIFT City in Gandhinagar"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="pointer-events-none absolute inset-0 h-full w-full border-0"
              style={{ filter: 'invert(.9) hue-rotate(180deg) grayscale(.3) saturate(.75) brightness(.68) contrast(1.2)' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[#4b0617]/30" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#f0c5ce]/15" />
            {areas.map((a, i) => <div key={a.key} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${a.x}%`, top: `${a.y}%` }}><motion.button aria-label={a.key} onClick={() => setActive(a)} onMouseEnter={() => setActive(a)}
              initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE, delay: 0.3 + i * 0.12 }}>
              <span className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] transition ${active.key === a.key ? 'bg-[#f6dce1] text-[#4b0617]' : 'bg-[#1e0108]/70 text-white backdrop-blur'}`}>
                {a.label || a.key}
              </span>
              <span className="mx-auto block h-4 w-px bg-[#f6dce1]" />
            </motion.button></div>)}
          </div>
          <AnimatePresence mode="wait">
            <motion.figure key={active.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.7, ease: EASE }}
              className="absolute -bottom-10 -left-4 w-40 border-4 border-[#fbf7f8] shadow-2xl sm:w-56 lg:-left-16">
              <img src={`/images/v3/${active.img}-sm.webp`} alt={`${active.key} street scene (representative)`} className="aspect-square w-full object-cover" />
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
