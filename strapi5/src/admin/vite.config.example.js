const { mergeConfig } = require("vite");

module.exports = (config) => {
  // Quan trọng: luôn trả về config đã được chỉnh sửa
  return mergeConfig(config, {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};
