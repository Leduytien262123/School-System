<template>
  <n-grid cols="12" y-gap="20" x-gap="20" item-responsive responsive="screen">
    <n-grid-item span="12 m:12 l:6">
      <n-card
        title="Thông tin"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;"
      >
        <n-result
          status="info"
          title="Thông tin"
          description="Trong thời đại này, thông tin là tiền bạc, tiền bạc là thông tin."
        >
          <template #footer>
            <n-button>Tôi cần thông tin</n-button>
          </template>
        </n-result>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:6">
      <n-card
        title="Tôi thích"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;"
      >
        <n-result
          status="success"
          title="Thành công"
          description="Đứa trẻ thất bại"
        >
          <template #footer>
            <n-button>Tôi thích</n-button>
          </template>
        </n-result>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Cảnh báo"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;"
      >
        <n-result
          status="warning"
          title="Cảnh báo"
          description="Trước khi nó trở thành lỗi thì thường không ai quan tâm"
        >
          <template #footer>
            <n-button>Nghe có vẻ hơi buồn, hahaha</n-button>
          </template>
        </n-result>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:6">
      <n-card
        title="403"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;"
      >
        <n-result
          status="403"
          title="403 Cấm truy cập"
          description="Luôn có những cánh cửa đóng lại với bạn"
        >
          <template #footer>
            <n-button>Thư giãn đi</n-button>
          </template>
        </n-result>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:6">
      <n-card
        title="418"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;"
      >
        <n-result
          status="418"
          title="418 Tôi là một cái cốc"
          description="Mọi thứ đều không cần nói ra"
        >
          <template #footer>
            <n-button>Chấp nhận sự thật đơn giản như vậy</n-button>
          </template>
        </n-result>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Làm sao để thành công"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;"
      >
        <n-result
          title="Làm sao để thành công"
          description="Viết báo cáo tốt, làm rối dự án, tăng chi phí giảm hiệu quả, làm chiếc bánh lớn hơn"
        >
          <template #icon>
            <code>
              Từng mơ cầm kiếm đi khắp thiên hạ Ngắm nhìn sự phồn hoa của thế
              giới Tuổi trẻ luôn có chút ngông cuồng Giờ đây bạn bốn bể là nhà
              Cô gái từng khiến bạn đau lòng Giờ đã lặng lẽ không còn bóng dáng
              Tình yêu luôn khiến bạn khao khát lại phiền não
            </code>
          </template>
        </n-result>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="To như thế"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;"
      >
        <n-result
          status="404"
          title="To! To! A"
          description="To như thế"
          size="huge"
        >
          <template #footer>
            <n-button>Ồ</n-button>
          </template>
        </n-result>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script setup></script>
