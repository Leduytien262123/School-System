# Cài đặt

```bash
pnpm add vue-router -S
```

## Plugin Router

`useRouterPlugin` cung cấp mã nguồn plugin router mặc định cho framework

```javascript
import { createRouter, createWebHistory } from "vue-router";
import { defaultBuiltRouter } from "@/packages/router/routes.js";

export class RouterPlugin {
  constructor() {
    this.name = "RouterPlugin";
  }

  install({ ctx }, options = {}) {
    const { router, ...args } = options;
    ctx.router =
      router ||
      createRouter({
        // Nếu có router, sử dụng router, nếu không sử dụng router mặc định
        history: createWebHistory(options.base || "/"), // Mặc định sử dụng chế độ History
        routes: ctx.helpers.deepMergeArrays(
          defaultBuiltRouter,
          options.routes || []
        ), // Hợp nhất router mặc định và router do người dùng cấu hình
        ...args, // Các tham số khác có thể ghi đè cấu hình mặc định
      });
    ctx.app.use(ctx.router);
  }
}

export const useRouterPlugin = new RouterPlugin();
```

## Sử dụng chế độ Hash

Cách sử dụng giống như [Vue-Router](https://router.vuejs.org/zh/guide/)

```javascript
import { createRouter, createWebHashHistory } from "vue-router";
import install from "vue-bag-admin";
const { app, framework, plugins } = install();

const files = import.meta.glob(`@/app/views/*/*.vue`, { eager: true });
framework.use(plugins.useRouterPlugin, {
  files,
  history: createWebHashHistory(),
  routes: [], // Tùy chỉnh router
});
app.mount("#app");
```

## Truyền đối tượng Router

```javascript
import install from "vue-bag-admin";
const { app, framework, plugins } = install();
import { createRouter, createWebHashHistory } from "vue-router";

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
      {
        path: "/about",
        name: "about",
        component: () => import("@/app/views/about/index.vue"),
      },
    ],
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/app/views/home/index.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const files = import.meta.glob(`@/app/views/*/*.vue`, { eager: true });
framework.use(plugins.useRouterPlugin, {
  files,
  router,
});
app.mount("#app");
```

## Đối tượng File

> Bằng cách truyền đối tượng `files`, framework có thể tìm thấy các tệp bên ngoài, tạo router tương ứng theo quy tắc tệp, thường được sử dụng kết hợp với menu

```javascript
import install from "vue-bag-admin";
const { app, framework, plugins } = install();

const files = import.meta.glob(`@/app/views/*/*.vue`, { eager: true });
framework.use(plugins.useRouterPlugin, {
  files,
});
app.mount("#app");
```

## handleMenus

Lấy dữ liệu menu, có thể lấy dữ liệu menu thông qua API hoặc truyền một mảng để lấy dữ liệu menu

Hàm này có thể là một hàm trả về một Promise hoặc một mảng

```javascript
import install from "vue-bag-admin";
const { app, framework, plugins } = install();

framework.use(plugins.useRouterPlugin, {
  files,
  handleMenus: ({ ctx }) => {
    // Sử dụng plugin API để lấy dữ liệu
    return ctx.apis.Menus.httpGet({ "pagination[limit]": "-1" }); // Lấy dữ liệu menu từ API
  },
});

framework.use(plugins.useRouterPlugin, {
  files,
  handleMenus: () => [
    {
      id: 1,
      title: "Trang chủ",
      localesKey: "home",
      file: "/src/app/views/home/index.vue",
      path: "/home",
      name: "home",
      icon: "BookOutline",
      hasClose: false,
      sort: 100,
      hasMenu: false,
      hasRouter: false,
      overlayRouting: false,
      children: [],
    },
    {
      id: 2,
      title: "Quản lý người dùng",
      localesKey: "userManagement",
      file: "/src/app/views/user/index.vue",
      path: "/user",
      name: "user",
      icon: "BookOutline",
      hasClose: true,
      hasMenu: false,
      hasRouter: false,
      overlayRouting: false,
      children: [],
    },
  ],
});
app.mount("#app");
```

## handleGroups

Phân loại ứng dụng framework để lấy dữ liệu menu, có thể lấy dữ liệu menu thông qua API hoặc truyền một mảng để lấy dữ liệu menu

```javascript
framework.use(plugins.useRouterPlugin, {
  files,
  handleGroups: ({ ctx }) => {
    // Cách sử dụng giống như trên
  },
});
```

## Mô tả ví dụ

```javascript
// main.js
import install from "vue-bag-admin";
const files = import.meta.glob("@/app/web/views/**/*.vue", { eager: true });
const { app, framework, plugins } = install();
framework.use(plugins.useRouterPlugin, {
  files,
  handleMenus: () => [
    {
      id: 1,
      title: "Đăng nhập",
      localesKey: "home",
      file: "/src/app/web/views/login/index.vue", // Ghi đè trang đăng nhập
      path: "/login",
      name: "login",
      icon: "BookOutline",
      hasClose: false,
      sort: 100,
      hasMenu: true,
      overlayRouting: true,
      root: "/",
      hasTab: true,
    },
    {
      id: 2,
      title: "Đăng nhập",
      localesKey: "home",
      file: "/src/app/web/views/home/index.vue", // Ghi đè trang đăng nhập
      path: "/home",
      name: "home",
      icon: "BookOutline",
      hasClose: false,
      sort: 100,
      hasMenu: true,
      overlayRouting: true,
      root: "/",
      hasTab: true,
    },
  ],
});
app.mount("#app");
```

## Mô tả tham số plugin

| Thuộc tính   |     Loại      |                       Mô tả                       |
| ------------ | :-----------: | :-----------------------------------------------: |
| files        |    Object     |         Lấy thông qua `import.meta.glob`          |
| errorRoute   |    Object     |                     Trang lỗi                     |
| handleMenus  | Array/Promise | Trả về mảng menu, hoặc một Promise (dành cho API) |
| handleGroups | Array/Promise | Trả về nhóm menu, hoặc một Promise (dành cho API) |
| base         |    String     |           Tham số vue-router giữ nguyên           |
| ...          |      ...      | Các thuộc tính khác giữ nguyên tham số vue-router |

## Mô tả thuộc tính menu

| Thuộc tính     |  Loại   |               Mô tả               |
| -------------- | :-----: | :-------------------------------: |
| id             | number  |              ID menu              |
| title          | string  |             Tên menu              |
| localesKey     | string  |   Key quốc tế hóa của tên menu    |
| file           | string  | Đường dẫn tệp tương ứng với menu  |
| path           | string  |   Đường dẫn tương ứng với menu    |
| name           | string  |   Tên router tương ứng với menu   |
| icon           | string  |   Biểu tượng tương ứng với menu   |
| hasClose       | boolean |       Có nút đóng hay không       |
| sort           | number  |           Sắp xếp menu            |
| hasMenu        | boolean |         Có menu hay không         |
| hasRouter      | boolean |        Có router hay không        |
| hasTab         | boolean |         Có tab hay không          |
| root           | string  | Bố cục router, mặc định là layout |
| keepAlive      | boolean |    Có lưu trữ router hay không    |
| overlayRouting | boolean |    Có ghi đè router hay không     |
| children       |  array  |         Dữ liệu menu con          |
| extra          | stirng  |              Góc nhỏ              |
