import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//
// https://vitejs.dev/config/
export default defineConfig({
  server:{
   
    proxy:{
      
      '/api': 'https://url-shortner-backend-zeta.vercel.app' 
      
    },
  },
  plugins: [react()],
})
  