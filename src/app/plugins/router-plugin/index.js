import { createRouter, createWebHistory } from "vue-router";
import {
  defaultBuiltRouter,
  defaultErrorRouter,
} from "@/packages/router/routes.js";
import { afterEach } from "@/packages/router/index.js";
import beforeEach from "./plug.js";

/**
 * Plugin định tuyến trang (router)
 */
export class RouterPlugin {
  constructor() {
    this.name = "RouterPlugin";
    this._enable = false;
  }

  install({ ctx }, options = {}) {
    const { router, ...args } = options;
    const routes = [...defaultBuiltRouter];
    options.routes ? routes.push(...options.routes) : null;
    options.errorRoute
      ? routes.push(options.errorRoute)
      : routes.push(defaultErrorRouter); // Route lỗi nên để cuối cùng
    ctx.router =
      router ||
      createRouter({
        history: createWebHistory(options.base || "/"),
        routes: routes, // Gộp route mặc định và route cấu hình người dùng
        ...args,
      });

    // Sắp bỏ phương thức này
    ctx.router.$push = (path) => {
      if (ctx.helpers.checkURL(path)) {
        window.open(path, path);
      } else {
        return ctx.router.push(path);
      }
    };

    const originalPush = ctx.router.push;
    ctx.router.push = function (location) {
      if (ctx.helpers.checkURL(location)) {
        window.open(location, location);
      } else {
        return originalPush.call(this, location).catch((error) => {
          console.error("Chuyển trang thất bại:", error);
          throw error;
        });
      }
    };
    ctx.app.use(ctx.router);
    afterEach(ctx, args);
    beforeEach(ctx, args);
  }

  // Vô hiệu hóa plugin
  disable() {
    this._enable = false;
  }

  // Kích hoạt plugin
  enable() {
    this._enable = true;
  }

  // Gỡ plugin
  destroy() {}

  // Trạng thái plugin
  inEnabled() {
    return this._enable;
  }
}

export const useRouterPlugin = new RouterPlugin();
