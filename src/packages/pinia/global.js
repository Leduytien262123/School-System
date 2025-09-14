import { defineStore } from "pinia";
import { unique, replaceOrAppend, select } from "radash";
import currentDevice from "current-device"; // 获取设备
import { nextTick } from "vue";
import lscache from "lscache";
import {
  filterOut,
  removeDuplicates,
  removeZeroChildren,
} from "@/packages/helpers/index.js";

const getBrowserDeviceType = function (w = 718) {
  return window.innerWidth < w;
};

const useGlobalStore = defineStore("global", {
  state: () => {
    const tabs = (lscache.get("tabs") || []).filter(
      (item) => !item.path.includes("form_")
    );
    return {
      sourceMenus: [], // Danh sách menu gốc, dữ liệu cố định không thay đổi
      menus: [], // Menu bên trái
      subMenus: [], // Menu con phân loại
      appGroups: [], // Nhóm ứng dụng
      files: [], // Tất cả các file
      routes: [], // Tất cả các route
      isLoadRoutes: false, // Đã load route hay chưa
      configs: {
        collapsedWidth: 80, // Chiều rộng khi thu gọn
        collapsedIconSize: 22, // Kích thước icon thu gọn
        mobileMenuDrawer: 240, // Chiều rộng menu drawer trên mobile
        menuDrawer: 240, // Chiều rộng menu drawer
        layoutSiderWidth: 240, // Chiều rộng sidebar bên trái
        isMenuCollapsed: false, // Có thu gọn menu không
        mobileMenuVisible: false, // Ẩn/hiện menu trên mobile
        isTopColor: false, // Màu thanh trên cùng
        isDarkMode: true, // Chế độ tối
        isTabar: true, // Hiển thị tab
        isBreadcrumb: true, // Hiển thị breadcrumb
        isBreadcrumbIcon: true, // Hiển thị icon breadcrumb
        isDataPersistence: false, // Tab có được lưu lại không
        isSubmenu: true, // Hiển thị submenu nhóm ứng dụng
        language: navigator.language.indexOf("zh") !== -1 ? "zh" : "en", // Ngôn ngữ
        isDocking: true, // Hiển thị dock module
        isFooter: true, // Hiển thị footer
        isWatermark: false, // Hiển thị watermark
        isTabCover: true, // Tab dạng phủ lên
        watermark: "vue-bag-admin", // Nội dung watermark
        layoutName: "default", // Tên giao diện: default, lessen, spillover
        tabStyle: "button", // Kiểu tab: button, card
        formStyle: "drawer", // Kiểu form: drawer, dialogue (không còn dùng)
        formMode: "drawer", // Chế độ form: drawer | page | modal
        formRoute: "particulars", // Tên route của form, liên kết với formMode
      },
      isIframe:
        window.self.frameElement &&
        window.self.frameElement.tagName === "IFRAME", // Trang có bị nhúng iframe không
      deviceInfo: {
        // Thông tin thiết bị
        isMobile: false,
        isTablet: false,
        isDesktop: false,
      },
      webSite: {
        title: "", // Tiêu đề
        subTitle: "", // Phụ đề
        logo: "", // Ảnh logo
        footerText: "", // Chữ ở chân trang
      },
      userInfo: {}, // Thông tin người dùng
      currentRouter: {}, // Đối tượng route hiện tại
      breadcrumb: [], // Thanh breadcrumb đầu trang
      tabs: tabs, // Danh sách tab chuyển đổi
      isRouterReload: true, // Làm mới trang khi chuyển tab
      bgs: [], // Ảnh nền
      theme: {
        color: "#18a058",
        colors: [
          { name: "Mặc định", color: "#18a058" },
          { name: "Hoàng hôn", color: "#f5222d" },
          { name: "Chạng vạng", color: "#13c2c2" },
          { name: "Núi lửa", color: "#fa541c" },
          { name: "Xanh đậm", color: "#009688" },
          { name: "Cúc vạn thọ", color: "#faad14" },
          { name: "Bình minh", color: "#ffec3d" },
          { name: "Chanh xanh", color: "#a0d911" },
          { name: "Xanh cực quang", color: "#52c41a" },
          { name: "Xanh bình minh", color: "#1890ff" },
          { name: "Xanh geek", color: "#2f54eb" },
        ],
        overrides: {
          // Scrollbar: {
          //     height: '3px',
          // },
        },
      }, // Màu chủ đề
    };
  },
  getters: {},
  actions: {
    dispatchRoutes(routes) {
      this.routes = removeDuplicates(this.routes.concat(routes));
    },
    dispatchMenus(menus) {
      const data = removeDuplicates(filterOut(menus, (f) => f.hasMenu));
      this.menus = removeZeroChildren(data);
    },
    dispatchSourceMenus(menus) {
      this.sourceMenus = removeDuplicates(menus);
    },
    dispatchAppGroups(groups) {
      this.appGroups = removeDuplicates(groups);
    },
    dispatchFiles(files) {
      this.files = files;
    },
    dispatchIsRoutes() {
      this.isLoadRoutes = true;
    },
    dispatchUserInfo(data) {
      this.userInfo = data;
    },
    dispatchTabs(tab) {
      if (tab.title && tab.id) {
        const key = this.configs.isTabCover ? "id" : "path";
        const tabs = replaceOrAppend(
          this.tabs,
          tab,
          (existingTab) => existingTab[key] === tab[key]
        );
        this.tabs = tabs.sort((a, b) => {
          return b.sort || 0 - a.sort || 0;
        });
        this.configs.isDataPersistence
          ? lscache.set("tabs", this.tabs)
          : lscache.set("tabs", []);
      }
    },
    dispatchDeviceInfo() {
      // 既判断根据设备判断 也根据当前的尺寸判断
      this.deviceInfo.isMobile =
        currentDevice.mobile() || getBrowserDeviceType(718);
      this.deviceInfo.isTablet =
        currentDevice.tablet() || getBrowserDeviceType(1199);
      this.deviceInfo.isDesktop =
        currentDevice.desktop() ||
        getBrowserDeviceType(Number.MAX_SAFE_INTEGER);
      this.configs.isMenuCollapsed = this.deviceInfo.isTablet;
    },
    dispatchThemeOverrides({ overrides, color }) {
      this.theme.overrides = overrides;
      this.theme.color = color;
    },
    reloadView() {
      this.isRouterReload = false;
      nextTick().then(() => {
        this.isRouterReload = true;
      });
    },
  },
  persist: {
    key: "pinia", // Tên lưu trữ
    storage: localStorage, // Kiểu lưu trữ
    // Chỉ định state nào cần lưu. [] là không lưu gì, undefined hoặc null là lưu toàn bộ state
    paths: ["configs", "theme"],
  },
});

export default useGlobalStore;
