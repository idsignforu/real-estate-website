import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const LocationCard = ({ location }) => {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={location.image}
          alt={`Real Estate in ${location.name} Hyderabad`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-0.5">{location.name}</h3>
            <p className="text-xs text-yellow-400 font-medium">{location.tagline}</p>
          </div>
        </div>
      </div>

      <CardContent className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
            {location.description}
          </p>

          <div className="space-y-1">
            {location.keyHighlights.slice(0, 3).map((h, i) => (
              <div key={i} className="flex items-center text-xs text-gray-700">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-emerald-600 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to={`/locations/${location.slug}`} className="w-full">
          <Button variant="outline" className="w-full text-blue-900 border-blue-900 hover:bg-blue-50 font-semibold">
            View Properties in {location.name} <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
