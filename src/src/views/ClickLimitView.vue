<script setup lang="ts">

import { BackButton } from 'vue-tg';
import { useRouter } from 'vue-router';
import InviteButton from '@/components/frens/InviteButton.vue';
import { usePoints } from '@/composables/usePoints';

const router = useRouter()
const points = usePoints()

</script>

<template>
  <div class="page limit-view">
    <BackButton @click="router.push('/')" />

    <div class="limit-view__image">
      <img src="@/assets/images/bear.png" alt="bear">
    </div>

    <div class="limit-view__limit">
      <img src="@/assets/images/icons/thunder.png" alt="thunder">
      <div>
        <div class="limit-view__left">0</div>
        <div class="limit-view__total">/{{ points.clickLimit }}</div>
      </div>
    </div>

    <div class="limit-view__title">
      You have reached
      your daily limit
    </div>

    <div class="limit-view__text">
      Come back tomorrow or increase the limit in the boost section.
      You can also invite friends and create new guilds to earn more gold dust.
    </div>

    <InviteButton fixed type="warning" />
  </div>
</template>

<style scoped lang="scss">
.limit-view {
  padding-top: 60px;
  background: url("@/assets/images/limit-bg.png") no-repeat center bottom;
  background-size: contain;
  &__title {
    font-size: 32px;
    font-weight: 700;
    line-height: 39px;
    text-align: center;
    margin-bottom: 24px;
  }
  &__text {
    text-align: center;
    font-size: 16px;
  }
  &__image {
    text-align: center;
    margin-bottom: 24px;
    img {
      width: 228px;
    }
  }
  &__limit {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
    img {
      height: 48px;
    }
  }
  &__left {
    font-size: 24px;
    font-weight: 700;
    min-width: 65px;
    &--loader {
      width: 65px;
      height: 28px;
      border-radius: 10px;
      background: linear-gradient(90deg, transparent 25%, #1f1f1f66 37%, transparent 63%);
      overflow: hidden;
      background-size: 400% 100%;
      animation: el-skeleton-loading 1.4s ease infinite;
    }
  }
  &__total {
    font-size: 16px;
    font-weight: 500;
    opacity: 0.6;
  }
}
</style>