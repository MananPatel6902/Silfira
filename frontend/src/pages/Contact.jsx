import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
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
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours."
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive"
        });
      });
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      {/* Header */}
      <section className="py-12 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-navy-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            We're here to help you find your perfect property
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-serif text-navy-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6" name="contact" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select a subject</option>
                    <option value="buying">Buying Property</option>
                    <option value="selling">Selling Property</option>
                    <option value="renting">Renting Property</option>
                    <option value="valuation">Property Valuation</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white h-12 text-lg"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-navy-900 rounded-lg p-8 text-white mb-8">
                <h2 className="text-2xl font-serif mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Visit Our Office</h3>
                      <p className="text-cream-100 text-sm">
                        Kudasan, Gandhinagar<br />
                        Gujarat, IN 382421<br />
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Call Us</h3>
                      <p className="text-cream-100 text-sm">
                        +91 9712345802<br />
                        Rohan Darji - Founder
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Us</h3>
                      <p className="text-cream-100 text-sm">
                        rohanrealtor20@gmail.com<br />
                        Silfira Realtors
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-cream-100 text-sm">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: By Appointment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="rounded-lg overflow-hidden shadow-lg h-96 relative group">
                <iframe
                  src="https://maps.google.com/maps?q=Pramukh+Arcade,+Kudasan,+Gandhinagar,+Gujarat+382421&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Silfira Realtors Office Location - Pramukh Arcade"
                ></iframe>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Pramukh+Arcade+Kudasan+Gandhinagar+Gujarat+382421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium transition-all opacity-0 group-hover:opacity-100"
                >
                  <MapPin className="w-4 h-4" />
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
