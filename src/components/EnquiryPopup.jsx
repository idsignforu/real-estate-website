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
import { Loader2, MessageCircle } from 'lucide-react';
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-950">
            Looking for Premium Properties in Hyderabad?
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-1">
            Fill in your preferences to connect directly with {contactConfig.companyName} on WhatsApp for pricing &amp; layout plans.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="popup-name">Full Name *</Label>
            <Input
              id="popup-name"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="popup-phone">Phone Number *</Label>
            <Input
              id="popup-phone"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              required
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? "phone-error-msg" : undefined}
              value={formData.phone}
              onChange={(e) => {
                setPhoneError('');
                setFormData({ ...formData, phone: e.target.value });
              }}
            />
            {phoneError && (
              <p id="phone-error-msg" className="text-xs text-red-600 font-medium">
                {phoneError}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="popup-propertyType">Property Type</Label>
            <Select
              value={formData.propertyType}
              onValueChange={(val) => setFormData({ ...formData, propertyType: val })}
            >
              <SelectTrigger id="popup-propertyType">
                <SelectValue placeholder="Select property type" />
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

          <div className="space-y-1.5">
            <Label htmlFor="popup-budgetRange">Budget Range</Label>
            <Select
              value={formData.budgetRange}
              onValueChange={(val) => setFormData({ ...formData, budgetRange: val })}
            >
              <SelectTrigger id="popup-budgetRange">
                <SelectValue placeholder="Select your budget" />
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

          <div className="space-y-1.5">
            <Label htmlFor="popup-location">Preferred Location</Label>
            <Input
              id="popup-location"
              placeholder="e.g., Shankarpally, Kokapet, Adibatla"
              value={formData.preferredLocation}
              onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <Checkbox
              id="popup-callback"
              checked={formData.requestCallback}
              onCheckedChange={(checked) => setFormData({ ...formData, requestCallback: !!checked })}
            />
            <Label htmlFor="popup-callback" className="text-sm font-normal cursor-pointer">
              Request a call back at my convenience
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Opening WhatsApp...
              </>
            ) : (
              <>
                <MessageCircle className="h-4 w-4 mr-2" />
                Get Offers on WhatsApp
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
