// Mock data for Silfira Realtors

export const properties = [
  {
    id: '1',
    title: 'Only ONE',
    type: 'Apartment',
    status: 'for-sale',
    priceMax: 9180000,
    price: 9180000, // Used for filtering
    location: 'Palm Road, Sargasan, Gandhinagar',
    bedrooms: 3, // Single bedroom type
    bathrooms: 3,
    area: 2295,
    image: './images/property_images/1.png',
    images: [
      ''
    ],
    description: 'Stunning waterfront villa with panoramic ocean views, private dock, and resort-style amenities.',
    features: ['Ocean View', 'Private Dock', 'Pool', 'Smart Home', 'Wine Cellar'],
    agent: 'agent1',
    featured: true,
    brochureUrl: '/brochures/ON1 (3BHK).pdf'
  },
  {
    id: '2',
    title: 'Atmos By Solaire',
    type: 'Apartments',
    status: 'for-sale',
    priceMin: 11040000,
    priceMax: 14160000,
    price: 14080000, // Used for filtering
    location: 'Sargasan, Gandhinagar',
    bedroomsMin: 3, // Bedroom range: 3-4 BHK
    bedroomsMax: 4,
    bedrooms: 3, // Used for filtering
    bathrooms: 4,
    areaMin: 2484,
    areaMax: 3186,
    area: 2484, // Used for filtering
    image: './images/property_images/2.png',
    images: [
      ''
    ],
    description: 'Luxurious penthouse in the heart of Manhattan with floor-to-ceiling windows and city skyline views.',
    features: ['City Views', 'Concierge', 'Gym', 'Rooftop Terrace', 'Parking'],
    agent: 'agent2',
    featured: true,
    brochureUrl: '/brochures/AS (3,4BHK SARGASAN).pdf'
  },
  {
    id: '3',
    title: 'Dev Auram',
    type: 'Apartment',
    status: 'for-sale',
    priceMin: 7030000,
    priceMax: 7178000,
    price : 7030000, // Used for filtering
    location: 'Palm Road, Sargasan, Gandhinagar',
    bedroomsMin: 2,
    bedroomsMax : 3,
    bathrooms: 3,
    areaMin: 1710,
    areaMax: 2259,
    image: './images/property_images/3.png',
    images: ['./images/property_images/3.png'],
    description: 'Magnificent European-style estate with manicured gardens, tennis court, and guest house.',
    features: ['Tennis Court', 'Guest House', 'Library', 'Home Theater', 'Security System'],
    agent: 'agent1',
    featured: true,
    brochureUrl: '/brochures/property-3.pdf'
  },
  {
    id: '4',
    title: 'Samved Opera Symphony and Melody',
    type: 'Apartment',
    status: 'for-sale',
    priceMin: 6290000,
    priceMax: 9805000,
    price: 6290000, // Used for filtering
    location: 'Sargasan, Gandhinagar',
    bedroomsMin: 2,
    bedroomsMax: 3,
    bedrooms: 2, // Used for filtering
    bathrooms: 3,
    areaMin: 1530,
    areaMax: 2385,
    area: 1530, // Used for filtering
    image: './images/property_images/4.png',
    images: [
      ''
    ],
    description: 'Stunning industrial loft with exposed brick, high ceilings, and modern finishes.',
    features: ['Exposed Brick', 'High Ceilings', 'Hardwood Floors', 'Pet Friendly'],
    agent: 'agent3',
    featured: false,
    brochureUrl: '/brochures/SOS (SARGASAN).pdf'
  },
  {
    id: '5',
    title: 'Vinayak Saral Courtyard',
    type: 'Apartment',
    status: 'for-sale',
    priceMin: 8550000,
    priceMax: 12600000,
    price: 8550000, // Used for filtering
    location: 'PDEU, Gandhinagar',
    bedroomsMin: 2,
    bedroomsMax: 3,
    bedrooms: 2, // Used for filtering
    bathrooms: 3,
    areaMin: 1710,
    areaMax: 2520,
    image: './images/property_images/5.png',
    images: [
      ''
    ],
    description: 'Charming family home with private beach access and mountain views.',
    features: ['Lake Access', 'Mountain Views', 'Fireplace', 'Deck', 'Garage'],
    agent: 'agent2',
    featured: false,
    brochureUrl: '/brochures/VC (PDPU ROAD).pdf'
  },
  {
    id: '6',
    title: 'Reventa Fortune 2',
    type: 'Apartment',
    status: 'for-sale',
    priceMin: 6290000,
    priceMax: 7992000,
    price: 6290000, // Used for filtering
    location: 'Raysan, Gandhinagar',
    bedroomsMin: 2,
    bedroomsMax: 3,
    bedrooms: 2, // Used for filtering
    bathrooms: 3,
    areaMin: 1530,
    areaMax: 1944,
    image: './images/property_images/6.png',
    images: [
      ''
    ],
    description: 'Exquisite villa overlooking championship golf course with infinity pool and spa.',
    features: ['Golf Course View', 'Infinity Pool', 'Spa', 'Outdoor Kitchen', 'Smart Home'],
    agent: 'agent1',
    featured: true,
    brochureUrl: '/brochures/RF 2 RAYSAN.pdf'
  }
];



export const agents = [
  {
    id: 'agent1',
    name: 'Rohan Darji',
    title: 'Founder & CEO',
    image: './images/RohanDarji.jpg',
    email: 'rohanrealtor20@gmail.com',
    phone: '+91 9712345802',
    bio: 'Rohan Darji is the visionary founder of Silfira Realtors, bringing expertise and passion to luxury real estate. With a commitment to excellence and personalized service, he specializes in connecting clients with their dream properties.',
    specialties: ['Luxury Properties', 'Residential Sales', 'Investment Consulting', 'Property Valuation'],
    listings: 57
  },
  {
    id: 'agent2',
    name: 'Amit Desai',
    title: 'Co-Founder',
    image: './images/AmitDesai.jpg',
    email: 'rohanrealtor20@gmail.com',
    phone: '+91 6353458552',
    bio: 'Amit Desai is the visionary co-founder of Silfira Realtors, bringing expertise and passion to luxury real estate. With a commitment to excellence and personalized service, he specializes in connecting clients with their dream properties.',
    specialties: ['Luxury Properties', 'Residential Sales', 'Investment Consulting', 'Property Valuation'],
    listings: 45
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Mithil Patel',
    role: 'Property Investor',
    content: 'Silfira Realtors made our investment property search seamless. Their market knowledge and professionalism are unmatched.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
  },
  {
    id: '2',
    name: 'Utsav Panchal',
    role: 'Homeowner',
    content: 'Finding our dream home was effortless with Silfira. The team understood exactly what we needed and delivered beyond expectations.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80'
  },
  {
    id: '3',
    name: 'RominI w Patel',
    role: 'Business Executive',
    content: 'Exceptional service from start to finish. They sold our property above asking price in record time. Highly recommend!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'
  }
];

export const stats = [
  { label: 'Properties Sold', value: '25+' },
  { label: 'Happy Clients', value: '20+' },
  { label: 'Years Experience', value: '2+' },
  { label: 'Market Coverage', value: '2 Cities' }
];

export const trustedPartners = [
  { name: 'Dev Group', logo: './images/partners_svg/dev.png' },
  { name: 'Omkar Group', logo: './images/partners_svg/Omkar.png' },
  { name: 'Pramukh Group', logo: './images/partners_svg/pramukh.png' },
  { name: 'Psy Pramukh Group', logo: './images/partners_svg/psy pramukh.png' },
  { name: 'Shikshapatri Group', logo: './images/partners_svg/Shikshapatri.png' },
  { name: 'Swagat Group', logo: './images/partners_svg/Swagat.png' },
  { name: 'Vinayak Group', logo: './images/partners_svg/vinayak.png' },
  { name: 'Saral Group', logo: './images/partners_svg/saral.png' }
];
