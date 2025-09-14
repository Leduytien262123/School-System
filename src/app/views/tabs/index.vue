<template>
  <n-grid cols="12" y-gap="20" x-gap="20" item-responsive responsive="screen">
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Tab chi tiết - Kích hoạt menu và truyền rid là id menu cần làm nổi bật"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;"
      >
        <n-space>
          <n-switch v-model:value="$globalStore.configs.isTabCover">
            <template #checked>
              Chỉ mở một trang chi tiết, sau khi chuyển nên làm mới trang
            </template>
            <template #unchecked>
              Mở nhiều trang chi tiết, sau khi chuyển nên làm mới trang
            </template>
          </n-switch>
          <n-button
            @click="
              handleRouter({
                id: 1,
                title: 'Mở trang chi tiết và truyền tham số 1',
              })
            "
            type="tertiary"
          >
            Mở trang chi tiết và truyền tham số 1
          </n-button>
          <n-button
            @click="
              handleRouter({
                id: 2,
                title: 'Mở trang chi tiết và truyền tham số 2',
              })
            "
            type="primary"
          >
            Mở trang chi tiết và truyền tham số 2
          </n-button>
          <n-button
            @click="
              handleRouter({
                id: 3,
                title: 'Mở trang chi tiết và truyền tham số 3',
              })
            "
            type="info"
          >
            Mở trang chi tiết và truyền tham số 3
          </n-button>
        </n-space>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Chuyển hướng nội bộ"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;"
      >
        <n-space>
          <n-button
            type="success"
            @click="$global.router.push({ name: 'keep/nested' })"
          >
            Chuyển đến menu lồng sâu (khuyến nghị dùng name để chuyển)
          </n-button>
          <n-button
            @click="$global.router.push({ name: 'business' })"
            type="warning"
          >
            Chuyển đến trang trắng
          </n-button>
        </n-space>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script setup>
const handleRouter = ({ id, title }) => {
  $global.router.push({
    path: `/tabs/detail/${id}`,
    query: {
      rid: $globalStore.currentRouter?.meta?.id,
      title,
    },
  });
};
</script>
