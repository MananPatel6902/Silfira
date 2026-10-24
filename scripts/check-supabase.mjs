import fs from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const envText = await fs.readFile(path.join(process.cwd(), '.env.local'), 'utf8');
const env = Object.fromEntries(envText.split(/\r?\n/).filter(line => line && !line.startsWith('#')).map(line => {
  const separator = line.indexOf('=');
  return [line.slice(0, separator), line.slice(separator + 1)];
}));
const supabase = createClient(env.REACT_APP_SUPABASE_URL, env.REACT_APP_SUPABASE_PUBLISHABLE_KEY);
const tables = ['profiles', 'developers', 'developer_assets', 'properties', 'property_assets', 'property_features', 'leads', 'lead_notes', 'clients', 'invoices', 'invoice_items', 'payments', 'testimonials'];

let failed = false;
for (const table of tables) {
  const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
  if (error) {
    failed = true;
    console.log(`FAIL  ${table}: ${error.message}`);
  } else {
    console.log(`OK    ${table}: ${count ?? 0} publicly visible rows`);
  }
}

for (const bucket of ['developer-assets', 'property-assets', 'profile-images', 'testimonial-images']) {
  const { error } = await supabase.storage.from(bucket).list('', { limit: 1 });
  console.log(error ? `CHECK ${bucket}: ${error.message}` : `OK    ${bucket}: accessible`);
}

const pathChecks = [
  ['developer_assets', 'storage_path'], ['property_assets', 'storage_path'],
  ['profiles', 'avatar_path'], ['testimonials', 'image_path'],
];
for (const [table, column] of pathChecks) {
  const { data, error } = await supabase.from(table).select(column);
  const local = (data || []).filter(row => row[column]?.startsWith('/') || row[column]?.startsWith('./'));
  if (error) console.log(`CHECK ${table}.${column}: ${error.message}`);
  else console.log(`${local.length ? 'FAIL' : 'OK  '}  ${table}.${column}: ${local.length} local paths remaining`);
  if (local.length) failed = true;
}

const publicPropertyQuery = await supabase.from('properties').select('*, developer:developers(*), manager:profiles!properties_managed_by_fkey(*), property_assets(*), property_features(*)').eq('listing_status', 'published').order('sort_order');
if (publicPropertyQuery.error) {
  failed = true;
  console.log(`FAIL  website property query: ${publicPropertyQuery.error.message}`);
} else {
  console.log(`OK    website property query: ${publicPropertyQuery.data.length} rows`);
}

if (failed) process.exitCode = 1;
