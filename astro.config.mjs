import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import vue from "@astrojs/vue";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    react(),
  ],
  output: "server",
  adapter: vercel({
    isr: {
      // caches all pages on first request and saves for 12 hours
      expiration: 60 * 60 * 12,
    },
  }),
});
