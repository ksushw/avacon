<script setup lang="ts">

import AvaBottomDrawer from '@/components/AvaBottomDrawer.vue'
import BalanceAndWalletInfo from '@/components/profile/BalanceAndWalletInfo.vue'

const model = defineModel({ default: false })


</script>

<template>
  <AvaBottomDrawer v-model="model" class="status-drawer">
    <div class="status-drawer__title text-center">
      Your USDT balance
    </div>
    <div class="status-drawer__text text-center">
      Top up your balance in USDT in TRC20 and have additional features in AVACOIN
    </div>

    <BalanceAndWalletInfo />

    <div class="red-text">
      Be careful, any amount you send that is less than $10 will not be counted toward your USDT balance.
    </div>

    <div class="status-drawer__img">
      <img src="@/assets/images/market/bear-money.png" alt="bear">
    </div>
  </AvaBottomDrawer>
</template>

<style scoped lang="scss">
.red-text {
  font-size: 16px;
  font-weight: 500;
  line-height: 19.36px;
  letter-spacing: -0.03em;
  text-align: center;
  color: #E20360;
  margin-top: 16px;
  margin-bottom: 40px;
}
</style>