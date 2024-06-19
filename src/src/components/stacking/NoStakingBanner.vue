<script setup lang="ts">

import AvaButton from '@/components/AvaButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
  <div class="no-staking-banner">
    <div class="grid mb-4">
      <div class="diagram">
        <img src="@/assets/images/stacking/staking-diagramm.png" alt="">
      </div>
      <div>
        <div class="text-20 fw-600 mb-4">
          Stake your GOLD dust until
          next 1 month
        </div>
        <div class="text-12 grey-color">
          Get 30% APR for gold dust staking
        </div>
      </div>
    </div>

    <AvaButton type="warning" block @click="router.push('/stacking')">
      Staking
    </AvaButton>
  </div>
</template>

<style scoped lang="scss">
.no-staking-banner {
  height: 155px;
  border-radius: 24px;
  background: linear-gradient(257.45deg, #15183F 43.32%, #373FA5 103.98%);
  padding: 16px;
  box-sizing: border-box;
  .grid {
    display: grid;
    grid-template-columns: 92px auto;
    gap: 3px;
    .diagram img {
      height: 67px;
    }
  }
}
</style>