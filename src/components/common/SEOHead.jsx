import { useEffect } from 'react';

export default function SEOHead({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  twitterCard = 'summary_large_image'
}) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title.includes('TaskControl') ? title : `${title} | TaskControl`;
    }

    // Update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      if (!content) return;
      
      const attribute = property ? 'property' : 'name';
      const selector = `meta[${attribute}="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url || window.location.href, true);
    updateMetaTag('og:image', image || 'https://taskcontrol.work/TaskControl%20-%20Logo.png', true);
    updateMetaTag('og:site_name', 'TaskControl', true);
    updateMetaTag('og:locale', 'es_ES', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image || 'https://taskcontrol.work/TaskControl%20-%20Logo.png');
    updateMetaTag('twitter:url', url || window.location.href);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url || window.location.href);

  }, [title, description, keywords, image, url, type, twitterCard]);

  return null; // This component doesn't render anything
}