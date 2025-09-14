export const defaultBuiltRouter = [
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    // Khi có nhiều thẻ router-view, phải dùng 'components' thay vì 'component'
    components: {
      default: () => import("@/packages/layout/index.vue"),
      iframe: () => import("@/packages/layout/iframe.vue"),
      lessen: () => import("@/packages/layout/lessen.vue"),
    },
    children: [],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/packages/views/login/index.vue"),
    title: "Đăng nhập",
    hidden: true,
  },
];

// Lưu ý:
// 1. Nếu bỏ qua dấu '*' cuối cùng, khi phân tích hoặc chuyển hướng sẽ mã hóa ký tự '/' trong params
// 2. Không nên viết thuộc tính name, nếu không khi thêm route động sẽ có cảnh báo trên trình duyệt và các route đã thêm sẽ vẫn báo 404 khi chuyển hướng
export const defaultErrorRouter = {
  path: "/:pathMatch(.*)*",
  component: () => import("@/packages/views/error/index.vue"),
  title: "404",
  hidden: true,
};
