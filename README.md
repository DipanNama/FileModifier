# Stillroom

A local-first reflection workspace built from this repository's unfinished Random Quotes React/TypeScript prototype. The repository name is historical; this is not a file modification utility.

## Features
- 12 original prompts across Focus, Work, Rest and Perspective, each with a reflection question. These are collection text, not quotations attributed to real people.
- Search and topic filters, non-repeating shuffle when more than one result exists.
- Saved collection on this device, copy, plain-text export and persistent light/dark theme.
- Responsive layout, keyboard focus, reduced-motion support and empty states.

Saved items use localStorage, not an account. Clearing browser data removes them. No cross-device sync. When storage is blocked, saved items last only for the current session. Export before clearing data. This is a static app, not a wellness service or personalized advice.

## Development
Node 24 is used in CI. `npm ci`, `npm test`, `npm run lint`, `npm run build`. `npm run dev` serves the app at `/FileModifier/`.

`npm test` covers filtering, saved-data validation, shuffle boundaries and plain-text export. Production dependencies pass `npm audit --omit=dev` at release time. The legacy Tailwind 3 development toolchain still has transitive audit advisories (including brace-pattern parsing); it processes repository-controlled build inputs only. Do not expose the development server publicly or feed untrusted configurations/patterns to it. The public site serves built static assets, not these build tools.

## Deployment
GitHub Pages via Actions, only on pushes to main. Work is done on a typed branch; tests/build and desktop/mobile checks run locally before one PR/squash merge. No preview or branch deployments. Workflow uses a main-only `github-pages` environment.

## Historical extension
The original manifest/background prototype remains in the repository for history, but is not loaded or built by this web release. It is incomplete, has unresolved paths, and is not an installable browser extension. The website does not request host permissions or inject scripts into websites.

## UI sources
Existing shadcn/ui Button (Radix Slot) and Lucide icons. Component discovery: https://shoogle.dev/ and https://ui.shadcn.com/docs/components/button. No icon or image assets drawn for this app.
