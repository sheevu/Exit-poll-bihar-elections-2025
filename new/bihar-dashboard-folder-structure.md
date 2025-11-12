# Bihar Elections 2025 Dashboard – Folder Structure & Publishing Notes
**Project:** Bihar Election 2025 – Live Visual Infographics Dashboard  
**Maintained By:** NNN AI Labs & Sudarshan AI Labs  
**Last Revision:** November 15, 2025  
**Status:** Ready for lightweight publishing

---

## Repository Layout

```
widget-bihar-elections/
│
├── index.html                             # Browser entry point with React/Babel CDN includes
├── app.js                                 # All interactive React and Chart.js logic
├── style.css                              # Global layout, typography and animation styles
├── .gitignore                             # Repository ignore rules (created for GitHub readiness)
├── new/                                   # Supporting documentation
│   ├── components-js-code.md              # Enhanced React component library & defaults
│   └── bihar-dashboard-folder-structure.md # This document (single source of truth)
├── bihar-election-2025 (2)/                # Archived reference build (optional)
└── bihar-election-2025 (2).zip            # Backup zip of the dashboard (optional)
```

> Note: The two archive artifacts (`bihar-election-2025 (2)/` and `.zip`) are kept for reference. Only `index.html`, `app.js`, `style.css`, the `.gitignore`, and the `new/` documentation folder are expected in a clean publish.

---

## Key Files

- `index.html` – Loads fonts from Google, bundles React/ReactDOM/Babel via CDN, links `style.css`, and boots `app.js` inside the `<div id="root"></div>` container.
- `app.js` – The single-page React application that:
  - Tracks the countdown, animates bar/pie/gauge charts, and rotates visualizations.
  - Renders alliance breakdowns, stats cards, and the ticker.
  - Mounts the dashboard root via `ReactDOM.createRoot`.
- `style.css` – Encapsulates the dark neon theme, grid/RWD rules, animated backgrounds, and all component-specific styling referenced by `app.js`.
- `new/components-js-code.md` – A production-ready set of React components along with default data and guardrails in case an external caller omits props. This is the blueprint for a future bundler-based refactor.
- `new/bihar-dashboard-folder-structure.md` – This updated documentation now serves as the single source of truth for repository layout and publishing notes.

---

## Development & Publishing Checklist

1. **Verify the React bundle:** `app.js` uses CDN React + Babel, so ensure your static host serves `index.html` with the other files in the same directory.
2. **Keep the `.gitignore` up to date:** The newly created `.gitignore` should prevent platform or dependency noise from creeping into commits.
3. **Clean archives before publishing:** Remove or move `bihar-election-2025 (2)/` and `.zip` if you wish to keep the GitHub repo lean; otherwise leave them as reference artifacts (they are ignored by `.gitignore`).
4. **Document changes:** Update `new/components-js-code.md` if you expand or refactor the dashboard, since that file is referenced as the component library.

---

## Notes

- Responsive breakpoints and typography preferences continue to be captured inside `style.css`. Copy them into a build-tool pipeline if you migrate away from Babel standalone mode.
- All predictions are AI-generated. The disclaimer in `Footer` (and the documentation) should remain intact to avoid misinterpretation when the project is published.

---

End of documentation.
