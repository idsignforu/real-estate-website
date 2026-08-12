export const contactConfig = {
  companyName: "PropertyForHappy",
  tagline: "HAPPY HOME, HAPPY LIFE",
  description: "Your trusted real-estate partner for discovering verified HMDA & DTCP approved plots, luxury villas, and modern apartments across Hyderabad's top growth corridors.",
  rawPhone: "919281410305",
  telLink: "tel:+919281410305",
  rawWhatsapp: "919281410305",
  whatsappLink: "https://wa.me/919281410305",
  email: "hello@idesign4u.in",
  mailtoLink: "mailto:hello@idesign4u.in",
  workingHours: "Monday - Sunday: 9:00 AM - 8:00 PM",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6422677891655!2d78.36803931487622!3d17.42587708804944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557fa0ee!2sFinancial%20District%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
};

/**
 * Utility to generate WhatsApp redirection links with clean pre-filled messages
 */
export const openWhatsAppEnquiry = ({ title, fields = {}, defaultMessage = "" }) => {
  const num = contactConfig.rawWhatsapp;
  let textLines = [];

  if (title) {
    textLines.push(`Hello PropertyForHappy,`);
    textLines.push("");
    textLines.push(title);
    textLines.push("");
  } else {
    textLines.push(`Hello PropertyForHappy,`);
    textLines.push("");
  }

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null && value !== "") {
      const formattedValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value;
      textLines.push(`${key}: ${formattedValue}`);
    }
  }

  if (defaultMessage) {
    textLines.push("");
    textLines.push(`Message: ${defaultMessage}`);
  }

  textLines.push("");
  textLines.push("Please share suitable available properties and details.");
  textLines.push("Thank you.");

  const messageText = textLines.join("\n");
  const whatsappUrl = `https://wa.me/${num}?text=${encodeURIComponent(messageText)}`;
  
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  return whatsappUrl;
};
