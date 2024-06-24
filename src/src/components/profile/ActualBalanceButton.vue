<script setup lang="ts">

import { useRootStore } from '@/stores/root'

const root = useRootStore()

</script>

<template>
  <router-link to="/profile" class="balance-button">
    <img src="@/assets/images/dollars.png" alt="usd">
    {{ root.user?.usdt?.toLocaleString('en-EN') ?? 0 }}
  </router-link>
</template>

<style scoped lang="scss">
.balance-button {
  display: flex;
  align-items: center;
  position: absolute;
  right: -16px;
  top: 0;
  height: 35px;
  background: #FFFFFF80;
  border-radius: 12px 0 0 12px;
  padding: 6px;
  font-size: 16px;
  color: #000000;
  text-decoration: none;
  gap: 4px;
  img {
    width: 21px;
  }
}
</style>