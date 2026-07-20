# Birth of Rome Release Checklist

This checklist freezes the public browser build without changing the simulation or requiring a network service.

## 1. Verify The Source

Run from a clean release branch:

```bash
npm ci
npm run check
npm run balance
```

The release is blocked by a failed project check, test, reference strategy, or production build. `MEDIA_RIGHTS.md` must cover every shipped image and audio recording.

## 2. Build The Browser Package

```bash
npm run release:web
```

The command rebuilds the app and writes two ignored artifacts under `release/`:

- `titans-of-war-birth-of-rome-web-v0.1.0.zip`
- `titans-of-war-birth-of-rome-web-v0.1.0.manifest.json`

The zip has `index.html` at its root and contains only the Vite production output. The manifest records the source commit, file count, byte size, and SHA-256 checksum.

## 3. Browser Smoke Test

Serve `dist/` through a local HTTP server. Verify the campaign home, Begin or Continue Campaign, one council choice, one building selection, Home, Historical Method, Credits and Rights, Music without autoplay, save, and restore. Check a desktop viewport and a 390 px mobile viewport.

## 4. Publish Deliberately

GitHub and itch.io are separate release actions.

- GitHub: merge the independently verified release commit, create the public repository, push the release branch, tag `v0.1.0`, and attach the zip plus manifest to the release.
- itch.io: upload the zip as an HTML5 browser project. Enable mobile support, fullscreen, and iframe scrollbars. Do not mark the archive as a native executable.
- Keep code and original documentation under MIT. Link `MEDIA_RIGHTS.md` for generated art and public-domain recordings.

Do not rebuild between the GitHub attachment and itch.io upload. Publish the same zip whose checksum appears in the manifest.
