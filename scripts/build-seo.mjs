import fs from 'node:fs/promises';
const moduleFrom = async path => import(`data:text/javascript;base64,${Buffer.from(await fs.readFile(path, 'utf8')).toString('base64')}`);
const { properties: fallback } = await moduleFrom('src/mock.js');
const { pageMetadata, SITE_URL } = await moduleFrom('src/lib/seo.js');
let properties = fallback;
const endpoint = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;
if (endpoint && key) {
  const response = await fetch(`${endpoint}/rest/v1/properties?select=*,property_assets(*)&listing_status=eq.published`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  if (!response.ok) throw new Error('Unable to fetch published properties for SEO generation');
  properties = (await response.json()).map(p => ({ ...p, location: p.location_label, bedroomsMin: p.bedrooms_min, bedroomsMax: p.bedrooms_max, priceMin: p.price_min, priceMax: p.price_max, imageWide: p.property_assets?.find(a => a.asset_type === 'landscape_image')?.storage_path })).map(p => ({ ...p, imageWide: p.imageWide && !p.imageWide.startsWith('/') && !p.imageWide.startsWith('http') ? `${endpoint}/storage/v1/object/public/property-assets/${p.imageWide}` : p.imageWide }));
}
const template = await fs.readFile('build/index.html', 'utf8');
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const render = path => {
  const m = pageMetadata(path, properties);
  return template.replace(/<title>.*?<\/title>/s, '').replace(/<meta\s+(?:name="(?:description|robots)"|property="og:[^"]+")[^>]*>/g, '').replace('</head>', `<title>${escape(m.title)}</title><meta name="description" content="${escape(m.description)}"><link rel="canonical" href="${escape(m.canonical)}"><meta name="robots" content="${m.notFound ? 'noindex,follow' : 'index,follow'}">${Object.entries({title:m.title,description:m.description,image:m.image,url:m.canonical,type:'website'}).map(([k,v])=>`<meta property="og:${k}" content="${escape(v)}">`).join('')}<script id="site-schema" type="application/ld+json">${JSON.stringify(m.schema).replace(/</g,'\\u003c')}</script></head>`);
};
const routes = ['/', '/properties', '/about', '/agents', '/contact', '/valuation', ...properties.map(p => new URL(pageMetadata(`/properties/${p.slug || String(p.title).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}`, [p]).canonical).pathname)];
for (const route of routes) { const dir = `build${route === '/' ? '' : route}`; await fs.mkdir(dir, {recursive:true}); await fs.writeFile(`${dir}/index.html`,render(route)); }
await fs.writeFile('build/404.html', render('/404'));
await fs.writeFile('build/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route=>`<url><loc>${escape(SITE_URL+route)}</loc></url>`).join('')}</urlset>`);
await fs.writeFile('build/_redirects', '/admin /index.html 200\n/admin/login /index.html 200\n' + properties.map(p => `/properties/${p.id} ${new URL(pageMetadata(`/properties/${p.id}`, [p]).canonical).pathname} 301`).join('\n') + '\n/* /404.html 404\n');
console.log(`Generated metadata and sitemap for ${routes.length} pages.`);
