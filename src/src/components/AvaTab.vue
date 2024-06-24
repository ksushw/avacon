<script setup lang="ts">
import type { AvaTabProps } from '@/types/props';

const props = defineProps<{
  modelValue: string | number | boolean
  options: AvaTabProps[]
  type?: 'default' | 'primary'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', d: typeof props.modelValue): void
}>()

function change(val: AvaTabProps) {
  if (val?.disabled) return
  emit('update:modelValue', val.value)
}
</script>

<template>
  <section class="lime-tab" :class="{'is-primary': type === 'primary'}">
    <div
      v-for="(option, index) of options"
      :key="index"
      :class="['lime-tab__item', {
        active: option.value === props.modelValue,
        disabled: option?.disabled
      }]"
      @click="change(option)"
    >
      <span class="title" v-html="option.title"></span>
      <span v-if="option.soon" class="soon">soon</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.lime-tab {
  display: flex;
  border-bottom: 1px solid #c1bdbd;
  &>* {
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: var(--secondary-text-color);
    padding: 16px 9px;
    border-bottom: 2px solid transparent;
    transition: 0.3s;
    position: relative;

    .title {
      padding-right: 7px;
    }

    .soon {
      position: absolute;
      height: 12px;
      width: 31px;
      background: var(--warning-text-color);
      padding: 1px 4px;
      border-radius: 4px;
      color: #191919;
      top: 18px;
      font-size: 10px;
    }

    &.active {
      border-color: #ffffff;
      color: var(--main-text-color);
    }
    &.disabled {
      cursor: not-allowed;
    }
  }

  &.is-primary {
    .active {
      border-color: #007AFF;
      color: #007AFF;
    }
  }
}
</style>