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

const openBuyEquipment = () => {
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
  <div class="start-mine-page" v-if="currentLicense && currentInvest">
    <div class="start-mine-page__title">Here is some costs</div>
    <div class="start-mine-page__step">License to start mining is valid: <b>
      <AvaTimer :date="currentLicense.available_until" />
    </b></div>
    <div class="start-mine-page__img">
      <img src="@/assets/images/gold-miner.png" alt="miner"/>
    </div>
    <div class="start-mine-page__card">
      <div class="start-mine-page__card__info">
        <span>How much you can mine:</span>
        <span><del><b>{{ currentInvest.volume_mine?.toLocaleString('en-EN') ?? 0 }} AvaCoin</b></del></span>
      </div>

      <div class="start-mine-page__card__group">
        <div>
          <img src="@/assets/images/gold-miner.png" alt="miner"/>
        </div>
        <div>
          <div>Employee license</div>
          <div class="subtitle">Every employee need a licence</div>
        </div>
        <div><b>-5%</b></div>
      </div>

      <div class="start-mine-page__card__group">
        <div>
          <img src="@/assets/images/many-gold-miners.png" alt="miner"/>
        </div>
        <div>
          <div>Salary for employee</div>
          <div class="subtitle">No one want to work for free!!!</div>
        </div>
        <div><b>-4%</b></div>
      </div>

      <div class="start-mine-page__card__group">
        <div>
          <img src="@/assets/images/government.png" alt="miner"/>
        </div>
        <div>
          <div>Share of state profit</div>
          <div class="subtitle">Want money? Give a part for a gov</div>
        </div>
        <div><b>-20%</b></div>
      </div>

      <div class="start-mine-page__card__group">
        <div>
          <img src="@/assets/images/boat.png" alt="miner"/>
        </div>
        <div>
          <div>State tax on export gold</div>
          <div class="subtitle">Export of raw materials abroad</div>
        </div>
        <div><b>-4%</b></div>
      </div>

      <div class="start-mine-page__card__info">
        <span>Total mine:</span>
        <b><span>{{ currentInvest.profit?.toLocaleString('en-EN') ?? 0 }} AvaCoin</span></b>
      </div>
    </div>

    <AvaButton
        block
        type="primary"
        @click="openBuyEquipment"
    >
      Start mine {{ currentInvest.profit?.toLocaleString('en-EN') ?? 0 }} AvaCoin
    </AvaButton>
  </div>
  <EmptyPage v-else/>
</template>

<style lang="scss" scoped>
.start-mine-page {
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

    &__group {
      display: grid;
      grid-template-columns: 70px 1fr 30px;
      align-items: center;
      font-weight: 500;

      .subtitle {
        font-size: 12px;
        margin-top: 5px;
        font-weight: 400;
      }

      img {
        width: 60px;
      }
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