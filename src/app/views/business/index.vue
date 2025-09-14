<template>
  <n-grid cols="12" y-gap="20" x-gap="20" item-responsive responsive="screen">
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Tùy theo nghiệp vụ của bạn, không cần hiển thị menu điều hướng và các module bổ sung"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;"
      >
        Nội dung nghiệp vụ của bạn
        <n-button @click="$global.router.back()">Quay lại</n-button>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script setup></script>
