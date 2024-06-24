<script setup lang="ts">

import AvaCard from '@/components/AvaCard.vue'
import { ref } from 'vue'
import { useBet } from '@/stores/bet';

const betStore = useBet();
const loading = ref(false)

getStats()

async function getStats() {
  try {
    loading.value = true
    await betStore.getStats();
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <AvaCard v-if="betStore.dataStats" bg-color="#FFFFFF" class="mb-24" :loading="loading">
    <div class="black-color header">
      <div class="grey-color text-center mb-12">
        Total AVACN wins
      </div>

      <div class="flex justify-center align-center text-24 fw-700 gap-5">
        <img src="@/assets/images/mini-coin.png" style="height: 24px" alt="coin">
        {{ betStore.dataStats?.total_wins_sum }}
      </div>
    </div>

    <div class="flex justify-between gap-10">
      <div class="text-center">
        <div class="fw-600 black-color">{{ betStore.dataStats?.total_bets }}</div>
        <div class="grey-color mt-4">Total bets</div>
      </div>

      <div class="text-center">
        <div class="fw-600 black-color">{{ betStore.dataStats?.total_wins }}</div>
        <div class="grey-color mt-4">Wins</div>
      </div>

      <div class="text-center">
        <div class="fw-600 black-color">{{ betStore.dataStats?.total_loses }}</div>
        <div class="grey-color mt-4">Lose</div>
      </div>

      <div class="text-center">
        <div class="fw-600 black-color">{{ betStore.dataStats?.total_in_game }}</div>
        <div class="grey-color mt-4">In game</div>
      </div>
    </div>
  </AvaCard>
</template>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid #DCDCDC;
  padding-bottom: 12px;
  margin-bottom: 12px;
}
</style>