export const JOURNAL_UTM_SOURCE = 'armor_freight_journal';

export function withJournalTracking(url: string, content: string, campaign = 'journal') {
  if (!url || /^mailto:|^tel:/.test(url)) {
    return url;
  }

  try {
    const destination = new URL(url, 'https://armorfreightblog.com');
    const isJournalInternal =
      !/^https?:\/\//i.test(url) ||
      destination.hostname === 'armorfreightblog.com' ||
      destination.hostname === 'www.armorfreightblog.com';

    if (isJournalInternal) {
      return url.startsWith('http://') || url.startsWith('https://')
        ? `${destination.pathname}${destination.search}${destination.hash}`
        : url;
    }

    destination.searchParams.set('utm_source', JOURNAL_UTM_SOURCE);
    destination.searchParams.set('utm_medium', 'referral');
    destination.searchParams.set('utm_campaign', campaign);
    destination.searchParams.set('utm_content', content);

    return destination.toString();
  } catch {
    return url;
  }
}

export function trackJournalEvent(eventName: string, properties: Record<string, string | number | boolean | null> = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = {
    event: eventName,
    ...properties,
    source: JOURNAL_UTM_SOURCE,
  };

  const globalScope = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  };

  if (Array.isArray(globalScope.dataLayer)) {
    globalScope.dataLayer.push(payload);
  }

  if (typeof globalScope.gtag === 'function') {
    globalScope.gtag('event', eventName, properties);
  }
}
