#!/bin/bash
# Double-click to run (macOS). Installs dependencies on first run, then starts the site.
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Please install Node 18 or newer from https://nodejs.org and run this again."
  read -n 1 -s -r -p "Press any key to close"; exit 1
fi
[ -d node_modules ] || npm install --no-audit --no-fund
npm start
