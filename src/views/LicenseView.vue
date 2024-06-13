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

const openHistory = () => {
  router.push(`/earn/buy-equipment/${currentLicense.value?.invest_license.id}`)
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
  <div class="license-page" v-if="currentLicense && currentInvest">
    <div class="license-page__title">You have a licence</div>
    <div class="license-page__text">Now you have a licence. </div>
    <div class="license-page__step">Step 2. Start your own mining farm</div>
    <div class="license-page__img">
      <img src="@/assets/images/document.png" alt="license"/>
    </div>

    <div class="license-page__card">
      <div class="license-page__card__info">
        <span>License to start mining is valid:</span>
        <span><b>
          <AvaTimer :date="currentLicense.available_until" />
        </b></span>
      </div>
      <div class="license-page__card__info">
        <span>How much you can mine:</span>
        <b><span>{{ currentInvest.price?.toLocaleString('en-EN') ?? 0 }} AVA</span></b>
      </div>
      <div class="license-page__card__info">
        <span>Mining period:</span>
        <span><b>1 year</b></span>
      </div>
    </div>

    <div class="license-page__subtitle">
      Profit
    </div>

    <div class="license-page__text left">
      You will receive profit on your AVA balance
    </div>

    <div class="license-page__card">
      <div class="license-page__card__info">
        <span><b>Open your plot</b></span>
        <span><b>First profit</b></span>
      </div>
      <div class="license-page__card__info">
        <span>1st-15th of the current month</span>
        <span>1st of next month</span>
      </div>
      <div class="license-page__card__info">
        <span>16th-31 of the current month</span>
        <span>15th of next month</span>
      </div>
    </div>

    <div class="license-page__subtitle">
      Payment schedule
    </div>

    <div class="license-page__card">
      <div v-for="(_, i) in 12" :key="i" class="license-page__card__info">
        <span>{{ i + 1 }} Month</span>
        <div>
          <div><b>+ {{ currentInvest.month_profit }} AVA</b></div>
          <div class="grey">{{ currentInvest.month_profit * (i + 1) }} AVA total</div>
        </div>
      </div>
    </div>
    <AvaButton
        block
        type="primary"
        @click="openHistory"
    >
      Let’s start
    </AvaButton>
  </div>
  <EmptyPage v-else/>
</template>

<style lang="scss" scoped>
.license-page {
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

    &.left {
      text-align: left;
    }

    img {
      width: 16px;
    }
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

  &__link {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    color: #007AFF;
    text-align: center;
    margin-top: 12px;
    span {
      width: fit-content;
      &.soon {
        position: relative;
        img, span {
          opacity: 0.6;
        }
        &::after {
          content: 'soon';
          top: 0;
          right: -35px;
          position: absolute;
          background: #FEB702;
          color: #191919;
          border-radius: 4px;
          padding: 2px 4px;
          font-size: 10px;
          opacity: 1;
        }
      }
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

      img {
        width: 16px;
      }

      .grey {
        color: #626262;
        font-size: 12px;
      }

      &:not(:last-child) {
        margin-bottom: 24px;
      }

      ul {
        margin: 0;
        li:not(:last-child) {
          padding-bottom: 12px;
        }
      }
    }
  }

  &__subtitle {
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
  }
}
</style>