import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// https://stackoverflow.com/questions/72043141/vue-2-vite-app-failed-to-parse-source-for-import-analysis
// extensions help figure out specific vite errors
export default defineConfig({
  plugins: [vue()],
  resolve: {
      extensions: [
        ".mjs",
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
        ".vue",
        ".scss",
      ],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
