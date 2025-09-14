# Plugin Vite

## Plugin gỡ lỗi

```bash
pnpm install vite-plugin-vue-devtools -D
```

```javascript
import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  plugins: [VueDevTools(), vue()],
});
```

## Plugin phân tích đóng gói

```bash
pnpm install vite-bundle-analyzer -D
```

```javascript
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";

export default defineConfig({
  plugins: [vue(), analyzer()],
});
```
