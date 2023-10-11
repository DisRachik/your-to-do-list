import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/your-to-do-list/',
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
    },
  },
});
