import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const ProjectCard = ({ project }) => {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={project.image}
          alt={`${project.name} - ${project.projectType} in ${project.location}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="yellow" className="shadow-md">
            {project.approval}
          </Badge>
          <Badge variant="default" className="bg-blue-900 text-white shadow-md">
            {project.projectType}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold text-blue-950 group-hover:text-blue-700 transition-colors mb-1">
            {project.name}
          </h3>
          <p className="text-xs text-yellow-600 font-semibold mb-2">
            {project.tagline}
          </p>

          <p className="flex items-center text-sm text-gray-600 mb-3 font-medium">
            <MapPin className="h-4 w-4 mr-1 text-red-500 shrink-0" />
            {project.location}, Hyderabad
          </p>

          <div className="text-xs space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="flex justify-between">
              <span className="text-gray-500">Price Range:</span>
              <span className="font-bold text-blue-900">{project.priceRange}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Township Area:</span>
              <span className="font-medium text-gray-800">{project.totalArea}</span>
            </div>
          </div>
        </div>

        <Link to={`/projects/${project.slug}`} className="w-full">
          <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold">
            Explore Township <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
