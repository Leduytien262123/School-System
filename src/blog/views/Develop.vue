<template>
  <section class="py-[80px] bg-[#FFFFFF] text-white section-container">
    <h1 class="text-[50px] text-[#333] font-bold text-center">
      Phát triển chủ đề
    </h1>
    <p class="text-[#808080] mb-10 text-center">
      Bag là một hệ thống mã nguồn mở, mong muốn có nhiều người cùng tôi phát
      triển chủ đề.
    </p>
    <div>
      <n-grid
        cols="12"
        item-responsive
        responsive="screen"
        y-gap="10"
        x-gap="20"
      >
        <n-grid-item
          v-for="item in compData.items"
          class="wow animate__animated animate__fadeInTopLeft"
          data-wow-duration="1.0s"
          data-wow-delay="0.2s"
          span="12 m:12 l:6"
        >
          <div class="flex items-center py-[20px] px-[10px]">
            <n-icon size="60" :color="item.color">
              <component :is="item.icon"></component>
            </n-icon>
            <div class="flex pl-2 flex-col justify-between">
              <h5 class="text-[14px] text-[#333] font-bold">
                {{ item.title }}
              </h5>
              <p class="text-[#333]">{{ item.des }}</p>
            </div>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
  </section>
</template>
<script setup>
import {
  LogoIonic,
  LogoNodejs,
  ColorPaletteOutline,
  BicycleSharp,
  Construct,
  HappyOutline,
} from "@vicons/ionicons5";

const compData = reactive({
  items: [
    {
      title: "Khéo tay",
      des: "Tôi tập trung vào lĩnh vực của mình, luôn có quan điểm riêng cho mọi việc, tự tay thực hiện để kiểm chứng có đúng như kỳ vọng không.",
      icon: markRaw(Construct),
      color: "#3ab0e2",
    },
    {
      title: "Hiểu kỹ thuật",
      des: "Thành thạo JavaScript/Node, nắm vững framework Vue/Egg.js, sử dụng thành thạo các plugin hệ sinh thái Vue, hiểu nguyên lý webpack, gulp, nginx, có kiến thức tốt về cơ sở dữ liệu.",
      icon: markRaw(LogoNodejs),
      color: "#e96656",
    },
    {
      title: "Linh hoạt",
      des: "Khi thấy thiết kế đẹp, tôi biết cách tạo ra template tốt, đồng thời phát hiện điểm chưa ổn của chương trình Bag để đề xuất cải tiến.",
      icon: markRaw(HappyOutline),
      color: "#34d293",
    },
    {
      title: "Hiếu kỳ",
      des: "Là lập trình viên hiếu kỳ, tôi luôn hướng tới đổi mới công nghệ, thích suy nghĩ, nghiên cứu và giải quyết vấn đề.",
      icon: markRaw(LogoIonic),
      color: "#409eff",
    },
    {
      title: "Có thẩm mỹ",
      des: "Biết phối màu, bố cục website hợp lý, sắp xếp module logic, sử dụng CSS3 và JavaScript để tạo hiệu ứng phản hồi người dùng đơn giản.",
      icon: markRaw(ColorPaletteOutline),
      color: "#ffca28",
    },
    {
      title: "Kiên nhẫn",
      des: "Làm ra một chủ đề tốt như người thợ mộc, cần tỉ mỉ, kiên nhẫn, tận tâm. Có những việc không phải thấy hy vọng mới kiên trì, mà kiên trì rồi mới thấy hy vọng.",
      icon: markRaw(BicycleSharp),
      color: "#4fc3f7",
    },
  ],
});
</script>
<style lang="less" scoped></style>
