import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SEOHead } from '@/components/SEOHead';
import { Phone, Mail, MapPin, MessageCircle, Calendar, Clock, Loader2 } from 'lucide-react';
import { contactConfig } from '@/config/contactConfig';
import { submitLead, validateIndianPhone } from '@/services/leadService';
import { toast } from 'sonner';

export const ContactPage = () => {
  const [activeTab, setActiveTab] = useState('enquiry');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Form 1: Contact Enquiry
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    budget: '',
    message: ''
  });

  // Form 2: Site Visit Request
  const [siteVisitForm, setSiteVisitForm] = useState({
    name: '',
    phone: '',
    propertyLocation: '',
    preferredDate: '',
    preferredTime: ''
  });

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setPhoneError('');

    if (!enquiryForm.name.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    if (!validateIndianPhone(enquiryForm.phone)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number');
      toast.error('Invalid mobile number');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitLead('contact_enquiry', enquiryForm);
      if (res.success) {
        toast.success(res.message);
        setEnquiryForm({
          name: '',
          email: '',
          phone: '',
          propertyType: '',
          budget: '',
          message: ''
        });
      }
    } catch (err) {
      toast.error('Error initiating WhatsApp. Please click WhatsApp button directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSiteVisitSubmit = async (e) => {
    e.preventDefault();
    setPhoneError('');

    if (!siteVisitForm.name.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    if (!validateIndianPhone(siteVisitForm.phone)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number');
      toast.error('Invalid mobile number');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitLead('site_visit', siteVisitForm);
      if (res.success) {
        toast.success(res.message);
        setSiteVisitForm({
          name: '',
          phone: '',
          propertyLocation: '',
          preferredDate: '',
          preferredTime: ''
        });
      }
    } catch (err) {
      toast.error('Error initiating WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <SEOHead
        title="Contact iDesign4U Properties | Real Estate Support & Site Visit Booking"
        description="Get in touch with iDesign4U Properties for HMDA & DTCP property enquiries, legal verification, and free site visits across Hyderabad."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-950">
            Get in Touch with {contactConfig.companyName}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            We are here to assist you with verified plot layouts, villa bookings, and site visits in Hyderabad.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <Card className="p-6 text-center border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow">
            <div className="bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-400">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-base">Call Support</h3>
            <p className="text-xs text-gray-500 mb-3">{contactConfig.workingHours}</p>
            <a href={`tel:${contactConfig.rawPhone}`} className="text-blue-900 font-extrabold text-lg hover:underline block">
              {contactConfig.phone}
            </a>
          </Card>

          <Card className="p-6 text-center border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow">
            <div className="bg-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-base">WhatsApp Support</h3>
            <p className="text-xs text-gray-500 mb-3">Instant Property Details &amp; Maps</p>
            <a
              href={`https://wa.me/${contactConfig.rawWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-extrabold text-lg hover:underline block"
            >
              {contactConfig.whatsapp}
            </a>
          </Card>

          <Card className="p-6 text-center border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow">
            <div className="bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-400">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-base">Email Enquiry</h3>
            <p className="text-xs text-gray-500 mb-3">Send project documents &amp; queries</p>
            <a href={`mailto:${contactConfig.email}`} className="text-blue-900 font-extrabold text-base hover:underline block">
              {contactConfig.email}
            </a>
          </Card>

        </div>

        {/* Form Tabs Section */}
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-sm">
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-8">
              <TabsTrigger value="enquiry" className="text-sm font-bold py-2.5">
                General Property Enquiry
              </TabsTrigger>
              <TabsTrigger value="sitevisit" className="text-sm font-bold py-2.5">
                Book Free Site Visit
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: General Enquiry */}
            <TabsContent value="enquiry">
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name">Full Name *</Label>
                    <Input
                      id="contact-name"
                      placeholder="Enter your name"
                      required
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-phone">Phone Number *</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      required
                      aria-invalid={!!phoneError}
                      value={enquiryForm.phone}
                      onChange={(e) => {
                        setPhoneError('');
                        setEnquiryForm({ ...enquiryForm, phone: e.target.value });
                      }}
                    />
                    {phoneError && <p className="text-xs text-red-600 font-medium">{phoneError}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email">Email Address</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="name@example.com"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-type">Property Type</Label>
                    <Input
                      id="contact-type"
                      placeholder="e.g. Open Plot, Villa, 3 BHK"
                      value={enquiryForm.propertyType}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, propertyType: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-message">Message / Details</Label>
                  <Textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Tell us what you are looking for in Hyderabad..."
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Enquiry on WhatsApp
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Tab 2: Site Visit */}
            <TabsContent value="sitevisit">
              <form onSubmit={handleSiteVisitSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="sv-name">Full Name *</Label>
                    <Input
                      id="sv-name"
                      placeholder="Enter your name"
                      required
                      value={siteVisitForm.name}
                      onChange={(e) => setSiteVisitForm({ ...siteVisitForm, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="sv-phone">Phone Number *</Label>
                    <Input
                      id="sv-phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      required
                      aria-invalid={!!phoneError}
                      value={siteVisitForm.phone}
                      onChange={(e) => {
                        setPhoneError('');
                        setSiteVisitForm({ ...siteVisitForm, phone: e.target.value });
                      }}
                    />
                    {phoneError && <p className="text-xs text-red-600 font-medium">{phoneError}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sv-location">Preferred Location or Project</Label>
                  <Input
                    id="sv-location"
                    placeholder="e.g. Shankarpally, Adibatla, A1 Green Valley"
                    value={siteVisitForm.propertyLocation}
                    onChange={(e) => setSiteVisitForm({ ...siteVisitForm, propertyLocation: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="sv-date">Preferred Date</Label>
                    <Input
                      id="sv-date"
                      type="date"
                      value={siteVisitForm.preferredDate}
                      onChange={(e) => setSiteVisitForm({ ...siteVisitForm, preferredDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="sv-time">Preferred Time Slot</Label>
                    <Input
                      id="sv-time"
                      placeholder="e.g. Morning 10 AM, Afternoon 2 PM"
                      value={siteVisitForm.preferredTime}
                      onChange={(e) => setSiteVisitForm({ ...siteVisitForm, preferredTime: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Confirm Site Visit on WhatsApp
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

        </div>

      </div>
    </div>
  );
};
