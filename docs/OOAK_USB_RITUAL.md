# THE USB RITUAL :: OOAKOSIMO
*Every step, every why. Do one drive start-to-finish, then repeat for the next.
Nothing here can break your Mac — worst case, a cheap drive fails its exam and
goes back to Lazada.*

## STEP 0 — plug it in
Plug ONE drive into the MacBook. Wait a few seconds. An icon should appear on
the Desktop (or in a Finder window's sidebar under "Locations").
**Why:** we test one at a time so you always know which drive passed.

## STEP 0.5 — format first (your instinct: correct, and blessed)
Wiping the drive BEFORE the exam is good practice — it erases any factory
junk, gives you a clean slate, and renames it in the same move:
Open **Disk Utility** (⌘+Space → type `disk utility`). In the sidebar, click
the **DRIVE itself** (the outer item, not the indented volume under it) →
**Erase** → Name: `OOAKOSIMO` → Format: **MS-DOS (FAT)** → if a Scheme menu
appears, pick **Master Boot Record** → Erase.
**Why MS-DOS (FAT):** the one format every machine on earth reads — Mac,
Windows, Linux, TV boxes. (Drives *bigger* than 32GB would use ExFAT; your
2GB ones want MS-DOS FAT.)
**Why the exam still matters after formatting:** formatting a FAKE drive
"succeeds" too — Disk Utility believes the lie. Only the f3 exam catches it.
Format first, then examine. (Bonus: STEP 4 is now already done — the drive
is named.)

## STEP 1 — learn its name
Open **Terminal** (press ⌘+Space, type `terminal`, Enter). Type:

    ls /Volumes

You'll see `Macintosh HD` plus one more name — something like `NO NAME`,
`USB DISK`, or `MNK`. **That other name is your DRIVENAME.**
**Why:** the Mac addresses every drive as `/Volumes/ITS-NAME`. Commands need
that exact address.

**The lazy trick (use it!):** whenever a command below says
`/Volumes/DRIVENAME`, just type the command part, then **drag the drive's icon
from the Desktop into the Terminal window** — the Mac pastes the full address
perfectly, spaces and all. Then press Enter.

## STEP 2 — the honesty exam (is 2GB really 2GB?)
One-time tool install (needs internet):

    brew install f3

*(If Terminal says `brew: command not found`, stop and tell Claude — there's a
no-install alternative; don't fight it.)*

Then, the exam — two commands, run one after the other:

    f3write /Volumes/DRIVENAME
    f3read /Volumes/DRIVENAME

`f3write` fills the whole drive with test files (a 2GB drive over USB takes
maybe 10–20 minutes — let the progress run, go make coffee). `f3read` reads
everything back and grades it.

**PASS looks like:** `Data OK: 1.8x GB` and `Corrupted: 0.00 Byte` →
the drive is honest. Keep it.
**FAIL looks like:** any `Corrupted:` amount above zero → the drive lies about
its size and silently eats files. Return it (the window is open).
**Why:** fake-capacity drives accept your files and destroy them *later* —
the worst possible time. This exam catches it today.

## STEP 3 — clean up the exam papers
The test leaves files named `1.h2w`, `2.h2w`... Delete them:

    rm /Volumes/DRIVENAME/*.h2w

(or just select them in Finder and trash them, then empty trash).
**Why:** the edition drive should ship containing only the artwork.

## STEP 4 — rename the drive
In Finder: click the drive icon once → press **Enter** → type:

    OOAKOSIMO

→ press Enter again.
**Why:** when a collector plugs it in, the first word they see should be yours.
(These drives use an old format that allows 11 UPPERCASE letters —
`OOAKOSIMO` is 9, so it fits perfectly.)

## STEP 5 — what goes ON an edition drive
Three files, when a piece sells (for today, do a practice run with the commute):

1. **The artwork** — the piece's single html file, e.g.
   `LIFE_AS_WE_KEEP_ON_KEEPING_ON.html`. Get the exact live copy: open the
   piece on Neocities → right-click → View Page Source → ⌘+S save → rename.
   (Or copy it from the system zip's `instruments/` folder.)
2. **`coa.html`** — the edition's certificate page copy (made per-edition,
   later, with the room word).
3. **`README.txt`** — three lines, plain text:

       The artwork is the code. Open the .html file in any browser.
       It also lives at ooakosimo.neocities.org — your edition's room word
       is on your signed card.

**Why:** the drive is a vessel, not the artwork (your own COA text says so) —
but a vessel that works out of the box, explains itself, and points home.

## STEP 6 — prove the vessel
Eject the drive (drag icon to Trash / press ⏏). Unplug. Replug.
Double-click the html **from the drive itself** — the artwork should open and
run in the browser.
**Why:** this is exactly what a collector will do. If it works for you cold,
it works for them.

## STEP 7 — always eject
Every time: eject before unplugging.
**Why:** yanking a FAT drive mid-write is the #1 way to corrupt it — and cheap
drives don't forgive.

*Repeat for drive #2. Two passing, renamed, practice-loaded drives = the
edition fleet is real.* 🌺
