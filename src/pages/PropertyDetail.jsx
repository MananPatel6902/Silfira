import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { MapPin, Bed, Bath, Square, Calendar, Phone, Mail, Heart } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EASE, MaskLines } from '../components/motion';
import { areaLabel, bhkLabel, priceLabel, propertyPathKey } from '../lib/format';
import { useSiteData } from '../context/SiteDataContext';
import { submitLead } from '../lib/siteData';

function DetailHero({ property }) {
  const ref = React.useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(p, [0, 1], ['0%', '25%']);
  const scale = useTransform(p, [0, 1], [1.05, 1.2]);
  const clip = useTransform(p, [0, 1], ['inset(0% 0% 0% 0%)', 'inset(0% 4% 8% 4%)']);
  return <motion.section ref={ref} style={{ clipPath: clip }} className="relative flex min-h-[88svh] items-end overflow-hidden bg-[#2a020b] text-white">
    <motion.img style={{ y, scale }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }} src={property.imageWide} alt={property.title} fetchpriority="high" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1e0108] via-[#1e0108]/30 to-transparent" />
    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-40">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1, ease: EASE }} className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[.22em] text-[#f0c5ce]"><MapPin className="h-4 w-4" />{property.location}</motion.p>
      <h1 className="font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[.92] tracking-[-.04em]"><MaskLines animateOnMount delay={0.35} lines={[property.title]} /></h1>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1, ease: EASE }} className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/20 pt-6 text-sm">
        <span><span className="block text-[10px] uppercase tracking-[.2em] text-white/50">Price</span><span className="font-serif text-2xl text-[#e6cf9f]">{priceLabel(property)}</span></span>
        <span><span className="block text-[10px] uppercase tracking-[.2em] text-white/50">Configuration</span><span className="font-serif text-2xl">{bhkLabel(property)}</span></span>
        <span><span className="block text-[10px] uppercase tracking-[.2em] text-white/50">Area</span><span className="font-serif text-2xl">{areaLabel(property)}</span></span>
      </motion.div>
    </div>
  </motion.section>;
}

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { properties, profiles } = useSiteData();
  const property = properties.find(p => p.id === id || propertyPathKey(p) === id);
  const agent = property?.manager || profiles.find(a => a.id === property?.agent);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!property) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif text-navy-900 mb-4">Property Not Found</h1>
          <Button onClick={() => navigate('/properties')} className="bg-gold-600 hover:bg-gold-700 text-white">
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await submitLead({ inquiryType: 'property_inquiry', propertyId: property.id, ...formData, source: 'property_detail' });
      toast({ title: 'Inquiry Sent!', description: 'Our team will contact you shortly.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to send inquiry. Please try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveFavorite = () => {
    toast({
      title: "Saved!",
      description: "Property added to your favorites."
    });
  };

  return (
    <div className="min-h-screen bg-cream-50 pb-20">
      <DetailHero property={property} />
      <div className="max-w-7xl mx-auto px-4 pt-10">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/properties')}
          variant="ghost"
          className="mb-6 hover:text-gold-600"
        >
          Back to Properties
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white  overflow-hidden border border-[#4b0617]/10 mb-8">
              <div className="relative h-[300px] sm:h-[500px]">
                <img
                  src={property.images[selectedImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-black/40 px-3 py-1.5 text-[9px] uppercase tracking-[.18em] text-white/80 backdrop-blur">Representative image</span>
                <div className="absolute top-4 right-4 bg-gold-600 text-white px-4 py-2  font-medium">
                  {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
                </div>
              </div>
              <div className="p-4 flex gap-2 overflow-x-auto">
                {property.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`View ${index + 1}`}
                    className={`w-24 h-24 object-cover rounded cursor-pointer transition-all ${
                      selectedImage === index ? 'ring-2 ring-gold-600' : 'opacity-60 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white  border border-[#4b0617]/10 p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif text-navy-900 mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <Button
                  onClick={handleSaveFavorite}
                  variant="outline"
                  className="border-gold-600 text-gold-600 hover:bg-gold-50"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <div className="text-4xl font-serif text-navy-900 mb-8">
                {property.priceMin && property.priceMax && property.priceMin !== property.priceMax ? (
                  <>
                    ₹{property.priceMin.toLocaleString('en-IN')} - ₹{property.priceMax.toLocaleString('en-IN')}
                  </>
                ) : (
                  <>
                    ₹{property.price.toLocaleString('en-IN')}
                  </>
                )}
                {property.status === 'for-rent' && <span className="text-xl">/month</span>}
              </div>

              <div className="grid grid-cols-4 gap-6 mb-8 pb-8 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Bed className="w-5 h-5" />
                    <span className="text-sm">Bedrooms</span>
                  </div>
                  <div className="text-2xl font-serif text-navy-900">
                    {property.bedroomsMin && property.bedroomsMax && property.bedroomsMin !== property.bedroomsMax ? (
                      <>{property.bedroomsMin}-{property.bedroomsMax} BHK</>
                    ) : (
                      <>{property.bedrooms} BHK</>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Bath className="w-5 h-5" />
                    <span className="text-sm">Bathrooms</span>
                  </div>
                  <div className="text-2xl font-serif text-navy-900">{property.bathrooms}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Square className="w-5 h-5" />
                    <span className="text-sm">Area</span>
                  </div>
                  <div className="text-2xl font-serif text-navy-900">
                    {property.areaMin && property.areaMax && property.areaMin !== property.areaMax ? (
                      <>{property.areaMin.toLocaleString()}-{property.areaMax.toLocaleString()}</>
                    ) : (
                      <>{property.area.toLocaleString()}</>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">sqft</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">Type</span>
                  </div>
                  <div className="text-lg font-serif text-navy-900 capitalize">{property.type}</div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-serif text-navy-900 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-serif text-navy-900 mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-gold-600 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Agent Card */}
            {agent && (
              <div className="bg-white  border border-[#4b0617]/10 p-6 mb-6">
                <h3 className="text-xl font-serif text-navy-900 mb-4">Contact Agent</h3>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover object-[50%_18%]"
                  />
                  <div>
                    <h4 className="font-semibold text-navy-900">{agent.name}</h4>
                    <p className="text-sm text-gray-600">{agent.title}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-3 text-gray-600 hover:text-gold-600 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{agent.phone}</span>
                  </a>
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-gray-600 hover:text-gold-600 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{agent.email}</span>
                  </a>
                </div>
                <Button
                  onClick={() => navigate(`/agents#${agent.id}`)}
                  variant="outline"
                  className="w-full border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white"
                >
                  View Profile
                </Button>
              </div>
            )}

            {/* Inquiry Form */}
            <div className="bg-white  border border-[#4b0617]/10 p-6">
              <h3 className="text-xl font-serif text-navy-900 mb-4">Request Information</h3>
              <form onSubmit={handleSubmit} className="space-y-4" name="property-inquiry" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="property-inquiry" />
                <input type="hidden" name="property" value={property.title} />
                <Input
                  aria-label="Your name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  aria-label="Email address"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  aria-label="Phone number"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Textarea
                  aria-label="Your message"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  required
                />
                <Button type="submit" disabled={submitting} className="w-full bg-gold-600 hover:bg-gold-700 text-white">
                  {submitting ? 'Sending…' : 'Send Inquiry'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
