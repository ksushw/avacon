<script setup lang="ts">

import AvaCard from '@/components/AvaCard.vue'
import OrderCard from '@/components/market/OrderCard.vue'
import { useRootStore } from '@/stores/root';
import { useMarketStore } from '@/stores/market';
import { onMounted, ref, watch } from 'vue';
import NotEnoughMoney from '@/components/market/NotEnoughMoney.vue';
import SuccessBuy from '@/components/market/SuccessBuy.vue';
import { BackButton, Popup } from 'vue-tg';
import type { OrderType } from '@/types/market';
import router from '@/router';
import { useLazyLoading } from '@/composables/useLazyLoading';

const root = useRootStore()
const marketStore = useMarketStore()
const filter = ref(true)
const visibleModal = ref(false)
const { pageRef, onScroll, params } = useLazyLoading()

const steps = [
  '1. Take drop <strong>Ava tokens</strong> for holding',
  '2. Get free <strong>exclusive Rolex skin</strong>',
  '3. Have <strong>special access to weekly lottery sweepstakes</strong> and competitions.'
]

const successBuyModal = ref(false)
const balanceModal = ref(false)
const currentOrder = ref<OrderType>();

function scrollHandle(e: Event) {
  onScroll(e, () => {
    if (marketStore.ordersResponse && marketStore.ordersResponse?.pages_count > params.page) {
      params.page++
      marketStore.getOrders(filter.value, params);
    }
  })
}

const buttons = [
  {
    id: 'cancel',
    type: 'cancel',
  },
  {
    id: 'buy',
    text: 'Buy'
  }
];

const buy = async(data: OrderType) => {
  if(data.volume * data.price > Number(root.user?.usdt)){
    balanceModal.value = true
  }
  currentOrder.value = data
  visibleModal.value = true
}

async function handlePopupClose(id = 'buy') {
  visibleModal.value = false
  if (id === 'buy') {
    try {
      const res = await marketStore.createDeal({ad_id: currentOrder.value?.id, volume: currentOrder.value?.volume})
      if (res){
        successBuyModal.value = true;
        await root.fetchUser();
      }
    } catch (e) {
      console.log(e)
    }
  }
}

watch(() => filter.value, () => {
  params.page = 1
  marketStore.getOrders(filter.value, params, true);
})

onMounted(() => {
  marketStore.getOrders(filter.value, params, true);
})
</script>

<template>
  <BackButton @click="router.go(-1)"/>
  <div class="gold-purchase page" ref="pageRef" @scroll="scrollHandle">
    <div class="page__title text-center">
      Gold Purchase
    </div>

    <div class="gold-purchase__text text-center mb-16">
      Set your gold prices and sell as much gold as you like, whenever you choose.
    </div>

    <AvaCard bg-color="#6262621A" class="mb-16">
      <div class="flex justify-between align-center">
        <div>Your active balance</div>
        <strong>
          <img class="profile__coin" src="@/assets/images/dollars.png" alt="best">
          {{ root.user?.usdt?.toLocaleString('en-EN') ?? 0 }} USDT
        </strong>
      </div>
    </AvaCard>

    <div class="gold-purchase__steps">
      <template v-for="step of steps" :key="step">
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.82422 11.4118L8.69519 16L16.8242 4" stroke="#00CB39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <div v-html="step"> </div>
      </template>
    </div>

    <router-link to="/" class="gold-purchase__more flex align-center">
      And more advantages
      <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.824219 1.5L4.82422 5.5L0.824219 9.5" stroke="#007AFF" stroke-width="1.5"/>
      </svg>
    </router-link>

    <div class="gold-purchase__filter filter">
      <div @click="filter = !filter" class="filter__item">
        <div>
          <div class="filter__label">
            Order Price
          </div>
          <div v-if="filter" class="filter__value">
            Low first
          </div>
          <div v-else class="filter__value">
            High first
          </div>
        </div>

        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.824219 1L4.82422 5L0.824219 9" stroke="#007AFF" stroke-width="1.5"/>
        </svg>
      </div>

<!--      <div class="filter__item">-->
<!--        <div>-->
<!--          <div class="filter__label">-->
<!--            Quantity-->
<!--          </div>-->
<!--          <div class="filter__value">-->
<!--            Min first-->
<!--          </div>-->
<!--        </div>-->

<!--        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--          <path d="M0.824219 1L4.82422 5L0.824219 9" stroke="#007AFF" stroke-width="1.5"/>-->
<!--        </svg>-->
<!--      </div>-->
    </div>

    <OrderCard
        v-for="order in marketStore.ordersResponse?.data"
        :key="order.id"
        @buy="buy"
        :order="order"
    />
  </div>
  <SuccessBuy v-model="successBuyModal" />
  <NotEnoughMoney v-model="balanceModal" />

  <Popup
      v-if="visibleModal"
      title="Are you sure?"
      :message="`Buy ${currentOrder?.volume} gr. gold for ${Number(currentOrder?.price ?? 0) * Number(currentOrder?.volume ?? 0)} USDT`"
      :buttons="buttons"
      @close="handlePopupClose"
  />
</template>

<style scoped lang="scss">
.gold-purchase {
  background: #F0EFF5;
  color: #000000;

  .filter {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    &__item {
      background: #E2E1E6;
      padding: 8px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    &__label {
      font-size: 12px;
      color: #8A8A8A;
    }
    &__value {
      color: #007AFF;
      font-size: 16px;
      font-weight: 500;
    }
  }
  .page__title {
    color: #000000;
  }
  &__text {
    color: #8E8E8E;
  }
  &__steps {
    color: #000000;
    display: grid;
    grid-template-columns: 20px auto;
    gap: 8px;
  }
  &__more {
    gap: 8px;
    color: #007AFF;
    text-decoration: none;
    margin-top: 12px;
    margin-left: 32px;
    margin-bottom: 16px;
  }
}
</style>