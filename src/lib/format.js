const f = n => n >= 10000000 ? `₹${(n / 10000000).toFixed(2).replace(/\.00$/, '')} Cr` : `₹${(n / 100000).toFixed(1).replace(/\.0$/, '')} L`;

export const priceLabel = p => {
  const min = p.priceMin || p.price;
  const max = p.priceMax || p.price;
  return min === max ? f(min) : `${f(min)} to ${f(max)}`;
};

export const bhkLabel = p => {
  const min = p.bedroomsMin || p.bedrooms;
  const max = p.bedroomsMax || min;
  return `${min === max ? min : `${min}–${max}`} BHK`;
};
export const areaLabel = p => {
  const min = p.areaMin || p.area;
  const max = p.areaMax || min;
  return `${min === max ? min : `${min}–${max}`} ft²`;
};

export const propertyPathKey = p => p.slug || String(p.title || p.id).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
