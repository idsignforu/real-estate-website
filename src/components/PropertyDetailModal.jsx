import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ShieldCheck, CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { contactConfig } from '@/config/contactConfig';
import { usePopup } from '@/context/PopupContext';
import { Link } from 'react-router-dom';

export const PropertyDetailModal = ({ property, isOpen, onClose }) => {
  const { openPopup } = usePopup();
  const [activeImg, setActiveImg] = useState(0);

  if (!property) return null;

  const gallery = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl">
        <DialogHeader className="pr-6 space-y-1 text-left">
          <div className="flex gap-2 mb-1 flex-wrap">
            <Badge variant="yellow" className="text-[11px] px-2 py-0.5">
              {property.approval} Approved
            </Badge>
            <Badge variant="default" className="bg-blue-900 text-white text-[11px] px-2 py-0.5">
              {property.type}
            </Badge>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-blue-950 leading-tight">
            {property.name}
          </DialogTitle>
          <DialogDescription className="flex items-center text-xs text-gray-600 font-medium">
            <MapPin className="h-3.5 w-3.5 mr-1 text-red-500 shrink-0" />
            {property.location}, Hyderabad
          </DialogDescription>
        </DialogHeader>

        {/* Gallery / Image View */}
        <div className="space-y-2 mt-2">
          <div className="aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            <img
              src={gallery[activeImg]}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-14 h-10 rounded-md overflow-hidden border-2 shrink-0 ${
                    activeImg === i ? 'border-yellow-500' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price & Key Specs */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 mt-3">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-xs text-gray-500 font-semibold uppercase">Offer Price</span>
            <span className="text-xl font-extrabold text-blue-900">{property.price}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {property.plotSize && (
              <div>
                <span className="text-gray-500 block">Plot Size</span>
                <span className="font-bold text-gray-800">{property.plotSize}</span>
              </div>
            )}
            {property.builtUpArea && (
              <div>
                <span className="text-gray-500 block">Built-up Area</span>
                <span className="font-bold text-gray-800">{property.builtUpArea}</span>
              </div>
            )}
            {property.pricePerSqYd && (
              <div>
                <span className="text-gray-500 block">Rate / Sq. Yd</span>
                <span className="font-bold text-gray-800">{property.pricePerSqYd}</span>
              </div>
            )}
            {property.facing && (
              <div>
                <span className="text-gray-500 block">Facing</span>
                <span className="font-bold text-gray-800">{property.facing} Facing</span>
              </div>
            )}
          </div>
        </div>

        {/* Overview */}
        <div className="space-y-2 mt-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <h4 className="font-bold text-blue-950 text-sm border-b pb-1">Property Description</h4>
          <p className="line-clamp-3">{property.description}</p>
        </div>

        {/* Quick Action CTAs */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 mt-4">
          <a
            href={contactConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5">
              <WhatsAppIcon className="h-4 w-4 mr-1.5" /> WhatsApp
            </Button>
          </a>

          <a href={contactConfig.telLink} className="w-full">
            <Button size="sm" variant="outline" className="w-full text-blue-950 border-blue-950 font-bold text-xs py-2.5">
              <Phone className="h-4 w-4 mr-1.5" /> Call
            </Button>
          </a>
        </div>

        <div className="pt-2">
          <Link to={`/properties/${property.id}`} onClick={onClose} className="block w-full">
            <Button size="sm" variant="yellow" className="w-full font-bold text-blue-950 text-xs">
              View Full Detailed Page <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        </div>

      </DialogContent>
    </Dialog>
  );
};
