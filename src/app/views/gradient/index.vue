<template>
  <n-grid cols="12" y-gap="20" x-gap="20" item-responsive responsive="screen">
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Chữ chuyển màu"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <template #header-extra>
          <n-gradient-text type="success">
            Chữ chuyển màu thành công
          </n-gradient-text>
        </template>
        <n-space vertical>
          <n-gradient-text style="white-space: normal" type="success">
            <p>
              Su Shi (Tô Thức, 1037-1101), tự Tử Chiêm, hiệu Đông Pha cư sĩ, là
              nhà văn, nhà thư pháp, họa sĩ nổi tiếng thời Bắc Tống. Ông là lãnh
              tụ văn đàn Bắc Tống, có thành tựu lớn về thơ, từ, tản văn, thư
              pháp, hội họa. Tác phẩm tiêu biểu: "Đông Pha thất tập", "Đông Pha
              lạc phủ", "Tiêu Tương trúc thạch đồ quyển"...
            </p>
          </n-gradient-text>
        </n-space>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Chữ chuyển màu"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <template #header-extra>
          <n-gradient-text type="warning">
            Chữ chuyển màu thành công
          </n-gradient-text>
        </template>
        <n-space vertical>
          <n-gradient-text style="white-space: normal" type="warning">
            <p>
              Bạch Cư Dị (772-846), tự Lạc Thiên, hiệu Hương Sơn cư sĩ, là nhà
              thơ hiện thực vĩ đại thời Đường. Ông cùng Nguyên Chẩn khởi xướng
              phong trào Tân Nhạc Phủ, được gọi là "Nguyên Bạch". Tác phẩm tiêu
              biểu: "Trường hận ca", "Mại thán ông", "Tỳ bà hành"...
            </p>
          </n-gradient-text>
        </n-space>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Tùy chỉnh màu sắc"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <template #header-extra>
          <n-gradient-text
            gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
          >
            Chữ chuyển màu thành công
          </n-gradient-text>
        </template>
        <n-space vertical>
          <n-gradient-text
            gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
            style="white-space: normal"
          >
            <p>
              Đỗ Phủ (712-770), tự Tử Mỹ, là nhà thơ hiện thực vĩ đại thời
              Đường, được tôn là "Thi Thánh". Tác phẩm tiêu biểu: "Xuân vọng",
              "Tam biệt", "Tam lại", "Binh xa hành"...
            </p>
          </n-gradient-text>
        </n-space>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script setup></script>
