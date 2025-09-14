# Trung gian (Middleware)

Để giải quyết các tình huống như khi thực hiện các yêu cầu mạng, xử lý phản hồi, điều hướng (router),... cần xử lý trước các yêu cầu như kiểm tra trạng thái đăng nhập, phân quyền, ghi log,... bạn có thể sử dụng middleware (trung gian).
Ngoài ra, middleware còn giúp xử lý chặn router, xử lý lỗi, v.v.

### Mạng

Nếu bạn sử dụng dịch vụ mạng do framework này cung cấp, bạn có thể dùng middleware để xử lý các yêu cầu mạng, phản hồi, điều hướng, v.v.

```javascript
import install from "vue-bag-admin";

const { middleware } = install();
// Lắng nghe sự kiện API:REQUEST, nếu mã trạng thái trả về không phải 200 thì hiển thị cảnh báo lỗi
middleware.eventEmitter.on("API:REQUEST", ({ json, text, response }) => {
  if (text) {
    window.$naive.message.warning(text || response.statusText); // Yêu cầu không thành công
  } else {
    window.$naive.message.warning(json?.error?.message); // Lỗi phản hồi từ API
  }
});
// Lắng nghe sự kiện API:SUCCESS, nếu mã trạng thái trả về là 200 thì hiển thị thông báo thành công
middleware.eventEmitter.on("API:SUCCESS", ({ json, response }) => {
  console.log("Yêu cầu thành công");
});
```

## Điều hướng (Router)

Middleware cho router có thể lắng nghe các sự kiện chuyển trang, trước khi chuyển, sau khi chuyển, v.v.

```javascript
// Trước khi chuyển router
import install from "vue-bag-admin";
const { middleware } = install();
middleware.eventEmitter.on("ROUTER:BEFORE", (to, from, next) => {
  next(); // Cần gọi next() để tiếp tục chuyển router
});
```

```javascript
// Sau khi chuyển router
import install from "vue-bag-admin";
const { middleware } = install();
middleware.eventEmitter.on("ROUTER:AFTER", (to, from) => {
  console.log(to);
});
```
