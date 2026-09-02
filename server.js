import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { join, normalize, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = process.env.PORT || 3000;
const root = join(__dirname, 'dist');
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

async function getRaisedTotal() {
  if (!PAYSTACK_SECRET_KEY) return null;
  let amount = 0;
  let page = 1;
  const perPage = 200;
  while (true) {
    const url = `https://api.paystack.co/transaction?page=${page}&perPage=${perPage}&status=success`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` }
    });
    if (!res.ok) {
      throw new Error('Paystack API error ' + res.status);
    }
    const data = await res.json();
    if (!data.status || !data.data) break;
    const txns = data.data;
    if (!txns.length) break;
    for (const t of txns) {
      if (t.status === 'success' && typeof t.amount === 'number') {
        amount += t.amount;
      }
    }
    const totalPages = (data.meta || {}).page_count || page;
    if (page >= totalPages) break;
    page++;
  }
  return amount;
}

const server = http.createServer(async (req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }

  if (pathname === '/api/raised') {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    try {
      if (!PAYSTACK_SECRET_KEY) {
        res.writeHead(503);
        res.end(JSON.stringify({ ok: false, error: 'not_configured' }));
        return;
      }
      const total = await getRaisedTotal();
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true, total, currency: 'KES' }));
    } catch (e) {
      res.writeHead(502);
      res.end(JSON.stringify({ ok: false, error: 'paystack_error', message: String(e.message || e) }));
    }
    return;
  }

  if (pathname === '/') pathname = '/index.html';
  let filePath = normalize(join(root, pathname));
  if (!filePath.startsWith(root)) filePath = join(root, 'index.html');
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) filePath = join(root, 'index.html');
  res.writeHead(200, { 'Content-Type': MIME[extname(filePath).toLowerCase()] || 'application/octet-stream' });
  createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log('EJ Hope Foundation serving dist on port ' + PORT);
});