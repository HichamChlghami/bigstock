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

export const analytics = {
  initialize: () => {
    const gaId = localStorage.getItem('ga_id');
    
    // Parse multiple IDs (stored as JSON arrays)
    let pixelIds: string[] = [];
    let tiktokIds: string[] = [];

    try {
      pixelIds = JSON.parse(localStorage.getItem('pixel_ids') || '[]');
    } catch (e) {
      // Fallback for old single string format
      const oldId = localStorage.getItem('pixel_id');
      if (oldId) pixelIds = [oldId];
    }

    try {
      tiktokIds = JSON.parse(localStorage.getItem('tiktok_ids') || '[]');
    } catch (e) {
      // Fallback for old single string format
      const oldId = localStorage.getItem('tiktok_id');
      if (oldId) tiktokIds = [oldId];
    }

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
    if (pixelIds.length > 0) {
      const initCalls = pixelIds.map(id => `fbq('init', '${id}');`).join('\n');
      
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
    if (tiktokIds.length > 0) {
      const loadCalls = tiktokIds.map(id => `ttq.load('${id}');`).join('\n');

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
