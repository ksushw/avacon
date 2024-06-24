<script setup lang="ts">

import moment from 'moment'
import AvaCard from '@/components/AvaCard.vue'
import type { BetStatus, IAvaBet } from '@/types/bets'
import { computed } from 'vue'
import gameIcon from '@/assets/images/avabet/game.png'
import winIcon from '@/assets/images/avabet/win.png'
import loseIcon from '@/assets/images/avabet/lose.png'

const { bet } = defineProps<{
  bet: IAvaBet
}>()

const firstPoint = computed(() => bet.points[0])
const secondPoint = computed(() => bet.points[1])
const lastPoint = computed(() => bet.points[2])

const statuses: Record<BetStatus, string> = {
  in_game: gameIcon,
  win: winIcon,
  lose: loseIcon,
  no_bet: ''
}

const activePoint = computed(() => bet.points.find(el => el.is_completed))
const canWin = computed(() => {
  if (activePoint.value?.amount) {
    return (activePoint.value.amount * activePoint.value.coefficent).toLocaleString('en-EN') + ' AVACN'
  }
  return '-'
})
</script>

<template>
  <AvaCard bg-color="#FFFFFF" class="mt-15 mb-16">
    <div class="bet-info">
      <div class="flex flex-column align-center black-color fw-500">
        <div class="image-big" :style="{ backgroundImage: `url(${firstPoint.image_url})`}"></div>
        {{ firstPoint.title }}
      </div>

      <div class="grey-color text-14 text-center">
        <div>{{ moment(bet.begin_at).format('DD MMMM') }}</div>
        <div class="fw-600 mt-4">{{ moment(bet.begin_at).format('HH:mm') }}</div>
      </div>

      <div class="black-color align-center flex-column flex fw-500">
        <div class="image-big" :style="{ backgroundImage: `url(${secondPoint.image_url})`}"></div>
        {{ secondPoint.title }}
      </div>
    </div>

    <div class="koeff">
      <div
        :class="['flex justify-between', firstPoint?.is_completed ? 'blue-color' : 'grey-color']"
      >
        <div>1</div>
        <div>{{ firstPoint?.coefficent }}</div>
      </div>

      <div
        :class="['flex justify-between', lastPoint?.is_completed ? 'blue-color' : 'grey-color']"
      >
        <div>x</div>
        <div>{{ lastPoint?.coefficent }}</div>
      </div>

      <div
        :class="['flex justify-between', secondPoint?.is_completed ? 'blue-color' : 'grey-color']"
      >
        <div>2</div>
        <div>{{ secondPoint?.coefficent }}</div>
      </div>
    </div>
    <div class="text-center grey-color text-14">
      Choose the winner of the match (1 or 2) or bet on draw (x)
    </div>
  </AvaCard>

  <AvaCard bg-color="#FFFFFF" class="mt-16">
    <div class="black-color flex flex-column gap-12">
      <div class="flex justify-between">
        <div>Your bet</div>
        <div class="fw-700">{{ activePoint?.amount }} AVACN</div>
      </div>

      <div class="flex justify-between">
        <div>Сoefficient</div>
        <div class="fw-700">{{activePoint?.coefficent}}</div>
      </div>

      <div class="flex justify-between">
        <div>You can win</div>
        <div class="fw-700">{{ canWin }}</div>
      </div>

      <div class="flex justify-between align-center">
        <div>Results</div>
        <div><img :src="statuses[bet.status]" alt=""></div>
      </div>
    </div>
  </Avacard>
</template>

<style scoped lang="scss">
.bet-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.koeff {
  margin-bottom: 16px;
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  &>.flex {
    border: 1px solid #7F7F7F;
    border-radius: 4px;
    padding: 10px 16px;
    &.blue-color {
      border-color: inherit;
      border-width: 2px;
    }
  }
}
.amount {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
  &>div {
    border: 1px solid #007AFF;
    border-radius: 16px;
    padding: 10px;
    color: #0A7CFD;
    text-align: center;
    &.active {
      background-color: #0A7CFD;
      color: #ffffff;
    }
    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
.image-big {
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-size: cover;
  background-position: center;
  margin: 0 auto;
}
</style>