"use strict";
const utils = require("./helpers/utils"); // Tiện ích mở rộng
module.exports = {
  /**
   * Một hàm register bất đồng bộ chạy trước khi ứng dụng của bạn được khởi tạo.
   *
   * Điều này cho phép bạn mở rộng mã nguồn.
   */
  register({ strapi }) {
    utils.createJwtToken = utils.createJwtToken(strapi);
    strapi.$utils = utils;
  },

  /**
   * Một hàm bootstrap bất đồng bộ chạy trước khi ứng dụng của bạn được khởi động.
   *
   * Điều này cho phép bạn thiết lập mô hình dữ liệu, chạy các tác vụ hoặc thực hiện logic đặc biệt.
   */
  bootstrap(/*{ strapi }*/) {},
};
