import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/disco-elysium-24-skills-test/',
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
})
