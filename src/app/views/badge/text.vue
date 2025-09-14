<template>
  <n-grid cols="12" y-gap="20" x-gap="20" item-responsive responsive="screen">
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Nhãn động"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <n-switch
          :rail-style="railStyle"
          @update:value="handleUpdateValue"
          :round="false"
        >
          <template #checked> Không hiển thị </template>
          <template #unchecked> Hiển thị </template>
        </n-switch>
        <n-input-group class="mt-5">
          <n-input
            maxlength="4"
            v-model:value="badgeValue"
            type="text"
            placeholder="Nhập văn bản muốn hiển thị"
            :style="{ width: '180px' }"
          />
          <n-button type="primary" @click="handleUpdateValue(false)" ghost
            >Thêm chữ</n-button
          >
        </n-input-group>
        <n-space class="mt-5">
          <n-button type="default" @click="handleUpdateValue(false, 'default')">
            mặc định
          </n-button>
          <n-button type="info" @click="handleUpdateValue(false, 'info')">
            thông tin
          </n-button>
          <n-button type="warning" @click="handleUpdateValue(false, 'warning')">
            cảnh báo
          </n-button>
          <n-button type="error" @click="handleUpdateValue(false, 'error')">
            lỗi
          </n-button>
          <n-button type="success" @click="handleUpdateValue(false, 'success')">
            thành công
          </n-button>
        </n-space>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script setup>
import { NBadge } from "naive-ui";

const badgeValue = ref("热门");
const railStyle = ({ focused, checked }) => {
  const style = {};
  if (checked) {
    style.background = "#d03050";
    if (focused) {
      style.boxShadow = "0 0 0 2px #d0305040";
    }
  } else {
    style.background = "#2080f0";
    if (focused) {
      style.boxShadow = "0 0 0 2px #2080f040";
    }
  }
  return style;
};
const handleUpdateValue = (value, type) => {
  $global.helpers.depthForEach($globalStore.menus, (item) => {
    if (item.id === $globalStore.currentRouter.meta.id) {
      item.extraProps.show = !value;
      item.extraProps.value = badgeValue.value;
      item.extraProps.type = type ? type : item.extraProps.type;
      item.extra = () => h(NBadge, { ...item.extraProps });
    }
  });
};
</script>
