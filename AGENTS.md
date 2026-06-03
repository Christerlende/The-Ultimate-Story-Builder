# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

**The Ultimate Story Builder** is a client-side React SPA (Vite + TypeScript + Tailwind CSS 4). There is no backend, database, or Docker. All state for the Concept workspace is stored in browser `localStorage` (`usb.concept.idea`).

### Services

| Service | Command | Port | Required |
|---------|---------|------|----------|
| Vite dev server | `npm run dev` | 5173 | Yes (development) |
| Vite preview | `npm run preview` | 4173 | Optional (production build testing) |

No other local services are needed. Google Fonts load from CDN (optional; system font fallbacks exist).

### Common commands

See `package.json` scripts:

- **Install deps:** `npm install`
- **Dev server:** `npm run dev` (binds to localhost:5173 by default)
- **Type-check + build:** `npm run build` (`tsc -b && vite build`)
- **Preview prod build:** `npm run build && npm run preview`

There is no ESLint, Prettier, or test runner configured in this repo. Use `npm run build` as the primary validation step (TypeScript + Vite production build).

### E2E smoke test

1. Start `npm run dev` and open http://localhost:5173/
2. Home page shows six competency cards
3. Open **Concept** → enter an idea → click **Done** → reload → idea persists
4. Open `/character` → placeholder "coming soon" message appears

### Notes

- Node.js v22+ and npm are sufficient; no special system dependencies.
- The repo has both `vite.config.ts` and `vite.config.js`; Vite uses the TypeScript config.
- Run the dev server in tmux if you need a long-lived background process in Cloud Agent sessions.
