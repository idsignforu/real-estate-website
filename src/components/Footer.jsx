import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { contactConfig } from '@/config/contactConfig';

export const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-950" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{contactConfig.companyName}</h3>
                <p className="text-xs text-yellow-400 font-medium">{contactConfig.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {contactConfig.description}
            </p>
            <div className="pt-2 text-xs text-gray-400">
              <p>HMDA Approval Layouts</p>
              <p>DTCP Approved Plots &amp; Villas</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white border-b border-blue-800/60 pb-2">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center">
                  Township Projects
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center">
                  Hyderabad Locations
                </Link>
              </li>
              <li>
                <Link to="/investment" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center">
                  Investment Guide
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center">
                  Real Estate Blog
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center">
                  Advertise With Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Buy Properties & Locations */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white border-b border-blue-800/60 pb-2">Buy Properties</h4>
            <ul className="space-y-2.5 text-sm mb-6">
              <li>
                <Link to="/properties/plots" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  HMDA &amp; DTCP Open Plots
                </Link>
              </li>
              <li>
                <Link to="/properties/villas" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Luxury Gated Villas
                </Link>
              </li>
              <li>
                <Link to="/properties/apartments" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  2, 3 &amp; 4 BHK Apartments
                </Link>
              </li>
            </ul>

            <h4 className="text-sm font-semibold text-yellow-400 mb-2">Prime Locations</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link to="/locations/kokapet" className="bg-blue-900/60 hover:bg-blue-900 text-gray-200 px-2.5 py-1 rounded">Kokapet</Link>
              <Link to="/locations/narsingi" className="bg-blue-900/60 hover:bg-blue-900 text-gray-200 px-2.5 py-1 rounded">Narsingi</Link>
              <Link to="/locations/tellapur" className="bg-blue-900/60 hover:bg-blue-900 text-gray-200 px-2.5 py-1 rounded">Tellapur</Link>
              <Link to="/locations/kollur" className="bg-blue-900/60 hover:bg-blue-900 text-gray-200 px-2.5 py-1 rounded">Kollur</Link>
              <Link to="/locations/gachibowli" className="bg-blue-900/60 hover:bg-blue-900 text-gray-200 px-2.5 py-1 rounded">Gachibowli</Link>
              <Link to="/locations/financial-district" className="bg-blue-900/60 hover:bg-blue-900 text-gray-200 px-2.5 py-1 rounded">Financial District</Link>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white border-b border-blue-800/60 pb-2">Get in Touch</h4>
            <ul className="space-y-3.5 text-sm text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{contactConfig.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400 shrink-0" />
                <a href={`tel:${contactConfig.rawPhone}`} className="hover:text-yellow-400 transition-colors">
                  {contactConfig.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400 shrink-0" />
                <a href={`mailto:${contactConfig.email}`} className="hover:text-yellow-400 transition-colors">
                  {contactConfig.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-blue-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} {contactConfig.companyName}. All Rights Reserved. Legally Verified Real Estate Properties.</p>
          <div className="flex space-x-6">
            <Link to="/properties" className="hover:text-gray-200">Properties</Link>
            <Link to="/investment" className="hover:text-gray-200">Investment</Link>
            <Link to="/contact" className="hover:text-gray-200">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
