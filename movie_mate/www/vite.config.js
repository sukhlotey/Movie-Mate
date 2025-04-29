import { defineConfig } from 'vite';
  import tailwindcss from '@tailwindcss/vite';

  export default defineConfig({
    plugins: [tailwindcss()],
    build: {
      outDir: 'dist',
      assetsDir: '',
      rollupOptions: {
        input: './style.css',
        output: {
          entryFileNames: 'output.css',
        },
      },
    },
  });
