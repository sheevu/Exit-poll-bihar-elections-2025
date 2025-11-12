# Exit Poll Bihar Elections 2025 Dashboard

This static dashboard keeps a running countdown to the November 14 results, visualizes alliance predictions, and showcases a fully themed AI-generated infographic inspired by the Bihar election bond.

## Running locally
1. Open `index.html` in any modern browser (the page loads React/ReactDOM/Babel from CDNs).
2. Alternatively, serve the folder with a lightweight server (for example `npx serve .` or `python -m http.server 5173`).
3. All interactivity is defined in `app.js` and the styling lives in `style.css`.

## Repository layout
- `index.html`: Entry point that mounts the React dashboard inside `#root` and wires CSS + fonts.
- `app.js`: Self-contained React components that animate the countdown, charts, alliance lists, and ticker.
- `style.css`: Dark neon theme, responsive grid, and animation helpers referenced by `app.js`.
- `new/`: Supporting documentation (`bihar-dashboard-folder-structure.md`) and reusable component library (`components-js-code.md`).

## Notes
- The `bihar-election-2025 (2)` folder and `.zip` are archival references; `new/` describes the intended folder structure for future builds.
- Keep `.gitignore` in sync with the project's tooling so platform/dependency artifacts stay out of Git.
