import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed as a GitHub Pages *project* page under the org's user page
// (kurdish-tech.github.io/kurdle/), not at the domain root — base must
// match that subpath or built asset URLs will 404.
export default defineConfig({
  plugins: [react()],
  base: '/kurdle/',
});
