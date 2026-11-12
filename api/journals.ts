import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthenticatedRequest, parseJsonBody } from './_lib/auth.js';

interface JournalSection {
  heading?: string;
  paragraphs: string[];
  featuredQuote?: string;
  associatedArtworkId?: string;
}

interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  sections: JournalSection[];
  sketches: unknown[];
  concludingReflection: string;
}

interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  path: string;
}

class GitHubApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function getGitHubConfig(): GitHubConfig | null {
  const token = process.env.GITHUB_TOKEN?.trim();
  if (!token) return null;

  return {
    token,
    owner: process.env.GITHUB_OWNER?.trim() || 'Rushindra-D',
    repo: process.env.GITHUB_REPO?.trim() || 'personal-website',
    branch: process.env.GITHUB_BRANCH?.trim() || 'main',
    path: process.env.GITHUB_JOURNALS_PATH?.trim() || 'src/data/journals.json',
  };
}

function githubHeaders(token: string): Record<string, string> {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'rishitha-author-portal',
    'Content-Type': 'application/json',
  };
}

function encodeGitHubPath(filePath: string): string {
  return filePath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

async function fetchJournalsFromGitHub(config: GitHubConfig): Promise<{
  journals: JournalEntry[];
  sha?: string;
}> {
  const url = `https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(
    config.repo
  )}/contents/${encodeGitHubPath(config.path)}?ref=${encodeURIComponent(config.branch)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: githubHeaders(config.token),
  });

  if (response.status === 404) {
    return { journals: [], sha: undefined };
  }

  const data = (await response.json()) as {
    content?: string;
    sha?: string;
    message?: string;
  };

  if (!response.ok) {
    const hint =
      response.status === 401 || response.status === 403
        ? 'Verify GITHUB_TOKEN is valid and has "Contents: Read and write" permission for this repository.'
        : data.message || 'GitHub read failed.';
    throw new GitHubApiError(response.status, hint);
  }

  const decoded = data.content
    ? Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8').trim()
    : '[]';

  let parsed: unknown = [];
  try {
    parsed = decoded ? JSON.parse(decoded) : [];
  } catch {
    throw new GitHubApiError(500, 'src/data/journals.json in GitHub is not valid JSON.');
  }

  return {
    journals: Array.isArray(parsed) ? (parsed as JournalEntry[]) : [],
    sha: data.sha,
  };
}

const ALLOWED_IMAGE_MIME_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};
const MAX_IMAGE_UPLOAD_BYTES = 3 * 1024 * 1024;

interface ImageUploadPayload {
  mimeType?: unknown;
  contentBase64?: unknown;
}

async function putGitHubFile(
  config: GitHubConfig,
  repoPath: string,
  base64Content: string,
  commitMessage: string,
  sha?: string
): Promise<{ commitUrl?: string; commitSha?: string }> {
  const url = `https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(
    config.repo
  )}/contents/${encodeGitHubPath(repoPath)}`;

  const payload: Record<string, string> = {
    message: commitMessage,
    content: base64Content,
    branch: config.branch,
  };
  if (sha) {
    payload.sha = sha;
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: githubHeaders(config.token),
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as {
    message?: string;
    commit?: { html_url?: string; sha?: string };
  };

  if (!response.ok) {
    const hint =
      response.status === 401 || response.status === 403
        ? 'GITHUB_TOKEN does not have write permission to commit to the repository.'
        : data.message || 'Failed to commit file to GitHub.';
    throw new GitHubApiError(response.status, hint);
  }

  return {
    commitUrl: data.commit?.html_url,
    commitSha: data.commit?.sha,
  };
}

async function commitJournalsToGitHub(
  config: GitHubConfig,
  journals: JournalEntry[],
  sha: string | undefined,
  commitMessage: string
): Promise<{ commitUrl?: string; commitSha?: string }> {
  const encodedContent = Buffer.from(JSON.stringify(journals, null, 2) + '\n', 'utf8').toString(
    'base64'
  );
  return putGitHubFile(config, config.path, encodedContent, commitMessage, sha);
}

async function uploadJournalImageToGitHub(
  config: GitHubConfig,
  slug: string,
  rawUpload: unknown
): Promise<string> {
  if (!rawUpload || typeof rawUpload !== 'object') {
    throw new GitHubApiError(400, 'Invalid image upload payload.');
  }

  const { mimeType, contentBase64 } = rawUpload as ImageUploadPayload;
  const normalizedMime = typeof mimeType === 'string' ? mimeType.trim().toLowerCase() : '';
  const ext = ALLOWED_IMAGE_MIME_TYPES[normalizedMime];
  if (!ext) {
    throw new GitHubApiError(400, 'Unsupported image format. Please upload JPG, PNG, WebP, or GIF.');
  }

  const rawBase64 = typeof contentBase64 === 'string' ? contentBase64.trim() : '';
  const cleanBase64 = rawBase64.replace(/^data:image\/[a-z0-9.+-]+;base64,/i, '');
  if (!cleanBase64) {
    throw new GitHubApiError(400, 'Image upload content is empty.');
  }

  const buffer = Buffer.from(cleanBase64, 'base64');
  if (buffer.byteLength === 0 || buffer.byteLength > MAX_IMAGE_UPLOAD_BYTES) {
    throw new GitHubApiError(400, 'Image must be between 1 byte and 3 MB.');
  }

  const fileName = `${slug}-${Date.now()}.${ext}`;
  const repoPath = `public/assets/journals/${fileName}`;
  await putGitHubFile(
    config,
    repoPath,
    buffer.toString('base64'),
    `chore(journals): upload cover image for "${slug}" via author portal`
  );

  return `/assets/journals/${fileName}`;
}

function isSafeImageReference(value: string): boolean {
  return (
    value.startsWith('/assets/') ||
    value.startsWith('https://') ||
    value.startsWith('http://') ||
    /^data:image\/[a-z0-9.+-]+;base64,/i.test(value)
  );
}

function sanitizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeSections(rawSections: unknown): JournalSection[] {
  if (!Array.isArray(rawSections)) return [];
  const cleaned: JournalSection[] = [];

  for (const item of rawSections) {
    if (!item || typeof item !== 'object') continue;
    const section = item as Record<string, unknown>;
    const paragraphs = Array.isArray(section.paragraphs)
      ? section.paragraphs
          .filter((p): p is string => typeof p === 'string')
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    const heading = typeof section.heading === 'string' ? section.heading.trim() : '';
    const featuredQuote =
      typeof section.featuredQuote === 'string' ? section.featuredQuote.trim() : '';

    if (heading || paragraphs.length > 0) {
      const next: JournalSection = { paragraphs };
      if (heading) next.heading = heading;
      if (featuredQuote) next.featuredQuote = featuredQuote;
      cleaned.push(next);
    }
  }

  return cleaned;
}

function validateAndNormalizeJournal(
  raw: unknown,
  existingJournals: JournalEntry[],
  mode: 'create' | 'update',
  targetId?: string,
  uploadedCoverPath?: string
): { entry?: JournalEntry; error?: string } {
  if (!raw || typeof raw !== 'object') {
    return { error: 'Invalid journal payload.' };
  }

  const input = raw as Record<string, unknown>;
  const title = typeof input.title === 'string' ? input.title.trim() : '';
  if (!title || title.length > 300) {
    return { error: 'Please provide a journal title (1 to 300 characters).' };
  }

  const sections = normalizeSections(input.sections);
  const allParagraphs = sections.flatMap((s) => s.paragraphs);
  if (allParagraphs.length === 0) {
    return { error: 'Please write at least one paragraph for your journal.' };
  }

  const subtitle = typeof input.subtitle === 'string' ? input.subtitle.trim() : '';
  const category =
    typeof input.category === 'string' && input.category.trim()
      ? input.category.trim()
      : 'Reflections';
  const date =
    typeof input.date === 'string' && input.date.trim()
      ? input.date.trim()
      : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const readTime =
    typeof input.readTime === 'string' && input.readTime.trim()
      ? input.readTime.trim()
      : '4 min read';
  const author =
    typeof input.author === 'string' && input.author.trim()
      ? input.author.trim()
      : 'Rishitha Gorupati';
  const rawCoverImage = typeof input.coverImage === 'string' ? input.coverImage.trim() : '';
  if (!uploadedCoverPath && rawCoverImage && !isSafeImageReference(rawCoverImage)) {
    return {
      error: 'Cover image must be a valid image URL (https://...), /assets/... path, or uploaded image file.',
    };
  }
  const coverImage = uploadedCoverPath || rawCoverImage || undefined;
  const concludingReflection =
    typeof input.concludingReflection === 'string' ? input.concludingReflection.trim() : '';
  const excerptInput = typeof input.excerpt === 'string' ? input.excerpt.trim() : '';
  const firstParagraph = allParagraphs[0] || '';
  const excerpt =
    excerptInput ||
    subtitle ||
    (firstParagraph.length > 180 ? `${firstParagraph.slice(0, 180)}...` : firstParagraph);

  const tags = Array.isArray(input.tags)
    ? input.tags.filter((t): t is string => typeof t === 'string' && Boolean(t.trim()))
    : ['Journal', 'Reflections'];

  const rawSlug = typeof input.slug === 'string' ? sanitizeSlug(input.slug) : '';
  let slug = rawSlug || sanitizeSlug(title) || `journal-${Date.now()}`;

  const takenSlugs = new Set(
    existingJournals
      .filter((j) => !(mode === 'update' && j.id === targetId))
      .flatMap((j) => [j.id, j.slug])
  );
  takenSlugs.add('fractals-of-thought');

  if (takenSlugs.has(slug)) {
    slug = `${slug}-${Date.now()}`;
  }

  const id = mode === 'update' && targetId ? targetId : slug;

  const entry: JournalEntry = {
    id,
    slug,
    title,
    subtitle,
    category,
    date,
    readTime,
    author,
    excerpt,
    tags: tags.length > 0 ? tags : ['Journal', 'Reflections'],
    sections,
    sketches: Array.isArray(input.sketches) ? input.sketches : [],
    concludingReflection,
  };
  if (coverImage) {
    entry.coverImage = coverImage;
  }

  return { entry };
}

async function runWithConflictRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof GitHubApiError && err.status === 409) {
      return await fn();
    }
    throw err;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isAuthenticatedRequest(req)) {
    return res.status(401).json({
      error: 'Your author session has expired. Please log in again.',
    });
  }

  const config = getGitHubConfig();
  if (!config) {
    return res.status(500).json({
      error:
        'GITHUB_TOKEN is not configured. Add GITHUB_TOKEN to Vercel Environment Variables (or .env.local) to enable permanent publishing.',
    });
  }

  try {
    if (req.method === 'GET') {
      const { journals } = await fetchJournalsFromGitHub(config);
      return res.status(200).json({ journals });
    }

    if (req.method === 'POST') {
      const body = parseJsonBody(req.body) as {
        journal?: unknown;
        mode?: unknown;
        targetId?: unknown;
        imageUpload?: unknown;
      };
      const mode = body.mode === 'update' ? 'update' : 'create';
      const targetId = typeof body.targetId === 'string' ? body.targetId.trim() : undefined;

      if (mode === 'update' && targetId === 'fractals-of-thought') {
        return res.status(400).json({
          error: 'The flagship essay "Fractals of Thought" is built-in and cannot be overwritten via GitHub JSON.',
        });
      }

      let cachedFetch: { journals: JournalEntry[]; sha?: string } | null =
        await fetchJournalsFromGitHub(config);

      const initialValidation = validateAndNormalizeJournal(
        body.journal,
        cachedFetch.journals,
        mode,
        targetId
      );
      if (initialValidation.error || !initialValidation.entry) {
        return res.status(400).json({
          error: initialValidation.error || 'Invalid journal entry.',
        });
      }

      const uploadedCoverPath = body.imageUpload
        ? await uploadJournalImageToGitHub(config, initialValidation.entry.slug, body.imageUpload)
        : undefined;

      const result = await runWithConflictRetry(async () => {
        const { journals, sha } = cachedFetch || (await fetchJournalsFromGitHub(config));
        cachedFetch = null;

        const { entry, error } = validateAndNormalizeJournal(
          body.journal,
          journals,
          mode,
          targetId,
          uploadedCoverPath
        );
        if (error || !entry) {
          throw new GitHubApiError(400, error || 'Invalid journal entry.');
        }

        let updatedJournals: JournalEntry[];
        if (mode === 'update' && targetId) {
          const exists = journals.some((j) => j.id === targetId);
          updatedJournals = exists
            ? journals.map((j) => (j.id === targetId ? entry : j))
            : [entry, ...journals];
        } else {
          updatedJournals = [entry, ...journals];
        }

        const actionLabel = mode === 'update' ? 'update' : 'publish';
        const safeTitle = entry.title.replace(/[\r\n"]/g, '');
        const commit = await commitJournalsToGitHub(
          config,
          updatedJournals,
          sha,
          `chore(journals): ${actionLabel} "${safeTitle}" via author portal`
        );

        return {
          entry,
          journals: updatedJournals,
          commitUrl: commit.commitUrl,
          commitSha: commit.commitSha,
        };
      });

      return res.status(200).json({
        success: true,
        journal: result.entry,
        journals: result.journals,
        commitUrl: result.commitUrl,
        commitSha: result.commitSha,
      });
    }

    if (req.method === 'DELETE') {
      const queryId = typeof req.query?.id === 'string' ? req.query.id : undefined;
      const parsedBody = parseJsonBody(req.body);
      const bodyId = typeof parsedBody.id === 'string' ? parsedBody.id : undefined;
      const idToDelete = (bodyId || queryId || '').trim();

      if (!idToDelete) {
        return res.status(400).json({ error: 'Journal ID is required to delete.' });
      }
      if (idToDelete === 'fractals-of-thought') {
        return res.status(400).json({
          error: 'The flagship essay "Fractals of Thought" is built-in and cannot be deleted.',
        });
      }

      const result = await runWithConflictRetry(async () => {
        const { journals, sha } = await fetchJournalsFromGitHub(config);
        const target = journals.find((j) => j.id === idToDelete);
        if (!target) {
          return { journals, commitUrl: undefined, commitSha: undefined };
        }

        const updatedJournals = journals.filter((j) => j.id !== idToDelete);
        const safeTitle = target.title.replace(/[\r\n"]/g, '');
        const commit = await commitJournalsToGitHub(
          config,
          updatedJournals,
          sha,
          `chore(journals): remove "${safeTitle}" via author portal`
        );

        return {
          journals: updatedJournals,
          commitUrl: commit.commitUrl,
          commitSha: commit.commitSha,
        };
      });

      return res.status(200).json({
        success: true,
        journals: result.journals,
        commitUrl: result.commitUrl,
        commitSha: result.commitSha,
      });
    }

    res.setHeader('Allow', 'GET, POST, DELETE');
    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (err) {
    if (err instanceof GitHubApiError) {
      return res.status(err.status).json({ error: err.message });
    }
    console.error('[Journals API Error]', err);
    return res.status(500).json({
      error: 'Unable to sync journal with GitHub right now. Please try again shortly.',
    });
  }
}

