<script setup lang="ts">
import type { ButtonType } from '@/types/props'

withDefaults(
  defineProps<{
    fixed?: boolean
    block?: boolean
    small?: boolean
    disabled?: boolean
    type?: ButtonType
    loading?: boolean
    size?: 'xs'
  }>(),
  {
    type: 'primary',
    disabled: false
  }
)
</script>

<template>
  <button
    :class="['ava-button', type, size, { fixed, block, small }]"
    :disabled="disabled || loading"
  >
    <slot></slot>
    <i v-if="loading" class="spinner" />
  </button>
</template>

<style scoped lang="scss">
.ava-button {
  border-radius: 16px;
  padding: 16px 20px;
  border: none;
  outline: none;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 500;
  color: var(--pink-color);
  background: var(--button-base-background);
  &.xs {
    padding: 8px 20px;
    font-weight: 400;
    border-radius: 12px;
  }

  .spinner {
    display: inline-block;
    margin: 0 8px;
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    border: 0.215em solid transparent;
    vertical-align: middle;
    font-size: 10px;
    border-top-color: white;
    animation: spin 1s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  &.small {
    padding: 11px 20px;
    border-radius: 12px;
  }

  &.block {
    width: 100%;
  }
  &.fixed {
    position: fixed;
    left: var(--page-horizontal-offset);
    bottom: 24px;
    width: calc(100% - 2 * var(--page-horizontal-offset));
    z-index: 9;
  }
  &.warning {
    background: var(--button-warning-background);
    color: var(--main-text-color);
  }
  &.primary {
    background: var(--button-primary-background);
    color: var(--main-text-color);
  }
  &.info {
    background: var(--button-info-background);
    color: var(--main-text-color);
  }
  &:disabled {
    opacity: 0.6;
  }
}
</style>
