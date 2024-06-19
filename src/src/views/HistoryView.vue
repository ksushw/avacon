<script lang="ts" setup>
import { BackButton } from 'vue-tg'
import router from '@/router';
import { useInvestStore } from '@/stores/invest';
import { onMounted, ref } from 'vue';
import type { IAvailableInvestment, IInvest } from '@/types/invest';
import { useRoute } from 'vue-router';
import AvaButton from '@/components/AvaButton.vue';
import EmptyPage from '@/components/EmptyPage.vue';
import AvaTimer from '@/components/AvaTimer.vue';

const investStore = useInvestStore();
const route = useRoute();
const currentLicense = ref<IAvailableInvestment>();
const currentInvest = ref<IInvest>();

const openStartMine = () => {
  router.push(`/earn/start-mine/${currentLicense.value?.invest_license.id}`)
}

onMounted(async() => {
  await investStore.getAvailableInvestments();
  await investStore.getInvestments();

  currentInvest.value = investStore.investments.find((el) => String(el.invest_license.id) === route.params.id);
  currentLicense.value = investStore.availableInvestments.find((el) => String(el.invest_license.id) === route.params.id);
});
</script>

<template>
  <BackButton @click="router.go(-1)"/>
  <div class="history-page" v-if="currentLicense && currentInvest">
    <div class="history-page__title">Here is some costs</div>
    <div class="history-page__step">License to start mining is valid: <b>
      <AvaTimer :date="currentLicense.available_until" />
    </b></div>
    <div class="history-page__img">
      <img src="@/assets/images/gold-miner.png" alt="miner"/>
    </div>
    <div class="history-page__card">
      <div class="history-page__card__info">
        <span>How much you can mine:</span>
        <b><span>{{ currentInvest.volume_mine }} AvaCoin</span></b>
      </div>
    </div>

    <AvaButton
        block
        type="primary"
        @click="openStartMine"
    >
      What costs?
    </AvaButton>
  </div>
  <EmptyPage v-else/>
</template>

<style lang="scss" scoped>
.history-page {
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