// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 // compatibilityDate: '2024-11-01',
 // devtools: { enabled: true }
  runtimeConfig: {
    public: {
      apiBase: 'https://django-backend-f9hr.onrender.com',
    },
  },
 css: ['~/assets/css/main.css'],

 postcss: {
   plugins: {
      tailwindcss: {},
      autoprefixer: {},
   },
 },

 // compatibilityDate: '2024-12-22',
 modules: [
   '@pinia/nuxt',
 ],

 compatibilityDate: '2024-12-23',
})
