#!/usr/bin/env python3
"""Subset the bundled Pretendard weights down to what a Korean page needs.

The upstream woff2 files carry all 11,172 modern Hangul syllables and weigh
~780 KB each; four weights of that is 3 MB of font on a page whose whole point
is that it loads fast. The KS X 1001 syllable set (2,350 of them — exactly the
ones the EUC-KR codec can encode) covers ordinary Korean prose, and dropping to
it takes each weight to roughly a fifth of the size.

Re-run after replacing the sources in tools/fonts-src/:

    pip install fonttools brotli
    python3 tools/subset-fonts.py

Anything written in a syllable outside the set falls back to the system face,
which on a Korean-configured machine is not visibly wrong — but if you add copy
with rare syllables and it looks off, that is why.
"""

import pathlib
import sys

from fontTools import subset

HERE = pathlib.Path(__file__).resolve().parent
SRC = HERE / "fonts-src"
OUT = HERE.parent / "public" / "fonts"
WEIGHTS = ["Regular", "Medium", "SemiBold", "Bold"]


def charset() -> set[str]:
    chars = set()
    # Latin, digits, the punctuation the copy actually uses.
    chars |= {chr(c) for c in range(0x20, 0x7F)}
    chars |= set("·—–…‘’“”′″×÷±≤≥→←↑↓•§¶©®™°₩€$¥£§¬")
    # Hangul: the KS X 1001 2,350, plus the compatibility jamo used on their own.
    # Python's euc-kr codec is really CP949 and encodes all 11,172 syllables, so
    # the row range is what actually picks the 2,350 out — lead bytes 0xB0-0xC8.
    for c in range(0xAC00, 0xD7A4):
        try:
            enc = chr(c).encode("euc-kr")
        except UnicodeEncodeError:
            continue
        if len(enc) == 2 and 0xB0 <= enc[0] <= 0xC8:
            chars.add(chr(c))
    chars |= {chr(c) for c in range(0x3131, 0x3164)}
    # Full-width punctuation that turns up in Korean typesetting.
    chars |= set("　、。〈〉《》「」『』【】〔〕！＃％＆（）－＋＝／：；？＠［］｛｝")
    return chars


def main() -> int:
    if not SRC.is_dir():
        print(f"missing {SRC} — put the upstream Pretendard woff2 files there")
        return 1

    OUT.mkdir(parents=True, exist_ok=True)
    text = "".join(sorted(charset()))

    for weight in WEIGHTS:
        src = SRC / f"Pretendard-{weight}.woff2"
        dst = OUT / f"Pretendard-{weight}.subset.woff2"
        if not src.is_file():
            print(f"skip {weight}: {src} not found")
            continue

        args = [
            str(src),
            f"--text={text}",
            "--flavor=woff2",
            "--layout-features=kern,liga,calt",
            "--no-hinting",
            "--desubroutinize",
            f"--output-file={dst}",
        ]
        subset.main(args)
        print(f"{src.name}: {src.stat().st_size // 1024} KB -> {dst.name}: {dst.stat().st_size // 1024} KB")

    return 0


if __name__ == "__main__":
    sys.exit(main())
