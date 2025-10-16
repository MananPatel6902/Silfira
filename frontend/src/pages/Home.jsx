import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Search, Home as HomeIcon, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { properties, stats, testimonials } from '../mock';

const Home = () => {
  const navigate = useNavigate();
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 to-navy-800/90 z-10"></div>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80" // change this
            alt="Luxury Property"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
            Discover Your
            <span className="block text-gold-400">Dream Space</span>
          </h1>
          <p className="text-xl text-cream-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience unparalleled luxury and sophistication in every property we represent
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/properties')}
              className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-6 text-lg transition-all hover:scale-105"
            >
              <Search className="w-5 h-5 mr-2" />
              Browse Properties
            </Button>
            <Button
              onClick={() => navigate('/valuation')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-navy-900 px-8 py-6 text-lg transition-all hover:scale-105"
            >
              Get Free Valuation
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-serif text-navy-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-navy-900 mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our handpicked selection of exceptional properties</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-gold-600 text-white px-3 py-1 rounded text-sm font-medium">
                    {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-navy-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{property.location}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-600">
                      {property.bedrooms} bed • {property.bathrooms} bath • {property.area.toLocaleString()} sqft
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-serif text-navy-900">
                      ${property.price.toLocaleString()}
                      {property.status === 'for-rent' && <span className="text-base">/mo</span>}
                    </div>
                    <ArrowRight className="w-5 h-5 text-gold-600 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              onClick={() => navigate('/properties')}
              className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-6 transition-colors"
            >
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-navy-900 mb-4">Why Choose Silfira</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Excellence in every aspect of luxury real estate</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HomeIcon className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="text-xl font-serif text-navy-900 mb-3">Premium Properties</h3>
              <p className="text-gray-600">Exclusive access to the finest luxury properties in prime locations worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="text-xl font-serif text-navy-900 mb-3">Expert Guidance</h3>
              <p className="text-gray-600">Professional agents with decades of combined experience in luxury real estate</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="text-xl font-serif text-navy-900 mb-3">Market Insights</h3>
              <p className="text-gray-600">In-depth market analysis and investment strategies for maximum returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Client Testimonials</h2>
            <p className="text-cream-200 max-w-2xl mx-auto">Hear what our satisfied clients have to say</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/5 backdrop-blur-sm p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-cream-200 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-cream-100 leading-relaxed italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gold-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-white/90 text-lg mb-8">Let our experts guide you to the perfect property</p>
          <Button
            onClick={() => navigate('/contact')}
            className="bg-white text-navy-900 hover:bg-cream-100 px-8 py-6 text-lg transition-all hover:scale-105"
          >
            Contact Us Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
