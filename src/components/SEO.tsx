import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: "website" | "article" | "book";
  image?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const CANONICAL_DOMAIN = "https://www.rishithagorupati.com";
const DEFAULT_IMAGE = `${CANONICAL_DOMAIN}/assets/author/rishitha_portrait.png`;

function setMetaTag(attributeName: "name" | "property", attributeValue: string, content: string): void {
  if (typeof document === "undefined") return;
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonicalUrl(url: string): void {
  if (typeof document === "undefined") return;
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function setJsonLdScript(data: Record<string, unknown> | Array<Record<string, unknown>> | undefined): void {
  if (typeof document === "undefined") return;
  const SCRIPT_ID = "seo-json-ld";
  const existing = document.getElementById(SCRIPT_ID);
  if (existing) {
    existing.remove();
  }

  if (!data) return;

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.type = "application/ld+json";
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  type = "website",
  image,
  jsonLd,
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Page Title
    document.title = title;

    // 2. Canonical URL (always enforce preferred https://www.rishithagorupati.com domain)
    const cleanPath = (canonicalPath || location.pathname || "/").replace(/\/+$/, "") || "/";
    const canonicalUrl = cleanPath === "/" ? `${CANONICAL_DOMAIN}/` : `${CANONICAL_DOMAIN}${cleanPath}`;
    setCanonicalUrl(canonicalUrl);

    // 3. Absolute image URL
    const imageUrl = image
      ? image.startsWith("http://") || image.startsWith("https://")
        ? image
        : `${CANONICAL_DOMAIN}${image.startsWith("/") ? "" : "/"}${image}`
      : DEFAULT_IMAGE;

    // 4. Meta Description
    setMetaTag("name", "description", description);

    // 5. Open Graph Metadata
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:image", imageUrl);
    setMetaTag("property", "og:site_name", "Rishitha Gorupati");

    // 6. Twitter Card Metadata
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", imageUrl);

    // 7. Schema.org JSON-LD Structured Data
    setJsonLdScript(jsonLd);

    return () => {
      // Clean up dynamic script on unmount
      const script = document.getElementById("seo-json-ld");
      if (script) script.remove();
    };
  }, [title, description, canonicalPath, type, image, jsonLd, location.pathname]);

  return null;
};

