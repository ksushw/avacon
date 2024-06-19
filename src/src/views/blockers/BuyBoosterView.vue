<script setup lang="ts">
import { useBoosterStore } from '@/stores/booster'
import { useRootStore } from '@/stores/root'
import { computed, ref, watch } from 'vue'
import AvaButton from '@/components/AvaButton.vue'
import { useAxios } from '@/composables/useAxios'
import AvaBottomDrawer from '@/components/AvaBottomDrawer.vue'
import CongratulationsLeafsAnimation from '@/components/CongratulationsLeafsAnimation.vue'
import BalanceAndWalletInfo from '@/components/profile/BalanceAndWalletInfo.vue'

const booster = useBoosterStore()
const root = useRootStore()

booster.getBoosters()
root.fetchUser()

const loading = ref(false)
const success = ref(false)
const buyBoosterModal = ref(false)

const bst = computed(() => booster.boosters?.[0] ?? null)

async function buy() {
  try {
    loading.value = true
    await useAxios(`/booster/buy/?booster_type_id=${bst.value?.id}`, {
      method: 'POST'
    })
    await booster.getAvailableBoosters()
    root.fetchUser()
    loading.value = false
    success.value = true
    buyBoosterModal.value = true
  } catch (e) {
    console.log(e)
    loading.value = false
  }
}

watch(buyBoosterModal, (val) => {
  if (!val) {
    window.location.href = '/'
  }
})

</script>

<template>
  <div v-if="!success" class="page buy-booster info">
    <div class="info__title text-center">Auto Tap miner bot</div>

    <div class="info__text text-center">
      Only one click a day collects all the dust
    </div>

    <BalanceAndWalletInfo />

    <div class="info__card">
      <div class="info__card__balance">
        <span>Boost USDT price:</span>
        <span class="info__card__balance_usdt">
          <img src="@/assets/images/dollars.png" alt="dollars">
          {{ bst?.price ?? 0 }}
        </span>
      </div>

      <div class="info__card__balance">
        <span>Active period </span>
        <span class="info__card__balance_usdt">
          1 month
        </span>
      </div>
    </div>
    <div class="info__card__icon text-center">
      <img src="@/assets/images/booster/bear-miner.png" alt="bear" />
    </div>

    <AvaButton
      v-if="bst?.price && root.user"
      type="primary"
      fixed
      :disabled="root.user.usdt < bst.price"
      :loading=loading
      @click="buy"
    >
      Buy booster {{ bst?.price ?? 0 }} USDT
    </AvaButton>
  </div>

  <AvaBottomDrawer v-model="buyBoosterModal">
    <section class="drawer__info info text-center">
      <CongratulationsLeafsAnimation class="info__anim" />
      <div class="info__title">
        Congratulations, you
        have a new booster
      </div>

      <div class="info__text">
        Only one click a day collects all the dust
      </div>

      <div class="info__card__icon">
        <img src="@/assets/images/booster/bear-miner.png" alt="bear" />
      </div>
      <br>

      <AvaButton
        block
        type="primary"
        @click="buyBoosterModal = false"
      >
        Let’s try
      </AvaButton>
    </section>
  </AvaBottomDrawer>
</template>

<style scoped lang="scss">
.buy-booster {
  background: #F0EFF5;
}

.info {
  position: relative;

  &__anim {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100% - 50px);
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

      &_usdt {
        display: flex;
        align-items: center;
        font-weight: 600;
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
    }

    &__icon img {
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
</style>