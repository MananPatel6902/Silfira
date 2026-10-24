import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Camera, X } from 'lucide-react';
import StudioImage from './StudioImage';
import { getStudioPhotos } from '../lib/photoStudio';

export default function PhotoBooth(){
  const [photos]=useState(()=>getStudioPhotos().filter(photo=>photo.published));
  const [selected,setSelected]=useState(null);
  if(!photos.length)return null;
  return <section id="photobooth" className="bg-[#f5f1ea] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
    <div className="mx-auto max-w-[1440px]">
      <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.28em] text-[#9d3a52]"><Camera size={14}/>Silfira photobooth</div><h2 className="font-serif text-5xl leading-none tracking-[-.04em] text-[#34131b] sm:text-7xl">Spaces, stories and <span className="italic text-[#9d3a52]">city life.</span></h2></div><p className="max-w-sm text-sm leading-7 text-[#71666a]">A living visual journal of homes, neighbourhoods and moments from Gandhinagar and GIFT City.</p></motion.div>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">{photos.map((photo,index)=><motion.button key={photo.id} initial={{opacity:0,y:26}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-50px'}} transition={{delay:(index%3)*.08}} onClick={()=>setSelected(photo)} className="group relative mb-5 block w-full break-inside-avoid overflow-hidden bg-[#4b0617] text-left"><StudioImage photo={photo} className={`w-full object-cover transition duration-700 group-hover:scale-[1.035] ${index%4===0?'aspect-[4/5]':index%3===0?'aspect-[16/11]':'aspect-[4/3]'}`}/><div className="absolute inset-0 bg-gradient-to-t from-[#26020b]/85 via-transparent to-transparent opacity-80 transition group-hover:opacity-100"/><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white sm:p-6"><div><span className="mb-2 block text-[8px] font-bold uppercase tracking-[.2em] text-[#f0c5ce]">{photo.category}</span><strong className="font-serif text-2xl font-normal">{photo.title}</strong></div><ArrowUpRight size={20} className="transition group-hover:-translate-y-1 group-hover:translate-x-1"/></div></motion.button>)}</div>
    </div>
    {selected&&<div className="photobooth-lightbox fixed inset-0 z-[90] flex items-center justify-center bg-[#1c0208]/95 p-4 backdrop-blur-xl" onClick={()=>setSelected(null)}><button onClick={()=>setSelected(null)} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white" aria-label="Close photo"><X/></button><motion.div initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} className="max-h-[90vh] max-w-6xl" onClick={e=>e.stopPropagation()}><StudioImage photo={selected} loading="eager" className="max-h-[78vh] w-auto max-w-full object-contain"/><div className="mt-5 text-white"><span className="text-[9px] font-bold uppercase tracking-[.2em] text-[#f0c5ce]">{selected.category}</span><h3 className="mt-1 font-serif text-3xl">{selected.title}</h3><p className="mt-2 text-sm text-white/60">{selected.caption}</p></div></motion.div></div>}
  </section>;
}
