// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from "@astrojs/node";
import clerk from "@clerk/astro";
import { dark } from '@clerk/themes';
import { esES } from '@clerk/localizations';
import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [clerk({
    localization: esES,
    appearance: {
      baseTheme: dark,
    },
  }), react()],
});