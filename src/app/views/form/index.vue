<template>
  <div class="p-4">
    <form-create
      :rule="searchAttribute.rule"
      v-model:api="searchAttribute.fApi"
      :option="searchAttribute.options"
    />
    <n-card
      style="height: 100%"
      :segmented="{ content: true, footer: true }"
      header-style="padding:10px;font-size:14px"
      footer-style="padding:10px;"
      content-style="padding:10px;height:100%"
    >
      <template #header>
        <div class="flex justify-end items-center gap-x-3"></div>
      </template>
      <template #header-extra>
        <div class="flex justify-end items-center gap-x-3">
          <n-button size="small" @click="onCreate">Thêm mới</n-button>
          <n-popover trigger="hover">
            <template #trigger>
              <n-popselect
                v-model:value="tableAttribute.size"
                :options="tableAttribute.densityOptions"
                trigger="click"
              >
                <n-icon size="20" :depth="2">
                  <ResizeOutline />
                </n-icon>
              </n-popselect>
            </template>
            <span>Mật độ</span>
          </n-popover>
          <n-popover trigger="hover">
            <template #trigger>
              <n-icon @click="tableAttribute.onRefresh" size="20" :depth="2">
                <ReloadOutline />
              </n-icon>
            </template>
            <span>Làm mới</span>
          </n-popover>
          <n-popover trigger="hover">
            <template #trigger>
              <n-popselect
                v-model:value="tableAttribute.columnsModelValue"
                multiple
                :options="tableAttribute.columnsOptions"
                :render-label="
                  (options) =>
                    renderMultiCheckbox(
                      tableAttribute.columnsModelValue,
                      options
                    )
                "
                trigger="click"
              >
                <n-icon size="20" :depth="2">
                  <SettingsOutline />
                </n-icon>
              </n-popselect>
            </template>
            <span>Cài đặt</span>
          </n-popover>
        </div>
      </template>
      <template #footer>
        <n-pagination :item-count="101">
          <template #prefix="{ itemCount, startIndex }">
            Bắt đầu từ mục {{ startIndex }}, tổng cộng {{ itemCount }} mục
          </template>
          <template #suffix="{ endIndex }">
            Kết thúc ở mục {{ endIndex }}
          </template>
        </n-pagination>
      </template>
      <n-data-table
        v-model:checked-row-keys="tableAttribute.checkedRowKeys"
        :columns="tableAttribute.columns"
        :data="tableData"
        :loading="tableAttribute.loading"
        :size="tableAttribute.size"
        :pagination="false"
        :single-line="false"
      />
    </n-card>
  </div>
</template>

<script setup>
import {
  ReloadOutline,
  ResizeOutline,
  SettingsOutline,
} from "@vicons/ionicons5";
import { useTable, useFormCreate } from "@/app/hook/useTable.js";

const tableData = [
  { no: 3, title: "Wonderwall", length: "4:18", key: 1 },
  { no: 4, title: "Don't Look Back in Anger", length: "4:48", key: 2 },
  { no: 12, title: "Champagne Supernova", length: "7:27", key: 3 },
  { no: 3, title: "Wonderwall", length: "4:18", key: 4 },
  { no: 4, title: "Don't Look Back in Anger", length: "4:48", key: 5 },
];
const tableColumns = [
  {
    key: "no",
    title: "Tên quy tắc",
  },
  {
    key: "title",
    title: "Số lần gọi dịch vụ",
  },
  {
    key: "length",
    title: "Mô tả",
  },
  {
    key: "state",
    title: "Trạng thái",
  },
  {
    key: "scheduled",
    title: "Lần lên lịch gần nhất",
  },
];

const formEdit = [
  {
    type: "input",
    title: "Tên sản phẩm",
    field: "goods_name",
    value: "",
    props: {
      disabled: true,
    },
  },
  {
    type: "input",
    title: "Tên sản phẩm",
    field: "goods_name",
    value: "",
  },
  {
    type: "InputNumber",
    field: "price",
    title: "Giá",
    value: 1,
    props: {
      clearable: false,
    },
  },
  {
    type: "autoComplete",
    title: "Tự động hoàn thành",
    field: "auto",
    value: "",
    inject: true,
    props: {},
  },
  {
    type: "radio",
    title: "Có miễn phí vận chuyển không",
    field: "is_postage",
    value: "0",
    options: [
      { value: "0", label: "Không miễn phí vận chuyển", disabled: false },
      { value: "1", label: "Miễn phí vận chuyển", disabled: false },
      { value: "1", label: "Trợ giá", disabled: true },
    ],
  },
  {
    type: "checkbox",
    title: "Nhãn",
    field: "label",
    value: [],
    options: [
      { value: "1", label: "Tốt", disabled: true },
      { value: "2", label: "Tiện lợi", disabled: false },
      { value: "3", label: "Thực dụng", disabled: false },
      { value: "4", label: "Hiệu quả", disabled: false },
    ],
  },
  {
    type: "select",
    field: "cate_id",
    title: "Phân loại sản phẩm",
    value: [],
    options: [
      { value: "104", label: "Rau hữu cơ", disabled: false },
      { value: "105", label: "Trái cây tươi", disabled: false },
    ],
    props: {
      multiple: true,
    },
  },
  {
    type: "switch",
    title: "Có hiển thị không",
    field: "is_show",
    value: "1",
    props: {
      round: false,
    },
  },
  {
    type: "cascader",
    title: "Khu vực",
    field: "address",
    value: [],
    props: {},
  },
  {
    type: "DatePicker",
    field: "section_day",
    title: "Ngày diễn ra hoạt động",
    value: null,
    props: {
      type: "datetimerange",
      placeholder: "Vui lòng chọn ngày diễn ra hoạt động",
    },
  },
  {
    type: "upload",
    field: "pic",
    title: "Ảnh carousel",
    value: [],
    props: {
      action: "/upload.php",
      max: 2,
      onSuccess: function (res, file) {
        file.url = res.url;
      },
    },
  },
  {
    type: "TimePicker",
    field: "section_time",
    title: "Thời gian hoạt động",
    value: "00:00:00",
  },
];
const { renderMultiCheckbox, tableAttribute } = useTable(tableColumns, {
  onEdit() {
    const attribute = useFormCreate(formEdit, {
      form: {
        inline: false,
      },
      rule: {
        col: {
          span: 24,
        },
      },
    });
    $globalStore.formCreate.title = "Chỉnh sửa";
    $globalStore.formCreate.rule = attribute.rule;
    $globalStore.formCreate.options = attribute.options;
    $globalStore.formCreate.fApi = attribute.fApi;
    $global.router.push({
      path: "/particulars",
      query: { rid: $globalStore.currentRouter?.meta?.id },
    });
  },
});

const onCreate = () => {
  const attribute = useFormCreate(formEdit, {
    form: {
      inline: false,
    },
    rule: {
      col: {
        span: 24,
      },
    },
  });
  $globalStore.formCreate.title = "Thêm mới";
  $globalStore.formCreate.rule = attribute.rule;
  $globalStore.formCreate.options = attribute.options;
  $globalStore.formCreate.fApi = attribute.fApi;
  $global.router.push({
    path: "/particulars",
    query: { rid: $globalStore.currentRouter?.meta?.id },
  });
};

const searchRule = [
  {
    field: "goods_name",
    title: "Tên sản phẩm 1",
  },
  {
    field: "goods_name2",
    title: "Tên sản phẩm 2",
  },
  {
    field: "goods_name3",
    title: "Tên sản phẩm",
  },
  {
    field: "goods_name3",
    title: "Tên sản phẩm",
  },
];
const searchAttribute = useFormCreate(searchRule, {
  resetBtn: true,
  submitBtn: true,
});
</script>
