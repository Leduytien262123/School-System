import useGlobalStore from "@/packages/pinia/global.js";
import { findParents, md5 } from "@/packages/helpers";
import lscache from "lscache";
import { replaceOrAppend } from "radash";

// Xử lý breadcrumb (đường dẫn điều hướng)
function updataBreadcrumbMenus(ctx, app, to) {
  const breadcrumbMenus = findParents(app.menus, to.meta.id);
  if (breadcrumbMenus) {
    app.breadcrumb = breadcrumbMenus.reverse();
  } else {
    const breadcrumbRoutes = findParents(
      ctx?.router?.getRoutes?.(),
      to.meta.id,
      (item) => item.meta.id
    );
    if (breadcrumbRoutes) {
      breadcrumbRoutes.forEach((item) => {
        const meta = item?.meta || {};
        for (const itemKey in meta) {
          item[itemKey] = meta[itemKey];
        }
      });
      app.breadcrumb = breadcrumbRoutes.reverse();
    }
  }
}

// Cập nhật tabbar
function updataTabs(app, to) {
  app.dispatchTabs({ path: to.path, ...to.meta, ...to.query, query: to.query });
}

// Cập nhật lưu trữ tabbar
function updataPersistenceTabs(app, to) {
  if (to && Object.keys(to.meta).length && app.configs.isDataPersistence) {
    const data = { ...to.meta, path: to.path };
    const tabs = replaceOrAppend(
      lscache.get("tabs") || [],
      data,
      (f) => f.id === data.id
    );
    app.tabs = tabs;
    lscache.set("tabs", tabs);
  }
}

// Cập nhật submenu
function updataSubMenu(app, to) {
  const data = app.menus.find((item) => item.id === to.meta.topId);
  app.subMenus = (data && data.children) || [];
}

// Cập nhật menu
function updataMenus(app, to) {
  const item = app.appGroups.find((t) => t.id === app.currentRouter.meta.topId);
  item ? app.dispatchMenus(item.children) : app.dispatchMenus(app.sourceMenus);
}

function afterEach(ctx, options) {
  ctx?.router?.afterEach?.((to, from) => {
    ctx.middleware.eventEmitter.emit("ROUTER:AFTER", to, from);
    const globalStore = useGlobalStore();
    globalStore.currentRouter = to;
    updataTabs(globalStore, to);
    updataBreadcrumbMenus(ctx, globalStore, to);
    updataPersistenceTabs(globalStore, to);
    updataSubMenu(globalStore, to);
    updataMenus(globalStore, to);
  });
}

export { afterEach };
