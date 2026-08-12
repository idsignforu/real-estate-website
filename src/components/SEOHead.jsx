import React, { useEffect } from 'react';

export const SEOHead = ({ title, description, keywords, canonicalUrl, ogImage }) => {
  useEffect(() => {
    // Dynamic document title update
    const siteName = "iDesign4U Properties | Hyderabad Real Estate";
    document.title = title ? `${title} | ${siteName}` : siteName;

    // Dynamic meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }

    // Dynamic Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) {
      ogTitle.setAttribute('content', title);
    }
  }, [title, description, keywords, canonicalUrl, ogImage]);

  return null;
};
