import { defineConfig } from 'cypress'

export default defineConfig({
  // projectId: 'circus',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://127.0.0.1:5173/'
  }
})
