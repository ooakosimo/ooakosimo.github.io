# You are the voice of a neural casino that dreams... Recursive Chamber v2 — reactive architecture standalone vj art piece

**OOAKOSIMO** · HTML / JavaScript / p5.js · Edition 1 of 1 · Collection: Field Notes from the Balcony

Recursive Chamber v2 is the reactive, live sibling of *Visibility Valve :: The Infinite Chamber*. The minted originals stay untouched; this one reacts to the room. A corridor of nested frames reconfigures itself to sound: the space "tries to remember what it looks like", and now it remembers the music. Small shadow figures roam and surge through it, and blue cracks bloom on high frequencies. The cursor still drifts the vanishing point.

It runs on the same modulation system as the other VJ instruments: six audio bands (sub, bass, low-mid, mid, high, air), and every reactive property is a mod slot with its own band, min/max, curve, attack and release, editable live in a slider panel.

Tags on SuperRare: #ooakosimo #codeart #live #audioreactive

## Where it lives

| What | Link |
|---|---|
| SuperRare (minted, token 8) | https://superrare.com/artwork/eth/0x911d7B92F96Ba7de2C8b833D42EfFF674F7443d4/8?tab=details |
| GitHub Pages (live) | https://ooakosimo.github.io/neural-casino/ |

Contract: `0x911d7B92F96Ba7de2C8b833D42EfFF674F7443d4` (Ethereum, ERC-721), token ID 8. The SuperRare page has no written description; this README is the description of record.

## Which file is which

| File | What it is |
|---|---|
| `minted.html` | The file minted on SuperRare, byte for byte. It loads p5.js 1.9.4 from cdnjs and plays its song from `stateofmind.neocities.org`. This is the reference copy. |
| `index.html` | The archive copy served by GitHub Pages. It is the minted file with three changes only: p5 and p5.sound load from this folder, the song loads from this folder (`ooakosimo-oud2.mp3`), and a tab icon line was added. |
| `p5.min.js`, `p5.sound.min.js` | p5.js libraries kept here so the piece does not depend on a CDN. |
| `ooakosimo-oud2.mp3` | The song used by the MUSIC (hosted) button. |

SHA-256 of `minted.html`: `6019bf029b8e1a10d9c6f6912f4a547501555c775f03fe3de8bdad319ad8f13e`

## What rides what (defaults)

| Property | Audio band | What you see |
|---|---|---|
| chamberDepth | sub | corridor breathes deeper on hits |
| vpDrift | mid | perspective warps to the music |
| frameFlare | high | nested lines thicken on treble |
| entitySurge | bass | shadows surge forward |
| entityJitter | high | shadows scatter on treble |
| crackBloom / crackFlare | air | blue cracks multiply and flare on shimmer |
| glowSwell | bass | whole chamber glows harder on swells |

## How to run a copy

1. Download the folder.
2. Serve it over `http://localhost` or `https` (for example `python3 -m http.server`, then open `http://localhost:8000/index.html`). Microphone access is blocked on plain `file://` pages in most browsers.
3. Click **MIC / BLACKHOLE** (live room or a routed audio source such as BlackHole). Nothing is recorded or sent anywhere.

## Hotkeys

M mic or music (before start) · S slider panel · 1 / 2 / 3 density · J normalize · 0 HUD · F fullscreen · + / - sensitivity · C cursor drift on or off. Click the page once for focus.
