<template>
  <section class="py-[60px] bg-[#00000033] section-container">
    <h1 class="text-[50px] text-white font-bold text-center">
      Liên hệ với tôi
    </h1>
    <p class="text-white mb-10 text-center">
      Nếu bạn có thắc mắc khác, hãy gửi tin nhắn bên dưới để liên hệ với tôi
      (vấn đề sử dụng blog vui lòng tham gia nhóm hoặc xem tài liệu hướng dẫn).
    </p>
    <n-grid
      cols="12"
      item-responsive
      responsive="screen"
      :x-gap="30"
      y-gap="10"
    >
      <n-grid-item
        class="message-input wow animate__animated animate__bounce"
        data-wow-duration="1.0s"
        data-wow-delay="0.2s"
        span="12 m:12 l:4"
      >
        <n-input
          v-model="compData.fromData.name"
          placeholder="Tên của bạn"
          size="large"
        />
      </n-grid-item>
      <n-grid-item
        class="message-input wow animate__animated animate__bounce"
        data-wow-duration="1.4s"
        data-wow-delay="0.2s"
        span="12 m:12 l:4"
      >
        <n-input
          v-model="compData.fromData.email"
          placeholder="Email của bạn"
          size="large"
        />
      </n-grid-item>
      <n-grid-item
        class="message-input wow animate__animated animate__bounce"
        data-wow-duration="1.8s"
        data-wow-delay="0.2s"
        span="12 m:12 l:4"
      >
        <n-input
          v-model="compData.fromData.url"
          placeholder="Website của bạn (có thể để trống)"
          size="large"
        />
      </n-grid-item>
    </n-grid>
    <div class="flex mt-3">
      <n-input
        class="wow animate__animated animate__fadeInUp"
        data-wow-duration="1.0s"
        data-wow-delay="0.2s"
        v-model="compData.fromData.message"
        :rows="6"
        type="textarea"
        maxlength="500"
        show-word-limit
        placeholder="Nội dung tin nhắn"
      />
    </div>
    <div class="flex justify-end mt-3">
      <n-button
        class="wow animate__animated animate__fadeInUp"
        data-wow-duration="1.4s"
        data-wow-delay="0.2s"
        type="success"
        size="large"
        :disabled="compData.disabled"
      >
        {{ compData.text }}
      </n-button>
    </div>
  </section>
</template>
<script setup>
const compData = reactive({
  fromData: {
    email: "",
    name: "",
    url: "",
    message: "",
  },
  text: "提交留言",
  disabled: false,
});
</script>
