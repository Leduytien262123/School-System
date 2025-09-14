<template>
  <section class="py-[80px] bg-[#3f5256] text-white section-container">
    <h1 class="text-[50px] font-bold text-center">Tải về</h1>
    <p class="text-[#808080] mb-10 text-center">
      Dưới đây là các phiên bản gần đây của Bag để tải về.
    </p>
    <n-grid cols="12" item-responsive responsive="screen" :x-gap="20">
      <n-grid-item
        class="wow animate__animated animate__slideInRight"
        data-wow-duration="2.0s"
        data-wow-delay="0.5s"
        span="12 m:6 l:3"
      >
        <div class="package-item mt-[25px] rounded-[4px] bg-white">
          <div
            class="h-[82px] bg-[#e96656] flex flex-col items-center justify-center"
          >
            <h4 class="text-[14px] font-bold">V5.1</h4>
            <p>Phiên bản mới nhất</p>
          </div>
          <div class="bg-[#404040]">
            <h4 class="text-[40px] font-normal text-center py-5">773KB</h4>
          </div>
          <ul class="p">
            <li>Ngày phát hành: 2024-10-06</li>
            <li>Mô tả: Thiết kế mới, cách phát triển mới</li>
            <li>Mô tả: Phát triển dạng plugin</li>
            <li>Mô tả: Strapi</li>
            <li style="display: flex; justify-content: center">
              <n-button>Xem giới thiệu</n-button>
            </li>
          </ul>
          <div class="pt-1 pb-3 flex justify-center items-center">
            <n-button color="#e96656" size="large" @click="handleDownload"
              >Tải chương trình</n-button
            >
          </div>
        </div>
      </n-grid-item>
      <n-grid-item
        class="wow animate__animated animate__slideInRight"
        data-wow-duration="2.0s"
        data-wow-delay="0.5s"
        span="12 m:6 l:3"
      >
        <div class="package-item mt-[60px] rounded-[4px] bg-white">
          <div
            class="h-[82px] bg-[#99CC33] flex flex-col items-center justify-center"
          >
            <h4 class="text-[14px] font-bold">V4.1</h4>
            <p>Phiên bản mới nhất</p>
          </div>
          <div class="bg-[#404040]">
            <h4 class="text-[40px] font-normal text-center py-5">2.06M</h4>
          </div>
          <ul class="p">
            <li>Ngày phát hành: 2023-09-15</li>
            <li>Mô tả: Thiết kế hoàn toàn mới, nhỏ gọn và mạnh mẽ hơn</li>
            <li>Mô tả: Naive UI</li>
            <li>Mô tả: Dữ liệu Mock</li>
            <li style="display: flex; justify-content: center">
              <n-button>Xem giới thiệu</n-button>
            </li>
          </ul>
          <div class="pt-1 pb-3 flex justify-center items-center">
            <n-button color="#99CC33" size="large" @click="handleDownload"
              >Tải chương trình</n-button
            >
          </div>
        </div>
      </n-grid-item>
      <n-grid-item
        class="wow animate__animated animate__slideInRight"
        data-wow-duration="1.8s"
        data-wow-delay="0.5"
        span="12 m:6 l:3"
      >
        <div class="package-item mt-[60px] rounded-[4px] bg-white">
          <div
            class="h-[82px] bg-[#E7AC44] flex flex-col items-center justify-center"
          >
            <h4 class="text-[14px] font-bold">v3.1</h4>
            <p>Phiên bản mới nhất</p>
          </div>
          <div class="bg-[#404040]">
            <h4 class="text-[40px] font-normal text-center py-5">2.25M</h4>
          </div>
          <ul>
            <li>Ngày phát hành: 2022-04-15</li>
            <li>Mô tả: Thêm mở rộng</li>
            <li>Mô tả: Cập nhật frontend</li>
            <li>Mô tả: node, mysql</li>
            <li style="display: flex; justify-content: center">
              <n-button type="primary">Xem giới thiệu</n-button>
            </li>
          </ul>
          <div class="pt-1 pb-3 flex justify-center items-center">
            <n-button size="large" color="#E7AC44" @click="handleDownload"
              >Tải chương trình</n-button
            >
          </div>
        </div>
      </n-grid-item>
      <n-grid-item
        class="wow animate__animated animate__slideInRight"
        data-wow-duration="1.4s"
        data-wow-delay="0.5"
        span="12 m:6 l:3"
      >
        <div class="package-item mt-[60px] rounded-[4px] bg-white">
          <div
            class="h-[82px] bg-[#3ab0e2] flex flex-col items-center justify-center"
          >
            <h4 class="text-[14px] font-bold">V2.0</h4>
            <p>Phiên bản mới nhất</p>
          </div>
          <div class="bg-[#404040]">
            <h4 class="text-[40px] font-normal text-center py-5">2.14M</h4>
          </div>
          <ul>
            <li>Ngày phát hành: 2022-01-20</li>
            <li>Mô tả: Điều chỉnh framework, sửa nhiều lỗi</li>
            <li>Mô tả: Cập nhật backend</li>
            <li>Mô tả: thinkphp5</li>
            <li style="display: flex; justify-content: center">
              <n-button type="primary">Xem giới thiệu </n-button>
            </li>
          </ul>
          <div class="pt-1 pb-3 flex justify-center items-center">
            <n-button
              color="#3ab0e2"
              @click="
                handleDownload(
                  'https://github.com/hangjob/vue-bag-admin/archive/refs/tags/v2.0.0.zip'
                )
              "
              size="large"
              >Tải chương trình
            </n-button>
          </div>
        </div>
      </n-grid-item>
      <!--            <n-grid-item class="wow animate__animated animate__slideInRight" data-wow-duration="1.0s"-->
      <!--                         data-wow-delay="0.5"-->
      <!--                         span="12 m:6 l:3"-->
      <!--            >-->
      <!--                <div class="package-item mt-[60px] rounded-[4px] bg-white">-->
      <!--                    <div class="h-[82px] bg-[#34d293] flex flex-col items-center justify-center">-->
      <!--                        <h4 class="text-[14px] font-bold">V1.0</h4>-->
      <!--                        <p>Phiên bản mới nhất</p>-->
      <!--                    </div>-->
      <!--                    <div class="bg-[#404040]">-->
      <!--                        <h4 class="text-[40px] font-normal text-center py-5">1.18M</h4>-->
      <!--                    </div>-->
      <!--                    <ul>-->
      <!--                        <li>Ngày phát hành: 2021-10-26</li>-->
      <!--                        <li>Mô tả: Một bag mới</li>-->
      <!--                        <li>Mô tả: Ant Design Vue</li>-->
      <!--                        <li>Mô tả: Frontend đơn giản (không có)</li>-->
      <!--                        <li style="display: flex;justify-content: center">-->
      <!--                            <n-button type="primary">-->
      <!--                                Xem giới thiệu-->
      <!--                            </n-button>-->
      <!--                        </li>-->
      <!--                    </ul>-->
      <!--                    <div class="pt-1 pb-3 flex justify-center items-center">-->
      <!--                        <n-button color="#34d293" size="large"-->
      <!--                                  @click="handleDownload('https://github.com/hangjob/vue-bag-admin/archive/refs/heads/v1.zip')">-->
      <!--                            Tải chương trình-->
      <!--                        </n-button>-->
      <!--                    </div>-->
      <!--                </div>-->
      <!--            </n-grid-item>-->
    </n-grid>
  </section>
</template>
<script setup>
const images = ref([
  { src: "https://s1.ax1x.com/2022/05/12/O0R3TO.png" },
  { src: "https://s1.ax1x.com/2022/05/12/O0RB0f.png" },
  { src: "https://s1.ax1x.com/2022/05/12/O0R21s.png" },
  { src: "https://s1.ax1x.com/2022/05/12/O0WpND.png" },
  { src: "https://s1.ax1x.com/2022/05/12/O0Ww8J.png" },
  { src: "https://s1.ax1x.com/2022/05/12/O0Wf8H.png" },
]);
const handleDownload = (url) => {
  window.location.href = !url
    ? "https://www.npmjs.com/package/vue-bag-admin"
    : url;
};
</script>
<style lang="less" scoped>
.package-item {
  ul {
    li {
      padding-top: 10px;
      padding-bottom: 10px;
      width: 80%;
      margin: auto;
      border-bottom: 1px dotted #dadada;
      color: #333333;
      text-align: center;
      overflow: hidden;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
