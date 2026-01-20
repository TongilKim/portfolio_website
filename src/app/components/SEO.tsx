import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  locale?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  jsonLd?: Record<string, any>;
}

export function SEO({
  title,
  description,
  keywords,
  image = "/og-image.svg",
  url,
  type = "website",
  locale,
  author = "PixelFlow",
  publishedTime,
  modifiedTime,
  section,
  tags,
  noindex = false,
  jsonLd,
}: SEOProps) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const currentLocale = locale || (i18n.language === "ko" ? "ko_KR" : "en_US");
  const currentLangCode = i18n.language === "ko" ? "ko" : "en";

  // Default values based on language
  const defaultTitle = currentLocale === "ko_KR"
    ? "PixelFlow | 프리랜스 웹 개발자 - 맞춤형 웹사이트 & 웹 앱"
    : "PixelFlow | Freelance Web Developer - Custom Websites & Web Apps";

  const defaultDescription = currentLocale === "ko_KR"
    ? "전문 프리랜스 웹 개발자. 맞춤형 웹사이트, 웹 애플리케이션, 이커머스 솔루션 전문. 다음 프로젝트를 위한 견적을 받아보세요."
    : "Professional freelance web developer specializing in custom websites, web applications, and e-commerce solutions. Get a quote for your next project.";

  const defaultKeywords = currentLocale === "ko_KR"
    ? "웹 개발자, 프리랜서, 맞춤형 웹사이트, 웹 애플리케이션, React, 반응형 디자인, 한국 웹 개발"
    : "web developer, freelance, custom websites, web applications, React, responsive design, Korean web development";

  const siteUrl = import.meta.env.VITE_SITE_URL || "https://pixelflow.dev";
  const pathWithoutLang = location.pathname.replace(/^\/(ko|en)/, "");
  const currentPath = url || pathWithoutLang || "/";
  const fullUrl = `${siteUrl}${currentPath}`;
  const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  // Generate alternate language URLs
  const koUrl = `${siteUrl}/ko${currentPath}`;
  const enUrl = `${siteUrl}/en${currentPath}`;

  const pageTitle = title ? `${title} | PixelFlow` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;

  // Default JSON-LD structured data
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebSite",
    "name": "PixelFlow",
    "alternateName": "PixelFlow Web Development",
    "url": siteUrl,
    "description": pageDescription,
    "author": {
      "@type": "Person",
      "name": author,
      "url": siteUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": "PixelFlow",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`,
      },
    },
    "sameAs": [
      // Add your social media URLs here
      "https://github.com/pixelflow",
      "https://linkedin.com/in/pixelflow",
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Article-specific JSON-LD
  if (type === "article" && publishedTime) {
    Object.assign(defaultJsonLd, {
      "@type": "Article",
      "headline": pageTitle,
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": fullUrl,
      },
      "articleSection": section,
      "keywords": tags?.join(", ") || pageKeywords,
    });
  }

  // Service/Business JSON-LD
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "PixelFlow Web Development",
    "description": "Professional web development services",
    "url": siteUrl,
    "telephone": "+82-10-XXXX-XXXX", // Add your phone
    "email": "contact@pixelflow.dev", // Add your email
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Seoul",
      "addressCountry": "KR",
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00",
    },
    "areaServed": ["KR", "US", "Global"],
    "availableLanguage": ["Korean", "English"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development",
            "description": "Tailored website solutions for your business",
          },
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Application Development",
            "description": "Full-stack web application development",
          },
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Solutions",
            "description": "Complete e-commerce platform development",
          },
        },
      ],
    },
  };

  const finalJsonLd = jsonLd || { ...defaultJsonLd, ...serviceJsonLd };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={author} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Language Alternates - Improved */}
      <link rel="alternate" hrefLang="ko" href={koUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      {/* Additional language meta tags */}
      <meta httpEquiv="content-language" content={currentLangCode} />
      <html lang={currentLangCode} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={currentLocale} />
      <meta property="og:locale:alternate" content={currentLocale === "ko_KR" ? "en_US" : "ko_KR"} />
      <meta property="og:site_name" content="PixelFlow" />

      {/* Article specific Open Graph tags */}
      {type === "article" && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@pixelflow" />

      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="theme-color" content="#0284c7" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalJsonLd)}
      </script>
    </Helmet>
  );
}