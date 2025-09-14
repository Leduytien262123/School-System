<template>
  <template v-if="!$globalStore.deviceInfo.isMobile">
    <n-dropdown
      trigger="click"
      v-for="item in allOptions"
      :options="item.options"
      placement="bottom-start"
    >
      <n-button :bordered="false" @click="item.props.onClick">
        <n-badge>
          <component class="mr-2" :is="item.icon"></component>
        </n-badge>
        {{ $global?.helpers?.formatTitle($global, item) }}
      </n-button>
    </n-dropdown>
  </template>
  <n-dropdown
    v-else
    trigger="hover"
    :render-label="(item) => $global?.helpers?.formatTitle($global, item)"
    :options="allOptions"
  >
    <n-button :bordered="false">
      <n-badge>
        <n-icon size="20">
          <Apps />
        </n-icon>
      </n-badge>
    </n-button>
  </n-dropdown>
  <LayoutSettings v-model:show="visible"></LayoutSettings>
</template>
<script setup>
import {
  HomeOutline,
  NotificationsOutline,
  SettingsOutline,
  Apps,
  Language,
} from "@/packages/helpers/Icon.js";
import { UserCircleRegular } from "@vicons/fa";
import LayoutSettings from "./LayoutSettings.vue";
import { renderIcon } from "@/packages/helpers/index.js";
import { NAvatar, NText } from "naive-ui";

const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance();
const useI18n = globalProperties?.$global?.i18n?.useI18n();
const $router = globalProperties?.$router;

watch(
  () => globalProperties.$globalStore?.configs?.language,
  () => {
    useI18n.locale.value = globalProperties.$globalStore?.configs?.language;
  }
);

function renderCustomHeader() {
  return h(
    "div",
    {
      style: "display: flex; align-items: center; padding: 8px 12px;",
    },
    [
      h(NAvatar, {
        round: true,
        style: "margin-right: 12px;",
        src: "https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG",
      }),
      h("div", null, [
        h("div", null, [
          h(NText, { depth: 2 }, { default: () => "Người làm công" }),
        ]),
        h("div", { style: "font-size: 12px;" }, [
          h(
            NText,
            { depth: 3 },
            {
              default: () =>
                "Không nghi ngờ gì, bạn là ngôi sao sáng nhất trong văn phòng",
            }
          ),
        ]),
      ]),
    ]
  );
}

const noticeOptions = [
  {
    key: "header",
    type: "render",
    render: renderCustomHeader,
  },
  {
    key: "header-divider",
    type: "divider",
  },
  {
    label: "Xử lý 342 tin nhắn nhóm",
    key: "stmt1",
  },
  {
    label: "Bị @ 58 lần",
    key: "stmt2",
  },
  {
    label: "Tham gia 17 nhóm",
    key: "stmt3",
  },
];
const visible = ref(false);
const allOptions = [
  {
    title: "Trang chủ",
    key: "home",
    localesKey: "home",
    icon: renderIcon(HomeOutline, { size: 18 }),
    props: {
      onClick: () => {
        $router.push({ path: "/" });
      },
    },
  },
  {
    title: "Thông báo",
    key: "notifica",
    localesKey: "notification",
    icon: renderIcon(NotificationsOutline, { size: 18 }),
    props: {},
    options: noticeOptions,
  },
  {
    title: "Ngôn ngữ",
    key: "language",
    localesKey: "language",
    icon: renderIcon(Language, { size: 18 }),
    props: {
      onClick: () => {
        if (useI18n) {
          const langs = ["zh", "en", "vi"]; // Đảm bảo sử dụng 'vi' thay vì 'vn'
          const current = globalProperties.$globalStore.configs.language;
          const idx = langs.indexOf(current);
          const nextLang = langs[(idx + 1) % langs.length];
          globalProperties.$globalStore.configs.language = nextLang;

          // Hiển thị thông báo chuyển đổi ngôn ngữ
          const langNames = {
            zh: "中文",
            en: "English",
            vi: "Tiếng Việt",
          };
          globalProperties?.$global?.naive?.message?.success(
            `Đã chuyển sang ${langNames[nextLang]}`
          );
        } else {
          globalProperties?.$global?.naive?.message?.error(
            `Chưa cài đặt plugin language-plugin`
          );
        }
      },
    },
  },
  {
    title: "Cài đặt",
    key: "settings",
    localesKey: "setting",
    icon: renderIcon(SettingsOutline, { size: 18 }),
    props: {
      onClick: () => {
        visible.value = true;
      },
    },
  },
  {
    title: "Tên người dùng",
    key: "user",
    localesKey: "userName",
    icon: renderIcon(UserCircleRegular, { size: 18 }),
    props: {
      class: "mr-2",
    },
    options: [
      {
        title: "Chỉnh sửa tài khoản",
        key: "1",
        disabled: true,
      },
      {
        title: "Đăng xuất",
        key: "3",
        props: {
          onClick: () => {
            $router.push({ path: "/login" });
            $global.middleware.eventEmitter.emit("APP:LOGOUT");
          },
        },
      },
    ],
  },
];
</script>
