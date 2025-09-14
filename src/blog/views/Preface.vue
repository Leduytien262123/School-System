<template>
  <section class="text-justify py-[6px] bg-[#272727] section-container">
    <h1 class="text-[50px] text-white font-bold text-center">Lời mở đầu</h1>
    <p class="text-white text-center">
      Giới thiệu về nguồn gốc và quá trình phát triển của Bag.
    </p>
    <n-grid cols="12" item-responsive responsive="screen" :x-gap="20">
      <n-grid-item
        class="wow animate__animated animate__fadeInLeft mt-[50px]"
        data-wow-duration="1.0s"
        data-wow-delay="0.2s"
        span="12 m:12 l:6"
      >
        <p class="text-[#8f8f8f] leading-7">
          Ban đầu, Bag chỉ là một hệ thống quản trị mã nguồn mở do tôi thiết kế.
          Sau này, tôi nhận thấy mọi người vẫn rất thích các hệ thống quản trị,
          nhưng khi tích hợp vào dự án doanh nghiệp thì phong cách và quy chuẩn
          sử dụng lại có nhiều điểm khác biệt, không phù hợp với nghiệp vụ hiện
          tại, dẫn đến người dùng không muốn sử dụng. Vì vậy, tôi đã phát triển
          thêm Bag-web để cung cấp một website blog, giúp bạn có thể dùng hệ
          thống này để quản lý blog cá nhân.
          <br />
          Cảm ơn: Bộ mã nguồn này sử dụng Vue3, Vite, Pinia, Naive-ui, Alova...
          cùng nhiều plugin trên internet. Xin cảm ơn các framework và plugin mã
          nguồn mở đã tạo nền tảng vững chắc cho chương trình này!
          <br />
          1. Trang chủ
          <a
            style="color: #03a9f4; margin: 0 5px"
            href="https://vite.itnavs.com/"
            >tại đây</a
          >, tác giả: Mr. Yang<br />
          2. Cảm ơn bạn đã chọn Bag. Nếu phát hiện Bug hoặc có đề xuất tính
          năng, hãy gửi email tới 470193837@qq.com hoặc để lại lời nhắn trên
          trang chủ.<br />
          3. Trong quá trình sử dụng, bạn có thể tham gia nhóm thảo luận Bag để
          chia sẻ kinh nghiệm (xem nhóm ở cuối trang).<br />
          4. Bag là sản phẩm mã nguồn mở, giúp mọi thứ trở nên đơn giản.<br />
          5. Tôi hy vọng có thể cùng mọi người phát triển Bag ngày càng tốt
          hơn.<br />
          6. Lưu ý: Bag sử dụng giấy phép MIT, nội dung và điều khoản tương tự
          BSD 3-clause, nhưng trao nhiều quyền hơn và ít hạn chế hơn. Bạn có
          quyền sử dụng, sao chép, chỉnh sửa, hợp nhất, phát hành, phân phối,
          cấp phép lại và bán phần mềm cũng như các bản sao của phần mềm. Mọi
          bản sao phải kèm theo thông báo bản quyền và giấy phép.<br />
          7. Lưu ý: Người dùng đăng tải nội dung vi phạm pháp luật, xâm phạm
          quyền riêng tư, quyền sở hữu trí tuệ, xúc phạm, bôi nhọ, vu khống...
          gây thiệt hại cho nền tảng, người dùng khác hoặc bên thứ ba sẽ tự chịu
          mọi trách nhiệm pháp lý và bồi thường.
        </p>
      </n-grid-item>
      <n-grid-item
        class="wow animate__animated animate__fadeInRight mt-[50px]"
        data-wow-duration="1.0s"
        data-wow-delay="0.2s"
        span="12 m:12 l:6"
      >
        <div class="skill">
          <div
            class="flex text-[#8f8f8f] justify-between mb-5"
            v-for="item in compData.items"
          >
            <n-progress
              class="flex-shrink-0 mr-5"
              :stroke-width="16"
              type="circle"
              :color="item.color"
              :percentage="item.percentage"
            >
              <h6 class="text-[16px] font-bold">{{ item.titleVi }}</h6>
            </n-progress>
            <div class="flex flex-col justify-around">
              <p>{{ item.desVi }}</p>
            </div>
          </div>
        </div>
      </n-grid-item>
    </n-grid>
  </section>
</template>
<script setup>
const compData = reactive({
  items: [
    {
      title: "成长",
      titleVi: "Trưởng thành",
      des: "Bag还在成长，不成熟的地方还有很多，需要大家一起来帮忙纠正",
      desVi:
        "Bag vẫn đang phát triển, còn nhiều điểm chưa hoàn thiện, rất mong mọi người cùng góp ý chỉnh sửa.",
      color: "#20a0ff",
      percentage: 84,
    },
    {
      title: "灵活",
      titleVi: "Linh hoạt",
      des: "Bag所有的可视化全可由后台进行修改，路由管理，请求管理，状态管理，角色权限等等...",
      desVi:
        "Tất cả các phần hiển thị của Bag đều có thể chỉnh sửa từ backend: quản lý router, request, trạng thái, phân quyền vai trò...",
      color: "#F1948A",
      percentage: 88,
    },
    {
      title: "插件",
      titleVi: "Plugin",
      des: "灵活抽象的设计，框架只提供数据层面，当属于某个功能注册一个插件，没有什么中间件不能搞定的",
      desVi:
        "Thiết kế linh hoạt, framework chỉ cung cấp tầng dữ liệu, mỗi chức năng là một plugin, không có middleware nào là không xử lý được.",
      color: "#ff4949",
      percentage: 92,
    },
    {
      title: "特性",
      titleVi: "Tính năng",
      des: "npm快速安装、Vite零秒启动、一键build、跨平台 PC、手机端、平板",
      desVi:
        "Cài đặt nhanh với npm, khởi động Vite tức thì, build một chạm, đa nền tảng: PC, mobile, tablet.",
      color: "#e6a23c",
      percentage: 90,
    },
  ],
});
</script>
<style lang="less" scoped></style>
