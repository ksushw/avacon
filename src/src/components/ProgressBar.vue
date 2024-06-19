<script setup lang="ts">

import { computed, nextTick, ref, watch, watchEffect } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { onMounted } from 'vue';
import icon0 from '@/assets/images/levels/no-level.png';
import icon1 from '@/assets/images/levels/1.png';
import icon2 from '@/assets/images/levels/2.png';
import icon3 from '@/assets/images/levels/3.png';
import icon4 from '@/assets/images/levels/4.png';
import icon5 from '@/assets/images/levels/5.png';
import icon6 from '@/assets/images/levels/6.png';
import { useRootStore } from '@/stores/root';
import { useRankStore } from '@/stores/rank';

const icons: Record<number, string> = {
  0: icon0,
  1: icon1,
  2: icon2,
  3: icon3,
  4: icon4,
  5: icon5,
  6: icon6,
}

const counterStore = useCounterStore()
const root = useRootStore()
const rankStore = useRankStore()

const scrollEl = ref<HTMLElement>()
const loading = ref(true)

const giftOffsetByPoint = 200

const levels = computed<ILevel[]>(() => {
  return rankStore.ranks.map((el) => ({
    points: el.points_level_receiving,
    name: el.name,
    icon: icons[el.id]
  }))
})

const levelPoints = computed(() => levels.value.map(el => el.points))

const totalClicks = computed(() => {
  if (levels.value.length === 0) return 0
  return levels.value[levels.value.length - 1].points
})

const quantityPoint = computed(() => levels.value.length ? levels.value[0].points : 1)
const totalWidth = computed(() => Math.ceil(giftOffsetByPoint * totalClicks.value / quantityPoint.value))
const currentPoints = computed(() => {
  if (counterStore.count > totalClicks.value) {
    return totalClicks.value
  }
  return counterStore.count
})

const progressWidth = computed(() => {
  return (currentPoints.value * 100 / totalClicks.value).toFixed(3)
})

function getGiftOffset(level: ILevel) {
  return Math.ceil(giftOffsetByPoint * level.points / quantityPoint.value)
}

watchEffect(async () => {
  if (scrollEl.value && (totalClicks.value >= currentPoints.value) && (currentPoints.value > quantityPoint.value)) {
    await nextTick()
    scrollEl.value.scrollLeft = giftOffsetByPoint * currentPoints.value / (quantityPoint.value * 1.2)
  }
})

watch(() => counterStore.count, () => {
  if (levelPoints.value.includes(counterStore.count)) {
    root.updateUserInfo()
  }
})

onMounted(async () => {
  loading.value = true
  await rankStore.getRanks()
  loading.value = false
})

interface ILevel {
  points: number
  name: string
  icon: string
}

</script>

<template>
  <section class="progress-bar">
    <div v-if="loading || root.userLoading" class="progress-bar__loading">
    </div>

    <template v-else>
      <div class="progress-bar__total">
        <span class="grey">AVACOIN Token</span>
        <span>{{ (loading || root.userLoading) ? '' : counterStore.count?.toLocaleString('en-US') ?? 0 }} </span>
      </div>
      <div ref="scrollEl" class="progress-bar__slider slider">
        <div class="slider__bar" :style="`width: ${totalWidth}px`">
          <div class="slider__progress" :style="`width: ${progressWidth}%`">
            <div
              v-for="level of levels"
              :key="level.points"
              class="slider__gift"
              :style="`left: ${getGiftOffset(level)}px`"
            >
              <img :src="level.icon" alt="gift">
              <span>{{ level.points?.toLocaleString('en-US') || 0 }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>

  </section>
</template>

<style scoped lang="scss">

.progress-bar {
  position: relative;
  height: 95px;
  &__loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80%;
    border-radius: var(--big-border-radius);
    background: linear-gradient(90deg,var(--body-background) 25%,var(--block-dark-backgrond) 37%,var(--body-background) 63%);
    overflow: hidden;
    background-size: 400% 100%;
    animation: el-skeleton-loading 1.4s ease infinite;
  }
  &__skeleton {
    height: 100%;
    width: 50px;
    background-color: #ddd;
  }
  &__total {
    color: var(--warning-text-color);
    font-size: 16px;
    margin-bottom: 4px;
    min-height: 18px;
    display: flex;
    flex-direction: column;

    .grey {
      font-size: 12px;
      font-weight: 500;
      opacity: 0.4;
      color: var(--main-text-color)
    }
  }
  .slider {
    overflow-y: hidden;
    overflow-x: auto;
    height: 55px;
    box-sizing: border-box;
    padding-top: 10px;
    position: relative;
    left: calc(-1 * var(--page-horizontal-offset));
    width: calc(100% + 2 * var(--page-horizontal-offset));
    padding-left: var(--page-horizontal-offset);
    padding-right: var(--page-horizontal-offset);
    scrollbar-width: none;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      width: 0;
      display: none;
    }
    &__bar {
      border-radius: 8px;
      background: var(--progress-background);
      width: 100%;
      height: 12px;
    }
    &__progress {
      border-radius: 8px;
      background: var(--progress-active-background);
      height: 100%;
      display: flex;
      align-items: center;
    }
    &__gift {
      position: absolute;
      height: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      color: var(--warning-dark-text-color);
      gap: 8px;
      margin-top: 20px;
      img {
        height: 34px;
      }
    }
  }
}
</style>