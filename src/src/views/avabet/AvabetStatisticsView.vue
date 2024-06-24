<script setup lang="ts">
import StatisticsBlock from '@/components/avabet/StatisticsBlock.vue'
import GameTable from '@/components/avabet/GameTable.vue'
import { BackButton } from 'vue-tg'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <BackButton @click="router.go(-1)"/>
  <div class="page avabet-stats">
    <div class="text-center page__title black-color mb-24">
      Bets history
    </div>

    <StatisticsBlock />

    <GameTable />

  </div>
</template>

<style scoped lang="scss">
.avabet-stats {
  background: #F0EFF5;
}

</style>