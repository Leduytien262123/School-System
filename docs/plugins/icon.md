# Plugin Icon

Ở đây bạn có thể sử dụng plugin icon, plugin icon sẽ tự động đăng ký icon vào toàn cục, có thể sử dụng trực tiếp.

```javascript
import install from "vue-bag-admin";
import * as icons from "@vicons/ionicons5";
import { BehanceOutlined, ReadOutlined } from "@vicons/antd";

const { plugins } = install();
framework.use(plugins.useIconPlugin, {
  icons: {
    BehanceOutlined,
    ReadOutlined,
    ...icons,
  },
});
```
