import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  canonical?: string;
  robots?: string;
  breadcrumbs?: { name: string; item: string }[];
}

export function SEO({ title, description, keywords, type = 'website', image, canonical, robots, breadcrumbs }: SEOProps) {
  const { language } = useLanguage();

  const schemaMarkup = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image || "http://pancaprimawijaya.web.id/logo.png",
    "author": {
      "@type": "Organization",
      "name": "PT Panca Prima Wijaya"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PT Panca Prima Wijaya",
      "logo": {
        "@type": "ImageObject",
        "url": "http://pancaprimawijaya.web.id/logo.png"
      }
    }
  } : {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PT Panca Prima Wijaya",
    "url": "http://pancaprimawijaya.web.id",
    "description": description,
    "sameAs": []
  };

  if (type === 'product') {
    Object.assign(schemaMarkup, {
       "@type": "Product",
       "name": title,
       "description": description,
       "image": image || "http://pancaprimawijaya.web.id/logo.png",
       "brand": {
         "@type": "Brand",
         "name": "PT Panca Prima Wijaya"
       }
    });
  }

  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((bc, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": bc.name,
      "item": bc.item
    }))
  } : null;

  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');

  const getAltUrls = () => {
    if (!currentUrl) return { idUrl: '', enUrl: '' };
    let idUrl = '';
    let enUrl = '';
    if (currentUrl.includes('/en/')) {
      idUrl = currentUrl.replace('/en/', '/');
      enUrl = currentUrl;
    } else if (currentUrl.endsWith('/en')) {
      idUrl = currentUrl.substring(0, currentUrl.length - 3) || '/';
      enUrl = currentUrl;
    } else {
      idUrl = currentUrl;
      try {
        const urlObj = new URL(currentUrl);
        urlObj.pathname = `/en${urlObj.pathname === '/' ? '' : urlObj.pathname}`;
        enUrl = urlObj.toString();
      } catch (e) {
        enUrl = currentUrl + '/en';
      }
    }
    return { idUrl, enUrl };
  };

  const { idUrl, enUrl } = getAltUrls();

  return (
    <Helmet htmlAttributes={{ lang: language }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {robots ? <meta name="robots" content={robots} /> : <meta name="robots" content="index, follow" />}
      {currentUrl && <link rel="canonical" href={currentUrl} />}
      
      {/* Alternate Hreflang SEO configuration */}
      {idUrl && <link rel="alternate" hrefLang="id" href={idUrl} />}
      {enUrl && <link rel="alternate" hrefLang="en" href={enUrl} />}
      {idUrl && <link rel="alternate" hrefLang="x-default" href={idUrl} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      {currentUrl && <meta property="og:url" content={currentUrl} />}

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
}
