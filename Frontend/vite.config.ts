import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  plugins: [react(), tsconfigPaths(), WindiCSS(),],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  },
  resolve: {
    alias: [
    {
      find: './runtimeConfig',
      replacement: './runtimeConfig.browser',
    },
  ]
}

})
