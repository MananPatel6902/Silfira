import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Properties', path: '/properties' },
  { name: 'About', path: '/about' },
  { name: 'Agents', path: '/agents' },
  { name: 'Get Valuation', path: '/valuation' }];


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-navy-900 text-cream-100 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex gap-6">
            <a href="+91 9712345802" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Phone className="w-3 h-3" />
              <span>+91 9712345802
              </span>
            </a>
            <a href="mailto:rohanrealtor20@gmail.com" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Mail className="w-3 h-3" />
              <span>rohanrealtor20@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="./images/Silfira_logo.svg"
              alt="Silfira Realtors Logo"
              className="h-10 w-auto"
            />
            <h1 className="text-2xl font-serif text-navy-900 tracking-wide">
              SILFIRA <span className="text-gold-600">REALTORS</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => <Link
                key={item.name}
                to={item.path}
                className="text-navy-700 hover:text-gold-600 font-medium transition-colors relative group">

                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-600 transition-all group-hover:w-full"></span>
              </Link>
            )}
            <Button
              onClick={() => navigate('/contact')}
              className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-2 transition-colors">

              Contact
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-navy-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen &&
        <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            {navItems.map((item) =>
          <Link
            key={item.name}
            to={item.path}
            className="block py-2 text-navy-700 hover:text-gold-600 font-medium transition-colors"
            onClick={() => setMobileMenuOpen(false)}>

                {item.name}
              </Link>
          )}
            <Button
            onClick={() => {
              navigate('/contact');
              setMobileMenuOpen(false);
            }}
            className="w-full mt-4 bg-gold-600 hover:bg-gold-700 text-white transition-colors">

              Contact
            </Button>
          </nav>
        }
      </div>
    </header>);

};

export default Header;