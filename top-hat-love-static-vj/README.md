# TOP HAT LOVE STATIC // PADDED ROOM VJ

An audio-reactive and autonomous VJ instrument by **OOAKOSIMO / Mohini O.**

This piece began as an original hand drawing: a top-hatted, bearded figure surrounded by hearts, lightning, scratch marks, and nervous black ink. The drawing was then translated into behavior rather than simply reproduced as an image. Its visual marks became a responsive p5.js system: beard fibers move, hearts pulse, lightning crackles, the face jitters, ink debris appears, and the surrounding padded room breathes and ripples.

The work can function as:

- an autonomous display / installation
- an audio-reactive visualizer
- a manually played VJ instrument
- a touch-controlled browser piece for phones, tablets, TV boxes, and projector computers

## Run

Open `index.html` in a modern browser. GitHub Pages serves the piece over HTTPS, which is required for microphone access.

Public path:

`https://ooakosimo.github.io/top-hat-love-static-vj/`

## Start modes

### MIC / BLACKHOLE

Uses browser microphone input through WebAudio / p5.sound.

For system-audio routing on macOS, select a BlackHole audio device or aggregate device as the browser microphone input. The sketch requests audio with echo cancellation, noise suppression, and automatic gain control disabled so the incoming signal is less altered by browser voice-processing features.

### DISPLAY / AUTO

Runs without audio input. A synthetic set of frequency bands creates an animated performance, and Auto Cruise periodically fires larger events such as Love Shock, Lightning Storm, Heart Burst, Room Ripple, and occasional palette changes.

This mode is intended for unattended display, installation, TV-browser playback, and testing without an audio source.

## Audio-reactive mapping

The default patch is deliberately tied to the visual behavior of the hand drawing:

| Frequency region | Visual behavior |
| --- | --- |
| SUB | heart pulse + padded-room breathing |
| BASS | beard expansion / speaker-cone push |
| LOW MID | beard and hair writhe |
| MID | face / eye nervous jitter + general static |
| HIGH | lightning density |
| AIR | ink scratches and debris |

Each modulation slot can be reassigned in the MOD BAY. Every slot exposes:

- `band`
- `min`
- `max`
- `curve`
- `attack`
- `release`

This makes the artwork patchable rather than permanently tied to one FFT mapping.

## Visible VJ controls

The bottom deck is designed to remain usable without a keyboard, including TV-box browsers and touchscreens.

- **LOVE SHOCK** — explodes the drawing outward
- **LIGHTNING** — temporary electrical storm
- **HEARTS** — heart pulse burst
- **RIPPLE** — sends perspective ripples through the padded room
- **INVERT** — short inverse-value flash
- **PALETTE** — cycles palette modes
- **AUTO** — toggles autonomous cruise
- **FREEZE** — pauses animation
- **HUD** — hides / shows technical display
- **MODS** — opens the modulation patch bay
- **− / + SENS** — adjusts global audio sensitivity
- **FULL** — browser fullscreen
- **RESET** — rebuilds the procedural scene

## Keyboard controls

| Key | Action |
| --- | --- |
| `Q` | Love Shock |
| `W` | Lightning Storm |
| `E` | Heart Burst |
| `R` | Room Ripple |
| `T` | Invert flash |
| `P` | Palette |
| `A` | Auto Cruise |
| `S` | Modulation panel |
| `SPACE` | Freeze |
| `0` | HUD |
| `F` | Fullscreen |
| `+ / -` | Sensitivity |

## Palettes

The piece deliberately avoids a pure white screen for long VJ / projection sessions.

- **PAPER** — warm dirty paper and near-black ink
- **NOIR** — dark room with bone-colored drawing lines
- **BLOOD** — oxblood padded room with pale ink
- **XEROX** — harder photocopy-style black / aged-paper contrast

## The padded room

The environment is adapted from an earlier OOAKOSIMO p5.js padded-room experiment. The old Sketchfab frog layer has been removed. The room remains procedural: perspective wall panels and floor pads are drawn directly in p5.js and respond to low-frequency energy.

The contrast is intentional: the padded room is repetitive, orderly, and contained, while the top-hat figure is scratchy, unstable, romantic, and electrically excessive.

## Provenance / process

**hand drawing → visual behavior study → image-to-code translation → interactive p5.js sketch → audio-reactive VJ instrument**

AI-assisted coding was used as an accessibility and development tool in organizing and implementing the interactive system. The original drawing, concept, direction, behavioral decisions, selection, and performance design are by OOAKOSIMO.

## Technical notes

- p5.js 1.9
- p5.sound 1.9
- WebAudio microphone input
- responsive canvas
- no external image assets
- no Sketchfab embed
- no required audio file
- touch + keyboard controls
- adaptive browser fullscreen

## Related architecture

The VJ-control architecture is derived from the earlier **MO ON THE KEYS // PSYCHO NOIR AUTOPILOT** approach: frequency-band normalization, modulation slots, attack/release smoothing, autonomous performance logic, hotkeys, and touch-accessible controls.

---

OOAKOSIMO, 2026
