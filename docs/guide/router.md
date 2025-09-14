# Bố cục Router

Trong một số trường hợp, chúng ta cần bố trí lại router, ví dụ:

## App

```vue
<template>
  <router-view name="lessen"></router-view>
</template>
<script setup></script>
```

> [!TIP] > `name` dùng để chỉ định tên template của router, `lessen` là giá trị template router được tích hợp sẵn trong framework

```js
import install from "vue-bag-admin";
import App from "./App.vue";

const { app, framework, plugins } = install(App);
```

### Kèm theo mã nguồn framework

Đây là mã nguồn của framework, giúp lập trình viên dễ hiểu hơn, các tham số này cũng đồng bộ với [tài liệu chính thức](https://cn.vuejs.org/api/application)

```javascript
function install(elApp = null, rootProps = {}) {
  const app = createApp(elApp || App, {
    ...rootProps,
  });
}
```
