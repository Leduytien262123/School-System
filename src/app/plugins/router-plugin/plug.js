import { isArray, isFunction, isPromise } from "radash";

/**
 * Lấy menu (menu chính)
 * @param ctx
 * @param options
 * @returns {Promise<{routes: *[], menus: *[]}>}
 */
async function getAppMenus(ctx, options) {
  const $globalStore = ctx.app.config.globalProperties.$globalStore;
  const disposeMenus = (data) => {
    const menus = ctx.helpers.menusProcessing(ctx, ctx.helpers.buildTree(data));
    const routes = ctx.helpers.menusToLocalRoutes(menus, $globalStore.files);
    $globalStore.dispatchMenus(menus);
    $globalStore.dispatchRoutes(routes);
    $globalStore.dispatchSourceMenus(menus);
    ctx.helpers.addRoutes(ctx, routes);
  };
  if (isFunction(options?.handleMenus)) {
    try {
      const res = await options.handleMenus({ ctx });
      if (isArray(res?.data) || isArray(res)) {
        disposeMenus(res.data || res);
      }
    } catch (e) {
      throw e;
    }
  }
}

/**
 * Lấy nhóm ứng dụng, menu
 * @param ctx
 * @param options
 */
async function getAppGroups(ctx, options) {
  const $globalStore = ctx.app.config.globalProperties.$globalStore;
  const disposeGroups = (data) => {
    const groups = ctx.helpers.menusProcessing(
      ctx,
      ctx.helpers.buildTree(data)
    );
    const routes = ctx.helpers.menusToLocalRoutes(groups, $globalStore.files);
    $globalStore.dispatchRoutes(routes);
    $globalStore.dispatchAppGroups(groups);
    ctx.helpers.addRoutes(ctx, routes);
  };
  if (isFunction(options?.handleGroups)) {
    try {
      const res = await options.handleGroups({ ctx });
      if (isArray(res?.data) || isArray(res)) {
        disposeGroups(res.data || res);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

/**
 * Trong beforeEach router, lấy nhóm ứng dụng, menu
 * @param ctx
 * @param options
 */
const beforeEach = (ctx, options) => {
  const $globalStore = ctx.app.config.globalProperties.$globalStore;
  $globalStore.dispatchFiles({ ...(options?.files || {}) }); // Làm bộ nhớ đệm tệp toàn cục, thuận tiện cho việc sử dụng sau này
  ctx?.router?.beforeEach?.(async (to, from, next) => {
    if (!$globalStore.isLoadRoutes) {
      await getAppMenus(ctx, options);
      await getAppGroups(ctx, options);
      $globalStore.isLoadRoutes = true;
      next({ ...to, replace: true });
    } else {
      let isNextCalled = false;
      const wrappedNext = (...args) => {
        isNextCalled = true;
        next(...args);
      };
      try {
        await ctx.middleware.eventEmitter.emit(
          "ROUTER:BEFORE",
          to,
          from,
          wrappedNext
        );
        // Nếu sự kiện không gọi next thì tự động next
        if (!isNextCalled) {
          next();
        }
      } catch (error) {
        // Xử lý ngoại lệ có thể xảy ra
        console.error("路由前置守卫出错:", error);
        next(false); // Hủy điều hướng
      }
    }
  });
};

export default beforeEach;
