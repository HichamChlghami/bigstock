// Helper to inject external scripts dynamically
const injectScript = (id: string, src: string, content?: string) => {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  if (src) script.src = src;
  if (content) script.innerHTML = content;
  script.async = true;
  document.head.appendChild(script);
};

// Fetch a setting value from the API
async function fetchSetting(key: string): Promise<any> {
  try {
    const res = await fetch(`/api/settings?key=${key}`);
    const data = await res.json();
    return data?.value ?? null;
  } catch {
    return null;
  }
}

export const analytics = {
  initialize: async () => {
    // Fetch all analytics settings from MongoDB via API
    const [gaId, pixelIds, tiktokIds] = await Promise.all([
      fetchSetting('ga_id'),
      fetchSetting('pixel_ids'),
      fetchSetting('tiktok_ids'),
    ]);

    // Google Analytics 4
    if (gaId) {
      injectScript('ga-lib', `https://www.googletagmanager.com/gtag/js?id=${gaId}`);
      injectScript('ga-init', '', `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `);
    }

    // Meta Pixel (Multiple)
    if (pixelIds && Array.isArray(pixelIds) && pixelIds.length > 0) {
      const initCalls = pixelIds.map((id: string) => `fbq('init', '${id}');`).join('\n');

      injectScript('meta-pixel', '', `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        ${initCalls}
        fbq('track', 'PageView');
      `);
    }

    // TikTok Pixel (Multiple)
    if (tiktokIds && Array.isArray(tiktokIds) && tiktokIds.length > 0) {
      const loadCalls = tiktokIds.map((id: string) => `ttq.load('${id}');`).join('\n');

      injectScript('tiktok-pixel', '', `
        !function (w, d, t) {
          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
          ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],
          ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
          for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
          ttq.instance=function(t){for(var e=ttq.methods[i=0];i<ttq.methods.length;i++)ttq.setAndDefer(t,ttq.methods[i]);return t};
          ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
          ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
          var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
          var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
          ${loadCalls}
          ttq.page();
        }(window, document, 'ttq');
      `);
    }
  },

  trackPageView: (path: string) => {
    // GA4
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: path });
    }
    // Meta
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
    // TikTok
    if (typeof window.ttq === 'object') {
      window.ttq.page();
    }
  },

  trackPurchase: (orderId: string, value: number, currency = 'MAD') => {
    // GA4
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'purchase', {
        transaction_id: orderId,
        value: value,
        currency: currency
      });
    }
    // Meta
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Purchase', { value: value, currency: currency });
    }
    // TikTok
    if (typeof window.ttq === 'object') {
      window.ttq.track('PlaceAnOrder', { value: value, currency: currency });
    }
  }
};

// Types for global objects
declare global {
  interface Window {
    gtag: any;
    fbq: any;
    ttq: any;
  }
}
