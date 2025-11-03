import React from 'react';
import { Button } from '../components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { agents } from '../mock';


const Agents = () => {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      {/* Header */}
      <section className="py-12 bg-cream-50" >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-navy-900 mb-4">Meet Your Agent</h1>
          <p className="text-xl text-gray-600">
            Expert guidance dedicated to finding your perfect property
          </p>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {agents.map((agent) => (
              <div
                key={agent.id}
                id={agent.id}
                
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif text-navy-900 mb-2">{agent.name}</h3>
                  <p className="text-gold-600 font-medium mb-4">{agent.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{agent.bio}</p>
                  
                  <div className="space-y-3 mb-6">
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-gold-600 transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{agent.email}</span>
                    </a>
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-gold-600 transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{agent.phone}</span>
                    </a>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mb-4">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gold-50 text-gold-700 px-3 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold text-navy-900">{agent.listings}</span> Active Listings
                    </span>
                    <Button
                      variant="outline"
                      className="border-gold-600 text-gold-600 hover:bg-gold-50 text-sm"
                      onClick={() => window.location.href = `mailto:${agent.email}`}
                    >
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-cream-100 text-lg mb-8">
            Let Rohan guide you every step of the way to your perfect property
          </p>
          <Button className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-6 text-lg transition-all hover:scale-105">
            Schedule a Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Agents;
