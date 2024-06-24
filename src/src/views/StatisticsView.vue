<script setup lang="ts">

import AvaCard from '@/components/AvaCard.vue'
import { useStatisticsStore } from '@/stores/statistics'
import { computed } from 'vue'
import minersIcon from '@/assets/images/statistics/total-miners.png'
import usersIcon from '@/assets/images/statistics/daily-users.png'
import { BackButton } from 'vue-tg'
import { useRouter } from 'vue-router'

const stat = useStatisticsStore()
const router = useRouter()

stat.getTotals()

const items = computed(() => {
  return [
    {
      label: 'Total holders',
      value: stat.totals?.total_users?.toLocaleString('en-EN') ?? 0,
      icon: minersIcon
    },
    {
      label: 'Daily users',
      value: stat.totals?.daily_active_users?.toLocaleString('en-EN') ?? 0,
      icon: usersIcon
    },
  ]
})

</script>

<template>
  <BackButton @click="router.go(-1)" />
  <section class="page stat">
    <div class="stat__logo">
      <img src="@/assets/images/statistics/coin-with-border.png" alt="coin">
    </div>

    <div class="stat__title">Ava app stats</div>

    <AvaCard class="w-100">
      <div v-for="(item, i) of items" :key="i" class="stat__item s-item">
        <div class="s-item__icon">
          <img :src="item.icon" alt="">
        </div>
        <div class="s-item__content">
          <div class="s-item__value">{{ item.value }}</div>
          <div class="s-item__label">{{ item.label }}</div>
        </div>
      </div>
    </AvaCard>

    <div class="stat__title">Tokenomics</div>

    <div class="stat__diagram">
      <img src="@/assets/images/statistics/statistics.png" alt="stat">
    </div>


  </section>
</template>

<style scoped lang="scss">
.mb-24 {
  margin-bottom: 24px;
}
.stat {
  background: url("@/assets/images/statistics/bg-top.png")  no-repeat left top,
  url("@/assets/images/statistics/bg-bottom.png")  no-repeat center bottom;

  background-size: contain;
  text-align: center;
  padding-bottom: 30px;

  &__diagram img{
    width: 100%;
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 16px;
    margin-top: 15px;
    text-align: left;
  }

  .s-item {
    display: flex;
    align-items: center;
    gap: 16px;
    &:not(:last-child) {
      margin-bottom: 16px;
    }
    &__content {
      text-align: left;
    }
    &__value {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 4px;
    }
    &__label {
      font-size: 14px;
      color: #C6BFB7;
    }
    &__icon {
      width: 64px;
      img {
        width: 100%;
      }
    }
  }

  &__logo img {
    height: 175px;
    margin-bottom: 16px;
  }
  &__item {
    width: 100%;
    display: flex;
  }
  &__text {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
  }
  &__coins {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 700;
    line-height: 39px;
    letter-spacing: -0.01em;
    gap: 5px;
    margin-bottom: 24px;
    img {
      height: 40px;
    }
  }
}
</style>