import http from 'node:http';
import { readFile } from 'node:fs/promises';
const port = Number(process.env.PORT || 3000);
const files = { '/': ['index.html', 'text/html; charset=utf-8'], '/index.html': ['index.html', 'text/html; charset=utf-8'], '/style.css': ['style.css', 'text/css; charset=utf-8'], '/app.js': ['app.js', 'text/javascript; charset=utf-8'] };
files['/portal.css'] = ['portal.css', 'text/css; charset=utf-8'];
files['/presentation.html'] = ['presentation.html', 'text/html; charset=utf-8'];
files['/presentation.js'] = ['presentation.js', 'text/javascript; charset=utf-8'];
files['/saradnici.html'] = ['saradnici.html', 'text/html; charset=utf-8'];
http.createServer(async (req, res) => {
  const file = files[new URL(req.url, 'http://localhost').pathname];
  if (!file) { res.writeHead(404); res.end('Not found'); return; }
  try { const body = await readFile(new URL(file[0], import.meta.url)); res.writeHead(200, { 'Content-Type': file[1] }); res.end(body); }
  catch { res.writeHead(500); res.end('Server error'); }
}).listen(port, '127.0.0.1', () => console.log(`West Life: http://localhost:${port}`));
