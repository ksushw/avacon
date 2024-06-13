<script lang="ts" setup>
import { BackButton } from "vue-tg";
import router from "@/router";
import { useInvestStore } from '@/stores/invest'
import InvestObject from '@/components/earn/InvestObject.vue'
import { useRoute } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import type { IInvest } from '@/types/invest';
import AvaButton from '@/components/AvaButton.vue';
import AvaBottomDrawer from '@/components/AvaBottomDrawer.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import moment from 'moment'
import CongratulationsLeafsAnimation from '@/components/CongratulationsLeafsAnimation.vue'
import { getNextPayDate } from '@/utils/formatDate';

const invest = useInvestStore()
const route = useRoute();

const investId = computed(() => route.query.investId as string)
const isCongratulationsModal = ref(false);
const isInfoItemModal = ref(false);
const currentInvest = ref<IInvest>();
const isOpenDetails = ref(false);
const currentProfit = ref(0);
const timer = ref<null | number>(null);

const openInfo = (id: string) => {
  currentInvest.value = invest.investments.find((el) => String(el.id) === String(id));
  isInfoItemModal.value = true;

  if (currentInvest.value?.month_profit && currentInvest.value?.buyed_at){
    const secondProfit = currentInvest.value?.month_profit / 30 / 24 / 60 / 60;
    const buyedDate = new Date(moment.utc(currentInvest.value?.buyed_at).toDate()).getTime();
    currentProfit.value = (new Date().getTime() - buyedDate) / 1000 * secondProfit;
    timer.value = setInterval(() => {
      if(currentInvest.value?.month_profit) {
        currentProfit.value += secondProfit * 3
      }
    }, 3000)
  }
}

const closeInfoModal = () => {
  timer.value = null;
}

const returnToPlots = () => {
  router.replace('/earn');
  isCongratulationsModal.value = false;
  invest.getAvailableInvestments()
}

onMounted(async() => {
  await invest.getInvestments()
  await invest.getAvailableInvestments()
  if (investId.value) {
    isCongratulationsModal.value = true;
    currentInvest.value = invest.investments.find((el) => String(el.id) === investId.value)
  }
})
</script>

<template>
  <BackButton @click="router.push('/')" />
  <div class="earn-page">
    <div class="earn-page__container">
<!--      <div v-if="root.user?.private_investment_volume" class="earn-page__balance">-->
<!--        <div class="earn-page__balance__title">TOTAL PLOT BALANCE</div>-->
<!--        <div class="earn-page__balance__info">-->
<!--          <img src="@/assets/images/earn/cart.svg" alt="cart">-->
<!--          <span class="value">{{ root.user?.private_investment_volume ?? 0 }}</span> AVA-->
<!--        </div>-->
<!--      </div>-->
      <InvestObject
        v-for="inv of invest.investments"
        @open-info="openInfo"
        :key="inv.id"
        :item="inv"
      />

      <div class="earn-page__obj earn-page__obj6">
        <div class="earn-page__soon">soon</div>
      </div>
      <div @click="router.push('/market')" class="earn-page__obj earn-page__market"/>
    </div>

    <AvaBottomDrawer v-model="isCongratulationsModal" @update:model-value="returnToPlots">
      <section class="drawer__info info text-center">
        <CongratulationsLeafsAnimation class="info__anim" />
        <div class="drawer__info__title">Congratulations, you’ve bought your first plot</div>
        <div v-if="currentInvest?.image_url" class="drawer__info__icon">
          <img :src="currentInvest.image_url" alt="bear" />
        </div>
        <div class="drawer__info__card">
          <div class="drawer__info__card__info">
            <span>Type:</span>
            <span><b>{{ currentInvest?.name }}</b></span>
          </div>
          <div class="drawer__info__card__info">
            <span>How much you can mine:</span>
            <b><span>{{ currentInvest?.profit?.toLocaleString('en-EN') ?? 0 }} AVA</span></b>
          </div>
        </div>
        <AvaButton
            block
            type="primary"
            @click="returnToPlots"
        >
          Return to plots
        </AvaButton>
      </section>
    </AvaBottomDrawer>

    <AvaBottomDrawer v-model="isInfoItemModal" @close="closeInfoModal">
      <section class="drawer__info info text-center">
        <div class="drawer__info__card">
          <div class="drawer__info__card__info">
            <span><b>{{ currentInvest?.name }}</b></span>
            <div>
              <div>
                <b>{{ (currentProfit)?.toLocaleString('en-EN') ?? 0 }} AVA</b>
              </div>
              <div >Current profit</div>
            </div>
          </div>
          <div class="drawer__info__card__grid">
            <div><img :src="currentInvest?.image_url ?? ''" alt="icon"></div>
            <div>
              <div class="drawer__info__card__info">
                <span>Starting mine </span>
                <span><b> {{ moment(currentInvest?.buyed_at).format('DD.MM.YY') }} </b></span>
              </div>
              <div class="drawer__info__card__info">
                <span>Total profit </span>
                <div>
                  <div>
                    <b>{{ (currentInvest?.current_profit)?.toLocaleString('en-EN') ?? 0 }} AVA</b>
                  </div>
                  <div class="grey">/ {{ (currentInvest?.price)?.toLocaleString('en-EN') ?? 0 }} AVA</div>
                </div>
              </div>
              <div class="drawer__info__card__info">
                <span>Next schedule </span>
                <div>
                 <div v-if="currentInvest?.month_profit">
                   <b>+ {{ (currentInvest?.month_profit / 2)?.toLocaleString('en-EN') ?? 0 }} AVA</b>
                 </div>
                  <div class="grey" v-if="currentInvest?.buyed_at">
                    {{ getNextPayDate(currentInvest?.buyed_at) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div @click="isOpenDetails = !isOpenDetails" class="drawer__info__link">
            Watch payment schedule <ArrowIcon/>
          </div>
          <template v-if="isOpenDetails">
            <div v-for="(_, i) in 12" :key="i" class="drawer__info__card__info">
              <span>{{ i + 1 }} Month</span>
              <div>
                <div><b>+ {{ currentInvest?.month_profit?.toLocaleString('en-EN') ?? 0 }} AVA</b></div>
                <div v-if="currentInvest?.month_profit" class="grey">
                  {{ (currentInvest?.month_profit * (i + 1)).toLocaleString('en-EN') ?? 0 }} AVA total
                </div>
              </div>
            </div>
          </template>

        </div>
      </section>
    </AvaBottomDrawer>
  </div>
</template>

<style lang="scss">
.earn-page{
  width: 100%;
  .info__anim {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 300px;
    overflow: hidden;
  }

  &__balance {
    padding: 12px 24px;
    &__title {
      font-size: 14px;
      font-weight: 800;
      color: #FFDA35;
      -webkit-text-stroke: 1px #BC6A26;
      text-stroke: 1px #BC6A26;
    }

    &__info {
      background: #323232CC;
      padding: 4px 8px;
      border-radius: 16px;
      width: fit-content;
      display: flex;
      align-items: center;
      column-gap: 5px;
      font-size: 10px;
      font-weight: 500;
      .value {
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
  &__soon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #202020;
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 10px;
    line-height: 12px;
  }

  .drawer__info {

    &__link {
      font-size: 16px;
      font-weight: 400;
      line-height: 19px;
      color: #007AFF;
      text-align: center;
      margin-top: 12px;
    }

    &__title {
      font-size: 32px;
      font-weight: 700;
      text-align: center;
      color: #000000;
      margin-top: 16px;
    }

    &__icon img{
      width: 60vw;
      margin-top: 16px;
    }

    &__card {
      background: #6262621A;
      padding: 16px;
      border-radius: 24px;
      margin-top: 24px;
      margin-bottom: 25px;
      color: #000000;
      font-size: 16px;

      &__grid {
        display: grid;
        grid-template-columns: 100px 1fr;
        column-gap: 10px;

        img {
          width: 96px;
        }
      }

      &__info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        column-gap: 10px;

        .grey {
          color: #626262;
          font-size: 10px;
        }

        &:not(:last-child) {
          margin-bottom: 24px;
        }
      }
    }
  }

  &__container {
    width: 390px;
    height: 100dvh;
    background: url("https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/earn/earn-bg.png") no-repeat center top;
    background-size: 390px;
    margin-inline: auto;
    position: relative;
    aspect-ratio: 9 / 16;
  }
  &__obj1 {
    width: 147px;
    height: 120px;
    background: url("https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/earn/overlay/3.png") no-repeat center;
    top: 229px;
    left: 22px;
    border-radius: 42% 375% 174% 208%;
  }
  &__obj2 {
    width: 206px;
    height: 237px;
    background: url("https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/earn/overlay/4.png") no-repeat center;
    top: 342px;
    left: 12px;
    border-radius: 260% 257% 0 208%;
  }
  &__obj3 {
    width: 155px;
    height: 212px;
    background: url("https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/earn/overlay/1.png") no-repeat center;
    top: 32px;
    right: 14px;
    border-radius: 186% 109% 115% 346%;
  }
  &__obj4 {
    width: 173px;
    height: 128px;
    background: url("https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/earn/overlay/2.png") no-repeat center;
    top: 88px;
    left: 34px;
    border-radius: 42% 375% 174% 208%;
  }
  &__obj5 {
    width: 74px;
    height: 76px;
    background: url("https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/earn/overlay/5.png") no-repeat center;
    top: 535px;
    left: 183px;
    border-radius: 0 45% 0 0;
  }
  &__obj6 {
    width: 94px;
    height: 59px;
    background: url("https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/earn/overlay/6.png") no-repeat center;
    top: 451px;
    right: 27px;
  }
  &__obj7 {
    width: 115px;
    height: 113px;
    background: url("https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/earn/overlay/7.png") no-repeat center;
    top: 220px;
    right: 83px;
    border-radius: 45%;
  }
  &__market {
    width: 115px;
    height: 113px;
    background: url("https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/imagesearn/overlay/matket.png") no-repeat top;
    top: 180px;
    right: 83px;
    border-radius: 45%;
  }
  &__obj {
    position: absolute;
    //border: 1px solid;
    &.active, &.available {
      background: none;
    }
    .active {
      &__time {
        background: #FFFFFFCC;
        border-radius: 12px;
        padding: 4px 8px;
        text-align: right;
        position: absolute;
        right: 10px;
        top: 20%;
      }
      &__amount {
        color: #000000;
        margin-bottom: 3px;
        font-size: 14px;
        font-weight: 600;
      }
      &__date {
        color: #626262;
        font-size: 10px;
        font-weight: 500;
      }
    }
    .available {
      &__img img{
        width: 36px;
      }
      &__time {
        width: 184px;
        background: #FFFFFFCC;
        border-radius: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 16px;
        position: absolute;
        z-index: 5;
        box-sizing: border-box;
        bottom: 10%;
        left: 30px;
      }
      &__timer {
        color: #0E0E0E;
        font-size: 14px;
        font-weight: 700;
      }
      &__text {
        font-size: 13px;
        font-weight: 500;
        color: #626262;
      }
    }
  }

  &__obj3 .available__time {
    left: auto;
    right: 10%;
    bottom: 20%;
  }
}
</style>