#!/usr/bin/env python3
"""Gera as imagens otimizadas da landing page a partir dos arquivos originais.

Uso (na raiz do projeto):
    python3 tools/optimize-images.py

Requer Pillow (pip install pillow) e a pasta materiais-de-origem/. Os
originais nunca são alterados. Para trocar uma foto, substitua o arquivo de
origem ou edite a lista PHOTOS e rode o script novamente.

A imagem de compartilhamento (1200x630) é montada pelo Chromium, com as
fontes do site, por outro script:
    node tools/render-compartilhamento.js
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCES = ROOT / "materiais-de-origem"
SRC = SOURCES / "fotos"
LOGO_SRC = SOURCES / "logo" / "Firula Restaurante e Bar Logo.png"
CREST_SRC = SOURCES / "logo" / "brasao_firula.png"
OUT = ROOT / "assets" / "img"

BLACK = (13, 11, 10)  # #0d0b0a, fundo da página

# Nada é ampliado: a maior versão gerada é a do original (as fotos da casa
# têm 1448 px; as de comida, de 283 a 895 px).
WIDTHS = (480, 800, 1200)

# nome de saída -> (arquivo em materiais-de-origem/fotos, área usada ou None)
# A área é (esquerda, topo, direita, base) em pixels do original.
PHOTOS = {
    # a casa, à noite
    "fachada-esquina": ("firula-01.png", None),
    "entrada": ("firula-02.png", None),
    "salao": ("firula-03.png", None),
    "palco": ("firula-04.png", None),
    "varanda": ("firula-05.png", None),
    # cozinha e bar (capturas do Instagram, pequenas: entram como miniaturas)
    "hamburguer": ("Screenshot 2026-10-01 171712.png", (3, 3, 673, 378)),
    "frango-com-queijo": ("Screenshot 2026-10-01 171745.png", (3, 3, 560, 431)),
    # o moscow mule veio com o texto do post embaixo; fica a parte de cima
    "moscow-mule": ("Screenshot 2026-10-01 171549.png", (3, 3, 892, 700)),
    "drink-morango": ("Screenshot 2026-10-01 171731.png", (3, 3, 280, 437)),
    "drink-laranja": ("Screenshot 2026-10-01 171823.png", (3, 3, 333, 457)),
    "drink-frutas-vermelhas": ("Screenshot 2026-10-01 171919.png", (3, 3, 378, 457)),
    "drink-azul": ("Screenshot 2026-10-01 171939.png", (3, 3, 331, 455)),
}


def resize_to_width(im: Image.Image, width: int) -> Image.Image:
    if im.width <= width:
        return im.copy()
    height = round(im.height * width / im.width)
    return im.resize((width, height), Image.LANCZOS)


def save_set(im: Image.Image, name: str) -> None:
    for width in WIDTHS:
        if width < im.width:
            resize_to_width(im, width).save(OUT / f"{name}-{width}.webp", "WEBP", quality=76, method=6)
    im.save(OUT / f"{name}-{im.width}.webp", "WEBP", quality=76, method=6)
    # fallback JPEG para navegadores sem WebP
    im.save(OUT / f"{name}-{im.width}.jpg", "JPEG", quality=82, optimize=True, progressive=True)
    print(f"{name}: {im.width}x{im.height}")


def build_photos() -> None:
    for name, (source, area) in PHOTOS.items():
        im = Image.open(SRC / source).convert("RGB")
        save_set(im.crop(area) if area else im, name)


def trim(im: Image.Image, margin: int = 8) -> Image.Image:
    box = im.getchannel("A").point(lambda v: 255 if v > 20 else 0).getbbox()
    return im.crop((max(0, box[0] - margin), max(0, box[1] - margin), min(im.width, box[2] + margin), min(im.height, box[3] + margin)))


def build_logo() -> None:
    """Logo (1492x724) e brasão (629x710), ambos PNG com fundo transparente.
    O script só recorta a margem vazia e gera os tamanhos usados."""
    logo = trim(Image.open(LOGO_SRC).convert("RGBA"))
    # 600 px cobre o logo do cabeçalho (150 px) e do rodapé (200 px) em telas 3x
    for width in (600, 400, 300):
        out = resize_to_width(logo, width)
        out.save(OUT / f"logo-firula-{width}.png", optimize=True)
        out.save(OUT / f"logo-firula-{width}.webp", "WEBP", quality=84, method=6)
    print(f"logo-firula: {logo.width}x{logo.height} (salvo em 600, 400 e 300)")

    crest = trim(Image.open(CREST_SRC).convert("RGBA"))
    for height in (360, 240, 160):
        width = round(crest.width * height / crest.height)
        out = crest.resize((width, height), Image.LANCZOS)
        out.save(OUT / f"brasao-firula-{height}.png", optimize=True)
        out.save(OUT / f"brasao-firula-{height}.webp", "WEBP", quality=84, method=6)
    print(f"brasao-firula: {crest.width}x{crest.height} (salvo em 360, 240 e 160 de altura)")

    # Ícones: o brasão sobre o preto da página
    for name, size in (("favicon-32", 32), ("apple-touch-icon", 180), ("icon-192", 192)):
        tile = Image.new("RGBA", (512, 512), BLACK + (255,))
        fitted = crest.resize((round(crest.width * 440 / crest.height), 440), Image.LANCZOS)
        tile.alpha_composite(fitted, ((512 - fitted.width) // 2, 36))
        tile.convert("RGB").resize((size, size), Image.LANCZOS).save(OUT / f"{name}.png", optimize=True)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    build_photos()
    build_logo()
    total = sum(f.stat().st_size for f in OUT.iterdir())
    print(f"{len(list(OUT.iterdir()))} arquivos, {total / 1024:.0f} KB no total")
