<script setup lang="ts">

import type { IListItem } from '@/types/props'
import ListItem from '@/components/ListItem.vue'
import AvaCard from '@/components/AvaCard.vue'
import icon from '@/assets/images/verified.svg'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { useRouter } from 'vue-router'
import { useRootStore } from '@/stores/root'
import { computed } from 'vue'

const router = useRouter()
const root = useRootStore()

const isVerified = computed(() => root.user?.is_channel_verified && root.user?.is_email_verified)

const item: IListItem = {
  avatar: icon,
  firstName: 'Verification 1 Level',
  lastName: '',
  level: 'Withdraw, ref dust and trading',
  points: '',
  clickable: true
}

</script>

<template>
  <AvaCard v-if="!isVerified" class="verification-info" bg-color="#626262">
    <ListItem
      :item="item"
      hide-coin
      icon-type="rounded"
      @click="router.push('/verification')"
    />

    <div class="verification-info__text">
      Please complete verification to gain access to all options.
    </div>

    <div class="verification-info__status">
      <CloseIcon />
      You have no verification
    </div>
  </AvaCard>
</template>

<style lang="scss">
.verification-info {
  &__text {
    margin-bottom: 12px;
    font-size: 16px;
  }
  &__status {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>