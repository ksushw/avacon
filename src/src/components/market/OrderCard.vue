<script setup lang="ts">

import AvaCard from '@/components/AvaCard.vue'

import AvaButton from '@/components/AvaButton.vue'
import ProfileIcon from '@/components/profile/ProfileIcon.vue'
import { type PropType } from 'vue'
import type { OrderType } from '@/types/market';

defineProps({
  order: {
    type: Object as PropType<OrderType>,
    default: () => ({})
  }
})

defineEmits(['buy'])

</script>

<template>
  <AvaCard bg-color="#FFFFFF" class="order-card">
    <div class="order-card__header flex justify-between">
      <div>
        <div class="order-card__title">{{ order.price * order.volume }} USDT</div>
        <div class="order-card__subtitle">{{ order.volume }} gr. in order</div>
      </div>
      <div class="order-card__buy">
        <AvaButton type="warning" size="xs" @click="$emit('buy', order)">
          <div class="flex align-center gap-8">
            Buy
            <img src="@/assets/images/icons/coins.svg" alt="coins">
          </div>
        </AvaButton>
      </div>
    </div>

    <div class="order-card__user flex align-center">
      <ProfileIcon
          size="40px"
          initials="MT"
          :verified="order.seller.is_email_verified && order.seller.is_channel_verified"
          :image="order.seller.avatar_path"
      />
      <span>{{ order.seller.first_name }} {{ order.seller.last_name }}</span>
    </div>

    <div class="order-card__info flex align-center justify-between">
      <span>Quantity</span>
      <strong>1 gr.</strong>
    </div>
    <div class="order-card__info flex align-center justify-between">
      <span>Price per gr.</span>
      <strong>{{ order.price }} USDT</strong>
    </div>
  </AvaCard>
</template>

<style scoped lang="scss">
.order-card {
  margin-bottom: 8px;
  &__user {
    gap: 12px;
    font-size: 14px;
    margin-bottom: 8px;
  }
  &__header {
    margin-bottom: 12px;
  }
  &__title {
    font-size: 24px;
    font-weight: 700;
    line-height: 29.05px;
  }
  &__subtitle {
    font-size: 14px;
    font-weight: 500;
    line-height: 16.94px;
    color: #8A8A8A;
  }
  &__info {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>