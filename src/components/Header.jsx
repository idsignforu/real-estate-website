import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, Phone, Menu, X, ChevronDown, 
  Home, Compass, MapPin, TrendingUp, BookOpen, Megaphone, PhoneCall 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactConfig } from '@/config/contactConfig';
import { usePopup } from '@/context/PopupContext';
import { projectsData } from '@/data/projectsData';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { openPopup } = usePopup();

  const isActive = (path) => location.pathname === path;
  const isParentActive = (basePath) => location.pathname.startsWith(basePath);

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setOpenAccordion(null);
  }, [location.pathname]);

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white shadow-sm z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-blue-900 p-2 rounded-lg group-hover:bg-blue-800 transition-colors">
              <Building2 className="h-7 w-7 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-blue-900 leading-tight">
                {contactConfig.companyName}
              </h1>
              <p className="text-[11px] sm:text-xs text-gray-600 font-medium">
                {contactConfig.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            
            {/* Home */}
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-blue-900 ${
                isActive('/') ? 'text-blue-900 font-semibold' : 'text-gray-700'
              }`}
            >
              Home
            </Link>

            {/* Buy Properties Dropdown */}
            <div 
              className="relative group py-6"
              onMouseEnter={() => setActiveDropdown('properties')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`flex items-center text-sm font-medium transition-colors hover:text-blue-900 cursor-pointer ${
                  isParentActive('/properties') ? 'text-blue-900 font-semibold' : 'text-gray-700'
                }`}
                aria-expanded={activeDropdown === 'properties'}
              >
                Buy Properties
                <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-lg py-2 hidden group-hover:block animate-in fade-in-50 slide-in-from-top-2 duration-150">
                <Link
                  to="/properties"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 font-semibold border-b border-gray-100"
                >
                  All Properties
                </Link>
                <Link
                  to="/properties/apartments"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                >
                  Apartments
                </Link>
                <Link
                  to="/properties/villas"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                >
                  Villas
                </Link>
                <Link
                  to="/properties/plots"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                >
                  Open Plots
                </Link>
              </div>
            </div>

            {/* Projects Dropdown */}
            <div 
              className="relative group py-6"
              onMouseEnter={() => setActiveDropdown('projects')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`flex items-center text-sm font-medium transition-colors hover:text-blue-900 cursor-pointer ${
                  isParentActive('/projects') ? 'text-blue-900 font-semibold' : 'text-gray-700'
                }`}
                aria-expanded={activeDropdown === 'projects'}
              >
                Projects
                <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-lg py-2 hidden group-hover:block animate-in fade-in-50 slide-in-from-top-2 duration-150">
                <Link
                  to="/projects"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 font-semibold border-b border-gray-100"
                >
                  View All Townships
                </Link>
                {projectsData.map((proj) => (
                  <Link
                    key={proj.id}
                    to={`/projects/${proj.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  >
                    <span className="font-medium block">{proj.name}</span>
                    <span className="text-[11px] text-gray-500 block">{proj.location} • {proj.approval}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Locations Dropdown */}
            <div 
              className="relative group py-6"
              onMouseEnter={() => setActiveDropdown('locations')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`flex items-center text-sm font-medium transition-colors hover:text-blue-900 cursor-pointer ${
                  isParentActive('/locations') ? 'text-blue-900 font-semibold' : 'text-gray-700'
                }`}
                aria-expanded={activeDropdown === 'locations'}
              >
                Locations
                <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-60 bg-white border border-gray-100 shadow-xl rounded-lg py-2 hidden group-hover:block animate-in fade-in-50 slide-in-from-top-2 duration-150">
                <Link
                  to="/locations"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 font-semibold border-b border-gray-100"
                >
                  All Hyderabad Locations
                </Link>
                <div className="grid grid-cols-1 gap-1 py-1">
                  <Link to="/locations/kokapet" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900">Kokapet</Link>
                  <Link to="/locations/narsingi" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900">Narsingi</Link>
                  <Link to="/locations/tellapur" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900">Tellapur</Link>
                  <Link to="/locations/kollur" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900">Kollur</Link>
                  <Link to="/locations/gachibowli" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900">Gachibowli</Link>
                  <Link to="/locations/financial-district" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900">Financial District</Link>
                </div>
              </div>
            </div>

            {/* Investment */}
            <Link
              to="/investment"
              className={`text-sm font-medium transition-colors hover:text-blue-900 ${
                isActive('/investment') || isActive('/why-invest') ? 'text-blue-900 font-semibold' : 'text-gray-700'
              }`}
            >
              Investment
            </Link>

            {/* Blog */}
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors hover:text-blue-900 ${
                isParentActive('/blog') ? 'text-blue-900 font-semibold' : 'text-gray-700'
              }`}
            >
              Blog
            </Link>

            {/* Advertise */}
            <Link
              to="/advertise"
              className={`text-sm font-medium transition-colors hover:text-blue-900 ${
                isActive('/advertise') ? 'text-blue-900 font-semibold' : 'text-gray-700'
              }`}
            >
              Advertise With Us
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-blue-900 ${
                isActive('/contact') ? 'text-blue-900 font-semibold' : 'text-gray-700'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a href={`tel:${contactConfig.rawPhone}`}>
              <Button size="sm" className="bg-blue-900 hover:bg-blue-800 text-white font-medium">
                <Phone className="h-3.5 w-3.5 mr-1.5" />
                Call Now
              </Button>
            </a>
            <Button 
              size="sm" 
              variant="yellow"
              onClick={() => openPopup()}
            >
              Enquire
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMenuOpen && (
        <nav 
          id="mobile-navigation"
          className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto shadow-2xl"
        >
          <Link
            to="/"
            className="block py-2 text-base font-semibold text-gray-800 hover:text-blue-900 border-b border-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          {/* Accordion: Buy Properties */}
          <div className="border-b border-gray-100 py-1">
            <button
              className="flex justify-between items-center w-full py-2 text-base font-semibold text-gray-800 hover:text-blue-900 text-left"
              onClick={() => toggleAccordion('properties')}
              aria-expanded={openAccordion === 'properties'}
            >
              <span>Buy Properties</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'properties' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'properties' && (
              <div className="pl-4 space-y-2 py-2 bg-gray-50 rounded-md my-1">
                <Link to="/properties" className="block text-sm text-gray-700 hover:text-blue-900 font-medium" onClick={() => setIsMenuOpen(false)}>All Properties</Link>
                <Link to="/properties/apartments" className="block text-sm text-gray-600 hover:text-blue-900" onClick={() => setIsMenuOpen(false)}>Apartments</Link>
                <Link to="/properties/villas" className="block text-sm text-gray-600 hover:text-blue-900" onClick={() => setIsMenuOpen(false)}>Villas</Link>
                <Link to="/properties/plots" className="block text-sm text-gray-600 hover:text-blue-900" onClick={() => setIsMenuOpen(false)}>Open Plots</Link>
              </div>
            )}
          </div>

          {/* Accordion: Projects */}
          <div className="border-b border-gray-100 py-1">
            <button
              className="flex justify-between items-center w-full py-2 text-base font-semibold text-gray-800 hover:text-blue-900 text-left"
              onClick={() => toggleAccordion('projects')}
              aria-expanded={openAccordion === 'projects'}
            >
              <span>Projects</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'projects' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'projects' && (
              <div className="pl-4 space-y-2 py-2 bg-gray-50 rounded-md my-1">
                <Link to="/projects" className="block text-sm text-gray-700 hover:text-blue-900 font-medium" onClick={() => setIsMenuOpen(false)}>All Townships</Link>
                {projectsData.map(proj => (
                  <Link key={proj.id} to={`/projects/${proj.slug}`} className="block text-sm text-gray-600 hover:text-blue-900" onClick={() => setIsMenuOpen(false)}>
                    {proj.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Accordion: Locations */}
          <div className="border-b border-gray-100 py-1">
            <button
              className="flex justify-between items-center w-full py-2 text-base font-semibold text-gray-800 hover:text-blue-900 text-left"
              onClick={() => toggleAccordion('locations')}
              aria-expanded={openAccordion === 'locations'}
            >
              <span>Locations</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'locations' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'locations' && (
              <div className="pl-4 space-y-2 py-2 bg-gray-50 rounded-md my-1">
                <Link to="/locations" className="block text-sm text-gray-700 hover:text-blue-900 font-medium" onClick={() => setIsMenuOpen(false)}>All Locations</Link>
                <Link to="/locations/kokapet" className="block text-sm text-gray-600 hover:text-blue-900" onClick={() => setIsMenuOpen(false)}>Kokapet</Link>
                <Link to="/locations/narsingi" className="block text-sm text-gray-600 hover:text-blue-900" onClick={() => setIsMenuOpen(false)}>Narsingi</Link>
                <Link to="/locations/tellapur" className="block text-sm text-gray-600 hover:text-blue-900" onClick={() => setIsMenuOpen(false)}>Tellapur</Link>
                <Link to="/locations/kollur" className="block text-sm text-gray-600 hover:text-blue-900" onClick={() => setIsMenuOpen(false)}>Kollur</Link>
                <Link to="/locations/gachibowli" className="block text-sm text-gray-600 hover:text-blue-900" onClick={() => setIsMenuOpen(false)}>Gachibowli</Link>
                <Link to="/locations/financial-district" className="block text-sm text-gray-600 hover:text-blue-900" onClick={() => setIsMenuOpen(false)}>Financial District</Link>
              </div>
            )}
          </div>

          <Link to="/investment" className="block py-2 text-base font-semibold text-gray-800 hover:text-blue-900 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>
            Investment
          </Link>
          <Link to="/blog" className="block py-2 text-base font-semibold text-gray-800 hover:text-blue-900 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>
            Blog
          </Link>
          <Link to="/advertise" className="block py-2 text-base font-semibold text-gray-800 hover:text-blue-900 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>
            Advertise With Us
          </Link>
          <Link to="/contact" className="block py-2 text-base font-semibold text-gray-800 hover:text-blue-900 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>

          <div className="pt-4 flex flex-col space-y-2">
            <a href={`tel:${contactConfig.rawPhone}`} className="w-full">
              <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Call Now: {contactConfig.phone}
              </Button>
            </a>
            <Button variant="yellow" className="w-full" onClick={() => { setIsMenuOpen(false); openPopup(); }}>
              Request Exclusive Offers
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};
