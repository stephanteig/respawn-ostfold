/**
 * RESPAWN ØSTFOLD — Overlay WebSocket Server (session-aware)
 *
 * Lokal kjøring:  node server.js          (port 3001)
 * Railway deploy: PORT settes automatisk via env
 *
 * Sesjon-URL:  ws://localhost:3001?session=live&role=control
 *              ws://localhost:3001?session=live&role=overlay
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');
const url  = require('url');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 3001;
const DIR  = __dirname;

// ── MIME types ──
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
  '.md':   'text/plain',
};

// ── Session store: Map<sessionId, { clients: Set<WebSocket>, state: object }> ──
const sessions = new Map();

function getSession(id) {
  if (!sessions.has(id)) {
    sessions.set(id, {
      clients: new Set(),
      state: {
        scene: '', match: null, commentator: null,
        interview: null, bracket: null, countdown: null,
      },
    });
    console.log(`[session] Opprettet: "${id}"`);
  }
  return sessions.get(id);
}

function cleanSession(id) {
  const s = sessions.get(id);
  if (s && s.clients.size === 0) {
    sessions.delete(id);
    console.log(`[session] Ryddet tom sesjon: "${id}"`);
  }
}

// ── HTTP server (local dev: serves overlay files) ──
const server = http.createServer((req, res) => {
  // Health check for Railway
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Respawn Østfold WS Server OK');
    return;
  }

  let urlPath = req.url.split('?')[0];
  if (urlPath === '/' || urlPath === '') urlPath = '/KONTROLLPANEL.html';

  const filePath = path.join(DIR, urlPath);
  if (!filePath.startsWith(DIR)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found: ' + urlPath);
      return;
    }
    const ext  = path.extname(filePath);
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'no-cache' });
    res.end(data);
  });
});

// ── WebSocket server ──
const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
  const params    = new url.URLSearchParams(url.parse(req.url).query);
  const sessionId = params.get('session') || 'default';
  const role      = params.get('role')    || 'overlay';

  const session = getSession(sessionId);
  session.clients.add(ws);

  const clientCount = session.clients.size;
  console.log(`[connect] session="${sessionId}" role=${role} (${clientCount} tilkoblet)`);

  // Send current state to new client
  ws.send(JSON.stringify({ type: 'init', state: session.state, sessionId, clients: clientCount }));

  ws.on('message', (raw) => {
    // Only 'control' role can broadcast
    if (role !== 'control') return;

    try {
      const msg = JSON.parse(raw);
      console.log(`[msg] session="${sessionId}" type=${msg.type}`);

      // Update session state
      const stateKey = msg.type;
      if (stateKey in session.state) {
        session.state[stateKey] = msg.data;
      }

      // Broadcast to all overlays in this session (not back to sender)
      const out = JSON.stringify({ type: msg.type, data: msg.data });
      session.clients.forEach((client) => {
        if (client !== ws && client.readyState === 1) {
          client.send(out);
        }
      });
    } catch (e) {
      console.error('[WS] Parse error:', e.message);
    }
  });

  ws.on('close', () => {
    session.clients.delete(ws);
    console.log(`[disconnect] session="${sessionId}" (${session.clients.size} igjen)`);
    cleanSession(sessionId);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  RESPAWN ØSTFOLD — Overlay WebSocket Server');
  console.log('');
  console.log(`  Port:           ${PORT}`);
  console.log(`  Kontrollpanel:  http://localhost:${PORT}/KONTROLLPANEL.html`);
  console.log(`  Overlays (OBS): ws://localhost:${PORT}?session=live&role=overlay`);
  console.log('');
  console.log('  Sesjoner: bruk ?session=live for produksjon,');
  console.log('            ?session=<navn> for testing.');
  console.log('');
});
