<script setup lang="ts">

import { useRootStore } from '@/stores/root'
import AvaCard from '@/components/AvaCard.vue'
import type { IListItem } from '@/types/props'
import rocket from '@/assets/images/booster/rocket-mini.png'
import plot from '@/assets/images/earn/plot.png'
import ListItem from '@/components/ListItem.vue'
import { useRouter } from 'vue-router'
import { BackButton } from 'vue-tg'
import { computed, onMounted } from 'vue';
import { useBoosterStore } from '@/stores/booster';
import { useInvestStore } from '@/stores/invest';

const root = useRootStore();
const router = useRouter();
const booster = useBoosterStore();
const investStore = useInvestStore();

const isHasPlots = computed(() => investStore.investments.some((plot) => plot.buyed_at))

const itemBooster: IListItem = {
  firstName: 'Boosters',
  lastName: '',
  avatar: rocket,
  clickable: true,
  points: 'Make your earn more profitable'
}

const itemPlots: IListItem = {
  firstName: 'Plots',
  lastName: '',
  avatar: plot,
  clickable: true,
  points: 'New earning opportunities with 100% APR'
}

onMounted(async() => {
  await booster.getAvailableBoosters();
  await investStore.getInvestments();
})

</script>

<template>
  <BackButton @click="router.go(-1)"/>
  <div class="page frozen">
    <div class="frozen__balance f-balance">
      <div class="f-balance__icon">
        <img src="@/assets/images/profile/big-frozen-usd.png" alt="usd">
      </div>

      <div class="f-balance__body">
        <div class="f-balance__text">Frozen USDT balance:</div>
        <div class="f-balance__amount">
          {{ root.user?.usdt_ref?.toLocaleString('en-EN') ?? 0 }}
        </div>
      </div>
    </div>

    <div class="frozen__title">
      Make purchase to unfrozzzzze your
      balance
    </div>

    <AvaCard class="frozen__card">
      <ListItem
        :item="itemBooster"
        icon-type="rounded"
        hide-coin
        @click="router.push('/booster')"
      />

      <div class="frozen__text">
        You have active booster = you can take your referral bonuses from boosters and skins
      </div>
      <div v-if="booster.availableBoosters.length" class="frozen__note">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 9.41176L5.87097 14L14 2" stroke="#00CB39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <span>You have active booster</span>
      </div>
      <div v-else class="frozen__note">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.3407 4.57515C5.12916 4.36362 4.7862 4.36362 4.57467 4.57515C4.36313 4.78669 4.36313 5.12965 4.57467 5.34119L9.23351 10L4.65839 14.5752C4.44685 14.7867 4.44685 15.1297 4.65839 15.3412C4.86992 15.5527 5.21288 15.5527 5.42442 15.3412L9.99954 10.7661L14.5747 15.3412C14.7862 15.5527 15.1292 15.5527 15.3407 15.3412C15.5522 15.1297 15.5522 14.7867 15.3407 14.5752L10.7656 10L15.4244 5.34119C15.636 5.12965 15.636 4.78669 15.4244 4.57515C15.2129 4.36362 14.8699 4.36362 14.6584 4.57515L9.99954 9.234L5.3407 4.57515Z" fill="#FF0000" stroke="#E50000" stroke-width="1.7" stroke-linecap="round"/>
        </svg>

        <span>You have not active booster</span>
      </div>
    </AvaCard>

    <AvaCard class="frozen__card">
      <ListItem
          :item="itemPlots"
          icon-type="rounded"
          hide-coin
          @click="router.push('/earn')"
      />

      <div class="frozen__text">
        You have one or more plots = you can take your referral bonuses from plots
      </div>
      <div v-if="isHasPlots" class="frozen__note">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 9.41176L5.87097 14L14 2" stroke="#00CB39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <span>You have plots</span>
      </div>
      <div v-else class="frozen__note">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.3407 4.57515C5.12916 4.36362 4.7862 4.36362 4.57467 4.57515C4.36313 4.78669 4.36313 5.12965 4.57467 5.34119L9.23351 10L4.65839 14.5752C4.44685 14.7867 4.44685 15.1297 4.65839 15.3412C4.86992 15.5527 5.21288 15.5527 5.42442 15.3412L9.99954 10.7661L14.5747 15.3412C14.7862 15.5527 15.1292 15.5527 15.3407 15.3412C15.5522 15.1297 15.5522 14.7867 15.3407 14.5752L10.7656 10L15.4244 5.34119C15.636 5.12965 15.636 4.78669 15.4244 4.57515C15.2129 4.36362 14.8699 4.36362 14.6584 4.57515L9.99954 9.234L5.3407 4.57515Z" fill="#FF0000" stroke="#E50000" stroke-width="1.7" stroke-linecap="round"/>
        </svg>

        <span>You have no plots</span>
      </div>
    </AvaCard>

    <div class="frozen__title">History</div>
    <div class="frozen__history">
      <div class="frozen__history__text">
        Very soon you will be able to see your transaction history
      </div>
      <img src="@/assets/images/bear-with-clock.png" alt="bear"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.frozen {
  padding-top: 35px;
  background: url("@/assets/images/profile/frozen-bg.png") no-repeat center bottom;
  background-size: contain;

  &__card {
    margin-bottom: 16px;
  }
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
  
  &__history {
    background: #D9D9D933;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    align-items: center;
    justify-content: space-between;
    padding: 16px 40px;
    border-radius: 24px;

    &__text {
      color: #8E8E8E;
      font-size: 16px;
      font-weight: 400;
      text-align: center;
    }

    img {
      width: 70vw;
      height: auto;
    }
  }

  .f-balance {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 35px;
    &__icon img {
      width: 68px;
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