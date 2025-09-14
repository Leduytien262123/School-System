# Plugin Ngôn ngữ

Plugin này dùng để chuyển đổi ngôn ngữ giao diện, hỗ trợ đa ngôn ngữ cho ứng dụng của bạn.

```javascript
import { createI18n, useI18n } from "vue-i18n";
import zh from "./locales/zh.js";
import en from "./locales/en.js";

const locales = { zh, en };

const setupI18n = (ctx, options) => {
  const i18n = createI18n({
    legacy: false,
    locale: ctx.pina.state.value?.global?.configs?.language, // Lấy ngôn ngữ hiện tại từ pinia
    fallbackLocale: "en",
    messages: ctx.helpers.deepMergeObject(locales, options?.messages), // Gộp dữ liệu truyền vào
    globalInjection: true, // Có thể sử dụng $t trong template
    ...options,
  });
  ctx.i18n = i18n;
  ctx.i18n.useI18n = useI18n;
  ctx.app.use(i18n);
};

export default setupI18n;
```

## Sử dụng

```javascript
import install from "vue-bag-admin";
const { app, framework, plugins } = install();
framework.use(plugins.useLanguagePlugin, {
  zh: {
    title: "Ông Dê", // Ghi đè ngôn ngữ mặc định
  },
  en: {
    title: "Mr. Sheep", // Ghi đè ngôn ngữ mặc định
  },
  ko: {
    // Thêm ngôn ngữ mới
  },
});
app.mount("#app");
```
