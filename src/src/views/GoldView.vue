<script setup lang="ts">

import { useRootStore } from '@/stores/root'
import AvaCard from '@/components/AvaCard.vue'
import rocket from '@/assets/images/booster/rocket-mini.png'
import plots from '@/assets/images/earn/plot.png'
import ListItem from '@/components/ListItem.vue'
import { useRouter } from 'vue-router'
import { BackButton, Popup } from 'vue-tg'
import GoldIcon from '@/components/icons/GoldIcon.vue';
import { ref } from 'vue';
import AvaButton from '@/components/AvaButton.vue';
import { useAxios } from '@/composables/useAxios';
import { useNotificationStore } from '@/stores/notification';
import type { ErrorResponse } from '@/types/user';
import { sliceWallet } from '@/utils/sliceWallet';
import AvaLink from '@/components/AvaLink.vue';

const root = useRootStore()
const router = useRouter()
const notificationStore = useNotificationStore()

const wallet = ref('');
const visibleModal = ref(false);
const usdt = 67;

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
];

const buttons = [
  {
    id: 'cancel',
    type: 'cancel',
  },
  {
    id: 'withdraw',
    text: 'Withdraw'
  }
];

async function handlePopupClose(id = 'withdraw') {
  visibleModal.value = false
  if (id === 'withdraw') {
    try {
      await useAxios('/user/withdrawal/golds/', {
        method: 'POST',
        data: {
          address: wallet.value,
          amount: 1
        }
      })
      router.push('/profile?isFromWithdrawn=true')
    } catch (e) {
      const message = (e as unknown as ErrorResponse)?.response?.data?.detail;
      if(message) {
        notificationStore.push({
          message,
          type: 'danger'
        })
      }
    }
  }
}
</script>

<template>
  <BackButton @click="router.go(-1)"/>
  <div class="gold page">
    <div class="gold__balance a-balance">
      <div class="a-balance__icon">
        <GoldIcon/>
      </div>

      <div class="a-balance__body">
        <div class="a-balance__text">Your gold grams:</div>
        <div class="a-balance__amount">
          {{ root.user?.golds?.toLocaleString('en-EN') ?? 0 }}
        </div>
      </div>
    </div>

    <div class="gold__title">
      Welcome P2P market
    </div>
    <div class="gold__market-img">
      <img src="@/assets/images/profile/market.png" alt="market">
    </div>
    <div class="gold__text">
      You can sell your gold on our p2p soon. P2P marketing is a unique opportunity to exchange value propositions where millions of buyers meet sellers.
    </div>
    <AvaLink text="More about P2P market" link="https://t.me/avagoldcoin/67" :is-external="true"/>
    <AvaButton @click="router.push('/market')" block type="warning">
      Go to P2P market
    </AvaButton>

    <div class="gold__title">
      Purchases opportunities
    </div>

    <div class="gold__text">
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

    <div class="gold__title">History</div>
    <div class="gold__history">
      <div class="gold__history__text">
        Very soon you will be able to see your transaction history
      </div>
      <img src="@/assets/images/bear-with-clock.png" alt="bear"/>
    </div>

    <Popup
        v-if="visibleModal"
        title="Are you sure?"
        :message="`You withdraw ${usdt} USDT on ${sliceWallet(wallet)}`"
        :buttons="buttons"
        @close="handlePopupClose"
    />
  </div>
</template>

<style scoped lang="scss">
.gold {
  padding-top: 35px;
  background: var(--image-background);

  &__market-img {
    margin-bottom: 15px;
    img {
      width: 100%;
    }
  }

  &__text {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.02em;
    color: #8E8E8E;
    margin-bottom: 12px;
  }

  &__card {
    margin-bottom: 24px;
  }

  &__note {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 8px;

    &__text {
      font-size: 16px;
      line-height: 19px;
      letter-spacing: -0.02em;
      color: #8E8E8E;
      margin-top: 12px;
    }
  }
  &__title {
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    margin-top: 16px;
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
}
</style>
