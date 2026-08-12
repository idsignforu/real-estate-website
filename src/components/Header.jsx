import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, Menu, X, ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { contactConfig } from '@/config/contactConfig';
import { usePopup } from '@/context/PopupContext';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const { openPopup } = usePopup();
  const location = useLocation();

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenAccordion(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-blue-950 text-white shadow-md border-b border-blue-900">
      
      {/* Top Slim Scrolling DEMO Announcement Ticker */}
      <div className="bg-blue-900/40 backdrop-blur-sm border-b border-blue-800/40 text-yellow-300/90 text-[11px] font-medium py-1 overflow-hidden relative z-50 select-none">
        <div className="animate-demo-marquee flex shrink-0">
          <span className="px-4">Property For Happy • Demo Real Estate Website • Sample Property Listings • Demo Enquiry &amp; WhatsApp Integration</span>
          <span className="px-4">Property For Happy • Demo Real Estate Website • Sample Property Listings • Demo Enquiry &amp; WhatsApp Integration</span>
          <span className="px-4">Property For Happy • Demo Real Estate Website • Sample Property Listings • Demo Enquiry &amp; WhatsApp Integration</span>
          <span className="px-4">Property For Happy • Demo Real Estate Website • Sample Property Listings • Demo Enquiry &amp; WhatsApp Integration</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
      {/* Brand Logo */}
<Link
  to="/"
  onClick={closeMobileMenu}
  className="flex items-center shrink-0 min-w-0"
>
  <img
    src="/propertyforhappy-logo.png"
    alt="Property For Happy"
    className="h-10 sm:h-12 w-auto max-w-[190px] sm:max-w-[220px] object-contain"
  />
</Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 text-sm font-semibold">
          
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-md transition-colors ${
              location.pathname === '/' ? 'text-yellow-400 bg-blue-900/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
            }`}
          >
            Home
          </Link>

          {/* Buy Properties Dropdown */}
          <div className="relative group">
            <Link
              to="/properties"
              className={`px-3 py-2 rounded-md inline-flex items-center transition-colors ${
                location.pathname.startsWith('/properties') ? 'text-yellow-400 bg-blue-900/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
              }`}
            >
              Buy Properties <ChevronDown className="h-4 w-4 ml-1" />
            </Link>

            <div className="absolute left-0 top-full hidden group-hover:block w-56 bg-white text-gray-900 rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <Link to="/properties/plots" className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-950 text-sm font-medium">
                Open Plots (HMDA/DTCP)
              </Link>
              <Link to="/properties/villas" className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-950 text-sm font-medium">
                Luxury Gated Villas
              </Link>
              <Link to="/properties/apartments" className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-950 text-sm font-medium">
                2, 3 &amp; 4 BHK Apartments
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <Link to="/properties" className="block px-4 py-2 hover:bg-blue-50 text-blue-900 font-bold text-xs">
                View All Properties →
              </Link>
            </div>
          </div>

          {/* Projects Dropdown */}
          <div className="relative group">
            <Link
              to="/projects"
              className={`px-3 py-2 rounded-md inline-flex items-center transition-colors ${
                location.pathname.startsWith('/projects') ? 'text-yellow-400 bg-blue-900/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
              }`}
            >
              Township Projects <ChevronDown className="h-4 w-4 ml-1" />
            </Link>

            <div className="absolute left-0 top-full hidden group-hover:block w-64 bg-white text-gray-900 rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <Link to="/projects/a1-green-valley" className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-950 text-sm font-medium">
                A1 Green Valley (Shankarpally)
              </Link>
              <Link to="/projects/a1-royal-enclave" className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-950 text-sm font-medium">
                A1 Royal Enclave (Adibatla)
              </Link>
              <Link to="/projects/a1-sunrise-heights" className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-950 text-sm font-medium">
                A1 Sunrise Heights (Kollur)
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <Link to="/projects" className="block px-4 py-2 hover:bg-blue-50 text-blue-900 font-bold text-xs">
                Explore All Projects →
              </Link>
            </div>
          </div>

          {/* Locations Dropdown */}
          <div className="relative group">
            <Link
              to="/locations"
              className={`px-3 py-2 rounded-md inline-flex items-center transition-colors ${
                location.pathname.startsWith('/locations') ? 'text-yellow-400 bg-blue-900/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
              }`}
            >
              Locations <ChevronDown className="h-4 w-4 ml-1" />
            </Link>

            <div className="absolute left-0 top-full hidden group-hover:block w-56 bg-white text-gray-900 rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <Link to="/locations/kokapet" className="block px-4 py-2 hover:bg-blue-50 text-sm">Kokapet</Link>
              <Link to="/locations/narsingi" className="block px-4 py-2 hover:bg-blue-50 text-sm">Narsingi</Link>
              <Link to="/locations/tellapur" className="block px-4 py-2 hover:bg-blue-50 text-sm">Tellapur</Link>
              <Link to="/locations/kollur" className="block px-4 py-2 hover:bg-blue-50 text-sm">Kollur</Link>
              <Link to="/locations/gachibowli" className="block px-4 py-2 hover:bg-blue-50 text-sm">Gachibowli</Link>
              <Link to="/locations/financial-district" className="block px-4 py-2 hover:bg-blue-50 text-sm">Financial District</Link>
            </div>
          </div>

          <Link 
            to="/investment" 
            className={`px-3 py-2 rounded-md transition-colors ${
              location.pathname === '/investment' ? 'text-yellow-400 bg-blue-900/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
            }`}
          >
            Investment
          </Link>

          <Link 
            to="/blog" 
            className={`px-3 py-2 rounded-md transition-colors ${
              location.pathname.startsWith('/blog') ? 'text-yellow-400 bg-blue-900/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
            }`}
          >
            Blog
          </Link>

          <Link 
            to="/advertise" 
            className={`px-3 py-2 rounded-md transition-colors ${
              location.pathname === '/advertise' ? 'text-yellow-400 bg-blue-900/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
            }`}
          >
            Advertise
          </Link>

          <Link 
            to="/contact" 
            className={`px-3 py-2 rounded-md transition-colors ${
              location.pathname === '/contact' ? 'text-yellow-400 bg-blue-900/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Action Button */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button
            variant="yellow"
            size="sm"
            onClick={() => openPopup()}
            className="font-bold shadow-md hover:bg-yellow-400 text-blue-950"
          >
            <WhatsAppIcon className="h-4 w-4 mr-1.5 text-emerald-800" />
            Enquire Now
          </Button>
        </div>

        {/* Mobile Action Controls */}
        <div className="lg:hidden flex items-center space-x-1.5">
          <a
            href={contactConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 p-1.5 rounded-lg text-white"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>

          <a
            href={contactConfig.telLink}
            className="bg-blue-900 p-1.5 rounded-lg text-yellow-400"
            aria-label="Call Property For Happy"
          >
            <Phone className="h-4 w-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu with Accordions */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-blue-950 border-t border-blue-900 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          
          <Link to="/" onClick={closeMobileMenu} className="block py-2 text-base font-semibold text-white hover:text-yellow-400">
            Home
          </Link>

          {/* Mobile Accordion: Buy Properties */}
          <div>
            <button
              onClick={() => toggleAccordion('properties')}
              className="w-full flex justify-between items-center py-2 text-base font-semibold text-white hover:text-yellow-400"
            >
              <span>Buy Properties</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'properties' ? 'rotate-180 text-yellow-400' : ''}`} />
            </button>
            {openAccordion === 'properties' && (
              <div className="pl-4 space-y-2 py-1 text-sm text-gray-300">
                <Link to="/properties" onClick={closeMobileMenu} className="block py-1">All Properties</Link>
                <Link to="/properties/plots" onClick={closeMobileMenu} className="block py-1">Open Plots (HMDA/DTCP)</Link>
                <Link to="/properties/villas" onClick={closeMobileMenu} className="block py-1">Luxury Villas</Link>
                <Link to="/properties/apartments" onClick={closeMobileMenu} className="block py-1">Apartments (2, 3, 4 BHK)</Link>
              </div>
            )}
          </div>

          {/* Mobile Accordion: Projects */}
          <div>
            <button
              onClick={() => toggleAccordion('projects')}
              className="w-full flex justify-between items-center py-2 text-base font-semibold text-white hover:text-yellow-400"
            >
              <span>Township Projects</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'projects' ? 'rotate-180 text-yellow-400' : ''}`} />
            </button>
            {openAccordion === 'projects' && (
              <div className="pl-4 space-y-2 py-1 text-sm text-gray-300">
                <Link to="/projects" onClick={closeMobileMenu} className="block py-1 font-bold text-yellow-400">All Projects</Link>
                <Link to="/projects/a1-green-valley" onClick={closeMobileMenu} className="block py-1">A1 Green Valley (Shankarpally)</Link>
                <Link to="/projects/a1-royal-enclave" onClick={closeMobileMenu} className="block py-1">A1 Royal Enclave (Adibatla)</Link>
                <Link to="/projects/a1-sunrise-heights" onClick={closeMobileMenu} className="block py-1">A1 Sunrise Heights (Kollur)</Link>
              </div>
            )}
          </div>

          {/* Mobile Accordion: Locations */}
          <div>
            <button
              onClick={() => toggleAccordion('locations')}
              className="w-full flex justify-between items-center py-2 text-base font-semibold text-white hover:text-yellow-400"
            >
              <span>Hyderabad Locations</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'locations' ? 'rotate-180 text-yellow-400' : ''}`} />
            </button>
            {openAccordion === 'locations' && (
              <div className="pl-4 space-y-2 py-1 text-sm text-gray-300">
                <Link to="/locations" onClick={closeMobileMenu} className="block py-1 font-bold text-yellow-400">All Locations</Link>
                <Link to="/locations/kokapet" onClick={closeMobileMenu} className="block py-1">Kokapet</Link>
                <Link to="/locations/narsingi" onClick={closeMobileMenu} className="block py-1">Narsingi</Link>
                <Link to="/locations/tellapur" onClick={closeMobileMenu} className="block py-1">Tellapur</Link>
                <Link to="/locations/kollur" onClick={closeMobileMenu} className="block py-1">Kollur</Link>
                <Link to="/locations/gachibowli" onClick={closeMobileMenu} className="block py-1">Gachibowli</Link>
              </div>
            )}
          </div>

          <Link to="/investment" onClick={closeMobileMenu} className="block py-2 text-base font-semibold text-white hover:text-yellow-400">
            Investment Guide
          </Link>

          <Link to="/blog" onClick={closeMobileMenu} className="block py-2 text-base font-semibold text-white hover:text-yellow-400">
            Blog
          </Link>

          <Link to="/advertise" onClick={closeMobileMenu} className="block py-2 text-base font-semibold text-white hover:text-yellow-400">
            Advertise With Us
          </Link>

          <Link to="/contact" onClick={closeMobileMenu} className="block py-2 text-base font-semibold text-white hover:text-yellow-400">
            Contact Us
          </Link>

          <div className="pt-3">
            <Button
              variant="yellow"
              className="w-full font-bold text-blue-950 py-3"
              onClick={() => { closeMobileMenu(); openPopup(); }}
            >
              <WhatsAppIcon className="h-5 w-5 mr-2 text-emerald-800" />
              Get Best Property Offers
            </Button>
          </div>
        </div>
      )}

    </header>
  );
};
