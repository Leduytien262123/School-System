<template>
  <n-form
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
    :size="size"
  >
    <n-form-item label="Họ tên" path="user.name">
      <n-input v-model:value="formValue.user.name" placeholder="Nhập họ tên" />
    </n-form-item>
    <n-form-item label="Tuổi" path="user.age">
      <n-input v-model:value="formValue.user.age" placeholder="Nhập tuổi" />
    </n-form-item>
    <n-form-item label="Số điện thoại" path="phone">
      <n-input
        v-model:value="formValue.phone"
        placeholder="Nhập số điện thoại"
      />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick">
        Xác thực
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const formRef = ref(null);
    return {
      formRef,
      size: ref("medium"),
      formValue: ref({
        user: {
          name: "",
          age: "",
        },
        phone: "",
      }),
      rules: {
        user: {
          name: {
            required: true,
            message: "Vui lòng nhập họ tên",
            trigger: "blur",
          },
          age: {
            required: true,
            message: "Vui lòng nhập tuổi",
            trigger: ["input", "blur"],
          },
        },
        phone: {
          required: true,
          message: "Vui lòng nhập số điện thoại",
          trigger: ["input"],
        },
      },
      handleValidateClick(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {});
      },
    };
  },
});
</script>
