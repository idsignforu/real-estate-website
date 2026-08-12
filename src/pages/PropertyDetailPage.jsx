import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, ShieldCheck, CheckCircle2, Phone, 
  ChevronRight, ArrowLeft, Share2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/SEOHead';
import { EMICalculator } from '@/components/EMICalculator';
import { PropertyCard } from '@/components/PropertyCard';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { propertiesData } from '@/data/propertiesData';
import { contactConfig } from '@/config/contactConfig';
import { usePopup } from '@/context/PopupContext';
import { toast } from 'sonner';

export const PropertyDetailPage = () => {
  const { id } = useParams();
  const { openPopup } = usePopup();

  const property = propertiesData.find(p => p.id === id || p.slug === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Property Not Found</h2>
          <p className="text-gray-600 text-sm">The property you are looking for may have been updated or removed.</p>
          <Link to="/properties">
            <Button className="bg-blue-950 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];
  const relatedProperties = propertiesData
    .filter(p => p.id !== property.id && (p.location === property.location || p.category === property.category))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.name,
        text: `Check out ${property.name} in ${property.location} - ${property.approval} Approved ${property.type}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Property link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <SEOHead
        title={`${property.name} - ${property.approval} Approved ${property.type} in ${property.location}`}
        description={`${property.name} offers ${property.type} in ${property.location} Hyderabad. Price: ${property.price}. 100% HMDA & DTCP clear titles with bank loan availability.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-blue-950">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/properties" className="hover:text-blue-950">Properties</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">{property.name}</span>
        </div>

        {/* Top Header & Price */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2 flex-wrap gap-y-2">
              <Badge variant="yellow">{property.approval} Approved</Badge>
              <Badge variant="default" className="bg-blue-950 text-white">{property.type}</Badge>
              {property.status && <Badge variant="outline">{property.status}</Badge>}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-950">{property.name}</h1>
            <p className="flex items-center text-sm text-gray-600 mt-1 font-medium">
              <MapPin className="h-4 w-4 mr-1 text-red-500 shrink-0" />
              {property.location}, Hyderabad, Telangana
            </p>
          </div>

          <div className="flex items-center space-x-4 w-full lg:w-auto justify-between lg:justify-end">
            <div>
              <span className="text-xs text-gray-500 block">Offer Price</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-900">{property.price}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleShare} className="text-gray-700">
              <Share2 className="h-4 w-4 mr-1.5" /> Share
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          <div className="lg:col-span-8 bg-gray-900 rounded-xl overflow-hidden aspect-[16/10] shadow-md relative">
            <img
              src={galleryImages[activeImageIndex]}
              alt={`${property.name} Image ${activeImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Photo Gallery ({galleryImages.length})</h4>
              <div className="grid grid-cols-3 gap-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-yellow-500 ring-2 ring-yellow-500/50' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Action Box */}
            <Card className="bg-blue-950 text-white border-none p-5 shadow-lg space-y-3">
              <h4 className="text-lg font-bold text-yellow-400">Interested in this Property?</h4>
              <p className="text-xs text-gray-300">Get instant legal layout documents, price breakdown &amp; book a free site visit.</p>
              
              <div className="space-y-2.5 pt-1">
                <Button 
                  variant="yellow" 
                  className="w-full font-bold text-blue-950"
                  onClick={() => openPopup({ propertyType: property.type, location: property.location })}
                >
                  Request Callback &amp; Details
                </Button>
                
                <a 
                  href={contactConfig.whatsappLink}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block"
                >
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                    <WhatsAppIcon className="h-4 w-4 mr-2" /> Chat on WhatsApp
                  </Button>
                </a>

                <a href={contactConfig.telLink} className="block">
                  <Button variant="outlineDark" className="w-full">
                    <Phone className="h-4 w-4 mr-2 text-yellow-400" /> Call for Assistance
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Specifications & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-blue-950 border-b pb-3">Property Overview</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {property.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs sm:text-sm">
                {property.plotSize && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-gray-500 block text-xs">Plot Size</span>
                    <span className="font-bold text-gray-900">{property.plotSize}</span>
                  </div>
                )}
                {property.builtUpArea && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-gray-500 block text-xs">Built-up Area</span>
                    <span className="font-bold text-gray-900">{property.builtUpArea}</span>
                  </div>
                )}
                {property.pricePerSqYd && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-gray-500 block text-xs">Rate / Sq. Yd</span>
                    <span className="font-bold text-gray-900">{property.pricePerSqYd}</span>
                  </div>
                )}
                {property.pricePerSqFt && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-gray-500 block text-xs">Rate / Sq. Ft</span>
                    <span className="font-bold text-gray-900">{property.pricePerSqFt}</span>
                  </div>
                )}
                {property.facing && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-gray-500 block text-xs">Facing</span>
                    <span className="font-bold text-gray-900">{property.facing} Facing</span>
                  </div>
                )}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-gray-500 block text-xs">Bank Loan</span>
                  <span className="font-bold text-emerald-700">Up to 80% Sanctioned</span>
                </div>
              </div>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-blue-950 border-b pb-3">Project Amenities &amp; Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <EMICalculator />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="border border-gray-200 shadow-sm p-5 space-y-4 bg-white">
              <h4 className="font-bold text-blue-950 text-base flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-red-500" /> Location Map
              </h4>
              <p className="text-xs text-gray-600">
                Situated in prime growth zone of {property.location}, Hyderabad with fast ORR access.
              </p>
              
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  title={`Map location for ${property.name}`}
                  src={contactConfig.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </Card>

            <Card className="bg-yellow-500/10 border border-yellow-400/40 p-5 space-y-3">
              <h4 className="font-bold text-blue-950 text-sm flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-blue-900" /> Verified Clear Titles
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                All property title documents are legally vetted by senior advocates. Spot registration &amp; bank loan assistance provided.
              </p>
            </Card>
          </div>

        </div>

        {relatedProperties.length > 0 && (
          <div className="border-t pt-12">
            <h3 className="text-2xl font-extrabold text-blue-950 mb-6">Similar Properties in {property.location}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
              {relatedProperties.map(rel => (
                <PropertyCard key={rel.id} property={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
