#!/usr/bin/env python3
"""Crop MC logo + prepare CR certificate web asset for SHOHRA site."""
from PIL import Image
import os

SRC = "/home/z/my-project/upload/pasted_image_1793542328709.png"
DOCS = "/home/z/my-project/public/assets/docs"
os.makedirs(DOCS, exist_ok=True)

img = Image.open(SRC).convert("RGB")
W, H = img.size
print(f"source: {W}x{H}")

# ---- 1) Ministry of Commerce logo lockup (wordmark + emblem, top-right) ----
L, R, T_, B = 0.780, 0.975, 0.026, 0.145
box = (int(L * W), int(T_ * H), int(R * W), int(B * H))
logo = img.crop(box)
# upscale 2x for crisp retina rendering
lw, lh = logo.size
logo = logo.resize((lw * 2, lh * 2), Image.LANCZOS)
logo_path = os.path.join(DOCS, "mc-logo.png")
logo.save(logo_path, optimize=True)
print(f"logo: {logo_path} {logo.size} {os.path.getsize(logo_path)//1024}KB")

# ---- 2) Certificate as web asset (webp, max width 1600) ----
cert = img
if cert.width > 1600:
    nh = int(cert.height * 1600 / cert.width)
    cert = cert.resize((1600, nh), Image.LANCZOS)
cert_path = os.path.join(DOCS, "cr-certificate.webp")
cert.save(cert_path, "WEBP", quality=88, method=6)
print(f"certificate: {cert_path} {cert.size} {os.path.getsize(cert_path)//1024}KB")
