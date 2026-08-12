import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { LocationCard } from '@/components/LocationCard';
import { locationsData } from '@/data/locationsData';

export const LocationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <SEOHead
        title="Prime Real Estate Locations in Hyderabad | Kokapet, Tellapur, Kollur, Gachibowli"
        description="Explore top Hyderabad real estate investment hubs across Western, Southern and Suburban corridors including Kokapet, Narsingi, Tellapur, Kollur, Gachibowli & Financial District."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 mb-2">
            Hyderabad Real Estate Locations Directory
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl">
            Strategic investment destinations offering high growth, Outer Ring Road access, and clear title HMDA/DTCP layouts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locationsData.map((loc) => (
            <LocationCard key={loc.slug} location={loc} />
          ))}
        </div>
      </div>
    </div>
  );
};
