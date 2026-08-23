#!/usr/bin/env python3
"""Inject partials/sidebar.html into every page between the
<!-- SIDEBAR:START --> / <!-- SIDEBAR:END --> markers.

Run this after editing partials/sidebar.html, before committing, so every
page's menu/contact block stays in sync. Pages remain plain static HTML;
this only runs at edit time, never in the browser.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent
PARTIAL = ROOT / "partials" / "sidebar.html"
PAGES = ["index.html", "services.html", "resume.html", "articles.html"]

START = b"<!-- SIDEBAR:START -->"
END = b"<!-- SIDEBAR:END -->"


def sync(page_path: Path, fragment_lines: list[bytes]) -> bool:
    raw = page_path.read_bytes()
    newline = b"\r\n" if b"\r\n" in raw else b"\n"

    pattern = re.compile(
        re.escape(START) + rb".*?" + re.escape(END), re.DOTALL
    )
    match = pattern.search(raw)
    if not match:
        print(f"  SKIP {page_path.name}: no SIDEBAR markers found", file=sys.stderr)
        return False

    # indentation = whitespace preceding START on its own line
    line_start = raw.rfind(b"\n", 0, match.start()) + 1
    indent = raw[line_start:match.start()]

    body = newline.join(indent + line if line else b"" for line in fragment_lines)
    replacement = START + newline + body + newline + indent + END

    new_raw = raw[:match.start()] + replacement + raw[match.end():]
    if new_raw != raw:
        page_path.write_bytes(new_raw)
        print(f"  updated {page_path.name}")
    else:
        print(f"  unchanged {page_path.name}")
    return True


def main():
    fragment = PARTIAL.read_bytes()
    # normalize to \n for splitting, re-join per-file with that file's newline
    fragment_lines = fragment.replace(b"\r\n", b"\n").split(b"\n")
    while fragment_lines and fragment_lines[-1] == b"":
        fragment_lines.pop()

    ok = True
    for name in PAGES:
        page_path = ROOT / name
        if not page_path.exists():
            print(f"  SKIP {name}: file not found", file=sys.stderr)
            ok = False
            continue
        ok = sync(page_path, fragment_lines) and ok

    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
