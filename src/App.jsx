import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PopupProvider } from '@/context/PopupContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EnquiryPopup } from '@/components/EnquiryPopup';
import { StickyButtons } from '@/components/StickyButtons';
import { Toaster } from '@/components/ui/sonner';

import { ScrollToTop } from '@/components/ScrollToTop';

// Lazy loading route components for code splitting & performance optimization
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const PropertiesPage = lazy(() => import('@/pages/PropertiesPage').then(m => ({ default: m.PropertiesPage })));
const PropertyDetailPage = lazy(() => import('@/pages/PropertyDetailPage').then(m => ({ default: m.PropertyDetailPage })));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));
const LocationsPage = lazy(() => import('@/pages/LocationsPage').then(m => ({ default: m.LocationsPage })));
const LocationDetailPage = lazy(() => import('@/pages/LocationDetailPage').then(m => ({ default: m.LocationDetailPage })));
const InvestmentPage = lazy(() => import('@/pages/InvestmentPage').then(m => ({ default: m.InvestmentPage })));
const BlogPage = lazy(() => import('@/pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogDetailPage = lazy(() => import('@/pages/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })));
const AdvertisePage = lazy(() => import('@/pages/AdvertisePage').then(m => ({ default: m.AdvertisePage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900"></div>
  </div>
);

export function App() {
  return (
    <PopupProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans selection:bg-yellow-400 selection:text-blue-950">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Main Routes */}
                <Route path="/" element={<HomePage />} />
                
                {/* Property Routes */}
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/properties/apartments" element={<PropertiesPage />} />
                <Route path="/properties/villas" element={<PropertiesPage />} />
                <Route path="/properties/plots" element={<PropertiesPage />} />
                <Route path="/properties/:id" element={<PropertyDetailPage />} />

                {/* Projects Routes */}
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectDetailPage />} />

                {/* Locations Routes */}
                <Route path="/locations" element={<LocationsPage />} />
                <Route path="/locations/:slug" element={<LocationDetailPage />} />

                {/* Investment Routes */}
                <Route path="/investment" element={<InvestmentPage />} />
                <Route path="/why-invest" element={<Navigate to="/investment" replace />} />

                {/* Blog Routes */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />

                {/* Advertise & Contact Routes */}
                <Route path="/advertise" element={<AdvertisePage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Custom 404 Catch-all */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          
          <Footer />
          <EnquiryPopup />
          <StickyButtons />
          <Toaster position="top-right" />
        </div>
      </Router>
    </PopupProvider>
  );
}

export default App;
