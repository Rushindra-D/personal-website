import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'
import handler from './api/contact.ts'

function contactApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        for (const [key, val] of Object.entries(env)) {
          if (val && !process.env[key]) {
            process.env[key] = val;
          }
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed. Please use POST.' }));
          return;
        }

        let bodyRaw = '';
        req.on('data', (chunk) => {
          bodyRaw += chunk;
        });

        req.on('end', async () => {
          try {
            const body = bodyRaw ? JSON.parse(bodyRaw) : {};
            const fakeReq = Object.assign(req, {
              body,
              query: {},
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

            await handler(fakeReq as any, fakeRes as any);
          } catch (err) {
            console.error('[Vite Local Contact API Error]', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Unable to send your message right now. Please try again later.' }));
          }
        });
      });
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
      contactApiPlugin(env),
    ],
  };
});

