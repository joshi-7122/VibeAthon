#!/bin/sh
# Start the VIBEATHON site on macOS / Linux: installs dependencies on first run,
# then opens the site in your browser.
cd "$(dirname "$0")" || exit 1

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Download it from https://nodejs.org/ and run this again."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies - first run only, this can take a minute..."
  npm install || { echo "npm install failed."; exit 1; }
fi

echo "Starting VIBEATHON site... press Ctrl+C to stop it."
npm run dev -- --open
