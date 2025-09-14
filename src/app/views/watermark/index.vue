<template>
  <n-grid cols="12" y-gap="20" x-gap="20" item-responsive responsive="screen">
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Chữ watermark"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <n-watermark
          content="Cơ mật nội bộ"
          cross
          selectable
          :font-size="16"
          :line-height="16"
          :width="192"
          :height="128"
          :x-offset="12"
          :y-offset="28"
          :rotate="-15"
        >
          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>Ôn tập</th>
                <th>Trao quyền</th>
                <th>Phối hợp</th>
                <th>...</th>
                <th>Kết nối</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kết nối</td>
                <td>Thông suốt</td>
                <td>Xây dựng</td>
                <td>...</td>
                <td>Thực hiện</td>
              </tr>
              <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </n-table>
        </n-watermark>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Hình watermark"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <template #header-extra>
          <n-image height="30" width="30" :src="logo"></n-image>
        </template>
        <n-watermark
          :image="logo"
          cross
          :rotate="-15"
          :font-size="16"
          :line-height="16"
          :width="192"
          :height="128"
          :x-offset="12"
          :y-offset="30"
          :image-width="20"
          :image-opacity="0.24"
        >
          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>Ôn tập</th>
                <th>Trao quyền</th>
                <th>Phối hợp</th>
                <th>...</th>
                <th>Kết nối</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kết nối</td>
                <td>Thông suốt</td>
                <td>Xây dựng</td>
                <td>...</td>
                <td>Thực hiện</td>
              </tr>
              <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </n-table>
        </n-watermark>
      </n-card>
    </n-grid-item>
    <n-grid-item span="12 m:12 l:12">
      <n-card
        title="Hình watermark"
        style="height: 100%"
        :segmented="{ content: true, footer: true }"
        header-style="padding:10px;font-size:14px"
        footer-style="padding:10px"
        content-style="padding:10px;height:100%"
      >
        <template #header-extra>
          <n-input-group>
            <n-input
              v-model:value="text"
              placeholder="Nhập watermark tuỳ chỉnh"
            />
          </n-input-group>
        </template>
        <n-watermark
          v-model:content="text"
          cross
          :rotate="-15"
          :font-size="16"
          :line-height="16"
          :width="192"
          :height="128"
          :x-offset="12"
          :y-offset="30"
          :image-width="20"
          :image-opacity="0.24"
        >
          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>Ôn tập</th>
                <th>Trao quyền</th>
                <th>Phối hợp</th>
                <th>...</th>
                <th>Kết nối</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kết nối</td>
                <td>Thông suốt</td>
                <td>Xây dựng</td>
                <td>...</td>
                <td>Thực hiện</td>
              </tr>
              <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </n-table>
        </n-watermark>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script setup>
import logo from "@/packages/assets/logo.png";
const text = ref("自定义水印");
</script>
