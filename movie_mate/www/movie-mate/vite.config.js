import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [IconsResolver()],
    }),
    Icons({
      compiler: 'vue3',
    }),
  ],
 define:{
 'highlight.js/lib/core': '{}'
},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'highlight.js/lib/core': 'highlight.js/es/core' // 👈 IMPORTANT
    }
  },
  optimizeDeps: {
    include: ["frappe-ui > feather-icons", "showdown", "engine.io-client"],
  },
})
