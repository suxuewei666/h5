import { defineConfig } from "vite";
import { resolve } from "path";
import { VantResolver } from "@vant/auto-import-resolver";
import { buildEnv, buildEnvPath, external } from "./vitePlugins";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue";
import viteComperssion from "vite-plugin-compression";
import postcssPxtoRem from "postcss-pxtorem";
const pathSrc = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: false,
    port: 8080,
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "@": pathSrc
    }
  },
  build: {
    rollupOptions: {
      external
    }
  },
  css: {
    postcss: {
      plugins: [
        postcssPxtoRem({
          rootValue: 100,
          selectorBlackList: [".van"], // 忽略转换正则匹配项
          propList: ["*"],
          exclude: "/node_modules" // 忽略包文件转换rem
        })
        // 行内样式或者js赋值的px这个插件不会转rem，这个时候需要在赋值的时候(/设计图宽度/10)+'rem'
        //<div :style="{width: 1000 / 192 + 'rem', height: 500 / 192 + 'rem'}"></div>
      ]
    }
  },
  plugins: [
    buildEnv(),
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      dts: resolve(pathSrc, "auto-imports.d.ts"),
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true
      }
    }),

    Components({
      resolvers: [VantResolver()],
      dts: resolve(pathSrc, "components.d.ts")
    }),
    buildEnvPath(),
    viteComperssion({
      algorithm: "gzip"
    })
  ]
});
