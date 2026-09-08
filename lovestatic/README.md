# LOVE STATIC // PADDED ROOM VJ

An audio-reactive VJ instrument by **OOAKOSIMO / Mohini O**.

LOVE STATIC begins with one of Mohini's hand drawings: a wide-eyed top-hatted figure surrounded by hearts, lightning and frantic ink. Instead of treating the drawing as a static image, the marks are translated into behaviors: beard fibers stretch and snap, hearts pulse, eyes wander, lightning crackles, room padding breathes, scratches accumulate and the whole drawing can discharge a **LOVE SHOCK**.

The figure sits inside a procedural padded room adapted from an older OOAKOSIMO p5.js sketch. The Sketchfab frog from that older work is intentionally removed. The left wall keeps the imperfect stitched / stop-motion-like padding lines because the room is meant to feel drawn and unstable rather than architecturally clean.

This README is also a development log. It records the things that broke, what fixed them, and why the current architecture exists. The project may eventually be useful as an **AI onboarding document / reusable template for future OOAKOSIMO VJ instruments**.

---

## Live pages

- Visual: `https://ooakosimo.github.io/lovestatic/`
- Remote: `https://ooakosimo.github.io/lovestatic/remote.html`

During development, adding a query string such as `?v=5` is useful for forcing browsers to fetch a newer version instead of serving an old cached script.

---

## Current architecture // v5

```text
ORIGINAL HAND DRAWING
        ↓
PADDED ROOM + CHARACTER DRAWING SYSTEM
        ↓
AUDIO / AUTO REACTIVITY
        ↓
PERFORMANCE TRIGGERS
        ↓
VISIBLE DECK + KEYBOARD
        ↓
PEERJS REMOTE HUB
        ↓
DESKTOP + TABLET + TV BOX + OTHER VISUAL INSTANCES
```

The important architectural rule is now:

```text
ONE REMOTE HUB
MANY VISUAL INSTANCES
```

Each visual gets its own unique PeerJS identity and automatically looks for the fixed LOVE STATIC remote hub. The remote can therefore control several copies of the visual at the same time.

This is intentional for installations: one phone can operate a laptop, tablet, TV-box browser and another projector computer simultaneously.

---

## Files

### `index.html`
The main artwork / VJ instrument. Contains the padded room, drawing system, hotkeys, visible performance deck, palettes and the original modulation model.

### `runtime-fix.js`
A deliberately separate compatibility / plumbing layer.

It currently handles:

- mobile-safe UI interaction
- native streaming audio
- Web Audio FFT input
- mic / BlackHole input
- PeerJS remote transport
- multi-instance remote discovery
- remote state reporting
- remote MOD PATCH BAY commands

Keeping these fixes separate was useful because the artwork already looked right. It let us repair browser/audio/network behavior without repeatedly rewriting the drawing.

### `remote.html`
The phone / tablet performance controller. It is now the fixed PeerJS hub and broadcasts commands to every connected LOVE STATIC visual.

### Demo audio

- `LoveStatic-Ooakosimo.mp3`
- `Heartbreak-Hotel-on-Mars.mp3`

These files live directly inside `/lovestatic/` so the visual can stream them from the same GitHub Pages origin.

---

## Launch modes

The opening screen offers:

- **MIC / BLACKHOLE** — microphone or system audio routed through a virtual audio input.
- **LOVE STATIC** — demo music.
- **HEARTBREAK HOTEL ON MARS** — second demo track.
- **DISPLAY / AUTO** — autonomous performance using synthetic frequency-band activity.

AUTO is especially useful for gallery display, testing, TV-box playback and situations where no audio input is available.

---

## Audio reactivity

The mappings are intentionally exaggerated. This is a VJ instrument, so movement should read from a distance rather than only being technically audio-reactive.

Default ideas:

- **SUB** → heart expansion + padded-room breathing
- **BASS** → beard length / stretch
- **LOW MID** → beard push + hair writhe
- **MID** → face jitter + nervous static
- **HIGH** → lightning density
- **AIR** → scratches / ink debris / photocopy noise

The exact mapping can be changed live.

### MOD parameters

Every mapped behavior can expose:

- frequency **BAND**
- **MIN**
- **MAX**
- response **CURVE**
- **ATTACK**
- **RELEASE**

This means the instrument is not permanently hard-wired to one audio interpretation.

---

## Remote MOD PATCH BAY

The main on-screen **S MODS** panel still exists, but on smaller phones the long panel can become awkward. The better performance workflow is now the separate remote.

The remote borrows the collapsible control pattern from **MO ON THE KEYS**:

```text
▶ HEART PULSE · SUB
▶ BEARD STRETCH · BASS
▶ BEARD PUSH · LOWMID
▶ HAIR WRITHE · LOWMID
▶ FACE JITTER · MID
▶ LIGHTNING DENSITY · HIGH
▶ INK DEBRIS · AIR
▶ ROOM BREATH · SUB
▶ GLOBAL STATIC · MID
```

Tap an arrow row to unfold only that behavior. Inside are the band selector and its sliders.

The remote also keeps quick controls for:

- sensitivity
- mic gain
- normalize on/off
- light / normal / dense scene density

Changes are broadcast live to all connected visual instances.

---

## Performance controls

The visible deck is hidden by default so the artwork can stay clean on a projector or television. Tap **☰ DECK** or press **H** to reveal it.

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

The same major triggers are available as large touch buttons in `remote.html`.

---

## Palettes

Pure white was intentionally removed because it is unpleasant during long VJ sessions.

- **PAPER** — aged warm paper + near-black ink
- **NOIR** — charcoal room + bone-colored drawing
- **BLOOD** — oxblood field + dirty cream ink
- **XEROX** — harsh photocopy contrast without full white

Color inversion is implemented as part of the drawing / palette logic rather than relying only on a CSS filter.

---

# Remote system // v5

## Why PeerJS?

The first remote experiments used public MQTT-over-WebSocket brokers. They repeatedly entered reconnect loops on some browsers and networks even when the visual itself was working correctly.

Rather than keep debugging public broker behavior, the remote transport was changed to **PeerJS / WebRTC data connections**.

PeerJS is only carrying small control/state messages. It is not streaming the artwork or audio.

## Why the remote owns the fixed ID

An earlier PeerJS version gave the **visual** one fixed ID.

That worked for one screen, but a second visual could not register the same identity. The result was effectively:

```text
ONE REMOTE → ONE VISUAL
```

That was the opposite of what is useful for a VJ / installation system.

The architecture was inverted:

```text
REMOTE = fixed hub identity
VISUAL = unique identity generated per instance
```

Now several visual instances can connect to the same remote.

The remote reports the number of connected visuals and displays basic information such as device type, resolution, source, palette and FPS.

### Important

Keep only **one remote tab** open at a time because the remote owns the fixed hub ID.

You may open many visual instances.

---

# Troubleshooting history // what broke and why

This section is intentionally preserved as development provenance and as instructions for future human or AI collaborators.

## 1. Music appeared to take forever to start

### Symptom
Desktop sometimes worked, but phones and tablets could sit on the launch screen while the demo MP3 appeared to be loading forever.

### Cause
The first version used `p5.loadSound()`. For larger MP3 files this can mean downloading and decoding a substantial amount of audio before playback becomes available. Mobile browsers are especially sensitive to this.

### Fix
Demo music now uses a native `HTMLAudioElement` for streaming playback and feeds that element into the Web Audio analyser.

### Design lesson
For a browser VJ instrument, **stream music; do not make the artwork wait for a full p5.Sound decode unless there is a specific reason to do so.**

---

## 2. AUTO / MUSIC / MIC buttons worked on desktop but were dead on phones

### Symptom
Mouse clicks worked. On Android, iPhone and an Android tablet, the launch buttons could appear completely unresponsive.

### Cause
The original p5 sketch had a global `touchStarted()` handler that returned `false`.

In p5 / browser touch handling, returning false can cancel the normal browser touch event and its synthetic click. The canvas interaction was unintentionally swallowing the HTML interface.

### Fix
UI elements are now explicitly protected from the p5 touch handler. Buttons, sliders, selects, links, the launch overlay, deck and panels retain normal browser behavior.

### Design lesson
When mixing a p5 canvas with real HTML controls:

```text
CANVAS TOUCH ≠ UI TOUCH
```

Never globally cancel touch events without checking what the user actually touched.

---

## 3. Remote stuck on `reconnecting…`

### Symptom
The visual worked but the remote could remain in an endless reconnect loop.

### Cause
The first transport depended on public MQTT WebSocket brokers. We tested more than one broker and still saw unreliable behavior across the actual devices / network environment.

### Fix
The remote transport was replaced with PeerJS/WebRTC data connections.

### Design lesson
A protocol can be correct in code and still be a bad fit for the actual installation network. Debug the transport separately from the artwork.

---

## 4. PeerJS worked, but only one visual could exist

### Symptom
The first PeerJS build connected properly, but opening another visual on a tablet or another desktop caused an ID collision.

### Cause
The visual owned one hard-coded PeerJS ID.

### Fix
The ID model was reversed. The remote now owns the single fixed hub ID; each visual creates its own unique ID and connects to the hub.

### Result
One remote can broadcast simultaneously to multiple visuals.

This became a feature rather than merely a bug fix.

---

## 5. S MODS was unpleasant on a phone

### Symptom
The modulation panel was long and lower controls could feel cut off or difficult to reach on small screens.

### Fix
Instead of forcing the entire desktop patch bay into the visual, the remote gained collapsible `<details>` / `<summary>` sections inspired by the KEYS remote.

### Design lesson
The projector should show the artwork. The phone should be the instrument panel.

---

## 6. Remote layout could overflow horizontally

### Symptom
On some browsers the control grid pushed beyond the visible page width.

### Fix
The remote uses constrained grid columns such as `minmax(0, 1fr)`, explicit `min-width:0`, mobile breakpoints and horizontal overflow protection.

### Design lesson
Touch interfaces need to be designed for narrow, strange and low-resolution displays, not just scaled down from desktop.

---

## 7. Browser cache made old bugs appear to survive fixes

### Symptom
A device could continue behaving like an older version after GitHub had already been updated.

### Fix / test method
Use a fresh query string during debugging:

```text
/lovestatic/?v=5
/lovestatic/remote.html?v=5
```

or use a private / incognito tab.

### Design lesson
When debugging static GitHub Pages across multiple devices, always distinguish **code failure** from **cached old code**.

---

# Quick troubleshooting guide

## Launch buttons do nothing on mobile

1. Open a fresh `?v=` URL or private tab.
2. Confirm p5 and `runtime-fix.js` loaded.
3. Test **DISPLAY / AUTO** first because it requires neither music nor microphone permission.
4. If AUTO fails, the problem is interface/script startup, not audio.

## Music visual opens but audio does not play

1. Tap the music button again; mobile autoplay policy may require another explicit user gesture.
2. Check that the two MP3 files still exist beside `index.html`.
3. Watch the HUD audio state: loading / buffering / playing / error.

## MIC does not work

1. Use HTTPS.
2. Grant microphone permission.
3. Check browser / OS input selection.
4. On Mac with BlackHole, verify the routed audio is actually reaching the selected input.
5. Increase MIC GAIN and SENSITIVITY only after confirming an input exists.

## Remote says `0 visuals`

1. Keep the remote page open.
2. Open or reload a LOVE STATIC visual on another device/tab.
3. Give PeerJS a moment to establish signaling and the data connection.
4. Check the visual HUD for the remote connection status.

## Remote says another remote is already open

Close old `remote.html` tabs. Only the remote hub is single-instance.

## A second visual does not connect

Reload that visual. Visuals should have unique PeerJS IDs automatically and all connect to the same hub.

---

# BlackHole routing

For Mac system-audio reactivity:

1. Route the desired audio into BlackHole or an aggregate / multi-output setup.
2. Open LOVE STATIC over HTTPS.
3. Choose **MIC / BLACKHOLE**.
4. Grant browser microphone permission.
5. Select the appropriate BlackHole / aggregate device as input if needed.
6. Use **MIC GAIN** and **SENSITIVITY** to tune the venue feed.
7. Use **NORMALIZE** depending on how dynamic the source is.

No microphone signal is intentionally routed back to the speakers by the LOVE STATIC analyser path, helping avoid feedback.

---

# AI onboarding / future template notes

This project was built iteratively with AI-assisted coding used as an accessibility and development tool. That means the useful documentation is not just the final source code; the debugging history matters too.

For a future AI collaborator working on this codebase:

## Preserve working visual behavior first

If the drawing already looks good, do **not** rewrite it just because the audio or remote is broken.

Prefer this separation:

```text
ARTWORK / DRAWING LOGIC
        ↓
RUNTIME / COMPATIBILITY LAYER
        ↓
REMOTE / NETWORK LAYER
```

That is why `runtime-fix.js` exists.

## Debug in layers

When something fails, test in this order:

```text
1. Does AUTO launch?
2. Does native music playback work?
3. Does mic input work?
4. Does FFT data move?
5. Does one remote connection work?
6. Does multi-instance broadcast work?
7. Only then change artistic behavior.
```

This prevents a networking bug from turning into an unnecessary visual rewrite.

## State should be explicit

The visual reports a compact state object to the remote. Future versions should keep state serializable and human-readable.

Useful state includes:

- source / audio mode
- palette
- sensitivity
- mic gain
- normalize
- density
- FPS
- device / resolution
- MOD mappings

## Commands should be semantic

Prefer commands such as:

```text
trigger: shock
trigger: stretch
action: palette
set: sensitivity
mod: beardStretch.max
global: normalize
```

rather than sending arbitrary JavaScript or tightly coupling the remote to drawing internals.

## Build future instruments from the pattern, not the artwork

The reusable template is not the top-hat man himself. The reusable system is:

```text
responsive visual
+ audio analyser
+ adjustable modulation map
+ autonomous mode
+ performance triggers
+ hidden local deck
+ phone remote
+ multi-screen broadcast
+ state feedback
+ troubleshooting HUD
```

A future piece can replace the drawing system entirely while keeping the same performance architecture.

---

# Provenance / process

```text
hand drawing
→ behavioral interpretation
→ p5.js drawing system
→ padded-room environment
→ exaggerated audio modulation
→ VJ controls
→ mobile compatibility work
→ remote controller
→ multi-instance installation system
```

The original drawing supplies the composition and visual language. Creative coding turns its marks into performable behaviors rather than simply reproducing the scanned appearance.

AI-assisted coding is documented as part of the process and is used as an accessibility / articulation / development tool within the artist's workflow. Artistic direction, source drawing, behavioral choices, testing, selection and implementation decisions remain part of the human creative process.

---

## Tech

- p5.js
- Web Audio API / FFT analyser
- native HTML audio streaming
- PeerJS / WebRTC data connections
- responsive HTML / touch controls
- collapsible mobile MOD PATCH BAY
- multi-instance remote broadcast
- GitHub Pages
- no Sketchfab dependency

---

## Current practical setup

A good performance arrangement is:

```text
PROJECTOR / TV / LAPTOP
LOVE STATIC visual fullscreen
controls hidden

PHONE
LOVE STATIC remote
performance buttons + MOD PATCH BAY

OPTIONAL EXTRA SCREENS
additional LOVE STATIC visual instances
all controlled by the same remote
```

The visual can therefore function as an artwork, a self-running display, an audio-reactive piece, a VJ instrument, or a synchronized multi-screen system.

**OOAKOSIMO, 2026**
