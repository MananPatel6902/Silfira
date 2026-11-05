import { properties as fallback } from '../../src/mock.js';
import { pageMetadata } from '../../src/lib/seo.js';

// Resolve newly published listings without requiring a rebuild of the static site.
export default async function handler(request, context) {
  const pathname = new URL(request.url).pathname.replace(/\/$/, '');
  const key = decodeURIComponent(pathname.split('/').pop());
  const endpoint = Netlify.env.get('REACT_APP_SUPABASE_URL');
  const apiKey = Netlify.env.get('REACT_APP_SUPABASE_PUBLISHABLE_KEY');
  let properties = fallback;
  if (endpoint && apiKey) {
    const query = new URL(`${endpoint}/rest/v1/properties`);
    query.searchParams.set('select', '*,property_assets(*)');
    query.searchParams.set('listing_status', 'eq.published');
    // Slug values are passed as URL parameters, never interpolated into a filter expression.
    query.searchParams.set(/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(key) ? 'id' : 'slug', `eq.${key}`);
    try {
      const result = await fetch(query, { headers: { apikey: apiKey, Authorization: `Bearer ${apiKey}` } });
      if (!result.ok) throw new Error('Listing lookup failed');
      properties = (await result.json()).map(p => {
        const image = p.property_assets?.find(a => a.asset_type === 'landscape_image')?.storage_path;
        return { ...p, location: p.location_label, bedroomsMin: p.bedrooms_min, bedroomsMax: p.bedrooms_max, priceMin: p.price_min, priceMax: p.price_max, imageWide: image && !image.startsWith('/') && !image.startsWith('http') ? `${endpoint}/storage/v1/object/public/property-assets/${image}` : image };
      });
    } catch {
      return new Response('Property information is temporarily unavailable. Please try again shortly.', { status: 503, headers: { 'Retry-After': '60', 'Content-Type': 'text/plain' } });
    }
  }
  const meta = pageMetadata(pathname, properties);
  if (!meta.notFound && new URL(meta.canonical).pathname !== pathname) return Response.redirect(meta.canonical, 301);
  const response = await context.next();
  if (meta.notFound) return new Response(response.body, { status: 404, headers: response.headers });
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const html = (await response.text()).replace(/<title>.*?<\/title>/s, '').replace(/<meta\s+(?:name="(?:description|robots)"|property="og:[^"]+")[^>]*>/g, '').replace(/<link rel="canonical"[^>]*>/g, '').replace(/<script id="site-schema".*?<\/script>/s, '').replace('</head>', `<title>${escape(meta.title)}</title><meta name="description" content="${escape(meta.description)}"><link rel="canonical" href="${escape(meta.canonical)}"><meta name="robots" content="index,follow">${Object.entries({title:meta.title,description:meta.description,image:meta.image,url:meta.canonical,type:'website'}).map(([k,v])=>`<meta property="og:${k}" content="${escape(v)}">`).join('')}<script id="site-schema" type="application/ld+json">${JSON.stringify(meta.schema).replace(/</g,'\\u003c')}</script></head>`);
  const headers = new Headers(response.headers);
  headers.delete('Content-Length');
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'no-cache');
  return new Response(html, { status: 200, headers });
}
