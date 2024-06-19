<script setup lang="ts">

import { useRootStore } from '@/stores/root'
import AvaCard from '@/components/AvaCard.vue'
import rocket from '@/assets/images/booster/rocket-mini.png'
import plots from '@/assets/images/earn/plot.png'
import ListItem from '@/components/ListItem.vue'
import { useRouter } from 'vue-router'
import { BackButton } from 'vue-tg'
import DollarIcon from '@/components/icons/DollarIcon.vue';
import InviteButton from '@/components/frens/InviteButton.vue';

const root = useRootStore()
const router = useRouter()

const items = [
  {
    firstName: 'Boosters',
    lastName: '',
    avatar: rocket,
    clickable: true,
    points: 'Make your earn more profitable',
    link: '/booster'
  },
  {
    firstName: 'Plots',
    lastName: '',
    avatar: plots,
    clickable: true,
    points: 'New earning opportunities with 100% APR',
    link: '/earn'
  }
]
</script>

<template>
  <BackButton
      @click="router.push('/')"
  />
  <div class="page active">
    <div class="active__balance a-balance">
      <div class="a-balance__icon">
        <DollarIcon/>
      </div>

      <div class="a-balance__body">
        <div class="a-balance__text">Active USDT balance:</div>
        <div class="a-balance__amount">
          {{ root.user?.usdt?.toLocaleString('en-EN') ?? 0 }}
        </div>
      </div>
    </div>

    <div class="active__title">
      Purchases opportunities
    </div>

    <div class="active__text">
      Make more purchases and invite frens to make more profit
    </div>

    <AvaCard>
      <ListItem
          v-for="item in items"
          :item="item"
          icon-type="rounded"
          hide-coin
          @click="router.push(item?.link)"
      />
    </AvaCard>

    <InviteButton fixed type="warning" />
  </div>
</template>

<style scoped lang="scss">
.active {
  padding-top: 35px;
  background: url("@/assets/images/profile/orange-bg.png") no-repeat center bottom;
  background-size: contain;

  &__text {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.02em;
    color: #8E8E8E;
    margin-bottom: 12px;
  }
  &__note {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__title {
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
  }

  .a-balance {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 35px;

    &__icon {
      width: 68px;
      height: 68px;
      background: #D9D9D933;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 60%;
      }
    }
    &__text {
      font-size: 16px;
      line-height: 19px;
      text-align: left;
      margin-bottom: 4px;
    }
    &__amount {
      font-size: 32px;
      font-weight: 700;
      line-height: 39px;
      margin-left: 10px;
    }
  }
}
</style>