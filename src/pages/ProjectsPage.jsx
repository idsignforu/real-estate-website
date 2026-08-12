import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { ProjectCard } from '@/components/ProjectCard';
import { projectsData } from '@/data/projectsData';

export const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <SEOHead
        title="Gated Township Projects in Hyderabad | HMDA & DTCP Approved"
        description="Explore mega gated plot layouts and villa townships across Shankarpally, Adibatla, Tukkuguda and Kollur Hyderabad by iDesign4U Properties."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 mb-2">
            Township Projects in Hyderabad
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl">
            Integrated plot layouts and luxury gated villa developments built with 100% legal approvals, modern infrastructure, and high growth potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};
