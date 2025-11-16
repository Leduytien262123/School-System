<template>
  <n-config-provider
    :locale="locales[$globalStore.configs.language].locale"
    :date-locale="locales[$globalStore.configs.language].dateLocale"
    abstract
    :theme="$globalStore.configs.isDarkMode ? darkTheme : null"
    :theme-overrides="$globalStore.theme.overrides"
  >
    <n-global-style />

    <n-loading-bar-provider>
      <template v-if="$globalStore.isRouterReload">
        <router-view v-if="$globalStore.isIframe" name="iframe"> </router-view>
        <router-view v-else></router-view>
      </template>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
<script setup>
import {
  darkTheme,
  NConfigProvider,
  zhCN,
  dateZhCN,
  viVN,
  dateViVN,
} from "naive-ui";

const locales = ref({
  zh: {
    locale: zhCN,
    dateLocale: dateZhCN,
  },
  en: {
    locale: ref(null),
    dateLocale: ref(null),
  },
  vi: {
    locale: viVN,
    dateLocale: dateViVN,
  },
});
</script>
