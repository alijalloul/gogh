import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  srcDir: "src/",
  alias: { "@": "/" },
  css: ["~/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:5000",
    },
  },

  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  compatibilityDate: "2024-12-30",
});
