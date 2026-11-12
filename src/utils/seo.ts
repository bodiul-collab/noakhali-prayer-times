export interface SeoMetadataOptions {
  title: string;
  description: string;
  canonicalUrl?: string;
  cityName?: string;
  stateName?: string;
  countryName?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function updatePageSeo(options: SeoMetadataOptions): void {
  if (typeof document === 'undefined') return;

  // 1. Update Title
  document.title = options.title;

  // 2. Helper to set meta content
  const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${nameOrProperty}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, nameOrProperty);
      document.head.appendChild(el);
    }
    el.content = content;
  };

  setMeta('description', options.description);
  setMeta('og:title', options.title, true);
  setMeta('og:description', options.description, true);
  setMeta('twitter:title', options.title);
  setMeta('twitter:description', options.description);

  const url = options.canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
  if (url) {
    setMeta('og:url', url, true);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }

  // 3. Update or Insert JSON-LD Script tag
  let script = document.getElementById('nk-jsonld') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'nk-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  if (options.jsonLd) {
    script.textContent = JSON.stringify(options.jsonLd);
  }
}
