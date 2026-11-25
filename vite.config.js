import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';import {viteSingleFile} from 'vite-plugin-singlefile';
// Static build: one self-contained dist/index.html (works by double-click or any static host).
export default defineConfig({base:'./',plugins:[react(),viteSingleFile()]});
