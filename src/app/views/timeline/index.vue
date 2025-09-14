<template>
  <n-grid cols="12" y-gap="20" x-gap="20" item-responsive responsive="screen">
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Dòng thời gian"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <n-timeline>
          <n-timeline-item content="Nội dung 1" />
          <n-timeline-item
            type="success"
            title="Thành công"
            content="Đã thành công ở đâu"
            time="2018-04-03 20:46"
          />
          <n-timeline-item
            type="error"
            content="Có lỗi ở đâu"
            time="2018-04-03 20:46"
          />
          <n-timeline-item
            type="warning"
            title="Cảnh báo"
            content="Có cảnh báo ở đâu"
            time="2018-04-03 20:46"
          />
          <n-timeline-item
            type="info"
            title="Thông tin"
            content="Đúng vậy"
            time="2018-04-03 20:46"
            line-type="dashed"
          />
          <n-timeline-item content="Nội dung 2" />
        </n-timeline>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Dòng thời gian"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <n-timeline horizontal>
          <n-timeline-item content="Nội dung 1" />
          <n-timeline-item
            type="success"
            title="Thành công"
            content="Đã thành công ở đâu"
            time="2018-04-03 20:46"
          />
          <n-timeline-item
            type="error"
            content="Có lỗi ở đâu"
            time="2018-04-03 20:46"
          />
          <n-timeline-item
            type="warning"
            title="Cảnh báo"
            content="Có cảnh báo ở đâu"
            time="2018-04-03 20:46"
          />
          <n-timeline-item
            type="info"
            title="Thông tin"
            content="Đúng vậy"
            time="2018-04-03 20:46"
          />
        </n-timeline>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Tùy chỉnh"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <n-timeline :icon-size="20">
          <n-timeline-item color="grey" content="Nội dung 1">
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
          </n-timeline-item>
          <n-timeline-item
            type="success"
            title="Thành công"
            content="Đã thành công ở đâu"
            time="2018-04-03 20:46"
          >
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
          </n-timeline-item>
          <n-timeline-item
            type="error"
            content="Có lỗi ở đâu"
            time="2018-04-03 20:46"
          >
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
          </n-timeline-item>
          <n-timeline-item
            type="warning"
            title="Cảnh báo"
            content="Có cảnh báo ở đâu"
            time="2018-04-03 20:46"
          >
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
          </n-timeline-item>
          <n-timeline-item
            type="info"
            title="Thông tin"
            content="Đúng vậy"
            time="2018-04-03 20:46"
          >
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
          </n-timeline-item>
        </n-timeline>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script setup>
import { CashOutline as CashIcon } from "@vicons/ionicons5";
</script>
