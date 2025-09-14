# Cài đặt

Tôi khuyến nghị bạn sử dụng trình quản lý gói (như NPM, Yarn hoặc pnpm) để cài đặt khung cơ bản, sau đó bạn có thể sử dụng các công cụ đóng gói như Vite hoặc webpack.

## Cài đặt pnpm

```bash
npm install -g pnpm
```

## Cài đặt nrm

Chuyển đổi địa chỉ nguồn npm

```bash
npm install -g nrm
nrm ls # Xem tất cả các địa chỉ nguồn
nrm use taobao # Chuyển sang nguồn Taobao
```

Dưới đây là bảng tương thích giữa các phiên bản pnpm và Node.js
| Node.js | pnpm 7 | pnpm 8 | pnpm 9 |
|------------|--------|--------|--------|
| Node.js 12 | ❌ | ❌ | ❌ |
| Node.js 14 | ✔️ | ❌ | ❌ |
| Node.js 16 | ✔️ | ✔️ | ❌ |
| Node.js 18 | ✔️ | ✔️ | ✔️ |
| Node.js 20 | ✔️ | ✔️ | ✔️ |

## Cài đặt khung

```bash
pnpm i vue-bag-admin  -S
```

```javascript
import install from "vue-bag-admin";
const { app } = install();

app.mount("#app");
```

## Cài đặt các gói phụ thuộc

```bash
pnpm install
```

## Khởi động dự án

```bash
pnpm dev
```

## Xây dựng dự án

```bash
pnpm build
```

## Kiểm tra lint

```bash
pnpm lint
```

## Sơ đồ kiến trúc

![Hình ảnh sơ đồ kiến trúc](../images/jgt.png)
