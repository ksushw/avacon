<script lang="ts" setup>
import { BackButton } from 'vue-tg';
import router from '@/router';
import DollarIcon from '@/components/icons/DollarIcon.vue';
import { useRootStore } from '@/stores/root';
import ArrowCircleIcon from '@/components/icons/ArrowCircleIcon.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import MoneyIcon from '@/components/icons/MoneyIcon.vue';
import AvaBottomDrawer from '@/components/AvaBottomDrawer.vue';
import { ref } from 'vue';
import { useWallet } from '@/composables/useWallet'

const wallet = useWallet()
const root = useRootStore();
const balanceModal = ref(false);

</script>

<template>
  <BackButton @click="router.go(-1)"/>
  <div class="active-usdt-balance">
    <div class="active-usdt-balance__info">
      <div class="active-usdt-balance__info__icon">
        <DollarIcon/>
      </div>
      <div>
        <div class="active-usdt-balance__info__title">Active USDT balance:</div>
        <div class="active-usdt-balance__info__balance">{{ root.user?.usdt?.toLocaleString('en-EN') ?? 0 }}</div>
      </div>
    </div>
    <div class="active-usdt-balance__control">
      <div @click="router.push('/withdraw')" class="active-usdt-balance__control-item">
        <div class="active-usdt-balance__control-item-icon">
          <ArrowCircleIcon/>
        </div>
        <div>Withdraw</div>
      </div>
      <div @click="balanceModal = true" class="active-usdt-balance__control-item">
        <div class="active-usdt-balance__control-item-icon">
          <PlusIcon/>
        </div>
        <div>Top up</div>
      </div>
      <div @click="router.push('/buy')" class="active-usdt-balance__control-item">
        <div class="active-usdt-balance__control-item-icon">
          <MoneyIcon/>
        </div>
        <div>Buy</div>
      </div>
    </div>
    <div class="active-usdt-balance__title">History</div>
    <div class="active-usdt-balance__history">
      <div class="active-usdt-balance__history__text">
        Very soon you will be able to see your transaction history
      </div>
      <img src="@/assets/images/bear-with-clock.png" alt="bear"/>
    </div>
  </div>

  <AvaBottomDrawer v-model="balanceModal">
    <section v-if="root.user" class="drawer__info info text-center">
      <div class="info__title">Your USDT balance</div>
      <div class="info__text">
        Top up your balance in USDT in BEP20 and have additional features in AVACOIN
      </div>
      <div class="info__card">
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
      </div>
      <div class="info__note">
        Be careful, any amount you send that is less than $10
        will not be counted toward your USDT balance.
      </div>
      <div class="info__card__icon">
        <img src="@/assets/images/bear-with-dollars.png" alt="bear" />
      </div>
    </section>
  </AvaBottomDrawer>
</template>

<style lang="scss" scoped>
.active-usdt-balance {
  background: var(--image-background);
  color: var(--main-text-color);
  padding: 34px 16px;
  overflow: scroll;
  position: relative;
  height: 100dvh;
  box-sizing: border-box;

  &__title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 24px;
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

  &__control {
    background: #D9D9D933;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-content: space-between;
    padding: 16px 40px;
    border-radius: 24px;
    margin-bottom: 24px;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 7px;
    }
  }

  &__info {
    display: grid;
    grid-template-columns: 68px 1fr;
    column-gap: 10px;
    align-items: center;
    margin-bottom: 35px;

    &__title {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 7px;
    }

    &__balance {
      font-size: 32px;
      font-weight: 700;
    }

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
  }
}

.drawer__info {
  .info{
    &__note {
      font-size: 16px;
      font-weight: 500;
      color: #000000;
      margin: 16px auto;
    }
    &__title {
      color: #000000;
      font-size: 32px;
      font-weight: 700;
      margin-top: 15px;
    }

    &__text {
      font-weight: 400;
      font-size: 16px;
      color: #8E8E8E;
      margin-top: 16px;
    }

    &__card {
      padding: 16px;
      background: #D9D9D980;
      border-radius: 24px;
      margin-top: 24px;
      color: #000000;
      font-size: 16px;
      text-align: left;

      &__balance {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

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
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>