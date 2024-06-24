<script lang="ts" setup>
import type { PropType } from 'vue';

defineProps({
  values: {
    type: Array as PropType<AvaSwitchProps[]>,
    default: () => ([])
  },
  modelValue: {
    type: String,
    required: true
  }
})

interface AvaSwitchProps {
  title: string
  value: string | boolean | number
}
</script>

<template>
  <div class="ava-switch">
    <div
        v-for="item in values"
        :class="{'active': modelValue === item.value}"
        class="ava-switch__item"
        @click="$emit('update:model-value', item.value)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ava-switch {
  background: #C9C9C9;
  border-radius: 8px;
  padding: 1px;
  display: flex;
  align-items: center;

  &__item {
    color: #000000;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    text-align: center;
    padding: 5px;
    width: 40px;
    cursor: pointer;

    &.active {
      background: #ffffff;
      border-radius: 8px;
      transition: all 0.25s ease-out;
    }

  }
}
</style>