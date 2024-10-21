export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      NAGER_API_URL: process.env.NAGER_API_URL,
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  alias: {
    vue: "vue/dist/vue.esm-bundler.js",
  },
});
