# Respawn Østfold

Hjemmeside for Respawn Østfold — Østfolds første MCSR Ranked Minecraft speedrun cash prize-turnering.

**Live:** https://stephanteig.github.io/respawn-ostfold

## Utvikling

```bash
npm run dev   # Start dev-server på http://localhost:3000
npm run build # Produksjonsbygg (static export til /out)
```

## Bytte ut bildeplaceholders

Legg bildene i `public/screenshots/` med disse filnavnene:

| Fil | Plassering |
|-----|-----------|
| `obs_brb.jpeg` | Hero-bakgrunn |
| `obs_multistream.png` | SectionOm — FORMAT-kort |
| `obs_interview.png` | SectionOm — placeholder |
| `obs_countdown.png` | SectionOm — SENDING-kort |
| `obs_kontrollpanel.png` | SectionRoller |
| `obs_bracket.png` | SectionOm — PREMIE-kort |

Erstatt deretter `<ImgPlaceholder>` i `components/SectionOm.tsx` og `components/SectionRoller.tsx` med:

```tsx
import Image from 'next/image';

<Image
  src="/screenshots/obs_multistream.png"
  alt="Beskrivelse"
  width={600}
  height={340}
  style={{ width: '100%', height: 'auto' }}
/>
```

## Deploy

Siden deployes automatisk til GitHub Pages via GitHub Actions ved push til `main`.

Aktiver GitHub Pages: **Settings → Pages → Source: GitHub Actions**
