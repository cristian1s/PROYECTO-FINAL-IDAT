import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': `http://localhost:5000`,
  //   }
  // }
  // build: {
  //   outDir: 'dist',
  // },
  // server: {
  //   port: 3000,
  // },
})
