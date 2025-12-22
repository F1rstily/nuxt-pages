export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["@/styles/main.css"],
  modules: ['@nuxt/ui', '@nuxt/icon'],
  ui: {
    fonts: false,
    // icons: ['lucide']
  },

  icon: {
    serverBundle: {
      collections: ['lucide']
    }
  }
})
