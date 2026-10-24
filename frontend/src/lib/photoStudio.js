import { getAdminSession } from './adminAuth';

export const PHOTO_STUDIO_KEY = 'silfira-photo-studio';

export const seedStudioPhotos = [
  { id:'studio-1', title:'GIFT City at dusk', caption:'The skyline shaping Gujarat’s next chapter.', category:'GIFT City', image:'/images/editorial/gift-city-riverfront.png', published:true },
  { id:'studio-2', title:'Considered interiors', caption:'Quiet luxury, natural light and room to breathe.', category:'Interiors', image:'/images/editorial/gandhinagar-residence-interior.png', published:true },
  { id:'studio-3', title:'Only ONE', caption:'Contemporary living on Palm Road, Sargasan.', category:'Residences', image:'/images/property_images/1.png', published:true },
  { id:'studio-4', title:'Atmos by Solaire', caption:'A refined address in the heart of Gandhinagar.', category:'Residences', image:'/images/property_images/2.png', published:true },
  { id:'studio-5', title:'Dev Auram', caption:'Thoughtful architecture for modern family life.', category:'Residences', image:'/images/property_images/3.png', published:true },
  { id:'studio-6', title:'Future-facing living', caption:'Homes connected to the energy of GIFT City.', category:'GIFT City', image:'/images/editorial/gift-city-residence-hero.png', published:true },
];

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const photoBucket = process.env.REACT_APP_SUPABASE_PHOTO_BUCKET || 'photo-studio';
const DB_NAME = 'silfira-photo-studio';
const STORE_NAME = 'photo-files';

const safeFileName = value => value.toLowerCase().replace(/[^a-z0-9.]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'');

function openPhotoDatabase() {
  return new Promise((resolve,reject)=>{
    const request=indexedDB.open(DB_NAME,1);
    request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains(STORE_NAME))request.result.createObjectStore(STORE_NAME)};
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(request.error);
  });
}

async function saveLocalPhoto(key,file) {
  const db=await openPhotoDatabase();
  await new Promise((resolve,reject)=>{const tx=db.transaction(STORE_NAME,'readwrite');tx.objectStore(STORE_NAME).put(file,key);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)});
  db.close();
}

async function readLocalPhoto(key) {
  const db=await openPhotoDatabase();
  const blob=await new Promise((resolve,reject)=>{const request=db.transaction(STORE_NAME).objectStore(STORE_NAME).get(key);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)});
  db.close();
  return blob;
}

export async function deleteLocalStudioPhoto(photo) {
  if(!photo?.localKey)return;
  const db=await openPhotoDatabase();
  await new Promise((resolve,reject)=>{const tx=db.transaction(STORE_NAME,'readwrite');tx.objectStore(STORE_NAME).delete(photo.localKey);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)});
  db.close();
}

export async function resolveStudioPhoto(photo) {
  if(!photo?.localKey)return photo?.image||'';
  const blob=await readLocalPhoto(photo.localKey);
  return blob?URL.createObjectURL(blob):'';
}

export async function uploadStudioPhoto(file,title='silfira-photo') {
  if(!file)throw new Error('Choose a photo to upload.');
  const allowed=['image/jpeg','image/png','image/webp'];
  if(!allowed.includes(file.type))throw new Error('Upload a JPG, PNG or WebP image.');
  if(file.size>10*1024*1024)throw new Error('The photo must be smaller than 10 MB.');

  const base=safeFileName(title)||'silfira-photo';
  const extension=file.type.split('/')[1].replace('jpeg','jpg');
  const fileName=`${base}-${Date.now()}.${extension}`;

  if(!supabaseUrl||!supabaseKey){
    const localKey=`photo-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    await saveLocalPhoto(localKey,file);
    return {image:'',localKey,fileName:file.name,fileSize:file.size};
  }

  const session=getAdminSession();
  if(!session?.accessToken)throw new Error('Your admin session has expired. Please sign in again.');
  const path=`photobooth/${fileName}`;
  const response=await fetch(`${supabaseUrl}/storage/v1/object/${photoBucket}/${path}`,{method:'POST',headers:{apikey:supabaseKey,Authorization:`Bearer ${session.accessToken}`,'Content-Type':file.type,'x-upsert':'false'},body:file});
  if(!response.ok){const payload=await response.json().catch(()=>({}));throw new Error(payload.message||payload.error||'The photo could not be uploaded.');}
  return {image:`${supabaseUrl}/storage/v1/object/public/${photoBucket}/${path}`,storagePath:path,fileName:file.name,fileSize:file.size};
}

export function getStudioPhotos() {
  try { const stored=localStorage.getItem(PHOTO_STUDIO_KEY); return stored?JSON.parse(stored):seedStudioPhotos; }
  catch { return seedStudioPhotos; }
}
