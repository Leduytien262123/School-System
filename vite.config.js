import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"; // css 整 hợp js
import { analyzer } from "vite-bundle-analyzer"; // Phân tích sự phụ thuộc và kích thước gói (bundle)
import VueDevTools from "vite-plugin-vue-devtools"; // Bảng điều khiển gỡ lỗi
import history from "connect-history-api-fallback";
function historyPlugin() {
  return {
    name: "vite-plugin-history",
    configureServer(server) {
      server.middlewares.use(
        history({
          rewrites: [
            { from: /\/admin/, to: "/admin.html" }, // Giải quyết vấn đề 404 khi làm mới trang trong chế độ lịch sử
          ],
          htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
        })
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const config = {
    // cấu hình vite
    plugins: [
      vue(),
      AutoImport({
        imports: [
          "vue",
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
      VueDevTools(),
      historyPlugin(),
    ],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "lib",
      rollupOptions: {},
    },
    server: {
      // hmr: false,
      host: "0.0.0.0",
      port: 8000,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        "/api": {
          target: "https://vite.itnavs.com/api",
          changeOrigin: true,
          rewrite: (url) => url.replace(/^\/api/, ""),
        },
      },
    },
  };
  if (mode === "lib") {
    config.build.lib = {
      entry: path.resolve(__dirname, "src/packages/install.js"),
      name: "vue-bag-admin",
      formats: ["es", "cjs"],
      fileName: (format) => `vue-bag-admin.${format}.js`, // Tên tệp sau khi đóng gói
    };
    config.build.rollupOptions = {
      output: {
        manualChunks: () => {
          return "vendor";
        },
      },
      // Đặt chế độ thư viện
      external: ["vue", "naive-ui"], // Cấu hình này rất quan trọng, nếu không sẽ dẫn đến việc không thể sử dụng các thành phần chung
    };
    config.build.minify = "terser";
    config.build.terserOptions = {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    };
    config.plugins.push(cssInjectedByJsPlugin());
    // config.plugins.push(analyzer())
  } else {
    config.build.outDir = "dist";
    config.build.rollupOptions.input = {
      main: path.resolve(__dirname, "index.html"),
      admin: path.resolve(__dirname, "admin.html"),
    };
  }
  return config;
});
