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
              <a href="#" className="w-10 h-10 rounded-full bg-cream-100/10 flex items-center justify-center hover:bg-gold-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-cream-100/10 flex items-center justify-center hover:bg-gold-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-cream-100/10 flex items-center justify-center hover:bg-gold-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-cream-100/10 flex items-center justify-center hover:bg-gold-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
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
                <a href="mailto:rohanrealtor20@gmail.com" className="text-cream-200 hover:text-gold-400 transition-colors text-sm">rohanrealtor20@gmail.com</a>
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
