import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MapPin, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import { areaLabel, bhkLabel, priceLabel, propertyPathKey } from '../lib/format';
import { EASE, Eyebrow, MaskLines } from './motion';

const LOCATIONS = ['All', 'Sargasan', 'Kudasan', 'Raysan', 'PDEU'];
const BUDGETS = ['All', 'Under ₹75L', '₹75L to ₹1Cr', 'Above ₹1Cr'];

const Filter = ({ label, value, onChange, options }) => (
  <label className="relative flex min-w-0 flex-1 flex-col border-[#4b0617]/10 px-5 py-3.5 sm:border-r sm:last-of-type:border-r-0">
    <span className="text-[9px] font-bold uppercase tracking-[.22em] text-[#9d3a52]">{label}</span>
    <select value={value} onChange={e => onChange(e.target.value)} className="mt-1 w-full cursor-pointer appearance-none bg-transparent pr-6 text-base sm:text-sm text-[#4b0617] outline-none">
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
    <ChevronDown size={14} className="pointer-events-none absolute bottom-4 right-5 text-[#4b0617]/50" />
  </label>
);

const Card = ({ p, index }) => (
  <motion.article layout initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.06 }} className="h-full">
    <Link to={`/properties/${propertyPathKey(p)}`} className="group flex h-full flex-col bg-white shadow-[0_1px_0_rgba(75,6,23,.06)] transition duration-500 hover:shadow-[0_24px_60px_-24px_rgba(75,6,23,.35)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#efe6e8]">
        <img src={p.image} srcSet={`${p.imageSm} 720w, ${p.image} 1122w`} sizes="(min-width:1024px) 31vw, (min-width:640px) 48vw, 100vw" alt={p.title} loading="lazy" decoding="async"
          className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.04]" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          {p.featured ? <span className="bg-white/90 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[.2em] text-[#4b0617] backdrop-blur">Featured</span> : <span />}
          <span className="bg-black/25 px-2 py-1 text-[8px] uppercase tracking-[.16em] text-white/80 backdrop-blur">Representative image</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-xs text-[#7a6f72]"><MapPin size={13} className="shrink-0" /><span className="truncate">{p.location}</span></p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="font-serif text-[1.65rem] leading-tight text-[#4b0617]">{p.title}</h3>
        </div>
        <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-[#4b0617]/10 pt-5 [&>div]:min-w-0">
          <div><dt className="text-[9px] font-bold uppercase tracking-[.18em] text-[#9d8f93]">{p.priceMin && p.priceMin !== p.priceMax ? 'From' : 'Price'}</dt><dd className="mt-1 truncate text-sm font-medium text-[#4b0617]">{priceLabel(p).split(' to ')[0]}</dd></div>
          <div><dt className="text-[9px] font-bold uppercase tracking-[.18em] text-[#9d8f93]">Homes</dt><dd className="mt-1 truncate text-sm font-medium text-[#4b0617]">{bhkLabel(p)}</dd></div>
          <div><dt className="text-[9px] font-bold uppercase tracking-[.18em] text-[#9d8f93]">Area</dt><dd className="mt-1 truncate text-sm font-medium text-[#4b0617]">{areaLabel(p)}</dd></div>
        </dl>
      </div>
    </Link>
  </motion.article>
);

export default function PropertiesGrid({ limit, initialFilters }) {
  const { properties } = useSiteData();
  const [location, setLocation] = useState(initialFilters?.location || 'All');
  const [bhk, setBhk] = useState(initialFilters?.bhk || 'All');
  const [budget, setBudget] = useState(initialFilters?.budget || 'All');
  const [visible, setVisible] = useState(limit || 9);

  const results = useMemo(() => properties.filter(p => {
    const bedrooms = [p.bedrooms, p.bedroomsMin, p.bedroomsMax].filter(Boolean);
    const matchLocation = location === 'All' || p.location.toLowerCase().includes(location.toLowerCase());
    const matchBhk = bhk === 'All' || bedrooms.includes(Number(bhk));
    const matchBudget = budget === 'All' || (budget === 'Under ₹75L' ? p.price < 7500000 : budget === '₹75L to ₹1Cr' ? p.price >= 7500000 && p.price <= 10000000 : p.price > 10000000);
    return matchLocation && matchBhk && matchBudget;
  }), [properties, location, bhk, budget]);
  const filtered = location !== 'All' || bhk !== 'All' || budget !== 'All';

  return (
    <section id="featured" className="bg-[#fbf7f8] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><Eyebrow>Our curated collection</Eyebrow><h2 className="max-w-3xl font-serif text-5xl leading-[.98] tracking-[-.035em] text-[#4b0617] sm:text-6xl"><MaskLines lines={['Homes worth', <span className="italic text-[#9d3a52]">coming home to.</span>]} /></h2></div>
          <p className="max-w-sm text-sm leading-7 text-[#6b6064]">Thoughtfully selected residences across Gandhinagar’s most promising neighbourhoods.</p>
        </div>

        <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-stretch">
          <div className="flex flex-1 flex-col border border-[#4b0617]/10 bg-white sm:flex-row">
            <span className="hidden items-center border-r border-[#4b0617]/10 px-5 text-[#9d3a52] sm:flex"><SlidersHorizontal size={16} /></span>
            <Filter label="Location" value={location} onChange={setLocation} options={LOCATIONS.map(l => [l, l === 'All' ? 'All locations' : l === 'PDEU' ? 'PDEU · Palm Road' : l])} />
            <Filter label="Configuration" value={bhk} onChange={setBhk} options={[['All', 'Any BHK'], ['2', '2 BHK'], ['3', '3 BHK'], ['4', '4 BHK']]} />
            <Filter label="Budget" value={budget} onChange={setBudget} options={BUDGETS.map(b => [b, b === 'All' ? 'Any budget' : b])} />
          </div>
          <div className="flex items-center justify-between gap-6 px-1 lg:min-w-[220px] lg:justify-end">
            <span className="text-xs text-[#6b6064]"><strong className="font-serif text-2xl font-normal text-[#4b0617]">{results.length}</strong> residences</span>
            {filtered && <button onClick={() => { setLocation('All'); setBhk('All'); setBudget('All'); }} className="border-b border-[#4b0617]/30 pb-0.5 text-[11px] font-semibold uppercase tracking-[.14em] text-[#4b0617] hover:border-[#4b0617]">Reset</button>}
          </div>
        </div>

        <motion.div layout className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout">{results.slice(0, visible).map((p, i) => <Card key={p.id} p={p} index={i} />)}</AnimatePresence>
        </motion.div>
        {!results.length && <div className="border border-dashed border-[#4b0617]/20 py-20 text-center text-[#6b6064]">No homes match these filters. Try a broader search.</div>}
        {visible < results.length && <div className="mt-14 text-center"><button onClick={() => setVisible(v => v + 3)} className="border-b border-[#4b0617] pb-2 text-xs font-bold uppercase tracking-[.18em] text-[#4b0617]">Show more properties</button></div>}
      </div>
    </section>
  );
}
