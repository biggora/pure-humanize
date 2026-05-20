import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/timeAgo.ts',
    'src/bytes.ts',
    'src/number.ts',
    'src/currency.ts',
    'src/list.ts',
    'src/plural.ts',
    'src/ordinal.ts',
    'src/truncate.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  clean: true,
  treeshake: true,
  outDir: 'dist',
});
