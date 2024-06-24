<script setup lang="ts">

import router from '@/router'
import { defineModel, type PropType } from 'vue'
import AvaBottomDrawer from '@/components/AvaBottomDrawer.vue'
import AvaButton from '@/components/AvaButton.vue'
import type { OrderType } from '@/types/market';

defineProps({
  order: {
    type: Object as PropType<Partial<OrderType>>,
    default: undefined
  }
})
defineEmits(['cancel'])
const visibleModal = defineModel({ default: false });
</script>

<template>
  <AvaBottomDrawer v-model="visibleModal">
    <section class="drawer__info info text-center">
      <div class="info__title">
        You have active order
      </div>
      <div class="info__text">
        Good, your gold will be sold as soon as a buyer is found
      </div>

      <div class="info__icon">
        <img src="@/assets/images/market/bear-with-gold-bar.png" alt="bear" />
      </div>
      <div class="info__card">
        <div class="info__card__info">
          <span>Quantity</span>
          <strong>
            {{ order?.volume }} gr
          </strong>
        </div>
        <div class="info__card__info">
          <span>Price per gr.</span>
          <span>
              <b> {{ order?.price }} USDT</b>
            </span>
        </div>
        <div class="info__card__info">
          <span>Order price</span>
          <span>
              <img class="profile__coin" src="@/assets/images/dollars.png" alt="best">
              <b> {{ Number(order?.price ?? 0) * Number(order?.volume ?? 0) }} USDT</b>
            </span>
        </div>
      </div>
      <div @click="$emit('cancel', order?.id)" class="info__cancel">
        Cancel order
      </div>
      <AvaButton
        block
        type="primary"
        @click="router.push('/market')"
      >
        Return to market
      </AvaButton>
    </section>
  </AvaBottomDrawer>
</template>

<style scoped lang="scss">
.drawer__info {
  .info {
    &__title {
      color: #000000;
      font-size: 32px;
      font-weight: 700;
      margin-top: 20px;
    }
    &__text {
      margin-top: 12px;
      margin-bottom: 24px;
      font-size: 16px;
      font-weight: 400;
      text-align: center;
      color: #626262;

    }
    &__icon img {
      width: 60%;
      margin-bottom: 16px;
    }

    &__cancel {
      font-size: 16px;
      font-weight: 500;
      color: #FD1E7C;
      text-align: left;
      margin-bottom: 32px;
      margin-top: 12px;
    }

    &__card {
      background: #6262621A;
      padding: 16px;
      border-radius: 24px;
      color: #000000;
      &__info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:not(:last-child) {
          margin-bottom: 24px;
        }
      }
    }

  }

}
</style>