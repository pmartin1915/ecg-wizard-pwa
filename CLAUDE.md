# ECG Wizard PWA — CLAUDE.md

## Overview

Professional ECG Classification System — Progressive Web App for clinical ECG interpretation education. Built with React + TypeScript + Vite. Uses real 500Hz clinical data from verified medical datasets for cardiac condition analysis.

## Commands

```bash
npm run dev          # Start Vite dev server
npm test             # Run unit tests (vitest run)
npm run test:watch   # Vitest in watch mode
npm run build        # TypeScript check + Vite build
npm run preview      # Preview production build
```

## Architecture

```
src/
├── components/      # React UI components
├── hooks/           # Custom React hooks
├── pages/           # Route pages
├── styles/          # CSS/styling
├── App.tsx          # Root component
├── App.test.tsx     # Root component tests
└── serviceWorkerRegistration.ts  # PWA service worker
```

## Constraints

- Educational/clinical tool — include appropriate medical disclaimers
- TypeScript strict mode
- PWA-capable: service worker registration, offline support
- Recently upgraded to Vite 7, Vitest 3, React 19

## Opus → Sonnet Delegation

Delegate via Task(model: "sonnet") for:
- Codebase exploration, test runs, lint fixes
- Component scaffolding, documentation updates

Keep for yourself:
- Clinical data accuracy review
- Architecture decisions
- ECG algorithm validation
