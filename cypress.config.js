import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://ebac-agenda-contatos-tan.vercel.app',
    supportFile: false
  }
})
