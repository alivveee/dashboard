import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default {
  root: resolve(__dirname, 'src'),
  plugins: [react()],
  build: {
    outDir: '../dist'
  },
  server: {
    port: 8082
  },
  // Optional: Silence Sass deprecation warnings. See note below.
  css: {
     preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'import',
            'mixed-decls',
            'color-functions',
            'global-builtin',
            'if-function',
          ],
        },
     },
  },
}