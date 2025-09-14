<template>
  <div class="h-full flex items-center justify-center mt-[-100px]">
    <n-result
      v-if="!route.path.includes('form_')"
      size="huge"
      status="404"
      title="404 Không tìm thấy, đã mất, lỗi,"
      description="Mọi thứ đều không cần nói thêm, hãy cho một cơ hội nữa"
    >
      <template #footer>
        <n-button type="primary" :loading="loading" @click="handleClick"
          >Vào lại hệ thống</n-button
        >
      </template>
    </n-result>
    <div v-else>
      {{ router.go(-1) }}
    </div>
    {{ handleErrorTips($global) }}
  </div>
</template>
<style lang="less" scoped></style>
<script setup>
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";

const loading = ref(false);
const router = useRouter();
const route = useRoute();
let timer = null;
const handleClick = () => {
  loading.value = true;
  if (timer) {
    return window.location.reload();
  }
  timer = setTimeout(() => {
    router.push("/");
    loading.value = false;
  }, 800);
};
const handleErrorTips = (ctx) => {
  if (!ctx?.apis) {
    ctx?.naive?.message?.error?.("Vui lòng cài đặt plugin apis-plugin trước");
    router.push("/login");
  }
};
onBeforeRouteLeave(() => {
  timer && clearInterval(timer);
});
</script>
