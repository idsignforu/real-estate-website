import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ShieldCheck, CheckCircle2, Phone, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SEOHead } from '@/components/SEOHead';
import { PropertyCard } from '@/components/PropertyCard';
import { projectsData } from '@/data/projectsData';
import { propertiesData } from '@/data/propertiesData';
import { contactConfig } from '@/config/contactConfig';
import { usePopup } from '@/context/PopupContext';

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { openPopup } = usePopup();

  const project = projectsData.find(p => p.slug === slug || p.id === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Project Not Found</h2>
          <p className="text-gray-600 text-sm">The project you requested is unavailable.</p>
          <Link to="/projects">
            <Button className="bg-blue-900 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" /> View All Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Find properties belonging to this project
  const projectProperties = propertiesData.filter(p => p.projectId === project.id || p.location === project.location);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <SEOHead
        title={`${project.name} - ${project.approval} in ${project.location}`}
        description={`${project.name} offers ${project.projectType} in ${project.location} Hyderabad. ${project.tagline}. Price range: ${project.priceRange}.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-10 bg-slate-950">
          <div className="aspect-[21/9] min-h-[300px] max-h-[450px]">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/50 to-transparent p-6 sm:p-10 flex flex-col justify-end text-white">
            <div className="flex gap-2 mb-2">
              <Badge variant="yellow">{project.approval}</Badge>
              <Badge variant="default" className="bg-blue-900 text-white">{project.projectType}</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-1">{project.name}</h1>
            <p className="text-yellow-400 font-semibold text-sm sm:text-lg mb-3">{project.tagline}</p>
            <p className="flex items-center text-sm text-gray-200">
              <MapPin className="h-4 w-4 mr-1 text-red-400" />
              {project.location}, Hyderabad
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-blue-950 border-b pb-3">Project Overview</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {project.overview}
              </p>

              {/* Highlights */}
              <div className="pt-4">
                <h4 className="font-bold text-gray-900 text-sm mb-3">Key Project Highlights:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-blue-950 border-b pb-3">Infrastructure &amp; Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.amenities.map((am, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs sm:text-sm font-semibold text-gray-800 flex items-center">
                    <ShieldCheck className="h-4 w-4 text-blue-900 mr-2 shrink-0" />
                    {am}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Action Card */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 border border-gray-200 shadow-md space-y-4 bg-white">
              <div className="border-b pb-3">
                <span className="text-xs text-gray-500 block">Investment Price Range</span>
                <span className="text-2xl font-extrabold text-blue-900">{project.priceRange}</span>
              </div>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span>Township Area:</span>
                  <span className="font-bold text-gray-900">{project.totalArea}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span>Status:</span>
                  <span className="font-bold text-gray-900">{project.status}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span>Approval:</span>
                  <span className="font-bold text-emerald-700">{project.approval}</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <Button variant="yellow" className="w-full font-bold" onClick={() => openPopup({ location: project.location })}>
                  Request Brochure &amp; Price List
                </Button>
                <a href={contactConfig.telLink} className="block">
                  <Button variant="outline" className="w-full text-blue-950 border-blue-950 hover:bg-blue-50 font-bold">
                    <Phone className="h-4 w-4 mr-2 text-blue-900" /> Call Support
                  </Button>
                </a>
              </div>
            </Card>
          </div>

        </div>

        {/* Properties Available in Project */}
        {projectProperties.length > 0 && (
          <div className="border-t pt-12">
            <h3 className="text-2xl font-extrabold text-blue-950 mb-6">Available Units in {project.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projectProperties.map(prop => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
