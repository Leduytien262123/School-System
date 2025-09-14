# Quản lý trạng thái Pinia

Framework đã tích hợp sẵn thư viện quản lý trạng thái `pinia`, `pinia-plugin-persistedstate` và plugin lưu trữ dữ liệu, cách sử dụng chi tiết xem tại [pinia 官网](https://pinia.vuejs.org/zh/core-concepts/)

::: tip

Trong framework, store của pinia hiện tại đã được gắn vào toàn cục, bạn có thể sử dụng trực tiếp `$globalStore` trong template

app.config.globalProperties.$globalStore = window.$globalStore = useGlobalStore()
:::

## Định nghĩa Store

```javascript
import { defineStore } from "vue-bag-admin/pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0, name: "Eduardo" }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
  // Lưu trữ dữ liệu
  persist: {
    key: "pinia", // Tên lưu trữ
    storage: localStorage, // Phương thức lưu trữ
    // Chỉ định những dữ liệu nào trong state cần lưu trữ. [] là không lưu gì, undefined hoặc null là lưu toàn bộ state
    paths: ["count"],
  },
});
```

::: tip Mẹo nhỏ
Nếu muốn có hiệu lực ngay khi làm mới trang, cần import và thực thi `useCounterStore()` trong `main.js`
:::

## Sử dụng Store

```vue
<script setup>
import { useCounterStore } from "@/stores/counter";
// Có thể truy cập biến `store` ở bất kỳ đâu trong component ✨
const store = useCounterStore();
</script>
```

## Sử dụng Pinia thông qua các hàm trợ giúp ánh xạ

```vue {8-10}
<script setup>
import { useCounterStore } from "@/stores/counter";
import { computed } from "vue";

const store = useCounterStore();
// ❌ Điều này sẽ không hoạt động vì nó phá vỡ tính phản ứng
// Giống như việc giải cấu trúc trực tiếp `props`
const { name, doubleCount } = store;
name; // Sẽ luôn là "Eduardo"
doubleCount; // Sẽ luôn là 0
setTimeout(() => {
  store.increment();
}, 1000);
// ✅ Viết như thế này là phản ứng
// 💡 Tất nhiên bạn cũng có thể sử dụng trực tiếp `store.doubleCount`
const doubleValue = computed(() => store.doubleCount);
</script>
```

## Giải cấu trúc từ Store

```vue
<script setup>
import { storeToRefs } from "pinia";

const store = useCounterStore();
// `name` và `doubleCount` là các ref phản ứng
// Các thuộc tính được thêm vào thông qua plugin cũng sẽ được trích xuất thành ref
// Và sẽ bỏ qua tất cả các action hoặc các thuộc tính không phản ứng (không phải ref hoặc reactive)
const { name, doubleCount } = storeToRefs(store);
// Là một action, increment có thể được giải cấu trúc trực tiếp
const { increment } = store;
</script>
```
