<template>
  <n-grid cols="12" y-gap="12" x-gap="12" item-responsive responsive="screen">
    <n-grid-item span="12 m:12 l:7">
      <n-card
        title="Chào mừng bạn"
        :header-extra="() => 'Hôm nay nhiều mây, sau đó trời nắng, 18℃ - 26℃!'"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
      >
        <div class="flex-row flex">
          <img
            alt=""
            class="w-[80px] rounded-[50%] h-[80px]"
            src="@/packages/assets/yanghang.jpg"
          />
          <div class="ml-5">
            <h1 class="font-bold text-[19px] mb-1">
              Chào, {{ tleData.pam }} Hôm nay là {{ tleData.date }}
              {{ tleData.week }} {{ tleData.time }}. Bạn định ăn gì hôm nay?
            </h1>
            <p class="text-justify">
              Kỹ sư Frontend | Pinming Technology, vue-bag-admin, 🍁 sử dụng
              Vite5, Vue3, Pinia, Naive UI để xây dựng. Cách sử dụng framework
              là phát triển theo dạng plugin, cho phép nhà phát triển mở rộng
              chức năng, thêm logic xử lý mới mà không cần sửa mã gốc, giúp ứng
              dụng dễ bảo trì và module hóa hơn. Mô hình này đặc biệt phù hợp
              với các ứng dụng cần khả năng mở rộng và tuỳ biến cao.
            </p>
          </div>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:5">
      <n-card
        title="Tin nhắn nhóm"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <n-statistic label="Bạn đã xử lý" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef"
            show-separator
            :from="0"
            :to="1203459"
          />
          <template #suffix> tin nhắn nhóm </template>
        </n-statistic>
        <n-space vertical>
          Dành thời gian, công sức, tâm huyết, chúc cho mọi nỗ lực của bạn đều
          xứng đáng
          <n-button @click="numberAnimationInstRef.play()"> Phát </n-button>
        </n-space>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:6">
      <n-card
        title=""
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <n-descriptions label-placement="top" bordered :column="6">
          <n-descriptions-item label="Bữa sáng"> Táo </n-descriptions-item>
          <n-descriptions-item label="Bữa sáng muộn">
            Đồ ăn vặt/Trái cây
          </n-descriptions-item>
          <n-descriptions-item label="Bữa trưa">
            Cơm trắng
          </n-descriptions-item>
          <n-descriptions-item label="Bữa tối"> Bánh chẻo </n-descriptions-item>
          <n-descriptions-item label="Bữa chính">
            Cơm trắng
          </n-descriptions-item>
          <n-descriptions-item label="Ăn khuya"> Đồ nướng </n-descriptions-item>
          <n-descriptions-item label="Táo"> Đồ nướng </n-descriptions-item>
          <n-descriptions-item label="Táo" :span="2"> Táo </n-descriptions-item>
          <n-descriptions-item label="Táo" :span="3"> Táo </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:6">
      <n-card
        title="Khoảnh khắc tuyệt vời"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <n-carousel show-arrow>
          <img
            class="w-full h-[240px] object-cover"
            alt=""
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
          />
          <img
            class="w-full h-[240px] object-cover"
            alt=""
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
          />
          <img
            class="w-full h-[240px] object-cover"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
            alt=""
          />
          <img
            class="w-full h-[240px] object-cover"
            alt=""
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
          />
        </n-carousel>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:5">
      <n-card
        title="Phân tích dữ liệu"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <div id="echarts1" style="width: 100%; height: 240px"></div>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:7">
      <n-card
        title="Lối tắt nhanh"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <n-space :size="[20, 20]" align="center">
          <div
            @click="$global.router.push(item.path)"
            v-for="item in fastData"
            class="p-3 cursor-pointer border border-blue-50 w-[100px] text-center rounded-md"
          >
            <component class="text-[20px]" :is="item.icon"></component>
            <h3 class="hover:font-extrabold">{{ item.title }}</h3>
          </div>
        </n-space>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:6">
      <n-card
        title="Bài viết blog"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <div class="h-[240px] overflow-y-scroll">
          <n-timeline>
            <n-timeline-item
              title="Một người - một thành phố, một người làm rất nhiều việc"
              time="2023-11-11 00:10"
              content="Tôi một mình, sống ở thành phố này đã lâu, thành phố này từng là ước mơ của tôi, giờ là hiện thực, ở đây tôi đã làm nhiều việc, trải qua nhiều thăng trầm của cuộc sống"
            />
            <n-timeline-item
              type="success"
              title="Đọc xong bài này bỗng nhiên tỉnh ngộ, Kỹ thuật chặn Web tối thượng"
              content="Nếu quyền kiểm soát hệ thống, mã nguồn hoàn toàn nằm trong tay bạn, việc thêm một lớp trung gian là rất dễ dàng; thực tế chúng ta thường không kiểm soát được mọi khâu của hệ thống, nên cần dùng một số thủ thuật 'phi truyền thống' (chặn) để thêm lớp trung gian."
              time="2024-04-09 21:46"
            />
            <n-timeline-item
              type="error"
              title="Về kiến thức cấu hình Nginx cho frontend, bạn nên biết một chút"
              content="Trong phát triển frontend, Nginx không chỉ là một Web server hiệu quả mà còn là một công cụ mạnh mẽ, giúp nâng cao hiệu năng và trải nghiệm người dùng cho ứng dụng Web"
              time="2024-02-28 19:10"
            />
            <n-timeline-item
              type="warning"
              title="Bước đầu phát triển thư viện UI component, Vite làm sao chuyển Markdown thành Vue component"
              content="Khi phát triển một thư viện UI component, việc chuyển Markdown thành Vue component là nhu cầu phổ biến, nhất là khi tạo tài liệu hoặc demo, lúc này ta cần chuyển nó thành component"
              time="2024-03-02 10:26"
            />
            <n-timeline-item
              type="info"
              title="Cuộc sống hai điểm một đường"
              content="Về nhà, ở Hàng Châu cơ bản không có bạn bè, chỉ có đồng nghiệp, đã 5 năm làm việc ở Hàng Châu, ai về nhà thì về thôi"
              time="2024-01-30 23:31"
              line-type="dashed"
            />
            <n-timeline-item content="......" />
          </n-timeline>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:6">
      <n-card
        title="Xin chào, tôi là Mr. Yang"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px 10px;height:100%"
      >
        <n-tabs type="line" animated>
          <n-tab-pane name="oasis" tab="Một đoạn độc thoại">
            Hôm nay nắng rất dịu, có lẽ lâu rồi tôi chưa ra ngoài đi dạo, nhìn
            thời tiết ngoài cửa sổ, tôi tựa vào sofa và ngủ thiếp đi...<br />
            Người lạ ơi, xin chào, cảm ơn vì đã gặp, ba đời có phúc, mãi mãi trẻ
            trung, mãi mãi rơi lệ vì xúc động, mãi mãi nhiệt huyết, mãi mãi
            thẳng thắn<br />
            Chào mừng bạn ghé thăm, rất vinh dự khi để lại dấu chân trong ký ức
            của bạn, đời người vội vã, có lẽ chỉ là khách qua đường~~
          </n-tab-pane>
          <n-tab-pane name="the beatles" tab="Hành trình phát triển">
            Năm 2017 tiếp xúc với php, mysql rồi nảy ra ý định làm blog cá nhân
            để ghi lại những vấn đề gặp phải<br />
            2018 blog bắt đầu có người đăng ký, chọn Tpt-Content blog mã nguồn
            mở<br />
            2019 thấy lượng truy cập mỗi ngày từ 20 lên 50, frontend dùng vue2.0
            + webpack4 đa trang, backend + API dùng layui + thinkPHP5.0<br />
            2020 là một năm không dễ dàng, vừa đối mặt với dịch bệnh, vừa thích
            nghi môi trường làm việc mới, nhưng tôi vẫn kiên trì sáng tạo, cập
            nhật, học hỏi<br />
            2021 tôi tập trung vào xây dựng hệ thống frontend, làm framework
            PM-UI và template cho doanh nghiệp<br />
            2022 tôi lên trưởng nhóm frontend, dành nhiều thời gian cho nền tảng
            frontend, phát triển framework quản trị Vue-Bag-Admin<br />
            2023 trên Github có gần 1k star, giữa năm nhận giải sáng tạo, cuối
            năm nhận giải nhóm frontend xuất sắc, rất biết ơn và may mắn<br />
            2024 tôi vẫn chưa dừng lại,
            <a
              class="text-cyan-200"
              href="https://www.vipbic.com/about.html"
              target="_blank"
              >xem chi tiết</a
            ><br />
          </n-tab-pane>
          <n-tab-pane name="jay chou" tab="Trạng thái cá nhân">
            <ul>
              <li>Thế hệ: 9x đời đầu</li>
              <li>Chiều cao: 170cm</li>
              <li>Học vấn: học ít, bỏ dở giữa chừng</li>
              <li>
                Tình trạng hôn nhân:
                <span style="color: rgb(80, 103, 134)"
                  >Chưa kết hôn, muốn tìm bạn gái 🤪🤪🤪</span
                >
              </li>
            </ul>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script setup>
import { init } from "echarts";
import echarts1 from "./echarts1.js";
import { onBeforeRouteLeave } from "vue-router";

const value = ref("");
const numberAnimationInstRef = ref();
const getPamFormat = (hour) => {
  if (hour < 6) {
    return "Chào buổi sáng sớm!";
  } else if (hour < 9) {
    return "Chào buổi sáng!";
  } else if (hour < 12) {
    return "Chào buổi sáng!";
  } else if (hour < 14) {
    return "Chào buổi trưa!";
  } else if (hour < 17) {
    return "Chào buổi chiều!";
  } else if (hour < 19) {
    return "Chào buổi tối!";
  } else if (hour < 22) {
    return "Chào buổi tối!";
  } else {
    return "Chào buổi đêm!";
  }
};
const tleData = reactive({
  date: $global.dayjs.default().format("YYYY年MM月DD日"),
  time: $global.dayjs.default().format("HH时mm分ss秒"),
  week:
    "Thứ " +
    "Chủ nhật, Hai, Ba, Tư, Năm, Sáu, Bảy".charAt(
      parseInt($global.dayjs.default().format("d"))
    ),
  pam: getPamFormat($global.dayjs.default().format("HH")),
});
let intervalTimer = setInterval(() => {
  tleData.time = $global.dayjs.default().format("HH时mm分ss秒");
}, 1000);

const fastData = $globalStore.menus.find(
  (item) => item.title === "组件"
).children;
onBeforeRouteLeave(() => {
  clearInterval(intervalTimer);
});
onMounted(() => {
  const myChart = init(document.getElementById("echarts1"));
  myChart.setOption(echarts1(fastData));
});
const handleBeforeLeave = (tabName) => {
  switch (tabName) {
    case "not-allowed":
      $global.naive.message.error("Không được vào");
      return false;
    case "wait":
      return new Promise((resolve) => {
        const messageInstance = $global.naive.message.loading("Chờ 1 giây");
        setTimeout(() => {
          messageInstance.destroy();
          resolve(true);
        }, 1e3);
      });
    default:
      return true;
  }
};
const handleUpdateValue = (value) => {
  $global.naive.message.info(value);
};
</script>
