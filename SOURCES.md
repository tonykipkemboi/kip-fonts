# Sources and attribution

## Kip Headline

- Upstream: [Fraunces](https://github.com/undercasetype/Fraunces).
- Copyright notice in the supplied upstream license: Copyright 2018 The Fraunces Project Authors.
- Copyright notice in the supplied font metadata: Copyright 2020 The Fraunces Project Authors. Both original notices are retained.
- License: [SIL OFL 1.1](licenses/OFL-Fraunces.txt).
- Adaptation notes supplied by the font author: static cut from weight 774 at optical size 72, horizontal outline scaling of 0.89, renamed Kip Headline, exported at nominal weight 700.

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

The WOFF2 build uses the checked-in TTF files and preserves the font family, style, metrics, character mappings, and copyright/license records. CSS explicitly maps the four available weights. Each download includes both upstream license texts.
