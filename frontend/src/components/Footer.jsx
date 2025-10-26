import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-serif mb-4">
              SILFIRA <span className="text-gold-400">REALTORS</span>
            </h3>
            <p className="text-cream-200 text-sm leading-relaxed mb-6">
              Your trusted partner in luxury real estate. We deliver exceptional service and unmatched expertise.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/919712345802"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream-100/10 flex items-center justify-center hover:bg-gold-600 transition-colors"
                title="Chat on WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <span className="w-10 h-10 rounded-full bg-cream-100/10 flex items-center justify-center hover:bg-gold-600 transition-colors cursor-pointer">
                <Facebook className="w-4 h-4" />
              </span>
              <span className="w-10 h-10 rounded-full bg-cream-100/10 flex items-center justify-center hover:bg-gold-600 transition-colors cursor-pointer">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="w-10 h-10 rounded-full bg-cream-100/10 flex items-center justify-center hover:bg-gold-600 transition-colors cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </span>
              <span className="w-10 h-10 rounded-full bg-cream-100/10 flex items-center justify-center hover:bg-gold-600 transition-colors cursor-pointer">
                <Twitter className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-400 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/properties" className="text-cream-200 hover:text-gold-400 transition-colors text-sm">Browse Properties</Link></li>
              <li><Link to="/about" className="text-cream-200 hover:text-gold-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/agents" className="text-cream-200 hover:text-gold-400 transition-colors text-sm">Our Agents</Link></li>
              <li><Link to="/valuation" className="text-cream-200 hover:text-gold-400 transition-colors text-sm">Property Valuation</Link></li>
              <li><Link to="/contact" className="text-cream-200 hover:text-gold-400 transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold-400 font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li><span className="text-cream-200 text-sm">Property Sales</span></li>
              <li><span className="text-cream-200 text-sm">Property Rentals</span></li>
              <li><span className="text-cream-200 text-sm">Investment Consulting</span></li>
              <li><span className="text-cream-200 text-sm">Property Management</span></li>
              <li><span className="text-cream-200 text-sm">Market Analysis</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gold-400 font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="text-cream-200 text-sm">123 Luxury Avenue<br />Miami, FL 33139</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a href="tel:+919712345802" className="text-cream-200 hover:text-gold-400 transition-colors text-sm">+91 9712345802</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a href="mailto:rohan@silfirarealtors.com" className="text-cream-200 hover:text-gold-400 transition-colors text-sm">rohan@silfirarealtors.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream-100/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream-200 text-sm">
            © 2025 Silfira Realtors. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-cream-200 hover:text-gold-400 transition-colors text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-cream-200 hover:text-gold-400 transition-colors text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
