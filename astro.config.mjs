import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://darion.ai",
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "always",
  },
  compressHTML: true,
});
