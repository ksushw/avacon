<script setup lang="ts">

import { ref } from 'vue';
import AppLoader from '@/components/AppLoader.vue';

const props = defineProps<{
  loading?: boolean
}>()

const visible = ref(false)

if (import.meta.env?.VITE_MODE !== 'local') {
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 3000)
}

</script>

<template>
  <section v-if="visible || props.loading" class="main-loader">
    <AppLoader size="260px" />

    <div class="main-loader__text">
      TAKE GOLD
      <div class="anim"></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.main-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 31;
  background-color: var(--body-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  gap: 100px;

  &__text {
    text-align: center;
    font-size: 40px;
    text-transform: uppercase;
    color: #F9D649;
    position: relative;
    .anim {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #000000  0%, transparent 33%,  #000000 100%);
      overflow: hidden;
      background-size: 400% 100%;
      animation: text-bg-anim 3s infinite;
    }
  }
}

@keyframes text-bg-anim {
  0% {
    background-position: 100% 50%
  }
  50% {
    background-position: 0 50%
  }
  100% {
    background-position: 100% 50%
  }
}


</style>