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
  ssr: true,  // ✅ Server-side rendering enabled
  nitro: {
    preset: 'node-server'  // ✅ For Render
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt'],
  compatibilityDate: '2024-12-23',
})
