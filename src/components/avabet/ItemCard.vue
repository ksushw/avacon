<script setup lang="ts">

import gameIcon from '@/assets/images/avabet/game.png'
import winIcon from '@/assets/images/avabet/win.png'
import loseIcon from '@/assets/images/avabet/lose.png'
import { computed, ref } from 'vue'
import AvaBottomDrawer from '@/components/AvaBottomDrawer.vue'
import type { BetStatus, IAvaBet } from '@/types/bets'
import moment from 'moment'
import MakeBet from '@/components/avabet/MakeBet.vue'
import BetInfo from '@/components/avabet/BetInfo.vue'

const emit = defineEmits(['update'])

const { bet } = defineProps<{
  bet: IAvaBet
}>()

const isOpenModal = ref(false)

const statuses: Record<BetStatus, string> = {
  in_game: gameIcon,
  win: winIcon,
  lose: loseIcon,
  no_bet: ''
}

const firstPoint = computed(() => bet.points[0])
const secondPoint = computed(() => bet.points[1])
const lastPoint = computed(() => bet.points[2])

const isStartedAndNotBet = computed(() => {
  if (bet.id == 11) {
    console.log(moment(bet.begin_at), moment(new Date().toISOString()))
  }
  return moment(bet.begin_at) < moment(new Date().toISOString())
      && (bet.status === 'no_bet' || !bet.status)
});

const openModal = () => {
  if (isStartedAndNotBet.value) {
    return;
  }
  isOpenModal.value = true;
}
</script>

<template>
  <div class="item-card flex justify-between align-center" @click="openModal">
    <div class="black-color fw-500">
      <div class="flex align-center gap-5 mb-8">
        <div class="image" :style="{ backgroundImage: `url(${firstPoint?.image_url})` }"></div>
        {{ firstPoint?.title }}
      </div>
      <div v-if="secondPoint" class="flex align-center gap-5">
        <div class="image" :style="{ backgroundImage: `url(${secondPoint?.image_url})` }"></div>
        {{ secondPoint?.title }}
      </div>
    </div>

    <div class="bet-content gap-16">
      <div v-if="bet.status && bet.status !== 'no_bet'">
        <img :src="statuses[bet.status]" alt="">
      </div>
      <div v-else class="grey-color text-14 text-right">
        <div>{{ moment(bet.begin_at).format('DD MMMM') }}</div>
        <div class="fw-600 mt-4">{{ moment(bet.begin_at).format('HH:mm') }}</div>
      </div>

      <div v-if="bet.winned_bet_point_id !== null" class="black-color fw-500">
        <div class="mb-8">{{ firstPoint?.win_events_count }}</div>
        <div>{{ secondPoint?.win_events_count }}</div>
      </div>
      <div v-else/>

      <div class="grey-color text-12">
        <div :class="[firstPoint?.is_completed ? `${bet.status}-color` : '', isStartedAndNotBet && bet.winned_bet_point_id === firstPoint?.id ? 'active-koeff' : '' ]">
          {{ firstPoint?.coefficent.toFixed(2) }}
        </div>
        <div :class="[lastPoint?.is_completed ? `${bet.status}-color` : '', isStartedAndNotBet && bet.winned_bet_point_id === lastPoint?.id ? 'active-koeff' : '']">
          {{ lastPoint?.coefficent.toFixed(2) }}
        </div>
        <div :class="[secondPoint?.is_completed ? `${bet.status}-color` : '', isStartedAndNotBet && bet.winned_bet_point_id === secondPoint?.id ? 'active-koeff' : '']">
          {{ secondPoint?.coefficent.toFixed(2) }}
        </div>
      </div>

      <svg v-if="!isStartedAndNotBet" width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 1L5.5 5L1.5 9" stroke="#8A8A8A" stroke-width="1.5"/>
      </svg>
    </div>
  </div>

  <AvaBottomDrawer v-model="isOpenModal" bg-color="#F0EFF5">
    <MakeBet
      v-if="bet.status === 'no_bet' || !bet.status"
      :bet="bet"
      @update="emit('update')"
    />

    <BetInfo v-else :bet="bet" />
  </AvaBottomDrawer>
</template>

<style scoped lang="scss">

.bet-content {
  display: grid;
  grid-template-columns: 1fr 30px 30px 10px;
  align-items: center;
}

.item-card {
  padding: 12px 16px;
  .image {
    width: 20px;
    height: 20px;
    border-radius: 32px;
    background-size: cover;
    background-position: center;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #DCDCDC;
  }
  .you_win-color {
    color: #499F38;
  }
  .in_game-color {
    color: #FF8C31;
  }
  .you_lose-color {
    color: #D62822;
  }
  .no_bet-color {
    color: #D62822;
  }

  .active-koeff {
    font-weight: 800;
    color: #000000;
  }
}
</style>