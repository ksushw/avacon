<script setup lang="ts">

</script>

<template>
  <section class="button-group">
    <slot></slot>
  </section>
</template>

<style lang="scss">
.button-group {
  margin-bottom: 12px;
  .ava-button {
    border-radius: 0 !important;
    border-bottom: 1px solid #B9B9BB;
    &:first-child {
      border-radius: 12px 12px 0 0 !important;
    }
    &:last-child {
      border-radius: 0 0 12px 12px !important;
      border-bottom: none;
    }
  }
}
</style>