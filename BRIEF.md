# Respawn Østfold — Prosjektbrief

## Hva er dette?

Respawn Østfold er Østfolds første MCSR Ranked Minecraft speedrun-turnering med premiepenger. Dette repoet inneholder hjemmesiden og alle stream-assets.

## Komponenter

### 1. Hjemmeside
**URL:** https://stephanteig.github.io/respawn-ostfold

Next.js static export, deployes automatisk til GitHub Pages via Actions ved push til `main`.

```bash
npm run dev    # localhost:3000
npm run build  # produksjonsbygg til /out
```

### 2. Stream-overlays
HTML/CSS/JS-filer for OBS Browser Source. Felles estetikk: mørk teal (#102C31) bakgrunn, lime-grønn (#87CE34) aksentfarge, Press Start 2P pixelfont.

| Overlay | Bruk |
|---|---|
| Countdown | Ventescreen før sending |
| Bracket | Turneringsoversikt |
| Multistream | Live 1v1 gameplay |
| Nameplates | Spiller-info under kamp |
| Commentator cam | Kommentator-bilde |
| Background plate | BRB / pause |
| Interview | Intervjuscene |
| Kontrollpanel | Felles WS-kontrollpanel |

### 3. OBS Stinger (Manim)
Transparent MOV-transisjon rendret med Manim CE (Python).

- **Stil:** Bracket-overlay-estetikk — mørk teal, subtilt grid, scanline, grønne lister
- **Varighet:** 2,1 sekunder totalt (0.55s inn + 1.0s hold + 0.55s ut)
- **OBS:** Transition point = 600ms
- **Kode:** `stream/stinger/`

## Brand

| Farge | Hex | Bruk |
|---|---|---|
| Respawn Green | `#87CE34` | Primær aksentfarge |
| Deep Background | `#102C31` | Sidefarge / bakgrunn |
| Forest | `#1E4835` | Kort-bakgrunn |
| Deep Teal | `#316364` | Sekundær detalj |
| Portal Teal | `#1D9E75` | Labels / ikoner |

Font: **Press Start 2P** (Google Fonts) — pixel/retro stil.

## Repo-struktur

```
respawn-ostfold/
├── app/                  Next.js sider
├── components/           React-komponenter
├── content/              MDX-innhold
├── public/               Statiske assets
├── stream/               OBS-overlays
│   ├── stinger/          Manim MOV-stinger
│   └── *.html            Browser Source-overlays
└── out/                  Bygget static export
```
