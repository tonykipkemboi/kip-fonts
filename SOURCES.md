# Sources and attribution

## Kip Headline

- Upstream: [Hahmlet](https://github.com/hyper-type/hahmlet).
- Copyright 2020 The Hahmlet Project Authors.
- License: [SIL OFL 1.1](licenses/OFL-Hahmlet.txt).
- Adaptation notes supplied by the font author: Latin subset, static source weight 820, lowercase horizontal scale 0.82, capital horizontal scale 0.88, lowercase height reduced by 11 percent, capital height increased by 2 percent, letter spacing tightened by 10 units, and word space reduced by 10 percent. Renamed Kip Headline and exported at nominal weight 700.
- These adjustments apply to classes of letters. This release contains the tuned open-source font, with no image-traced replacement glyphs.

Kip Headline in [v1.0.0](https://github.com/tonykipkemboi/kip-fonts/releases/tag/v1.0.0) was based on Fraunces. The earlier release and its original notices remain available there. The Hahmlet-based font has different outlines, spacing, and character coverage, so check existing layouts when upgrading.

## Kip Gothic

- Upstream: [Libre Franklin](https://github.com/googlefonts/Libre-Franklin).
- Copyright 2020 The Libre Franklin Project Authors.
- License: [SIL OFL 1.1](licenses/OFL-LibreFranklin.txt).
- Adaptation notes supplied by the font author:

| Cut | Source weight | Horizontal scale | Word space multiplier | Figure advance | Extra period space |
| --- | ---: | ---: | ---: | ---: | ---: |
| Light | 340 | 0.90 | 1.30 | 602 units | 85 units |
| Medium | 480 | 0.90 | 1.10 | 610 units | 60 units |
| Bold | 731 | 0.93 | 1.20 | 629 units | 37 units |

Nominal weights are 300, 500, and 700. All ten digit advances were checked and are equal within each Gothic cut. The original build scripts for these outline adjustments are not part of this release; the notes above document the supplied modifications rather than a verified source reconstruction.

## Release preparation

Adaptations and distribution by Tony Kipkemboi, 2026. Original authors retain their copyright. The release preserves the four supplied static TTF files byte for byte, including their copyright and license metadata. No third-party chart images are required to use the fonts or included in this distribution.

The WOFF2 build uses the checked-in TTF files and preserves the font family, style, metrics, character mappings, and copyright/license records. CSS explicitly maps the four available weights. Each current download includes the Hahmlet and Libre Franklin license texts.
