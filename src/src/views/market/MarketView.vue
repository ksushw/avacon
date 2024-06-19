<script lang="ts" setup>
import AvaLink from '@/components/AvaLink.vue';
import { BackButton } from 'vue-tg';
import AvaTab from '@/components/AvaTab.vue';
import type { AvaTabProps } from '@/types/props';
import { onMounted, ref, watch } from 'vue';
import GoldTab from '@/components/market/GoldTab.vue';
import { useMarketStore } from '@/stores/market';
import { useLazyLoading } from '@/composables/useLazyLoading';
import WithdrawVerificationInfo from '@/components/verification/WithdrawVerificationInfo.vue';
import AvaBottomDrawer from '@/components/AvaBottomDrawer.vue';
import { useRouter } from 'vue-router'

const tabOptions: AvaTabProps[] = [
  {
    title: 'Gold',
    value: 'gold'
  },
  {
    title: 'USDT-AED',
    value: 'usdt',
    soon: true,
    disabled: true
  },
  {
    title: 'NFT',
    value: 'nft',
    soon: true,
    disabled: true
  },

]

const router = useRouter()

const activeTab = ref<string>('gold')
const isOpen = ref(true)
const marketStore = useMarketStore();
const { pageRef, onScroll, params } = useLazyLoading()
const switchValue = ref('sell')

function scrollHandle(e: Event) {
  onScroll(e, () => {
    if (switchValue.value === 'sell' && marketStore.adsResponse && marketStore.adsResponse.pages_count > params.page) {
      params.page++
      marketStore.getAds(params);
    }
    if (switchValue.value === 'buy' && marketStore.dealsResponse && marketStore.dealsResponse.pages_count > params.page) {
      params.page++
      marketStore.getDeals(params);
    }
  })
}

watch(() => switchValue.value, () => {
  params.page = 1
})

onMounted(async() => {
  await marketStore.getStats();
  await marketStore.getAds(params, true);
  await marketStore.getDeals(params, true);
})
</script>

<template>
  <BackButton @click="router.go(-1)"/>
  <div class="market page" ref="pageRef" @scroll="scrollHandle">
    <div class="market__img">
      <img src="@/assets/images/market/market.png" alt="market">
    </div>
    <div class="market__title">P2P MARKET</div>
    <ul class="market__list">
      <li>You will be able to sell your mined grams of gold for USDT.</li>
      <li>You automatically receive Stamp DUBAI gold bars after deal</li>
    </ul>
    <div class="market__link">
      <AvaLink text="More about P2P market" :is-external="true" link="https://avacoin.notion.site/Market-16645ff95fa24374a44dba4955d56092"/>
    </div>

    <WithdrawVerificationInfo />

    <AvaTab :options="tabOptions" v-model="activeTab" type="primary" />
    <GoldTab v-if="activeTab === 'gold'" v-model="switchValue"/>

    <AvaBottomDrawer v-model="isOpen" class="market-drawer" @close="router.push('/')">
      <div class="market-drawer__title text-center">
        New Market v2.0 <span class="soon">soon</span>
      </div>
      <div class="market-drawer__img">
        <img src="@/assets/images/market/market.png" alt="bear">
      </div>
      <div class="market-drawer__text text-center">
        We have already tested the v1.0 Market and are now working on improvements.
        A new version will be available very soon
      </div>
    </AvaBottomDrawer>
  </div>
</template>

<style lang="scss" scoped>
.market-drawer {
  &__title {
    font-size: 32px;
    font-weight: 700;
    line-height: 38.73px;
    text-align: center;
    color: var(--body-background);
    margin-top: 24px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 5px;
    .soon {
      font-size: 10px;
      font-weight: 400;
      line-height: 12.5px;
      letter-spacing: -0.02em;
      text-align: left;
      color: #191919;
      background: #FEB702;
      border-radius: 4px;
      padding: 2px;
    }
  }

  &__img {
    text-align: center;
    img {
      width: 80%;
    }
  }

  &__text {
    font-size: 16px;
    font-weight: 400;
    line-height: 19.36px;
    text-align: center;
    color: #626262;
    margin-top: 32px;
  }
}
.market {
  padding-top: 35px;
  background: #F0EFF5;

  &__img {
    text-align: center;
    margin-bottom: 20px;
    img {
      width: 150px;
    }
  }

  &__title {
    font-size: 32px;
    font-weight: 700;
    line-height: 38.73px;
    text-align: center;
    color: var(--body-background);
    margin-bottom: 12px;
  }

  &__list {
    margin: 0;
    padding-left: 20px;
    font-size: 16px;
    font-weight: 400;
    line-height: 19.36px;
    color: #8E8E8E;
    li:not(:last-child) {
      padding-bottom: 12px;
    }
  }

  &__link {
    text-align: center;
  }
}
</style>