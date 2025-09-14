<template>
  <section class="bg-[#dbbf56] py-[60px] section-container">
    <h1 class="text-[50px] text-white font-bold text-center">Đánh giá</h1>
    <p class="text-white mb-10 text-center">
      Dưới đây là một số đánh giá của người dùng Bag về hệ thống blog này.
    </p>
    <n-grid cols="12" item-responsive responsive="screen" x-gap="20" y-gap="10">
      <n-grid-item span="12 m:6 l:4" v-for="item in compData.items">
        <div
          class="bg-white p-[25px] rounded-[4px] text-left text-[#333] flex flex-col"
        >
          <div class="text-[#909090] text-[15px]">
            {{ item.message }}
          </div>
          <div class="flex mt-[30px] items-center">
            <n-icon color="#e96656" size="30">
              <PawOutline />
            </n-icon>
            <div class="flex-1 ml-3">
              <h6>{{ item.name }}</h6>
              <p>{{ item.createTime }}</p>
            </div>
            <div
              class="client-head rounded-[50%] w-[50px] h-[50px] overflow-hidden"
            >
              <img
                class="vertical-mid"
                src="@/packages/assets/yanghang.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </n-grid-item>
    </n-grid>
  </section>
</template>
<script setup>
import { PawOutline } from "@vicons/ionicons5";
const compData = reactive({
  items: [
    {
      message:
        "Tôi là một người mới học lập trình, nhưng trên mạng có quá nhiều mã nguồn không hoàn chỉnh hoặc phải trả phí! Sau khi tìm kiếm trên Github, cuối cùng tôi đã tìm thấy hệ thống blog mã nguồn mở vue-bag-admin mà tôi mong muốn. Hệ thống này rất tốt, giao diện đẹp, quan trọng nhất là tác giả rất thân thiện, không thu phí. Tôi đã nhanh chóng xây dựng blog lcm của riêng mình, cảm giác rất tuyệt! Tuy còn một số thiếu sót, nhưng tôi tin tác giả sẽ tiếp tục hoàn thiện! Cố lên Bag, hệ thống có tâm!",
      name: "Minh Pluto",
      createTime: "2022-06-23 18:45:47",
    },
    {
      message:
        "Dùng khá ổn, phong cách đơn giản, có gì không hiểu có thể hỏi tác giả. Anh ấy rất kiên nhẫn giải đáp (thường thì bảo “hỏi quản trị viên”) @Mr. Yang là người rất tốt, nói chung khuyên mọi người nên thử chương trình này, không thử sẽ tiếc đó.",
      name: "Minh Pluto",
      createTime: "2022-06-23 18:45:47",
    },
    {
      message:
        "Dùng khá ổn, phong cách đơn giản, có gì không hiểu có thể hỏi tác giả. Anh ấy rất kiên nhẫn giải đáp (thường thì bảo “hỏi quản trị viên”) @Mr. Yang là người rất tốt, nói chung khuyên mọi người nên thử chương trình này, không thử sẽ tiếc đó.",
      name: "Minh Pluto",
      createTime: "2022-06-23 18:45:47",
    },
  ],
});
</script>
