<script lang="ts" setup>
import { BackButton } from 'vue-tg'
import router from '@/router';
import { useInvestStore } from '@/stores/invest';
import { onMounted, ref } from 'vue';
import type { IInvest } from '@/types/invest';
import { useRoute } from 'vue-router';
import AvaButton from '@/components/AvaButton.vue';
import { useRootStore } from '@/stores/root';
import EmptyPage from '@/components/EmptyPage.vue';

const invest = useInvestStore()
const route = useRoute();
const currentInvest = ref<IInvest>();
const root = useRootStore();

const buyLicense = async() => {
  if(currentInvest.value?.invest_license.id) {
    await invest.buyLicense(currentInvest.value?.invest_license.id);
    await router.push(`/earn/license/${currentInvest.value?.invest_license.id}`)
  }
}

onMounted(async () => {
  await invest.getInvestments();
  currentInvest.value = invest.investments.find((el) => String(el.id) === route.params.id)
});
</script>

<template>
  <BackButton @click="router.go(-1)"/>
  <div class="investment-page" v-if="currentInvest">
    <div class="investment-page__title">{{ currentInvest.name }}</div>
    <div class="investment-page__step">Step 1. Buy licence</div>
    <div class="investment-page__img" v-if="currentInvest?.image_url">
      <img :src="currentInvest.image_url" alt="license"/>
    </div>

    <div class="investment-page__card">
      <div class="investment-page__card__info">
        <span>Equipment coast:</span>
        <b><span>{{ currentInvest.price?.toLocaleString('en-EN') ?? 0  }} AVA</span></b>
      </div>
      <div class="investment-page__card__info">
        <span>APR (1 year) :</span>
        <b><span>100%</span></b>
      </div>
      <div class="investment-page__card__info">
        <span>APR (1 month) :</span>
        <b><span>8.3%</span></b>
      </div>
      <div class="investment-page__card__info">
        <span>Licence price in AVA:</span>
        <b><span>
          <img src="@/assets/images/mini-coin.png" alt="coin">
          {{ currentInvest.invest_license?.price?.toLocaleString('en-EN') ?? 0  }}
        </span></b>
      </div>
      <div class="investment-page__card__info">
        <span>Mining period:</span>
        <b><span>1 year</span></b>
      </div>
      <div class="investment-page__card__info">
        <span>Total profit:</span>
        <b><span>{{ currentInvest.price?.toLocaleString('en-EN') ?? 0  }} AVA</span></b>
      </div>

    </div>
    <div class="investment-page__subtitle">
      General Terms
    </div>
    <div class="investment-page__card">
      <div class="investment-page__card__info">
        <ul>
          <li>You will get AVA twice a month on your balance  </li>
          <li>Equipment coast back to your in a year</li>
        </ul>
      </div>
    </div>
    <AvaButton
        :disabled="Number(root.user?.tokens) < currentInvest.invest_license?.price"
        block
        type="primary"
        @click="buyLicense"
    >
      Buy licence - {{ currentInvest.invest_license?.price?.toLocaleString('en-EN') ?? 0  }} AVA
    </AvaButton>
  </div>
  <EmptyPage v-else/>
</template>

<style lang="scss" scoped>
.rate-icon {
  display: flex;
  align-items: center;
  gap: 6px;
}
.investment-page {
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
    &__info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        width: 16px;
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