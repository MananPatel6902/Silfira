import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const locations = ['All locations', 'Sargasan', 'Kudasan', 'Raysan', 'PDEU'];

export default function Hero({ filters, setFilters }) {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '42%']);

  const search = () => {
    const query = new URLSearchParams();
    if (filters.location !== 'All locations') query.set('location', filters.location);
    if (filters.bhk !== 'Any BHK') query.set('bhk', filters.bhk.replace(' BHK', ''));
    navigate(`/properties?${query.toString()}`);
  };

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] overflow-hidden bg-[#3b0310] text-white">
      <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[10%] h-[120%]">
        <img src="/images/editorial/gift-city-residence-hero.png" alt="Contemporary luxury residence overlooking GIFT City" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,18,19,.92)_0%,rgba(7,18,19,.55)_48%,rgba(7,18,19,.2)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,18,19,.78),transparent_45%)]" />
      <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full border border-[#d9bf8c]/25" />
      <div className="absolute -right-8 top-1/3 h-48 w-48 rounded-full border border-[#d9bf8c]/15" />

      <motion.div style={{ y: copyY }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-12 pt-36 sm:px-8 sm:pb-28 lg:px-14 lg:pb-32">
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.28em] text-[#f6dce1]">
          <span className="h-px w-10 bg-[#f6dce1]" /> Gandhinagar · GIFT City
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .1 }} className="max-w-5xl font-serif text-[clamp(3.8rem,9.6vw,9rem)] font-normal leading-[.82] tracking-[-.055em]">
          Discover your<br /><span className="italic text-[#f6dce1]">dream space.</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7 }} className="mt-9 flex max-w-2xl items-end justify-between gap-8">
          <p className="max-w-md text-sm leading-7 text-white/65 sm:text-base">Considered homes. Clear advice. A personal real estate experience built around how you want to live.</p>
          <a href="#featured" className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/25 transition hover:border-[#f6dce1] hover:bg-[#f6dce1] hover:text-[#4b0617] sm:flex" aria-label="Explore properties"><ArrowDownRight /></a>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85 }} className="relative z-20 mx-auto max-w-[1440px] px-0 sm:absolute sm:bottom-0 sm:left-0 sm:right-0 lg:px-14">
        <div className="grid bg-white/95 text-[#4b0617] shadow-2xl backdrop-blur-xl sm:grid-cols-[1.2fr_1fr_1fr_auto]">
          <label className="border-b border-black/10 px-5 py-4 sm:border-b-0 sm:border-r sm:px-7">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.2em] text-[#7c807c]">Where</span>
            <span className="flex items-center gap-2"><MapPin size={16} className="text-[#9d3a52]" /><select value={filters.location} onChange={e => setFilters({ ...filters, location: e.target.value })} className="w-full bg-transparent text-sm outline-none">{locations.map(x => <option key={x}>{x}</option>)}</select></span>
          </label>
          <label className="border-b border-black/10 px-5 py-4 sm:border-b-0 sm:border-r sm:px-7">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.2em] text-[#7c807c]">Configuration</span>
            <select value={filters.bhk} onChange={e => setFilters({ ...filters, bhk: e.target.value })} className="w-full bg-transparent text-sm outline-none">{['Any BHK', '2 BHK', '3 BHK', '4 BHK'].map(x => <option key={x}>{x}</option>)}</select>
          </label>
          <label className="px-5 py-4 sm:border-r sm:px-7">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.2em] text-[#7c807c]">Budget</span>
            <select value={filters.budget} onChange={e => setFilters({ ...filters, budget: e.target.value })} className="w-full bg-transparent text-sm outline-none">{['Any budget', 'Under ₹75L', '₹75L – ₹1Cr', 'Above ₹1Cr'].map(x => <option key={x}>{x}</option>)}</select>
          </label>
          <button onClick={search} className="group flex min-h-[74px] items-center justify-center gap-3 bg-[#9d3a52] px-8 text-xs font-bold uppercase tracking-[.18em] text-white transition hover:bg-[#7e263b]"><Search size={18} /> Search</button>
        </div>
      </motion.div>
    </section>
  );
}
