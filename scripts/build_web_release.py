#!/usr/bin/env python3
"""Build a deterministic HTML5 release archive for browser distribution."""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
FIXED_ZIP_TIME = (1980, 1, 1, 0, 0, 0)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def build_archive(output_dir: Path, skip_build: bool) -> tuple[Path, Path]:
    package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
    version = str(package["version"])
    if not skip_build:
        subprocess.run(
            ["npm", "run", "build", "--", "--configLoader", "runner"],
            cwd=ROOT,
            check=True,
        )
    if not (DIST / "index.html").is_file():
        raise SystemExit("dist/index.html is missing; the browser build is incomplete")

    output_dir.mkdir(parents=True, exist_ok=True)
    stem = f"titans-of-war-birth-of-rome-web-v{version}"
    archive = output_dir / f"{stem}.zip"
    files = sorted(path for path in DIST.rglob("*") if path.is_file() and path.name != ".DS_Store")
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as bundle:
        for path in files:
            relative = path.relative_to(DIST).as_posix()
            info = zipfile.ZipInfo(relative, FIXED_ZIP_TIME)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            bundle.writestr(info, path.read_bytes())

    with zipfile.ZipFile(archive) as bundle:
        names = bundle.namelist()
        if "index.html" not in names or any(name.startswith("dist/") for name in names):
            raise SystemExit("release archive must place index.html at its root")
        if any(Path(name).suffix in {".jsx", ".md"} for name in names):
            raise SystemExit("release archive contains source or documentation files")

    commit = subprocess.run(
        ["git", "rev-parse", "HEAD"], cwd=ROOT, check=True, capture_output=True, text=True
    ).stdout.strip()
    manifest = {
        "schema": "titans_forge_web_release_v1",
        "project": package["name"],
        "version": version,
        "source_commit": commit,
        "archive": archive.name,
        "archive_bytes": archive.stat().st_size,
        "archive_sha256": sha256(archive),
        "entry_count": len(files),
        "index_at_root": True,
    }
    manifest_path = output_dir / f"{stem}.manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return archive, manifest_path


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", type=Path, default=ROOT / "release")
    parser.add_argument("--skip-build", action="store_true")
    args = parser.parse_args()
    archive, manifest = build_archive(args.output_dir.expanduser().resolve(), args.skip_build)
    print(json.dumps({"archive": str(archive), "manifest": str(manifest)}, indent=2))


if __name__ == "__main__":
    main()
