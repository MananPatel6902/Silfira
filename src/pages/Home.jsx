import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Mail, Phone, Quote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import StreetToSky from '../components/StreetToSky';
import Collection from '../components/Collection';
import Lifestyle from '../components/Lifestyle';
import Neighbourhoods from '../components/Neighbourhoods';
import ClosingScene from '../components/ClosingScene';
import { ArchReveal, CountUp, Eyebrow, MaskLines, Reveal } from '../components/motion';
import { stats } from '../mock';
import { useSiteData } from '../context/SiteDataContext';

function Intro() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const photoY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);
  return (
    <section ref={ref} className="relative overflow-hidden bg-[#4b0617] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-36">
      <motion.img style={{ y }} src="/images/v2/brand/silfira-monogram-ivory.png" alt="" loading="lazy" className="pointer-events-none absolute -right-16 top-10 w-[46vw] max-w-[440px] opacity-[.04] lg:right-10" />
      <div className="relative mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <Eyebrow light>Silfira Realtors</Eyebrow>
          <h2 className="font-serif text-5xl leading-[.95] tracking-[-.04em] sm:text-7xl lg:text-8xl"><MaskLines lines={['Real people.', 'Real homes.', <span className="italic text-[#f0c5ce]">Real value.</span>]} /></h2>
          <Reveal delay={0.2}><p className="mt-10 max-w-xl text-base leading-8 text-white/65">Finding a home is personal. We pair honest advice and deep local knowledge with a carefully curated portfolio, so every move feels confident, transparent and entirely yours.</p></Reveal>
          <Reveal delay={0.3}><Link to="/about" className="mt-8 inline-flex items-center gap-3 border-b border-[#e6cf9f] pb-2 text-xs font-bold uppercase tracking-[.18em] text-[#f6dce1]">Our story</Link></Reveal>
        </div>
        {/* Real photo from a client site visit */}
        <motion.figure style={{ y: photoY }} className="relative mx-auto w-full max-w-[400px]">
          <ArchReveal className="aspect-[9/14]"><img src="/images/v2/about/about-site-visit.webp" alt="A Silfira advisor walking a client through a project model" loading="lazy" className="h-full w-full object-cover" /></ArchReveal>
          <figcaption className="mt-4 text-[10px] uppercase tracking-[.22em] text-white/50">On a site visit with a client</figcaption>
          <div className="absolute -left-8 top-1/3 hidden h-40 w-40 rounded-full border border-[#e6cf9f]/30 lg:block" />
        </motion.figure>
      </div>
      <div className="relative mx-auto mt-20 grid max-w-[1440px] grid-cols-2 border-l border-white/15 md:grid-cols-4">
        {stats.map((s, i) => <Reveal key={s.label} delay={i * 0.08} className="border-r border-t border-white/15 px-5 py-8 sm:px-8">
          <CountUp value={s.value} className="block font-serif text-4xl text-[#f6dce1] sm:text-6xl" />
          <span className="mt-2 block text-[10px] uppercase tracking-[.18em] text-white/45">{s.label}</span>
        </Reveal>)}
      </div>
    </section>
  );
}

function Partners({ trustedPartners }) {
  const half = Math.ceil(trustedPartners.length / 2);
  const row = (list, reverse) => <div className={`flex w-max items-center ${reverse ? 'marquee-track-reverse' : 'marquee-track'}`}>
    {[...list, ...list].map((p, i) => <div key={`${p.name}-${i}`} className="mx-6 flex h-20 w-36 items-center justify-center sm:mx-10">
      <img src={p.logo} alt={p.name} loading="lazy" className="max-h-14 max-w-[130px] object-contain opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0" />
    </div>)}
  </div>;
  return (
    <section className="overflow-hidden border-y border-black/5 bg-[#fbf7f8] py-16">
      <Reveal className="mb-10 text-center"><p className="text-[10px] font-bold uppercase tracking-[.3em] text-[#9d3a52]">Trusted by Gandhinagar’s leading developers</p></Reveal>
      <div className="space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">{row(trustedPartners.slice(0, half))}{row(trustedPartners.slice(half), true)}</div>
    </section>
  );
}

function Advisors({ agents }) {
  return (
    <section className="bg-[#fbf7f8] px-5 pb-24 pt-8 sm:px-8 lg:px-14 lg:pb-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><Eyebrow>The people behind Silfira</Eyebrow><h2 className="font-serif text-5xl tracking-[-.04em] text-[#4b0617] sm:text-7xl"><MaskLines lines={[<span>Meet your <span className="italic text-[#9d3a52]">advisors.</span></span>]} /></h2></div>
          <Reveal><p className="max-w-sm text-sm leading-7 text-[#68706c]">Local expertise with one simple promise: your priorities always come first.</p></Reveal>
        </div>
        <div className="mx-auto grid max-w-[1080px] gap-10 md:grid-cols-2 lg:gap-14">
          {agents.map((a, i) => <Reveal key={a.id} delay={i * 0.12} className={`mx-auto w-[90%] max-w-[500px] ${i ? 'md:mt-20' : ''}`}>
            <article className="group">
              <ArchReveal className="aspect-[5/6]">
                <img src={a.image} alt={`${a.name}, ${a.title}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition [transition-duration:1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e0108]/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#e6cf9f]">{a.title}</p>
                  <h3 className="font-serif text-4xl sm:text-5xl">{a.name}</h3>
                  <div className="mt-6 flex flex-wrap gap-3 lg:translate-y-4 lg:opacity-0 lg:transition lg:duration-500 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    <a href={`tel:${a.phone}`} className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs backdrop-blur-md hover:bg-white hover:text-[#4b0617]"><Phone size={13} />Call</a>
                    <a href={`mailto:${a.email}`} className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs backdrop-blur-md hover:bg-white hover:text-[#4b0617]"><Mail size={13} />Email</a>
                    <a href="https://instagram.com/silfira_realtors" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-[#4b0617]" aria-label="Instagram"><Instagram size={14} /></a>
                  </div>
                </div>
              </ArchReveal>
            </article>
          </Reveal>)}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ testimonials }) {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  if (!t) return null;
  return (
    <section className="relative overflow-hidden bg-[#4b0617] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-36">
      <img src="/images/v2/brand/silfira-monogram-ivory.png" alt="" loading="lazy" className="pointer-events-none absolute -left-20 bottom-10 w-[320px] opacity-[.04]" />
      <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <div><Eyebrow light>Client stories</Eyebrow><h2 className="font-serif text-5xl leading-none tracking-[-.04em] sm:text-6xl"><MaskLines lines={['Words from people', <span>who <span className="italic text-[#f0c5ce]">found home.</span></span>]} /></h2></div>
        <div>
          <Quote className="mb-8 text-[#e6cf9f]" size={40} />
          <div className="min-h-[220px] sm:min-h-[200px]">
            <motion.blockquote key={t.id} initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.8 }} className="font-serif text-3xl leading-[1.25] text-white/90 sm:text-4xl lg:text-5xl">“{t.content}”</motion.blockquote>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-6">
            <div><strong className="block text-sm">{t.name}</strong><span className="text-xs text-white/45">{t.role}</span><div className="mt-2 flex text-[#e6cf9f]">{Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={12} fill="currentColor" />)}</div></div>
            <div className="flex items-center gap-3">
              {testimonials.map((x, k) => <button key={x.id} onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} className={`h-px transition-all duration-500 ${k === i ? 'w-14 bg-[#e6cf9f]' : 'w-6 bg-white/30 hover:bg-white/60'}`} style={{ height: 2 }} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [filters, setFilters] = useState({ location: 'All locations', bhk: 'Any BHK', budget: 'Any budget' });
  const { profiles, testimonials, developers } = useSiteData();
  return <main className="bg-[#fbf7f8]">
    <Hero filters={filters} setFilters={setFilters} />
    <Intro />
    <StreetToSky />
    <Collection />
    <Lifestyle />
    <Neighbourhoods />
    <Partners trustedPartners={developers} />
    <Advisors agents={profiles} />
    <Testimonials testimonials={testimonials} />
    <ClosingScene />
  </main>;
}
