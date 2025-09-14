# Plugin Layout

Plugin này dùng để quản lý bố cục giao diện, hỗ trợ nhiều kiểu layout khác nhau cho ứng dụng của bạn.

```javascript
import LayoutHeaderExtra from "@/app/components/LayoutHeaderExtra.vue";
import LayoutHeaderCum from "@/app/components/LayoutHeaderCum.vue";

export default class LayoutPlugin {
  constructor() {
    this.name = "LayoutPlugin";
  }

  install({ ctx }, options) {
    ctx.app.component("LayoutHeaderExtra", LayoutHeaderExtra); // Đăng ký thành phần bố cục
    ctx.app.component("LayoutHeaderCum", LayoutHeaderCum); // Đăng ký thành phần bố cục
  }
}

export const useLayoutPlugin = new LayoutPlugin();
```

## Hỗ trợ các thành phần toàn cục

`LayoutHeaderTitle`、`LayoutTabBar`、`LayoutFooter`、`LayoutHeaderExtra`、`LayoutHeaderCum` 、`LayoutSiderMenu`

## Hình ảnh xem trước

![Hình ảnh xem trước thành phần](../images/layout.jpg)
