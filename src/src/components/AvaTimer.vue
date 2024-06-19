<script setup lang="ts">

import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import moment from 'moment'

const props = defineProps<{
  date: string
}>()

interface TimerState {
  remainingTime: string;
  isFinished: boolean;
}

const futureDateGMT0 = moment.utc(props.date); // Replace with your future date in GMT 0
const now = ref(moment());
const timer = ref<any>(null);

const state = ref<TimerState>({
  remainingTime: calculateRemainingTime(),
  isFinished: false,
});

function calculateRemainingTime() {
  const diff = futureDateGMT0.diff(now.value);
  if (diff <= 0) {
    return '00:00:00';
  }

  const duration = moment.duration(diff);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return `${days ? days.toString().padStart(2, '0') + ':' : ''}
    ${hours.toString().padStart(2, '0')}:
    ${minutes.toString().padStart(2, '0')}:
    ${seconds.toString().padStart(2, '0')}`;
}

watch(
  now,
  (newVal) => {
    state.value.remainingTime = calculateRemainingTime();
    if (newVal.isAfter(futureDateGMT0)) { // Check if current time is past the future date
      clearInterval(timer.value);
    }
  },
  { immediate: true }
);

onMounted(() => {
  timer.value = setInterval(() => {
    now.value = moment();
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>

<template>
  <div>
    {{ state.remainingTime }}
  </div>
</template>

<style scoped lang="scss">

</style>