import { agents as fallbackProfiles, properties as fallbackProperties, testimonials as fallbackTestimonials, trustedPartners as fallbackDevelopers } from '../mock';
import { assetUrl, isSupabaseConfigured, supabase } from './supabase';

const sortByOrder = (a, b) => (a.sort_order || 0) - (b.sort_order || 0);

export function mapProfile(row) {
  return {
    id: row.id,
    name: row.full_name,
    title: row.public_title || (row.role === 'owner' ? 'Owner' : row.role),
    image: assetUrl('profile-images', row.avatar_path),
    email: row.email || '',
    phone: row.phone || '',
    bio: row.bio || '',
    specialties: row.specialties || [],
    role: row.role,
  };
}

export function mapProperty(row) {
  const assets = [...(row.property_assets || [])].sort(sortByOrder);
  const portraits = assets.filter(x => x.asset_type === 'portrait_image');
  const landscape = assets.find(x => x.asset_type === 'landscape_image');
  const galleries = assets.filter(x => ['landscape_image', 'gallery_image', 'floor_plan'].includes(x.asset_type));
  const brochure = assets.find(x => x.asset_type === 'brochure_pdf');
  const portrait = portraits[0];
  const image = assetUrl('property-assets', portrait?.storage_path || landscape?.storage_path);
  const imageWide = assetUrl('property-assets', landscape?.storage_path || portrait?.storage_path);
  const priceMin = row.price_min == null ? undefined : Number(row.price_min);
  const priceMax = row.price_max == null ? priceMin : Number(row.price_max);
  const bedroomsMin = row.bedrooms_min == null ? undefined : Number(row.bedrooms_min);
  const bedroomsMax = row.bedrooms_max == null ? bedroomsMin : Number(row.bedrooms_max);
  const areaMin = row.area_min_sqft == null ? undefined : Number(row.area_min_sqft);
  const areaMax = row.area_max_sqft == null ? areaMin : Number(row.area_max_sqft);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    type: row.property_type,
    status: row.listing_status === 'published' ? 'for-sale' : row.listing_status,
    listingStatus: row.listing_status,
    locationKey: row.location_key,
    location: row.location_label,
    address: row.address,
    description: row.description || '',
    priceMin,
    priceMax,
    price: priceMin || priceMax || 0,
    bedroomsMin,
    bedroomsMax,
    bedrooms: bedroomsMin,
    bathrooms: Number(row.bathrooms || 0),
    areaMin,
    areaMax,
    area: areaMin,
    featured: Boolean(row.is_featured),
    image,
    imageSm: image,
    imageWide,
    images: galleries.length ? galleries.map(x => assetUrl('property-assets', x.storage_path)) : [imageWide].filter(Boolean),
    brochureUrl: assetUrl('property-assets', brochure?.storage_path),
    features: (row.property_features || []).sort(sortByOrder).map(x => x.name),
    agent: row.managed_by,
    manager: row.manager ? mapProfile(row.manager) : null,
    developer: row.developer || null,
    developerId: row.developer_id || '',
  };
}

export async function fetchPublicSiteData() {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured');
  const [propertyResult, profileResult, testimonialResult, developerResult] = await Promise.all([
    supabase
      .from('properties')
      .select('*, developer:developers(*), manager:profiles!properties_managed_by_fkey(*), property_assets(*), property_features(*)')
      .eq('listing_status', 'published')
      .order('sort_order'),
    supabase.from('profiles').select('*').eq('is_public', true).eq('is_active', true).order('sort_order'),
    supabase.from('testimonials').select('*').eq('is_approved', true).order('sort_order'),
    supabase.from('developers').select('*, developer_assets(*)').eq('is_active', true).eq('is_featured', true).order('sort_order'),
  ]);

  const firstError = [propertyResult, profileResult, testimonialResult, developerResult].find(x => x.error)?.error;
  if (firstError) throw firstError;

  return {
    properties: (propertyResult.data || []).map(mapProperty),
    profiles: (profileResult.data || []).map(mapProfile),
    testimonials: (testimonialResult.data || []).map(row => ({
      id: row.id,
      name: row.name,
      role: row.role || '',
      content: row.content,
      rating: row.rating,
      image: assetUrl('testimonial-images', row.image_path),
    })),
    developers: (developerResult.data || []).map(row => {
      const logo = (row.developer_assets || []).sort(sortByOrder).find(x => x.asset_type === 'logo');
      return { id: row.id, name: row.name, logo: assetUrl('developer-assets', logo?.storage_path) };
    }),
  };
}

export const fallbackSiteData = {
  properties: fallbackProperties,
  profiles: fallbackProfiles,
  testimonials: fallbackTestimonials,
  developers: fallbackDevelopers,
};

export async function submitLead(payload) {
  if (!supabase) throw new Error('Supabase is not configured');
  const { data, error } = await supabase.from('leads').insert({
    inquiry_type: payload.inquiryType,
    property_id: payload.propertyId || null,
    name: payload.name.trim(),
    email: payload.email?.trim() || null,
    phone: payload.phone?.trim() || null,
    subject: payload.subject || null,
    message: payload.message?.trim() || null,
    source: payload.source || 'website',
    status: 'new',
  }).select('id').single();
  if (error) throw error;
  return data;
}

