<script setup lang="ts">
import MainPoints from '@/components/MainPoints.vue'
import AppFooter from '@/components/AppFooter.vue'
import LevelCompleteModal from '@/components/LevelCompleteModal.vue'
import { useRankStore } from '@/stores/rank'
import { useSkinStore, defaultSkin } from '@/stores/skin'
import { BackButton } from 'vue-tg'
import GoldAndDust from '@/components/booster/GoldAndDust.vue'
import { useBoosterStore } from '@/stores/booster'
import { onMounted, onUnmounted } from 'vue'
import StatisticsTotal from '@/components/statistics/StatisticsTotal.vue'
import StackingBanner from '@/components/stacking/StackingBanner.vue';
import NoStakingBanner from '@/components/stacking/NoStakingBanner.vue'
import { useStake } from '@/stores/stake'
import BoosterActivate from '@/components/booster/BoosterActivate.vue';
import { useRootStore } from '@/stores/root'
import AvaSlider from '@/components/slider/AvaSlider.vue';

const rankStore = useRankStore()
const boosterStore = useBoosterStore()
const skinStore = useSkinStore()
const stake = useStake()
const root = useRootStore()

stake.getMyStaking()
stake.getTodayStaking();

Promise.all([
  boosterStore.getBoosters(),
  boosterStore.getAvailableBoosters(),
  // skinStore.getMySkins(),
  skinStore.getSelectedSkin()
])

let touchStartX: number | undefined
let touchStartY: number | undefined
let touchMoveX: number | undefined
let touchMoveY: number | undefined
const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

const onTouchMove = (e: TouchEvent) => {
  touchMoveX = e.touches[0].clientX
  touchMoveY = e.touches[0].clientY
  if (touchStartX && touchStartY) {
    const dx = Math.abs(touchMoveX - touchStartX)
    const dy = Math.abs(touchMoveY - touchStartY)
    if (dx < dy) {
      e.preventDefault()
    }
  }
}

onMounted(() => {
  root.fetchUser();
  const overflow = 100
  document.body.style.overflowY = 'hidden'
  document.body.style.marginTop = `${overflow}px`
  document.body.style.height = window.innerHeight + overflow + 'px'
  document.body.style.paddingBottom = `${overflow}px`
  window.scrollTo(0, overflow)
  document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false })
  document.documentElement.addEventListener('touchmove', onTouchMove, { passive: false })
})

onUnmounted(() => {
  document.documentElement.removeEventListener('touchmove', onTouchMove)
  document.documentElement.removeEventListener('touchstart', onTouchStart)
  document.body.style.overflowY = 'auto'
  document.body.style.marginTop = `0px`
  document.body.style.height = 'auto'
  document.body.style.paddingBottom = `0px`
})
</script>

<template>
  <BackButton v-if="rankStore.newRankModal" @click="rankStore.newRankModal = false" />
  <div class="home">
    <div
      class="home__background"
      :style="{
        background: skinStore.chosenSkin
          ? skinStore.chosenSkin.coin_skin.background_color_hex
          : defaultSkin.background_color_hex
      }"
      :data-blur="skinStore.chosenSkin?.coin_skin.id !== 2"
    ></div>
    <div class="home__body">
      <BoosterActivate v-if="boosterStore.availableBoosters.length" />

      <div class="home__content">
<!--        <ProgressBar />-->
        <StatisticsTotal style="margin-bottom: 30px;" />
        <div>
<!--          <BannerInfo />-->

          <MainPoints />

<!--          <div class="coin-container">-->
<!--            <ActualBalanceButton />-->
<!--            <MiningOver  />-->
<!--            <ClickCoin />-->

<!--          </div>-->
        </div>
      </div>
      <div>
        <AvaSlider style="margin-top: -55px"/>
        <StackingBanner v-if="stake.hasStaking" />
        <NoStakingBanner v-else />
        <AppFooter />
      </div>
    </div>
    <LevelCompleteModal v-if="rankStore.newRankModal" />

    <GoldAndDust v-if="boosterStore.active" />
  </div>
</template>

<style scoped lang="scss">
.home {
  padding: var(--page-top-offset) var(--page-horizontal-offset) var(--page-bottom-offset);
  height: 100dvh;
  box-sizing: border-box;
  overflow: hidden;
  user-select: none;
  &__content {
    position: relative;
  }
  &__background {
    border-radius: 805px;
    background: linear-gradient(
      1deg,
      #3f3f3f 39.37%,
      #afafaf 55.02%,
      #3f3f3f 76.73%,
      #3f3f3f86 0.14%,
      #3f3f3f94 0.97%
    );
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    position: absolute;
    bottom: -32%;
    left: 0;
    width: 100%;
    height: 92%;
    &[data-blur='true'] {
      filter: blur(60px);
    }
  }
  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .coin-container {
    position: relative;
  }
}
</style>
