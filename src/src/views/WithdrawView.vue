<script lang="ts" setup>
import { BackButton, Popup } from 'vue-tg';
import router from '@/router';
import AvaButton from '@/components/AvaButton.vue';
import { useRootStore } from '@/stores/root';
import { ref } from 'vue';
import { useNotificationStore } from '@/stores/notification';
import AvaInput from '@/components/form/AvaInput.vue';
import type { ErrorResponse } from '@/types/user';
import { sliceWallet } from '@/utils/sliceWallet';
import { useAxios } from '@/composables/useAxios';
import WithdrawVerificationInfo from '@/components/verification/WithdrawVerificationInfo.vue'

const root = useRootStore();
const notificationStore = useNotificationStore();

const wallet = ref('');
const usdtValue = ref<number | null>(null);

const visibleModal = ref(false);
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
      await useAxios('/user/withdrawal/usdt/', {
        method: 'POST',
        data: {
          address: wallet.value,
          amount: usdtValue.value
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
  <div class="withdraw-page">
    <div>
      <div class="withdraw-page__title">Withdraw USDT</div>
      <div class="withdraw-page__text">Withdraw your gold in USDT to your wallet</div>
      <div class="withdraw-page__card">
        <div class="withdraw-page__card__info">
          <span>Your Active USDT balance:</span>
          <span>
            <img class="profile__coin" src="@/assets/images/dollars.png" alt="best">
            <b> {{ root.user?.usdt?.toLocaleString('en-EN') ?? 0 }}</b>
          </span>
        </div>
      </div>
      <AvaInput
          v-model="wallet"
          type="textarea"
          label="Your BEP20 wallet to withdraw USDT"
          placeholder="Enter BEP20 Address"
      />
      <AvaInput
          v-model="usdtValue"
          type="text"
          label="Enter the amount of USDT you want to withdraw"
          placeholder="USDT Amount"
          button-text="Max"
          @button-click="usdtValue = Number(root.user?.usdt.toFixed(2))"
      />
      <div v-if="usdtValue && usdtValue < 20" class="withdraw-page__hint">Min 20 USDT</div>

      <WithdrawVerificationInfo />

      <AvaButton
          :disabled="Number(root.user?.usdt) < Number(usdtValue) || Number(usdtValue) < 20 || !usdtValue || !wallet"
          @click="visibleModal = true"
          block
          fixed
          type="primary"
      >
        Withdraw {{ usdtValue?.toLocaleString('en-EN') ?? 0 }} USDT
      </AvaButton>
    </div>
  </div>

  <Popup
      v-if="visibleModal"
      title="Are you sure?"
      :message="`You withdraw ${usdtValue} USDT on ${sliceWallet(wallet)}`"
      :buttons="buttons"
      @close="handlePopupClose"
  />

</template>

<style lang="scss" scoped>
.withdraw-page {
  height: 100vh;
  max-height: 100vh;
  background: #F0EFF5;
  padding: 67px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  &__hint {
    font-size: 14px;
    font-weight: 400;
    text-align: right;
    color: #FF006B;
    margin-top: -20px;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 32px;
    font-weight: 500;
    color: #000000;
    text-align: center;
  }

  &__text {
    margin-top: 15px;
    font-size: 16px;
    font-weight: 400;
    color: #8E8E8E;
    text-align: center;
  }

  &__subtitle{
    font-size: 14px;
    font-weight: 400;
    color: #8F8F8F;
    &.right {
      text-align: right;
    }
  }

  &__card {
    background: #6262621A;
    padding: 16px;
    border-radius: 24px;
    margin-top: 24px;
    margin-bottom: 25px;
    color: #000000;
    &__info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }
  }

  &__card-small {
    background: #6262621A;
    padding: 16px;
    border-radius: 122px;
    margin-top: 8px;
    margin-bottom: 8px;
    color: #000000;
  }
}

</style>