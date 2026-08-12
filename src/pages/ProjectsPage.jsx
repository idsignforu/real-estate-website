import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { ProjectCard } from '@/components/ProjectCard';
import { projectsData } from '@/data/projectsData';

export const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-[78px] sm:pt-[88px] pb-16">
      <SEOHead
        title="Gated Township Projects in Hyderabad | HMDA & DTCP Approved"
        description="Explore mega gated plot layouts and villa townships across Shankarpally, Adibatla, Tukkuguda and Kollur Hyderabad by PropertyForHappy."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-950 mb-2">
            Township Projects in Hyderabad
          </h1>
          <p className="text-xs sm:text-base text-gray-600 max-w-3xl">
            Integrated plot layouts and luxury gated villa developments built with 100% legal approvals, modern infrastructure, and high growth potential.
          </p>
        </div>

        {/* 2-Column Mobile Grid, 3-Column Desktop Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};
