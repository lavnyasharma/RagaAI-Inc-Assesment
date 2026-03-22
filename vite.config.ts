import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inject-sw-env',
        // Handle dev mode
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/firebase-messaging-sw.js') {
              const fs = await import('fs');
              const path = await import('path');
              const swPath = path.resolve(process.cwd(), 'public/firebase-messaging-sw.js');
              let content = fs.readFileSync(swPath, 'utf-8');
              
              content = content
                .replace(/VITE_FIREBASE_API_KEY_PLACEHOLDER/g, `"${env.VITE_FIREBASE_API_KEY}"`)
                .replace(/VITE_FIREBASE_AUTH_DOMAIN_PLACEHOLDER/g, `"${env.VITE_FIREBASE_AUTH_DOMAIN}"`)
                .replace(/VITE_FIREBASE_PROJECT_ID_PLACEHOLDER/g, `"${env.VITE_FIREBASE_PROJECT_ID}"`)
                .replace(/VITE_FIREBASE_STORAGE_BUCKET_PLACEHOLDER/g, `"${env.VITE_FIREBASE_STORAGE_BUCKET}"`)
                .replace(/VITE_FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER/g, `"${env.VITE_FIREBASE_MESSAGING_SENDER_ID}"`)
                .replace(/VITE_FIREBASE_APP_ID_PLACEHOLDER/g, `"${env.VITE_FIREBASE_APP_ID}"`)
                .replace(/VITE_FIREBASE_MEASUREMENT_ID_PLACEHOLDER/g, `"${env.VITE_FIREBASE_MEASUREMENT_ID}"`);
                
              res.setHeader('Content-Type', 'application/javascript');
              res.end(content);
              return;
            }
            next();
          });
        },
        // Handle build mode
        async closeBundle() {
          const fs = await import('fs');
          const path = await import('path');
          const distSwPath = path.resolve(process.cwd(), 'dist/firebase-messaging-sw.js');
          if (fs.existsSync(distSwPath)) {
            let content = fs.readFileSync(distSwPath, 'utf-8');
            content = content
                .replace(/VITE_FIREBASE_API_KEY_PLACEHOLDER/g, `"${env.VITE_FIREBASE_API_KEY}"`)
                .replace(/VITE_FIREBASE_AUTH_DOMAIN_PLACEHOLDER/g, `"${env.VITE_FIREBASE_AUTH_DOMAIN}"`)
                .replace(/VITE_FIREBASE_PROJECT_ID_PLACEHOLDER/g, `"${env.VITE_FIREBASE_PROJECT_ID}"`)
                .replace(/VITE_FIREBASE_STORAGE_BUCKET_PLACEHOLDER/g, `"${env.VITE_FIREBASE_STORAGE_BUCKET}"`)
                .replace(/VITE_FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER/g, `"${env.VITE_FIREBASE_MESSAGING_SENDER_ID}"`)
                .replace(/VITE_FIREBASE_APP_ID_PLACEHOLDER/g, `"${env.VITE_FIREBASE_APP_ID}"`)
                .replace(/VITE_FIREBASE_MEASUREMENT_ID_PLACEHOLDER/g, `"${env.VITE_FIREBASE_MEASUREMENT_ID}"`);
            fs.writeFileSync(distSwPath, content);
          }
        }
      }
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
})
