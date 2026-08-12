import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { usePopup } from '@/context/PopupContext';
import { submitLead, validateIndianPhone } from '@/services/leadService';
import { Loader2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { contactConfig } from '@/config/contactConfig';

export const EnquiryPopup = () => {
  const { isOpen, closePopup, presetData } = usePopup();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: '',
    budgetRange: '',
    preferredLocation: '',
    requestCallback: false
  });

  useEffect(() => {
    if (presetData && Object.keys(presetData).length > 0) {
      setFormData(prev => ({
        ...prev,
        propertyType: presetData.propertyType || prev.propertyType,
        preferredLocation: presetData.location || prev.preferredLocation,
      }));
    }
  }, [presetData]);

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
      const res = await submitLead('popup_enquiry', formData);
      if (res.success) {
        toast.success(res.message);
        setFormData({
          name: '',
          phone: '',
          propertyType: '',
          budgetRange: '',
          preferredLocation: '',
          requestCallback: false
        });
        closePopup();
      }
    } catch (err) {
      toast.error('Could not initiate WhatsApp enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closePopup(); }}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-6 rounded-2xl">
        <DialogHeader className="pr-6 space-y-1">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-blue-950 leading-snug">
            Looking for Premium Properties in Hyderabad?
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-gray-600">
            Connect directly with {contactConfig.companyName} on WhatsApp for verified layout plans &amp; pricing.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
          {/* Full Name */}
          <div className="space-y-1">
            <Label htmlFor="popup-name" className="text-xs font-semibold text-gray-700">Full Name *</Label>
            <Input
              id="popup-name"
              placeholder="Enter your name"
              required
              className="h-10 text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <Label htmlFor="popup-phone" className="text-xs font-semibold text-gray-700">Phone Number *</Label>
            <Input
              id="popup-phone"
              type="tel"
              placeholder="10-digit mobile number"
              required
              className="h-10 text-sm"
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? "popup-phone-err" : undefined}
              value={formData.phone}
              onChange={(e) => {
                setPhoneError('');
                setFormData({ ...formData, phone: e.target.value });
              }}
            />
            {phoneError && (
              <p id="popup-phone-err" className="text-[11px] text-red-600 font-medium">
                {phoneError}
              </p>
            )}
          </div>

          {/* Property Type & Budget (2 cols on sm) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="popup-propertyType" className="text-xs font-semibold text-gray-700">Property Type</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(val) => setFormData({ ...formData, propertyType: val })}
              >
                <SelectTrigger id="popup-propertyType" className="h-10 text-xs sm:text-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open Plot">Open Plot</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="1 BHK">1 BHK Apartment</SelectItem>
                  <SelectItem value="2 BHK">2 BHK Apartment</SelectItem>
                  <SelectItem value="3 BHK">3 BHK Apartment</SelectItem>
                  <SelectItem value="4 BHK">4 BHK Apartment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="popup-budgetRange" className="text-xs font-semibold text-gray-700">Budget Range</Label>
              <Select
                value={formData.budgetRange}
                onValueChange={(val) => setFormData({ ...formData, budgetRange: val })}
              >
                <SelectTrigger id="popup-budgetRange" className="h-10 text-xs sm:text-sm">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Below ₹40 Lakhs">Below ₹40 Lakhs</SelectItem>
                  <SelectItem value="₹40 - ₹60 Lakhs">₹40 - ₹60 Lakhs</SelectItem>
                  <SelectItem value="₹60 - ₹80 Lakhs">₹60 - ₹80 Lakhs</SelectItem>
                  <SelectItem value="₹80 Lakhs - ₹1 Crore">₹80 Lakhs - ₹1 Crore</SelectItem>
                  <SelectItem value="Above ₹1 Crore">Above ₹1 Crore</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preferred Location */}
          <div className="space-y-1">
            <Label htmlFor="popup-location" className="text-xs font-semibold text-gray-700">Preferred Location</Label>
            <Input
              id="popup-location"
              placeholder="e.g., Shankarpally, Kokapet, Adibatla"
              className="h-10 text-sm"
              value={formData.preferredLocation}
              onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
            />
          </div>

          {/* Callback Checkbox */}
          <div className="flex items-center space-x-2 pt-0.5">
            <Checkbox
              id="popup-callback"
              checked={formData.requestCallback}
              onCheckedChange={(checked) => setFormData({ ...formData, requestCallback: !!checked })}
            />
            <Label htmlFor="popup-callback" className="text-xs font-normal text-gray-700 cursor-pointer">
              Request a call back at my convenience
            </Label>
          </div>

          {/* Submit Button with WhatsApp Icon */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Opening WhatsApp...
              </>
            ) : (
              <>
                <WhatsAppIcon className="h-5 w-5 mr-2" />
                Get Offers on WhatsApp
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
