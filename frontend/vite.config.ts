import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import fs from 'fs';

import {VitePWA} from 'vite-plugin-pwa';


const manifestForPlugIn = {
  registerType:'prompt',
  // includeAssests:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest:{
    name:"RecPix",
    short_name:"RecPix",
    description:"I am a simple vite app",
    icons:[
      {
        "src": "icons/manifest-icon-192.maskable.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "icons/manifest-icon-192.maskable.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "icons/manifest-icon-512.maskable.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "icons/manifest-icon-512.maskable.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      }
    ],
  theme_color:'#171717',
  background_color:'#ffffff',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait',
  prefer_related_applications:false
  }
}
export default defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugIn)
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, '../cert/192.168.43.80-key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, '../cert/192.168.43.80.pem'))
    // }
  },
});

// export default {
//   plugins: [
//     VitePWA({
//       registerType: 'auto',
//       manifest: {
//         name: 'My App',
//         short_name: 'App',
//         description: 'Your app description',
//         theme_color: '#ffffff',
//         icons: [
//           {
//             src: '/icon.png',
//             sizes: '192x192',
//             type: 'image/png',
//           },
//         ],
//       },
//     }),
//   ],
// };