import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { EMICalculator } from '@/components/EMICalculator';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { whyInvestPointsData } from '@/data/testimonialsData';
import { contactConfig } from '@/config/contactConfig';
import { usePopup } from '@/context/PopupContext';

export const InvestmentPage = () => {
  const { openPopup } = usePopup();

  return (
    <div className="min-h-screen bg-gray-50 pt-[78px] sm:pt-[88px] pb-16">
      <SEOHead
        title="Hyderabad Real Estate Investment Guide & Loan Calculator"
        description="Learn why Hyderabad is India's top real estate investment hub. High capital appreciation, HMDA layout growth, and housing loan EMI calculator."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-blue-950 text-white p-6 sm:p-12 rounded-2xl shadow-lg mb-8 sm:mb-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-3 sm:space-y-4 relative z-10">
            <span className="bg-yellow-500 text-blue-950 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Investment Guide
            </span>
            <h1 className="text-2xl sm:text-5xl font-extrabold leading-tight">
              Why Invest in Hyderabad Real Estate?
            </h1>
            <p className="text-gray-300 text-xs sm:text-base leading-relaxed">
              Discover the compelling economic &amp; infrastructure reasons that make Hyderabad the premier choice for property appreciation and secure land investments.
            </p>
          </div>
        </div>

        {/* 4 Pillars 2-Column Mobile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2.5 sm:gap-8 mb-12 sm:mb-16">
          {whyInvestPointsData.map((point) => (
            <div key={point.id} className="bg-white p-3 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-2">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-blue-900 text-yellow-400 p-1.5 sm:p-3 rounded-lg shrink-0">
                  <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-xs sm:text-xl font-bold text-blue-950 line-clamp-1">{point.title}</h3>
              </div>
              <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed sm:pl-12 line-clamp-4">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Calculator Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-3xl font-extrabold text-blue-950 mb-1 sm:mb-2">Calculate Your Property Loan EMI</h2>
            <p className="text-xs sm:text-sm text-gray-600">Plan your property investment with our instant home loan calculator</p>
          </div>
          <EMICalculator />
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-6 sm:p-10 rounded-2xl text-center space-y-4">
          <h3 className="text-xl sm:text-3xl font-bold">Looking for Custom Investment Advice?</h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
            Get in touch with {contactConfig.companyName} experts on WhatsApp for personalized property options matching your budget.
          </p>
          <Button variant="yellow" size="lg" className="font-bold text-xs sm:text-base px-6 py-2.5 text-blue-950" onClick={() => openPopup()}>
            <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-emerald-800" /> Connect on WhatsApp
          </Button>
        </div>

      </div>
    </div>
  );
};
