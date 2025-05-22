// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.VITE_API_URL || 'http://localhost:8000',
    },
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [],
      ignore: ['/'],
    },
  },

  modules: ['@pinia/nuxt'],

  compatibilityDate: '2024-12-23',
})
