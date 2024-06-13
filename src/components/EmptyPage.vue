<script setup lang="ts">
import AppLoader from '@/components/AppLoader.vue';
</script>

<template>
  <div class="empty-data">
    <app-loader size="130px"/>
  </div>
</template>

<style lang="scss" scoped>
.empty-data {
  background: #ffffff;
  min-height: 100vh;
  padding: 24px 16px;
  height: 100dvh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>