import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { books } from '../src/data/books.js';
import { poems } from '../src/data/poems.js';

interface SitemapUrlEntry {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
}

interface PublishedJournalRecord {
  slug?: unknown;
  id?: unknown;
  published?: unknown;
  status?: unknown;
}

const DEFAULT_BASE_URL = 'https://www.rishithagorupati.com';

const STATIC_PUBLIC_ROUTES: SitemapUrlEntry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/poetry', changefreq: 'weekly', priority: '0.9' },
  { path: '/musings', changefreq: 'weekly', priority: '0.9' },
  { path: '/books', changefreq: 'monthly', priority: '0.9' },
  { path: '/achievements', changefreq: 'monthly', priority: '0.7' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
];

const BUILT_IN_JOURNAL_SLUGS = ['fractals-of-thought'];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function resolveBaseUrl(req: VercelRequest): string {
  const forwardedHost = req.headers['x-forwarded-host'];
  const rawHost = Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost || req.headers.host || '';
  const host = rawHost.split(',')[0].trim().toLowerCase();

  if (host === 'rishithagorupati.com' || host === 'www.rishithagorupati.com') {
    return `https://${host}`;
  }
  return DEFAULT_BASE_URL;
}

function readPublishedJournalSlugs(): string[] {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'journals.json');
    const raw = readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    const slugs: string[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== 'object') continue;
      const entry = item as PublishedJournalRecord;
      if (entry.published === false || entry.status === 'draft') continue;
      const slug =
        typeof entry.slug === 'string' && entry.slug.trim()
          ? entry.slug.trim()
          : typeof entry.id === 'string' && entry.id.trim()
          ? entry.id.trim()
          : '';
      if (slug) slugs.push(slug);
    }
    return slugs;
  } catch {
    return [];
  }
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const method = (req.method || 'GET').toUpperCase();
  if (method !== 'GET' && method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).send('Method Not Allowed');
  }

  const baseUrl = resolveBaseUrl(req);
  const seenPaths = new Set<string>();
  const urls: SitemapUrlEntry[] = [];

  const addEntry = (entry: SitemapUrlEntry) => {
    if (seenPaths.has(entry.path)) return;
    seenPaths.add(entry.path);
    urls.push(entry);
  };

  for (const route of STATIC_PUBLIC_ROUTES) {
    addEntry(route);
  }

  for (const slug of readPublishedJournalSlugs()) {
    addEntry({
      path: `/musings/${encodeURIComponent(slug)}`,
      changefreq: 'monthly',
      priority: '0.8',
    });
  }

  for (const slug of BUILT_IN_JOURNAL_SLUGS) {
    addEntry({
      path: `/musings/${encodeURIComponent(slug)}`,
      changefreq: 'monthly',
      priority: '0.8',
    });
  }

  for (const book of books) {
    if (book.slug) {
      addEntry({
        path: `/books/${encodeURIComponent(book.slug)}`,
        changefreq: 'monthly',
        priority: '0.8',
      });
    }
  }

  for (const poem of poems) {
    if (poem.slug) {
      addEntry({
        path: `/poetry/${encodeURIComponent(poem.slug)}`,
        changefreq: 'monthly',
        priority: '0.7',
      });
    }
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (entry) =>
          `  <url>\n` +
          `    <loc>${escapeXml(`${baseUrl}${entry.path}`)}</loc>\n` +
          `    <changefreq>${entry.changefreq}</changefreq>\n` +
          `    <priority>${entry.priority}</priority>\n` +
          `  </url>`
      )
      .join('\n') +
    `\n</urlset>\n`;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');

  if (method === 'HEAD') {
    return res.end();
  }
  return res.end(body);
}

