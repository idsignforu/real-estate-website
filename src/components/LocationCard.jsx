import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const LocationCard = ({ location }) => {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200 bg-white">
      {/* Image & Gradient Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={location.image}
          alt={`Real Estate in ${location.name} Hyderabad`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1577495508048-b635879837f1?crop=entropy&cs=srgb&fm=jpg&q=85";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-2.5 sm:p-4">
          <div className="min-w-0 w-full">
            <h3 className="text-sm sm:text-2xl font-bold text-white mb-0.5 truncate">{location.name}</h3>
            <p className="text-[10px] sm:text-xs text-yellow-400 font-semibold line-clamp-1">{location.tagline}</p>
          </div>
        </div>
      </div>

      {/* Card Content - Responsive Mobile Compact vs Desktop */}
      <CardContent className="p-2.5 sm:p-4 flex flex-col flex-grow justify-between space-y-2.5">
        <div className="space-y-1.5">
          <p className="text-[11px] sm:text-xs text-gray-600 line-clamp-2 leading-tight">
            {location.description}
          </p>

          {/* Highlights (Shown on Tablet & Desktop or Compact 2 items on mobile) */}
          <div className="space-y-1 pt-0.5">
            {location.keyHighlights.slice(0, 2).map((h, i) => (
              <div key={i} className="flex items-center text-[10px] sm:text-xs text-gray-700 min-w-0">
                <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 text-emerald-600 shrink-0" />
                <span className="truncate">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button - 100% Inside Container with Zero Overflow */}
        <Link to={`/locations/${location.slug}`} className="w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-blue-950 border-blue-950 hover:bg-blue-50 font-bold text-[10px] sm:text-xs px-1.5 py-1 h-7 sm:h-9 flex items-center justify-center truncate whitespace-nowrap"
          >
            <span className="truncate">View Properties</span>
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1 shrink-0" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
