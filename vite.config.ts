import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import tailwindcss from 'tailwindcss';
import { name } from './package.json';

/**
 * Removes everything before the last
 * @octocat/library-repo -> library-repo
 * vite-component-library-template -> vite-component-library-template
 */
const formattedName = name.match(/[^/]+$/)?.[0] ?? name;

export default defineConfig({
  plugins: [react(), dts({ include: ['lib'] })],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      name: formattedName,
      formats: ['es', 'umd'],
      fileName: (format) => `${formattedName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom', 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'react/jsx-runtime',
          'react-dom': 'ReactDOM',
          tailwindcss: 'tailwindcss',
        },
      },
    },
  },
});
