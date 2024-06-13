<script setup lang="ts">

import { onMounted } from 'vue';
import UserLevel from '@/components/UserLevel.vue';
import { useRanks } from '@/composables/useRanks';

const ranks = useRanks()

onMounted(async () => {
  await ranks.getRanks()
})

</script>

<template>
  <section class="l-table">
    <div class="l-table__row">
      <div class="l-table__col l-table--title">New league</div>
      <div class="l-table__col l-table--title">For fren</div>
    </div>

    <div v-for="rank of ranks.ranks" :key="rank.id" class="l-table__row">
      <div class="l-table__col">
        <UserLevel :rank="rank" />
      </div>
      <div class="l-table__col warning-text"> +{{ rank.referrer_rank_reward.points?.toLocaleString('en-EN') ?? 0 }} </div>
    </div>
  </section>
</template>

<style lang="scss">
.l-table {
  width: 100%;
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 16px;
    &:first-child {
      margin-bottom: 25px;
    }
  }
  &__col {
    &:first-child {
      display: flex;
      gap: 8px;
      align-items: center;
      img {
        height: 32px;
      }
    }
  }
  &--title {
    color: #626262;
    font-size: 16px;
  }
}
</style>