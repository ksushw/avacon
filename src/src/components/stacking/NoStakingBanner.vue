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
        <div class="no-staking-banner__title text-20 fw-600 mb-4">
          Stake your GOLD dust until
          next 1 month
        </div>
        <div class="no-staking-banner__subtitle text-12 grey-color">
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

  @media (max-height: 500px) {
    height: 80px;
    border-radius: 15px;
    padding: 5px;

  }

  .grid {
    display: grid;
    grid-template-columns: 92px auto;
    gap: 3px;

    @media (max-height: 500px) {
      grid-template-columns: 60px auto;
      gap: 1px;
    }

    .diagram img {
      height: 57px;

      @media (max-height: 500px) {
        height: 42px;
      }
    }
  }

  @media (max-height: 500px) {
    &__title {
      font-size: 10px;
    }

    &__subtitle {
      font-size: 8px;
    }
  }
}
</style>