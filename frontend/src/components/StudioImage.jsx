import React, { useEffect, useState } from 'react';
import { resolveStudioPhoto } from '../lib/photoStudio';

export default function StudioImage({photo,className='',loading='lazy'}) {
  const [src,setSrc]=useState(photo.image||'');
  useEffect(()=>{
    let active=true; let objectUrl='';
    resolveStudioPhoto(photo).then(url=>{objectUrl=url.startsWith('blob:')?url:'';if(active)setSrc(url)}).catch(()=>{if(active)setSrc('')});
    return()=>{active=false;if(objectUrl)URL.revokeObjectURL(objectUrl)};
  },[photo]);
  if(!src)return <div className={`${className} animate-pulse bg-[#eadde0]`} aria-label={`${photo.title} image loading`}/>;
  return <img src={src} alt={photo.title} loading={loading} className={className}/>;
}
