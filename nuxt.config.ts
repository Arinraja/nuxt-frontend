
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
