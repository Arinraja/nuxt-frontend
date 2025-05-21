// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//  // compatibilityDate: '2024-11-01',
//  // devtools: { enabled: true }
//  css: ['~/assets/css/main.css'],

//  postcss: {
//    plugins: {
//       tailwindcss: {},
//       autoprefixer: {},
//    },
//  },

//  // compatibilityDate: '2024-12-22',
//  modules: [
//    '@pinia/nuxt',
//  ],

//  compatibilityDate: '2024-12-23',
// })

export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.VITE_API_URL
    }
  },

  compatibilityDate: '2024-12-23',
})
