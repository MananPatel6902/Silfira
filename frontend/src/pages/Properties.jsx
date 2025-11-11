import React, { useState, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Search, SlidersHorizontal, MapPin, Bed, Bath, Square, ExternalLink } from 'lucide-react';
import { properties } from '../mock';

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [propertyStatus, setPropertyStatus] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = propertyType === 'all' || property.type === propertyType;
      const matchesStatus = propertyStatus === 'all' || property.status === propertyStatus;
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      
      return matchesSearch && matchesType && matchesStatus && matchesPrice;
    });
  }, [searchTerm, propertyType, propertyStatus, priceRange]);

  return (
    <div className="min-h-screen bg-cream-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-navy-900 mb-4">Discover Properties</h1>
          <p className="text-gray-600">Browse our exclusive collection of luxury properties</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by location or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="h-12 px-6"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="estate">Estate</SelectItem>
                      <SelectItem value="loft">Loft</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <Select value={propertyStatus} onValueChange={setPropertyStatus}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="for-sale">For Sale</SelectItem>
                      <SelectItem value="for-rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={20000000}
                    step={100000}
                    className="mt-4"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-navy-900">{filteredProperties.length}</span> properties
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all group"
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
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-navy-900 text-white px-3 py-1 rounded text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-serif text-navy-900">{property.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>
                      {property.bedroomsMin && property.bedroomsMax ? (
                        <>{property.bedroomsMin}-{property.bedroomsMax} BHK</>
                      ) : (
                        <>{property.bedrooms} BHK</>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>
                      {property.areaMin && property.areaMax ? (
                        <>{property.areaMin.toLocaleString()}-{property.areaMax.toLocaleString()} sqft</>
                      ) : (
                        <>{property.area.toLocaleString()} sqft</>
                      )}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <a
                    href={property.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Brochure
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-serif text-navy-900">
                    {property.priceMin && property.priceMax ? (
                      <>
                        ₹{property.priceMin.toLocaleString('en-IN')} - ₹{property.priceMax.toLocaleString('en-IN')}
                      </>
                    ) : (
                      <>
                        ₹{property.price.toLocaleString('en-IN')}
                      </>
                    )}
                    {property.status === 'for-rent' && <span className="text-base">/mo</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No properties found matching your criteria</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setPropertyType('all');
                setPropertyStatus('all');
                setPriceRange([0, 20000000]);
              }}
              className="mt-6 bg-gold-600 hover:bg-gold-700 text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
