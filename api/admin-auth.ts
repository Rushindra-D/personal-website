import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  clearSessionCookie,
  createSessionToken,
  getClientIp,
  getConfiguredPasskey,
  isAuthenticatedRequest,
  setSessionCookie,
  verifyAdminPasskey,
} from './_lib/auth.ts';

interface AuthAttemptRecord {
  count: number;
  firstRequestTime: number;
}

const attemptMap = new Map<string, AuthAttemptRecord>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = attemptMap.get(ip);

  if (record && now - record.firstRequestTime < RATE_WINDOW_MS) {
    if (record.count >= MAX_ATTEMPTS) return true;
    record.count += 1;
    return false;
  }

  attemptMap.set(ip, { count: 1, firstRequestTime: now });

  if (attemptMap.size > 1000) {
    for (const [key, val] of attemptMap.entries()) {
      if (now - val.firstRequestTime > RATE_WINDOW_MS) {
        attemptMap.delete(key);
      }
    }
  }
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const githubConfigured = Boolean(process.env.GITHUB_TOKEN?.trim());
  const passkeyConfigured = Boolean(getConfiguredPasskey());

  if (req.method === 'GET') {
    const authenticated = isAuthenticatedRequest(req);
    return res.status(200).json({
      authenticated,
      githubConfigured,
      passkeyConfigured,
    });
  }

  if (req.method === 'DELETE') {
    clearSessionCookie(res, req);
    return res.status(200).json({ authenticated: false });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST, DELETE');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: 'Too many login attempts. Please wait a few minutes and try again.',
    });
  }

  const body = (req.body || {}) as { passkey?: unknown };
  if (typeof body.passkey !== 'string' || !body.passkey.trim()) {
    return res.status(400).json({ error: 'Please enter your author passkey.' });
  }

  const result = verifyAdminPasskey(body.passkey.trim());
  if (result.misconfigured) {
    return res.status(500).json({
      error:
        'ADMIN_PASSKEY is not configured in your server environment variables. Add ADMIN_PASSKEY in Vercel Settings > Environment Variables and redeploy.',
    });
  }

  if (!result.ok) {
    return res.status(401).json({ error: 'Incorrect passkey. Please try again.' });
  }

  // Reset attempt counter on successful login
  attemptMap.delete(clientIp);

  const token = createSessionToken();
  if (!token) {
    return res.status(500).json({ error: 'Unable to issue session token.' });
  }

  setSessionCookie(res, token, req);
  return res.status(200).json({
    authenticated: true,
    githubConfigured,
    passkeyConfigured,
  });
}

