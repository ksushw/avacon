<script lang="ts" setup>

import { useRootStore } from '@/stores/root';
import { usePoints } from '@/composables/usePoints';
import { useCounterStore } from '@/stores/counter';

const root = useRootStore()
const points = usePoints()
const counterStore = useCounterStore()

function formatLimit(num: number) {
  if (num > 0) {
    return num
  }
  return 0
}

</script>

<template>
  <div class="footer__limit">
    <img src="@/assets/images/icons/thunder.png" alt="thunder">
    <div>
      <div v-if="root.userLoading" class="footer__limit__left--loader"></div>
      <div v-else class="footer__limit__left">{{ formatLimit(points.clickLimit.value - counterStore.clicked) }}</div>
      <div class="footer__limit__total">/{{ points.clickLimit }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.footer__limit {
  display: flex;
  gap: 4px;
  align-items: center;
  position: absolute;
  bottom: 80px;
  left: 0;

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

  img {
    height: 48px;
  }
}
</style>