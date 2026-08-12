import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, RotateCcw, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SEOHead } from '@/components/SEOHead';
import { PropertyCard } from '@/components/PropertyCard';
import { 
  propertiesData, propertyTypesList, locationsList, 
  budgetRangesList, approvalsList, plotSizesList, facingsList 
} from '@/data/propertiesData';

export const PropertiesPage = () => {
  const { category } = useParams(); // 'apartments' | 'villas' | 'plots' | undefined

  const [filters, setFilters] = useState({
    propertyType: 'All',
    location: 'All',
    budgetRange: 'All',
    approvalType: 'All',
    plotSize: 'All',
    facing: 'All'
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync category route param if present
  useEffect(() => {
    if (category) {
      if (category === 'apartments') setFilters(f => ({ ...f, propertyType: 'Apartment' }));
      else if (category === 'villas') setFilters(f => ({ ...f, propertyType: 'Villa' }));
      else if (category === 'plots') setFilters(f => ({ ...f, propertyType: 'Open Plot' }));
    } else {
      setFilters(f => ({ ...f, propertyType: 'All' }));
    }
  }, [category]);

  const handleResetFilters = () => {
    setFilters({
      propertyType: 'All',
      location: 'All',
      budgetRange: 'All',
      approvalType: 'All',
      plotSize: 'All',
      facing: 'All'
    });
  };

  // FULL 6-CRITERIA FILTER ENGINE
  const filteredProperties = propertiesData.filter(property => {
    // 1. Property Type Criteria
    if (filters.propertyType !== 'All') {
      if (filters.propertyType === 'Apartment') {
        if (!property.type.includes('BHK')) return false;
      } else if (property.type !== filters.propertyType) {
        return false;
      }
    }

    // 2. Location Criteria
    if (filters.location !== 'All' && property.location !== filters.location) {
      return false;
    }

    // 3. Approval Criteria
    if (filters.approvalType !== 'All' && property.approval !== filters.approvalType) {
      return false;
    }

    // 4. Facing Criteria
    if (filters.facing !== 'All' && property.facing !== filters.facing) {
      return false;
    }

    // 5. Budget Criteria parsing
    if (filters.budgetRange !== 'All') {
      const priceText = property.price; // e.g. "₹45 Lakhs" or "₹1.2 Crores"
      let numericLakhs = 0;
      if (priceText.includes('Crore')) {
        const num = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        numericLakhs = num * 100;
      } else if (priceText.includes('Lakh')) {
        numericLakhs = parseFloat(priceText.replace(/[^0-9.]/g, ''));
      }

      if (filters.budgetRange === 'Below ₹40 Lakhs' && numericLakhs >= 40) return false;
      if (filters.budgetRange === '₹40 - ₹60 Lakhs' && (numericLakhs < 40 || numericLakhs > 60)) return false;
      if (filters.budgetRange === '₹60 - ₹80 Lakhs' && (numericLakhs < 60 || numericLakhs > 80)) return false;
      if (filters.budgetRange === '₹80 Lakhs - ₹1 Crore' && (numericLakhs < 80 || numericLakhs > 100)) return false;
      if (filters.budgetRange === 'Above ₹1 Crore' && numericLakhs <= 100) return false;
    }

    // 6. Plot Size Criteria
    if (filters.plotSize !== 'All' && property.plotSize) {
      const numericSqYd = parseInt(property.plotSize.replace(/[^0-9]/g, ''), 10);
      if (filters.plotSize === 'Below 200 Sq. Yds' && numericSqYd >= 200) return false;
      if (filters.plotSize === '200 - 300 Sq. Yds' && (numericSqYd < 200 || numericSqYd > 300)) return false;
      if (filters.plotSize === 'Above 300 Sq. Yds' && numericSqYd <= 300) return false;
    }

    return true;
  });

  const getPageTitle = () => {
    if (category === 'apartments') return 'Gated Community Apartments in Hyderabad';
    if (category === 'villas') return 'HMDA & DTCP Approved Luxury Villas';
    if (category === 'plots') return 'HMDA & DTCP Approved Open Plots';
    return 'Explore Verified Real Estate Properties';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <SEOHead
        title={getPageTitle()}
        description="Filter and explore HMDA and DTCP approved open plots, luxury villas, and modern apartments across Hyderabad with clear title guarantees."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Showing {filteredProperties.length} verified listings in Hyderabad
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            <Link to="/properties">
              <Button size="sm" variant={!category ? 'default' : 'outline'} className={!category ? 'bg-blue-900 text-white' : ''}>
                All Properties
              </Button>
            </Link>
            <Link to="/properties/plots">
              <Button size="sm" variant={category === 'plots' ? 'default' : 'outline'} className={category === 'plots' ? 'bg-blue-900 text-white' : ''}>
                Open Plots
              </Button>
            </Link>
            <Link to="/properties/villas">
              <Button size="sm" variant={category === 'villas' ? 'default' : 'outline'} className={category === 'villas' ? 'bg-blue-900 text-white' : ''}>
                Villas
              </Button>
            </Link>
            <Link to="/properties/apartments">
              <Button size="sm" variant={category === 'apartments' ? 'default' : 'outline'} className={category === 'apartments' ? 'bg-blue-900 text-white' : ''}>
                Apartments
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="mb-6 lg:hidden">
          <Button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            variant="outline"
            className="w-full text-blue-900 border-blue-900 font-semibold"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showMobileFilters ? 'Hide Filters' : 'Show 6-Criteria Filters'}
          </Button>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filter Panel */}
          <aside className={`lg:w-80 shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24 border border-gray-200 shadow-sm">
              <CardContent className="p-6 space-y-5">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-bold text-blue-950 flex items-center text-base">
                    <Filter className="h-4 w-4 mr-2 text-blue-900" /> Filter Criteria
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="text-xs text-gray-500 hover:text-blue-900 h-auto p-1"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" /> Reset
                  </Button>
                </div>

                {/* 1. Property Type */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700">Property Type</Label>
                  <Select
                    value={filters.propertyType}
                    onValueChange={(val) => setFilters({ ...filters, propertyType: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypesList.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 2. Location */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700">Location</Label>
                  <Select
                    value={filters.location}
                    onValueChange={(val) => setFilters({ ...filters, location: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationsList.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 3. Budget */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700">Budget Range</Label>
                  <Select
                    value={filters.budgetRange}
                    onValueChange={(val) => setFilters({ ...filters, budgetRange: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Budgets" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRangesList.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 4. Approval Type */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700">Approval Type</Label>
                  <Select
                    value={filters.approvalType}
                    onValueChange={(val) => setFilters({ ...filters, approvalType: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Approvals" />
                    </SelectTrigger>
                    <SelectContent>
                      {approvalsList.map((app) => (
                        <SelectItem key={app} value={app}>{app}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 5. Plot Size */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700">Plot Size</Label>
                  <Select
                    value={filters.plotSize}
                    onValueChange={(val) => setFilters({ ...filters, plotSize: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Sizes" />
                    </SelectTrigger>
                    <SelectContent>
                      {plotSizesList.map((ps) => (
                        <SelectItem key={ps} value={ps}>{ps}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 6. Facing */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700">Facing Direction</Label>
                  <Select
                    value={filters.facing}
                    onValueChange={(val) => setFilters({ ...filters, facing: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Facings" />
                    </SelectTrigger>
                    <SelectContent>
                      {facingsList.map((f) => (
                        <SelectItem key={f} value={f}>{f}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              </CardContent>
            </Card>
          </aside>

          {/* Properties Grid Area */}
          <main className="flex-1">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-xl text-center border border-gray-200 space-y-4">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="text-xl font-bold text-gray-800">No Properties Found Matching Your Criteria</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Try adjusting or resetting your filter criteria to view more available properties in Hyderabad.
                </p>
                <Button onClick={handleResetFilters} variant="outline" className="text-blue-900 border-blue-900">
                  Reset All Filters
                </Button>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};
