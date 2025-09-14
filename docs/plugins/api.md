# Plugin API

Bên trong framework sử dụng [alova.js](https://alova.js.org/zh-CN/tutorial/getting-started/introduce) làm công cụ gửi request cơ bản. alova cung cấp các khả năng gửi request cơ bản tương tự axios, bạn có thể kết hợp với axios, fetch hoặc bất kỳ thư viện gửi request nào để tận dụng các tính năng như cache phản hồi, chia sẻ request, v.v.

```javascript
export class ApisPlugin {
  constructor() {
    this.name = "ApisPlugin";
  }

  install({ ctx }, options = []) {
    ctx.apis = { ...ctx.http };
    options.forEach((item) => {
      const api = (ctx.apis[
        item.replace(/\/(\w)/g, (_, c) => (c ? c.toUpperCase() : ""))
      ] = { url: item }); // Chuyển sang quy tắc camelCase
      api.httpGet = (params, config) =>
        ctx.http.httpGet(api.url, params, config);
      api.httpPost = (params, config) =>
        ctx.http.httpPost(api.url, params, config);
    });
    if (typeof window === "object") {
      if (!window.$apis) {
        window.$apis = ctx.apis;
      }
    }
  }
}

export const useApisPlugin = new ApisPlugin();
```

## Đăng ký plugin

```javascript
import install from "vue-bag-admin";
const { app, framework, plugins } = install();

const apis = ["/auth/local/register", "/auth/local", "/menus", "secretkey"];
framework.use(plugins.useApisPlugin, apis);
app.mount("#app");
```

## Sử dụng

#### $global thuộc tính mẫu toàn cục được tích hợp sẵn trong framework

```vue
<template>
  <div>
    <!--   $global biến toàn cục được tích hợp sẵn trong framework     -->
    <n-button @click="handleClick($global)">Gửi yêu cầu</n-button>
  </div>
</template>
<script setup>
const form = {}; // Truyền tham số
const handleClick = ($global) => {
  $global.apis.AuthLocal.httpPost(form).then((res) => {
    console.log(res);
  });
};
</script>
```

#### getCurrentInstance lấy thuộc tính toàn cục

Trong tài liệu chính thức của vue3 mô tả getCurrentInstance: có thể lấy các thuộc tính được gắn vào toàn cục và lấy context

```vue
<template>
  <div>
    <n-button @click="handleClick">Gửi yêu cầu</n-button>
  </div>
</template>
<script setup>
const form = {}; // Truyền tham số
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance(); // [!code focus]
const handleClick = () => {
  globalProperties.$global.apis.AuthLocal.httpPost(form).then((res) => {
    console.log(res);
  });
};
</script>
```

#### Sửa đổi url

Trong quá trình gửi có thể cần sửa đổi url tạm thời

```vue
<template>
  <div>
    <n-button @click="handleClick($global)">Gửi yêu cầu</n-button>
  </div>
</template>
<script setup>
const form = {}; // Truyền tham số
const handleSubmit = ($global) => {
  $global.apis.AuthLocal.url = "/edit/api/url"; // [!code focus]
  // Thực tế gửi đi sẽ là /api/edit/api/url // [!code focus]
  $global.apis.AuthLocal.httpPost(form).then((res) => {
    console.log(res);
  });
};
</script>
```

#### Sửa đổi baseURL

alova rất linh hoạt, có thể sửa nhiều tham số hơn [method cấu hình chính thức](https://alova.js.org/zh-CN/api/method#methodurl)

```vue
<template>
  <div>
    <n-button @click="handleClick($global)">Gửi yêu cầu</n-button>
  </div>
</template>
<script setup>
const form = {}; // Truyền tham số
const handleSubmit = ($global) => {
  const method = $global.apis.AuthLocal.httpPost(form);
  method.baseURL = "/api2"; // Sửa đổi baseURL  // [!code focus]
  method.url = "/edit/api/url"; // Cũng có thể sửa đổi url  // [!code focus]
  method.send().then((res) => {
    // Gọi send để gửi yêu cầu
    console.log(res);
  });
};
</script>
```
