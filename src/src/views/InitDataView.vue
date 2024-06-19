<script setup lang="ts">

import AvaInput from '@/components/form/AvaInput.vue';
import { useWebApp } from 'vue-tg';
import AvaButton from '@/components/AvaButton.vue';
import { copyToClipboard } from '@/utils/copy';
import { useNotificationStore } from '@/stores/notification';

const webApp = useWebApp()
const noty = useNotificationStore()

const isDev = import.meta.env?.VITE_USER_NODE_ENV === 'development'

function copy() {
  copyToClipboard(webApp.initData)
  noty.push({
    message: 'Copied',
    type: 'info'
  })
}

</script>

<template>
  <div v-if="isDev" class="page">
    <AvaInput v-model="webApp.initData" type="text" />
    <AvaButton block type="primary" @click="copy">
      Скопировать
    </AvaButton>
  </div>
</template>

<style scoped lang="scss">

</style>