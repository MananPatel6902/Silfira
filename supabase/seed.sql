-- Run after creating the admin user in Supabase Authentication.
-- Safe to run more than once: records are matched by email/slug/title.

insert into public.profiles (user_id, full_name, role, public_title, email, is_public, is_active, sort_order)
select id, 'Manan Patel', 'admin', 'Administrator', email, false, true, 0
from auth.users where lower(email) = lower('edith6902ai@gmail.com')
on conflict (user_id) do update set full_name = excluded.full_name, role = 'admin', is_active = true;

insert into public.profiles (full_name, role, public_title, email, phone, bio, avatar_path, specialties, is_public, sort_order)
select x.* from (values
  ('Rohan Darji', 'owner', 'Founder & CEO', 'rohanrealtor20@gmail.com', '+91 9712345802', 'Rohan Darji is the visionary Founder of Silfira Realtors, connecting clients with exceptional homes through local expertise and personal service.', '/images/v2/people/advisor-rohan-real.webp', array['Luxury Properties','Residential Sales','Investment Consulting','Property Valuation'], true, 1),
  ('Amit Desai', 'owner', 'Co-Founder', 'rohanrealtor20@gmail.com', '+91 6353458552', 'Amit Desai is the dynamic Co-Founder of Silfira Realtors, focused on excellent results and matching clients with their ideal homes.', '/images/v2/people/advisor-amit-real.webp', array['Luxury Properties','Residential Sales','Investment Consulting','Property Valuation'], true, 2)
) as x(full_name,role,public_title,email,phone,bio,avatar_path,specialties,is_public,sort_order)
where not exists (select 1 from public.profiles p where p.full_name = x.full_name);

insert into public.developers (name, slug, is_featured, is_active, sort_order)
values
  ('Dev Group','dev-group',true,true,1), ('Omkar Group','omkar-group',true,true,2),
  ('Pramukh Group','pramukh-group',true,true,3), ('Psy Pramukh Group','psy-pramukh-group',true,true,4),
  ('Shikshapatri Group','shikshapatri-group',true,true,5), ('Swagat Group','swagat-group',true,true,6),
  ('Vinayak Group','vinayak-group',true,true,7), ('Saral Group','saral-group',true,true,8),
  ('Atishay Shivalay Group','atishay-shivalay-group',true,true,9), ('Revanta Group','revanta-group',true,true,10),
  ('Bakeri Group','bakeri-group',true,true,11), ('Brij Group','brij-group',true,true,12),
  ('Samved Group','samved-group',true,true,13), ('Swaminarayan Group','swaminarayan-group',true,true,14),
  ('Shlok Group','shlok-group',true,true,15), ('Siban Group','siban-group',true,true,16),
  ('Shivalik Group','shivalik-group',true,true,17), ('Shilp Group','shilp-group',true,true,18)
on conflict (slug) do update set name = excluded.name, sort_order = excluded.sort_order, is_active = true;

insert into public.developer_assets (developer_id, asset_type, storage_path, file_name, mime_type, alt_text)
select d.id, 'logo', x.path, regexp_replace(x.path, '^.*/', ''), 'image/png', d.name
from (values
  ('dev-group','/images/partners_svg/dev.png'), ('omkar-group','/images/partners_svg/Omkar.png'),
  ('pramukh-group','/images/partners_svg/pramukh.png'), ('psy-pramukh-group','/images/partners_svg/psy pramukh.png'),
  ('shikshapatri-group','/images/partners_svg/Shikshapatri.png'), ('swagat-group','/images/partners_svg/Swagat.png'),
  ('vinayak-group','/images/partners_svg/vinayak.png'), ('saral-group','/images/partners_svg/saral.png'),
  ('atishay-shivalay-group','/images/partners_svg/atishay_shivalay.png'), ('revanta-group','/images/partners_svg/revanta.png'),
  ('bakeri-group','/images/partners_svg/bakeri.png'), ('brij-group','/images/partners_svg/brij.png'),
  ('samved-group','/images/partners_svg/samved.png'), ('swaminarayan-group','/images/partners_svg/swaminarayan.png'),
  ('shlok-group','/images/partners_svg/shlok.png'), ('siban-group','/images/partners_svg/shiban.png'),
  ('shivalik-group','/images/partners_svg/shivalik.png'), ('shilp-group','/images/partners_svg/shilp.png')
) as x(slug, path)
join public.developers d on d.slug = x.slug
where not exists (select 1 from public.developer_assets a where a.developer_id = d.id and a.asset_type = 'logo');

insert into public.properties (title, slug, managed_by, location_key, location_label, property_type, listing_status, description, price_min, price_max, bedrooms_min, bedrooms_max, bathrooms, area_min_sqft, area_max_sqft, is_featured, sort_order, published_at)
select x.title, x.slug, p.id, x.location_key, x.location_label, 'Apartment', 'published', x.description, x.price_min, x.price_max, x.bedrooms_min, x.bedrooms_max, 3, x.area_min, x.area_max, x.featured, x.sort_order, now()
from (values
  ('Only ONE','only-one','sargasan','Palm Road, Sargasan, Gandhinagar','Premium residences designed for modern Gandhinagar living.',9180000::numeric,9180000::numeric,3::smallint,3::smallint,2295,2295,true,1),
  ('Atmos By Solaire','atmos-by-solaire','sargasan','Sargasan, Gandhinagar','Spacious luxury apartments with considered amenities.',11040000,14160000,3::smallint,4::smallint,2484,3186,true,2),
  ('Dev Auram','dev-auram','sargasan','Palm Road, Sargasan, Gandhinagar','Well-appointed homes in a connected neighbourhood.',7030000,7178000,2::smallint,3::smallint,1710,2259,true,3),
  ('Samved Opera Symphony and Melody','samved-opera-symphony-and-melody','sargasan','Sargasan, Gandhinagar','Contemporary homes with generous everyday spaces.',6290000,9805000,2::smallint,3::smallint,1530,2385,false,4),
  ('Vinayak Saral Courtyard','vinayak-saral-courtyard','pdeu_palm_road','PDEU, Gandhinagar','Comfortable family homes close to PDEU and Palm Road.',8550000,12600000,2::smallint,3::smallint,1710,2520,false,5),
  ('Reventa Fortune 2','reventa-fortune-2','raysan','Raysan, Gandhinagar','Quality homes in the growing Raysan neighbourhood.',6290000,7992000,2::smallint,3::smallint,1530,1944,true,6),
  ('Pre-Launch by Shlok Group','pre-launch-by-shlok-group','kudasan','45-M Iconic Road, Kudasan','A new residential opportunity on Kudasan’s iconic road.',6992000,11058000,2::smallint,3::smallint,1656,2619,true,7)
) as x(title,slug,location_key,location_label,description,price_min,price_max,bedrooms_min,bedrooms_max,area_min,area_max,featured,sort_order)
cross join lateral (select id from public.profiles where full_name = 'Rohan Darji' limit 1) p
on conflict (slug) do update set title = excluded.title, listing_status = 'published', sort_order = excluded.sort_order;

update public.properties p set developer_id = d.id
from (values
  ('dev-auram','dev-group'), ('samved-opera-symphony-and-melody','samved-group'),
  ('vinayak-saral-courtyard','vinayak-group'), ('reventa-fortune-2','revanta-group'),
  ('pre-launch-by-shlok-group','shlok-group')
) x(property_slug, developer_slug)
join public.developers d on d.slug = x.developer_slug
where p.slug = x.property_slug;

insert into public.property_assets (property_id, asset_type, storage_path, file_name, mime_type, alt_text, is_cover, sort_order)
select p.id, x.asset_type, x.path, regexp_replace(x.path, '^.*/', ''), x.mime, p.title, x.cover, x.sort_order
from public.properties p
join (values
  ('only-one','portrait_image','/images/v3/property-1-portrait.webp','image/webp',true,0), ('only-one','landscape_image','/images/v3/property-1-landscape.webp','image/webp',false,1), ('only-one','brochure_pdf','/brochures/ON1 (3BHK).pdf','application/pdf',false,10),
  ('atmos-by-solaire','portrait_image','/images/v3/property-2-portrait.webp','image/webp',true,0), ('atmos-by-solaire','landscape_image','/images/v3/property-2-landscape.webp','image/webp',false,1), ('atmos-by-solaire','brochure_pdf','/brochures/AS (3,4BHK SARGASAN).pdf','application/pdf',false,10),
  ('dev-auram','portrait_image','/images/v3/property-3-portrait.webp','image/webp',true,0), ('dev-auram','landscape_image','/images/v3/property-3-landscape.webp','image/webp',false,1), ('dev-auram','brochure_pdf','/brochures/Doc2DA (PALM ROAD).pdf','application/pdf',false,10),
  ('samved-opera-symphony-and-melody','portrait_image','/images/v3/property-4-portrait.webp','image/webp',true,0), ('samved-opera-symphony-and-melody','landscape_image','/images/v3/property-4-landscape.webp','image/webp',false,1), ('samved-opera-symphony-and-melody','brochure_pdf','/brochures/SOS (SARGASAN).pdf','application/pdf',false,10),
  ('vinayak-saral-courtyard','portrait_image','/images/v3/property-5-portrait.webp','image/webp',true,0), ('vinayak-saral-courtyard','landscape_image','/images/v3/property-5-landscape.webp','image/webp',false,1), ('vinayak-saral-courtyard','brochure_pdf','/brochures/VC (PDPU ROAD).pdf','application/pdf',false,10),
  ('reventa-fortune-2','portrait_image','/images/v3/property-6-portrait.webp','image/webp',true,0), ('reventa-fortune-2','landscape_image','/images/v3/property-6-landscape.webp','image/webp',false,1), ('reventa-fortune-2','brochure_pdf','/brochures/RF 2 RAYSAN.pdf','application/pdf',false,10),
  ('pre-launch-by-shlok-group','portrait_image','/images/v3/property-7-portrait.webp','image/webp',true,0), ('pre-launch-by-shlok-group','landscape_image','/images/v3/property-7-landscape.webp','image/webp',false,1), ('pre-launch-by-shlok-group','brochure_pdf','/brochures/shlok-group-kudasan-brochure-optimized.pdf','application/pdf',false,10)
) as x(slug,asset_type,path,mime,cover,sort_order) on p.slug = x.slug
where not exists (select 1 from public.property_assets a where a.property_id = p.id and a.asset_type = x.asset_type and a.storage_path = x.path);

insert into public.property_features (property_id, name, sort_order)
select p.id, x.name, x.sort_order from public.properties p
join (values ('only-one','Premium location',1),('only-one','Modern amenities',2),('atmos-by-solaire','Spacious layouts',1),('dev-auram','Connected neighbourhood',1),('samved-opera-symphony-and-melody','Contemporary design',1),('vinayak-saral-courtyard','Family friendly',1),('reventa-fortune-2','Raysan location',1),('pre-launch-by-shlok-group','Pre-launch opportunity',1)) x(slug,name,sort_order) on p.slug=x.slug
where not exists (select 1 from public.property_features f where f.property_id=p.id and f.name=x.name);

insert into public.testimonials (name, role, content, rating, image_path, is_approved, sort_order)
select x.* from (values
  ('Mithil Patel','Property Investor','Silfira Realtors made our investment property search seamless. Their market knowledge and professionalism are unmatched.',5,'/images/Testimonials/basic.png',true,1),
  ('Utsav Panchal','Homeowner','Finding our dream home was effortless with Silfira. The team understood exactly what we needed and delivered beyond expectations.',5,'/images/Testimonials/basic.png',true,2),
  ('Romin Patel','Business Executive','Exceptional service from start to finish. They sold our property above asking price in record time. Highly recommend!',5,'/images/Testimonials/basic.png',true,3)
) as x(name,role,content,rating,image_path,is_approved,sort_order)
where not exists (select 1 from public.testimonials t where t.name = x.name and t.content = x.content);
