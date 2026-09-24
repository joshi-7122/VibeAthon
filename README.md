<div align="center">
  <img src="./public/galgotias-logo.png" alt="Galgotias University" width="200" />
  <img src="./public/ieee-logo.png" alt="IEEE Student Branch" width="160" />

  <h1>⚡ VIBEATHON: AI-POWERED DEVELOPMENT</h1>
  <p><strong>The Official Hackathon Portal for Galgotias University IEEE Student Branch</strong></p>
  
  <p>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
    <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" /></a>
  </p>
</div>

<br />

## 🦾 About The Project

**VibeAthon** is a high-octane, Iron Man / JARVIS-themed landing page engineered for an AI-Powered Development hackathon. Built with modern web technologies, it features immersive 3D CSS effects, hardware-accelerated video backgrounds, and interactive particle systems.

The interface simulates a tactical HUD (Heads-Up Display) with stark cyan and crimson accents, monospace typography, and cinematic reveals.

### 🌟 Key Features
- **Suit-up Protocol Preloader:** A custom Three.js particle swarm and CSS-animated Arc Reactor loading screen.
- **Cinematic Hero:** Seamless transitioning background videos that bypass native browser autoplay blocks using direct DOM manipulation.
- **The Star Assembly:** A 3D-flipping ID card roster showcasing the core organizing team.
- **Tactical Timeline:** A responsive "circuit board" schedule visualizing the hackathon phases.
- **Hardware Accelerated:** Optimized for smooth 60fps animations across devices using Framer Motion and native CSS transforms.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) installed on your system.

### Installation & Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/joshi-7122/VibeAthon.git
   cd VibeAthon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Ignite the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser. *(Note: Do not open `index.html` directly from the filesystem; the videos and assets require a local server).*

### 🛠️ Quick Start Scripts (No CLI needed)
- **Windows:** Double-click `start.bat`.
- **macOS:** Double-click `start.command`. *(Right-click → Open the first time to bypass unidentified developer warnings).*
- **Linux:** Run `sh start.sh`.

---

## 🏗️ Architecture & Component Map

| Component | Location | Description |
|---|---|---|
| **Global Data** | `src/data/hackathon.js` | Centralized data for tracks, timeline phases, and text copy. |
| **Preloader** | `src/components/IronSuitupIntro.jsx` | Three.js particle background with SVG animated Arc Reactor. |
| **Hero Section** | `src/components/Hero.jsx` | Dual-video cinematic reveal bypassing Safari playback restrictions. |
| **Organizers** | `src/components/StarAssembly.jsx` | 3D CSS flip cards for the organizing committee (11 members). |
| **Timeline** | `src/components/Timeline.jsx` | Circuit-board style vertical timeline with Iron Man sketch backdrop. |
| **Global Styles** | `src/index.css` | Custom scrollbars, glitch animations, grid lines, and WebKit overrides. |

---

## 🌐 Deployment

To build the static files for production hosting (Vercel, Netlify, GitHub Pages):

```bash
npm run build
```

This generates an optimized `dist/` folder ready for deployment. If deploying to Vercel, simply import the repository and select the **Vite** preset.

---

## 🛡️ Browser Compatibility

Engineered to support all modern browsers (Chrome, Edge, Firefox, Safari) on Windows, macOS, Linux, iOS, and Android. 

*Note on Video Autoplay:* The hero section utilizes a custom aggressive mount sequence via React callback refs to guarantee silent video playback and suppress the native Safari "Play" button overlay, ensuring a seamless cinematic experience regardless of device power-saving states.

---
<div align="center">
  <p><i>"Sometimes you gotta run before you can walk."</i></p>
  <p>Developed for the Galgotias University IEEE Student Branch</p>
</div>
