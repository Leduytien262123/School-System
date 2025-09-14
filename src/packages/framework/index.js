import useGlobalStore from "@/packages/pinia/global.js";

class Framework {
  constructor(ctx) {
    this.installedPlugins = new Map();
    this.ctx = ctx;
    this.setGlobal();
  }

  use(plugin, options) {
    if (!this.installedPlugins.has(plugin.name)) {
      this.installedPlugins.set(plugin.name, plugin);
      plugin.install(this, options);
    }
    return this;
  }

  // Lấy plugin theo tên
  getPlugin(pluginName) {
    return this.installedPlugins.get(pluginName);
  }

  // Lấy nhiều plugin theo danh sách tên
  getPlugins(pluginNames) {
    return pluginNames.map((pluginName) => this.getPlugin(pluginName));
  }

  // Kích hoạt plugin
  enablePlugin(plugins) {
    if (!Array.isArray(plugins)) {
      plugins = [plugins];
    }
    const aboutToChangePlugins = this.getPlugins(plugins);
    aboutToChangePlugins?.forEach((plugin) => plugin?.enable?.());
    return this;
  }

  // Vô hiệu hóa plugin
  disablePlugin(plugins) {
    if (!Array.isArray(plugins)) {
      plugins = [plugins];
    }
    const aboutToChangePlugins = this.getPlugins(plugins);
    aboutToChangePlugins?.forEach((plugin) => plugin?.disable?.());
    return this;
  }

  // Hủy plugin
  destroyPlugins(plugins) {
    if (!Array.isArray(plugins)) {
      plugins = [plugins];
    }
    const aboutToChangePlugins = this.getPlugins(plugins);
    aboutToChangePlugins?.forEach((plugin) => plugin?.destroy());
    return this;
  }

  setGlobal() {
    this.ctx.app.config.globalProperties.$global = window.$global = this.ctx;
    // this.ctx.app.config.globalProperties.$globalStore = window.$globalStore = useGlobalStore()
  }
}

export default Framework;
