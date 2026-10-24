import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArchReveal, Eyebrow, MaskLines, ParallaxImage, Reveal, useIsDesktop } from './motion';

const L = '/images/v2/lifestyle/';
const moments = [
  { src: `${L}life-balcony.webp`, time: '7:10 pm', label: 'Tea on the balcony' },
  { src: `${L}life-living.webp`, time: '10:30 am', label: 'Morning light, slow Sundays' },
  { src: `${L}life-pool.webp`, time: '6:45 pm', label: 'The rooftop at dusk' },
  { src: `${L}life-garden.webp`, time: '8:00 pm', label: 'A walk through the garden' },
];

const Moment = ({ m, delay }) => <figure>
  <ArchReveal delay={delay} className="aspect-[4/5]"><ParallaxImage src={m.src} alt={m.label} amount={10} className="h-full w-full" /></ArchReveal>
  <figcaption className="mt-4 flex flex-col gap-1 border-t border-[#4b0617]/15 pt-3 sm:flex-row sm:items-baseline sm:justify-between"><span className="font-serif text-base leading-snug text-[#4b0617] sm:text-lg">{m.label}</span><span className="text-[10px] uppercase tracking-[.2em] text-[#9d3a52]">{m.time}</span></figcaption>
</figure>;

// Two columns of arch-framed moments drifting at different speeds beside a pinned headline.
export default function Lifestyle() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const desktop = useIsDesktop();
  const colA = useTransform(scrollYProgress, [0, 1], desktop ? ['8%', '-8%'] : ['3%', '-3%']);
  const colB = useTransform(scrollYProgress, [0, 1], desktop ? ['14%', '-14%'] : ['6%', '-6%']);
  const band = useRef(null);
  const { scrollYProgress: bp } = useScroll({ target: band, offset: ['start end', 'end start'] });
  const bandScale = useTransform(bp, [0, 0.5, 1], [1.12, 1, 1.04]);

  return <>
    <section ref={ref} className="relative overflow-hidden bg-[#fbf7f8] px-5 py-24 sm:px-8 lg:px-14 lg:py-40" style={{ backgroundImage: 'url(/images/v2/ui/paper-ivory.webp)', backgroundSize: '600px' }}>
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Life, beautifully placed</Eyebrow>
          <h2 className="font-serif text-5xl leading-[.95] tracking-[-.04em] text-[#4b0617] sm:text-7xl"><MaskLines lines={['A home is', 'the hours you', <span className="italic text-[#9d3a52]">spend in it.</span>]} /></h2>
          <Reveal delay={0.2}><p className="mt-8 max-w-md text-sm leading-7 text-[#5f5458] sm:text-base sm:leading-8">We look past floor plans and price sheets to the life a home makes possible: morning light, a quiet balcony, a garden to walk through after dinner. Then we find you the one that fits.</p></Reveal>
          <Reveal delay={0.3} className="mt-10 hidden grid-cols-3 gap-px bg-[#4b0617]/10 lg:grid">
            {['Light', 'Air', 'Green'].map((w, i) => <div key={w} className="bg-[#fbf7f8] py-6 text-center"><span className="block font-serif text-3xl text-[#4b0617]">{w}</span><span className="text-[9px] uppercase tracking-[.22em] text-[#9d3a52]">0{i + 1}</span></div>)}
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-8">
          <motion.div style={{ y: colA }} className="space-y-10 sm:space-y-16">{[moments[0], moments[2]].map((m, i) => <Moment key={m.label} m={m} delay={i * 0.1} />)}</motion.div>
          <motion.div style={{ y: colB }} className="mt-16 space-y-10 sm:mt-24 sm:space-y-16">{[moments[1], moments[3]].map((m, i) => <Moment key={m.label} m={m} delay={0.15 + i * 0.1} />)}</motion.div>
        </div>
      </div>
    </section>

    {/* Brand line: a calm, centred statement over the water court */}
    <section ref={band} className="relative overflow-hidden bg-[#1e0108]">
      <motion.div style={{ scale: bandScale }} className="absolute inset-0">
        <ParallaxImage src="/images/v3/water-court.webp" srcSet="/images/v3/water-court-mobile.webp 941w, /images/v3/water-court.webp 1672w" sizes="(max-width: 767px) 941px, 100vw" alt="" amount={8} className="absolute inset-0" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,1,8,.35)_0%,rgba(30,1,8,.72)_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fbf7f8]/0 via-transparent to-[#2a020b]/60" />
      <div className="relative mx-auto flex min-h-[78svh] max-w-[1100px] flex-col items-center justify-center px-5 py-28 text-center text-white lg:min-h-[92svh]">
        <Reveal><img src="/images/v2/brand/silfira-monogram-ivory.png" alt="" className="mx-auto h-14 w-auto opacity-90" /></Reveal>
        <Reveal delay={0.1}><span className="mx-auto mt-8 block h-px w-16 bg-[#e6cf9f]/70" /></Reveal>
        <h2 className="mt-8 font-serif text-[clamp(2.8rem,7vw,6.4rem)] font-normal leading-[.98] tracking-[-.035em] [text-shadow:0_2px_30px_rgba(20,0,6,.35)]">
          <MaskLines lines={['Where spaces', <span className="italic text-[#f6dce1]">become homes.</span>]} />
        </h2>
        <Reveal delay={0.3}><p className="mx-auto mt-8 max-w-md text-sm leading-7 text-white/75 sm:text-base">Every recommendation we make starts with one question: will this place feel like home?</p></Reveal>
        <Reveal delay={0.4}><p className="mt-10 text-[10px] uppercase tracking-[.32em] text-white/55">Silfira Realtors · Gandhinagar</p></Reveal>
      </div>
    </section>
  </>;
}
