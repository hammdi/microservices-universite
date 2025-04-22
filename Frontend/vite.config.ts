import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/keycloak': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/keycloak/, ''),
      },
      '/students': {
        target: 'http://localhost:8099', // API Gateway
        changeOrigin: true,
      },
      '/api/teachers': {
        target: 'http://localhost:8099', // API Gateway
        changeOrigin: true,
      },
      '/cours': {
        target: 'http://localhost:8099', // API Gateway
        changeOrigin: true,
      },
      '/api/payments': {
        target: 'http://localhost:8099', // Service de paiement
        changeOrigin: true,
      },

      '/examens': {
        target: 'http://localhost:8099', // Service de paiement
        changeOrigin: true,
      },

      '/departement': {
        target: 'http://localhost:8099', // Service de paiement
        changeOrigin: true,
      },

    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
