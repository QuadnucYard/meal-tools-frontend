import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";
import { URL, fileURLToPath } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import { QuasarResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { ConfigEnv, defineConfig, loadEnv } from "vite";
import circleDependency from "vite-plugin-circular-dependency";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) =>
  defineConfig({
    base: loadEnv(mode, process.cwd()).VITE_BASE_PATH,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".js", ".json", ".ts"],
    },
    css: {
      preprocessorOptions: {
        scss: { additionalData: "" },
      },
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    plugins: [
      viteCompression(),
      vue({ template: { transformAssetUrls }, script: { defineModel: true } }),
      quasar({
        // sassVariables: 'src/quasar-variables.sass'
      }),

      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "vue-router", "pinia", "quasar"],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          // Auto import icon components
          // 自动导入图标组件
          // IconsResolver({ prefix: "Icon" }),
        ],

        dts: "src/auto-imports.d.ts",
        eslintrc: { enabled: true },
      }),

      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ["vue", "md"],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [QuasarResolver()],
        dts: "src/components.d.ts",
      }),

      circleDependency({}),

      // Icons({ autoInstall: true }),

      //Inspect(),
    ],
    server: {
      // host: "0.0.0.0",
      // port: 3000,
      proxy: {
        "/api": {
          target: loadEnv(mode, process.cwd()).VITE_APP_BASE_API,
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, ""),
        },
        "/static": {
          target: loadEnv(mode, process.cwd()).VITE_APP_BASE_API,
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const a = id.toString().split("node_modules/");
              return a.at(-1)?.split("/")[0];
            } else if (id.includes("/")) {
              return "index";
            }
          },
        },
      },
    },
  });
