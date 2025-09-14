# Strapi

[Strapi](https://strapi.nodejs.cn/) là lựa chọn hàng đầu làm framework backend cho vue-bag-admin. Strapi là một CMS mã nguồn mở dạng headless (không giao diện), rất linh hoạt, với bảng quản trị và API đều có thể mở rộng, tùy biến để phù hợp với mọi trường hợp sử dụng.

## Chuẩn bị công cụ

#### Thiết lập dịch vụ cơ sở dữ liệu

Khuyến nghị sử dụng [EServer](https://github.com/xianyunleo/EServer), một môi trường GUI tích hợp cho Windows và Mac, bao gồm Nginx, PHP, MySQL, Redis,... chỉ với một cú nhấp chuột để khởi động.

#### Công cụ quản lý cơ sở dữ liệu trực quan

Khuyến nghị sử dụng [Navicat Premium v17.1.0 bản portable](https://pan.quark.cn/s/1dfbb35ef0a0#/list/share). Navicat 17 được nâng cấp toàn diện, tăng cường quản lý và phân tích dữ liệu, hỗ trợ thiết kế mô hình, từ điển dữ liệu, phân tích dữ liệu,... Tối ưu hóa thiết kế mô hình giúp tăng tốc xây dựng và hiểu kiến trúc cơ sở dữ liệu, nâng cao hiệu suất làm việc. Bổ sung hỗ trợ MongoDB, Redshift, tương thích với GaussDB và OceanBase. Lần đầu mở có thể phải chờ khoảng 30 giây, nếu báo lỗi thì vẫn sử dụng bình thường.

## Cài đặt Strapi

Làm theo hướng dẫn để cài đặt:

```bash
npx create-strapi-app@latest my-project
cd my-project
npm run develop
```

## Sử dụng Strapi do framework cung cấp

Tải mã nguồn tại [GitHub](https://github.com/hangjob/vue-bag-admin/tree/main/api)

Chỉnh sửa cấu hình cơ sở dữ liệu trong `config/database.js`

```bash
pnpm install
npm run develop
```
