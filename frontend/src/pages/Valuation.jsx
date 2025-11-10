import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Home, DollarSign, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Valuation = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    yearBuilt: '',
    additionalInfo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit to Netlify
    const formElement = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(formElement)).toString(),
    })
      .then(() => {
        setSubmitted(true);
        toast({
          title: "Valuation Request Submitted!",
          description: "Our expert will contact you within 24 hours with a detailed report."
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to submit request. Please try again.",
          variant: "destructive"
        });
      });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-cream-50 rounded-lg p-12">
            <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-gold-600" />
            </div>
            <h1 className="text-3xl font-serif text-navy-900 mb-4">Request Submitted Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your interest in our property valuation service. Our expert team will analyze 
              your property details and contact you within 24 hours with a comprehensive valuation report.
            </p>
            <div className="space-y-4 text-left bg-white rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-navy-900 mb-3">What happens next?</h3>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gold-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">1</div>
                <p className="text-sm text-gray-600">Our experts review your property details</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gold-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">2</div>
                <p className="text-sm text-gray-600">We conduct comprehensive market analysis</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gold-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">3</div>
                <p className="text-sm text-gray-600">You receive a detailed valuation report via email</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gold-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">4</div>
                <p className="text-sm text-gray-600">Schedule a consultation to discuss next steps</p>
              </div>
            </div>
            <Button
              onClick={() => setSubmitted(false)}
              className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-6"
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      {/* Header */}
      <section className="py-12 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-navy-900 mb-4">Free Property Valuation</h1>
          <p className="text-xl text-gray-600">
            Get an accurate market valuation of your property from our experts
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="text-lg font-serif text-navy-900 mb-2">Expert Analysis</h3>
              <p className="text-sm text-gray-600">Professional evaluation by certified real estate experts</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="text-lg font-serif text-navy-900 mb-2">Accurate Pricing</h3>
              <p className="text-sm text-gray-600">Market-driven valuation based on current trends</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="text-lg font-serif text-navy-900 mb-2">Market Insights</h3>
              <p className="text-sm text-gray-600">Comprehensive report with investment potential</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-serif text-navy-900 mb-6">Property Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6" name="valuation" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="valuation" />
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+91 123-4567-987"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              {/* Property Information */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-lg font-serif text-navy-900 mb-4">Property Information</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      required
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select property type</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="estate">Estate</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Address *</label>
                    <Input
                      type="text"
                      name="address"
                      placeholder="123 Main Street, City, State, ZIP"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms *</label>
                      <Input
                        type="number"
                        name="bedrooms"
                        placeholder="3"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        required
                        min="1"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms *</label>
                      <Input
                        type="number"
                        name="bathrooms"
                        placeholder="2"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                        required
                        min="1"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Area (sqft) *</label>
                      <Input
                        type="number"
                        name="area"
                        placeholder="2000"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        required
                        min="1"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year Built</label>
                    <Input
                      type="number"
                      name="yearBuilt"
                      placeholder="2020"
                      value={formData.yearBuilt}
                      onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                      min="1800"
                      max={new Date().getFullYear()}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                    <Textarea
                      name="additionalInfo"
                      placeholder="Tell us about any recent renovations, unique features, or other details..."
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gold-600 hover:bg-gold-700 text-white h-12 text-lg"
              >
                Get Free Valuation
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Valuation;
