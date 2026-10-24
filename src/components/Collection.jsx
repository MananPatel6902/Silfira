import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { BedDouble, MapPin, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import { areaLabel, bhkLabel, priceLabel, propertyPathKey } from '../lib/format';
import { Eyebrow, MaskLines, Reveal, useIsDesktop } from './motion';

const Card = ({ p, i, wide }) => (
  <Link to={`/properties/${propertyPathKey(p)}`} className={`group relative block shrink-0 overflow-hidden bg-[#2a020b] ${wide ? 'h-[64vh] w-[min(42vw,580px)]' : 'aspect-[4/5] w-full'}`}>
    <img src={wide ? p.image : p.imageSm} srcSet={`${p.imageSm} 720w, ${p.image} 1122w`} sizes={wide ? '46vw' : '100vw'} alt={p.title} loading="lazy" decoding="async"
      className="absolute inset-0 h-full w-full object-cover transition [transition-duration:1400ms] [transition-timing-function:cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
    {p.images[1] && <img src={p.images[1]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100 max-lg:hidden" />}
    <div className="absolute inset-0 bg-gradient-to-t from-[#1e0108]/90 via-[#1e0108]/10 to-transparent" />
    <div className="absolute left-5 top-5 flex items-center gap-2 sm:left-7 sm:top-7">
      <span className="font-serif text-sm text-[#e6cf9f]">{String(i + 1).padStart(2, '0')}</span>
      {p.featured && <span className="border border-white/30 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.2em] text-white backdrop-blur-md">Featured</span>}
    </div>
    <span className="absolute right-5 top-5 text-[9px] uppercase tracking-[.18em] text-white/45 sm:right-7 sm:top-7">Representative image</span>
    <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
      <p className="mb-2 flex items-center gap-2 text-xs text-white/70"><MapPin size={13} />{p.location}</p>
      <h3 className="font-serif text-3xl leading-tight sm:text-4xl">{p.title}</h3>
      <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/20 pt-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-[#e6cf9f]">{priceLabel(p)}</p>
          <p className="flex gap-4 text-[10px] font-semibold uppercase tracking-[.12em] text-white/65"><span className="flex items-center gap-1.5"><BedDouble size={13} />{bhkLabel(p)}</span><span className="flex items-center gap-1.5"><Ruler size={13} />{areaLabel(p)}</span></p>
        </div>
      </div>
    </div>
  </Link>
);

const Intro = ({ light }) => <div className={light ? 'text-white' : ''}>
  <Eyebrow light={light}>Our curated collection</Eyebrow>
  <h2 className={`font-serif text-5xl leading-[.95] tracking-[-.04em] sm:text-7xl ${light ? '' : 'text-[#4b0617]'}`}>
    <MaskLines lines={['Homes worth', <span className={`italic ${light ? 'text-[#f6dce1]' : 'text-[#9d3a52]'}`}>coming home to.</span>]} />
  </h2>
  <p className={`mt-7 max-w-sm text-sm leading-7 ${light ? 'text-white/60' : 'text-[#626965]'}`}>Seven residences across Gandhinagar’s most promising neighbourhoods, each personally visited and vetted by our team.</p>
  <Link to="/properties" className={`mt-8 inline-flex items-center gap-3 border-b pb-2 text-xs font-bold uppercase tracking-[.18em] ${light ? 'border-[#e6cf9f] text-[#f6dce1]' : 'border-[#4b0617] text-[#4b0617]'}`}>View all properties</Link>
</div>;

// Desktop: vertical scroll drives a horizontal gallery. Mobile: stacked cards.
export default function Collection() {
  const { properties } = useSiteData();
  const desktop = useIsDesktop();
  const ref = useRef(null);
  const track = useRef(null);
  const [distance, setDistance] = useState(0);
  useLayoutEffect(() => {
    if (!desktop) return;
    const measure = () => track.current && setDistance(track.current.scrollWidth - window.innerWidth);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [desktop]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (!desktop) return (
    <section id="featured" className="bg-[#fbf7f8] px-5 py-24 sm:px-8">
      <Intro />
      <div className="mt-12 grid gap-6 sm:grid-cols-2">{properties.map((p, i) => <Reveal key={p.id} delay={(i % 2) * 0.08}><Card p={p} i={i} /></Reveal>)}</div>
    </section>
  );

  return (
    <section id="featured" ref={ref} style={{ height: `calc(100vh + ${distance}px)` }} className="relative bg-[#4b0617]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute -left-20 -top-40 select-none font-serif text-[40rem] leading-none text-white/[.03]">S</div>
        <motion.div ref={track} style={{ x }} className="flex items-center gap-8 pl-14 pr-[10vw] will-change-transform">
          <div className="w-[30vw] max-w-[440px] shrink-0 pr-8"><Intro light /></div>
          {properties.map((p, i) => <motion.div key={p.id} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.06 }} className={i % 2 ? 'mt-24' : '-mt-10'}><Card p={p} i={i} wide /></motion.div>)}
          <Link to="/properties" className="group flex h-[50vh] w-[22vw] shrink-0 flex-col items-center justify-center gap-6 border border-white/15 text-white transition hover:bg-white/5">
            <span className="h-px w-16 bg-[#e6cf9f]/60 transition-all duration-700 group-hover:w-28" />
            <span className="font-serif text-3xl">See every home</span>
          </Link>
        </motion.div>
        <div className="absolute bottom-10 left-14 right-14 flex items-center gap-6 text-[10px] uppercase tracking-[.24em] text-white/45">
          <span>Scroll to explore</span>
          <div className="h-px flex-1 bg-white/10"><motion.div style={{ width: bar }} className="h-full bg-[#e6cf9f]" /></div>
          <span>{properties.length} residences</span>
        </div>
      </div>
    </section>
  );
}
