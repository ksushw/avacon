<script lang="ts" setup>
import { defineProps, computed } from 'vue'

const props = defineProps<{
  percent: number
}>()

const levelWidth = computed((): string => `${props.percent}%`)
</script>

<template>
  <div class="progress-line">
    <div class="progress-line__level"></div>
  </div>
</template>

<style lang="scss" scoped>
.progress-line {
  width: 100%;
  height: 12px;
  border-radius: 8px;
  background-color: #323338;
  overflow: hidden;

  &__level {
    width: v-bind(levelWidth);
    height: inherit;
    border-radius: inherit;
    background: linear-gradient(90deg, #f0c777 0%, #fecd00 100%);
    transition: 1s ease-out;
  }
}
</style>
