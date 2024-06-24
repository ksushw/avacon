<script setup lang="ts">
defineProps<{
  modelValue: boolean
  bgColor?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'close'): void
}>()

const close = () => {
  emits('update:modelValue', false);
  emits('close');
}
</script>

<template>
  <Transition name="fade">
    <section v-if="modelValue" class="drawer">
      <div class="drawer__background" @click="close"></div>
      <div class="drawer__body" :style="{ backgroundColor: bgColor }">
        <div class="drawer__close" @click="close">Close</div>
        <slot></slot>
      </div>
    </section>
  </Transition>
</template>

<style scoped lang="scss">
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  &__background {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
  }
  &__body {
    position: absolute;
    bottom: 0;
    z-index: 1;
    border-radius: 10px 10px 0 0;
    background: var(--main-text-color);
    padding: 30px var(--page-horizontal-offset) 36px;
    box-sizing: border-box;
    width: 100%;
    min-height: 300px;
    max-height: 90vh;
    overflow: scroll;
    background: #F0EFF5;
  }
  &__close {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 20px;
    left: 20px;
    z-index: 2;
    color: #ff006b;
  }
}
</style>
