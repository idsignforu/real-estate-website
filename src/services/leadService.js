import { contactConfig, openWhatsAppEnquiry } from '@/config/contactConfig';

/**
 * WhatsApp Lead Submission Engine for PropertyForHappy
 */
export const submitLead = async (leadType, formData) => {
  // Validate Indian mobile number
  if (formData.phone && !validateIndianPhone(formData.phone)) {
    return { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' };
  }

  // Format pre-filled WhatsApp message based on form type
  let title = "I am interested in real estate properties in Hyderabad.";
  let fields = {};

  if (leadType === 'popup_enquiry') {
    title = "I am interested in properties in Hyderabad.";
    fields = {
      "Name": formData.name,
      "Phone": formData.phone,
      "Property Type": formData.propertyType || "Any",
      "Budget": formData.budgetRange || "Flexible",
      "Preferred Location": formData.preferredLocation || "Hyderabad",
      "Callback Requested": formData.requestCallback ? "Yes" : "No"
    };
  } else if (leadType === 'property_enquiry') {
    title = `I am interested in this property:\n\nProperty: ${formData.propertyName || 'Property Detail'}\nLocation: ${formData.location || 'Hyderabad'}\nProperty Type: ${formData.propertyType || ''}\nPrice: ${formData.price || ''}`;
    fields = {
      "Name": formData.name,
      "Phone": formData.phone,
      "Email": formData.email || ""
    };
  } else if (leadType === 'contact_enquiry') {
    title = "I would like to get in touch regarding real-estate properties in Hyderabad.";
    fields = {
      "Name": formData.name,
      "Phone": formData.phone,
      "Email": formData.email || "",
      "Property Type": formData.propertyType || "",
      "Budget": formData.budget || ""
    };
  } else if (leadType === 'site_visit') {
    title = "I would like to request a property/site visit.";
    fields = {
      "Name": formData.name,
      "Phone": formData.phone,
      "Property / Location": formData.propertyLocation || "Hyderabad",
      "Preferred Date": formData.preferredDate || "Earliest Available",
      "Preferred Time": formData.preferredTime || "Morning"
    };
  } else if (leadType === 'project_enquiry') {
    title = `I am interested in the following township project:\n\nProject: ${formData.projectName}\nLocation: ${formData.location}`;
    fields = {
      "Name": formData.name,
      "Phone": formData.phone
    };
  } else if (leadType === 'location_enquiry') {
    title = `I am looking for properties in:\n\nLocation: ${formData.location}`;
    fields = {
      "Name": formData.name,
      "Phone": formData.phone,
      "Property Type": formData.propertyType || "Any",
      "Budget": formData.budget || "Flexible"
    };
  } else if (leadType === 'advertise') {
    title = "I am interested in advertising/listing a property or project with PropertyForHappy.";
    fields = {
      "Name": formData.name,
      "Company": formData.company || "N/A",
      "Phone": formData.phone,
      "Email": formData.email || "",
      "Property/Project Type": formData.propertyType || ""
    };
  } else {
    fields = {
      "Name": formData.name || "",
      "Phone": formData.phone || ""
    };
  }

  // Open WhatsApp in a new tab
  openWhatsAppEnquiry({
    title,
    fields,
    defaultMessage: formData.message || ""
  });

  return { 
    success: true, 
    message: 'Opening WhatsApp to complete your enquiry with PropertyForHappy...' 
  };
};

export const validateIndianPhone = (phone) => {
  if (!phone) return false;
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.length === 10 && /^[6-9]\d{9}$/.test(cleanPhone)) {
    return true;
  }
  if (cleanPhone.length === 12 && /^91[6-9]\d{9}$/.test(cleanPhone)) {
    return true;
  }
  return false;
};

export const validateEmail = (email) => {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
