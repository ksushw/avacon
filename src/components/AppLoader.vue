<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  size: string
}>()

const padding = computed(() => {
  return `${(parseInt(props.size) / 260) * 10}px`
})
</script>

<template>
  <div class="app-loader" :style="{ width: size, height: size, padding }">
    <div :style="{ padding }">
      <div :style="{ padding }">
        <div :style="{ padding }">
          <div :style="{ padding }">
            <div :style="{ padding }">
              <div :style="{ padding }">
                <div :style="{ padding }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-loader {
  overflow: hidden;

  &,
  & div {
    border-radius: 50%;
    border: 2px solid transparent;
    box-sizing: border-box;
    height: 100%;
    border-top-color: #f9d649;
    animation: rotate 4s infinite linear;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
