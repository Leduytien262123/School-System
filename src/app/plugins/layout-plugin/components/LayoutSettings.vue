<template>
  <n-drawer
    :width="410"
    placement="right"
    v-bind="$attrs"
    :mask-closable="false"
  >
    <n-drawer-content :closable="true" title="Cài đặt giao diện">
      <n-form ref="formRef" :model="form">
        <n-space vertical>
          <n-form-item label="Kiểu bố cục" path="user.name">
            <div class="composition flex w-full justify-around">
              <div
                class="classical shadow-blue-400 bg-[#ebeef1] h-[45px] flex-1 relative rounded-sm overflow-hidden cursor-pointer"
                @click="handleCutLoayout($globalStore, 'default')"
              >
                <div
                  class="absolute top-0 left-0 block bg-white w-[25%] h-full"
                ></div>
                <n-icon
                  v-if="$globalStore.configs.layoutName === 'default'"
                  class="icon absolute right-[25%] bottom-[5px]"
                  :component="CheckboxOutline"
                  size="20"
                  :depth="1"
                />
              </div>
              <div
                class="classical shadow-sm bg-[#ebeef1] flex-1 h-[45px] mx-[15%] relative rounded-sm overflow-hidden cursor-pointer"
                @click="handleCutLoayout($globalStore, 'lessen')"
              >
                <div
                  class="absolute top-0 left-0 block bg-white w-[25%] h-full"
                ></div>
                <n-icon
                  v-if="$globalStore.configs.layoutName === 'lessen'"
                  class="icon absolute right-[25%] bottom-[5px]"
                  :component="CheckboxOutline"
                  size="20"
                  :depth="1"
                />
              </div>
              <div
                class="classical shadow-sm bg-[#ebeef1] flex-1 h-[45px] relative rounded-sm overflow-hidden cursor-pointer"
                @click="handleCutLoayout($globalStore, 'spillover')"
              >
                <div
                  class="absolute top-0 left-0 block bg-white w-[25%] h-full"
                ></div>
                <n-icon
                  v-if="$globalStore.configs.layoutName === 'spillover'"
                  class="icon absolute right-[40%] bottom-[5px]"
                  :component="CheckboxOutline"
                  size="20"
                  :depth="1"
                />
              </div>
            </div>
          </n-form-item>
          <n-form-item
            label-placement="left"
            label="Màu chủ đề"
            path="user.age"
          >
            <n-space :size="[10, 0]" align="center">
              <n-avatar
                @click="$global?.helpers?.cutColorTheme($global, item.color)"
                class="cursor-pointer"
                v-for="item in $globalStore.theme.colors"
                size="small"
                :style="{ backgroundColor: item.color }"
              >
                {{ $globalStore.theme.color === item.color ? item.name : "" }}
              </n-avatar>
            </n-space>
          </n-form-item>
          <n-form-item label-placement="left" label="Chiều rộng menu">
            <n-slider
              :tooltip="false"
              :marks="form.marks"
              v-model:value="form.setp"
              step="mark"
            />
          </n-form-item>
          <n-form-item
            label-placement="left"
            label="Chế độ tối"
            path="user.phone"
          >
            <n-switch v-model:value="$globalStore.configs.isDarkMode">
              <template #checked-icon>
                <n-icon :component="Moon" />
              </template>
              <template #unchecked-icon>
                <n-icon :component="Sunny" />
              </template>
            </n-switch>
          </n-form-item>
          <n-form-item
            label-placement="left"
            label="Hiển thị tab"
            path="user.phone"
          >
            <n-switch v-model:value="$globalStore.configs.isTabar" />
          </n-form-item>
          <n-form-item
            label-placement="left"
            label="Hiển thị breadcrumb"
            path="user.phone"
          >
            <n-switch v-model:value="$globalStore.configs.isBreadcrumb" />
          </n-form-item>
          <n-form-item
            label-placement="left"
            label="Lưu tab vĩnh viễn"
            path="user.phone"
          >
            <n-switch v-model:value="$globalStore.configs.isDataPersistence" />
          </n-form-item>
          <n-form-item
            label-placement="left"
            label="Menu con ứng dụng"
            path="user.phone"
          >
            <n-switch v-model:value="$globalStore.configs.isSubmenu" />
          </n-form-item>
          <n-form-item
            label-placement="left"
            label="Dock module"
            path="user.phone"
          >
            <n-switch v-model:value="$globalStore.configs.isDocking" />
          </n-form-item>
          <n-form-item
            label-placement="left"
            label="Hiển thị footer"
            path="user.phone"
          >
            <n-switch v-model:value="$globalStore.configs.isFooter" />
          </n-form-item>
          <n-form-item
            label-placement="left"
            label="Tab chồng lên nhau"
            path="user.phone"
          >
            <n-switch v-model:value="$globalStore.configs.isTabCover" />
          </n-form-item>
          <n-form-item
            v-if="$globalStore.configs.isWatermark"
            label="Nội dung watermark"
            path="user.name"
          >
            <n-input
              v-model:value="$globalStore.configs.watermark"
              placeholder="Nhập nội dung watermark"
            />
          </n-form-item>
          <n-form-item
            label-placement="left"
            label="Hiển thị watermark"
            path="user.phone"
          >
            <n-switch v-model:value="$globalStore.configs.isWatermark" />
          </n-form-item>
          <n-form-item
            label-placement="left"
            label="Kiểu tab"
            path="user.phone"
          >
            <n-select
              v-model:value="$globalStore.configs.tabStyle"
              :options="form.tabStyle"
              placeholder="Chọn kiểu tab"
            />
          </n-form-item>
          <!-- <n-form-item
            label-placement="left"
            label="Kiểu form"
            path="user.phone"
          >
            <n-select
              v-model:value="$globalStore.configs.formMode"
              :options="form.formMode"
              placeholder="Chọn kiểu form"
            />
          </n-form-item> -->
          <n-form-item
            label-placement="left"
            label="Ngôn ngữ"
            path="user.phone"
          >
            <n-select
              v-model:value="$globalStore.configs.language"
              :options="form.languageOptions"
              placeholder="Chọn ngôn ngữ"
            />
          </n-form-item>
        </n-space>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import { Moon, Sunny, CheckboxOutline } from "@/packages/helpers/Icon.js";

const arrs = [
  { setp: 0, width: 170 },
  { setp: 33, width: 200 },
  { setp: 66, width: 240 },
  { setp: 100, width: 300 },
];
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance();
const form = reactive({
  setp: 75,
  marks: [],
  languageOptions: [
    // { label: "中文", value: "zh" },
    { label: "Tiếng Trung", value: "zh" },
    { label: "English", value: "en" },
    { label: "Tiếng Việt", value: "vi" }, // Thêm tiếng Việt vào danh sách
  ],
  tabStyle: [
    { label: "Kiểu nút", value: "button" },
    { label: "Kiểu thẻ", value: "card" },
  ],
  formMode: [
    { label: "Kiểu ngăn kéo", value: "drawer" },
    { label: "Cửa sổ modal", value: "modal" },
    { label: "Kiểu tab", value: "page" },
  ],
});

const handleCutLoayout = ($globalStore, name) => {
  if (name === "default") {
    $globalStore.configs.layoutSiderWidth = arrs[2].width;
  }
  if (name === "lessen") {
    $globalStore.configs.layoutSiderWidth = arrs[0].width;
  }
  $globalStore.configs.layoutName = name;
};

form.marks = arrs.reduce((accumulator, current) => {
  accumulator[current.setp] = current.width + "px";
  return accumulator;
}, {});

watch(
  globalProperties?.$globalStore?.configs,
  (newValue) => {
    const data = arrs.find((item) => item.width === newValue.layoutSiderWidth);
    form.setp = data.setp;
  },
  {
    deep: true,
    immediate: true,
  }
);

watch(form, () => {
  globalProperties.$globalStore.configs.layoutSiderWidth = arrs.find(
    (item) => item.setp === form.setp
  )["width"];
});
</script>
<style lang="less" scoped>
.composition {
  .classical {
    &:before {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      width: 25%;
      height: 100%;
      content: "";
      background-color: #001529;
    }

    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      background-color: #fff;
      content: "";
    }

    &:nth-of-type(2) {
      &:before {
        width: 16%;
      }
    }

    &:nth-of-type(3) {
      &:before {
        background-color: #ebeef1;
      }

      &:after {
        z-index: 2;
        background-color: #001529;
      }
    }
  }
}
</style>
