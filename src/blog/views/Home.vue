<template>
  <section class="section-container py-[220px] bg-[#0000007F]">
    <div class="text-center">
      <h1
        class="text-white text-[60px] font-bold wow animate__animated animate__slideInDown"
      >
        Giúp lập trình viên hoàn thành dự án với chi phí tối thiểu, giảm khối
        lượng công việc phát triển
      </h1>
    </div>
    <div class="action">
      <n-grid cols="12" item-responsive responsive="screen">
        <n-grid-item
          class="text-center mt-10"
          span="12 m:4 l:3"
          v-for="item in compData.btns"
        >
          <n-button
            :class="['wow animate__animated', item.className]"
            target
            @click="handleSkip(item)"
            size="large"
            :type="item.type"
          >
            {{ item.title }}
          </n-button>
        </n-grid-item>
      </n-grid>
    </div>
  </section>
</template>
<script setup>
const compData = reactive({
  btns: [
    {
      url: "/admin",
      title: "Trải nghiệm online",
      type: "success",
      className: "animate__slideInLeft",
    },
    {
      url: "/doc/index.html",
      title: "Xem tài liệu",
      type: "warning",
      className: "animate__slideInLeft",
    },
    {
      url: "",
      title: "Xem ứng dụng client",
      type: "info",
      className: "animate__slideInRight",
    },
    {
      title: "Tải mã nguồn",
      type: "error",
      url: "https://github.com/hangjob/vue-bag-admin",
      className: "animate__slideInRight",
    },
  ],
});
const handleSkip = (item) => {
  if (item.url) {
    window.open(item.url, item.url);
  } else {
    $global.naive.notification.info({
      title: "Sắp ra mắt",
      content:
        "Đang sử dụng Tauri2.0 để xây dựng ứng dụng client nhỏ gọn, an toàn hơn. Vui lòng chờ đợi!",
      duration: 3000,
    });
  }
};
</script>
