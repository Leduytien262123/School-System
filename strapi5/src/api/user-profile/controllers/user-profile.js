"use strict";
const { yup } = require("@strapi/utils");
const { object, string } = yup;
const jwt = require("jsonwebtoken");
const _ = require("lodash");
/**
 * user-profile controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::user-profile.user-profile",
  ({ strapi }) => {
    return {
      async register(ctx) {
        const $utils = strapi.$utils;
        try {
          const validate = object().shape({
            username: string()
              .min(2)
              .max(30)
              .required("Vui lòng nhập tên đăng nhập"),
            password: string().min(6).required("Vui lòng nhập mật khẩu"),
            phone: string().min(11).required("Vui lòng nhập số điện thoại"),
            code: string().required("Vui lòng nhập mã xác thực"),
          });
          const { username, password, phone, code } = await validate.validate(
            ctx.request.body,
            { stripUnknown: true, abortEarly: false }
          );
          const findData = await strapi
            .query("api::user-profile.user-profile")
            .findOne({ where: { phone } });
          if (findData) {
            $utils.resultError("Số điện thoại đã được đăng ký");
          }
          const result = await strapi
            .documents("api::user-profile.user-profile")
            .create({
              data: {
                username,
                password: $utils.rsaEncrypt(password),
                phone,
                code,
              },
              status: "published",
            });
          return ctx.send({ data: result });
        } catch (error) {
          $utils.resultError(error);
        }
      },
      async login(ctx) {
        const $utils = strapi.$utils;
        try {
          const validate = object().shape({
            username: string()
              .min(2)
              .max(30)
              .required("Vui lòng nhập tên đăng nhập"),
            password: string().min(6).required("Vui lòng nhập mật khẩu"),
          });
          const { username, password } = await validate.validate(
            ctx.request.body,
            { stripUnknown: true, abortEarly: false }
          );
          const findData = await strapi
            .query("api::user-profile.user-profile")
            .findOne({
              where: { username },
            });
          if (!findData) {
            $utils.resultError(
              "Người dùng không tồn tại, vui lòng đăng ký trước"
            );
          }
          const pas = $utils.rsaDecrypt(findData.password);
          if (pas !== password) {
            $utils.resultError("Mật khẩu không đúng");
          }
          const token = $utils.createJwtToken(findData);
          return ctx.send({
            data: {
              token,
              user: findData,
            },
          });
        } catch (error) {
          $utils.resultError(error);
        }
      },
    };
  }
);
