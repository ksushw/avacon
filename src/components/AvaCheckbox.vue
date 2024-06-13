<script lang="ts" setup>

defineProps({
  modelValue: {
    type: String,
    default: undefined
  },
  active: {
    type: String,
    required: true
  }
})

defineEmits(['update'])
</script>

<template>
  <div class="ava-checkbox" @click="$emit('update', modelValue)">
    <div class="ava-checkbox__input" :class="{'active': modelValue === active}"/>
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.ava-checkbox {
  display: grid;
  grid-template-columns: 20px 1fr;
  column-gap: 10px;
  align-items: center;

  &__input {
    width: 20px;
    height: 20px;
    border-radius: 50px;
    border: 1px solid #B0B5BD;
    background: #E5E7EB;
    cursor: pointer;
    box-sizing: border-box;

    &.active {
      border: 5px solid #0062FF;
      background: #FFFFFF;
    }
  }
}
</style>