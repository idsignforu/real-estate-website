import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';
import { contactConfig } from '@/config/contactConfig';

export const StickyButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-30">
      
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${contactConfig.rawWhatsapp}?text=Hi%2C%20I%20am%20interested%20in%20HMDA%2FDTCP%20approved%20properties%20in%20Hyderabad.`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:p-4 rounded-full shadow-xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Phone Call Button */}
      <a
        href={`tel:${contactConfig.rawPhone}`}
        className="bg-blue-900 hover:bg-blue-800 text-white p-3.5 sm:p-4 rounded-full shadow-xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-800"
        aria-label="Call Now"
      >
        <PhoneCall className="h-6 w-6" />
      </a>

    </div>
  );
};
