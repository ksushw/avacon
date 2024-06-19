<script setup lang="ts">
import type { NotifyItem } from '@/types/props'

defineProps<{
  item: NotifyItem
}>()
</script>

<template>
  <section class="noty">
    <img v-if="item.type === 'danger'" src="@/assets/images/icons/close.svg" alt="check" />
    <img v-else src="@/assets/images/icons/check.svg" alt="check" />
    <div>
      {{ item.message }}
    </div>
  </section>
</template>

<style scoped lang="scss">
.noty {
  border-radius: 12px;
  background: rgba(26, 26, 26, 0.8);
  position: fixed;
  bottom: 16px;
  left: var(--page-horizontal-offset);
  width: calc(100% - 2 * var(--page-horizontal-offset));
  padding: var(--page-horizontal-offset);
  z-index: 10;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  img {
    height: 24px;
  }
}
</style>
