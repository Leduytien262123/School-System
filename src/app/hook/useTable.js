import { NButton, NCheckbox, NSpace, NText } from "naive-ui";
import { isFunction } from "radash";
// Hiện tại chưa sử dụng đến file này
function createColumnsSetting(columns) {
  const cloneColumns = $global.helpers.deepClone(columns);
  const columnsOptions = [];
  const columnsModelValue = [];
  cloneColumns.forEach((item) => {
    item.label = item.title;
    item.title = boldTitle(item.title);
    columnsOptions.push({ label: item.label, value: item.key });
    columnsModelValue.push(item.key);
  });
  return {
    cloneColumns,
    columnsOptions,
    columnsModelValue,
  };
}

function boldTitle(title, props = {}) {
  return h(
    NText,
    {
      strong: true,
      style: {
        "--n-font-weight-strong": 600,
      },
      ...props,
    },
    { default: isFunction(title) ? title : () => title }
  );
}

function renderMultiCheckbox(columnsModelValue, option) {
  return h(NCheckbox, {
    checked: columnsModelValue.includes(option.value),
    label: option.label,
  });
}

const useColumns = (columns, tableAttribute) => {
  const defaultColumns = [
    {
      type: "selection",
      width: 80,
      className: "fix-table-th",
      key: "selection",
      options: ["all", "none"],
    },
    ...columns,
    {
      type: "actions",
      key: "actions",
      title: "Thao tác",
      width: 200,
      align: "center",
      render(row) {
        return h(
          NSpace,
          {
            justify: "center",
          },
          {
            default: () => [
              h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: "small",
                  type: "info",
                  onClick: () => {
                    tableAttribute.onEdit(row);
                  },
                },
                { default: () => "Chỉnh sửa" }
              ),
              h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: "small",
                  type: "error",
                  onClick: () => {
                    tableAttribute.onDelete(row);
                  },
                },
                { default: () => "Xóa" }
              ),
            ],
          }
        );
      },
    },
  ];
  return computed(() =>
    defaultColumns.filter((column) => {
      return (
        tableAttribute.columnsModelValue.includes(column.key) ||
        column.type === "selection" ||
        column.type === "actions"
      );
    })
  );
};
const useTable = (columns, options = {}) => {
  const { cloneColumns, columnsOptions, columnsModelValue } =
    createColumnsSetting(columns);
  const tableAttribute = reactive({
    editShow: false,
    checkedRowKeys: [],
    size: "small",
    loading: false,
    columns: [],
    densityOptions: [
      { label: "Mặc định", value: "small" },
      { label: "Trung bình", value: "medium" },
      { label: "Rộng", value: "large" },
    ],
    columnsOptions,
    columnsModelValue,
    onRefresh() {
      tableAttribute.loading = true;
    },
    onClose(key) {
      key ? (tableAttribute.editShow = false) : (tableAttribute[key] = false);
    },
    onEdit() {},
    onDelete() {},
    ...options,
  });
  tableAttribute.columns = useColumns(cloneColumns, tableAttribute);
  return {
    tableAttribute,
    renderMultiCheckbox,
  };
};

const useRule = (rule, options) => {
  return rule.map((item) => {
    item.col = item.col || options.rule["col"] || { span: 6 };
    item.value = item.value || options.rule["value"] || "";
    item.type = item.type || options.rule["type"] || "input";
    return item;
  });
};
const useFormCreate = (rule = [], options = {}) => {
  const attribute = {
    fApi: ref(null),
    options: {
      resetBtn: false,
      submitBtn: false,
      col: {
        span: 24,
      },
      form: {
        inline: true,
      },
      rule: {},
      ...options,
    },
  };
  attribute.rule = useRule(rule, attribute.options);
  return reactive({
    ...attribute,
  });
};

export { useTable, useFormCreate, useColumns, useRule };
