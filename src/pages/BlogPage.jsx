import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
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
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 mb-2">
            Real Estate Insights &amp; Market Blog
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl">
            Expert articles, legal checklists, and market trends to guide your property investment decisions in Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogData.map((article) => (
            <Card key={article.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200">
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="yellow">{article.category}</Badge>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                    <span className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1" />{article.date}</span>
                    <span className="flex items-center"><User className="h-3.5 w-3.5 mr-1" />{article.author}</span>
                  </div>

                  <h3 className="text-lg font-bold text-blue-950 group-hover:text-blue-700 transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <Link to={`/blog/${article.slug}`} className="w-full">
                  <Button variant="outline" className="w-full text-blue-900 border-blue-900 hover:bg-blue-50 font-semibold text-xs">
                    Read Article <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
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
