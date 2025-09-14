# Khởi động nhanh

Trong quá trình xây dựng toàn bộ framework, đều sử dụng phát triển theo dạng plugin, có thể xem [giới thiệu framework](/guide/install#架构图) để xem sơ đồ kiến trúc

```javascript
import install from "vue-bag-admin";
const { app } = install();

app.mount("#app");
```

```bash
npm run dev
```

## Cài đặt router

```bash
pnpm add vue-router -S
```

## Đăng ký plugin router

```javascript
import { createWebHashHistory } from "vue-router";
import install from "vue-bag-admin";
const { app, framework, plugins } = install();

framework.use(plugins.useRouterPlugin);
app.mount("#app");
```

## Tham số nâng cao

#### routes

```javascript
import { createWebHashHistory } from "vue-router";
import install from "vue-bag-admin";
const { app, framework, plugins } = install();

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/app/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/app/views/about/index.vue"),
  },
];
framework.use(plugins.useRouterPlugin, {
  routes, // Thêm router sẽ tự động ghi đè router mặc định của framework
});
app.mount("#app");
```

#### files

```javascript
import { createWebHashHistory } from "vue-router";
import install from "vue-bag-admin";
const { app, framework, plugins } = install();

const files = import.meta.glob(`@/app/views/*/*.vue`, { eager: true }); // Lấy tất cả địa chỉ router file, kết hợp với plugin API để sử dụng router động
framework.use(plugins.useRouterPlugin, {
  files,
});
framework.use(plugins.useApisPlugin, ["/menus"]);
app.mount("#app");
```

#### router

```javascript
import { createRouter, createWebHashHistory } from "vue-router";
import install from "vue-bag-admin";
const { app, framework, plugins } = install();

const files = import.meta.glob(`@/app/views/*/*.vue`, { eager: true }); // Lấy tất cả địa chỉ router file, kết hợp với plugin API để sử dụng router động

// Truyền instance đã tạo
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/index.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/app/views/home/index.vue"),
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/app/views/about/index.vue"),
    },
  ],
});

framework.use(plugins.useRouterPlugin, {
  files,
  router,
});

framework.use(plugins.useApisPlugin, ["/menus"]);
app.mount("#app");
```
