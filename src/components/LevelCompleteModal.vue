<script setup lang="ts">

import { useRootStore } from '@/stores/root';
import { computed } from 'vue';
import icon1 from '@/assets/images/levels/big/1.png'
import icon2 from '@/assets/images/levels/big/2.png'
import icon3 from '@/assets/images/levels/big/3.png'
import icon4 from '@/assets/images/levels/big/4.png'
import icon5 from '@/assets/images/levels/big/5.png'
import icon6 from '@/assets/images/levels/big/6.png'
import { useRanks } from '@/composables/useRanks';
import AvaCard from '@/components/AvaCard.vue';
import CongratulationsLeafsAnimation from '@/components/CongratulationsLeafsAnimation.vue'

const icons: Record<number, string> = {
  1: icon1,
  2: icon2,
  3: icon3,
  4: icon4,
  5: icon5,
  6: icon6,
}

const ranks = useRanks()
const root = useRootStore()

const user = computed(() => root.user)

</script>

<template>
  <section v-if="user?.rank" class="l-complete page">
    <CongratulationsLeafsAnimation class="l-complete__anim" />
    <div class="l-complete__logo">
      <img :src="icons[user.rank.id]" alt="level">
    </div>

    <div class="page__title text-center">
      Congratulations, you
      have reached a new
      level
    </div>

    <div class="l-complete__levels">
      <div class="l-complete__level">
        <div>New level:</div>
        <div v-if="ranks.currentRank.value">
          <img :src="icons[user.rank.id]" alt="level">
          {{ ranks.currentRank.value.name }}
        </div>
      </div>
      <div class="l-complete__level">
        <div>Next level:</div>
        <div v-if="ranks.nextRank.value">
          <img :src="icons[ranks.nextRank.value.id]" alt="level">
          {{ ranks.nextRank.value.name }}
        </div>
      </div>
    </div>

    <div class="l-complete__subtitle">
      Bonuses at this level
    </div>

    <AvaCard>
      <div class="l-complete__bonus bonus">
        <div class="bonus__image">
          <img src="@/assets/images/levels/level-bonus.png" alt="bonus">
        </div>
        <div class="bonus__body">
          <div class="bonus__title">Gold dust</div>
          <div class="bonus__text">
            <span>Нou have earned</span>
            <img src="@/assets/images/mini-coin.png" alt="coin">
            <span class="bonus__amount">
              {{ ranks.currentRank.value?.rank_reward?.points?.toLocaleString('en-EN') ?? 0 }}
            </span>
          </div>
        </div>
      </div>
    </AvaCard>
  </section>
</template>

<style lang="scss">
.l-complete {
  background: var(--body-background) url("@/assets/images/levels/level-complete-bg.png") center -80%;
  background-size: 100%;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  padding-bottom: 40px;

  &__anim {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 300px;
    z-index: 30;
  }
  .bonus {
    display: flex;
    gap: 12px;
    align-items: center;
    &__image {
      width: 56px;
      min-width: 56px;
      img {
        width: 100%;
      }
    }
    &__title {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 2px;
    }
    &__text {
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      img {
        height: 16px;
      }
    }
  }
  &__levels {
    padding-left: 30px;
    margin-bottom: 32px;
  }
  &__subtitle {
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.02em;
    margin-bottom: 18px;
  }
  &__level {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    font-size: 16px;
    gap: 10px;
    &>div {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    img {
      height: 32px;
    }
  }

  &__logo {
    text-align: center;
    margin-top: 36px;
    margin-bottom: 32px;

    img {
      height: 224px;
    }
  }
}

@keyframes confetti-slow {
  0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }

  100% { transform: translate3d(25px, 105vh, 0) rotateX(360deg) rotateY(180deg); }
}

@keyframes confetti-medium {
  0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }

  100% { transform: translate3d(100px, 105vh, 0) rotateX(100deg) rotateY(360deg); }
}

@keyframes confetti-fast {
  0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }

  100% { transform: translate3d(-50px, 105vh, 0) rotateX(10deg) rotateY(250deg); }
}

.confetti-container {
  perspective: 700px;
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.confetti {
  position: absolute;
  z-index: 1;
  top: -10px;
  border-radius: 0;

  &--animation-slow {
    animation: confetti-slow 2.25s linear 1 forwards;
  }

  &--animation-medium {
    animation: confetti-medium 1.75s linear 1 forwards;
  }

  &--animation-fast {
    animation: confetti-fast 1.25s linear 1 forwards;
  }
}
</style>