import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const S = '/images/v2/story/';

const chapters = [
  { n: '01', k: 'Location', t: 'Chosen street by street.', d: 'We know Sargasan, Kudasan, Raysan and Palm Road block by block, so every shortlist starts with the right address.' },
  { n: '02', k: 'Lifestyle', t: 'Designed around your day.', d: 'Light, layout, greenery and amenities: we look at how a home will feel at 7am and at 7pm, not just on paper.' },
  { n: '03', k: 'Legacy', t: 'Built to hold its value.', d: 'Trusted developers, clear documentation and honest pricing, so the home you choose today still feels right years from now.' },
];

// Pinned chapter: a blueprint draws itself, becomes a building, and the day turns to blue hour.
export default function StreetToSky() {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const lineClip = useTransform(p, [0, 0.28], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']);
  const lineOpacity = useTransform(p, [0.3, 0.45], [1, 0]);
  const dayOpacity = useTransform(p, [0.3, 0.45], [0, 1]);
  const duskOpacity = useTransform(p, [0.62, 0.8], [0, 1]);
  const skyDayOpacity = useTransform(p, [0.18, 0.4], [0, 1]);
  const skyNightOpacity = useTransform(p, [0.6, 0.82], [0, 1]);
  const dayVeil = useTransform(p, [0.18, 0.4, 0.6, 0.82], [0, 1, 1, 0]);
  const gridOpacity = useTransform(p, [0, 0.35, 0.5], [0.5, 0.5, 0]);
  const progress = useTransform(p, [0, 1], ['0%', '100%']);
  const sceneZoom = useTransform(p, [0.5, 0.88], [1, 1.07]);
  const glow = useTransform(p, [0.65, 0.9], [0, 0.9]);

  const c = [
    { o: useTransform(p, [0, 0.05, 0.28, 0.34], [0, 1, 1, 0]), y: useTransform(p, [0, 0.05, 0.28, 0.34], [40, 0, 0, -40]) },
    { o: useTransform(p, [0.34, 0.4, 0.64, 0.7], [0, 1, 1, 0]), y: useTransform(p, [0.34, 0.4, 0.64, 0.7], [40, 0, 0, -40]) },
    { o: useTransform(p, [0.72, 0.78, 1], [0, 1, 1]), y: useTransform(p, [0.72, 0.78], [40, 0]) },
  ];
  const dark = useTransform(p, [0.3, 0.45, 0.62, 0.8], ['#4b0617', '#4b0617', '#4b0617', '#f6dce1']);

  return (
    <section ref={ref} className="relative h-[340vh] bg-[#f5efe9]" aria-label="From street to sky">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Scene layer: a slow push-in as day turns to night. Scaled from the bottom edge, so the ground never lifts. */}
        <motion.div style={{ scale: sceneZoom, transformOrigin: '50% 100%' }} className="absolute inset-0 transform-gpu">
        {/* Skies: paper → late afternoon → blue hour */}
        <div className="absolute inset-0 bg-[#f5efe9]" style={{ backgroundImage: 'url(/images/v2/ui/paper-ivory.webp)', backgroundSize: '600px' }} />
        <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0 [background-image:linear-gradient(rgba(75,6,23,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(75,6,23,.07)_1px,transparent_1px)] [background-size:64px_64px]" />
        <motion.picture style={{ opacity: skyDayOpacity }} className="absolute inset-0">
          <source media="(max-width: 767px)" srcSet={`/images/v3/story-sky-day-mobile.webp`} />
          <img src={`/images/v3/story-sky-day.webp`} alt="" loading="lazy" className="h-full w-full object-cover" />
        </motion.picture>
        <motion.picture style={{ opacity: skyNightOpacity }} className="absolute inset-0">
          <source media="(max-width: 767px)" srcSet={`/images/v3/story-sky-bluehour-mobile.webp`} />
          <img src={`/images/v3/story-sky-bluehour.webp`} alt="" loading="lazy" className="h-full w-full object-cover" />
        </motion.picture>

        {/* Legibility veils for the copy column */}
        <motion.div style={{ opacity: dayVeil }} className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,247,248,.85)_0%,rgba(251,247,248,.55)_35%,transparent_60%)] max-lg:bg-[linear-gradient(180deg,rgba(251,247,248,.85)_0%,rgba(251,247,248,.4)_35%,transparent_55%)]" />
        <motion.div style={{ opacity: skyNightOpacity }} className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,30,.6)_0%,transparent_60%)] max-lg:bg-[linear-gradient(180deg,rgba(12,10,30,.6)_0%,transparent_50%)]" />

        {/* Tower: line art → day → dusk */}
        <div className="absolute inset-x-0 -bottom-[3%] flex justify-center sm:justify-end sm:pr-[4%] lg:pr-[7%]">
        <div className="relative h-[50svh] sm:h-[56svh] lg:h-[84svh]">
          <motion.div style={{ opacity: glow }} className="absolute inset-x-[10%] bottom-0 top-[20%] rounded-full bg-[#e6a95f]/40 blur-[90px]" />
          <motion.img style={{ clipPath: lineClip, opacity: lineOpacity }} src={`${S}story-tower-lineart.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-auto max-w-none" />
          <motion.img style={{ opacity: dayOpacity }} src={`/images/v3/story-tower-day.webp`} alt="Residential tower in daylight" loading="lazy" className="relative h-full w-auto max-w-none" />
          <motion.img style={{ opacity: duskOpacity }} src={`/images/v3/story-tower-dusk.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-auto max-w-none" />
          <motion.img style={{ opacity: dayOpacity }} src="/images/v3/story-podium-garden.webp" alt="" loading="lazy" className="absolute -bottom-[2%] left-1/2 w-[150%] max-w-none -translate-x-1/2" />
        </div>
        </div>

        </motion.div>

        {/* Chapter copy */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-start px-5 pt-28 sm:px-8 lg:items-center lg:px-14 lg:pt-0">
          <div className="relative w-full max-w-lg sm:max-w-[40%] lg:max-w-[min(32rem,40%)]">
            <motion.p style={{ color: dark }} className="mb-8 text-[11px] font-bold uppercase tracking-[.28em]">From street to sky</motion.p>
            <div className="relative min-h-[170px] sm:min-h-[300px]">
              {chapters.map((ch, i) => <motion.div key={ch.k} style={{ opacity: c[i].o, y: c[i].y }} className="absolute inset-0">
                <div className="mb-4 flex items-baseline gap-4"><span className="font-serif text-lg text-[#c9a46a]">{ch.n}</span><span className={`text-[11px] font-bold uppercase tracking-[.24em] ${i === 2 ? 'text-[#f6dce1]' : 'text-[#9d3a52]'}`}>{ch.k}</span></div>
                <h2 className={`font-serif text-[clamp(2.5rem,5.4vw,5rem)] leading-[.95] tracking-[-.04em] ${i === 2 ? 'text-white' : 'text-[#4b0617]'}`}>{ch.t}</h2>
                <p className={`mt-6 max-w-sm text-sm leading-7 sm:text-base ${i === 2 ? 'text-white/70' : 'text-[#5f5458]'} max-sm:hidden`}>{ch.d}</p>
              </motion.div>)}
            </div>
            <div className="mt-6 hidden h-px w-56 bg-[#4b0617]/15 sm:block"><motion.div style={{ width: progress }} className="h-full bg-[#c9a46a]" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
