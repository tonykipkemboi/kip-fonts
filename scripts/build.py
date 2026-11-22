"""Package the supplied static TTFs into reproducible web assets."""
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED
import hashlib
import json
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
VERSION = '1.0.0'
NAMES = ['KipHeadline-Bold', 'KipGothic-Light', 'KipGothic-Medium', 'KipGothic-Bold']

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    (ROOT / 'fonts/woff2').mkdir(parents=True, exist_ok=True)
    (ROOT / 'downloads').mkdir(exist_ok=True)
    for name in NAMES:
        ttf = ROOT / f'fonts/ttf/{name}.ttf'
        font = TTFont(ttf, recalcTimestamp=False)
        assert 'fvar' not in font, f'{name} must be a static font'
        font.flavor = 'woff2'
        woff = ROOT / f'fonts/woff2/{name}.woff2'
        font.save(woff)
        restored = TTFont(woff, recalcTimestamp=False)
        assert restored.getBestCmap() == font.getBestCmap()
        assert restored['hmtx'].metrics == font['hmtx'].metrics
        assert restored['OS/2'].usWeightClass == font['OS/2'].usWeightClass
        for field in [0, 1, 2, 6, 13, 14]:
            assert restored['name'].getDebugName(field) == font['name'].getDebugName(field)

    paths = sorted([*ROOT.glob('fonts/ttf/*.ttf'), *ROOT.glob('fonts/woff2/*.woff2'),
                    *ROOT.glob('licenses/*.txt'), ROOT/'README.md', ROOT/'SOURCES.md',
                    ROOT/'LICENSE', ROOT/'LICENSE-CODE', ROOT/'kip-fonts.css'])
    manifest = {str(p.relative_to(ROOT)): sha(p) for p in paths}
    (ROOT/'SHA256SUMS.json').write_text(json.dumps(manifest, indent=2)+'\n')
    paths.append(ROOT/'SHA256SUMS.json')
    archive = ROOT / f'downloads/kip-fonts-v{VERSION}.zip'
    with ZipFile(archive, 'w', compression=ZIP_DEFLATED) as z:
        for path in paths:
            info = ZipInfo(str(path.relative_to(ROOT)), (2026,11,22,0,0,0))
            info.compress_type = ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            z.writestr(info, path.read_bytes())
    with ZipFile(archive) as z:
        assert z.testzip() is None
        for name, digest in manifest.items():
            assert hashlib.sha256(z.read(name)).hexdigest() == digest
    print(f'Built {len(NAMES)} webfonts and {archive.name} ({archive.stat().st_size:,} bytes)')

if __name__ == '__main__':
    main()
