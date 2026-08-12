import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, CheckCircle2, ArrowLeft, Phone, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/SEOHead';
import { PropertyCard } from '@/components/PropertyCard';
import { locationsData } from '@/data/locationsData';
import { propertiesData } from '@/data/propertiesData';
import { contactConfig } from '@/config/contactConfig';
import { usePopup } from '@/context/PopupContext';

export const LocationDetailPage = () => {
  const { slug } = useParams();
  const { openPopup } = usePopup();

  const location = locationsData.find(l => l.slug === slug);

  // Fallback for custom location URL
  const locName = location ? location.name : slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Hyderabad';
  const locObj = location || {
    name: locName,
    tagline: `Prime Real Estate Destination in ${locName}`,
    description: `${locName} is one of Hyderabad's fast growing commercial and residential hubs with great infrastructure and connectivity.`,
    image: "https://images.unsplash.com/photo-1636970333550-2ce3aeda6754?crop=entropy&cs=srgb&fm=jpg&q=85",
    keyHighlights: ["Direct ORR Access", "High Rental Yield", "HMDA Layouts", "Near IT Parks"],
    propertyTypes: ["Apartments", "Villas", "Plots"]
  };

  // Find matching properties for this location
  const locationProperties = propertiesData.filter(
    p => p.location.toLowerCase() === locName.toLowerCase() || p.locationSlug === slug
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <SEOHead
        title={`HMDA & DTCP Approved Properties in ${locObj.name} Hyderabad`}
        description={`Invest in open plots, villas, and apartments in ${locObj.name} Hyderabad. ${locObj.description}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-10 bg-slate-950">
          <div className="aspect-[21/9] min-h-[250px] max-h-[380px]">
            <img
              src={locObj.image}
              alt={`Real Estate in ${locObj.name}`}
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent p-6 sm:p-10 flex flex-col justify-end text-white">
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-1">Properties in {locObj.name}</h1>
            <p className="text-yellow-400 font-semibold text-sm sm:text-base mb-2">{locObj.tagline}</p>
            <p className="text-xs sm:text-sm text-gray-200 max-w-2xl">{locObj.description}</p>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-10">
          <h3 className="text-lg font-bold text-blue-950 mb-3">Key Location Highlights for {locObj.name}:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {locObj.keyHighlights.map((h, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Properties in this location */}
        <div className="space-y-6 mb-12">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-extrabold text-blue-950">
              Available Properties in {locObj.name} ({locationProperties.length})
            </h2>
            <Button variant="yellow" size="sm" onClick={() => openPopup({ location: locObj.name })}>
              Enquire for {locObj.name} Plots
            </Button>
          </div>

          {locationProperties.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6">
              {locationProperties.map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center space-y-3 bg-white">
              <Building2 className="h-10 w-10 text-gray-400 mx-auto" />
              <h4 className="font-bold text-gray-800">New Layouts Coming Soon in {locObj.name}</h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                We are launching pre-approval HMDA layouts in {locObj.name}. Contact our team for exclusive pre-launch booking offers.
              </p>
              <Button onClick={() => openPopup({ location: locObj.name })} variant="outline" className="text-blue-900 border-blue-900">
                Register Interest for {locObj.name}
              </Button>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
};
