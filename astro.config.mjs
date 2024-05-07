import { defineConfig } from 'astro/config';
import partytown from "@astrojs/partytown";

import vue from "@astrojs/vue";

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
  ]
});
