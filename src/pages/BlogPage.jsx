import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import { blogData } from '@/data/blogData';

export const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <SEOHead
        title="Hyderabad Real Estate Blog & Market Articles"
        description="Read latest real estate investment guides, HMDA layout verification tips, and market analysis for Hyderabad."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-950 mb-2">
            Real Estate Insights &amp; Market Blog
          </h1>
          <p className="text-xs sm:text-base text-gray-600 max-w-3xl">
            Expert articles, legal checklists, and market trends to guide your property investment decisions in Hyderabad.
          </p>
        </div>

        {/* 2-Column Mobile Grid, 3-Column Desktop Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6">
          {blogData.map((article) => (
            <Card key={article.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200 bg-white">
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=srgb&fm=jpg&q=85";
                  }}
                />
                <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2">
                  <Badge variant="yellow" className="text-[9px] sm:text-xs px-1.5 py-0.5 font-bold">
                    {article.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-2.5 sm:p-4 flex flex-col flex-grow justify-between space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center text-[10px] sm:text-xs text-gray-500 mb-1">
                    <Calendar className="h-3 w-3 mr-1 text-blue-900 shrink-0" />
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-xs sm:text-base font-bold text-blue-950 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="hidden sm:block text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <Link to={`/blog/${article.slug}`} className="w-full">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full text-blue-950 border-blue-950 hover:bg-blue-50 font-bold text-[10px] sm:text-xs px-1 py-1 h-7 sm:h-9 flex items-center justify-center truncate whitespace-nowrap"
                  >
                    <span className="truncate">Read Article</span>
                    <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1 shrink-0" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
};
