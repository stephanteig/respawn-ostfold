'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import SkinViewer from '@/components/SkinViewer';
import PlayerCard, { TBD_SKIN_USERNAME, type Player } from '@/components/PlayerCard';
import {
  readRoster,
  writeRoster,
  ROSTER_FILES,
  type RosterCategory,
} from '@/components/useRoster';
import playersSeed from '@/public/data/players.json';
import commentatorsSeed from '@/public/data/commentators.json';
import guestsSeed from '@/public/data/guests.json';

// ── Config ──
const WS_BASE =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'ws://localhost:3001'
    : 'wss://respawnostfold-production.up.railway.app';

const OVERLAY_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://stephanteig.github.io/respawn-ostfold/overlays'
    : 'http://localhost:3000/overlays';

const OVERLAYS = [
  { id: '01_countdown',        label: 'Countdown' },
  { id: '02_stinger',          label: 'Stinger' },
  { id: '03_commentator_cam',  label: 'Kommentator-kamera' },
  { id: '04_nameplates',       label: 'Nameplates' },
  { id: '05_background_plate', label: 'Background Plate' },
  { id: '06_bracket',          label: 'Bracket' },
  { id: '07_multistream',      label: 'Multistream 1v1' },
  { id: '08_interview',        label: 'Intervju' },
];

// ── Types ──
type Tab = 'scene' | 'match' | 'bracket' | 'commentator' | 'interview' | 'countdown' | 'spillere';

interface BracketMatch {
  p1: string; s1: string;
  p2: string; s2: string;
  winner: 0 | 1 | 2;
}

interface BracketState {
  qf: BracketMatch[];
  sf: BracketMatch[];
  f:  BracketMatch[];
  champion: string;
}

const emptyMatch = (): BracketMatch => ({ p1: '', s1: '', p2: '', s2: '', winner: 0 });

const defaultBracket = (): BracketState => ({
  qf: [emptyMatch(), emptyMatch(), emptyMatch(), emptyMatch()],
  sf: [emptyMatch(), emptyMatch()],
  f:  [emptyMatch()],
  champion: '',
});

// ── Toast ──
function useToast() {
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const show = useCallback((text: string) => {
    setMsg(text);
    setVisible(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), 2200);
  }, []);
  return { msg, visible, show };
}

// ── Sub-components ──
function SceneTab({ send }: { send: (type: string, data: unknown) => void }) {
  const [activeScene, setActiveScene] = useState('');
  const scenes = [
    { id: 'starting',     icon: '🟢', label: 'STARTER SNART' },
    { id: 'brb',          icon: '🔄', label: 'STRAKS TILBAKE' },
    { id: 'break',        icon: '⏸', label: 'PAUSE' },
    { id: 'intermission', icon: '⚡', label: 'MELLOMSPILL' },
    { id: 'setup',        icon: '⚙', label: 'KLARGJØRING' },
    { id: '',             icon: '✕', label: 'NULLSTILL', danger: true },
  ];
  function setScene(id: string) {
    setActiveScene(id);
    send('scene', id);
  }
  return (
    <div>
      <div style={s.previewNote}>Klikk en scene for å sende direkte til 05_background_plate.html</div>
      <div style={s.sceneGrid}>
        {scenes.map((sc) => (
          <button
            key={sc.label}
            onClick={() => setScene(sc.id)}
            style={{
              ...s.sceneBtn,
              ...(sc.danger ? s.sceneBtnDanger : {}),
              ...(activeScene === sc.id && !sc.danger ? s.sceneBtnActive : {}),
            }}
          >
            <span style={{ fontSize: '22px' }}>{sc.icon}</span>
            {sc.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MatchTab({ send }: { send: (type: string, data: unknown) => void }) {
  const [round, setRound] = useState('');
  const [activeRound, setActiveRound] = useState('');
  const [p1, setP1] = useState(''); const [p1h, setP1h] = useState('');
  const [p2, setP2] = useState(''); const [p2h, setP2h] = useState('');
  const rounds = ['GRUPPESPILL', 'KVARTFINALE', 'SEMIFINALE', 'BRONSE', 'FINALE'];
  function pickRound(r: string) { setActiveRound(r); setRound(r); }
  function push() {
    send('match', {
      p1:    p1    || 'PLAYER_ONE',
      p1h:   p1h   || '@player1',
      p2:    p2    || 'PLAYER_TWO',
      p2h:   p2h   || '@player2',
      round: round || 'KAMP',
    });
  }
  return (
    <div>
      <div style={s.fieldWrap}>
        <label style={s.label}>RUNDE</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          {rounds.map((r) => (
            <button
              key={r}
              onClick={() => pickRound(r)}
              style={{ ...s.pill, ...(activeRound === r ? s.pillActive : {}) }}
            >
              {r}
            </button>
          ))}
        </div>
        <input
          style={s.input}
          value={round}
          onChange={e => { setRound(e.target.value); setActiveRound(''); }}
          placeholder="Eller skriv egendefinert runde..."
        />
      </div>
      <div style={{ ...s.playerBlock, borderTopColor: 'var(--green)' }}>
        <div style={{ ...s.playerLabel, color: 'var(--green)' }}>▶ SPILLER 1 — VENSTRE</div>
        <div style={s.formGrid}>
          <div style={s.fieldWrap}><label style={s.label}>IGN</label><input style={s.input} value={p1} onChange={e => setP1(e.target.value)} placeholder="PlayerName" /></div>
          <div style={s.fieldWrap}><label style={s.label}>HANDLE</label><input style={s.input} value={p1h} onChange={e => setP1h(e.target.value)} placeholder="@handle" /></div>
        </div>
      </div>
      <div style={{ ...s.playerBlock, borderTopColor: 'var(--green-d)' }}>
        <div style={{ ...s.playerLabel, color: 'var(--green-d)' }}>▶ SPILLER 2 — HØYRE</div>
        <div style={s.formGrid}>
          <div style={s.fieldWrap}><label style={s.label}>IGN</label><input style={s.input} value={p2} onChange={e => setP2(e.target.value)} placeholder="PlayerName" /></div>
          <div style={s.fieldWrap}><label style={s.label}>HANDLE</label><input style={s.input} value={p2h} onChange={e => setP2h(e.target.value)} placeholder="@handle" /></div>
        </div>
      </div>
      <button style={s.sendBtn} onClick={push}>⚡ OPPDATER OVERLAY</button>
    </div>
  );
}

function BracketTab({ send }: { send: (type: string, data: unknown) => void }) {
  const [bracket, setBracket] = useState<BracketState>(defaultBracket());
  function updateMatch(round: keyof Omit<BracketState, 'champion'>, idx: number, field: keyof BracketMatch, val: string | number) {
    setBracket(prev => {
      const copy = { ...prev, [round]: prev[round].map((m, i) => i === idx ? { ...m, [field]: val } : m) };
      return copy;
    });
  }
  function push() {
    const roundNames = { qf: 'KVARTFINALE', sf: 'SEMIFINALE', f: 'FINALE' };
    const rounds = (['qf', 'sf', 'f'] as const).map(r => ({
      name: roundNames[r],
      matches: bracket[r].map(m => ({
        p1: { name: m.p1 || 'TBD', seed: '', score: m.s1 || '-' },
        p2: { name: m.p2 || 'TBD', seed: '', score: m.s2 || '-' },
        winner: m.winner,
      })),
    }));
    send('bracket', { rounds, champion: bracket.champion });
  }
  function renderRound(key: 'qf' | 'sf' | 'f', title: string) {
    return (
      <div style={{ marginBottom: '28px' }}>
        <div style={s.bracketRoundTitle}>{title}</div>
        {bracket[key].map((m, i) => (
          <div key={i} style={s.bracketMatch}>
            <input style={s.input} value={m.p1} onChange={e => updateMatch(key, i, 'p1', e.target.value)} placeholder="Spiller 1" />
            <input style={{ ...s.input, textAlign: 'center', maxWidth: '52px' }} value={m.s1} onChange={e => updateMatch(key, i, 's1', e.target.value)} placeholder="S" />
            <span style={s.vs}>VS</span>
            <input style={s.input} value={m.p2} onChange={e => updateMatch(key, i, 'p2', e.target.value)} placeholder="Spiller 2" />
            <input style={{ ...s.input, textAlign: 'center', maxWidth: '52px' }} value={m.s2} onChange={e => updateMatch(key, i, 's2', e.target.value)} placeholder="S" />
            <select
              style={s.winnerSelect}
              value={m.winner}
              onChange={e => updateMatch(key, i, 'winner', parseInt(e.target.value))}
            >
              <option value={0}>VINNER?</option>
              <option value={1}>P1 ✓</option>
              <option value={2}>P2 ✓</option>
            </select>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      {renderRound('qf', 'KVARTFINALE')}
      {renderRound('sf', 'SEMIFINALE')}
      {renderRound('f',  'FINALE')}
      <hr style={{ border: 'none', borderTop: '1px solid var(--forest)', margin: '24px 0' }} />
      <div style={s.fieldWrap}>
        <label style={s.label}>VINNER / MESTER</label>
        <input style={s.input} value={bracket.champion} onChange={e => setBracket(p => ({ ...p, champion: e.target.value }))} placeholder="Turneringsvinner IGN" />
      </div>
      <button style={s.sendBtn} onClick={push}>⚡ OPPDATER BRACKET</button>
    </div>
  );
}

function CommentatorTab({ send }: { send: (type: string, data: unknown) => void }) {
  const [role, setRole] = useState('KOMMENTATOR');
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  return (
    <div>
      <div style={s.fieldWrap}><label style={s.label}>ROLLE</label><input style={s.input} value={role} onChange={e => setRole(e.target.value)} /></div>
      <div style={s.formGrid}>
        <div style={s.fieldWrap}><label style={s.label}>NAVN</label><input style={s.input} value={name} onChange={e => setName(e.target.value)} placeholder="Navn Navnesen" /></div>
        <div style={s.fieldWrap}><label style={s.label}>HANDLE</label><input style={s.input} value={handle} onChange={e => setHandle(e.target.value)} placeholder="@handle" /></div>
      </div>
      <button style={s.sendBtn} onClick={() => send('commentator', { role: role || 'KOMMENTATOR', name: name || 'KOMMENTATOR', handle })}>⚡ OPPDATER OVERLAY</button>
    </div>
  );
}

function InterviewTab({ send }: { send: (type: string, data: unknown) => void }) {
  const [player, setPlayer] = useState('');
  const [handle, setHandle] = useState('');
  const [elo, setElo] = useState('');
  const [time, setTime] = useState('');
  const [rank, setRank] = useState('');
  const [comm, setComm] = useState('');
  return (
    <div>
      <div style={s.formGrid}>
        <div style={s.fieldWrap}><label style={s.label}>SPILLER IGN</label><input style={s.input} value={player} onChange={e => setPlayer(e.target.value)} placeholder="MinecraftUsername" /></div>
        <div style={s.fieldWrap}><label style={s.label}>HANDLE</label><input style={s.input} value={handle} onChange={e => setHandle(e.target.value)} placeholder="@handle" /></div>
      </div>
      <div style={s.formGrid3}>
        <div style={s.fieldWrap}><label style={s.label}>ELO</label><input style={s.input} value={elo} onChange={e => setElo(e.target.value)} placeholder="1500" /></div>
        <div style={s.fieldWrap}><label style={s.label}>BEST TIME</label><input style={s.input} value={time} onChange={e => setTime(e.target.value)} placeholder="7:42" /></div>
        <div style={s.fieldWrap}><label style={s.label}>RANK</label><input style={s.input} value={rank} onChange={e => setRank(e.target.value)} placeholder="Diamond+" /></div>
      </div>
      <div style={s.fieldWrap}><label style={s.label}>KOMMENTATOR NAVN</label><input style={s.input} value={comm} onChange={e => setComm(e.target.value)} placeholder="Kommentator Navn" /></div>
      <button style={s.sendBtn} onClick={() => send('interview', { player: player || 'Player', handle, elo: elo || '—', time: time || '—', rank: rank || '—', comm: comm || 'KOMMENTATOR' })}>⚡ OPPDATER OVERLAY</button>
    </div>
  );
}

function CountdownTab({ send }: { send: (type: string, data: unknown) => void }) {
  const [mins, setMins] = useState(30);
  const [secs, setSecs] = useState(0);
  const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const presets = [5, 10, 15, 30, 60];
  return (
    <div>
      <div style={s.cdDisplay}>{display}</div>
      <div style={s.formGrid}>
        <div style={s.fieldWrap}><label style={s.label}>MINUTTER</label><input style={s.input} type="number" value={mins} min={1} max={99} onChange={e => setMins(parseInt(e.target.value) || 0)} /></div>
        <div style={s.fieldWrap}><label style={s.label}>SEKUNDER</label><input style={s.input} type="number" value={secs} min={0} max={59} onChange={e => setSecs(parseInt(e.target.value) || 0)} /></div>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        {presets.map(p => (
          <button key={p} onClick={() => { setMins(p); setSecs(0); }} style={s.cdBtn}>{p} MIN</button>
        ))}
      </div>
      <button style={{ ...s.sendBtn, marginTop: '16px' }} onClick={() => send('countdown', { total: mins * 60 + secs, startedAt: Date.now() })}>⚡ START COUNTDOWN</button>
    </div>
  );
}

const PLAYER_COUNT_KEY = 'respawn_player_count';

function readPlayerCount(): number {
  try {
    return parseInt(localStorage.getItem(PLAYER_COUNT_KEY) || '0', 10) || 0;
  } catch {
    return 0;
  }
}

const CATEGORY_LABELS: Record<RosterCategory, string> = {
  players: 'Spillere',
  commentators: 'Kommentatorer',
  guests: 'Gjester',
};

const CATEGORY_SINGULAR: Record<RosterCategory, string> = {
  players: 'spiller',
  commentators: 'kommentator',
  guests: 'gjest',
};

function cleanSeed(data: unknown): Player[] {
  if (!Array.isArray(data)) return [];
  return (data as Player[]).filter((p) => p && typeof p.username === 'string' && p.username.trim() !== '');
}

const ROSTER_SEEDS: Record<RosterCategory, Player[]> = {
  players: cleanSeed(playersSeed),
  commentators: cleanSeed(commentatorsSeed),
  guests: cleanSeed(guestsSeed),
};

function initRoster(category: RosterCategory): Player[] {
  if (typeof window === 'undefined') return ROSTER_SEEDS[category];
  return readRoster(category) ?? ROSTER_SEEDS[category];
}

function PlayerAdminTab({ show }: { show: (text: string) => void }) {
  // Part A — manual counter
  const [count, setCount] = useState<number>(() => (typeof window !== 'undefined' ? readPlayerCount() : 0));
  // Part B — roster admin (players / commentators / guests)
  const [category, setCategory] = useState<RosterCategory>('players');
  const [rosters, setRosters] = useState<Record<RosterCategory, Player[]>>(() => ({
    players: initRoster('players'),
    commentators: initRoster('commentators'),
    guests: initRoster('guests'),
  }));
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [seed, setSeed] = useState('');
  const [info, setInfo] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [previewName, setPreviewName] = useState('');

  const roster = rosters[category];
  const singular = CATEGORY_SINGULAR[category];

  // Debounce live skin preview (800ms).
  useEffect(() => {
    const t = setTimeout(() => setPreviewName(username.trim()), 800);
    return () => clearTimeout(t);
  }, [username]);

  function persistCount(next: number) {
    const val = Math.max(0, next);
    setCount(val);
    try {
      localStorage.setItem(PLAYER_COUNT_KEY, String(val));
    } catch {}
  }

  // Persists to localStorage and broadcasts so /spillere auto-updates live.
  function persistRoster(cat: RosterCategory, next: Player[]) {
    setRosters((prev) => ({ ...prev, [cat]: next }));
    writeRoster(cat, next);
  }

  function resetForm() {
    setUsername(''); setDisplayName(''); setSeed(''); setInfo(''); setEditIndex(null);
  }

  function switchCategory(cat: RosterCategory) {
    setCategory(cat);
    resetForm();
  }

  function submitPlayer() {
    const name = username.trim();
    if (!name) { show('MCSR BRUKERNAVN MANGLER!'); return; }
    const entry: Player = {
      username: name,
      ...(displayName.trim() ? { displayName: displayName.trim() } : {}),
      ...(seed.trim() ? { seed: parseInt(seed, 10) || undefined } : {}),
      ...(info.trim() ? { info: info.trim().slice(0, 200) } : {}),
    };
    if (editIndex !== null) {
      persistRoster(category, roster.map((p, i) => (i === editIndex ? entry : p)));
      show('LAGRET ✓');
    } else {
      persistRoster(category, [...roster, entry]);
      show('LAGT TIL ✓');
    }
    resetForm();
  }

  function addTbd() {
    persistRoster(category, [...roster, { username: 'TBD', displayName: 'TBD', tbd: true }]);
    show('TBD LAGT TIL ✓');
  }

  function editPlayer(i: number) {
    const p = roster[i];
    if (p.tbd) { show('TBD-OPPFØRING KAN IKKE REDIGERES'); return; }
    setUsername(p.username);
    setDisplayName(p.displayName || '');
    setSeed(p.seed !== undefined ? String(p.seed) : '');
    setInfo(p.info || '');
    setEditIndex(i);
  }

  function deletePlayer(i: number) {
    const p = roster[i];
    const label = p.tbd ? 'TBD' : (p.displayName || p.username);
    if (!confirm(`Slette ${label}?`)) return;
    persistRoster(category, roster.filter((_, idx) => idx !== i));
    if (editIndex === i) resetForm();
    show('SLETTET ✓');
  }

  const exportJson = JSON.stringify(roster, null, 2);

  function downloadJson() {
    try {
      const blob = new Blob([exportJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = ROSTER_FILES[category];
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      show(`${ROSTER_FILES[category]} LASTET NED ✓`);
    } catch {
      show('NEDLASTING FEILET');
    }
  }

  return (
    <div>
      {/* Part A — manuell teller */}
      <div style={{ ...s.playerBlock, borderTopColor: 'var(--green)' }}>
        <div style={{ ...s.playerLabel, color: 'var(--green)' }}>▶ MANUELL SPILLERTELLER</div>
        <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '12px' }}>
          Påmeldte spillere: <span style={{ color: 'var(--green)', fontSize: '18px' }}>{count}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button style={s.cdBtn} onClick={() => persistCount(count - 1)}>−</button>
          <input
            style={{ ...s.input, maxWidth: '120px', textAlign: 'center' }}
            type="number"
            min={0}
            value={count}
            onChange={(e) => persistCount(parseInt(e.target.value, 10) || 0)}
          />
          <button style={s.cdBtn} onClick={() => persistCount(count + 1)}>+</button>
        </div>
        <p style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '8px', lineHeight: 1.5 }}>
          Vises live på forsiden (oppdateres på tvers av faner).
        </p>
      </div>

      {/* Kategorivelger */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '8px 0 4px' }}>
        {(Object.keys(CATEGORY_LABELS) as RosterCategory[]).map((cat) => {
          const active = cat === category;
          return (
            <button
              key={cat}
              onClick={() => switchCategory(cat)}
              style={{
                ...s.cdBtn,
                flex: 'none',
                padding: '10px 18px',
                background: active ? 'var(--green)' : 'transparent',
                color: active ? 'var(--dark)' : 'var(--muted)',
                borderColor: active ? 'var(--green)' : 'var(--forest)',
                fontWeight: active ? 700 : 400,
              }}
            >
              {CATEGORY_LABELS[cat]} ({rosters[cat].length})
            </button>
          );
        })}
      </div>

      {/* Part B — admin for valgt kategori */}
      <div style={{ ...s.playerBlock, borderTopColor: 'var(--teal)' }}>
        <div style={{ ...s.playerLabel, color: 'var(--teal)' }}>
          ▶ {editIndex !== null ? `REDIGER ${singular.toUpperCase()}` : `LEGG TIL ${singular.toUpperCase()}`}
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px', minWidth: '260px' }}>
            <div style={s.fieldWrap}><label style={s.label}>MCSR BRUKERNAVN *</label><input style={s.input} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="MinecraftUsername" /></div>
            <div style={s.fieldWrap}><label style={s.label}>VISNINGSNAVN</label><input style={s.input} value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Valgfritt" /></div>
            <div style={s.fieldWrap}><label style={s.label}>SEED / RANGERING</label><input style={s.input} type="number" value={seed} onChange={(e) => setSeed(e.target.value)} placeholder="Valgfritt" /></div>
            <div style={s.fieldWrap}>
              <label style={s.label}>INFO ({info.length}/200)</label>
              <textarea style={{ ...s.input, minHeight: '70px', resize: 'vertical' }} value={info} maxLength={200} onChange={(e) => setInfo(e.target.value)} placeholder="Valgfritt" />
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button style={s.sendBtn} onClick={submitPlayer}>
                {editIndex !== null ? '✓ LAGRE ENDRINGER' : `+ LEGG TIL ${singular.toUpperCase()}`}
              </button>
              {editIndex !== null && (
                <button style={{ ...s.cdBtn, marginTop: '20px', flex: 'none', padding: '13px 20px' }} onClick={resetForm}>AVBRYT</button>
              )}
              {editIndex === null && (
                <button style={{ ...s.cdBtn, marginTop: '20px', flex: 'none', padding: '13px 20px' }} onClick={addTbd}>+ TBD (BLANKT SKIN)</button>
              )}
            </div>
          </div>

          {/* Live preview */}
          <div style={{ flex: '1 1 280px', minWidth: '260px' }}>
            <div style={s.label}>FORHÅNDSVISNING</div>
            <div style={{ marginTop: '10px' }}>
              {previewName ? (
                <PlayerCard
                  username={previewName}
                  displayName={displayName.trim() || undefined}
                  seed={seed.trim() ? (parseInt(seed, 10) || undefined) : undefined}
                  info={info.trim() || undefined}
                />
              ) : (
                <div style={{ fontSize: '11px', color: 'var(--muted)', padding: '20px 0' }}>
                  Skriv inn MCSR brukernavn for å se skin-preview.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Liste for valgt kategori */}
      {roster.length > 0 && (
        <div style={{ ...s.playerBlock, borderTopColor: 'var(--green-d)' }}>
          <div style={{ ...s.playerLabel, color: 'var(--green-d)' }}>▶ {CATEGORY_LABELS[category].toUpperCase()} ({roster.length})</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '320px', overflowY: 'auto' }}>
            {roster.map((p, i) => (
              <div key={`${p.username}-${i}`} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: '#0D2328', border: '1px solid var(--forest)', padding: '8px 12px',
              }}>
                <SkinViewer username={p.tbd ? TBD_SKIN_USERNAME : p.username} width={60} height={100} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', color: 'var(--white)' }}>{p.tbd ? 'TBD' : (p.displayName || p.username)}</div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)' }}>
                    {p.tbd ? 'Blankt skin' : `#${p.username}${p.seed !== undefined ? ` · SEED #${p.seed}` : ''}`}
                  </div>
                </div>
                <button style={{ ...s.cdBtn, flex: 'none', padding: '7px 12px' }} onClick={() => editPlayer(i)}>✏️</button>
                <button style={{ ...s.cdBtn, flex: 'none', padding: '7px 12px', color: '#E05050' }} onClick={() => deletePlayer(i)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Part C — lagre / publiser */}
      <div style={{ ...s.playerBlock, borderTopColor: 'var(--portal)' }}>
        <div style={{ ...s.playerLabel, color: 'var(--portal)' }}>▶ PUBLISER ({CATEGORY_LABELS[category].toUpperCase()})</div>
        <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '12px', lineHeight: 1.6 }}>
          Endringer lagres automatisk og vises live på /spillere i denne nettleseren.
          For å publisere til alle besøkende: last ned {ROSTER_FILES[category]} og legg den i /public/data/, så commit + push.
        </p>
        <textarea readOnly value={exportJson} style={{ ...s.input, minHeight: '160px', fontFamily: "'Share Tech Mono', monospace", resize: 'vertical' }} />
        <button style={{ ...s.sendBtn, marginTop: '12px' }} onClick={downloadJson}>⬇ LAST NED {ROSTER_FILES[category].toUpperCase()}</button>
      </div>
    </div>
  );
}

// ── Main kontrollpanel ──
export default function Kontrollpanel() {
  const [sessionId, setSessionId] = useState('live');
  const [connected, setConnected] = useState(false);
  const [clientCount, setClientCount] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('scene');
  const [copiedId, setCopiedId] = useState('');
  const wsRef = useRef<WebSocket | null>(null);
  const toast = useToast();

  useEffect(() => {
    const wsUrl = `${WS_BASE}?session=${encodeURIComponent(sessionId)}&role=control`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => ws.close();
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.clients !== undefined) setClientCount(msg.clients);
      } catch {}
    };

    return () => { ws.close(); };
  }, [sessionId]);

  const send = useCallback((type: string, data: unknown) => {
    if (wsRef.current?.readyState === 1) {
      wsRef.current.send(JSON.stringify({ type, data }));
      toast.show(`${type.toUpperCase()} SENDT ✓`);
    } else {
      toast.show('IKKE TILKOBLET!');
    }
  }, [toast]);

  function obsUrl(overlayId: string) {
    return `${OVERLAY_BASE}/${overlayId}.html?session=${sessionId}`;
  }

  function copyUrl(id: string, url: string) {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      toast.show('LENKE KOPIERT ✓');
      setTimeout(() => setCopiedId(''), 2000);
    });
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'scene',       label: '🎬 SCENE' },
    { id: 'match',       label: '⚔ KAMP' },
    { id: 'bracket',     label: '🏆 BRACKET' },
    { id: 'commentator', label: '🎙 KOMMENTATOR' },
    { id: 'interview',   label: '👤 INTERVJU' },
    { id: 'countdown',   label: '⏱ COUNTDOWN' },
    { id: 'spillere',    label: '👥 SPILLERE' },
  ];

  return (
    <>
      <style>{kpCss}</style>

      {/* Topbar */}
      <div style={s.topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <div style={s.topbarTitle}>RESPAWN ØSTFOLD</div>
            <div style={s.topbarSub}>STREAM KONTROLLPANEL</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="https://stephanteig.github.io/respawn-ostfold/docs/kontrollpanel"
            target="_blank"
            rel="noopener noreferrer"
            title="Åpne dokumentasjon"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 26, height: 26,
              border: '1px solid rgba(135,206,52,0.5)',
              color: 'var(--green)',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '13px', fontWeight: 'bold',
              textDecoration: 'none',
              background: 'transparent',
              transition: 'background 0.15s, border-color 0.15s',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(135,206,52,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = '#87CE34'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(135,206,52,0.5)'; }}
          >
            ?
          </a>
          <div style={s.statusPill}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: connected ? 'var(--green)' : '#E05050', animation: connected ? 'pulse 1.5s ease-in-out infinite' : 'none' }} />
            <span style={{ fontSize: '10px', letterSpacing: '2px' }}>
              {connected ? `TILKOBLET · ${clientCount} OVERLAYS` : 'FRAKOBLET'}
            </span>
          </div>
        </div>
      </div>

      <div style={s.main}>
        {/* Sidebar */}
        <aside style={s.sidebar}>
          {/* Session */}
          <div style={{ padding: '20px 16px 16px' }}>
            <div style={s.navLabel}>SESJON</div>
            <input
              style={{ ...s.input, marginTop: '8px', fontSize: '13px' }}
              value={sessionId}
              onChange={e => setSessionId(e.target.value)}
              placeholder="live"
              spellCheck={false}
            />
            <p style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '8px', lineHeight: 1.5 }}>
              Bruk "live" på turneringsdagen. Egne ID-er for testing.
            </p>
          </div>

          <div style={s.navLabel}>PANELER</div>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                ...s.navItem,
                ...(activeTab === t.id ? s.navItemActive : {}),
              }}
            >
              {t.label}
            </button>
          ))}

          {/* OBS-lenker */}
          <div style={{ padding: '16px', borderTop: '1px solid var(--forest)', marginTop: '16px' }}>
            <div style={s.navLabel}>OBS-LENKER</div>
            {OVERLAYS.map(o => {
              const url = obsUrl(o.id);
              const copied = copiedId === o.id;
              return (
                <div key={o.id} style={{ marginBottom: '6px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '3px' }}>{o.label}</div>
                  <button
                    onClick={() => copyUrl(o.id, url)}
                    style={{
                      ...s.obsBtn,
                      borderColor: copied ? 'var(--green)' : 'var(--forest)',
                      color: copied ? 'var(--green)' : 'var(--muted)',
                    }}
                  >
                    {copied ? '✓ KOPIERT' : '⧉ KOPIER'}
                  </button>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Content */}
        <div style={s.content}>
          <div style={s.sectionHeader}>
            <div>
              <div style={s.sectionTitle}>{tabs.find(t => t.id === activeTab)?.label}</div>
              <div style={s.sectionDesc}>
                {activeTab === 'scene' && 'Påvirker: 05_background_plate.html'}
                {activeTab === 'match' && 'Påvirker: 04_nameplates.html og 07_multistream.html'}
                {activeTab === 'bracket' && 'Påvirker: 06_bracket.html'}
                {activeTab === 'commentator' && 'Påvirker: 03_commentator_cam.html'}
                {activeTab === 'interview' && 'Påvirker: 08_interview.html'}
                {activeTab === 'countdown' && 'Påvirker: 01_countdown.html'}
                {activeTab === 'spillere' && 'Spillerteller (forsiden) + spillerkort til players.json'}
              </div>
            </div>
          </div>

          {activeTab === 'scene'       && <SceneTab send={send} />}
          {activeTab === 'match'       && <MatchTab send={send} />}
          {activeTab === 'bracket'     && <BracketTab send={send} />}
          {activeTab === 'commentator' && <CommentatorTab send={send} />}
          {activeTab === 'interview'   && <InterviewTab send={send} />}
          {activeTab === 'countdown'   && <CountdownTab send={send} />}
          {activeTab === 'spillere'    && <PlayerAdminTab show={toast.show} />}
        </div>
      </div>

      {/* Toast */}
      <div style={{
        ...s.toast,
        transform: toast.visible ? 'translateY(0)' : 'translateY(80px)',
        opacity: toast.visible ? 1 : 0,
      }}>
        {toast.msg}
      </div>
    </>
  );
}

// ── Styles ──
const s: Record<string, React.CSSProperties> = {
  topbar: {
    background: '#0D2328',
    borderBottom: '3px solid var(--green)',
    padding: '0 32px',
    height: '56px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    position: 'sticky', top: 0, zIndex: 100,
  },
  topbarTitle: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '13px', color: '#fff', letterSpacing: '2px',
  },
  topbarSub: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '9px', color: 'var(--green)', letterSpacing: '2px',
  },
  statusPill: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'var(--forest)', border: '1px solid var(--forest)',
    padding: '6px 14px',
    fontFamily: "'Share Tech Mono', monospace",
  },
  main: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    minHeight: 'calc(100vh - 56px)',
  },
  sidebar: {
    background: '#0D2328',
    borderRight: '1px solid var(--forest)',
    position: 'sticky', top: '56px',
    height: 'calc(100vh - 56px)',
    overflowY: 'auto',
    paddingBottom: '32px',
  },
  navLabel: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '8px', color: 'var(--muted)', letterSpacing: '3px',
    padding: '16px 16px 8px',
  },
  navItem: {
    display: 'flex', alignItems: 'center', gap: '8px',
    width: '100%', padding: '11px 16px',
    background: 'none', border: 'none', borderLeft: '3px solid transparent',
    color: 'var(--muted)', fontSize: '11px', letterSpacing: '1px',
    fontFamily: "'Share Tech Mono', monospace",
    cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
  },
  navItemActive: {
    borderLeftColor: 'var(--green)',
    background: 'rgba(135,206,52,0.08)',
    color: 'var(--green)',
  },
  obsBtn: {
    width: '100%', background: 'var(--dark)', border: '1px solid',
    padding: '5px 8px', fontSize: '9px', letterSpacing: '1px',
    fontFamily: "'Share Tech Mono', monospace",
    cursor: 'pointer', textAlign: 'left' as const,
    transition: 'all 0.15s',
  },
  content: {
    padding: '32px 40px',
    maxWidth: '900px',
  },
  sectionHeader: {
    display: 'flex', alignItems: 'center', gap: '16px',
    marginBottom: '28px', paddingBottom: '16px',
    borderBottom: '1px solid var(--forest)',
  },
  sectionTitle: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '14px', color: '#fff', letterSpacing: '2px',
  },
  sectionDesc: { fontSize: '11px', color: 'var(--muted)', marginTop: '4px' },
  previewNote: {
    background: 'rgba(49,99,100,0.3)', border: '1px solid var(--teal)',
    borderLeft: '3px solid var(--teal)',
    padding: '10px 16px', fontSize: '11px', color: 'var(--teal)', marginBottom: '20px',
    fontFamily: "'Share Tech Mono', monospace", letterSpacing: '1px',
  },
  sceneGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px',
  },
  sceneBtn: {
    background: '#0D2328', border: '1px solid var(--forest)',
    color: 'var(--muted)', padding: '16px 12px',
    fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '1px',
    cursor: 'pointer', textAlign: 'center' as const,
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '8px',
    transition: 'all 0.15s',
  },
  sceneBtnActive: {
    borderColor: 'var(--green)', color: 'var(--green)',
    background: 'rgba(135,206,52,0.1)', borderTop: '3px solid var(--green)',
  },
  sceneBtnDanger: {
    borderColor: '#E05050', color: '#E05050',
  },
  playerBlock: {
    background: '#0D2328', border: '1px solid var(--forest)',
    borderTop: '3px solid var(--green)', padding: '20px', marginBottom: '16px',
  },
  playerLabel: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '8px', marginBottom: '14px', letterSpacing: '2px',
  },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '8px' },
  formGrid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '8px' },
  fieldWrap: { display: 'flex', flexDirection: 'column' as const, gap: '7px', marginBottom: '16px' },
  label: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '9px', color: 'var(--muted)', letterSpacing: '2px',
  },
  input: {
    background: '#0D2328', border: '1px solid var(--forest)',
    borderLeft: '3px solid var(--teal)',
    color: 'var(--white)', padding: '10px 12px',
    fontFamily: "'Share Tech Mono', monospace", fontSize: '13px',
    outline: 'none', width: '100%',
  },
  pill: {
    background: '#0D2328', border: '1px solid var(--forest)',
    color: 'var(--muted)', padding: '7px 16px',
    fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '1px',
    cursor: 'pointer', transition: 'all 0.15s',
  },
  pillActive: {
    borderColor: 'var(--green)', color: 'var(--dark)', background: 'var(--green)',
  },
  sendBtn: {
    marginTop: '20px', background: 'var(--green)', color: 'var(--dark)',
    border: 'none', padding: '13px 32px',
    fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '2px',
    cursor: 'pointer', width: '100%', transition: 'background 0.15s',
  },
  bracketRoundTitle: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '9px', color: 'var(--teal)', marginBottom: '12px', letterSpacing: '2px',
    paddingBottom: '8px', borderBottom: '1px solid var(--forest)',
  },
  bracketMatch: {
    background: '#0D2328', border: '1px solid var(--forest)',
    padding: '10px 12px', marginBottom: '8px',
    display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' as const,
  },
  vs: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '9px', color: 'var(--muted)', flexShrink: 0, padding: '0 4px',
  },
  winnerSelect: {
    background: '#0D2328', border: '1px solid var(--forest)',
    borderLeft: '2px solid var(--green)', color: 'var(--green)',
    padding: '7px 8px', fontFamily: "'Share Tech Mono', monospace",
    fontSize: '8px', outline: 'none', cursor: 'pointer', minWidth: '90px',
  },
  cdDisplay: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '36px', color: 'var(--green)', textAlign: 'center' as const,
    padding: '28px', background: '#0D2328', border: '1px solid var(--forest)',
    marginBottom: '16px', letterSpacing: '4px',
  },
  cdBtn: {
    flex: 1, background: '#0D2328', border: '1px solid var(--forest)',
    color: 'var(--white)', padding: '10px',
    fontFamily: "'Share Tech Mono', monospace", fontSize: '9px',
    cursor: 'pointer', transition: 'all 0.15s',
  },
  toast: {
    position: 'fixed', bottom: '32px', right: '32px',
    background: 'var(--green)', color: 'var(--dark)',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '9px', letterSpacing: '2px', padding: '12px 24px',
    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
    pointerEvents: 'none', zIndex: 999,
  },
};

const kpCss = `
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @media (max-width: 900px) {
    .kp-main { grid-template-columns: 1fr !important; }
  }
`;
