# LOVE STATIC // PADDED ROOM VJ

An audio-reactive VJ instrument by **OOAKOSIMO / Mohini O**.

The piece begins with one of Mohini's hand drawings: a wide-eyed top-hatted figure surrounded by hearts, lightning and frantic ink. Instead of treating the drawing as a static image, the marks are translated into behaviors: beard fibers stretch and snap, hearts pulse, eyes wander, lightning crackles, room padding breathes, scratches accumulate and the whole drawing can discharge a LOVE SHOCK.

The figure is placed inside a procedural padded room adapted from an older OOAKOSIMO p5.js sketch. The Sketchfab frog from that older work is intentionally removed. The left wall keeps the hand-drawn / stop-motion-like seams and imperfect padded segments because they make the environment feel animated rather than architecturally clean.

## Live pages

- Visual: `/lovestatic/`
- Remote: `/lovestatic/remote.html`

## Modes

The launch screen offers:

- **MIC / BLACKHOLE** — live microphone or system audio routed through BlackHole.
- **LOVE STATIC** — demo track `LoveStatic-Ooakosimo.mp3`.
- **HEARTBREAK HOTEL ON MARS** — demo track `Heartbreak-Hotel-on-Mars.mp3`.
- **DISPLAY / AUTO** — autonomous performance with synthetic frequency-band activity.

The two MP3 files must sit in the same `/lovestatic/` folder as `index.html`.

## Audio reactivity

Default mappings are deliberately exaggerated for VJ use so motion reads clearly on a projector or TV:

- **SUB** → heart expansion + padded-room breathing.
- **BASS** → beard length / stretch.
- **LOW MID** → beard push + hair writhe.
- **MID** → face jitter + general nervous static.
- **HIGH** → lightning density.
- **AIR** → photocopy scratches / ink debris.

The MOD BAY allows the band, min, max, curve, attack and release of each behavior to be changed live.

## Performance controls

The controller deck is hidden by default. Tap **☰ DECK** or press **H** to reveal/hide it.

| Key | Action |
| --- | --- |
| Q | LOVE SHOCK |
| W | LIGHTNING STORM |
| E | HEART BURST |
| R | ROOM RIPPLE |
| Y | BEARD STRETCH |
| U | HAIR WIGGLE |
| T | INVERT HIT |
| P | CYCLE PALETTE |
| A | AUTO CRUISE |
| M | SWITCH / START DEMO MUSIC |
| Space | FREEZE |
| 0 | HUD |
| S | MOD BAY |
| H | SHOW / HIDE DECK |
| + / - | SENSITIVITY |
| F | FULLSCREEN |

The same major actions are exposed as large touch buttons for phones, TV-box browsers and keyboard-free installations.

## Palettes

The piece intentionally avoids a pure white background for long VJ sessions.

- **PAPER** — warm aged paper and near-black ink.
- **NOIR** — dark charcoal room with bone-colored drawing lines.
- **BLOOD** — oxblood field with dirty cream ink.
- **XEROX** — harsher photocopy contrast without using full white.

## Remote control

`remote.html` connects to the visual over MQTT using HiveMQ WebSockets and the session `lovestatic-ooakosimo`.

Open the visual on the projector / TV box and open the remote on a phone. Both need internet access. The remote provides large buttons for LOVE SHOCK, lightning, hearts, ripple, stretch, wiggle, invert, palette, auto, freeze, HUD and the on-screen deck, plus sensitivity and mic-gain sliders.

## BlackHole routing

For Mac system-audio reactivity:

1. Route the desired audio into a BlackHole device or aggregate / multi-output setup.
2. Open the visual over HTTPS.
3. Choose **MIC / BLACKHOLE**.
4. Grant browser microphone permission.
5. Choose BlackHole as the browser / system input when required.
6. Use **SENSITIVITY** and **MIC GAIN** to tune the venue feed.

Normalization is enabled by default so quiet and loud sources remain usable, but it can be disabled in the MOD BAY.

## Provenance / process

**hand drawing → behavioral interpretation → p5.js system → audio-reactive VJ instrument**

The original drawing supplies the composition and visual language. Creative coding turns its marks into performable behaviors rather than merely reproducing the scanned appearance. AI-assisted coding is used as an accessibility and development tool within the artist's workflow.

## Tech

- p5.js
- p5.sound / Web Audio FFT
- MQTT over WebSockets for the remote
- responsive HTML / touch controls
- no Sketchfab dependency

OOAKOSIMO, 2026
