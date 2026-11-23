# Kip Fonts

Two open-source font families for headlines, charts, and small details. Adapted by Tony Kipkemboi from **Hahmlet** and **Libre Franklin**.

**[Try the fonts](https://tonykipkemboi.github.io/kip-fonts/)** · **[Download v1.1.0](https://tonykipkemboi.github.io/kip-fonts/downloads/kip-fonts-v1.1.0.zip)**

| Family | Style | CSS weight | Formats |
| --- | --- | --- | --- |
| Kip Headline | Bold | 700 | TTF, WOFF2 |
| Kip Gothic | Light | 300 | TTF, WOFF2 |
| Kip Gothic | Medium | 500 | TTF, WOFF2 |
| Kip Gothic | Bold | 700 | TTF, WOFF2 |

Kip Headline is a compact, high-contrast serif for display text. Kip Gothic is a condensed sans with adjusted spacing and fixed-width numerals. These are independent adaptations of the credited open-source families. They are not official versions of any publisher's typefaces. Please report rendering or spacing issues on GitHub.

## Use on a website

Add this stylesheet in your document's `<head>`:

```html
<link rel="stylesheet" href="https://tonykipkemboi.github.io/kip-fonts/kip-fonts.css">
```

```css
h1 {
  font-family: "Kip Headline", Georgia, serif;
  font-weight: 700;
}

body {
  font-family: "Kip Gothic", Arial, sans-serif;
  font-weight: 300;
}

strong {
  font-weight: 700;
}

.caption {
  font-weight: 500;
}
```

The hosted stylesheet serves the latest release. For stable production assets, download a versioned package and self-host `kip-fonts.css`, `fonts/woff2/`, and the accompanying licenses. Keep the same relative folder structure.

## Desktop apps

Install the four files in `fonts/ttf/`, then reopen your design or charting app. Some desktop apps list Light and Medium as separate family names; their typographic family is Kip Gothic. Explicitly select the supplied 300, 500, or 700 weight. No italic or 400 cut is included.

## Matplotlib

Load the exact file to avoid font discovery and weight substitution:

```python
from pathlib import Path
from matplotlib.font_manager import FontProperties

font_dir = Path("/content/kip-fonts/fonts/ttf")
headline = FontProperties(fname=str(font_dir / "KipHeadline-Bold.ttf"), size=28)
label = FontProperties(fname=str(font_dir / "KipGothic-Light.ttf"), size=14)

fig.suptitle("An idea worth sharing", fontproperties=headline)
ax.set_xlabel("Year", fontproperties=label)
```

## Sources and modifications

See [SOURCES.md](SOURCES.md) for upstream projects, copyright notices, and the adaptation notes supplied with these fonts. TTF files are published without changes to their outlines or metadata. WOFF2 files are compressed from those TTFs with fontTools.

The serif and sans have different character coverage. The current fonts have been checked with Latin chart text and punctuation; complete multilingual shaping has not been validated.

## License

Fonts: **SIL Open Font License 1.1**, including modified and redistributed font files. Preserve the original copyright notices and license texts. See [Hahmlet license](licenses/OFL-Hahmlet.txt) and [Libre Franklin license](licenses/OFL-LibreFranklin.txt). The OFL permits personal and commercial use; font files cannot be sold by themselves. Documents and artwork made with these fonts do not have to use the OFL.

Website and packaging code: [MIT](LICENSE-CODE).

## Rebuild the webfonts and download

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python scripts/build.py
```

This packages the checked-in static fonts; it does not reconstruct their upstream variable-font edits. The build creates WOFF2 files, `SHA256SUMS.json`, and a deterministic ZIP with the fonts, CSS, documentation, and license notices.
