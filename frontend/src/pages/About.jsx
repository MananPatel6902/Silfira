import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Award, Users, TrendingUp, Shield } from 'lucide-react';
import { stats } from '../mock';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in every transaction and interaction'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Trust and transparency form the foundation of our client relationships'
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Your goals and satisfaction are at the heart of everything we do'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We leverage cutting-edge technology and market insights for optimal results'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-navy-900 mb-6">About Silfira Realtors</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            For over 25 years, we've been redefining luxury real estate with unparalleled expertise, 
            dedication, and a commitment to excellence that sets us apart.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Luxury Office"
                className="rounded-lg shadow-lg w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-navy-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded by Rohan Darji, Silfira Realtors began with a simple vision: to revolutionize the luxury 
                  real estate experience. What started as a passionate endeavor has grown into one of the most 
                  trusted names in premium property services.
                </p>
                <p>
                  Rohan's success stems from an unwavering commitment to his clients' dreams and an intimate 
                  understanding of the luxury market. He doesn't just sell properties; he curates lifestyles 
                  and creates lasting relationships with every client.
                </p>
                <p>
                  Today, Silfira Realtors continues to set the standard for excellence in luxury real estate, 
                  with a portfolio of successful transactions and a reputation built on trust, expertise, and dedication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-serif text-gold-400 mb-2">{stat.value}</div>
                <div className="text-sm text-cream-100 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-navy-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The principles that guide our every decision and action</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-serif text-navy-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-navy-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            To provide exceptional real estate services that exceed expectations, creating value for our 
            clients through market expertise, personalized attention, and unwavering commitment to their success.
          </p>
          <Button
            onClick={() => navigate('/contact')}
            className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-6 text-lg transition-all hover:scale-105"
          >
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&q=80"
              alt="Office 1"
              className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"
              alt="Office 2"
              className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80"
              alt="Office 3"
              className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80"
              alt="Office 4"
              className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
