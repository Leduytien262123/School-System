<template>
  <section class="section-container bg-white text-center py-[120px]">
    <h1 class="text-[50px] font-bold">Đặc điểm</h1>
    <p class="text-[#808080] mb-10">
      So với các hệ thống khác, Bag luôn giữ phong cách riêng của mình.
    </p>
    <n-grid cols="12" item-responsive responsive="screen" :x-gap="20">
      <n-grid-item
        v-for="item in compData.btns"
        class="trait-item mb-4 text-center wow animate__animated"
        data-wow-duration="1.0s"
        data-wow-delay="0.5"
        span="12 m:4 l:3"
      >
        <div
          class="trait-item-round"
          :class="[
            'w-[145px] transition-all h-[145px] m-[auto] rounded-full border-[10px] border-slate-100 flex items-center justify-center',
          ]"
        >
          <n-icon size="60" :color="item.color">
            <component :is="item.icon"></component>
          </n-icon>
        </div>
        <h5 class="text-[17px] relative font-bold mt-[20px] mb-4">
          {{ item.title }}
        </h5>
        <p class="text-[14px] text-[#808080] text-center leading-6">
          {{ item.des }}
        </p>
      </n-grid-item>
    </n-grid>
  </section>
</template>
<script setup>
import {
  DesktopOutline,
  DiscOutline,
  PlanetOutline,
  HappyOutline,
} from "@vicons/ionicons5";

const compData = reactive({
  btns: [
    {
      title: "Phát triển đáp ứng",
      des: "Giao diện dựa trên tailwindcss, tự động thích ứng PC và di động, tăng tính đáp ứng và khả năng sử dụng, cung cấp nhiều giao diện đẹp, giảm chi phí phát triển và bảo trì.",
      icon: markRaw(DesktopOutline),
      animateClass: "animate__bounceInLeft",
      duration: "1.0s",
      color: "#e96656",
    },
    {
      title: "Dễ sử dụng",
      des: "Cài đặt qua npm hoặc tải mã nguồn để phát triển, tách biệt framework (packages) và ứng dụng (app), giảm sự phụ thuộc giữa các dự án, tăng khả năng mở rộng.",
      icon: markRaw(DiscOutline),
      animateClass: "animate__bounceInLeft",
      duration: "1.5s",
      color: "#34d293",
    },
    {
      title: "Cộng đồng mạnh",
      des: "Sử dụng các công nghệ phổ biến như Vue3, Vite5, Naive-ui, Pinia, Strapi5, MySQL... hoàn toàn miễn phí, không lo giới hạn framework, có thể dùng thương mại.",
      icon: markRaw(PlanetOutline),
      animateClass: "animate__bounceInRight",
      duration: "1.5s",
      color: "#3ab0e2",
    },
    {
      title: "Đối tượng phù hợp",
      des: "1. Muốn phát triển website nhanh bằng framework, có kinh nghiệm frontend 1 năm+, 2. Thành thạo Vue.js, từng làm dự án thực tế, 3. Yêu thích công nghệ, ham học hỏi, muốn nâng cao trình độ.",
      icon: markRaw(HappyOutline),
      animateClass: "animate__bounceInRight",
      duration: "1.0s",
      color: "#f7d861",
    },
  ],
});
</script>
<style lang="less" scoped>
.trait-item {
  h5 {
    &:before {
      position: absolute;
      z-index: 1;
      content: "";
      width: 20%;
      height: 2px;
      bottom: -5px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
.trait-item:nth-child(1) {
  h5 {
    &:before {
      background-color: #e96656;
    }
  }
  .trait-item-round {
    &:hover {
      border-color: #e96656;
    }
  }
}

.trait-item:nth-child(2) {
  h5 {
    &:before {
      background-color: #34d293;
    }
  }
  .trait-item-round {
    &:hover {
      border-color: #34d293;
    }
  }
}

.trait-item:nth-child(3) {
  h5 {
    &:before {
      background-color: #3ab0e2;
    }
  }
  .trait-item-round {
    &:hover {
      border-color: #3ab0e2;
    }
  }
}

.trait-item:nth-child(4) {
  h5 {
    &:before {
      background-color: #f7d861;
    }
  }
  .trait-item-round {
    &:hover {
      border-color: #f7d861;
    }
  }
}
</style>
