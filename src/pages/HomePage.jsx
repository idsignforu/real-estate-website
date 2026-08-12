import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, TrendingUp, CheckCircle, ArrowRight, Building, Building2, Home, MapPin, Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';
import { PropertyCard } from '@/components/PropertyCard';
import { ProjectCard } from '@/components/ProjectCard';
import { LocationCard } from '@/components/LocationCard';
import { EMICalculator } from '@/components/EMICalculator';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { propertiesData } from '@/data/propertiesData';
import { projectsData } from '@/data/projectsData';
import { locationsData } from '@/data/locationsData';
import { testimonialsData, whyInvestPointsData } from '@/data/testimonialsData';
import { contactConfig } from '@/config/contactConfig';
import { usePopup } from '@/context/PopupContext';

export const HomePage = () => {
  const { openPopup } = usePopup();
  const featuredProperties = propertiesData.filter(p => p.featured).slice(0, 3);
  const featuredProjects = projectsData.slice(0, 3);
  const topLocations = locationsData.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <SEOHead
        title="HMDA & DTCP Approved Plots, Villas & Flats in Hyderabad"
        description="Invest in legally verified HMDA & DTCP approved open plots, villas and flats in Shankarpally, Adibatla, Kokapet, and Financial District Hyderabad with iDesign4U Properties."
      />

      {/* Hero Section */}
      <section 
        className="relative h-[85vh] min-h-[550px] max-h-[750px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.78)), url('https://images.unsplash.com/photo-1636970333550-2ce3aeda6754?crop=entropy&cs=srgb&fm=jpg&q=85')`
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/20 border border-yellow-400/40 px-4 py-1.5 rounded-full backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-yellow-400" />
            <span className="text-xs sm:text-sm font-semibold text-yellow-300">100% HMDA &amp; DTCP Approved Properties</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Invest in Approved Plots &amp; Luxury Villas in Hyderabad
          </h1>

          <p className="text-base sm:text-xl text-gray-200 max-w-3xl mx-auto font-normal leading-relaxed">
            Legally verified titles, immediate bank loan clearance, and high capital growth potential across Shankarpally, Adibatla, Kollur &amp; Kokapet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/properties">
              <Button size="lg" variant="yellow" className="w-full sm:w-auto text-base px-8 py-3.5 font-bold text-blue-950">
                Explore Properties <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>

            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto border-2 border-white bg-blue-900/60 hover:bg-white text-white hover:text-blue-950 font-bold text-base px-8 py-3.5 backdrop-blur-md transition-all"
              onClick={() => openPopup()}
            >
              <WhatsAppIcon className="h-5 w-5 mr-2 text-emerald-400" />
              Get Exclusive Offers
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="bg-blue-950 text-white py-6 border-y border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <h4 className="text-xl sm:text-2xl font-extrabold text-yellow-400">100%</h4>
            <p className="text-xs text-gray-300 font-medium">Clear Title Guarantee</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-xl sm:text-2xl font-extrabold text-yellow-400">HMDA &amp; DTCP</h4>
            <p className="text-xs text-gray-300 font-medium">Verified Layout Approvals</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-xl sm:text-2xl font-extrabold text-yellow-400">80% Loan</h4>
            <p className="text-xs text-gray-300 font-medium">Nationalized Bank Assistance</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-xl sm:text-2xl font-extrabold text-yellow-400">15%+ p.a.</h4>
            <p className="text-xs text-gray-300 font-medium">High Appreciation ROI</p>
          </div>
        </div>
      </section>

      {/* Featured Properties Section (Compact 2-col on mobile) */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="yellow" className="mb-2">Featured Listings</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950">
              Verified Properties in Hyderabad
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Explore handpicked open plots, villas, and apartments ready for investment
            </p>
          </div>
          <Link to="/properties">
            <Button variant="outline" className="text-blue-950 border-blue-950 hover:bg-blue-50 font-semibold text-xs sm:text-sm">
              View All Properties ({propertiesData.length}) <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Property Categories Shortcut Bar */}
      <section className="bg-blue-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Browse Properties by Type</h2>
            <p className="text-sm text-gray-200">Find exactly what suits your budget and requirement</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link to="/properties/plots" className="bg-white/10 hover:bg-white/20 p-6 rounded-xl border border-white/20 transition-all text-center group">
              <Building className="h-10 w-10 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-1">Open Plots</h3>
              <p className="text-xs text-gray-300">HMDA &amp; DTCP Layouts</p>
            </Link>

            <Link to="/properties/villas" className="bg-white/10 hover:bg-white/20 p-6 rounded-xl border border-white/20 transition-all text-center group">
              <Home className="h-10 w-10 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-1">Villas</h3>
              <p className="text-xs text-gray-300">Independent Luxury Homes</p>
            </Link>

            <Link to="/properties/apartments" className="bg-white/10 hover:bg-white/20 p-6 rounded-xl border border-white/20 transition-all text-center group">
              <Building2 className="h-10 w-10 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-1">Apartments</h3>
              <p className="text-xs text-gray-300">2, 3 &amp; 4 BHK Gated Flats</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="outline" className="mb-2 text-blue-950 border-blue-950">Township Projects</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950">
              Ongoing Mega Developments
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Integrated plot layouts and gated villa communities across prime growth corridors
            </p>
          </div>
          <Link to="/projects">
            <Button variant="outline" className="text-blue-950 border-blue-950 hover:bg-blue-50 font-semibold text-xs sm:text-sm">
              Explore All Projects <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Locations Showcase */}
      <section className="bg-slate-100 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge variant="yellow" className="mb-2">Prime Hubs</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 mb-3">
              Top Real Estate Locations in Hyderabad
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Invest in strategic growth corridors with Outer Ring Road connectivity &amp; IT hubs
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {topLocations.map((loc) => (
              <LocationCard key={loc.slug} location={loc} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/locations">
              <Button size="lg" className="bg-blue-950 hover:bg-blue-900 text-white font-semibold">
                Explore All Locations Directory <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Investment & EMI Calculator Section */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="yellow">Investment Insights</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 leading-tight">
              Why Invest in Hyderabad Real Estate Today?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Hyderabad is recognized as India's top real estate investment market due to rapid infrastructure development, booming IT corridors, and strong capital returns.
            </p>

            <div className="space-y-4 pt-2">
              {whyInvestPointsData.slice(0, 3).map((pt) => (
                <div key={pt.id} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{pt.title}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">{pt.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link to="/investment">
                <Button className="bg-blue-950 hover:bg-blue-900 text-white font-semibold">
                  Read Investment Guide <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <EMICalculator />
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-blue-950 mb-2">What Our Customers Say</h2>
            <p className="text-gray-600 text-sm">Trusted by hundreds of real estate investors across Hyderabad</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((t) => (
              <div key={t.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-950 text-yellow-400 font-bold flex items-center justify-center text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                    <p className="text-xs text-gray-500">{t.location}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
                <div className="flex text-yellow-400 space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-blue-950 to-blue-900 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">Ready to Secure Your Plot or Flat in Hyderabad?</h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Contact our legal and site assistance team today for free site visits, layout plans, and document verification.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Button variant="yellow" size="lg" className="font-bold text-base px-8 text-blue-950" onClick={() => openPopup()}>
              <WhatsAppIcon className="h-5 w-5 mr-2 text-emerald-800" />
              Schedule Free Site Visit
            </Button>
            <a href={contactConfig.telLink}>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-950 font-bold text-base px-8 w-full sm:w-auto">
                <Phone className="h-4 w-4 mr-2" /> Call Support
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
