// https://nuxt.com/docs/api/configuration/nuxt-config
import { config } from 'dotenv'
config();
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['pinia-plugin-persistedstate/nuxt', '@pinia/nuxt', '@nuxtjs/tailwindcss'],
  plugins: [
    '~/plugins/pinia.js'
  ],
  tailwindcss: {
    viewer: false
  },
  runtimeConfig: {
    public: {
      backendUrl: process.env.BACKEND_URL
    }
  }
})