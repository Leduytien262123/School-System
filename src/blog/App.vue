<template>
  <div>
    <img class="vergas" src="@/blog/assets/bg6.png" alt="" />
    <template v-for="item in comps">
      <component :is="item.components"></component>
    </template>
  </div>
</template>
<script setup>
const files = import.meta.glob(`@/blog/views/**/*.vue`, { eager: true });
const comps = [
  { title: "Trang chủ", name: "Home" },
  { title: "Đặc điểm", name: "Trait" },
  { title: "", name: "Viewing" },
  { title: "Bài viết", name: "Blog" },
  { title: "Lời mở đầu", name: "Preface" },
  { title: "", name: "Quantity" },
  { title: "Tải về", name: "Download" },
  { title: "Phát triển", name: "Develop" },
  { title: "", name: "EmailDwon" },
  { title: "Đánh giá", name: "Evaluate" },
  { title: "Liên hệ", name: "Message" },
  { title: "", name: "Footer" },
];
comps.forEach((item) => {
  for (const key in files) {
    const module = files[key];
    if (key.indexOf(item.name) > -1) {
      item.components = module.default;
    }
  }
});
</script>
<style scoped>
.vergas {
  position: fixed;
  left: 0;
  right: 0;
  height: 850px;
  width: 100%;
  object-fit: cover;
}
</style>
