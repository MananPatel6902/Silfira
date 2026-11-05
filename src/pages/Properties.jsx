import React from 'react';
import PageHero from '../components/PageHero';
import PropertiesGrid from '../components/PropertiesGrid';

export default function Properties() {
  return <main className="bg-[#fbf7f8]">
    <PageHero image="header-properties" eyebrow="The collection" lines={['Find the space', <span>that feels <span className="italic text-[#f0c5ce]">like yours.</span></span>]} intro="Residences across Gandhinagar, each personally visited and vetted by our team." />
    <PropertiesGrid />
  </main>;
}
