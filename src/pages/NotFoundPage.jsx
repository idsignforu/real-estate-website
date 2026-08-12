import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building2, MapPin, Phone, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20 pb-16 px-4">
      <SEOHead title="404 Page Not Found" description="The page you requested could not be found." />

      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-200 shadow-md text-center space-y-6">
        <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-blue-900 font-extrabold text-3xl">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-blue-950">Page Not Found</h1>
          <p className="text-sm text-gray-600">
            The page you are looking for does not exist or may have been moved.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link to="/" className="w-full">
            <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold">
              <Home className="h-4 w-4 mr-1.5" /> Home Page
            </Button>
          </Link>

          <Link to="/properties" className="w-full">
            <Button variant="outline" className="w-full text-blue-900 border-blue-900 hover:bg-blue-50 text-xs font-semibold">
              <Building2 className="h-4 w-4 mr-1.5" /> Properties
            </Button>
          </Link>

          <Link to="/locations" className="w-full">
            <Button variant="outline" className="w-full text-blue-900 border-blue-900 hover:bg-blue-50 text-xs font-semibold">
              <MapPin className="h-4 w-4 mr-1.5" /> Locations
            </Button>
          </Link>

          <Link to="/contact" className="w-full">
            <Button variant="outline" className="w-full text-blue-900 border-blue-900 hover:bg-blue-50 text-xs font-semibold">
              <Phone className="h-4 w-4 mr-1.5" /> Contact
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
