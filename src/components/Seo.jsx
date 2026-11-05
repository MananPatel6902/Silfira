import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import { pageMetadata } from '../lib/seo';
export default function Seo() {
  const { pathname } = useLocation();
  const { properties } = useSiteData();
  useEffect(() => {
    const meta = pageMetadata(pathname, properties);
    document.title = meta.title;
    const set = (selector, tag, attrs) => {
      let node = document.head.querySelector(selector);
      if (!node) { node = document.createElement(tag); document.head.appendChild(node); }
      Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
      return node;
    };
    set('meta[name="description"]', 'meta', { name: 'description', content: meta.description });
    for (const [key, value] of Object.entries({ title: meta.title, description: meta.description, image: meta.image, url: meta.canonical, type: 'website' })) set(`meta[property="og:${key}"]`, 'meta', { property: `og:${key}`, content: value });
    set('link[rel="canonical"]', 'link', { rel: 'canonical', href: meta.canonical });
    set('meta[name="robots"]', 'meta', { name: 'robots', content: meta.notFound || pathname.startsWith('/admin') ? 'noindex,follow' : 'index,follow' });
    set('#site-schema', 'script', { id: 'site-schema', type: 'application/ld+json' }).textContent = JSON.stringify(meta.schema);
  }, [pathname, properties]);
  return null;
}
