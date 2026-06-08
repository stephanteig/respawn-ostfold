# RESPAWN ØSTFOLD — Stream Overlays
## OBS Setup Guide

All files er 1920×1080. Legg `logo.png` i samme mappe som HTML-filene.

---

## Filer & Bruk

### 01_countdown.html
**Scene:** "Starting Soon" / Ventescreen
**OBS:** Browser Source → Full 1920×1080
**Endre countdown:** Åpne filen, finn `const TOTAL_SECONDS = 30 * 60;` og juster.

---

### 02_stinger.html
**Scene:** Stinger Transition mellom scener (HTML-versjon, ikke lenger primær)
**OBS:** Settings → Scene Transitions → Stinger
- Duration: 1000ms
- Transition Point: Time (500ms)
- Audio Monitoring: Off

---

### stinger/ — Manim MOV-stinger (primær)
**Scene:** Stinger Transition mellom scener
**Teknologi:** Python / Manim CE — rendres til transparent `.mov`

Se [`stinger/README.md`](stinger/README.md) for full oppsettguide.

**Rask oppsett:**
```bash
pip install manim pillow scikit-image
cd stream/stinger
python prepare_logo.py          # lag transparent logo
manim -qh respawn_stinger.py RespawnStinger --format=mov --transparent
```

**OBS:** Scene Transitions → Stinger → `RespawnStinger.mov` → Transition point: **600ms** → Composite scene transition: ✓

---

### 03_commentator_cam.html
**Scene:** Kommentator-cam scene
**OBS:**
1. Legg til Camera Source (din kommentator-cam)
2. Legg til Browser Source (denne filen) OVER kameraet
3. Begge 1920×1080

**Endre navn:** Åpne filen, finn `id="commName"` og `id="commHandle"` — endre direkte i HTML, eller bruk URL-params i fremtiden.

---

### 04_nameplates.html
**Scene:** Spiller 1v1 kamp
**OBS:** Browser Source over gameplay capture
**URL params:**
```
04_nameplates.html?p1=Notch&p1h=@notch&p2=Dream&p2h=@dream&round=FINALE
```

---

### 05_background_plate.html
**Scene:** BRB / Pause / Intermission / Setup
**OBS:** Browser Source som bakgrunn
**Scener via URL param:**
```
05_background_plate.html?scene=brb
05_background_plate.html?scene=break
05_background_plate.html?scene=intermission
05_background_plate.html?scene=setup
05_background_plate.html?scene=starting
```

---

### 06_bracket.html
**Scene:** Bracket overview
**OBS:** Browser Source 1920×1080
**Oppdater bracket:** Åpne filen → finn `const bracket = {` øverst i `<script>`-blokken → endre spillernavn, seed og score.

---

### 07_multistream.html
**Scene:** Live 1v1 gameplay
**OBS Layout:**
1. Game Capture Player 1 → x:0, y:0, w:930, h:960
2. Game Capture Player 2 → x:990, y:0, w:930, h:960
3. Browser Source (denne filen) → x:0, y:0, 1920×1080 (over alt)

**URL params:**
```
07_multistream.html?p1=Navn&p1h=@handle&p2=Navn&p2h=@handle&round=SEMIFINALE
```

---

### 08_interview.html
**Scene:** Intervju scene
**OBS:**
1. Camera Source (kommentator-cam) → venstre side, ca. x:0, y:5, w:1120, h:1068
2. Browser Source (denne filen) → 1920×1080 over alt

**URL params:**
```
08_interview.html?player=Dream&handle=@dream&skin=Dream&comm=Navn&elo=1500&time=7:42&rank=D+
```
`skin=` bruker Minecraft brukernavn for 3D skin-render via Crafatar API.

---

## Farger (CSS variabler)
```
Respawn Green:    #87CE34
Green Dark:       #6EC836
Deep Background:  #102C31
Forest:           #1E4835
Deep Teal:        #316364
Portal Teal:      #1D9E75
```

## Font
Filene bruker `Press Start 2P` fra Google Fonts (lastes automatisk).
For offline bruk: last ned og legg i samme mappe, oppdater `@import`-URL.
