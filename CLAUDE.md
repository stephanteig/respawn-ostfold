@AGENTS.md

## Kodebase-oversikt

### Web (Next.js)
- `app/` — App Router sider og layout
- `components/` — React-komponenter (`.tsx`)
- `content/` — MDX-innhold
- `public/` — Statiske assets (logoer, bilder)

### Stream-overlays (`stream/`)
HTML/CSS/JS-overlays for OBS Browser Source. Alle er 1920×1080.

| Fil | Formål |
|---|---|
| `01_countdown.html` | Ventescreen med nedtelling |
| `02_stinger.html` | HTML-stinger (ikke primær lenger) |
| `03_commentator_cam.html` | Kommentator-cam overlay |
| `04_nameplates.html` | Spiller-navneplater |
| `05_background_plate.html` | BRB/pause/intermission |
| `06_bracket.html` | Turnerings-bracket |
| `07_multistream.html` | Live 1v1 gameplay overlay |
| `08_interview.html` | Intervjuscene |
| `KONTROLLPANEL.html` | WebSocket-kontrollpanel |

#### stinger/ — Manim MOV-stinger
Python-script som rendrer en transparent 1920×1080 @ 60fps MOV-fil.
- `respawn_stinger.py` — animasjonslogikk (Manim CE)
- `prepare_logo.py` — lager transparent `logo.png` fra kilde-SVG/PNG
- Render: `manim -qh respawn_stinger.py RespawnStinger --format=mov --transparent`
- OBS: Transition point = 600ms, Composite scene transition = ✓
- Detaljer: se `stream/stinger/README.md`

### Brand-assets
- `LOGO/` — SVG og PNG-logoer (kilde utenfor repoet)
- Fargepalett: `#87CE34` (green), `#102C31` (bg), `#1E4835` (forest), `#316364` (teal)
