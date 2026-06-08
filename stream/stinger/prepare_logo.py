"""
Konverterer RESPAWN ØSTFOLD LOGO 2@4x.png til transparent logo.png
via BFS flood-fill fra hjørnene — bevarer logo-elementenes indre farger.

Kjør: python prepare_logo.py
"""

import pathlib
import numpy as np
from PIL import Image
from skimage.segmentation import flood

SRC = pathlib.Path(__file__).parent.parent.parent / "LOGO" / "RESPAWN ØSTFOLD LOGO 2@4x.png"
DST = pathlib.Path(__file__).parent / "logo.png"

if not SRC.exists():
    raise FileNotFoundError(f"Fant ikke kilde-logo: {SRC}")

img = Image.open(SRC).convert("RGBA")
data = np.array(img, dtype=np.int32)
h, w = data.shape[:2]

# Lag avstandskart fra bakgrunnsfargen #102C31 = (16, 44, 49)
bg = np.array([16, 44, 49], dtype=np.int32)
dist = np.abs(data[:, :, :3] - bg).sum(axis=2).astype(np.float64)

# BFS fra alle fire hjørner — stopper ved piksler som er for ulike bakgrunnen
# tolerance=5: kun eksakt bakgrunnsfarge fjernes, ikke anti-aliasede kanter
mask = np.zeros((h, w), dtype=bool)
for seed in [(0, 0), (0, w - 1), (h - 1, 0), (h - 1, w - 1)]:
    if dist[seed] < 10:   # seed må selv ligne bakgrunnen
        mask |= flood(dist, seed, tolerance=5)

result = data.copy().astype(np.uint8)
result[mask, 3] = 0

Image.fromarray(result).save(DST)
removed = int(mask.sum())
print(f"Transparent logo lagret: {DST}")
print(f"Størrelse: {w}x{h}px — {removed:,} bakgrunnspiksler fjernet")
