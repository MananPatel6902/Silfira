import { getAdminSession } from './adminAuth';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const brochureBucket = process.env.REACT_APP_SUPABASE_BROCHURE_BUCKET || 'property-brochures';

const safeFileName = value => value
  .toLowerCase()
  .replace(/[^a-z0-9.]+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

/**
 * Uploads a property brochure to Supabase Storage in production.
 * The local preview uses an object URL so the selected PDF can be opened
 * immediately without requiring cloud credentials.
 */
export async function uploadPropertyBrochure(file, propertyTitle = 'property') {
  if (!file) throw new Error('Choose a PDF brochure to upload.');
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!isPdf) throw new Error('Brochures must be uploaded as PDF files.');
  if (file.size > 15 * 1024 * 1024) throw new Error('The brochure must be smaller than 15 MB.');

  if (!supabaseUrl || !supabaseKey) {
    return {
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      previewOnly: true,
    };
  }

  const session = getAdminSession();
  if (!session?.accessToken) throw new Error('Your admin session has expired. Please sign in again.');

  const title = safeFileName(propertyTitle) || 'property';
  const extension = safeFileName(file.name).split('.').pop() || 'pdf';
  const path = `${title}/${Date.now()}-${safeFileName(file.name.replace(/\.[^.]+$/, ''))}.${extension}`;
  const upload = await fetch(`${supabaseUrl}/storage/v1/object/${brochureBucket}/${path}`, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/pdf',
      'x-upsert': 'false',
    },
    body: file,
  });

  if (!upload.ok) {
    const payload = await upload.json().catch(() => ({}));
    throw new Error(payload.message || payload.error || 'The brochure could not be uploaded.');
  }

  return {
    url: `${supabaseUrl}/storage/v1/object/public/${brochureBucket}/${path}`,
    name: file.name,
    size: file.size,
    storagePath: path,
  };
}
