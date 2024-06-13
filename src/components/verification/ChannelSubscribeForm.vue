<script setup lang="ts">

import ListItem from '@/components/ListItem.vue'
import AvaCard from '@/components/AvaCard.vue'
import AvaButton from '@/components/AvaButton.vue'
import { ref } from 'vue'
import { useAxios } from '@/composables/useAxios'
import { useRootStore } from '@/stores/root'
import type { IListItem } from '@/types/props'
import coin from '@/assets/images/profile/coin.png'
import { useNotificationStore } from '@/stores/notification';

const root = useRootStore()
const notificationStore = useNotificationStore()

const item: IListItem = {
  firstName: 'Subscribe to AVACOIN community',
  lastName: '',
  avatar: coin,
  clickable: true,
  points: ''
}

const channelLoading = ref()
const isDisabledCheckButton = ref(false);
const disableCounter = ref(0);

async function checkSubscribe() {
  try {
    channelLoading.value = true
    const data = await useAxios<{status: boolean}>('/verification/channel/', {
      method: 'POST'
    })
    if (data?.status && root.user) {
      notificationStore.push({
        message: 'Success',
        type: 'info'
      })
      root.user.is_channel_verified = true;
    }

    if (data?.status === false) {
      isDisabledCheckButton.value = true
      disableCounter.value = 30
      notificationStore.push({
        message: 'Subscription not confirmed',
        type: 'danger'
      })

      const counter = setInterval(() => {
        disableCounter.value --;
        if(disableCounter.value === 0){
          clearInterval(counter);
          isDisabledCheckButton.value = false
        }
      }, 1000)
    }
  } catch (e) {
    notificationStore.push({
      message: 'Server error',
      type: 'warning'
    })
    console.log(e)
  } finally {
    channelLoading.value = false
  }
}

function openTg() {
  window.open('https://t.me/avagoldcoin');
}
</script>

<template>
  <AvaCard class="mb-12 channel-subscribe">
    <ListItem
      :item="item"
      icon-type="rounded"
      hide-coin
      @click="openTg"
    />
    <AvaButton
      block
      type="primary"
      :loading="channelLoading"
      :disabled="root.user?.is_channel_verified || isDisabledCheckButton"
      @click="checkSubscribe"
    >
      {{ isDisabledCheckButton ? `${disableCounter}...` : 'Check subscription' }}
    </AvaButton>
  </AvaCard>
</template>

<style scoped lang="scss">
.channel-subscribe {
  &:deep(.list-item__title) {
    text-align: left;
    text-overflow: clip;
    white-space: normal;
  }

  &:deep(.list-item__icon) {
    background-size: 80%;
  }
}
</style>