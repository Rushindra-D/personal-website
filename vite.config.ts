import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import contactHandler from './api/contact.ts'
import adminAuthHandler from './api/admin-auth.ts'
import journalsHandler from './api/journals.ts'
import sitemapHandler from './api/sitemap.ts'

type ApiHandler = (req: any, res: any) => Promise<unknown> | unknown;

function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      if (!raw.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw) as Record<string, unknown>);
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function attachVercelMiddleware(
  server: { middlewares: { use: (route: string, fn: (req: IncomingMessage, res: ServerResponse) => void) => void } },
  route: string,
  handler: ApiHandler,
  env: Record<string, string>
) {
  server.middlewares.use(route, async (req, res) => {
    for (const [key, val] of Object.entries(env)) {
      if (val && !process.env[key]) {
        process.env[key] = val;
      }
    }

    try {
      const parsedUrl = new URL(req.url || '/', 'http://localhost');
      const query: Record<string, string> = {};
      parsedUrl.searchParams.forEach((value, key) => {
        query[key] = value;
      });

      const method = (req.method || 'GET').toUpperCase();
      const body = method === 'GET' || method === 'HEAD' ? {} : await readJsonBody(req);

      const fakeReq = Object.assign(req, {
        body,
        query,
        cookies: {},
      });

      const fakeRes = Object.assign(res, {
        status(statusCode: number) {
          res.statusCode = statusCode;
          return fakeRes;
        },
        json(data: unknown) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return fakeRes;
        },
        send(data: unknown) {
          res.end(typeof data === 'string' ? data : JSON.stringify(data));
          return fakeRes;
        },
      });

      await handler(fakeReq, fakeRes);
    } catch (err) {
      console.error(`[Vite Local API Error: ${route}]`, err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Local API request failed.' }));
    }
  });
}

function localApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'local-api-plugin',
    configureServer(server) {
      attachVercelMiddleware(server, '/api/contact', contactHandler, env);
      attachVercelMiddleware(server, '/api/admin-auth', adminAuthHandler, env);
      attachVercelMiddleware(server, '/api/journals', journalsHandler, env);
      attachVercelMiddleware(server, '/api/sitemap', sitemapHandler, env);
      attachVercelMiddleware(server, '/sitemap.xml', sitemapHandler, env);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      localApiPlugin(env),
    ],
  };
});
