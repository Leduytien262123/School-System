<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
    :size="size"
    :style="{
      maxWidth: '640px',
    }"
  >
    <n-form-item label="Họ tên" path="inputValue">
      <n-input v-model:value="model.inputValue" placeholder="Nhập họ tên" />
    </n-form-item>
    <n-form-item label="Ghi chú" path="textareaValue">
      <n-input
        v-model:value="model.textareaValue"
        placeholder="Nhập ghi chú"
        type="textarea"
        :autosize="{
          minRows: 3,
          maxRows: 5,
        }"
      />
    </n-form-item>
    <n-form-item label="Chọn một giá trị" path="selectValue">
      <n-select
        v-model:value="model.selectValue"
        placeholder="Chọn một giá trị"
        :options="generalOptions"
      />
    </n-form-item>
    <n-form-item label="Chọn nhiều giá trị" path="multipleSelectValue">
      <n-select
        v-model:value="model.multipleSelectValue"
        placeholder="Chọn nhiều giá trị"
        :options="generalOptions"
        multiple
      />
    </n-form-item>
    <n-form-item label="Ngày giờ" path="datetimeValue">
      <n-date-picker v-model:value="model.datetimeValue" type="datetime" />
    </n-form-item>
    <n-form-item label="Bật/Tắt" path="switchValue">
      <n-switch v-model:value="model.switchValue" />
    </n-form-item>
    <n-form-item label="Nhóm Checkbox" path="checkboxGroupValue">
      <n-checkbox-group v-model:value="model.checkboxGroupValue">
        <n-space>
          <n-checkbox value="Lựa chọn 1"> Lựa chọn 1 </n-checkbox>
          <n-checkbox value="Lựa chọn 2"> Lựa chọn 2 </n-checkbox>
          <n-checkbox value="Lựa chọn 3"> Lựa chọn 3 </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="Nhóm Radio" path="radioGroupValue">
      <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup1">
        <n-space>
          <n-radio value="Radio 1"> Radio 1 </n-radio>
          <n-radio value="Radio 2"> Radio 2 </n-radio>
          <n-radio value="Radio 3"> Radio 3 </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="Nhóm Radio dạng nút" path="radioGroupValue">
      <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup2">
        <n-radio-button value="Radio 1"> Radio 1 </n-radio-button>
        <n-radio-button value="Radio 2"> Radio 2 </n-radio-button>
        <n-radio-button value="Radio 3"> Radio 3 </n-radio-button>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="Số" path="inputNumberValue">
      <n-input-number v-model:value="model.inputNumberValue" />
    </n-form-item>
    <n-form-item label="Chọn thời gian" path="timePickerValue">
      <n-time-picker v-model:value="model.timePickerValue" />
    </n-form-item>
    <n-form-item label="Thanh trượt" path="sliderValue">
      <n-slider v-model:value="model.sliderValue" :step="5" />
    </n-form-item>
    <n-form-item label="Chuyển đổi" path="transferValue">
      <n-transfer
        v-model:value="model.transferValue"
        :options="generalOptions"
      />
    </n-form-item>
    <n-form-item label="Trường lồng nhau" :show-feedback="false">
      <n-grid :cols="2" :x-gap="24">
        <n-form-item-gi path="nestedValue.path1">
          <n-input
            v-model:value="model.nestedValue.path1"
            placeholder="Trường lồng nhau 1"
          />
        </n-form-item-gi>
        <n-form-item-gi path="nestedValue.path2">
          <n-select
            v-model:value="model.nestedValue.path2"
            placeholder="Trường lồng nhau 2"
            :options="generalOptions"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form-item>
    <div style="display: flex; justify-content: flex-end">
      <n-button round type="primary" @click="handleValidateButtonClick">
        Xác thực
      </n-button>
    </div>
  </n-form>

  <pre
    >{{ JSON.stringify(model, null, 2) }}
</pre
  >
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const formRef = ref(null);
    return {
      formRef,
      size: ref("medium"),
      model: ref({
        inputValue: null,
        textareaValue: null,
        selectValue: null,
        multipleSelectValue: null,
        datetimeValue: null,
        nestedValue: {
          path1: null,
          path2: null,
        },
        switchValue: false,
        checkboxGroupValue: null,
        radioGroupValue: null,
        radioButtonGroupValue: null,
        inputNumberValue: null,
        timePickerValue: null,
        sliderValue: 0,
        transferValue: null,
      }),
      generalOptions: ["groode", "veli good", "emazing", "lidiculous"].map(
        (v) => ({
          label: v,
          value: v,
        })
      ),
      rules: {
        inputValue: {
          required: true,
          trigger: ["blur", "input"],
          message: "Vui lòng nhập họ tên",
        },
        textareaValue: {
          required: true,
          trigger: ["blur", "input"],
          message: "Vui lòng nhập ghi chú",
        },
        selectValue: {
          required: true,
          trigger: ["blur", "change"],
          message: "Vui lòng chọn một giá trị",
        },
        multipleSelectValue: {
          type: "array",
          required: true,
          trigger: ["blur", "change"],
          message: "Vui lòng chọn nhiều giá trị",
        },
        datetimeValue: {
          type: "number",
          required: true,
          trigger: ["blur", "change"],
          message: "Vui lòng nhập ngày giờ",
        },
        nestedValue: {
          path1: {
            required: true,
            trigger: ["blur", "input"],
            message: "Vui lòng nhập trường lồng nhau 1",
          },
          path2: {
            required: true,
            trigger: ["blur", "change"],
            message: "Vui lòng nhập trường lồng nhau 2",
          },
        },
        checkboxGroupValue: {
          type: "array",
          required: true,
          trigger: "change",
          message: "Vui lòng chọn nhóm Checkbox",
        },
        radioGroupValue: {
          required: true,
          trigger: "change",
          message: "Vui lòng chọn nhóm Radio",
        },
        radioButtonGroupValue: {
          required: true,
          trigger: "change",
          message: "Vui lòng chọn nhóm Radio dạng nút",
        },
        inputNumberValue: {
          type: "number",
          required: true,
          trigger: ["blur", "change"],
          message: "Vui lòng nhập số",
        },
        timePickerValue: {
          type: "number",
          required: true,
          trigger: ["blur", "change"],
          message: "Vui lòng nhập thời gian",
        },
        sliderValue: {
          validator(rule, value) {
            return value > 50;
          },
          trigger: ["blur", "change"],
          message: "Giá trị thanh trượt cần lớn hơn 50",
        },
        transferValue: {
          type: "array",
          required: true,
          trigger: "change",
          message: "Vui lòng nhập giá trị chuyển đổi",
        },
      },
      handleValidateButtonClick(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {});
      },
    };
  },
});
</script>
