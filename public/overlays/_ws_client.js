/**
 * RESPAWN ØSTFOLD — WebSocket klient (session-aware)
 * Inkluderes i alle overlay-filer.
 */
(function () {
  const WS_URL = (() => {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      return 'ws://localhost:3001';
    }
    return 'wss://respawn-ws.up.railway.app'; // oppdater med Railway-URL etter deploy
  })();

  const SESSION_ID = new URLSearchParams(location.search).get('session') || 'default';

  let ws, reconnectTimer;

  function connect() {
    ws = new WebSocket(`${WS_URL}?session=${SESSION_ID}&role=overlay`);

    ws.onopen = () => {
      console.log(`[RO] Tilkoblet — session: ${SESSION_ID}`);
      document.body.dataset.wsStatus = 'connected';
      clearTimeout(reconnectTimer);
    };

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === 'init') {
          const s = msg.state;
          if (s.scene)       window.dispatchEvent(new CustomEvent('ro:scene',       { detail: s.scene }));
          if (s.match)       window.dispatchEvent(new CustomEvent('ro:match',       { detail: s.match }));
          if (s.commentator) window.dispatchEvent(new CustomEvent('ro:commentator', { detail: s.commentator }));
          if (s.interview)   window.dispatchEvent(new CustomEvent('ro:interview',   { detail: s.interview }));
          if (s.bracket)     window.dispatchEvent(new CustomEvent('ro:bracket',     { detail: s.bracket }));
          if (s.countdown)   window.dispatchEvent(new CustomEvent('ro:countdown',   { detail: s.countdown }));
        } else {
          window.dispatchEvent(new CustomEvent('ro:' + msg.type, { detail: msg.data }));
        }
      } catch (err) {
        console.error('[RO] Parse error', err);
      }
    };

    ws.onclose = () => {
      document.body.dataset.wsStatus = 'disconnected';
      clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(connect, 2000);
    };

    ws.onerror = () => ws.close();
  }

  connect();
})();
