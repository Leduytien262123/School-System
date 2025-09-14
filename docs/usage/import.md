# Tự động import

```bash
pnpm i unplugin-auto-import -D
```

## vite.config.js

```javascript
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        // Các plugin cần tự động import, tự định nghĩa API import
        "vue",
        "vue-router",
        "pinia",
      ],
    }),
  ],
});
```

## Sử dụng

Không cần phải import thủ công các API liên quan

```vue
<script setup lang="ts">
const count = ref(0);
const router = useRouter();
router.push("/dashboard");
</script>
```
