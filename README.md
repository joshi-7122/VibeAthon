# VIBEATHON — Iron Man Themed Website

React + Vite + Tailwind landing page for VIBEATHON.

## Requirements

- [Node.js](https://nodejs.org/) 20.19 or newer (LTS recommended)

## Run it

Each start file installs dependencies the first time, then opens the site in your browser.

- **Windows:** double-click `start.bat`.
- **macOS:** double-click `start.command`. If macOS says it's from an unidentified developer, right-click it → **Open** → **Open** (only needed once).
- **Linux:** run `sh start.sh`.

**Any OS (terminal):**

```bash
git clone https://github.com/joshi-7122/VibeAthon.git
cd VibeAthon
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173). Don't open `index.html` or `dist/index.html` directly from the file system; the videos only load when the site is served.

To let other devices on the same network open it, run `npm run dev -- --host` and use the "Network" URL it prints.

## Build for hosting

```bash
npm run build
```

The finished static site is written to `dist/`. Upload that folder to any static host (Netlify, Vercel, GitHub Pages, etc.). On Vercel, import this repo and pick the **Vite** framework preset.

## Where things are

| What | File |
|---|---|
| Event name, tracks, phases, nav links | `src/data/hackathon.js` |
| Hero section + background videos | `src/components/Hero.jsx` |
| About section (JARVIS HUD backdrop) | `src/components/AboutSection.jsx` |
| Prize pool cards | `src/components/PrizesSection.jsx`, `PrizesSection.css` |
| Hero videos | `public/videos/hero-bg.mp4` (plays once), `public/videos/hero-loop.mp4` (loops), `public/videos/hero-poster.jpg` (shown until video starts) |

## Browser support

Works in current Chrome, Edge, Firefox and Safari on Windows, macOS, Linux, Android and iOS. The hero videos are H.264 MP4 with the index at the start of the file (fast start), so they stream in every browser.

If a browser blocks autoplay (Safari's **Never Auto-Play** setting, iPhone Low Power Mode, data saver), the hero shows a still frame and the video starts on the first click, tap or key press.

To replace a hero video, export it as H.264 MP4 with "fast start" / "web optimized" enabled (HandBrake: *Web Optimized*; ffmpeg: `-c:v libx264 -movflags +faststart`).
