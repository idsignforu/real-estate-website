import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/SEOHead';
import { Megaphone, ShieldCheck, Loader2, Phone, Mail } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { contactConfig } from '@/config/contactConfig';
import { submitLead, validateIndianPhone } from '@/services/leadService';
import { toast } from 'sonner';

export const AdvertisePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    propertyType: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhoneError('');

    if (!formData.name.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    if (!validateIndianPhone(formData.phone)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number');
      toast.error('Invalid mobile number');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitLead('advertise', formData);
      if (res.success) {
        toast.success(res.message);
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          propertyType: '',
          message: ''
        });
      }
    } catch (err) {
      toast.error('Failed to submit. Please contact us on WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <SEOHead
        title="Advertise With Us - Property Listing & Developer Marketing"
        description="Partner with iDesign4U Properties to list and market your residential plots, villas, and apartments to buyers in Hyderabad."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/20 text-yellow-700 px-3.5 py-1 rounded-full text-xs font-bold">
            <Megaphone className="h-4 w-4" />
            <span>Developer &amp; Landowner Marketing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-950">
            List Your Property with iDesign4U Properties
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Connect your HMDA/DTCP layouts, villas, and apartment projects directly with active real estate buyers across Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          
          {/* Info Card Column */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 bg-blue-950 text-white border-none shadow-lg space-y-4">
              <h3 className="text-xl font-bold text-yellow-400">Why Partner With Us?</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
                <li className="flex items-start space-x-2">
                  <ShieldCheck className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span>High-conversion buyer traffic across Western &amp; Southern Hyderabad.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ShieldCheck className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span>Direct WhatsApp enquiry routing for instant response time.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ShieldCheck className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span>Verified buyer demographic looking for HMDA &amp; DTCP clear titles.</span>
                </li>
              </ul>
            </Card>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center space-y-3">
              <h4 className="font-bold text-gray-900 text-sm">Prefer Direct Contact?</h4>
              <p className="text-xs text-gray-600">Reach out directly to our marketing team:</p>
              
              <div className="flex justify-center space-x-3 pt-1">
                <a
                  href={contactConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl shadow transition-transform hover:scale-105"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>

                <a
                  href={contactConfig.telLink}
                  className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 p-2.5 rounded-xl shadow transition-transform hover:scale-105"
                  aria-label="Call iDesign4U Properties"
                >
                  <Phone className="h-5 w-5" />
                </a>

                <a
                  href={contactConfig.mailtoLink}
                  className="bg-blue-950 hover:bg-blue-900 text-white p-2.5 rounded-xl shadow transition-transform hover:scale-105"
                  aria-label="Email iDesign4U Properties"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 border border-gray-200 shadow-sm bg-white">
              <h3 className="text-2xl font-bold text-blue-950 mb-6">Partner Inquiry Form</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="adv-name">Full Name *</Label>
                    <Input
                      id="adv-name"
                      placeholder="Enter your name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="adv-company">Company / Organization</Label>
                    <Input
                      id="adv-company"
                      placeholder="Developer or firm name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="adv-phone">Phone Number *</Label>
                    <Input
                      id="adv-phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      required
                      aria-invalid={!!phoneError}
                      value={formData.phone}
                      onChange={(e) => {
                        setPhoneError('');
                        setFormData({ ...formData, phone: e.target.value });
                      }}
                    />
                    {phoneError && <p className="text-xs text-red-600 font-medium">{phoneError}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="adv-email">Email Address</Label>
                    <Input
                      id="adv-email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="adv-type">Property / Project Category</Label>
                  <Input
                    id="adv-type"
                    placeholder="e.g. Plotting Township, Villa Project, Apartment Tower"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="adv-message">Project Description / Details</Label>
                  <Textarea
                    id="adv-message"
                    rows={4}
                    placeholder="Provide layout location, LP approvals, available units..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <WhatsAppIcon className="h-5 w-5 mr-2" />
                      Submit &amp; Open WhatsApp
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
};
