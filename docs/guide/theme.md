# Cài đặt chủ đề

## Màu chủ đề Naive UI

Dù là chủ đề sáng mặc định (lightTheme), chủ đề tối đã chỉnh sửa (darkTheme), hay chủ đề tùy chỉnh do bạn tự điều chỉnh, trong phạm vi chủ đề này các component đều có thể lấy biến chủ đề thông qua [useThemeVars](https://www.naiveui.com/zh-CN/os-theme/docs/theme#use-theme-vars).

### Thiết lập chủ đề

Bên trong framework đã đăng ký sẵn phương thức thiết lập chủ đề, có thể sử dụng trực tiếp.

> Khi truyền vào màu sắc, framework sử dụng phương thức tiện ích của `@ant-design/colors` để tự động sinh ra một bộ màu dựa trên màu chủ đề bạn truyền vào. Tham khảo chi tiết tại [Online demo đổi màu chủ đề](https://github.liubing.me/naive-ui-change-theme/)

```javascript
$global.helpers.cutColorTheme($global, "#0094FF");
```

## Tùy chỉnh màu sắc

Giá trị biến màu có thể lấy qua [useThemeVars](https://www.naiveui.com/zh-CN/os-theme/docs/theme#use-theme-vars)

```javascript
$global.helpers.cutColorTheme($global, "#0094FF", {
  common: {
    lineHeight: "1.6",
    heightMini: "16px",
    heightMedium: "34px",
    heightLarge: "40px",
    heightHuge: "46px",
    baseColor: "#FFF",
    primaryColor: "#18a058",
    primaryColorHover: "#36ad6a",
    primaryColorPressed: "#0c7a43",
    primaryColorSuppl: "#36ad6a",
    infoColor: "#2080f0",
    infoColorHover: "#4098fc",
    infoColorPressed: "#1060c9",
    infoColorSuppl: "#4098fc",
    // ... Tham khảo thêm các biến khác trong tài liệu chính thức
  },
  Button: {
    primaryColor: "#18a058",
  },
  Menu: {
    primaryColor: "#18a058",
  },
});
```

### Dữ liệu mặc định

```json
{
  "collapsedWidth": 80,
  // Chiều rộng khi thu gọn
  "collapsedIconSize": 22,
  // Kích thước icon thu gọn
  "mobileMenuDrawer": 240,
  // Chiều rộng menu drawer trên di động
  "menuDrawer": 240,
  // Chiều rộng menu drawer
  "layoutSiderWidth": 240,
  // Chiều rộng sidebar
  "isMenuCollapsed": false,
  // Có thu gọn menu không
  "mobileMenuVisible": false,
  // Ẩn menu trên di động
  "isTopColor": false,
  // Màu thanh trên cùng
  "isDarkMode": false,
  // Chế độ tối
  "isTabar": true,
  // Hiển thị tab
  "isBreadcrumb": true,
  // Hiển thị breadcrumb
  "isBreadcrumbIcon": true,
  // Hiển thị icon breadcrumb
  "isDataPersistence": false,
  // Tab có lưu trạng thái không
  "isSubmenu": true,
  // Hiển thị submenu phân loại ứng dụng
  "isDocking": true,
  // Dock module
  "isFooter": true,
  // Hiển thị footer
  "isWatermark": false,
  // Có watermark không
  "watermark": "vue-bag-admin",
  // Nội dung watermark
  "layoutName": "default",
  // Tên chủ đề: default, lessen, spillover
  "tabStyle": "button",
  // Kiểu tab: button, card
  "formStyle": "drawer",
  // Kiểu form: drawer, dialogue
  "language": "zh"
  // Ngôn ngữ
}
```

```javascript
import install from "vue-bag-admin";

const { app, framework, plugins, pina } = install();
pina.state.value.global.configs.isFooter = false; // Thay đổi giá trị trạng thái
pina.state.value.global.configs.isBreadcrumb = false; // Thay đổi giá trị trạng thái
```
