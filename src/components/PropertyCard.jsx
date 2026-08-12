import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePopup } from '@/context/PopupContext';

export const PropertyCard = ({ property }) => {
  const { openPopup } = usePopup();

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200">
      {/* Image & Badge Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={property.image}
          alt={`${property.name} - ${property.approval} Approved ${property.type} in ${property.location}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1689574666546-75e1036e55fb?crop=entropy&cs=srgb&fm=jpg&q=85";
          }}
        />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <Badge variant="yellow" className="shadow-md">
            {property.approval} Approved
          </Badge>
          <Badge variant="default" className="bg-blue-900/90 text-white shadow-md">
            {property.type}
          </Badge>
        </div>

        {property.status && (
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm border-none">
              {property.status}
            </Badge>
          </div>
        )}
      </div>

      {/* Card Content */}
      <CardContent className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-blue-950 group-hover:text-blue-700 transition-colors">
              {property.name}
            </h3>
            <span className="text-lg font-extrabold text-blue-900 shrink-0 ml-2">
              {property.price}
            </span>
          </div>

          <p className="flex items-center text-sm text-gray-600 mb-3 font-medium">
            <MapPin className="h-4 w-4 mr-1 text-red-500 shrink-0" />
            {property.location}, Hyderabad
          </p>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3">
            {property.plotSize && (
              <div>
                <span className="text-gray-500 block">Plot Size</span>
                <span className="font-semibold text-gray-800">{property.plotSize}</span>
              </div>
            )}
            {property.builtUpArea && (
              <div>
                <span className="text-gray-500 block">Built-up Area</span>
                <span className="font-semibold text-gray-800">{property.builtUpArea}</span>
              </div>
            )}
            {property.pricePerSqYd && (
              <div>
                <span className="text-gray-500 block">Rate / Sq. Yd</span>
                <span className="font-semibold text-gray-800">{property.pricePerSqYd}</span>
              </div>
            )}
            {property.pricePerSqFt && (
              <div>
                <span className="text-gray-500 block">Rate / Sq. Ft</span>
                <span className="font-semibold text-gray-800">{property.pricePerSqFt}</span>
              </div>
            )}
            {property.facing && (
              <div>
                <span className="text-gray-500 block">Facing</span>
                <span className="font-semibold text-gray-800">{property.facing} Facing</span>
              </div>
            )}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
          <Link to={`/properties/${property.id}`} className="w-full">
            <Button variant="outline" size="sm" className="w-full text-blue-900 border-blue-900 hover:bg-blue-50 font-semibold">
              View Details
            </Button>
          </Link>

          <Button
            size="sm"
            variant="default"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold"
            onClick={() => openPopup({ propertyType: property.type, location: property.location })}
          >
            Enquire Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
