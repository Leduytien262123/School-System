import { h } from "vue";
import { commonDark, NIcon, NTag, NBadge } from "naive-ui";
import lscache from "lscache";
import { customAlphabet } from "nanoid";
import { md5 } from "js-md5";
import { generate } from "@ant-design/colors";
import CryptoJS from "crypto-js";
import LargeUploadFile from "@/packages/helpers/LargeUploadFile.js";
import automaticUpdate from "./AutomaticUpdate.js";
import * as icons from "@/packages/helpers/Icon.js";
import highHtml from "./HighHtml.js";

function renderIcon(icon, props) {
  return () => h(NIcon, props, { default: () => h(icon) });
}

/**
 * Đệ quy duyệt cây (tree)
 * @param tree
 * @param callback
 * @param children
 */
function depthForEach(tree = [], callback, children = "children") {
  function DFS(treeData) {
    for (const item of treeData) {
      callback(item);
      if (Array.isArray(item[children])) {
        DFS(item[children]);
      }
    }
  }

  DFS(tree);
}

/**
 * Lấy node cha
 * @param arr
 * @param key
 * @param node
 * @returns {T[]|*[]}
 */
function findParents(arr = [], key = "", node) {
  for (const i in arr) {
    if (arr.hasOwnProperty(i)) {
      if (((node && node(arr[i])) || arr[i].id) === key) {
        return [arr[i]];
      }
      if (arr[i].children) {
        const node = findParents(arr[i].children, key);
        if (node !== undefined) {
          return node.concat(arr[i]);
        }
      }
    }
  }
}

/**
 * Định dạng tiêu đề
 * @param ctx
 * @param item
 * @param isRender
 * @returns {(function(): *)|*}
 */
function formatTitle(ctx, item, isRender = false) {
  const t = ctx.i18n?.global?.t;
  if (t && item.localesKey) {
    return isRender ? () => t(item.localesKey) : t(item.localesKey);
  } else {
    return item.title;
  }
}

/**
 * Xây dựng cây từ id và pid
 * @param nodes
 * @param key
 * @param pkey
 * @returns {*[]}
 */
function buildTree(nodes, key = "id", pkey = "pid") {
  const map = new Map();
  const rootNodes = [];

  // Khởi tạo map
  nodes.forEach((node) => {
    map.set(node[key], node);
  });

  // Duyệt tất cả các node để xây dựng cây
  nodes.forEach((node) => {
    const parent = map.get(node[pkey]);

    if (parent) {
      if (!parent.children) parent.children = [];
      parent.children.push(node);
    } else {
      rootNodes.push(node);
    }
  });

  return rootNodes;
}

/**
 * Tạo chuỗi ngẫu nhiên
 * @type {(size?: number) => string}
 */
const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 24);

/**
 * Thêm route
 * @param ctx
 * @param routes
 */
const addRoutes = (ctx, routes = []) => {
  ctx.helpers.depthForEach(routes, (item) => {
    // overlayRouting có bật hay không, nếu bật thì có thể ghi đè route đã có, chú ý item.root là node gốc
    if (!ctx.router.hasRoute(item.name) || item.overlayRouting) {
      const { component, name, path, ...meta } = item;
      // Chú ý ở đây, nếu không mở rộng thuộc tính meta, các thuộc tính khác sẽ không được thêm vào, bị addRoute lọc ra
      if (item.root) {
        if (ctx.router.hasRoute(item.root)) {
          ctx.router.addRoute(item.root, { component, name, path, meta });
        } else {
          ctx.router.addRoute({ component, name, path, meta }); // Ở đây có thể nâng cấp thêm
        }
      } else {
        ctx.router.addRoute("layout", { component, name, path, meta });
      }
    }
  });
};

/**
 * Tìm kiếm sâu
 * @param arr
 * @param predicate
 * @returns {*[]}
 */
function deepFind(arr, predicate) {
  const result = [];

  function traverse(items) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      // Nếu phần tử hiện tại là đối tượng, kiểm tra thuộc tính của nó
      if (typeof item === "object" && item !== null) {
        // Kiểm tra thuộc tính `children` có tồn tại không
        if (Array.isArray(item.children)) {
          traverse(item.children);
        }

        // Kiểm tra đối tượng hiện tại có thỏa mãn điều kiện không
        if (predicate(item)) {
          result.push(item);
        }
      } else {
        // Nếu phần tử hiện tại không phải là đối tượng, kiểm tra trực tiếp xem có thỏa mãn điều kiện không
        if (predicate(item)) {
          result.push(item);
        }
      }
    }
  }

  traverse(arr);
  return result;
}

/**
 * Chuyển đổi menu thành route cục bộ, sau đó có thể gọi addRoutes
 * @param menus
 * @param files
 * @returns {*[]}
 */
const menusToLocalRoutes = (menus, files) => {
  const localRoutes = [];
  const routes = [];
  for (const key in files) {
    const module = files[key];
    localRoutes.push({ component: module.default, md5: md5(key), file: key });
  }
  depthForEach(menus, (item) => {
    const routeInfo = localRoutes.find((route) => route.md5 === item.md5);
    if (routeInfo) {
      let { children, ...newItem } = { ...item, ...routeInfo };
      routes.push(newItem);
    }
  });
  return routes;
};

/**
 * Xử lý menu từ backend, icon, đa ngôn ngữ, cần ánh xạ cục bộ để hiển thị, xử lý tại đây
 * @param ctx
 * @param menus
 * @returns {*}
 */
const menusProcessing = (ctx, menus) => {
  ctx.helpers.depthForEach(menus, (item) => {
    const topIds = findParents(menus, item.id); // Lấy ID của menu cha hiện tại
    item.topIds = topIds.map((item) => item.id); // Thêm ID của ứng dụng cấp cao nhất vào mỗi menu
    item.md5 = item.md5 ? item.md5 : item.file ? md5(item.file) : null; // Đánh dấu mỗi dữ liệu
    item.icon = ctx?.helpers?.getIcons?.(ctx, item.icon); // Chuyển đổi icon được truyền vào thành hàm render
    // item.lable = formatTitle(ctx, item, true);
    let extra = item.extra;
    item.extraProps = {
      value: "",
      dot: false,
      size: "small",
      type: "info",
      processing: true,
      show: !!item.extra,
    };
    if (/true/i.test(extra)) {
      item.extraProps.dot = true;
    }
    if (extra && extra.split) {
      let extras = extra.split(",");
      item.extraProps.value = extras[0];
      item.extraProps.type = extras[1] || "info";
    }
    item.extra = () => h(NBadge, { ...item.extraProps });
    item.keepAlive = item.keepAlive ? item.keepAlive : false;
    if (ctx.radash.isArray(topIds)) {
      const topId = topIds[topIds.length - 1];
      item.topId = topId.id !== item.id ? topId.id : null; // Thêm ID của ứng dụng cấp cao nhất vào mỗi menu
    }
  });
  return menus;
};

/**
 * Đóng router
 * @param ctx
 * @param route
 */
function closeTabBarJump(ctx, route) {
  const { tabs, currentRouter } = ctx.app.config.globalProperties.$globalStore;
  let idx = tabs.findIndex((item) => item.id === route.id);
  tabs.length > 1 && tabs.splice(idx, 1);
  if (currentRouter.path === route.path) {
    const tab = idx ? tabs[--idx] : tabs[idx];
    tab && ctx.router.push(tab);
  }
}

/**
 * Chuyển đổi chủ đề
 * @param ctx
 * @param color
 * @param overrides
 */
function cutColorTheme(ctx, color, overrides = {}) {
  const $globalStore = ctx.app.config.globalProperties.$globalStore;

  function setThemeOverrides() {
    const activeColor = color || $globalStore.theme.color;
    const generateColors = generate(activeColor, {
      theme: "dark",
      backgroundColor: commonDark.bodyColor,
    });
    // Ở đây có thể trả về nhiều màu chủ đề hơn, https://liubing.me/article/vue/naive-ui/naive-ui-custom-theme.html#%E6%80%9D%E8%B7%AF%E5%88%86%E6%9E%90
    $globalStore.dispatchThemeOverrides({
      overrides: deepMerge(
        {
          common: {
            primaryColor: generateColors[5],
            primaryColorHover: generateColors[4],
            primaryColorSuppl: generateColors[4],
            primaryColorPressed: generateColors[6],
          },
        },
        overrides
      ),
      color: activeColor,
    });
  }

  setThemeOverrides();
}

/**
 * Hợp nhất nhiều cây
 * @returns {any[]}
 * @param arrays
 */

function deepMergeArrays(...arrays) {
  const result = [];
  const map = new Map();

  // Duyệt tất cả các mảng
  arrays.forEach((array) => {
    array.forEach((item) => {
      if (!map.has(item.path)) {
        map.set(item.path, []);
      }
      map.get(item.path).push(item);
    });
  });

  // Hợp nhất các đối tượng có cùng path
  map.forEach((items, path) => {
    const mergedItem = items.reduce(
      (acc, curr) => {
        // Hợp nhất thuộc tính
        Object.keys(curr).forEach((key) => {
          if (!acc.hasOwnProperty(key) || acc[key] === undefined) {
            acc[key] = curr[key];
          }
        });
        return acc;
      },
      { path }
    );

    result.push(mergedItem);
  });

  return result;
}

/**
 * Hợp nhất nhiều đối tượng
 * @param objects
 * @returns {{}}
 */
function deepMergeObject(...objects) {
  const merged = {};
  for (let obj of objects) {
    if (typeof obj === "object") {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            if (!merged.hasOwnProperty(key)) {
              merged[key] = Array.isArray(obj[key]) ? [] : {};
            }
            merged[key] = deepMergeObject(merged[key], obj[key]);
          } else {
            merged[key] = obj[key];
          }
        }
      }
    }
  }
  return merged;
}

/**
 * Mã hóa đối xứng
 * @param word
 * @param iv
 * @param key
 * @returns {string}
 */
function encrypt(word, iv, key) {
  let str = typeof word == "string" ? word : JSON.stringify(word);
  const srcs = CryptoJS.enc.Utf8.parse(str);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

/**
 * Giải mã đối xứng
 * @param word
 * @param iv
 * @param key
 * @returns {string}
 */
function decrypt(word, iv, key) {
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt);
}

/**
 * Lấy khóa mã hóa
 * @param iv
 * @param key
 * @returns {{CryptoJS, iv: WordArray, key: WordArray}}
 */
function getCrypto({ iv = "", key = "" } = {}) {
  return {
    CryptoJS,
    iv: CryptoJS.enc.Utf8.parse(iv),
    key: CryptoJS.enc.Utf8.parse(key), //16 bit
  };
}

/**
 * Loại bỏ dấu gạch chéo lặp lại
 * @param str
 * @param isHttp
 * @returns {string}
 */
function removeRepeatBias(str = "", isHttp = false) {
  if (isHttp) {
    return str.replace(/([^:])(\/\/+)/g, "$1/"); // Không loại bỏ dấu gạch chéo kép đầu tiên http://
  } else {
    return str.replace(/(\/\/+)/g, "/"); // Loại bỏ tất cả các dấu gạch chéo lặp lại
  }
}

/**
 * Duyệt mảng và lọc thuộc tính
 * @param arr
 * @param predicate
 * @returns {*[]}
 */
function filterOut(arr, predicate) {
  // Tạo một mảng mới để lưu trữ kết quả đã lọc
  const result = [];
  arr.forEach((item) => {
    // Nếu mục hiện tại là đối tượng và có thuộc tính children
    if (
      typeof item === "object" &&
      item !== null &&
      Array.isArray(item.children)
    ) {
      item.children = filterOut(item.children, predicate);
      if (!predicate(item)) {
        result.push(item);
      }
    } else {
      // Nếu mục hiện tại không phải là đối tượng hoặc không có thuộc tính children
      if (!predicate(item)) {
        result.push(item);
      }
    }
  });
  return result;
}

/**
 * Loại bỏ các mục trùng lặp
 * @param arr
 * @param seen
 * @returns {*[]}
 */
function removeDuplicates(arr, seen = new Set()) {
  const result = [];
  for (let item of arr) {
    if (
      typeof item === "object" &&
      item !== null &&
      Array.isArray(item.children)
    ) {
      const filteredChildren = removeDuplicates(item.children, seen);
      if (!seen.has(item.id)) {
        seen.add(item.id);
        result.push({ ...item, children: filteredChildren });
      }
    } else {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        result.push(item);
      }
    }
  }
  return result;
}

/**
 * Loại bỏ menu không có con
 * @param arr
 * @param id
 * @returns {*}
 * @returns {*}
 */
function removeZeroChildren(arr, id) {
  depthForEach(arr, (item) => {
    if (item.children && item.children.length === 0) {
      delete item.children;
    }
  });
  return arr;
}

/**
 * Thêm tham số vào URL
 * @param url
 * @param params
 * @returns {string}
 */
function addParamsToUrl(url, params) {
  // Kiểm tra URL đã có chuỗi truy vấn chưa
  let hasQuery = url.indexOf("?") !== -1;
  // Tạo đối tượng URLSearchParams để xử lý tham số
  const searchParams = new URLSearchParams(hasQuery ? url.split("?")[1] : "");
  // Duyệt qua đối tượng tham số và thêm vào searchParams
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      searchParams.set(key, params[key]);
    }
  }
  // Xây dựng lại URL
  return `${url.split("?")[0]}?${searchParams.toString()}`;
}

/**
 * Sao chép sâu
 * @param obj
 * @param cache
 * @returns {*|Date|Map<undefined, *>|Set<*>|RegExp}
 */
function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (cache.has(obj)) return cache.get(obj);
  let clone;
  if (obj instanceof Date) {
    clone = new Date(obj.getTime());
  } else if (obj instanceof RegExp) {
    clone = new RegExp(obj);
  } else if (obj instanceof Map) {
    clone = new Map(
      Array.from(obj, ([key, value]) => [key, deepClone(value, cache)])
    );
  } else if (obj instanceof Set) {
    clone = new Set(Array.from(obj, (value) => deepClone(value, cache)));
  } else if (Array.isArray(obj)) {
    clone = obj.map((value) => deepClone(value, cache));
  } else if (Object.prototype.toString.call(obj) === "[object Object]") {
    clone = Object.create(Object.getPrototypeOf(obj));
    cache.set(obj, clone);
    for (const [key, value] of Object.entries(obj)) {
      clone[key] = deepClone(value, cache);
    }
  } else {
    clone = Object.assign({}, obj);
  }
  cache.set(obj, clone);
  return clone;
}

/**
 * Hợp nhất sâu
 * @param target
 * @param source
 * @returns {any[]|any|Date|Map<undefined, *>|Set<*>|RegExp}
 */
function deepMerge(target = {}, source = {}) {
  target = deepClone(target);
  if (
    typeof target !== "object" ||
    target === null ||
    typeof source !== "object" ||
    source === null
  )
    return target;
  const merged = Array.isArray(target)
    ? target.slice()
    : Object.assign({}, target);
  for (const prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    const sourceValue = source[prop];
    const targetValue = merged[prop];
    if (sourceValue instanceof Date) {
      merged[prop] = new Date(sourceValue);
    } else if (sourceValue instanceof RegExp) {
      merged[prop] = new RegExp(sourceValue);
    } else if (sourceValue instanceof Map) {
      merged[prop] = new Map(sourceValue);
    } else if (sourceValue instanceof Set) {
      merged[prop] = new Set(sourceValue);
    } else if (typeof sourceValue === "object" && sourceValue !== null) {
      merged[prop] = deepMerge(targetValue, sourceValue);
    } else {
      merged[prop] = sourceValue;
    }
  }
  return merged;
}

/**
 * Giải quyết lỗi sự kiện trình duyệt
 */
function browserPatch() {
  if (typeof EventTarget !== "undefined") {
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type, fn, capture) {
      if (typeof capture !== "boolean") {
        capture = capture || {};
        capture.passive = false;
      }
      originalAddEventListener.call(this, type, fn, capture);
    };
  }
}

/**
 * Sao chép văn bản
 * @param text
 */
function clipboardCopy(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    let textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.style.position = "fixed";
    textarea.style.clip = "rect(0 0 0 0)";
    textarea.style.top = "10px";
    textarea.value = text;
    textarea.select();
    document.execCommand("copy", true);
    // Loại bỏ input
    document.body.removeChild(textarea);
  }
}

/**
 * Đọc file cục bộ
 * @param filePath
 * @returns {string|null}
 */
function readFile(filePath) {
  // Tạo một đối tượng xhr mới
  let xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    // eslint-disable-next-line
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  const okStatus = document.location.protocol === "file" ? 0 : 200;
  xhr.open("GET", filePath, false);
  xhr.overrideMimeType("text/html;charset=utf-8");
  xhr.send(null);
  return xhr.status === okStatus ? xhr.responseText : null;
}

function checkURL(url) {
  let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  let objExp = new RegExp(Expression);
  return objExp.test(url) === true;
}

function isMatch(str, obj) {
  const processString = (s) => String(s || "").replace(/^\/+|\/+$/g, "");
  const processedStr = processString(str);

  const target = typeof obj === "string" ? { name: obj, path: obj } : obj || {};
  const processedName = processString(target.name);
  const processedPath = processString(target.path);
  return processedStr === processedName || processedStr === processedPath;
}

export {
  renderIcon,
  depthForEach,
  findParents,
  lscache,
  formatTitle,
  nanoid,
  buildTree,
  addRoutes,
  menusToLocalRoutes,
  menusProcessing,
  closeTabBarJump,
  cutColorTheme,
  deepMergeArrays,
  deepMergeObject,
  encrypt,
  decrypt,
  removeRepeatBias,
  deepFind,
  filterOut,
  removeDuplicates,
  getCrypto,
  md5,
  addParamsToUrl,
  LargeUploadFile,
  deepClone,
  deepMerge,
  automaticUpdate,
  icons,
  browserPatch,
  clipboardCopy,
  highHtml,
  readFile,
  checkURL,
  removeZeroChildren,
  isMatch,
};
