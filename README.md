# VIBEATHON — Iron Man Themed Website

React + Vite + Tailwind landing page for VIBEATHON.

## Requirements

- [Node.js](https://nodejs.org/) 20.19 or newer (LTS recommended)

## Run it

**Windows:** double-click `start.bat`. It installs dependencies the first time, then opens the site in your browser.

**Any OS (terminal):**

```bash
git clone https://github.com/joshi-7122/VibeAthon.git
cd VibeAthon
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

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
| Hero videos | `public/videos/hero-bg.mp4` (plays once), `public/videos/hero-loop.mp4` (loops) |
