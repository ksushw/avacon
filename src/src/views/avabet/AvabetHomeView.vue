<script setup lang="ts">

import ItemCard from '@/components/avabet/ItemCard.vue'
import { onMounted } from 'vue'
import { BackButton } from 'vue-tg'
import { useRouter } from 'vue-router'
import { useBet } from '@/stores/bet';

const router = useRouter()

const betStore = useBet();

onMounted(() => {
  betStore.getBet();
})

</script>

<template>
  <BackButton @click="router.go(-1)"/>
  <div class="avabet-page page">
    <div class="banner">
      <div class="inner">
        <img class="uefa" src="@/assets/images/avabet/uefa.png" alt="uefa">
        <div>
          GUESS THE WINNER
        </div>
        <div class="title mb-24">
          AND WIN SPECIAL <br>
          PRICES
        </div>

<!--        <router-link to="#" class="more flex align-center gap-8">-->
<!--          More information-->
<!--          <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--            <path d="M1.5 1.5L5.5 5.5L1.5 9.5" stroke="white" stroke-width="1.5"/>-->
<!--          </svg>-->
<!--        </router-link>-->
      </div>
    </div>

    <div class="history flex align-center justify-between" @click="router.push('/avabet/history')">
      <div class="flex align-center gap-12 black-color">
        <div class="time-icon flex align-center justify-center">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.51219 11.569C3.7322 6.79399 7.67314 2.99023 12.5025 2.99023C17.4731 2.99023 21.5025 7.01967 21.5025 11.9902C21.5025 16.9608 17.4731 20.9902 12.5025 20.9902C10.9529 20.9902 9.49483 20.5986 8.22176 19.909C7.90205 19.7358 7.81699 19.3246 8.01807 19.0217C8.21426 18.7261 8.60983 18.6447 8.92383 18.8099C9.99303 19.3721 11.2106 19.6902 12.5025 19.6902C16.7551 19.6902 20.2025 16.2428 20.2025 11.9902C20.2025 7.73764 16.7551 4.29023 12.5025 4.29023C8.40141 4.29023 5.04915 7.49639 4.81551 11.5389L4.82076 11.5388L5.91233 10.3728C6.04233 10.2328 6.22233 10.1628 6.39233 10.1628C6.55233 10.1628 6.70233 10.2128 6.81233 10.3428C7.07233 10.5928 7.09233 11.0028 6.84233 11.2628L4.65233 13.6128C4.38233 13.9128 3.91233 13.9128 3.63233 13.6128L1.44233 11.2628C1.19233 11.0028 1.21233 10.5928 1.47233 10.3428C1.73233 10.0928 2.14233 10.1128 2.39233 10.3728L3.51219 11.569Z" fill="#007AFF"/>
            <path d="M13.1525 8.14367C13.1525 7.78469 12.8615 7.49367 12.5025 7.49367C12.1435 7.49367 11.8525 7.78469 11.8525 8.14367V12.6437C11.8525 13.0027 12.1435 13.2937 12.5025 13.2937H16.5025C16.8615 13.2937 17.1525 13.0027 17.1525 12.6437C17.1525 12.2847 16.8615 11.9937 16.5025 11.9937H13.1525V8.14367Z" fill="#007AFF"/>
          </svg>
        </div>

        Bets history
      </div>

      <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 1L7.5 7L1.5 13" stroke="#8A8A8A" stroke-width="1.5"/>
      </svg>
    </div>


    <div class="list">
      <ItemCard
        v-for="bet in betStore.bets"
        :key="bet.id"
        :bet="bet"
        @update="betStore.getBet"
      />
    </div>

  </div>
</template>

<style scoped lang="scss">
.avabet-page {
  background: #193ECB url("@/assets/images/avabet/avabet-bg.png") no-repeat center;
  background-size: cover;
  .history {
    margin-bottom: 24px;
    border-radius: 24px;
    background-color: #ffffff;
    padding: 8px 16px;
    .time-icon {
      width: 40px;
      height: 40px;
      border-radius: 40px;
      background: #F0EFF5;
    }
  }
  .banner {
    background: url("@/assets/images/avabet/bet-banner.png") no-repeat center;
    background-size: cover;
    box-sizing: border-box;
    border-radius: 40px;
    overflow: hidden;
    position: relative;
    line-height: 22px;
    margin-bottom: 24px;
    border: 2px solid #ffffff;
    .uefa {
      position: absolute;
      top: 13px;
      right: 13px;
      height: 49px;
    }
    .more {
      text-decoration: none;
      color: #ffffff;
    }
    .inner {
      min-height: 147px;
      padding: 24px 20px 23px;
      box-sizing: border-box;
      background-color: rgba(12, 26, 75, 0.6);
    }
    .title {
      font-weight: 700;
    }
  }
  .list {
    padding: 4px 0;
    border-radius: 24px;
    background: #ffffff;
  }
}
</style>