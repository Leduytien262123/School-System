# Chuẩn bị môi trường

## Cài đặt Node

**Tải công cụ quản lý phiên bản**
Ở đây tôi khuyên bạn nên sử dụng nvm để cài đặt node.js, nvm là công cụ quản lý phiên bản node.js, có thể cài đặt nhiều phiên bản node.js khác nhau và chuyển đổi giữa các phiên bản node.js, [Tải nvm](https://github.com/coreybutler/nvm-windows#readme)

**Chuyển đổi địa chỉ mirror**
Sau khi cài đặt xong, thực hiện các lệnh sau để chuyển đổi địa chỉ mirror

```bash [NPM]
# Mirror Alibaba Cloud
nvm npm_mirror https://npmmirror.com/mirrors/npm/
nvm node_mirror https://npmmirror.com/mirrors/node/
```

**Cài đặt Node**
Cài đặt phiên bản Node phù hợp, ở đây hiển thị các phiên bản mới cập nhật gần đây

```bash [NPM]
nvm ls available
nvm install 20.17.0  # Cài đặt nodejs phiên bản 20.17.0
nvm use 20.17.0   # Sử dụng nodejs phiên bản 20.17.0
node -v # 20.17.0 nghĩa là cài đặt thành công
```

::: info Đề xuất một công cụ quản lý Node phiên bản giao diện trực quan
Cài đặt nvm-windows, giúp quản lý phiên bản node dễ dàng hơn [Tải công cụ quản lý Node giao diện trực quan](https://github.com/1111mp/nvm-desktop/releases)
:::

## Tạo dự án Vite đầu tiên

::: tip Lưu ý về tương thích

Vite yêu cầu Node.js phiên bản 18+ hoặc 20+. Tuy nhiên, một số template cần phụ thuộc vào phiên bản Node cao hơn để chạy bình thường, khi trình quản lý gói của bạn cảnh báo, hãy chú ý nâng cấp phiên bản Node của bạn.

:::

Bạn cũng có thể chỉ định tên dự án và template bạn muốn sử dụng thông qua các tùy chọn dòng lệnh bổ sung. Ví dụ, để tạo một dự án Vite + Vue, chạy:

::: code-group

```bash [NPM]
# npm 7+, cần thêm --:
npm create vite@latest my-vue-app -- --template vue
```

```bash [Yarn]
yarn create vite my-vue-app --template vue
```

```bash [PNPM]
pnpm create vite my-vue-app --template vue
```

```bash [Bun]
bun create vite my-vue-app --template vue
```

:::

#### index.html và thư mục gốc của dự án

Bạn có thể đã nhận thấy rằng trong một dự án Vite, `index.html` nằm ở lớp ngoài cùng của dự án thay vì trong thư mục `public`. Điều này là có chủ đích: trong quá trình phát triển, Vite là một máy chủ và `index.html` là tệp đầu vào của dự án Vite đó.

Vite coi `index.html` là một phần của mã nguồn và đồ thị mô-đun. Vite phân tích cú pháp `<script type="module" src="...">`, thẻ này trỏ đến mã nguồn JavaScript của bạn. Ngay cả các tệp JavaScript được nhúng trong `<script type="module">` và các tệp CSS được tham chiếu trong `<link href>` cũng có thể được phân tích cú pháp bằng các tính năng đặc biệt của Vite. Ngoài ra, các URL trong `index.html` sẽ được tự động chuyển đổi, do đó không cần phải có trình giữ chỗ `%PUBLIC_URL%` nữa.

#### Giao diện dòng lệnh

Trong một dự án đã cài đặt Vite, bạn có thể sử dụng tệp thực thi `vite` trong các script npm hoặc chạy trực tiếp bằng `npx vite`. Dưới đây là các script npm mặc định trong một dự án Vite được tạo bằng scaffold:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```
