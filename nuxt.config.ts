import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // alias: {
  //   "@": resolve(__dirname, "/")
  // },
  // routeRules: {
  //   "/": { redirect: "/" },
  // },
  css: ["~/assets/sass/main.scss"],
  modules: [
    "@nuxt/content",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@element-plus/nuxt"
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  devtools: {
    enabled: true
  },
})
