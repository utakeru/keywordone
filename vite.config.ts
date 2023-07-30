import { crx, defineManifest } from "@crxjs/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const manifest = defineManifest({
  manifest_version: 3,
  name: "keywordone",
  version: "1.0.0",
  permissions: [],
  action: {
    default_popup: "index.html",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      //matches: ["https://*.cybozu.com/k/*", "https://*.cybozu.cn/k/*", "https://*.kintone.com/k/*"],
      js: ["src/content/main.ts"]
    }
  ]
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
})

