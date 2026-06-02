# Spillere-system

Hvordan du administrerer spillere, telleren på forsiden og streamen.

## Legge til en spiller

1. Gå til `/kontrollpanel` og velg fanen **👥 SPILLERE**.
2. I **LEGG TIL SPILLER**-skjemaet fyller du ut:
   - **MCSR brukernavn** (påkrevd) — Minecraft-brukernavnet. Skin hentes fra `mc-heads.net`.
   - **Visningsnavn** (valgfritt) — navnet som vises stort på kortet.
   - **Seed / rangering** (valgfritt) — tall, vises som `SEED #N`.
   - **Info** (valgfritt, maks 200 tegn).
3. Forhåndsvisningen til høyre viser skin-en (oppdateres 800 ms etter siste tastetrykk) og hele spillerkortet.
4. Klikk **+ LEGG TIL SPILLER**. Spilleren lagres i nettleserens `localStorage` (`respawn_players`).
5. Rediger med ✏️ eller slett med 🗑️ i listen under skjemaet.

## Eksportere og deploye spillerdata

Spillerne lever foreløpig bare i nettleseren din. Slik publiserer du dem til nettsiden:

1. I **EKSPORT**-boksen, klikk **⧉ KOPIER JSON**.
2. Lim inn i en fil og lagre den som `players.json`.
3. Legg `players.json` i `public/uploads/`.
4. Kjør sorteringsskriptet:
   ```bash
   node scripts/sort-uploads.js
   ```
   Skriptet flytter `players.json` til `public/data/players.json`.
5. Commit, push og la GitHub Actions deploye. `/spillere` viser nå spillerkortene i et rutenett.

> Når `public/data/players.json` er en tom liste (`[]`), viser `/spillere` "Bracket publiseres etter 9. juni"-meldingen med spillertelleren og påmeldingsknappen.

## Oppdatere den manuelle telleren

- Fanen **👥 SPILLERE** → **MANUELL SPILLERTELLER**.
- Bruk **−** / **+** eller skriv inn et eksakt tall.
- Verdien lagres i `localStorage` (`respawn_player_count`) og vises live i "SPILLERE"-kortet på forsiden og på `/spillere`. Den oppdateres på tvers av åpne faner i samme nettleser.

## Endre Twitch-kanal

Streamen er hardkodet i `app/stream/page.tsx`:

- `<iframe>`-en: bytt `channel=stephanteig` i `player.twitch.tv`-URL-en. La `parent=stephanteig.github.io` stå.
- "Åpne stream på Twitch"-lenken: bytt `https://www.twitch.tv/stephanteig`.

## Hvordan skinview3d-fallback fungerer

`components/SkinViewer.tsx` laster skin fra `https://mc-heads.net/skin/{brukernavn}`. Hvis henting feiler (ukjent bruker eller nettverksfeil), faller den tilbake til standard Steve-skin i `public/steve_skin.png`. Mens skin-en lastes vises spillerens initialer som plassholder. 3D-canvas-en ryddes opp (`viewer.dispose()`) når komponenten fjernes, så det blir ingen minnelekkasjer ved navigering eller hot reload.
