import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const COOKIE_NAME = 'author_admin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function sha256Buffer(value: string): Buffer {
  return createHash('sha256').update(value, 'utf8').digest();
}

function isProductionRuntime(): boolean {
  return process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
}

export function getConfiguredPasskey(): string | null {
  const envPasskey = process.env.ADMIN_PASSKEY?.trim();
  if (envPasskey) return envPasskey;
  if (!isProductionRuntime()) return 'rishitha';
  return null;
}

export function verifyAdminPasskey(enteredPasskey: string): {
  ok: boolean;
  misconfigured?: boolean;
} {
  const configured = getConfiguredPasskey();
  if (!configured) {
    return { ok: false, misconfigured: true };
  }
  const enteredHash = sha256Buffer(enteredPasskey);
  const configuredHash = sha256Buffer(configured);
  return { ok: timingSafeEqual(enteredHash, configuredHash) };
}

function getSigningSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET?.trim() || getConfiguredPasskey();
}

export function createSessionToken(): string | null {
  const secret = getSigningSecret();
  if (!secret) return null;

  const payload = {
    role: 'admin',
    exp: Date.now() + SESSION_TTL_MS,
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = createHmac('sha256', secret).update(payloadB64).digest('base64url');
  return `${payloadB64}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const secret = getSigningSecret();
  if (!secret) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payloadB64, sigB64] = parts;
  if (!payloadB64 || !sigB64) return false;

  const expectedSig = createHmac('sha256', secret).update(payloadB64).digest('base64url');
  const actualBuf = Buffer.from(sigB64, 'utf8');
  const expectedBuf = Buffer.from(expectedSig, 'utf8');
  if (actualBuf.length !== expectedBuf.length || !timingSafeEqual(actualBuf, expectedBuf)) {
    return false;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8')) as {
      role?: string;
      exp?: number;
    };
    return parsed.role === 'admin' && typeof parsed.exp === 'number' && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

function parseCookieHeader(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) return {};
  const result: Record<string, string> = {};
  for (const part of cookieHeader.split(';')) {
    const eqIndex = part.indexOf('=');
    if (eqIndex <= 0) continue;
    const key = part.slice(0, eqIndex).trim();
    const val = part.slice(eqIndex + 1).trim();
    result[key] = decodeURIComponent(val);
  }
  return result;
}

export function isAuthenticatedRequest(req: VercelRequest): boolean {
  const cookies = parseCookieHeader(req.headers.cookie);
  return verifySessionToken(cookies[COOKIE_NAME]);
}

function shouldUseSecureCookie(req: VercelRequest): boolean {
  const proto = req.headers['x-forwarded-proto'];
  const protoValue = Array.isArray(proto) ? proto[0] : proto;
  return protoValue === 'https' || process.env.VERCEL === '1';
}

export function setSessionCookie(res: VercelResponse, token: string, req: VercelRequest): void {
  const maxAgeSeconds = Math.floor(SESSION_TTL_MS / 1000);
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAgeSeconds}`,
  ];
  if (shouldUseSecureCookie(req)) {
    parts.push('Secure');
  }
  res.setHeader('Set-Cookie', parts.join('; '));
}

export function clearSessionCookie(res: VercelResponse, req: VercelRequest): void {
  const parts = [
    `${COOKIE_NAME}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0',
  ];
  if (shouldUseSecureCookie(req)) {
    parts.push('Secure');
  }
  res.setHeader('Set-Cookie', parts.join('; '));
}

export function getClientIp(req: VercelRequest): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  const firstForwarded = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(',')[0];
  return firstForwarded?.trim() || req.socket.remoteAddress || 'anonymous';
}

