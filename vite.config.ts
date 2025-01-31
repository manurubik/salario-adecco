import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), mkcert()],
  base: '/salario-adecco',
  server: {
    open: true,
    host: true,
    https: true,
  },
});
