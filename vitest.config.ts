import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      thresholds: {
        statements: 30,
        branches: 30,
        functions: 10,
        lines: 30,
      },
      exclude: [
        'node_modules/**',
        'src/__tests__/**',
        'scripts/**',
        'backend/**',
        'dist/**',
        'coverage/**',
        '*.config.*',
        'src/main.tsx',
      ],
    },
  },
});
