<script setup lang="ts">

import { useStatisticsStore } from '@/stores/statistics'

const stat = useStatisticsStore()

stat.getTotals()

</script>

<template>
  <section class="stat-total">
    <div class="stat-total__content">
      <img src="@/assets/images/statistics/total-stat-users.png" alt="users">
      <span>{{ stat.totals?.total_users?.toLocaleString('en-EN') ?? 0 }} AVAcoin holders</span>
    </div>
    <router-link to="/statistics" class="stat-total__action">
      Stats
      <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L5 5L1 9" stroke="#A3A3A3" stroke-width="1.5"/>
      </svg>
    </router-link>
  </section>
</template>

<style scoped lang="scss">
.stat-total {
  background: #FFFFFFCC;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  color: #0E0E0E;
  justify-content: space-between;
  margin-bottom: 16px;
  &__action {
    font-size: 16px;
    color: #A3A3A3;
    display: flex;
    align-items: center;
    gap: 4px;
    text-decoration: none;
  }
  &__content {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
    font-weight: 500;
    img {
      height: 24px;
    }
  }
}
</style>