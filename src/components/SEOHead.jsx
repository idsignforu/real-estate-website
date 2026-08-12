import React from 'react';
import { useEffect } from 'react';

/**
 * SEOHead — manages document <title> and meta tags via side-effects.
 * Uses the siteName "PropertyForHappy" for og:site_name.
 */
export const SEOHead = ({ title, description, keywords }) => {
  const siteName = "PropertyForHappy | Hyderabad Real Estate";

  useEffect(() => {
    if (title) {
      document.title = `${title} | ${siteName}`;
    }
    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    if (description) setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    if (title) {
      setMeta('og:title', `${title} | ${siteName}`, 'property');
      setMeta('og:site_name', 'PropertyForHappy', 'property');
    }
    if (description) setMeta('og:description', description, 'property');
  }, [title, description, keywords]);

  return null;
};
