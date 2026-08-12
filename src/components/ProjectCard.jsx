import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const ProjectCard = ({ project }) => {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200 bg-white">
      {/* Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={project.image}
          alt={`${project.name} - ${project.projectType} in ${project.location}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=srgb&fm=jpg&q=85";
          }}
        />
        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex gap-1 flex-wrap">
          <Badge variant="yellow" className="shadow-md text-[9px] sm:text-xs px-1.5 py-0.5 font-bold">
            {project.approval}
          </Badge>
          <Badge variant="default" className="bg-blue-950 text-white shadow-md text-[9px] sm:text-xs px-1.5 py-0.5">
            {project.projectType}
          </Badge>
        </div>
      </div>

      {/* Card Content - Responsive Mobile Compact vs Desktop */}
      <CardContent className="p-2.5 sm:p-4 flex flex-col flex-grow justify-between space-y-2">
        <div className="space-y-1">
          <h3 className="text-xs sm:text-lg font-bold text-blue-950 group-hover:text-blue-700 transition-colors line-clamp-1 leading-snug">
            {project.name}
          </h3>
          <p className="text-[10px] sm:text-xs text-yellow-700 font-semibold line-clamp-1">
            {project.tagline}
          </p>

          <p className="flex items-center text-[11px] sm:text-xs text-gray-600 font-medium">
            <MapPin className="h-3 w-3 mr-0.5 text-red-500 shrink-0" />
            <span className="truncate">{project.location}, Hyderabad</span>
          </p>

          <div className="text-[10px] sm:text-xs space-y-0.5 bg-slate-50 p-1.5 sm:p-2.5 rounded-lg border border-slate-100 mt-1">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Price:</span>
              <span className="font-bold text-blue-900 truncate">{project.priceRange}</span>
            </div>
            {project.totalArea && (
              <div className="hidden sm:flex justify-between items-center">
                <span className="text-gray-500">Area:</span>
                <span className="font-medium text-gray-800 truncate">{project.totalArea}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button - 100% Inside Container */}
        <Link to={`/projects/${project.slug}`} className="w-full">
          <Button 
            className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold text-[10px] sm:text-xs px-1.5 py-1 h-7 sm:h-9 flex items-center justify-center truncate whitespace-nowrap"
          >
            <span className="truncate">Explore Project</span>
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1 shrink-0" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
