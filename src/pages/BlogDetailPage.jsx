import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';
import { blogData } from '@/data/blogData';
import { usePopup } from '@/context/PopupContext';

export const BlogDetailPage = () => {
  const { slug } = useParams();
  const { openPopup } = usePopup();

  const article = blogData.find(b => b.slug === slug || b.id === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Article Not Found</h2>
          <p className="text-gray-600 text-sm">The article you requested is unavailable.</p>
          <Link to="/blog">
            <Button className="bg-blue-900 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <SEOHead
        title={article.title}
        description={article.excerpt}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/blog" className="inline-flex items-center text-xs font-semibold text-blue-900 hover:underline mb-6">
          <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to All Articles
        </Link>

        <article className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="space-y-3">
            <Badge variant="yellow">{article.category}</Badge>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-950 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center space-x-4 text-xs text-gray-500 border-b pb-4">
              <span className="flex items-center"><Calendar className="h-4 w-4 mr-1 text-gray-400" />{article.date}</span>
              <span className="flex items-center"><User className="h-4 w-4 mr-1 text-gray-400" />{article.author}</span>
            </div>
          </div>

          <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
            {article.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.trim().startsWith('###')) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-blue-950 pt-4">
                    {paragraph.replace('###', '').trim()}
                  </h3>
                );
              }
              return <p key={idx}>{paragraph.trim()}</p>;
            })}
          </div>

          <div className="border-t pt-8 text-center bg-blue-50 p-6 rounded-xl space-y-3">
            <h4 className="font-bold text-blue-950 text-base">Have Questions About Property Approvals?</h4>
            <p className="text-xs text-gray-600">Connect with iDesign4U Properties advisors for legal documentation &amp; site visit assistance.</p>
            <Button variant="yellow" size="sm" onClick={() => openPopup()}>
              <MessageCircle className="h-4 w-4 mr-1.5" /> Enquire on WhatsApp
            </Button>
          </div>
        </article>

      </div>
    </div>
  );
};
