# Thành phần biểu mẫu

Các thành phần toàn cục được tích hợp sẵn trong framework, có thể sử dụng trực tiếp

## Thành phần BagGlobalForm

Trong quá trình chỉnh sửa, thêm mới biểu mẫu, đồng thời hỗ trợ chế độ popup, chế độ drawer, chế độ tab

![Thành phần BagGlobalForm](../images/form.png)

```vue
<template>
  <div class="h-full flex flex-col">
    <n-card content-style="padding:24px 10px 0px 10px">
      <n-form
        ref="formRef"
        inline
        :label-width="80"
        :model="formValue"
        :rules="rules"
        label-placement="left"
      >
        <n-grid responsive="screen" cols="1 s:1 m:2 l:2 xl:4 2xl:6">
          <n-gi>
            <n-form-item label="Trạng thái đăng ký" path="user.name">
              <n-input
                v-model:value="formValue.name"
                placeholder="Nhập trạng thái đăng ký"
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="Trạng thái đăng ký:" path="user.name">
              <n-input
                v-model:value="formValue.name"
                placeholder="Nhập trạng thái đăng ký"
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="Trạng thái đăng ký" path="user.name">
              <n-input
                v-model:value="formValue.name"
                placeholder="Nhập trạng thái đăng ký"
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label=" ">
              <n-space>
                <n-button attr-type="button" type="success">Tìm kiếm</n-button>
                <n-button attr-type="button">Đặt lại</n-button>
              </n-space>
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-form>
    </n-card>
    <n-card
      content-style="padding:10px"
      header-style="padding:10px"
      style="margin-top: 10px;flex: 1"
    >
      <template #header>
        <n-space>
          <n-button type="primary" @click="handleClick(true)"
            >Thêm dữ liệu</n-button
          >
          <n-button dashed type="error">Xóa hàng loạt</n-button>
          <n-button type="success" @click="handleSkip($global)"
            >Chuyển hướng</n-button
          >
        </n-space>
      </template>
      <n-data-table
        flex-height
        class="h-full min-h-[350px]"
        :single-line="false"
        :columns="compTable.columns"
        :data="compTable.data"
        :pagination="compTable.pagination"
      />
    </n-card>
  </div>
  <bag-global-form
    @handleSubmit="handleSubmit"
    :modal="compTable.modal"
    v-model:showModal="compTable.showModal"
  >
    <n-form
      ref="formRef"
      inline
      :label-width="80"
      :model="formValue"
      :rules="rules"
      label-placement="left"
    >
      <n-grid x-gap="12" :cols="1">
        <n-gi>
          <n-form-item label="Trạng thái đăng ký" path="user.name">
            <n-input
              v-model:value="formValue.name"
              placeholder="Nhập trạng thái đăng ký"
            />
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="Trạng thái đăng ký:" path="user.name">
            <n-input
              v-model:value="formValue.name"
              placeholder="Nhập trạng thái đăng ký"
            />
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="Trạng thái đăng ký" path="user.name">
            <n-input
              v-model:value="formValue.name"
              placeholder="Nhập trạng thái đăng ký"
            />
          </n-form-item>
        </n-gi>
      </n-grid>
    </n-form>
  </bag-global-form>
</template>
<script setup>
import { NButton } from "naive-ui";

const formValue = reactive({});
const compTable = reactive({
  data: Array.from({ length: 46 }).map((_, index) => ({
    key: index,
    name: `Edward Edward King ${index}`,
    age: 32,
    address: `London, Park Lane no. ${index}`,
  })),
  modal: {
    title: "Thêm mới",
  },
  showModal: false,
  columns: [
    { title: "Tên", key: "name" },
    { title: "Tuổi", key: "age" },
    { title: "Địa chỉ", key: "address" },
    {
      title: "Hành động",
      key: "actions",
      render(row) {
        return h(
          NButton,
          {
            size: "small",
            onClick: () => {
              compTable.modal.title = "Chỉnh sửa";
              handleClick(true);
            },
          },
          { default: () => "Gửi Email" }
        );
      },
    },
  ],
  pagination: {
    page: 1,
    pageSize: 30,
    showSizePicker: true,
    pageSizes: [10, 20, 50],
    onChange: (page) => {
      compTable.pagination.page = page;
    },
    onUpdatePageSize: (pageSize) => {
      compTable.pagination.pageSize = pageSize;
      compTable.pagination.page = 1;
    },
  },
});
const rules = {};
const formRef = ref();
const handleClick = (val) => {
  compTable.showModal = val;
};
const handleSkip = (ctx) => {
  ctx.router.push({ path: "/md" });
};
const handleSubmit = () => {};
</script>
```

## Thuộc tính

| Thuộc tính | Kiểu    | Giá trị mặc định | Mô tả                   |
| ---------- | ------- | ---------------- | ----------------------- |
| showModal  | Boolean | false            | Có hiển thị popup không |

Kế thừa đầy đủ thuộc tính và phương thức của các thành phần `n-modal`, `n-drawer` của naiveui

## Plugin biểu mẫu bên thứ ba

- Ở đây tôi khuyên dùng [FormCreate](https://www.form-create.com/v3/), FormCreate là một thành phần tạo biểu mẫu có thể tạo biểu mẫu với chức năng render động, thu thập dữ liệu, xác thực và gửi thông qua JSON. Hỗ trợ 6 UI framework, tương thích mobile, và hỗ trợ sinh bất kỳ thành phần Vue nào.

#### Cài đặt

```bash
pnpm i @form-create/naive-ui@^3
```

- [Amis](https://aisuda.bce.baidu.com/amis/zh-CN/docs/index) là một framework low-code frontend, sử dụng cấu hình JSON để sinh trang, giúp giảm khối lượng công việc phát triển giao diện, tăng hiệu suất.

#### Cài đặt

Tải sdk của amis tại [GitHub](https://github.com/baidu/amis/releases)
