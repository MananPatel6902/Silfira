import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createClient } from '@supabase/supabase-js';

const root = process.cwd();
const localEnv = Object.fromEntries((await fs.readFile(path.join(root, '.env.local'), 'utf8')).split(/\r?\n/).filter(line => line && !line.startsWith('#')).map(line => { const at = line.indexOf('='); return [line.slice(0, at), line.slice(at + 1)]; }));
const url = process.env.REACT_APP_SUPABASE_URL || localEnv.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY || localEnv.REACT_APP_SUPABASE_PUBLISHABLE_KEY;
const email = process.env.SUPABASE_ADMIN_EMAIL;
const password = process.env.SUPABASE_ADMIN_PASSWORD;
if (!url || !key || !email || !password) throw new Error('Set SUPABASE_ADMIN_EMAIL and SUPABASE_ADMIN_PASSWORD before running this migration.');

const supabase = createClient(url, key);
const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
if (authError) throw authError;

const mime = file => ({ '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.pdf': 'application/pdf' }[path.extname(file).toLowerCase()] || 'application/octet-stream');
const sourceFile = stored => stored.includes('SHLOK Group 2&3 BHK  KUDASAN.pdf')
  ? path.join(root, 'output/pdf/shlok-group-kudasan-brochure-optimized.pdf')
  : path.join(root, 'public', stored.replace(/^\.\//, '').replace(/^\//, ''));
const safeName = value => value.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g, '-');

async function upload(bucket, storagePath, prefix) {
  if (!storagePath || (!storagePath.startsWith('/') && !storagePath.startsWith('./'))) return storagePath;
  const local = sourceFile(storagePath);
  const body = await fs.readFile(local);
  const target = `${prefix}/${safeName(path.basename(local))}`;
  const { error } = await supabase.storage.from(bucket).upload(target, body, { contentType: mime(local), upsert: true });
  if (error) throw error;
  return target;
}

async function migrateTable({ table, bucket, column, prefix }) {
  const columns = ['id', column, prefix].filter((value, index, values) => values.indexOf(value) === index).join(',');
  const { data, error } = await supabase.from(table).select(columns);
  if (error) throw error;
  for (const row of data || []) {
    const next = await upload(bucket, row[column], row[prefix] || row.id);
    if (next !== row[column]) {
      const { error: updateError } = await supabase.from(table).update({ [column]: next }).eq('id', row.id);
      if (updateError) throw updateError;
      console.log(`Migrated ${table}: ${path.basename(next)}`);
    }
  }
}

await migrateTable({ table: 'developer_assets', bucket: 'developer-assets', column: 'storage_path', prefix: 'developer_id' });
await migrateTable({ table: 'property_assets', bucket: 'property-assets', column: 'storage_path', prefix: 'property_id' });
await migrateTable({ table: 'profiles', bucket: 'profile-images', column: 'avatar_path', prefix: 'id' });
await migrateTable({ table: 'testimonials', bucket: 'testimonial-images', column: 'image_path', prefix: 'id' });
await supabase.auth.signOut();
console.log('All bundled media and brochures are now stored in Supabase Storage.');
