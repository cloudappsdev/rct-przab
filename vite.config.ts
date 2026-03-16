import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@models': path.resolve(__dirname, 'src/generated/prisma/models'),
      '@prisma-client': path.resolve(__dirname, 'src/generated/prisma/client'),
    },
  },
})
