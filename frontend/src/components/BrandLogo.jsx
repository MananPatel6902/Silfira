import React from 'react';

/** Uses the supplied Silfira artwork with its background removed and recoloured white. */
export default function BrandLogo({ className = '', compact = false }) {
  return (
    <span className={`block shrink-0 ${compact ? 'h-[58px] w-[110px]' : 'h-[78px] w-[142px]'} ${className}`}>
      <img
        src="/images/brand/silfira-realtors-white.png"
        alt="Silfira Realtors"
        className="h-full w-full object-contain"
      />
    </span>
  );
}
