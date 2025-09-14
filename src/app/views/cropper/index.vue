<template>
  <n-grid cols="12" y-gap="20" x-gap="20" item-responsive responsive="screen">
    <n-grid-item span="12 m:12 l:6">
      <n-card
        title="Cắt ảnh"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <div>
          <img id="image" src="@/packages/assets/yanghang.jpg" alt="Image" />
        </div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script setup>
const image = ref(null);
import Cropper from "cropperjs";
onMounted(() => {
  const cropper = new Cropper(document.getElementById("image"), {
    aspectRatio: 16 / 9, // Tỉ lệ khung cắt
    autoCropArea: 0.8, // Khu vực cắt tự động, so với ảnh gốc
    viewMode: 1, // Chế độ hiển thị: 0-khung không di chuyển, 1-khung di chuyển, 2-khung tự do
    movable: true, // Cho phép di chuyển khung cắt
    zoomable: true, // Cho phép phóng to/thu nhỏ ảnh
    rotatable: true, // Cho phép xoay ảnh
    guides: true, // Hiển thị đường viền khung cắt
    background: true, // Hiển thị lưới nền
    cropBoxMovable: true, // Cho phép kéo khung cắt
    cropBoxResizable: true, // Cho phép thay đổi kích thước khung cắt
    minCropBoxWidth: 100, // Chiều rộng tối thiểu của khung cắt
  });
});
</script>
