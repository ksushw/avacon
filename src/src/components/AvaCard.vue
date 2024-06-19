<script setup lang="ts">
import AppLoader from '@/components/AppLoader.vue'

defineProps<{
  loading?: boolean
  minHeight?: string
  bgColor?: string
}>()
</script>

<template>
  <section class="ava-card" :style="`background: ${bgColor}`">
    <div v-if="$slots?.header" class="ava-card__header">
      <slot name="header"></slot>
    </div>
    <div class="ava-card__body" :style="{ minHeight }">
      <div v-if="loading" class="ava-card__loading">
        <AppLoader size="130px" />
      </div>
      <slot></slot>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ava-card {
  border-radius: var(--card-border-radius);
  background: var(--card-background);
  overflow: hidden;

  &__header {
    border-radius: var(--card-border-radius) var(--card-border-radius) 0 0;
    overflow: hidden;
  }
  &__body {
    padding: var(--card-body-offset);
    position: relative;
    height: 100%;
    box-sizing: border-box;
  }
  &__loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    min-height: 150px;
    z-index: 2;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    border-bottom-right-radius: var(--card-border-radius);
    border-bottom-left-radius: var(--card-border-radius);
  }
  .loader {
    border: 6px solid #f3f3f3;
    border-top: 6px solid var(--warning-text-color);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
