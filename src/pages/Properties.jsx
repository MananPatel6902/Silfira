import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PropertiesGrid from '../components/PropertiesGrid';

export default function Properties() {
  const [params] = useSearchParams();
  return <main className="bg-[#fbf7f8]">
    <PageHero image="header-properties" eyebrow="The collection" lines={['Find the space', <span>that feels <span className="italic text-[#f0c5ce]">like yours.</span></span>]} intro="Seven residences across Sargasan, Kudasan, Raysan and Palm Road, each personally visited and vetted by our team." />
    <PropertiesGrid initialFilters={{ location: params.get('location') || 'All', bhk: params.get('bhk') || 'All', budget: 'All' }} />
  </main>;
}
