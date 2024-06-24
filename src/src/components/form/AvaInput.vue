<script setup lang="ts">

import { onMounted } from 'vue';

const props = defineProps<{
  modelValue: string | number | null
  disabled?: boolean
  placeholder?: string
  hint?: string
  label?: string
  type: 'text' | 'textarea' | 'number'
  buttonText?: string
  disabledButton?: boolean
  bordered?: boolean
  inputColor?: string
}>();
defineEmits(['button-click', 'update:modelValue'])

onMounted(() => {
  if(props.type === 'textarea') {
    const el = document.querySelector('textarea')
    if(el) {
      el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
      el.classList.add('auto');
      el.addEventListener('input', () => {
        el.style.height = 'auto';
        el.style.height = (el.scrollHeight) + 'px';
      });
    }
  }
})

</script>

<template>
  <div :class="['ava-input', {bordered}]">
    <div v-if="props.label" class="ava-input__label">
      {{ props.label }}
    </div>
    <input
      v-if="props.type === 'text' || props.type === 'number'"
      :style="`background-color: ${inputColor}`"
      :value="modelValue"
      :disabled="disabled"
      :type="type"
      :placeholder="props?.placeholder ?? ''"
      @input="(e: Event) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
    >
    <textarea
      v-else
      :value="modelValue"
      rows="1"
      :placeholder="props?.placeholder ?? ''"
      @input="(e: Event) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
    ></textarea>
    <div
        v-if="buttonText"
        @click="$emit('button-click')"
        class="ava-input__button"
        :class="{'disabled': disabledButton}"
    >
      {{ buttonText }}
    </div>
    <div v-if="props.hint" class="ava-input__hint">
      {{ props.hint }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.ava-input {
  margin-bottom: 24px;
  position: relative;
  input, textarea {
    color: var(--body-background);
    padding: 14px 24px;
    border: none;
    border-radius: 12px;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    background: var(--main-text-color);
    overflow-y: hidden;
    &::placeholder {
      color: #8F8F8F;
    }
  }
  &.bordered {
    input, textarea {
      border: 1px solid #8F8F8F;
    }
  }

  &__button {
    color: #007AFF;
    font-size: 16px;
    font-weight: 500;
    position: absolute;
    right: 15px;
    bottom: 15px;
    &.disabled {
      color: #8F8F8F;
    }
  }

  &__label {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    color: #8F8F8F;
    margin-bottom: 5px;
    text-align: left;
  }
  &__hint {
    font-size: 14px;
    line-height: 17px;
    color: #8F8F8F;
    margin-top: 8px;
  }
}
</style>