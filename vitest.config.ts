import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/shared/lib/test-setup.ts',
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@jyp/shared-contracts': path.resolve(
        __dirname,
        './node_modules/@jyp/shared-contracts/src/auth/auth.schema.ts',
      ),
      zod: path.resolve(__dirname, './node_modules/zod'),
    },
    // Filtro estricto: Solo ejecutar archivos bajo __tests__ o con sufijo .test/.spec
    include: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
  },
});
