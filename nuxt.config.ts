export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: "Test",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Test!",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/svg", href: "/favicon.svg" }],
    },
    baseURL: "/nuxt3-test/",
  },
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
