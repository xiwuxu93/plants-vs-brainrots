import math
from pathlib import Path

from PIL import Image, ImageDraw


BASE_COLORS = {
    "background": (10, 24, 32, 255),
    "ring": (20, 54, 66, 255),
    "leaf": (86, 232, 168, 255),
    "leaf_shadow": (28, 120, 92, 255),
    "leaf_highlight": (140, 255, 210, 200),
    "brain": (200, 150, 255, 255),
    "brain_shadow": (140, 90, 200, 200),
    "spark": (240, 255, 200, 180),
}


def _radial_gradient(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), BASE_COLORS["background"])
    pixels = img.load()
    center = (size - 1) / 2
    for y in range(size):
        for x in range(size):
            dx = (x - center) / size
            dy = (y - center) / size
            d = math.sqrt(dx * dx + dy * dy)
            fade = max(0.0, 1.0 - d * 1.35)
            r = int(12 + 28 * fade)
            g = int(32 + 52 * fade)
            b = int(44 + 58 * fade)
            pixels[x, y] = (r, g, b, 255)
    return img


def _draw_outer_ring(draw: ImageDraw.ImageDraw, size: int) -> None:
    inset = size * 0.04
    draw.ellipse((inset, inset, size - inset, size - inset), outline=BASE_COLORS["ring"], width=max(2, int(size * 0.03)))


def _draw_leaf(draw: ImageDraw.ImageDraw, size: int) -> None:
    s = size
    leaf_points = [
        (s * 0.27, s * 0.75),
        (s * 0.18, s * 0.55),
        (s * 0.24, s * 0.30),
        (s * 0.36, s * 0.16),
        (s * 0.50, s * 0.12),
        (s * 0.52, s * 0.35),
        (s * 0.46, s * 0.52),
        (s * 0.36, s * 0.68),
    ]
    draw.polygon(leaf_points, fill=BASE_COLORS["leaf"])

    # Leaf shadow
    shadow_points = [
        (s * 0.28, s * 0.70),
        (s * 0.26, s * 0.52),
        (s * 0.32, s * 0.34),
        (s * 0.40, s * 0.22),
        (s * 0.48, s * 0.36),
        (s * 0.42, s * 0.54),
    ]
    draw.polygon(shadow_points, fill=BASE_COLORS["leaf_shadow"])

    # Leaf highlight
    highlight_points = [
        (s * 0.36, s * 0.20),
        (s * 0.42, s * 0.32),
        (s * 0.38, s * 0.46),
        (s * 0.33, s * 0.58),
        (s * 0.30, s * 0.50),
        (s * 0.32, s * 0.36),
    ]
    draw.polygon(highlight_points, fill=BASE_COLORS["leaf_highlight"])

    # Leaf vein
    draw.line(
        [
            (s * 0.30, s * 0.64),
            (s * 0.38, s * 0.46),
            (s * 0.44, s * 0.30),
            (s * 0.48, s * 0.16),
        ],
        fill=(28, 94, 74, 255),
        width=max(2, int(size * 0.025)),
        joint="curve",
    )


def _draw_brain(draw: ImageDraw.ImageDraw, size: int) -> None:
    s = size
    stroke = max(3, int(size * 0.065))
    bbox_main = (s * 0.48, s * 0.18, s * 0.90, s * 0.88)
    draw.arc(bbox_main, start=210, end=30, fill=BASE_COLORS["brain"], width=stroke)

    bbox_inner = (s * 0.56, s * 0.30, s * 0.82, s * 0.82)
    draw.arc(bbox_inner, start=200, end=40, fill=BASE_COLORS["brain"], width=max(3, int(size * 0.045)))

    # Brain ridges
    draw.arc((s * 0.58, s * 0.36, s * 0.74, s * 0.70), start=210, end=20, fill=BASE_COLORS["brain_shadow"], width=max(2, int(size * 0.03)))
    draw.arc((s * 0.66, s * 0.44, s * 0.84, s * 0.74), start=200, end=350, fill=BASE_COLORS["brain"], width=max(2, int(size * 0.028)))

    # Brain pods
    pods = [
        (s * 0.70, s * 0.30, s * 0.78, s * 0.40),
        (s * 0.78, s * 0.40, s * 0.86, s * 0.50),
        (s * 0.68, s * 0.64, s * 0.80, s * 0.78),
    ]
    for bbox in pods:
        draw.ellipse(bbox, outline=BASE_COLORS["brain"], width=max(2, int(size * 0.02)))
        draw.ellipse(
            (bbox[0] + size * 0.01, bbox[1] + size * 0.01, bbox[2] - size * 0.01, bbox[3] - size * 0.01),
            outline=BASE_COLORS["brain_shadow"],
            width=1,
        )


def _draw_spark(draw: ImageDraw.ImageDraw, size: int) -> None:
    s = size
    r = max(2, int(size * 0.025))
    draw.ellipse((s * 0.44 - r, s * 0.24 - r, s * 0.44 + r, s * 0.24 + r), fill=BASE_COLORS["spark"])


def build_icon(size: int) -> Image.Image:
    img = _radial_gradient(size)
    draw = ImageDraw.Draw(img, "RGBA")
    _draw_outer_ring(draw, size)
    _draw_leaf(draw, size)
    _draw_brain(draw, size)
    _draw_spark(draw, size)
    return img


def main() -> None:
    output_dir = Path("public/icons")
    output_dir.mkdir(parents=True, exist_ok=True)

    for size in (192, 512):
        img = build_icon(size)
        img.save(output_dir / f"icon-{size}.png")

    # Export companion SVG logo wordmark
    svg_path = Path("public/logo.svg")
    svg_path.write_text(
        """<svg width=\"720\" height=\"240\" viewBox=\"0 0 720 240\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <linearGradient id=\"bgGradient\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#0B1B21\"/>\n      <stop offset=\"100%\" stop-color=\"#071014\"/>\n    </linearGradient>\n    <linearGradient id=\"leafGradient\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#8CFFD2\"/>\n      <stop offset=\"100%\" stop-color=\"#2EA375\"/>\n    </linearGradient>\n    <linearGradient id=\"brainGradient\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#E5C5FF\"/>\n      <stop offset=\"100%\" stop-color=\"#9155D9\"/>\n    </linearGradient>\n  </defs>\n  <g transform=\"translate(32 32)\">\n    <rect width=\"176\" height=\"176\" rx=\"44\" fill=\"url(#bgGradient)\"/>\n    <circle cx=\"88\" cy=\"88\" r=\"78\" fill=\"none\" stroke=\"#174049\" stroke-width=\"10\"/>\n    <path d=\"M68 142C48 118 48 78 76 46C95 26 118 26 120 56C122 86 104 120 82 140L68 142Z\" fill=\"url(#leafGradient)\"/>\n    <path d=\"M82 124C70 104 72 80 88 56\" stroke=\"#1C5F48\" stroke-width=\"8\" stroke-linecap=\"round\"/>\n    <path d=\"M118 52C142 58 160 76 166 100C170 116 166 132 156 144C132 170 94 168 92 120C108 122 120 110 122 94C124 78 122 66 118 52Z\" fill=\"none\" stroke=\"url(#brainGradient)\" stroke-width=\"14\" stroke-linecap=\"round\"/>\n    <path d=\"M126 84C140 88 148 100 148 114C148 128 140 140 128 144\" stroke=\"#B285E6\" stroke-width=\"10\" stroke-linecap=\"round\"/>\n    <circle cx=\"112\" cy=\"52\" r=\"6\" fill=\"#F2FFD3\"/>\n  </g>\n  <g transform=\"translate(240 74)\">\n    <text x=\"0\" y=\"48\" fill=\"#A7FFDE\" font-family=\"'Inter', 'Segoe UI', sans-serif\" font-weight=\"700\" font-size=\"52\" letter-spacing=\"0.02em\">Plants vs</text>\n    <text x=\"0\" y=\"118\" fill=\"#E2CCFF\" font-family=\"'Inter', 'Segoe UI', sans-serif\" font-weight=\"700\" font-size=\"72\" letter-spacing=\"0.015em\">Brainrots</text>\n    <rect x=\"0\" y=\"134\" width=\"240\" height=\"6\" rx=\"3\" fill=\"#1D5B62\" opacity=\"0.8\"/>\n    <circle cx=\"20\" cy=\"134\" r=\"8\" fill=\"url(#leafGradient)\"/>\n    <circle cx=\"48\" cy=\"134\" r=\"8\" fill=\"url(#brainGradient)\"/>\n    <text x=\"68\" y=\"144\" fill=\"#7CA1B5\" font-family=\"'Inter', 'Segoe UI', sans-serif\" font-weight=\"500\" font-size=\"20\">strategy codex</text>\n  </g>\n</svg>\n""",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
