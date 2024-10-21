export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      NAGER_API_URL: process.env.NAGER_API_URL,
    },
  },
  app: {
    baseURL:
      process.env.NODE_ENV === "production" ? "/<develops-today/>/" : "/",
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
