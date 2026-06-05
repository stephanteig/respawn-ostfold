/**
 * RESPAWN ØSTFOLD — WebSocket klient
 * Inkluderes i alle overlay-filer.
 * Kobler til server.js og lytter på oppdateringer.
 */
(function() {
  let ws, reconnectTimer;

  function connect() {
    ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('[RO] WebSocket tilkoblet');
      document.body.dataset.wsStatus = 'connected';
    };

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        // 'init' gir full state, enkelt-type gir bare den typen
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
      } catch(err) { console.error('[RO] Parse error', err); }
    };

    ws.onclose = () => {
      document.body.dataset.wsStatus = 'disconnected';
      clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(connect, 2000); // reconnect
    };

    ws.onerror = () => ws.close();
  }

  connect();
})();
