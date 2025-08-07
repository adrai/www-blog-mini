import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import vikeCloudflare from 'vike-cloudflare/config'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      // Fix the JSX configuration
      jsxImportSource: 'react',
      providerImportSource: '@mdx-js/react'
    }),
    react(),
    tailwindcss(),
    vikeCloudflare
  ],
  build: {
    target: 'es2022'
  }
})
