<script setup lang="ts">

import AvaCard from '@/components/AvaCard.vue'
import { useWallet } from '@/composables/useWallet'
import { useRootStore } from '@/stores/root'

const wallet = useWallet()
const root = useRootStore();
</script>

<template>
  <AvaCard v-if="root.user" bg-color="#D9D9D980">
    <div class="info__card__balance">
      <span>Your curent USDT balance:</span>
      <span class="info__card__balance_usdt">
        <img src="@/assets/images/dollars.png" alt="dollars">
        <b>{{ root.user?.usdt?.toLocaleString('en-EN') ?? 0 }}</b>
      </span>
    </div>
    <div class="info__card__address-title">BEP20 address for deposit replenishment:</div>
    <div v-if="!root.user.wallet_address" class="info__card__text">You don't have an address</div>
    <div v-if="root.user.wallet_address" class="info__card__text">
      <span class="text-ellipsis">
        {{ root.user?.wallet_address }}
      </span>
      <img @click="wallet.copy(root.user.wallet_address)" src="@/assets/images/icons/copy.svg" alt="copy" />
    </div>
    <div
      @click="wallet.createWalletAddress"
      v-if="!root.user.wallet_address"
      class="info__card__link"
    >
      Create new
      <i v-if="wallet.isLoading" class="spinner"/>
    </div>
  </AvaCard>
</template>

<style scoped lang="scss">
.info__card {
  padding: 16px;
  background: #D9D9D980;
  border-radius: 24px;
  margin-top: 24px;
  color: #000000;
  font-size: 16px;
  text-align: left;

  &__address-title {
    color: #000000;
  }

  &__balance {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    color:  #000000;

    &_usdt{
      display: flex;
      align-items: center;
    }

    img {
      width: 21px;
      height: 21px;
    }
  }

  &__text {
    font-size: 14px;
    color: #626262;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    word-break: break-all;
    column-gap: 7px;
  }

  &__icon img{
    width: 200px;
    margin-top: 25px;
  }

  &__link {
    font-weight: 500;
    color: #007AFF;
    margin-top: 8px;
    .spinner {
      display: inline-block;
      margin: 0 8px;
      border-radius: 50%;
      width: 1.5em;
      height: 1.5em;
      border: .215em solid transparent;
      vertical-align: middle;
      font-size: 10px;
      border-top-color: #007AFF;
      animation: spin 1s cubic-bezier(.55, .15, .45, .85) infinite;
    }
  }
}
</style>