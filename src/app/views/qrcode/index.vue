<template>
  <n-grid cols="12" y-gap="20" x-gap="20" item-responsive responsive="screen">
    <n-grid-item span="12 m:12 l:12">
      <n-card
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px"
        footer-style="padding:10px"
      >
        <n-form inline :label-width="80" :model="compData">
          <n-grid
            item-responsive
            responsive="screen"
            :x-gap="12"
            :y-gap="8"
            cols="24"
          >
            <n-grid-item span="24 m:6 l:24">
              <n-form-item label="Nội dung" path="text">
                <n-input
                  type="textarea"
                  v-model:value="compData.text"
                  placeholder="Nhập nội dung"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item span="24 m:6 l:4">
              <n-form-item label="Biên" path="optoons.margin">
                <n-input-number
                  v-model:value="compData.optoons.margin"
                  placeholder="Nhập biên"
                  clearable
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item span="24 m:6 l:4">
              <n-form-item label="Chiều rộng" path="optoons.width">
                <n-input-number
                  v-model:value="compData.optoons.width"
                  placeholder="Nhập chiều rộng"
                  clearable
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item span="24 m:6 l:4">
              <n-form-item label="Màu" path="color.dark">
                <n-color-picker
                  v-model:value="compData.optoons.color.dark"
                  :show-alpha="false"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item span="24 m:6 l:4">
              <n-form-item label="Màu nền" path="color.light">
                <n-color-picker
                  v-model:value="compData.optoons.color.light"
                  :show-alpha="false"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item span="24 m:6 l:4">
              <n-form-item label="Tạo mã QR">
                <n-button attr-type="button" @click="handleCreateCode"
                  >Tạo</n-button
                >
              </n-form-item>
            </n-grid-item>
          </n-grid>
        </n-form>
        <n-space>
          <n-card content-style="padding:10px">
            <n-image-group show-toolbar-tooltip>
              <n-space>
                <n-image
                  style="border-radius: 3px"
                  :src="compData.src"
                ></n-image>
              </n-space>
            </n-image-group>
          </n-card>
        </n-space>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script setup>
import QRCode from "qrcode";
const compData = reactive({
  text: "宣和辛丑八月十日到莱，独坐一室，平生所见，皆不在目前",
  src: "",
  optoons: {
    errorCorrectionLevel: "H",
    quality: 0.9,
    margin: 0,
    width: 200,
    color: {
      dark: "#333",
      light: "#fff",
    },
  },
});
const handleCreateCode = () => {
  QRCode.toDataURL(compData.text, compData.optoons, function (err, url) {
    compData.src = url;
  });
};
handleCreateCode();
</script>
