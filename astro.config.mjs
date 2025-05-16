// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from "@astrojs/node";
import clerk from "@clerk/astro";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true, // reload for wsl2
      },
    },
  },
  adapter: node({ mode: "standalone" }),
  output: "server",
  integrations: [clerk()],
});