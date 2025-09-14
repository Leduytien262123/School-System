import "default-passive-events"; // Loại bỏ cảnh báo Passive Event Listeners trên Chrome 51+ về cơ chế bắt sự kiện
import "@/packages/style/tailwind.css";
import "@/packages/style/tailwind.css";
import "@/packages/style/style.less";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import App from "@/packages/App.vue";
import { createPinia } from "pinia";
import Framework from "@/packages/framework/index.js";
import * as helpers from "@/packages/helpers";
import * as http from "@/packages/http/request.js";
import * as pinia from "pinia";
import * as radash from "radash";
import * as hooksPlus from "vue-hooks-plus";
import * as dayjs from "dayjs";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // Lưu trạng thái pinia vào localStorage
import setupComponents from "@/packages/components/index.js";
import * as plugins from "@/app/plugins/index.js";
import useGlobalStore from "@/packages/pinia/global.js";
import * as router from "vue-router";
import eventEmitter from "@/packages/middleware";

// Trung gian (middleware)
const middleware = {
  eventEmitter,
};

Array.prototype.first = function () {
  return this.slice(0, 1)[0];
};

/**
 * Sử dụng hàm lười để hiện thực Singleton pattern
 * Nếu đã cài đặt rồi thì trả về app đã cài đặt
 * @param elApp
 * @param options
 * @returns {*}
 */
function install(elApp = null, options = {}) {
  if (install.app) {
    return install();
  }
  const app = createApp(elApp || App, options);
  const pina = createPinia();
  pina.use(piniaPluginPersistedstate);
  app.use(pina);
  app.use(setupComponents);
  app.config.globalProperties.$globalStore = window.$globalStore =
    useGlobalStore();
  const framework = new Framework({
    app,
    pina,
    pinia,
    helpers: { ...helpers }, // Có thể mở rộng liên tục
    radash,
    hooksPlus,
    dayjs,
    http,
    nprogress,
    middleware,
  });
  framework.use(plugins.useNaivePlugin);
  app.config.globalProperties.$global = window.$global = framework.ctx;
  install = function () {
    install.app = app;
    return {
      app,
      pina,
      pinia,
      helpers, // Có thể mở rộng liên tục
      radash,
      hooksPlus,
      dayjs,
      framework,
      http,
      nprogress,
      plugins,
      router,
      middleware,
    };
  };
  return install();
}

export default install;
export { pinia, router, dayjs, radash, hooksPlus, http };
