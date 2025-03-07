import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const routerPlugin = TanStackRouterVite({
  autoCodeSplitting: true,
  routesDirectory: 'src/app/routes'
});

export default defineConfig({
  plugins: [react(), routerPlugin],
  resolve: {
    alias: {
      $: '/src'
    }
  },
  build: {
    outDir: 'public'
  },
  publicDir: 'assets'
});
