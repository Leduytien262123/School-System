<template>
  <section class="section section-container">
    <div class="section-title">
      <h1 class="text-[50px] font-bold">Bài viết blog</h1>
      <p class="text-[#808080] mb-10">
        Đây là một số bài viết do tác giả Bag viết
      </p>
    </div>
    <div class="article">
      <n-grid cols="12" item-responsive responsive="screen" :x-gap="20">
        <template v-for="(item, index) in compData.items">
          <n-grid-item
            class="wow animate__animated animate__zoomIn"
            span="12 m:4 l:3"
            data-wow-duration="1.0s"
            :data-wow-delay="index / 8 + 's'"
          >
            <Article :itemData="item" :itemSumData="item.itemSumData" />
          </n-grid-item>
        </template>
      </n-grid>
    </div>
  </section>
</template>
<script setup>
import Article from "@/blog/components/Article.vue";

const items = [
  {
    pic: "https://www.vipbic.com/uploads/20240420/a5867d4089a7c3de9ac39503195d7597.jpg",
    title: "Rốt cuộc cuộc sống như thế nào mới gặp được người phù hợp",
    keywords: ["Niềm vui cuộc sống", "Cổ trấn Tân Thị"],
    category: {
      name: "Kỹ thuật",
    },
    member: {
      username: "Thông tin",
    },
    time: "2023-11-02",
    itemSumData: [],
  },
  {
    pic: "https://www.vipbic.com/uploads/20240413/7296c5af4c3d49fce47a29ba7db5d866.jpg",
    title: "30 tuổi nên đi đâu về đâu",
    keywords: ["Niềm vui cuộc sống"],
    category: {
      name: "Ba mươi tuổi",
    },
    member: {
      username: "",
    },
    time: "2023-11-02",
    url: "https://www.vipbic.com/thread.html?id=801",
  },
  {
    pic: "https://www.vipbic.com/uploads/20231111/9d3f37a78688be3dbe9a55ba174f1d82.jpg",
    title: "Một người - một thành phố, một người làm rất nhiều việc",
    keywords: ["Niềm vui cuộc sống"],
    category: {
      name: "Viết chữ",
    },
    member: {
      username: "Ông Dương",
    },
    time: "2023-11-11",
    url: "https://www.vipbic.com/thread.html?id=788",
  },
  {
    pic: "https://www.vipbic.com/uploads/20240420/a5867d4089a7c3de9ac39503195d7597.jpg",
    title: "Cuộc sống hai điểm một đường",
    keywords: ["Niềm vui cuộc sống"],
    category: {
      name: "Chị cả",
    },
    member: {
      username: "Ông Dương",
    },
    time: "2024-01-30",
    url: "https://www.vipbic.com/thread.html?id=795",
  },
  {
    pic: "https://www.vipbic.com/uploads/20240110/33c50ac15376d0518dbbf881a51ab2e1.jpg",
    title: 'Về nguồn gốc của "Công cụ lựa chọn nghiêm ngặt"',
    keywords: ["Niềm vui cuộc sống"],
    category: {
      name: "Công cụ lựa chọn nghiêm ngặt",
    },
    member: {
      username: "Ông Dương",
    },
    time: "2024-01-10",
    url: "https://www.vipbic.com/thread.html?id=792",
  },
  {
    pic: "https://www.vipbic.com/uploads/20230911/350a459094e011a812c0bcf011cf2729.jpg",
    title:
      "Con nhà nghèo trưởng thành, chỉ có thể dùng chi phí thời gian để thử và sai",
    keywords: ["Niềm vui cuộc sống"],
    category: {
      name: "Thời gian",
    },
    member: {
      username: "Ông Dương",
    },
    time: "2023-09-11",
    url: "https://www.vipbic.com/thread.html?id=780",
  },
  {
    pic: "https://www.vipbic.com/uploads/20211017/e0d9b7781ab3d2095855087dcaff531a.jpg",
    title: "Hai ngày không tiến bộ",
    keywords: ["Trò chơi"],
    category: {
      name: "Niềm vui cuộc sống",
    },
    member: {
      username: "Ông Dương",
    },
    time: "2023-03-10",
    url: "https://www.vipbic.com/thread.html?id=800",
  },
  {
    pic: "https://www.vipbic.com/uploads/20230826/28da20efd455f88002fa5c6bd6302d9b.jpg",
    title: "30 tuổi vẫn còn độc thân, nên làm gì?",
    keywords: ["Niềm vui cuộc sống"],
    category: {
      name: "Đã cố gắng rất lâu",
    },
    member: {
      username: "Ông Dương",
    },
    time: "2023-11-02",
    url: "https://www.vipbic.com/thread.html?id=785",
  },
];

const imgs = items.map((item) => {
  return { pic: item.pic };
});
items[0].itemSumData = imgs;
const compData = reactive({
  items,
});
</script>
<style lang="less" scoped>
.section {
  padding-top: 60px;
  padding-bottom: 60px;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;

  &-title {
    margin-bottom: 30px;
    text-align: center;

    h1 {
      font-size: 50px;
      font-weight: bold;
    }
  }

  .action {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
