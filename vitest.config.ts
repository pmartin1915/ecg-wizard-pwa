// Test-only config. Vitest prefers vitest.config.ts over vite.config.ts, so
// tests skip the app pipeline's heavy plugins (VitePWA, babel-plugin-styled-
// components, css processing) that pushed collect time to ~190s — long enough
// to blow the dev-ops health-check runner's 300s timeout under concurrency.
// Build/dev still use vite.config.ts unchanged.
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // forks pool: prevents the jsdom hang in CI/VM (see 24e783c)
    pool: 'forks',
    setupFiles: './src/setupTests.ts',
    css: false,
  },
});
