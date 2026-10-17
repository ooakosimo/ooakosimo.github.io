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

## Which file is which

| File | What it is |
|---|---|
| `minted.html` | The file minted on SuperRare, byte for byte. It loads its libraries, cover image and song from `ooakosimo.neocities.org`. This is the reference copy. |
| `minted-local.html` | The same file with only the web addresses changed to local ones (libraries, cover, song, tab icon). Open it from this folder and it runs without Neocities. |
| `index.html` | The working copy that GitHub Pages serves at `/keys/`. Its page title differs from the minted file, so treat `minted.html` as the record. |
| `p5.min.js`, `p5.sound.min.js`, `mqtt.min.js`, `mo-on-keys-coverFIN.png`, `Mo-on-the-keys-v1.mp3` | Libraries, cover and song, kept here so nothing depends on another host. |
| `remote.html` | Phone / tablet remote. |

SHA-256 of `minted.html`: `5b71b86e8af85e0e828277cac0d9682089927992cc326458eb7dc05adc6a294b`

## Three ways to run it

- **MIC / BLACKHOLE**: listens to a live room, a performance, or a routed audio source (for example BlackHole virtual audio on macOS). Nothing is recorded or sent anywhere.
- **MUSIC / MANUAL**: performs with the original song.
- **DISPLAY / AUTO**: needs no microphone, music or speakers. It generates its own virtual frequency bands and slowly breathes, pulses and mutates by itself.

## How to run a copy

1. Download the folder.
2. Serve it over `http://localhost` or `https` (for example `python3 -m http.server`, then open `http://localhost:8000/minted-local.html`). Microphone access is blocked on plain `file://` pages in most browsers.
3. Click one of the three source buttons.

## Hotkeys

S modulation patch bay · A silent AUTO cruise · Q speed ramp · W sax storm · E circle burst · R white flash · T invert · SPACE freeze motion · P pause or resume music · J normalization · 1 / 2 / 3 visual density · + / - master sensitivity · ; / L microphone gain down or up · 0 hide HUD · F fullscreen · M choose microphone or music before launch.

## Remaining outside dependencies

The phone remote talks over a public MQTT broker (`broker.hivemq.com`). If that broker is gone, the remote stops working but the artwork itself still runs. The tab icon `/gumamela.gif` is read from the root of the site; without it the page only loses its icon.

Contains flashing and rapidly changing imagery.
