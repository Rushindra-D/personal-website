import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Simple in-memory rate limiting for serverless execution lifetimes
// Max 5 submissions per 10 minutes per IP address
interface RateLimitRecord {
  count: number;
  firstRequestTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Basic HTML sanitizer for safe email rendering
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Please use POST.' });
  }

  // 2. Client IP extraction & Rate Limiting
  const forwardedFor = req.headers['x-forwarded-for'];
  const clientIp = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(',')[0]) ||
    req.socket.remoteAddress ||
    'anonymous';

  const now = Date.now();
  const clientRecord = rateLimitMap.get(clientIp);

  if (clientRecord) {
    if (now - clientRecord.firstRequestTime < RATE_LIMIT_WINDOW_MS) {
      if (clientRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({
          error: 'Too many contact requests. Please wait a few minutes before trying again.',
        });
      }
      clientRecord.count += 1;
    } else {
      rateLimitMap.set(clientIp, { count: 1, firstRequestTime: now });
    }
  } else {
    rateLimitMap.set(clientIp, { count: 1, firstRequestTime: now });
  }

  // Clean old rate limit entries to prevent memory leak
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now - value.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(key);
      }
    }
  }

  try {
    const body = req.body || {};
    const { name, email, subject, message, _gotcha, hp_website } = body;

    // 3. Spam Honeypot Check
    // If hidden honeypot fields are filled, silently drop without sending and return success
    if (_gotcha || hp_website) {
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully. Thank you for contacting Rishitha.',
      });
    }

    // 4. Input Validation & Sanitization
    if (typeof name !== 'string' || typeof email !== 'string' || typeof subject !== 'string' || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Invalid form submission. All fields must be text.',
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim().replace(/[\r\n]+/g, ' '); // Prevent email header injection
    const trimmedMessage = message.trim();

    if (!trimmedName || trimmedName.length > 100) {
      return res.status(400).json({
        error: 'Please provide a valid name (up to 100 characters).',
      });
    }

    // RFC 5322 standard email validation regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!trimmedEmail || trimmedEmail.length > 254 || !emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        error: 'Please provide a valid email address.',
      });
    }

    if (!trimmedSubject || trimmedSubject.length > 200) {
      return res.status(400).json({
        error: 'Please provide a subject line (up to 200 characters).',
      });
    }

    if (!trimmedMessage || trimmedMessage.length > 5000) {
      return res.status(400).json({
        error: 'Please enter a message (between 1 and 5000 characters).',
      });
    }

    // 5. Environment configuration verification
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[Contact API Error] RESEND_API_KEY environment variable is not configured.');
      return res.status(500).json({
        error: 'Unable to send your message right now. Please try again later.',
      });
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'rishithagorupati@gmail.com';
    const senderEmail = process.env.CONTACT_SENDER_EMAIL || 'onboarding@resend.dev';

    // 6. Resend Email Dispatch
    const resend = new Resend(apiKey);

    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeSubject = escapeHtml(trimmedSubject);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br/>');

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Georgia, 'Times New Roman', serif; background-color: #FDFBF7; color: #221E1B; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #EAE3D6; border-radius: 4px; padding: 32px; }
    .header { border-bottom: 2px solid #856E4E; padding-bottom: 16px; margin-bottom: 24px; }
    .header h2 { margin: 0 0 6px 0; font-size: 24px; color: #221E1B; font-weight: normal; }
    .header p { margin: 0; font-size: 13px; color: #856E4E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-transform: uppercase; letter-spacing: 0.12em; }
    .field-card { background: #FAF7F2; border-left: 3px solid #856E4E; padding: 16px; margin-bottom: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; }
    .field-row { margin-bottom: 8px; }
    .field-row:last-child { margin-bottom: 0; }
    .field-label { font-weight: 600; color: #736B61; width: 100px; display: inline-block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
    .field-value { color: #221E1B; }
    .message-title { font-size: 14px; font-weight: 600; color: #736B61; text-transform: uppercase; letter-spacing: 0.05em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin-bottom: 8px; }
    .message-body { background: #FFFFFF; border: 1px solid #EAE3D6; padding: 20px; font-size: 16px; line-height: 1.7; color: #221E1B; white-space: normal; border-radius: 2px; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #EAE3D6; font-size: 12px; color: #968D81; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .reply-badge { display: inline-block; background: #221E1B; color: #FDFBF7; padding: 10px 18px; text-decoration: none; border-radius: 2px; font-size: 13px; margin-top: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Message</h2>
      <p>Rishitha Gorupati &bull; Author Portfolio</p>
    </div>

    <div class="field-card">
      <div class="field-row">
        <span class="field-label">Visitor:</span>
        <span class="field-value"><strong>${safeName}</strong></span>
      </div>
      <div class="field-row">
        <span class="field-label">Email:</span>
        <span class="field-value"><a href="mailto:${safeEmail}" style="color: #856E4E; text-decoration: none;">${safeEmail}</a></span>
      </div>
      <div class="field-row">
        <span class="field-label">Subject:</span>
        <span class="field-value">${safeSubject}</span>
      </div>
    </div>

    <div class="message-title">Message:</div>
    <div class="message-body">
      ${safeMessage}
    </div>

    <div style="text-align: center;">
      <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(trimmedSubject)}" class="reply-badge">
        Reply to ${safeName} &rarr;
      </a>
    </div>

    <div class="footer">
      This message was sent from the contact form on your official portfolio website.<br/>
      You can directly reply to this email to respond to the visitor (${safeEmail}).
    </div>
  </div>
</body>
</html>
    `.trim();

    const textContent = `New Contact Form Message - Rishitha Gorupati Portfolio\n\n` +
      `Visitor Name: ${trimmedName}\n` +
      `Visitor Email: ${trimmedEmail}\n` +
      `Subject: ${trimmedSubject}\n\n` +
      `Message:\n${trimmedMessage}\n\n` +
      `---\nReply to this email directly to write back to ${trimmedName} (${trimmedEmail}).`;

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: [receiverEmail],
      replyTo: trimmedEmail,
      subject: `[Website Message] ${trimmedSubject} - from ${trimmedName}`,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error('[Resend Error]', error);
      return res.status(500).json({
        error: 'Unable to send your message right now. Please try again later.',
      });
    }

    return res.status(200).json({
      success: true,
      id: data?.id,
      message: 'Message sent successfully. Thank you for contacting Rishitha.',
    });
  } catch (err) {
    console.error('[Server Error in Contact API]', err);
    return res.status(500).json({
      error: 'Unable to send your message right now. Please try again later.',
    });
  }
}
