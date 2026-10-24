import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Mail, Phone, Quote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import PropertiesGrid from '../components/PropertiesGrid';
import PhotoBooth from '../components/PhotoBooth';
import { agents, stats, testimonials, trustedPartners } from '../mock';

const Reveal = ({ children, className = '' }) => <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .75, ease: [.2,.65,.3,1] }} className={className}>{children}</motion.div>;

export default function Home() {
  const [filters, setFilters] = useState({ location: 'All locations', bhk: 'Any BHK', budget: 'Any budget' });
  return <main className="overflow-hidden bg-[#fbf7f8]">
    <Hero filters={filters} setFilters={setFilters} />

    <section className="bg-[#f5f1ea] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
        <Reveal><p className="mb-5 text-[10px] font-bold uppercase tracking-[.28em] text-[#9d3a52]">An invitation to live well</p><h2 className="font-serif text-5xl leading-[.98] tracking-[-.04em] text-[#34131b] sm:text-7xl">Real people.<br />Real homes.<br /><span className="italic text-[#9d3a52]">Real value.</span></h2><p className="mt-8 max-w-lg text-base leading-8 text-[#71666a]">Finding a home is personal. We pair honest advice and deep local knowledge with a carefully curated portfolio—so every move feels confident, transparent and entirely yours.</p><Link to="/about" className="mt-8 inline-flex items-center gap-3 border-b border-[#4b0617] pb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#4b0617]">Our story <ArrowRight size={15} /></Link></Reveal>
        <Reveal className="relative"><div className="absolute -left-5 -top-5 h-28 w-28 border-l border-t border-[#9d3a52]/35"/><div className="aspect-[16/11] overflow-hidden"><img src="/images/editorial/gandhinagar-residence-interior.png" alt="A considered residence in Gandhinagar" loading="lazy" className="h-full w-full object-cover transition duration-1000 hover:scale-[1.025]"/></div><p className="mt-4 text-[9px] uppercase tracking-[.18em] text-[#8c7b7f]">Contemporary living · Gandhinagar</p></Reveal>
      </div>
      <div className="mx-auto mt-20 grid max-w-[1440px] grid-cols-2 border-l border-[#4b0617]/15 md:grid-cols-4">{stats.map((s) => <Reveal key={s.label} className="border-r border-t border-[#4b0617]/15 px-5 py-8 sm:px-8"><strong className="block font-serif text-4xl font-normal text-[#4b0617] sm:text-5xl">{s.value}</strong><span className="mt-2 block text-[9px] uppercase tracking-[.18em] text-[#8c7b7f]">{s.label}</span></Reveal>)}</div>
    </section>

    <PropertiesGrid limit={6} />

    <section className="relative min-h-[76vh] overflow-hidden text-white">
      <motion.img initial={{ scale: 1.06 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} src="/images/editorial/gift-city-riverfront.png" alt="GIFT City and Gandhinagar at dusk" loading="lazy" className="absolute inset-0 h-full w-full object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-r from-[#25030c]/80 via-[#25030c]/20 to-transparent"/>
      <div className="relative mx-auto flex min-h-[76vh] max-w-[1440px] items-end px-5 py-16 sm:px-8 lg:px-14 lg:py-24"><Reveal><p className="mb-5 text-[10px] font-bold uppercase tracking-[.28em] text-[#f0c5ce]">At the centre of what is next</p><h2 className="max-w-3xl font-serif text-5xl leading-[.96] tracking-[-.04em] sm:text-7xl">Gandhinagar calm.<br/><span className="italic text-[#f0c5ce]">GIFT City momentum.</span></h2><p className="mt-7 max-w-md text-sm leading-7 text-white/70">Well-connected neighbourhoods, thoughtful infrastructure and enduring potential—all within one of Gujarat's most exciting growth corridors.</p><Link to="/properties" className="mt-8 inline-flex items-center gap-3 border-b border-white/60 pb-2 text-[10px] font-bold uppercase tracking-[.18em]">Explore the collection <ArrowRight size={15}/></Link></Reveal></div>
    </section>

    <PhotoBooth />

    <section className="overflow-hidden border-y border-black/10 bg-[#f5e9ec] py-10">
      <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[.28em] text-[#7b7469]">Trusted by leading developers</p>
      <div className="marquee-track flex w-max items-center">{[...trustedPartners, ...trustedPartners].map((p, i) => <div key={`${p.name}-${i}`} className="mx-8 flex h-20 w-40 items-center justify-center sm:mx-12"><img src={p.logo} alt={p.name} loading="lazy" className="max-h-16 max-w-[140px] object-contain grayscale transition duration-300 hover:grayscale-0" /></div>)}</div>
    </section>

    <section className="bg-[#fbf7f8] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="mb-4 text-[11px] font-bold uppercase tracking-[.28em] text-[#9d3a52]">The people behind Silfira</p><h2 className="font-serif text-5xl tracking-[-.04em] text-[#4b0617] sm:text-7xl">Meet your <span className="italic text-[#9d3a52]">advisors.</span></h2></div><p className="max-w-sm text-sm leading-7 text-[#68706c]">Local expertise with one simple promise: your priorities always come first.</p></Reveal>
        <div className="grid gap-6 md:grid-cols-2">{agents.map((agent, i) => <motion.article key={agent.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .12 }} className="group relative min-h-[560px] overflow-hidden bg-[#5b1021]"><img src={agent.image} alt={agent.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#31010d] via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10"><p className="mb-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#f6dce1]">{agent.title}</p><h3 className="font-serif text-4xl">{agent.name}</h3><div className="mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:mt-6 group-hover:max-h-28 group-hover:opacity-100"><div className="flex flex-wrap gap-3"><a href={`tel:${agent.phone}`} className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs hover:bg-white hover:text-[#4b0617]"><Phone size={13}/>Call</a><a href={`mailto:${agent.email}`} className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs hover:bg-white hover:text-[#4b0617]"><Mail size={13}/>Email</a><a href="https://instagram.com/silfira_realtors" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-[#4b0617]" aria-label="Instagram"><Instagram size={14}/></a></div></div></div></motion.article>)}</div>
      </div>
    </section>

    <section className="bg-[#4b0617] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-32">
      <div className="mx-auto max-w-[1440px]"><Reveal><p className="mb-4 text-[11px] font-bold uppercase tracking-[.28em] text-[#f0c5ce]">Client stories</p><h2 className="mb-14 max-w-3xl font-serif text-5xl leading-none tracking-[-.04em] sm:text-7xl">Words from people who <span className="italic text-[#f0c5ce]">found home.</span></h2></Reveal>
        <motion.div drag="x" dragConstraints={{ left: -400, right: 0 }} className="flex cursor-grab gap-5 active:cursor-grabbing">{testimonials.map(t => <article key={t.id} className="w-[82vw] max-w-[480px] shrink-0 border border-white/15 bg-white/[.035] p-7 sm:p-10"><Quote className="mb-10 text-[#f0c5ce]" size={34}/><p className="min-h-[140px] font-serif text-2xl leading-9 text-white/90">“{t.content}”</p><div className="mt-9 flex items-end justify-between border-t border-white/15 pt-6"><div><strong className="block text-sm">{t.name}</strong><span className="text-xs text-white/45">{t.role}</span></div><div className="flex text-[#f0c5ce]">{Array.from({length:t.rating}).map((_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div></div></article>)}</motion.div>
      </div>
    </section>

    <section className="relative overflow-hidden bg-[#8d2942] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-28"><div className="absolute -right-24 -top-56 font-serif text-[34rem] leading-none text-white/[.06]">S</div><Reveal className="relative mx-auto max-w-[1100px] text-center"><p className="mb-5 text-[11px] font-bold uppercase tracking-[.28em]">Begin your search</p><h2 className="font-serif text-5xl leading-none tracking-[-.04em] sm:text-7xl">The right space changes <span className="italic">everything.</span></h2><Link to="/contact" className="mt-10 inline-flex items-center gap-3 bg-[#4b0617] px-8 py-5 text-xs font-bold uppercase tracking-[.18em] transition hover:-translate-y-1">Talk to an advisor <ArrowRight size={15}/></Link></Reveal></section>
  </main>;
}
