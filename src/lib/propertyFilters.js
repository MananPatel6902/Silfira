export function matchesBudget(property, budget) {
  const min = property.priceMin ?? property.price;
  const max = property.priceMax ?? property.price;
  if (budget === 'Under ₹75L') return min < 7500000;
  if (budget === '₹75L to ₹1Cr') return max >= 7500000 && min <= 10000000;
  if (budget === 'Above ₹1Cr') return max > 10000000;
  return true;
}
