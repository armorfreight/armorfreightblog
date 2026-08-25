import { SITE_TITLE } from '../consts';

export const JOURNAL_URL = 'https://armorfreightblog.com';
export const AUTHOR_NAME = 'Aaron Bartholomew';
export const AUTHOR_BIO = 'Freight operator with hands-on experience across driving, dispatch, brokerage, and day-to-day transportation operations. Writes the Armor Freight Journal from an operator’s perspective.';
export const AUTHOR_PAGE_PATH = '/authors/aaron-bartholomew/';
export const ORG_ID = 'https://armorfreight.com/#organization';
export const WEBSITE_ID = `${JOURNAL_URL}/#website`;
export const AUTHOR_PERSON_ID = `${JOURNAL_URL}/authors/aaron-bartholomew/#person`;

export function prodUrl(pathname = '/') {
  return new URL(pathname, JOURNAL_URL).toString();
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Armor Freight Services',
  url: 'https://armorfreight.com/',
  telephone: '+1-888-507-0767',
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: prodUrl('/'),
  name: SITE_TITLE,
  publisher: {
    '@id': ORG_ID,
  },
  inLanguage: 'en-US',
};

export const authorPersonSchema = {
  '@type': 'Person',
  '@id': AUTHOR_PERSON_ID,
  name: AUTHOR_NAME,
  url: prodUrl(AUTHOR_PAGE_PATH),
  worksFor: {
    '@id': ORG_ID,
  },
};

export function articleSchema({
  title,
  description,
  url,
  pubDate,
  topic,
  image,
}: {
  title: string;
  description: string;
  url: string;
  pubDate: string;
  topic?: string | null;
  image?: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    datePublished: pubDate,
    author: {
      '@id': AUTHOR_PERSON_ID,
    },
    publisher: {
      '@id': ORG_ID,
    },
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    inLanguage: 'en-US',
  };

  if (topic) {
    schema.articleSection = topic;
  }

  if (image) {
    schema.image = image;
  }

  return schema;
}

export function breadcrumbSchema(items: Array<{ name: string; url?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? prodUrl(item.url) : undefined,
    })),
  };
}

export function profilePageSchema({
  url,
  articles,
}: {
  url: string;
  articles: Array<{ title: string; url: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': url,
    url,
    mainEntity: {
      '@id': AUTHOR_PERSON_ID,
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: prodUrl(AUTHOR_PAGE_PATH),
      description: AUTHOR_BIO,
      worksFor: {
        '@id': ORG_ID,
      },
    },
    hasPart: articles.map((article) => ({
      '@type': 'WebPage',
      name: article.title,
      url: article.url,
    })),
  };
}
