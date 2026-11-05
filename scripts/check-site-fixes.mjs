import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const load = async path => import(`data:text/javascript;base64,${Buffer.from(await fs.readFile(path,'utf8')).toString('base64')}`);
const { matchesBudget } = await load('src/lib/propertyFilters.js');
const { properties } = await load('src/mock.js');
const { pageMetadata } = await load('src/lib/seo.js');
for (const [min,max,expected] of [[6290000,9800000,true],[8550000,12600000,true],[6990000,11000000,true],[11000000,14000000,false],[7030000,7030000,false],[7500000,7500000,true],[10000000,10000000,true]]) assert.equal(matchesBudget({priceMin:min,priceMax:max},'₹75L to ₹1Cr'),expected);
assert.equal(matchesBudget({priceMin:7000000,priceMax:12000000},'Above ₹1Cr'),true);
assert.equal(matchesBudget({priceMin:7000000,priceMax:12000000},'Under ₹75L'),true);
const titles = new Set();
for(const p of properties) {
 const slug = p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
 const m=pageMetadata(`/properties/${slug}`,properties);
 assert.equal(m.notFound,false); assert.ok(m.image.startsWith('https://')); assert.equal(m.schema['@type'],'RealEstateListing'); titles.add(m.title);
 const html=await fs.readFile(`build/properties/${slug}/index.html`,'utf8'); assert.ok(html.includes('rel="canonical"')); assert.ok(html.includes('application/ld+json'));
}
assert.equal(titles.size,properties.length);
assert.equal(pageMetadata('/this-page-does-not-exist',properties).notFound,true);
assert.ok((await fs.readFile('build/_redirects','utf8')).includes('/* /404.html 404'));
console.log('PASS: budget overlap and boundary cases, unique listing metadata, absolute social images, built canonical/schema, and 404 hosting fallback.');
