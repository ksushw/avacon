import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }: any) => {

  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [
      vue(),
    ],
    server: {
      port: +env?.VITE_PORT || 3000,
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}
