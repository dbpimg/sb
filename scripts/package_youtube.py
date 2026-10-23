#!/usr/bin/env python3
"""Build a deterministic, constrained YouTube Playables ZIP from the isolated entrypoint."""
from pathlib import Path
import argparse
import re
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "youtube" / "index.html"
MAX_INITIAL = 30 * 1024 * 1024
MAX_TOTAL = 250 * 1024 * 1024
MAX_FILE = 30 * 1024 * 1024
SDK = '<script src="https://www.youtube.com/game_api/v1"></script>'

def build(output: Path):
    html = SOURCE.read_text(encoding="utf-8")
    if html.count(SDK) != 1 or html.index(SDK) > html.index("<script>(()=>"):
        raise ValueError("SDK script must load exactly once, before game code")
    # Social metadata and GitHub feedback are web-only; Playables must stay within the host.
    html = re.sub(r'<meta [^>]*(?:property="og:|name="twitter:|name="robots"|name="description")[^>]*>', "", html)
    html = re.sub(r'<link rel="canonical"[^>]*>', "", html)
    html = re.sub(r'<aside aria-label="Player feedback".*?</aside>', "", html, flags=re.S)
    html = re.sub(r'<link rel="apple-touch-icon"[^>]*>', "", html)
    html = re.sub(r'<meta name="viewport-fit"[^>]*>', "", html)
    # Do not leave off-platform navigation or social-preview URLs in this package.
    if "github.com/dbpimg" in html or "dbpimg.github.io" in html:
        raise ValueError("Off-platform link remains in game bundle")
    if re.search(r'<(?:script|img|audio|video)[^>]+(?:src|href)="https?://(?!www\.youtube\.com/game_api/v1)', html):
        raise ValueError("Unapproved remote resource")
    assets = [("index.html", html.encode("utf-8")), ("assets/game-icon.svg", (ROOT/"assets/game-icon.svg").read_bytes())]
    if any(not re.fullmatch(r"[A-Za-z0-9_.-]+(?:/[A-Za-z0-9_.-]+)*",name) for name,_ in assets):
        raise ValueError("Invalid bundle filename")
    if any(len(data)>=MAX_FILE for _,data in assets):
        raise ValueError("File exceeds 30 MiB")
    if sum(len(data) for _,data in assets)>=MAX_TOTAL:
        raise ValueError("Bundle exceeds 250 MiB")
    if sum(len(data) for _,data in assets)>=MAX_INITIAL:
        raise ValueError("Initial download exceeds 30 MiB")
    output.parent.mkdir(parents=True,exist_ok=True)
    with zipfile.ZipFile(output,"w",compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
        for name,data in assets:
            info=zipfile.ZipInfo(name,date_time=(2026,1,1,0,0,0))
            info.compress_type=zipfile.ZIP_DEFLATED
            info.external_attr=0o644 << 16
            z.writestr(info,data)
    with zipfile.ZipFile(output) as z:
        assert z.namelist()==[name for name,_ in assets]
        assert z.testzip() is None
    print(f"Playables package: {output} ({output.stat().st_size} bytes, {len(assets)} files)")
    return output

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("--output",default="dist/quick-rummy-youtube.zip")
    a=p.parse_args()
    try: build((ROOT/a.output).resolve())
    except (ValueError,OSError,AssertionError) as ex:
        print(f"Build error: {ex}",file=sys.stderr)
        sys.exit(1)
