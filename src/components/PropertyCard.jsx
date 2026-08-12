import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { usePopup } from '@/context/PopupContext';
import { PropertyDetailModal } from '@/components/PropertyDetailModal';

export const PropertyCard = ({ property }) => {
  const { openPopup } = usePopup();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200 bg-white">
        
        {/* Image & Badge Container */}
        <div 
          className="relative aspect-[16/10] overflow-hidden bg-gray-100 cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <img
            src={property.image}
            alt={`${property.name} - ${property.approval} Approved ${property.type} in ${property.location}`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1689574666546-75e1036e55fb?crop=entropy&cs=srgb&fm=jpg&q=85";
            }}
          />
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex gap-1 flex-wrap">
            <Badge variant="yellow" className="shadow-md text-[9px] sm:text-xs px-1.5 py-0.5 font-bold">
              {property.approval}
            </Badge>
            <Badge variant="default" className="bg-blue-950 text-white shadow-md text-[9px] sm:text-xs px-1.5 py-0.5">
              {property.type}
            </Badge>
          </div>

          {property.status && (
            <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2">
              <Badge variant="secondary" className="bg-black/75 text-white backdrop-blur-sm border-none text-[9px] sm:text-[10px] px-1.5 py-0.5">
                {property.status}
              </Badge>
            </div>
          )}
        </div>

        {/* Card Content - Responsive Mobile Compact vs Desktop */}
        <CardContent className="p-2.5 sm:p-4 flex flex-col flex-grow justify-between space-y-2">
          
          <div className="cursor-pointer" onClick={() => setModalOpen(true)}>
            <div className="flex flex-col sm:flex-row justify-between items-start mb-0.5 gap-0.5">
              <h3 className="text-xs sm:text-lg font-bold text-blue-950 group-hover:text-blue-700 transition-colors line-clamp-1 leading-snug">
                {property.name}
              </h3>
              <span className="text-xs sm:text-base font-extrabold text-blue-900 shrink-0">
                {property.price}
              </span>
            </div>

            <p className="flex items-center text-[11px] sm:text-xs text-gray-600 mb-1 font-medium">
              <MapPin className="h-3 w-3 mr-0.5 text-red-500 shrink-0" />
              <span className="truncate">{property.location}, Hyderabad</span>
            </p>

            {/* Detailed Specs Matrix (Desktop & Tablet) */}
            <div className="hidden sm:grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-2">
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
              {property.facing && (
                <div>
                  <span className="text-gray-500 block">Facing</span>
                  <span className="font-semibold text-gray-800">{property.facing} Facing</span>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs (Robust 2-column flex layout with zero text clipping) */}
          <div className="grid grid-cols-2 gap-1 pt-1.5 border-t border-gray-100">
            <Link to={`/properties/${property.id}`} className="w-full">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-blue-950 border-blue-950 hover:bg-blue-50 font-bold text-[10px] sm:text-xs px-1 py-1 h-7 sm:h-9 flex items-center justify-center truncate whitespace-nowrap"
              >
                View Details
              </Button>
            </Link>

            <Button
              size="sm"
              variant="default"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] sm:text-xs px-1 py-1 h-7 sm:h-9 flex items-center justify-center truncate whitespace-nowrap"
              onClick={() => openPopup({ propertyType: property.type, location: property.location })}
            >
              <WhatsAppIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-0.5 sm:mr-1 shrink-0" />
              <span className="truncate">Enquire</span>
            </Button>
          </div>

        </CardContent>
      </Card>

      {/* Property Details Modal for Mobile scanning */}
      <PropertyDetailModal
        property={property}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
