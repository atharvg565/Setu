# Setu — Academia–Industry Collaboration Portal

A frontend prototype for Setu, an academia–industry collaboration portal. It demonstrates the complete MVP experience described in the PRD: role-based entry, student skill profiles, weighted internship matches, industry posting creation, ranked candidates, and application tracking.

This repository is **frontend-only**. The current data is seeded in React state so the demo can be run without a backend. Replace those local states with API calls when the Node/Express backend is ready.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Lucide React icons
- Sonner toasts

## Run locally

Requirements: Node.js 18+ and npm 9+ (Node.js 20+ recommended).

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:3000`.

The project also supports pnpm:

```bash
pnpm install
pnpm dev
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Run the TypeScript compiler without emitting files |
| `npm run format` | Format project files with Prettier |

## Demo flows

1. Choose **Student** on the landing screen and continue to view the student dashboard.
2. Explore **My matches**, open a role, apply, and view the application tracker.
3. Open **Skill profile** and complete the assessment flow.
4. Use the logout icon in the sidebar to return to the role selector.
5. Choose **Industry** to explore ranked candidates and the posting creation form.

## GitHub upload

From this project directory:

```bash
git init
git add .
git commit -m "feat: add Setu frontend MVP"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

If Git is already initialized, skip `git init`. Replace the remote URL with the URL of your GitHub repository.

Do not commit `.env` files, API keys, passwords, `node_modules/`, or `dist/`. These are excluded by `.gitignore`.

## Deploying the frontend

This is a standard Vite SPA and can be deployed to Vercel, Netlify, Render static sites, or GitHub Pages.

Recommended settings:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

For client-side routing, configure the host to serve `index.html` as a fallback for unknown routes. The current demo uses a single-page shell, so no extra rewrite is required yet.

## Project structure

```text
client/
  index.html
  src/
    components/       Reusable UI primitives
    contexts/          Theme context
    hooks/             Reusable React hooks
    lib/               Shared utilities
    pages/Home.tsx     Setu frontend experience
    App.tsx            App shell
    index.css          Global styles and design tokens
vite.config.ts        Portable Vite configuration
package.json          Frontend scripts and dependencies
```

## Backend integration notes

The current frontend uses seeded objects and local React state. When the backend is available, connect these areas to API endpoints:

- Authentication and role profiles
- Student assessment responses and skill profile persistence
- Internship postings and required skill weights
- Weighted match scores and coverage explanations
- Applications and status changes
- Candidate shortlist and interview actions
