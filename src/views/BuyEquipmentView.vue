<script lang="ts" setup>
import { BackButton } from 'vue-tg'
import router from '@/router';
import { useInvestStore } from '@/stores/invest';
import { onMounted, ref } from 'vue';
import type { IAvailableInvestment, IInvest } from '@/types/invest';
import { useRoute } from 'vue-router';
import AvaButton from '@/components/AvaButton.vue';
import { useRootStore } from '@/stores/root';
import EmptyPage from '@/components/EmptyPage.vue';
import AvaTimer from '@/components/AvaTimer.vue';

const investStore = useInvestStore();
const route = useRoute();
const currentLicense = ref<IAvailableInvestment>();
const currentInvest = ref<IInvest>();
const root = useRootStore()

const topUpBalance = () => {
  router.push('/tasks');
}

const buyEquipment = async() => {
  try{
    if(currentInvest.value?.id) {
      await investStore.buy(currentInvest.value.id)
      await router.push(`/earn?investId=${currentInvest.value?.id}`)
    }
  } catch (e) {
    console.log(e);
  }
}

onMounted(async() => {
  await investStore.getAvailableInvestments();
  await investStore.getInvestments();

  currentInvest.value = investStore.investments.find((el) => String(el.invest_license.id) === route.params.id)
  currentLicense.value = investStore.availableInvestments.find((el) => String(el.invest_license.id) === route.params.id)
});
</script>

<template>
  <BackButton @click="router.go(-1)"/>
  <div class="buy-equipment-page" v-if="currentLicense && currentInvest">
    <div class="buy-equipment-page__title">You need only once</div>
    <div class="buy-equipment-page__step">License to start mining is valid: <b>
      <AvaTimer :date="currentLicense.available_until" />
    </b></div>
    <div class="buy-equipment-page__text">For start mining you need only equipment </div>
    <div class="buy-equipment-page__step">Last step. Buy equipment</div>
    <div class="buy-equipment-page__img">
      <img src="@/assets/images/big-car.png" alt="miner"/>
    </div>

    <div class="buy-equipment-page__card">
      <div class="buy-equipment-page__card__info">
        <span>How much you can mine:</span>
        <b><span>{{ currentInvest.price?.toLocaleString('en-EN') ?? 0 }} AvaCoin</span></b>
      </div>
      <div class="buy-equipment-page__card__info">
        <span>Equipment cost:</span>
        <b><span>{{ currentInvest.price?.toLocaleString('en-EN') ?? 0 }} AvaCoin</span></b>
      </div>
      <div class="buy-equipment-page__card__info">
        <span>Your AVA balance:</span>
        <span><img src="@/assets/images/mini-coin.png" alt="coin"> {{ root.user?.tokens?.toLocaleString('en-EN') ?? 0 }}</span>
      </div>
    </div>

    <AvaButton
        v-if="Number(root.user?.tokens) < currentInvest.price"
        block
        type="primary"
        @click="topUpBalance"
    >
      Top up your AVA balance
    </AvaButton>

    <AvaButton
        v-else
        block
        type="warning"
        @click="buyEquipment"
    >
      Buy equipment and start earn - {{ currentInvest.price?.toLocaleString('en-EN') ?? 0 }} AvaCoin
    </AvaButton>
  </div>
  <EmptyPage v-else/>
</template>

<style lang="scss" scoped>
.buy-equipment-page {
  background: #ffffff;
  min-height: 100vh;
  padding: 24px 16px;
  color: #000000;
  overflow: scroll;
  position: relative;
  height: 100dvh;
  box-sizing: border-box;

  &__title {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    color: #000000;
  }

  &__text {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: center;
    color: #8E8E8E;
    margin-top: 12px;
  }

  &__step {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: center;
    color: #000000;
    margin-top: 12px;
  }

  &__img {
    display: flex;
    justify-content: center;
    margin-top: 12px;

    img {
      width: 60%;
    }
  }

  &__card {
    background: #6262621A;
    padding: 16px;
    border-radius: 24px;
    margin-top: 24px;
    margin-bottom: 25px;
    color: #000000;
    font-size: 16px;

    img {
      width: 16px;
    }

    &__info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }
  }
}
</style>