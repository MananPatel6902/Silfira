import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, BedDouble, MapPin, MoveUpRight, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import { properties } from '../mock';

const priceLabel = p => {
  const min = p.priceMin || p.price;
  const max = p.priceMax || p.price;
  const f = n => n >= 10000000 ? `₹${(n / 10000000).toFixed(2).replace(/\.00$/, '')} Cr` : `₹${(n / 100000).toFixed(1).replace(/\.0$/, '')} L`;
  return min === max ? f(min) : `${f(min)} – ${f(max)}`;
};

export default function PropertiesGrid({ limit, initialFilters }) {
  const [location, setLocation] = useState(initialFilters?.location || 'All');
  const [bhk, setBhk] = useState(initialFilters?.bhk || 'All');
  const [budget, setBudget] = useState(initialFilters?.budget || 'All');
  const [visible, setVisible] = useState(limit || 6);

  const results = useMemo(() => properties.filter(p => {
    const bedrooms = [p.bedrooms, p.bedroomsMin, p.bedroomsMax].filter(Boolean);
    const matchLocation = location === 'All' || p.location.toLowerCase().includes(location.toLowerCase());
    const matchBhk = bhk === 'All' || bedrooms.includes(Number(bhk));
    const matchBudget = budget === 'All' || (budget === 'Under ₹75L' ? p.price < 7500000 : budget === '₹75L – ₹1Cr' ? p.price >= 7500000 && p.price <= 10000000 : p.price > 10000000);
    return matchLocation && matchBhk && matchBudget;
  }), [location, bhk, budget]);

  return (
    <section id="featured" className="bg-[#fbf7f8] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div><p className="mb-4 text-[11px] font-bold uppercase tracking-[.28em] text-[#9d3a52]">Our curated collection</p><h2 className="max-w-3xl font-serif text-5xl leading-[.96] tracking-[-.04em] text-[#4b0617] sm:text-7xl">Homes worth <span className="italic text-[#9d3a52]">coming home to.</span></h2></div>
          <p className="max-w-sm text-sm leading-7 text-[#626965]">Explore thoughtfully selected residences across Gandhinagar’s most promising neighbourhoods.</p>
        </div>
        <div className="mb-9 flex flex-wrap gap-2">
          <select value={location} onChange={e => setLocation(e.target.value)} className="rounded-full border border-[#4b0617]/15 bg-transparent px-5 py-3 text-xs font-medium outline-none"><option>All</option><option>Sargasan</option><option>Kudasan</option><option>Raysan</option><option>PDEU</option></select>
          <select value={bhk} onChange={e => setBhk(e.target.value)} className="rounded-full border border-[#4b0617]/15 bg-transparent px-5 py-3 text-xs font-medium outline-none"><option>All</option><option value="2">2 BHK</option><option value="3">3 BHK</option><option value="4">4 BHK</option></select>
          <select value={budget} onChange={e => setBudget(e.target.value)} className="rounded-full border border-[#4b0617]/15 bg-transparent px-5 py-3 text-xs font-medium outline-none"><option>All</option><option>Under ₹75L</option><option>₹75L – ₹1Cr</option><option>Above ₹1Cr</option></select>
          <button onClick={() => { setLocation('All'); setBhk('All'); setBudget('All'); }} className="px-4 py-3 text-xs text-[#68706c] hover:text-[#4b0617]">Reset filters</button>
          <span className="ml-auto self-center text-xs text-[#68706c]">{results.length} residences</span>
        </div>
        <motion.div layout className="grid items-stretch gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.slice(0, visible).map((p, index) => <motion.article layout initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: (index % 3) * .08 }} key={p.id} className="group h-full">
              <Link to={`/properties/${p.id}`} className="flex h-full flex-col overflow-hidden bg-white">
                <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.055]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#31010d]/65 via-transparent to-transparent" />
                  {p.featured && <span className="absolute left-4 top-4 bg-[#fffafa]/95 px-3 py-2 text-[9px] font-bold uppercase tracking-[.2em] text-[#4b0617]">Featured</span>}
                  <span className="absolute bottom-5 left-5 text-sm font-medium text-white">{priceLabel(p)}</span>
                  <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#4b0617] transition group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight size={18} /></span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6"><div className="mb-3 flex min-h-[3.5rem] items-start justify-between gap-3"><h3 className="font-serif text-2xl leading-tight text-[#4b0617]">{p.title}</h3><MoveUpRight className="mt-1 h-4 w-4 shrink-0 text-[#9d3a52]" /></div><div className="mb-5 flex min-h-[2.5rem] items-start gap-2 text-xs leading-5 text-[#6e746f]"><MapPin size={14} className="mt-0.5 shrink-0" /> {p.location}</div><div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-black/10 pt-4 text-[11px] font-semibold uppercase tracking-[.08em] text-[#4e5652]"><span className="flex items-center gap-2"><BedDouble size={15} />{p.bedroomsMin ? `${p.bedroomsMin}–${p.bedroomsMax}` : p.bedrooms} BHK</span><span className="flex items-center gap-2"><Ruler size={15} />{p.areaMin ? `${p.areaMin}–${p.areaMax}` : p.area} ft²</span></div></div>
              </Link>
            </motion.article>)}
          </AnimatePresence>
        </motion.div>
        {!results.length && <div className="border border-dashed border-[#4b0617]/20 py-20 text-center text-[#68706c]">No homes match these filters. Try a broader search.</div>}
        {visible < results.length && <div className="mt-14 text-center"><button onClick={() => setVisible(v => v + 3)} className="border-b border-[#4b0617] pb-2 text-xs font-bold uppercase tracking-[.18em]">Show more properties</button></div>}
      </div>
    </section>
  );
}
