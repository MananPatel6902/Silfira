export const SITE_URL = 'https://www.silfira.co.in';
export function pageMetadata(pathname, properties = []) {
  const pages = {
    '/': ['Curated Homes in Gandhinagar', 'Discover personally vetted homes in Sargasan, Kudasan, Raysan and Palm Road, Gandhinagar.'],
    '/properties': ['Properties in Gandhinagar', 'Explore homes in Gandhinagar by location, BHK and budget with Silfira Realtors.'],
    '/about': ['About Silfira Realtors', 'Meet Silfira Realtors, founded by Rohan Darji with co-founder Amit Desai, serving homebuyers in Gandhinagar.'],
    '/agents': ['Meet Our Property Advisors', 'Speak with Rohan Darji and Amit Desai for personal guidance on buying a home in Gandhinagar.'],
    '/contact': ['Contact Silfira Realtors', 'Contact our Gandhinagar property advisors to arrange a consultation or site visit.'],
    '/valuation': ['Property Valuation in Gandhinagar', 'Request a property valuation from Silfira Realtors for your Gandhinagar home.'],
  };
  const slug = p => p.slug || String(p.title || p.id).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const property = properties.find(p => pathname === `/properties/${slug(p)}` || pathname === `/properties/${p.id}`);
  const absolute = value => new URL(value, SITE_URL).href;
  const title = property ? `${property.title}, ${property.bedroomsMin || property.bedrooms}–${property.bedroomsMax || property.bedrooms} BHK in ${property.location}` : (pages[pathname]?.[0] || 'Page Not Found');
  const description = property ? `${property.title} in ${property.location}. ${property.description || 'Explore prices, amenities and request a site visit with Silfira Realtors.'}`.slice(0, 180) : (pages[pathname]?.[1] || 'Find your next home with Silfira Realtors. Browse our properties or contact our team.');
  const canonical = absolute(property ? `/properties/${slug(property)}` : pathname);
  const image = absolute(property?.imageWide || '/images/v2/ui/og-image.jpg');
  const schema = property ? { '@context': 'https://schema.org', '@type': 'RealEstateListing', name: property.title, description, url: canonical, image, offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: property.priceMin || property.price, highPrice: property.priceMax || property.price }, about: { '@type': 'Apartment', name: property.title, address: { '@type': 'PostalAddress', addressLocality: property.location, addressRegion: 'Gujarat', addressCountry: 'IN' } } } : { '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'Silfira Realtors', url: SITE_URL, image: absolute('/images/v2/ui/og-image.jpg'), telephone: '+919712345802', areaServed: 'Gandhinagar', address: { '@type': 'PostalAddress', addressLocality: 'Gandhinagar', addressRegion: 'Gujarat', addressCountry: 'IN' } };
  return { title: `${title} · Silfira Realtors`, description, canonical, image, schema, notFound: !property && !pages[pathname] };
}
