import { createAlova, Method } from "alova";
import fetchAdapter from "alova/fetch";
import VueHook from "alova/vue";
import emitter from "@/packages/middleware";

const alovaOptions = {
  // Bộ điều hợp request, ở đây sử dụng fetch
  requestAdapter: fetchAdapter(),
  // Trong dự án vue, import VueHook để quản lý trạng thái request bằng ref
  statesHook: VueHook,
  // Địa chỉ baseURL của server
  baseURL: "/api",
};

const alovaInstance = createAlova({
  ...alovaOptions,
  async responded(response) {
    const contentType = response.headers.get("content-type");
    if (
      response.status >= 200 &&
      response.status < 300 &&
      contentType &&
      contentType.indexOf("application/json") !== -1
    ) {
      const json = await response.json();
      emitter.emit("API:SUCCESS", { json, response });
      return Promise.resolve(json);
    } else {
      const text = await response.text();
      emitter.emit("API:REQUEST", { text, response });
      return Promise.reject(response);
    }
  },
});

const httpPost = (url, params = null, config = {}) => {
  const method = new Method("POST", alovaInstance, url, config, params);
  Object.getOwnPropertyNames(config).forEach(
    (key) => (method[key] = config[key])
  );
  return method;
};

const httpGet = (url, params = null, config = {}) => {
  const method = new Method("GET", alovaInstance, url, { params, ...config });
  Object.getOwnPropertyNames(config).forEach(
    (key) => (method[key] = config[key])
  );
  return method;
};

export { httpPost, httpGet, alovaInstance, alovaOptions };
