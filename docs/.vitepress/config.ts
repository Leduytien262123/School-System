import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue-Bag-Admin",
  description:
    "Giúp lập trình viên hoàn thành phát triển với chi phí tối thiểu, giảm công việc lặp lại",
  appearance: "dark",
  base: "/doc/",
  lastUpdated: true,
  head: [["link", { rel: "icon", href: "/doc/logo-min.png" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "🐻‍Trang chủ", link: "/" },
      { text: "Câu hỏi thường gặp", link: "/markdown-examples" },
    ],
    sidebar: [
      {
        text: "Hướng dẫn nhập môn",
        items: [
          { text: "Giới thiệu", link: "/guide/intro" },
          { text: "Hướng dẫn bắt đầu", link: "/guide/started" },
          { text: "Phát hành & Triển khai", link: "/guide/deploy" },
        ],
      },
      {
        text: "Bắt đầu sử dụng",
        items: [
          { text: "Cài đặt", link: "/guide/install" },
          { text: "Khởi động nhanh", link: "/guide/start" },
          {
            text: "Danh sách plugin",
            items: [
              { text: "Plugin router", link: "/plugins/router" },
              { text: "Plugin layout", link: "/plugins/layout" },
              { text: "Plugin đa ngôn ngữ", link: "/plugins/language" },
              { text: "Plugin icon", link: "/plugins/icon" },
              { text: "Plugin API", link: "/plugins/api" },
              { text: "Plugin tiến trình", link: "/plugins/progress" },
            ],
          },
          { text: "Router & Layout", link: "/guide/router" },
          { text: "Mở rộng toàn cục", link: "/guide/global" },
          { text: "Phương thức toàn cục", link: "/guide/funs" },
          { text: "Thành phần biểu mẫu", link: "/guide/comp" },
          { text: "Cài đặt chủ đề", link: "/guide/theme" },
          { text: "Css nguyên tử", link: "/guide/css" },
          { text: "Quản lý trạng thái Pinia", link: "/guide/pinia" },
        ],
      },
      {
        text: "Sử dụng nâng cao",
        items: [
          { text: "Phát triển plugin", link: "/plugins/exploit" },
          { text: "Middleware", link: "/guide/middleware" },
          { text: "Tự động import", link: "/usage/import" },
          { text: "Plugin Vite", link: "/usage/vite" },
        ],
      },
      {
        text: "Strapi",
        items: [{ text: "Dịch vụ API", link: "/strapi/install" }],
      },
    ],

    socialLinks: [
      { icon: "instagram", link: "https://github.com/vuejs/vitepress" },
    ],
    // Thiết lập giao diện tìm kiếm
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "Tìm kiếm tài liệu",
            buttonAriaLabel: "Tìm kiếm tài liệu",
          },
          modal: {
            noResultsText: "Không tìm thấy kết quả phù hợp",
            resetButtonTitle: "Xóa điều kiện tìm kiếm",
            footer: {
              selectText: "Chọn",
              navigateText: "Chuyển",
            },
          },
        },
      },
    },
  },
});
