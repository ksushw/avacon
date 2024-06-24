<script setup lang="ts">

import type { IAvaBet } from '@/types/bets'
import { computed, ref } from 'vue'
import moment from 'moment/moment'
import AvaCard from '@/components/AvaCard.vue'
import { useRootStore } from '@/stores/root'
import AvaButton from '@/components/AvaButton.vue'
import { useNotificationStore } from '@/stores/notification'
import { useBet } from '@/stores/bet';

const { bet } = defineProps<{
  bet: IAvaBet
}>()

const emit = defineEmits(['update'])

const root = useRootStore()
const noty = useNotificationStore()

const loading = ref(false)
const coefficientId = ref()
const amount = ref(10)
const betStore = useBet();

const amounts = [10, 50, 100]

const firstPoint = computed(() => bet.points[0])
const secondPoint = computed(() => bet.points[1])
const lastPoint = computed(() => bet.points[2])

const canWin = computed(() => {
  if (activeCoeff.value !== '-') {
    return (activeCoeff.value * amount.value).toLocaleString('en-EN') + ' AVACN'
  }
  return '-'
})

const activeCoeff = computed(() => {
  const point = bet.points.find(el => el.id === coefficientId.value)
  return point?.coefficent ?? '-'
})

async function makeBet() {
  try {
    loading.value = true
    await betStore.makeBet(bet.id, coefficientId.value, amount.value)
    emit('update')
    noty.push({
      message: 'Congratulations, bet accepted',
      type: 'info',
    })
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

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

      <div class="black-color flex-column flex align-center fw-500">
        <div class="image-big" :style="{ backgroundImage: `url(${secondPoint.image_url})`}"></div>
        {{ secondPoint.title }}
      </div>
    </div>

    <div class="koeff">
      <div
        :class="['flex justify-between', coefficientId === firstPoint?.id ? 'blue-color' : 'grey-color']"
        @click="coefficientId = firstPoint?.id"
      >
        <div>1</div>
        <div>{{ firstPoint?.coefficent }}</div>
      </div>

      <div
        :class="['flex justify-between', coefficientId === lastPoint?.id ? 'blue-color' : 'grey-color']"
        @click="coefficientId = lastPoint?.id"
      >
        <div>x</div>
        <div>{{ lastPoint?.coefficent }}</div>
      </div>

      <div
        :class="['flex justify-between', coefficientId === secondPoint?.id ? 'blue-color' : 'grey-color']"
        @click="coefficientId = secondPoint?.id"
      >
        <div>2</div>
        <div>{{ secondPoint?.coefficent }}</div>
      </div>
    </div>
    <div class="text-center grey-color text-14">
      Choose the winner of the match (1 or 2) or bet on draw (x)
    </div>
  </AvaCard>

  <AvaCard bg-color="#FFFFFF">
    <div class="text-center grey-color mb-5">
      Your AVACN Balance
    </div>

    <div v-if="root.user" class="black-color flex justify-center align-center gap-5 text-24 fw-700 mb-12">
      <img src="@/assets/images/mini-coin.png" alt="coin" style="height: 24px">
      {{ Math.floor(root.user.tokens).toLocaleString('en-EN') }}
    </div>

    <div class="amount">
      <div
        v-for="item of amounts"
        :key="item"
        @click="amount = item"
        :class="{ active: item === amount }"
      >
        {{ item }}
      </div>
    </div>

    <div class="text-center grey-color mb-12">
      Choose your bet
    </div>

    <div class="black-color flex flex-column gap-12">
      <div class="flex justify-between">
        <div>Your bet</div>
        <div class="fw-700">{{ amount }} AVACN</div>
      </div>

      <div class="flex justify-between">
        <div>Сoefficient</div>
        <div class="fw-700">{{activeCoeff}}</div>
      </div>

      <div class="flex justify-between">
        <div>You can win</div>
        <div class="fw-700">{{ canWin }}</div>
      </div>
    </div>
  </AvaCard>

  <AvaButton
    block
    type="primary"
    class="mt-16 flex justify-center align-center gap-5"
    :disabled="!amount || activeCoeff === '-'"
    :loading="loading"
    @click="makeBet"
  >
    Make a bet
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16ZM16.6667 22.0776C16.4267 22.0776 16.2 21.9842 16.0267 21.7976C15.7067 21.4376 15.7333 20.8909 16.08 20.5709L19.9302 16.7927H10.6667C10.188 16.7927 9.8 16.4047 9.8 15.926C9.8 15.4474 10.188 15.0594 10.6667 15.0594H19.9207L16.0533 11.3042C15.6933 10.9842 15.68 10.4376 16 10.0776C16.32 9.7309 16.8667 9.70423 17.2267 10.0242L22.64 15.2327C23.0533 15.606 23.0533 16.246 22.64 16.6194L17.2533 21.8509C17.08 22.0109 16.88 22.0776 16.6667 22.0776Z" fill="white"/>
    </svg>
  </AvaButton>
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