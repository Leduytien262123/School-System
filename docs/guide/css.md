# CSS Nguyên tử

> [!IMPORTANT] CSS
> CSS nguyên tử là một phương pháp tổ chức CSS, ưu tiên các class nhỏ gọn, đơn nhiệm và đặt tên theo hiệu ứng thị giác.

Bố cục UI bên trong framework sử dụng [tailwindcss chính thức](https://tailwindcss.com/), một framework CSS ưu tiên công cụ, bao gồm các class như flex, pt-4, text-center, rotate-90,... Bạn có thể xây dựng bất kỳ thiết kế nào trực tiếp trong markup của mình. Trong quá trình phát triển, tôi cũng khuyến khích bạn sử dụng nó.

## Cài đặt

```bash
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Cấu hình tailwind.config.js

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Tạo file `tailwind.css`

Import file này vào main.js, nội dung như sau:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Sử dụng

```vue
<button class="bg-sky-500 hover:bg-sky-700 ...">
Lưu thay đổi
</button>
```
