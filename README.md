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
| Event name, stats, tracks, crew, FAQs, contact, event date | `src/data/hackathon.js` |
| Loading screen ("IEEE GUSB CIS presents") | `src/components/IronSuitupIntro.jsx`, `IntroPresents.jsx` |
| Hero section, background videos and intro audio | `src/components/Hero.jsx` |
| Background music player (volume, start delay) | `src/components/BackgroundMusic.jsx` |
| About section and launch countdown | `src/components/AboutSection.jsx`, `LaunchCountdown.jsx` |
| Prize cards | `src/components/PrizesSection.jsx`, `PrizesSection.css` |
| Timeline (schedule) | `src/components/Timeline.jsx` |
| Our Marks (organising committee) | `src/components/CrewSection.jsx`, `CrewSection.css` |
| FAQs | `src/components/FaqSection.jsx` (questions live in `src/data/hackathon.js`) |
| Footer / contact | `src/components/Footer.jsx` |
| Iron Man gauntlet cursor | `src/components/StarkCursor.jsx` |
| Hero videos | `public/videos/hero-bg.mp4` (plays once), `public/videos/hero-loop.mp4` (loops), `public/videos/hero-poster.jpg` (shown until video starts) |
| Audio | `public/audio/hero-intro.m4a` (plays with the first hero video), `public/audio/background-music.mp3` (loops quietly for the whole visit) |

## Browser support

Works in Chrome, Edge, Firefox and Safari on Windows, macOS, Linux, Android and iOS, including older Macs on Safari 15 (macOS Catalina / Big Sur). The build keeps CSS fallbacks and `-webkit-` prefixes for those older browsers. The hero videos and intro audio are MP4/M4A with the index at the start of the file (fast start), so they stream in every browser.

If a browser blocks autoplay (Safari's **Never Auto-Play** setting, iPhone Low Power Mode, data saver), the hero shows a still frame and the video starts on the first click, tap or key press.

**Sound:** browsers only allow sound after the visitor has clicked, tapped or pressed a key on the page. The intro audio and background music start straight away if they have (for example "Skip intro"), otherwise on their first click, tap or key press. The background music plays at 8% volume (on iPhone/iPad too, via Web Audio) and pauses while the tab is in the background. Change the level with `VOLUME` in `src/components/BackgroundMusic.jsx`.

To replace a hero video, export it as H.264 MP4 with "fast start" / "web optimized" enabled (HandBrake: *Web Optimized*; ffmpeg: `-c:v libx264 -movflags +faststart`).
