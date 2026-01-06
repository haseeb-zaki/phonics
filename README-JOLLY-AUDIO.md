# Jolly Phonics Audio Files

This app uses official Jolly Phonics audio files from [Jolly Kingdom](https://www.jollykingdom.com/lettersounds/).

## Audio Files

The app can use audio files in two ways:

1. **Remote URLs** (default): Audio files are loaded directly from Jolly Kingdom website
2. **Local Files** (optional): Download audio files locally for offline use

## Downloading Audio Files

To download all Jolly Phonics audio files locally:

### Windows (PowerShell)
```powershell
.\scripts\download-jolly-sounds.ps1
```

### Manual Download
You can manually download files from:
- Base URL: `https://www.jollykingdom.com/lettersounds/sound/`
- Files: `s.mp3`, `a.mp3`, `t.mp3`, etc. (see `lib/jolly-audio.ts` for full list)
- Save to: `public/sounds/` directory

## Audio Files List

All 42 Jolly Phonics sounds:

**Group 1:** s, a, t, i, p, n
**Group 2:** c/k, e, h, r, m, d
**Group 3:** g, o, u, l, f, b
**Group 4:** ai, j, oa, ie, ee, or
**Group 5:** z, w, ng, v, oo (moon/book), y, x
**Group 6:** ch, sh, th (three/this)
**Group 7:** qu, ou, oi, ue, er, ar

## Usage in App

The app automatically:
- Tries to load local files from `/sounds/` directory first
- Falls back to remote URLs from Jolly Kingdom if local files not found
- Shows "Play Jolly Phonics Audio" button when audio is available

## Note

These audio files are provided by Jolly Kingdom for educational purposes. Please respect their copyright and terms of use.

