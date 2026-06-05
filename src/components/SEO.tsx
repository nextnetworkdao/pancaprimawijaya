import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
}

export function SEO({ title, description, keywords, type = 'website', image }: SEOProps) {
  const schemaMarkup = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image || "https://www.pancaprimawijaya.com/logo.png",
    "author": {
      "@type": "Organization",
      "name": "PT Panca Prima Wijaya"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PT Panca Prima Wijaya",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.pancaprimawijaya.com/logo.png"
      }
    }
  } : {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PT Panca Prima Wijaya",
    "url": "https://www.pancaprimawijaya.com",
    "description": description,
    "sameAs": []
  };

  if (type === 'product') {
    Object.assign(schemaMarkup, {
       "@type": "Product",
       "name": title,
       "description": description,
       "image": image || "https://www.pancaprimawijaya.com/logo.png",
       "brand": {
         "@type": "Brand",
         "name": "PT Panca Prima Wijaya"
       }
    });
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}

      {/* JSON-LD Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
    </Helmet>
  );
}
