# Respawn Østfold — OBS Stinger Transition

Manim-animasjon som lager en transparent MOV-stinger for OBS. Bruker bracket-overlaystilen: mørk teal bakgrunn, subtilt lime-grønt grid, bevegelig scanline og grønne topp/bunn-lister.

## Avhengigheter

```bash
pip install manim pillow scikit-image
```

## Første gangs oppsett

### 1. Lag transparent logo

```bash
cd stream/stinger
python prepare_logo.py
```

Dette leser `../../LOGO/RESPAWN ØSTFOLD LOGO 2@4x.png`, fjerner bakgrunnsfargen (#102C31) via BFS flood-fill, og lagrer resultatet som `logo.png` i samme mappe.

### 2. Render stingeren

```bash
manim -qh respawn_stinger.py RespawnStinger --format=mov --transparent
```

Output: `media/videos/respawn_stinger/1080p60/RespawnStinger.mov`

## OBS-innstillinger

| Innstilling | Verdi |
|---|---|
| Scene Transitions → Stinger | |
| Video file | `RespawnStinger.mov` |
| Transition point type | Time |
| Transition point | **600 ms** |
| Composite scene transition | ✓ |

> **Merk:** "Composite scene transition" må være på for at den transparente bakgrunnen skal fungere riktig.

## Animasjonens oppbygging

| Fase | Varighet | Beskrivelse |
|---|---|---|
| Sweep IN | 0.55s | 24 kolonner dekker skjermen venstre→høyre. Grid, vignette og grønne lister fader inn. |
| Hold | 1.00s | Logo er synlig. Scanline beveger seg fra topp til bunn. |
| Sweep OUT | 0.55s | Kolonner forlater skjermen høyre→venstre. Alt fader ut. |
| **Totalt** | **2.10s** | |

OBS bytter scene ved 600ms — akkurat etter at sweep-in er ferdig og skjermen er fullt dekket.

## Visuell stil (bracket-overlay)

Bakgrunnen matcher `06_bracket.html`:

| Element | Verdi |
|---|---|
| Bakgrunn | `#102C31` (Deep Background) |
| Grid | 48px spacing, `#87CE34` ved 4% opacity |
| Vignette | Mørk radial overlay, 28% opacity |
| Scanline | Grønn linje, 18% opacity, full nedover-sweep på 1s |
| Topp/bunn-lister | `#87CE34` (Respawn Green) |

## Re-render etter endringer

Etter hvert som du justerer parametere i `respawn_stinger.py` (timing, farger, etc.), kjør bare render-kommandoen på nytt. Manim cacherer mellomliggende filer og gjengir bare det som er endret.

## Filer

| Fil | Beskrivelse |
|---|---|
| `respawn_stinger.py` | Manim-script — hele animasjonslogikken |
| `prepare_logo.py` | Konverterer kilde-logo til transparent PNG |
| `logo.png` | Transparent Respawn Østfold-logo (generert) |
| `.gitignore` | Ekskluderer `media/` og `__pycache__/` |
