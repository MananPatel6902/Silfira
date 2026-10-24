import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createClient } from '@supabase/supabase-js';

const envText = await fs.readFile(path.join(process.cwd(), '.env.local'), 'utf8');
const env = Object.fromEntries(envText.split(/\r?\n/).filter(line => line && !line.startsWith('#')).map(line => {
  const at = line.indexOf('='); return [line.slice(0, at), line.slice(at + 1)];
}));
const email = process.env.SUPABASE_ADMIN_EMAIL;
const password = process.env.SUPABASE_ADMIN_PASSWORD;
if (!email || !password) throw new Error('Admin credentials must be provided through the process environment.');
const supabase = createClient(env.REACT_APP_SUPABASE_URL, env.REACT_APP_SUPABASE_PUBLISHABLE_KEY);
const anonymous = createClient(env.REACT_APP_SUPABASE_URL, env.REACT_APP_SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false } });
const login = await supabase.auth.signInWithPassword({ email, password });
if (login.error) throw login.error;

const mode = process.argv[2] || 'audit';
const check = (condition, message) => {
  if (!condition) { console.error(`FAIL  ${message}`); process.exitCode = 1; }
  else console.log(`PASS  ${message}`);
};
const query = async (table, select = '*') => {
  const result = await supabase.from(table).select(select);
  if (result.error) throw result.error;
  return result.data || [];
};

if (mode === 'audit') {
  const [profiles, developers, properties, leads, clients, invoices, testimonials] = await Promise.all([
    query('profiles'), query('developers', '*, developer_assets(*)'), query('properties', '*, property_assets(*), property_features(*)'),
    query('leads'), query('clients'), query('invoices', '*, invoice_items(*), payments(*)'), query('testimonials'),
  ]);
  const admin = profiles.find(row => row.user_id === login.data.user.id);
  check(admin?.role === 'admin' && admin.is_active, 'authenticated user is linked to an active admin profile');
  check(properties.filter(row => row.listing_status === 'published').length === 7, 'seven public properties are published');
  check(properties.filter(row => row.listing_status === 'published').every(row => row.property_assets.some(asset => asset.asset_type === 'portrait_image') && row.property_assets.some(asset => asset.asset_type === 'landscape_image') && row.property_assets.some(asset => asset.asset_type === 'brochure_pdf')), 'every published property has portrait, landscape and brochure assets');
  check(properties.flatMap(row => row.property_assets).every(asset => !asset.storage_path.startsWith('/') && !asset.storage_path.startsWith('./')), 'all property assets use Supabase Storage paths');
  check(['dev-auram','samved-opera-symphony-and-melody','vinayak-saral-courtyard','reventa-fortune-2','pre-launch-by-shlok-group'].every(slug => properties.find(row => row.slug === slug)?.developer_id), 'matching properties are connected to developer records');
  check(developers.filter(row => row.is_active && row.is_featured).length === 18, 'eighteen developer partners are active');
  check(developers.filter(row => row.is_active && row.is_featured).every(row => row.developer_assets.some(asset => asset.asset_type === 'logo')), 'every active developer has a logo');
  check(profiles.filter(row => row.is_public && row.role === 'owner').length === 2, 'Rohan and Amit are public owner profiles');
  check(testimonials.length === 3 && testimonials.every(row => row.is_approved), 'three testimonials are published');
  const qaLeads = leads.filter(row => row.name.startsWith('QA '));
  check(qaLeads.length === 2, 'contact and property enquiry writes reached the leads table');
  check(qaLeads.some(row => row.status === 'contacted'), 'lead status updates persist');
  const qaProperty = properties.find(row => row.slug === 'qa-draft-property');
  check(qaProperty?.listing_status === 'draft' && Number(qaProperty.price_max) === 6000000 && qaProperty.bedrooms_max === 3 && qaProperty.area_max_sqft === 1600, 'property create and ranged edit values persist');
  const qaInvoice = invoices.find(row => row.notes === 'QA Test Project');
  check(Boolean(qaInvoice), 'invoice creation persists');
  check(qaInvoice?.invoice_items.length === 1 && Number(qaInvoice.invoice_items[0].unit_amount) === 100000, 'invoice line item persists');
  check(qaInvoice?.payments.length === 1 && Number(qaInvoice.payments[0].amount) === 25000, 'partial payment persists');
  check(clients.some(row => row.name === 'QA Invoice Client'), 'invoice client persists');
  const anonymousLeads = await anonymous.from('leads').select('id');
  check(!anonymousLeads.error && anonymousLeads.data.length === 0, 'RLS prevents visitors from reading leads');
  const anonymousInvoices = await anonymous.from('invoices').select('id');
  check(!anonymousInvoices.error && anonymousInvoices.data.length === 0, 'RLS prevents visitors from reading invoices');
  const anonymousDraft = await anonymous.from('properties').select('id').eq('slug', 'qa-draft-property');
  check(!anonymousDraft.error && anonymousDraft.data.length === 0, 'RLS hides draft properties from visitors');
  const invalidLead = await anonymous.from('leads').insert({ inquiry_type: 'contact', name: 'QA Invalid Lead', status: 'new', source: 'qa' });
  check(Boolean(invalidLead.error), 'database rejects a lead with no email or phone');
  const elevatedLead = await anonymous.from('leads').insert({ inquiry_type: 'contact', name: 'QA Invalid Status', email: 'invalid@example.com', status: 'contacted', source: 'qa' });
  check(Boolean(elevatedLead.error), 'RLS prevents visitors from choosing an elevated lead status');
  console.log(`INFO  rows: profiles=${profiles.length}, developers=${developers.length}, properties=${properties.length}, leads=${leads.length}, clients=${clients.length}, invoices=${invoices.length}, testimonials=${testimonials.length}`);
}

if (mode === 'storage-cycle') {
  const slug = `qa-storage-${Date.now()}`;
  const developer = await supabase.from('developers').insert({ name: 'QA Storage Developer', slug, is_featured: false, is_active: false }).select('id').single();
  if (developer.error) throw developer.error;
  const storagePath = `${developer.data.id}/qa-logo.png`;
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');
  const upload = await supabase.storage.from('developer-assets').upload(storagePath, png, { contentType: 'image/png', upsert: true });
  if (upload.error) throw upload.error;
  const asset = await supabase.from('developer_assets').insert({ developer_id: developer.data.id, asset_type: 'logo', storage_path: storagePath, file_name: 'qa-logo.png', mime_type: 'image/png', alt_text: 'QA Storage Developer' });
  if (asset.error) throw asset.error;
  const publicUrl = supabase.storage.from('developer-assets').getPublicUrl(storagePath).data.publicUrl;
  const response = await fetch(publicUrl);
  check(response.ok && response.headers.get('content-type')?.includes('image/png'), 'admin upload, database asset row and public file delivery work end to end');
  const objectRemoval = await supabase.storage.from('developer-assets').remove([storagePath]); if (objectRemoval.error) throw objectRemoval.error;
  const developerRemoval = await supabase.from('developers').delete().eq('id', developer.data.id); if (developerRemoval.error) throw developerRemoval.error;
  console.log('CLEAN removed temporary storage-cycle developer and logo');
}

if (mode === 'link-developers') {
  const links = { 'dev-auram': 'dev-group', 'samved-opera-symphony-and-melody': 'samved-group', 'vinayak-saral-courtyard': 'vinayak-group', 'reventa-fortune-2': 'revanta-group', 'pre-launch-by-shlok-group': 'shlok-group' };
  const developers = await query('developers', 'id,slug');
  for (const [propertySlug, developerSlug] of Object.entries(links)) {
    const developer = developers.find(row => row.slug === developerSlug);
    const result = await supabase.from('properties').update({ developer_id: developer.id }).eq('slug', propertySlug);
    if (result.error) throw result.error;
  }
  console.log('PASS  linked five properties to their matching developer records');
}

if (mode === 'cleanup') {
  const qaProperties = (await query('properties', 'id,slug')).filter(row => row.slug.startsWith('qa-'));
  for (const property of qaProperties) {
    const assets = await supabase.from('property_assets').select('storage_path').eq('property_id', property.id);
    if (assets.error) throw assets.error;
    const paths = (assets.data || []).map(row => row.storage_path).filter(value => value && !value.startsWith('/') && !value.startsWith('./'));
    if (paths.length) { const removal = await supabase.storage.from('property-assets').remove(paths); if (removal.error) throw removal.error; }
    const removal = await supabase.from('properties').delete().eq('id', property.id); if (removal.error) throw removal.error;
  }
  const qaInvoices = (await query('invoices', 'id,client_id,notes')).filter(row => row.notes?.startsWith('QA '));
  for (const invoice of qaInvoices) {
    const invoiceRemoval = await supabase.from('invoices').delete().eq('id', invoice.id); if (invoiceRemoval.error) throw invoiceRemoval.error;
    const clientRemoval = await supabase.from('clients').delete().eq('id', invoice.client_id); if (clientRemoval.error) throw clientRemoval.error;
  }
  const leadRemoval = await supabase.from('leads').delete().like('name', 'QA %'); if (leadRemoval.error) throw leadRemoval.error;
  console.log(`CLEAN removed ${qaProperties.length} QA properties, ${qaInvoices.length} QA invoices/clients, and QA leads`);
  const [remainingProperties, remainingLeads, remainingClients, remainingInvoices] = await Promise.all([
    query('properties', 'slug'), query('leads', 'name'), query('clients', 'name'), query('invoices', 'notes'),
  ]);
  check(remainingProperties.length === 7 && !remainingProperties.some(row => row.slug.startsWith('qa-')), 'property table returned to the seven-record baseline');
  check(!remainingLeads.some(row => row.name.startsWith('QA ')), 'QA leads were removed');
  check(!remainingClients.some(row => row.name.startsWith('QA ')), 'QA clients were removed');
  check(!remainingInvoices.some(row => row.notes?.startsWith('QA ')), 'QA invoices and cascading payment/item rows were removed');
}

await supabase.auth.signOut();
