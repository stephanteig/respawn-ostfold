"""
Respawn Østfold — OBS Stinger v3 (Bracket-stil)
================================================
Render med:
    manim -qh respawn_stinger.py RespawnStinger --format=mov --transparent

Output:
    media/videos/respawn_stinger/1080p60/RespawnStinger.mov

OBS-innstillinger:
  - Transition type: Stinger
  - Transition point type: Time → 600 ms
  - Video file: RespawnStinger.mov
  - Composite scene transition: ✓
"""

from manim import *
import numpy as np

# ── Brand farger ──────────────────────────────────────────────
GREEN       = ManimColor("#87CE34")
GREEN_DARK  = ManimColor("#6EC836")
BG          = ManimColor("#102C31")
BG_DARK     = ManimColor("#071215")   # bracket-bakgrunn
FOREST      = ManimColor("#1E4835")
TEAL        = ManimColor("#316364")
PORTAL_TEAL = ManimColor("#1D9E75")

# ── Konfigurasjon ─────────────────────────────────────────────
config.pixel_width      = 1920
config.pixel_height     = 1080
config.frame_rate       = 60
config.background_color = BG   # #102c31 — samme som bracket .stage

COLS = 24
ROWS = 14

FRAME_W = config.frame_width
FRAME_H = config.frame_height
BW = FRAME_W / COLS
BH = FRAME_H / ROWS

# Uniform bakgrunnsfarge = #102c31, akkurat som bracket .stage — ingen striper
COL_COLORS = [BG]

SWEEP_IN_DURATION  = 0.55
HOLD_DURATION      = 1.00
SWEEP_OUT_DURATION = 0.55
TOTAL              = SWEEP_IN_DURATION + HOLD_DURATION + SWEEP_OUT_DURATION  # 2.10s

GRID_OPACITY = 0.04   # matcher CSS: rgba(135,206,52,0.035)
BAR_H        = 0.07   # høyde på topp/bunn-lister i Manim-enheter


def build_grid(frame_w, frame_h):
    """Subtilt lime-grønt grid inspirert av bracket-overlay (48px spacing)."""
    lines = []
    v_spacing = frame_w / 40   # 1920 / 40 = 48px
    h_spacing = frame_h / 22   # 1080 / 22 ≈ 49px
    for i in range(1, 40):
        x = -frame_w / 2 + v_spacing * i
        lines.append(
            Line([x, -frame_h / 2, 0], [x, frame_h / 2, 0],
                 stroke_width=0.6, stroke_color=GREEN, stroke_opacity=0)
        )
    for i in range(1, 22):
        y = frame_h / 2 - h_spacing * i
        lines.append(
            Line([-frame_w / 2, y, 0], [frame_w / 2, y, 0],
                 stroke_width=0.6, stroke_color=GREEN, stroke_opacity=0)
        )
    return lines


class RespawnStinger(Scene):

    def construct(self):
        # ── Bygg pixel-grid ───────────────────────────────────
        blocks = []
        for c in range(COLS):
            col_blocks = []
            x = -FRAME_W / 2 + BW * c + BW / 2
            color = COL_COLORS[c % len(COL_COLORS)]
            for r in range(ROWS):
                y = FRAME_H / 2 - BH * r - BH / 2
                rect = Rectangle(
                    width=BW + 0.01,
                    height=BH + 0.01,
                    fill_color=color,
                    fill_opacity=1,
                    stroke_width=0,
                )
                rect.move_to([x, y, 0])
                col_blocks.append(rect)
            blocks.append(col_blocks)

        # ── Grid-overlay (bracket-stil) ───────────────────────
        grid_lines = build_grid(FRAME_W, FRAME_H)

        # ── Vignette ─────────────────────────────────────────
        vignette = Rectangle(
            width=FRAME_W, height=FRAME_H,
            fill_color=BG_DARK, fill_opacity=0,
            stroke_width=0,
        )

        # ── Topp/bunn-lister (#87CE34) ────────────────────────
        top_bar = Rectangle(
            width=FRAME_W, height=BAR_H,
            fill_color=GREEN, fill_opacity=0,
            stroke_width=0,
        )
        top_bar.move_to([0, FRAME_H / 2 - BAR_H / 2, 0])
        bot_bar = Rectangle(
            width=FRAME_W, height=BAR_H,
            fill_color=GREEN, fill_opacity=0,
            stroke_width=0,
        )
        bot_bar.move_to([0, -FRAME_H / 2 + BAR_H / 2, 0])

        # ── Scanline ─────────────────────────────────────────
        scanline = Rectangle(
            width=FRAME_W, height=0.08,
            fill_color=GREEN, fill_opacity=0,
            stroke_width=0,
        )
        scanline.move_to([0, FRAME_H / 2 + 0.1, 0])

        # ── Flash-overlay ─────────────────────────────────────
        flash = Rectangle(
            width=FRAME_W, height=FRAME_H,
            fill_color=GREEN, fill_opacity=0,
            stroke_width=0,
        )

        # ── Logo ─────────────────────────────────────────────
        try:
            logo = ImageMobject("logo.png")
            logo.set_height(2.6)
        except Exception:
            logo = Text("RESPAWN", color=GREEN, font_size=80)

        logo.move_to(ORIGIN)
        logo.set_opacity(0)

        # ── Legg til scenen (lag-rekkefølge) ──────────────────
        for col_blocks in blocks:
            for b in col_blocks:
                b.set_opacity(0)
                self.add(b)
        for line in grid_lines:
            self.add(line)
        self.add(vignette)
        self.add(top_bar)
        self.add(bot_bar)
        self.add(scanline)
        self.add(flash)
        self.add(logo)

        # ══════════════════════════════════════════════════════
        # FASE 1 — Sweep IN (venstre → høyre)
        # ══════════════════════════════════════════════════════
        sweep_in_anims = []
        for c in range(COLS):
            col_delay = (c / COLS) * SWEEP_IN_DURATION * 0.8
            for r in range(ROWS):
                row_delay = (r / ROWS) * (SWEEP_IN_DURATION * 0.15)
                delay = col_delay + row_delay
                b = blocks[c][r]
                anim = AnimationGroup(
                    b.animate(run_time=0.25, rate_func=rush_into).set_opacity(1),
                    lag_ratio=0,
                )
                sweep_in_anims.append(Succession(Wait(delay), anim))

        # Grid fades inn etterhvert som blokkene dekker skjermen
        grid_in_delay = SWEEP_IN_DURATION * 0.2
        grid_in = Succession(
            Wait(grid_in_delay),
            AnimationGroup(
                *[line.animate(run_time=SWEEP_IN_DURATION * 0.65, rate_func=smooth)
                       .set_stroke(opacity=GRID_OPACITY)
                  for line in grid_lines],
                lag_ratio=0,
            ),
        )

        # Vignette mørklegger kantene
        vignette_in = vignette.animate(
            run_time=SWEEP_IN_DURATION * 0.9, rate_func=smooth
        ).set_fill(opacity=0.28)

        # Grønne lister flasher inn
        bars_in = Succession(
            Wait(SWEEP_IN_DURATION * 0.25),
            AnimationGroup(
                top_bar.animate(run_time=0.12, rate_func=rush_into).set_fill(opacity=1),
                bot_bar.animate(run_time=0.12, rate_func=rush_into).set_fill(opacity=1),
                lag_ratio=0,
            ),
        )

        # Scanline dukker opp rett før logo
        scanline_in = Succession(
            Wait(SWEEP_IN_DURATION * 0.78),
            scanline.animate(run_time=0.08, rate_func=linear).set_fill(opacity=0.18),
        )

        # Logo popper inn
        logo_in = Succession(
            Wait(SWEEP_IN_DURATION * 0.85),
            logo.animate(run_time=0.12, rate_func=smooth).set_opacity(1),
        )

        # Grønn flash-puls
        flash_pulse = Succession(
            Wait(SWEEP_IN_DURATION * 0.9),
            flash.animate(run_time=0.05, rate_func=linear).set_fill(opacity=0.7),
            flash.animate(run_time=0.08, rate_func=linear).set_fill(opacity=0),
        )

        self.play(
            *sweep_in_anims,
            grid_in,
            vignette_in,
            bars_in,
            scanline_in,
            logo_in,
            flash_pulse,
            run_time=SWEEP_IN_DURATION + 0.05,
        )

        # ══════════════════════════════════════════════════════
        # FASE 2 — Hold (scanline beveger seg nedover)
        # ══════════════════════════════════════════════════════
        self.play(
            scanline.animate(run_time=HOLD_DURATION, rate_func=linear)
                    .move_to([0, -FRAME_H / 2 - 0.1, 0]),
            run_time=HOLD_DURATION,
        )

        # ══════════════════════════════════════════════════════
        # FASE 3 — Sweep OUT (høyre → venstre)
        # ══════════════════════════════════════════════════════
        sweep_out_anims = []
        for c in range(COLS):
            col_idx = COLS - 1 - c
            col_delay = (c / COLS) * SWEEP_OUT_DURATION * 0.8
            for r in range(ROWS):
                row_delay = (r / ROWS) * (SWEEP_OUT_DURATION * 0.15)
                delay = col_delay + row_delay
                b = blocks[col_idx][r]
                anim = b.animate(run_time=0.25, rate_func=rush_from).set_opacity(0)
                sweep_out_anims.append(Succession(Wait(delay), anim))

        grid_out = AnimationGroup(
            *[line.animate(run_time=SWEEP_OUT_DURATION * 0.65, rate_func=smooth)
                   .set_stroke(opacity=0)
              for line in grid_lines],
            lag_ratio=0,
        )

        vignette_out = vignette.animate(
            run_time=SWEEP_OUT_DURATION * 0.85, rate_func=smooth
        ).set_fill(opacity=0)

        bars_out = Succession(
            Wait(SWEEP_OUT_DURATION * 0.15),
            AnimationGroup(
                top_bar.animate(run_time=0.15, rate_func=rush_from).set_fill(opacity=0),
                bot_bar.animate(run_time=0.15, rate_func=rush_from).set_fill(opacity=0),
                lag_ratio=0,
            ),
        )

        logo_out = logo.animate(run_time=0.15, rate_func=smooth).set_opacity(0)

        self.play(
            *sweep_out_anims,
            grid_out,
            vignette_out,
            bars_out,
            logo_out,
            run_time=SWEEP_OUT_DURATION,
        )
