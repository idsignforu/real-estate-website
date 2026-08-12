import React from 'react';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { contactConfig } from '@/config/contactConfig';

export const StickyButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-30">
      
      {/* Floating WhatsApp Button */}
      <a
        href={contactConfig.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>

      {/* Floating Phone Call Button */}
      <a
        href={contactConfig.telLink}
        className="bg-blue-950 hover:bg-blue-900 text-yellow-400 p-3.5 sm:p-4 rounded-full shadow-2xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-800"
        aria-label="Call iDesign4U Properties"
      >
        <Phone className="h-6 w-6" />
      </a>

    </div>
  );
};
