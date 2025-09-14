# Phát hành & Triển khai

## Xây dựng

Sau khi hoàn thành phát triển dự án, bạn có thể chạy lệnh `npm run build` để tiến hành build. Sau khi build thành công, một thư mục `dist` sẽ được tạo ở thư mục gốc, chứa các file đã được đóng gói sẵn sàng để triển khai.

:::info Triển khai ở thư mục con
Nếu địa chỉ truy cập cuối cùng là một thư mục con của domain, ví dụ https://www.abc.com/app, bạn cần cấu hình tùy chọn base trong vite.config.ts thành /app/, nếu không sẽ xảy ra lỗi tham chiếu tài nguyên.
:::

## Cấu hình nén

```bash
pnpm add -D vite-plugin-compression
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
    plugins: [
        viteCompression({
          threshold: 1024000 // Nén các file lớn hơn 1mb
        })
    ],
});

```

## Chế độ Hash

```js{5}
import {createWebHashHistory} from "vue-router"
import install from "vue-bag-admin"
const {app, framework, plugins} = install()

framework.use(plugins.useRouterPlugin, {
    history:createWebHashHistory()
})

app.mount('#app')
```

## Chế độ History

```js{5}
import {createWebHistory} from "vue-router"
import install from "vue-bag-admin"
const {app, framework, plugins} = install()

framework.use(plugins.useRouterPlugin, {
    history:createWebHistory(),
})

app.mount('#app')
```

#### Triển khai ở thư mục con

```js{5}
import {createWebHistory} from "vue-router"
import install from "vue-bag-admin"
const {app, framework, plugins} = install()

framework.use(plugins.useRouterPlugin, {
    history:createWebHistory('/app/'), // [!code focus]
})

app.mount('#app')
```

#### Cấu hình Vite.config.js

```js
export default defineConfig({
  base: "/app/",
});
```

## Cấu hình Nginx

::: details Cấu hình Nginx cho trang đơn
NGINX Config hỗ trợ các tùy chọn cấu hình HTTP, HTTPS, PHP, Python, Node.js, WordPress, Drupal, bộ nhớ đệm, proxy ngược, nhật ký và nhiều tùy chọn khác. Tạo file cấu hình Nginx cho máy chủ Web trực tuyến.

```nginx configuration
server {
    gzip on;    # Bật gzip
    listen       80;   # Cổng lắng nghe
    server_name  www.abc.com;  # Tên miền
    location / {
        root   /home/web/www;   # Thư mục gốc của trang web
        index  index.html index.htm;  # Loại trang chủ mặc định
        try_files $uri $uri/  /index.html; # Thay thế cách cấu hình rewrite thông thường, mạnh mẽ hơn
        deny 192.168.2.11;   # Địa chỉ IP bị cấm truy cập, có thể là all
        allow 192.168.3.44; # Địa chỉ IP được phép truy cập, có thể là all
    }

    location /api/ {
        rewrite ^/api/(.*)$ /$1 break; # Quy tắc này sẽ bắt tất cả các đường dẫn bắt đầu bằng /api/ và loại bỏ phần /api, sau đó sử dụng phần còn lại làm đường dẫn mới. Từ khóa break chỉ ra rằng nếu khớp thành công thì dừng xử lý các quy tắc rewrite khác
        proxy_pass https://www.api.com; # Chỉ định mục tiêu proxy, tức là máy chủ upstream
        proxy_set_header Host $host; # Thiết lập các header HTTP được truyền đến máy chủ backend khi proxy request, Host, X-Real-IP, X-Forwarded-For và X-Forwarded-Proto là các header thông dụng, dùng để truyền thông tin của client
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Nếu bạn triển khai ở thư mục con

```nginx configuration
server {
    location /app/ { # Tên thư mục app
        root   /home/web/www/app; # Thư mục gốc của trang web
        try_files $uri $uri/ /app/index.html; # Thay thế cách cấu hình rewrite thông thường, mạnh mẽ hơn
    }
}
```

[Trình tạo cấu hình nginx trực tuyến](https://www.digitalocean.com/community/tools/nginx?domains.0.routing.index=index.html&domains.0.routing.fallbackHtml=true&global.app.lang=zhCN)
:::
