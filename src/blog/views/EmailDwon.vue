<template>
  <section
    class="py-[50px] text-white bg-[#0000007F] flex flex-col items-center section-container"
  >
    <h1
      class="text-[50px] font-bold text-center wow animate__animated animate__bounce"
      data-wow-duration="1.0s"
      data-wow-delay="0.2s"
    >
      Không muốn tải về?
    </h1>
    <p class="mb-10 text-center">
      Nếu bạn không muốn tải về, hãy nhập email của bạn bên dưới, hệ thống sẽ
      gửi mã nguồn mới nhất cho bạn...
    </p>
    <div class="flex justify-center items-center w-[45%]">
      <n-input
        class="wow animate__animated animate__headShake"
        data-wow-duration="1.0s"
        data-wow-delay="0.2s"
        v-model="compData.email"
        placeholder="Nhập email của bạn"
        size="large"
      />
      <n-button
        :loading="compData.loading"
        class="wow animate__animated animate__headShake"
        data-wow-duration="1.0s"
        data-wow-delay="0.2s"
        style="flex-shrink: 0"
        type="success"
        size="large"
        @click="handleSendEmail"
        >Gửi
      </n-button>
    </div>
  </section>
</template>
<script setup>
const compData = reactive({
  email: "",
  loading: false,
});
const handleSendEmail = () => {};
</script>
