import React from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import PropertiesGrid from '../components/PropertiesGrid';

export default function Properties(){
  const [params]=useSearchParams();
  return <main className="bg-[#fbf7f8] pt-20 lg:pt-24"><section className="relative overflow-hidden bg-[#4b0617] px-5 pb-20 pt-24 text-white sm:px-8 lg:px-14 lg:pb-28 lg:pt-32"><div className="absolute -right-16 -top-60 font-serif text-[35rem] leading-none text-white/[.035]">S</div><motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} className="relative mx-auto max-w-[1440px]"><p className="mb-5 text-[11px] font-bold uppercase tracking-[.28em] text-[#f0c5ce]">The collection</p><h1 className="max-w-5xl font-serif text-6xl leading-[.9] tracking-[-.05em] sm:text-8xl">Find the space that feels <span className="italic text-[#f0c5ce]">like yours.</span></h1></motion.div></section><PropertiesGrid initialFilters={{location:params.get('location')||'All',bhk:params.get('bhk')||'All',budget:'All'}} /></main>;
}
