import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Shield, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArchReveal, CountUp, EASE, Eyebrow, Magnetic, MaskLines, ParallaxImage, Reveal } from '../components/motion';
import { stats } from '../mock';

const values = [
  { icon: Award, title: 'Excellence', description: 'We maintain the highest standards in every transaction and interaction.' },
  { icon: Shield, title: 'Integrity', description: 'Trust and transparency form the foundation of our client relationships.' },
  { icon: Users, title: 'Client-Centric', description: 'Your goals and satisfaction are at the heart of everything we do.' },
  { icon: TrendingUp, title: 'Innovation', description: 'We use modern tools and market insight to get you the best result.' },
];
const details = [
  ['detail-stone', 'Stone & proportion'],
  ['detail-teak', 'Warm materials'],
  ['detail-lobby', 'Arrival'],
  ['detail-balcony', 'Outdoor living'],
];

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(p, [0, 1], ['0%', '22%']);
  const scale = useTransform(p, [0, 1], [1.05, 1.18]);
  const copyY = useTransform(p, [0, 1], ['0%', '50%']);
  return <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#2a020b] text-white">
    <motion.img style={{ y, scale }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }} src="/images/v2/lifestyle/about-hero.webp" alt="Residential entrance court with palms and water" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,1,8,.88)_0%,rgba(30,1,8,.4)_55%,transparent_100%)]" />
    <motion.div style={{ y: copyY }} className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-20 pt-40 sm:px-8 lg:px-14 lg:pb-28">
      <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.28em] text-[#f0c5ce]"><span className="h-px w-8 bg-[#e6cf9f]" />About Silfira Realtors</p>
      <h1 className="max-w-5xl font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[.9] tracking-[-.05em]"><MaskLines animateOnMount delay={0.3} lines={['Where spaces', <span className="italic text-[#f0c5ce]">become homes.</span>]} /></h1>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8, ease: EASE }} className="mt-7 max-w-lg text-sm leading-7 text-white/70 sm:text-base">A Gandhinagar real estate practice built on honest advice, local knowledge and long relationships.</motion.p>
    </motion.div>
  </section>;
}

export default function About() {
  const story = useRef(null);
  const { scrollYProgress } = useScroll({ target: story, offset: ['start end', 'end start'] });
  const backY = useTransform(scrollYProgress, [0, 1], ['18%', '-18%']);
  const frontY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const line = useTransform(scrollYProgress, [0.15, 0.7], ['0%', '100%']);

  return <main className="bg-[#fbf7f8]">
    <Hero />

    {/* Story, with the two real photo-booth images layered at different depths */}
    <section ref={story} className="overflow-hidden px-5 py-24 sm:px-8 lg:px-14 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-2 lg:items-center">
        <div className="relative mx-auto h-[560px] w-full max-w-[560px] sm:h-[680px]">
          <motion.figure style={{ y: backY }} className="absolute right-0 top-0 w-[62%]">
            <ArchReveal className="aspect-square"><img src="/images/v2/about/about-scale-model.webp" alt="Project scale model at a sales gallery" loading="lazy" className="h-full w-full object-cover" /></ArchReveal>
            <figcaption className="mt-3 text-right text-[10px] uppercase tracking-[.2em] text-[#9d3a52]">Project model at the sales gallery</figcaption>
          </motion.figure>
          <motion.figure style={{ y: frontY }} className="absolute bottom-0 left-0 w-[52%] shadow-[0_40px_80px_rgba(75,6,23,.25)]">
            <ArchReveal delay={0.15} className="aspect-[9/14]"><img src="/images/v2/about/about-site-visit.webp" alt="A Silfira advisor with a client on a site visit" loading="lazy" className="h-full w-full object-cover" /></ArchReveal>
            <figcaption className="mt-3 text-[10px] uppercase tracking-[.2em] text-[#9d3a52]">On a site visit with a client</figcaption>
          </motion.figure>
        </div>
        <div className="relative pl-8">
          <div className="absolute left-0 top-2 h-full w-px bg-[#4b0617]/10"><motion.div style={{ height: line }} className="w-full bg-[#c9a46a]" /></div>
          <Eyebrow>Our story</Eyebrow>
          <h2 className="font-serif text-5xl leading-[.95] tracking-[-.04em] text-[#4b0617] sm:text-6xl"><MaskLines lines={['Not just selling', <span className="italic text-[#9d3a52]">property.</span>]} /></h2>
          <div className="mt-8 space-y-5 text-base leading-8 text-[#5f5458]">
            <Reveal><p>Founded by Rohan Darji, Silfira Realtors began with a simple vision: to transform the real estate experience. What started as a passionate endeavour has grown into a trusted name in premium property services.</p></Reveal>
            <Reveal delay={0.1}><p>Rohan’s success stems from an unwavering commitment to his clients’ dreams and an intimate understanding of the market. He doesn’t just sell properties; he curates lifestyles and builds lasting relationships with every client.</p></Reveal>
            <Reveal delay={0.2}><p>Today, Silfira Realtors continues to raise the standard in Gandhinagar real estate, with a portfolio of successful transactions and a reputation built on trust, expertise and dedication.</p></Reveal>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#4b0617] px-5 py-20 text-white sm:px-8 lg:px-14">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 border-l border-white/15 md:grid-cols-4">
        {stats.map((s, i) => <Reveal key={s.label} delay={i * 0.08} className="border-r border-white/15 px-5 py-6 sm:px-8"><CountUp value={s.value} className="block font-serif text-4xl text-[#f6dce1] sm:text-6xl" /><span className="mt-2 block text-[10px] uppercase tracking-[.18em] text-white/45">{s.label}</span></Reveal>)}
      </div>
    </section>

    <section className="px-5 py-24 sm:px-8 lg:px-14 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><Eyebrow>What guides us</Eyebrow><h2 className="font-serif text-5xl tracking-[-.04em] text-[#4b0617] sm:text-7xl"><MaskLines lines={[<span>Our core <span className="italic text-[#9d3a52]">values.</span></span>]} /></h2></div>
          <Reveal><p className="max-w-sm text-sm leading-7 text-[#68706c]">The principles behind every recommendation we make.</p></Reveal>
        </div>
        <div className="grid gap-px bg-[#4b0617]/10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }, i) => <Reveal key={title} delay={i * 0.08} className="group bg-[#fbf7f8] p-8 transition duration-500 hover:bg-[#4b0617] lg:min-h-[340px] lg:p-10">
            <span className="font-serif text-sm text-[#c9a46a]">0{i + 1}</span>
            <Icon className="mt-10 h-8 w-8 text-[#9d3a52] transition group-hover:text-[#e6cf9f]" strokeWidth={1.2} />
            <h3 className="mt-8 font-serif text-3xl text-[#4b0617] transition group-hover:text-white">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-[#5f5458] transition group-hover:text-white/65">{description}</p>
          </Reveal>)}
        </div>
      </div>
    </section>

    {/* What we look for: material details */}
    <section className="bg-[#2a020b] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <Eyebrow light>What we look for</Eyebrow>
        <h2 className="max-w-3xl font-serif text-5xl leading-[.95] tracking-[-.04em] sm:text-7xl"><MaskLines lines={['The details that', <span className="italic text-[#f0c5ce]">make a home.</span>]} /></h2>
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {details.map(([img, label], i) => <figure key={img} className={i % 2 ? 'lg:mt-20' : ''}>
            <ArchReveal delay={i * 0.08} className="aspect-[4/5]"><ParallaxImage src={`/images/v2/story/${img}.webp`} alt={label} amount={8} className="h-full w-full" /></ArchReveal>
            <figcaption className="mt-4 font-serif text-xl">{label}</figcaption>
          </figure>)}
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden px-5 py-28 text-center sm:px-8 lg:py-40">
      <img src="/images/v2/brand/silfira-monogram-maroon.png" alt="" loading="lazy" className="pointer-events-none absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-[.05]" />
      <div className="relative mx-auto max-w-3xl">
        <Eyebrow className="justify-center">Our mission</Eyebrow>
        <Reveal><p className="font-serif text-3xl leading-snug text-[#4b0617] sm:text-4xl">To provide exceptional real estate services that exceed expectations, creating value for our clients through market expertise, personal attention and an unwavering commitment to their success.</p></Reveal>
        <Magnetic className="mt-12"><Link to="/contact" className="inline-flex items-center gap-3 bg-[#4b0617] px-8 py-5 text-xs font-bold uppercase tracking-[.18em] text-white transition hover:bg-[#8d2942]">Start your journey</Link></Magnetic>
      </div>
    </section>
  </main>;
}
