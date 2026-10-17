# MO ON THE KEYS :: PSYCHO NOIR // VJ MOD INSTRUMENT

**OOAKOSIMO, 2026** · HTML / JavaScript / p5.js · Edition 1 of 1

A living browser artwork. Typewriter bars descend through a paper-colored field. Black scanlined circles drift, stretch and fracture. Ink-like saxophone gestures appear and disappear like scratches cut into film. Underneath is a six-band modulation system: every visual property can be patched to a frequency range and shaped with its own limits, curve, attack and release.

The piece began as a visualizer made as a gift for Cody Campbell (CODYTHECAMPBELL), who wrote a song about the artist and made the track with Suno. It grew into a fully playable VJ modulation instrument.

## Where it lives

| What | Link |
|---|---|
| SuperRare (minted, token 9) | https://superrare.com/artwork/eth/0x911d7B92F96Ba7de2C8b833D42EfFF674F7443d4/9 |
| This archive (GitHub) | https://github.com/ooakosimo/ooakosimo.github.io/tree/main/keys |
| GitHub Pages (live) | https://ooakosimo.github.io/keys/ |
| Live networked edition | https://ooakosimo.neocities.org/keys/ |
| Phone / tablet remote | https://ooakosimo.neocities.org/keys/remote.html |
| Original Chonkly legacy piece | https://www.chonkly.com/artwork/j573stv4txjhsvgh4dr9az3gy580p1f9 |

Contract: `0x911d7B92F96Ba7de2C8b833D42EfFF674F7443d4` (Ethereum, ERC-721), token ID 9.

## Three ways to run it

- **MIC / BLACKHOLE**: listens to a live room, a performance, or a routed audio source (for example BlackHole virtual audio on macOS). Nothing is recorded or sent anywhere.
- **MUSIC / MANUAL**: performs with the original song.
- **DISPLAY / AUTO**: needs no microphone, music or speakers. It generates its own virtual frequency bands and slowly breathes, pulses and mutates by itself.

## How to run a copy

1. Download the folder (or the `index.html` and its assets).
2. Serve it over `http://localhost` or `https` (for example `python3 -m http.server`, then open `http://localhost:8000/`). Microphone access is blocked on plain `file://` pages in most browsers.
3. Click one of the three source buttons.

## Hotkeys

S modulation patch bay · A silent AUTO cruise · Q speed ramp · W sax storm · E circle burst · R white flash · T invert · SPACE freeze motion · P pause or resume music · J normalization · 1 / 2 / 3 visual density · + / - master sensitivity · ; / L microphone gain down or up · 0 hide HUD · F fullscreen · M choose microphone or music before launch.

## Dependencies (important for long-term preservation)

The HTML file loads these from `ooakosimo.neocities.org/keys/`:

- `p5.min.js`, `p5.sound.min.js`, `mqtt.min.js` (libraries)
- `mo-on-keys-coverFIN.png` (cover image on the start screen)
- `Mo-on-the-keys-v1.mp3` (the original song, used by MUSIC / MANUAL)
- `gumamela.gif` (tab icon, from `ooakosimo.neocities.org`)

The optional phone remote talks over a public MQTT broker (`broker.hivemq.com`). If that broker is gone, the remote stops working but the artwork itself still runs.

If Neocities disappears, copy those files into this folder and change the absolute URLs in `index.html` to relative ones (for example `src="p5.min.js"`).

## Notes

Contains flashing and rapidly changing imagery.
