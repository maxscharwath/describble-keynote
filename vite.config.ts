import { defineConfig } from 'vite'
import {fileURLToPath, URL} from 'url';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [wasm(), topLevelAwait()],
  resolve: {
    alias: [{find: '@describble/ddnet/src', replacement: fileURLToPath(new URL('./node_modules/@describble/ddnet/src', import.meta.url))}]
  }
})
