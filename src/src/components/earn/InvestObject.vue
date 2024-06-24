<script setup lang="ts">

import { useInvestStore } from '@/stores/invest'
import type { IInvest } from '@/types/invest'
import { computed } from 'vue'
import AvaTimer from '@/components/AvaTimer.vue'
import router from '@/router';
import { getNextPayDate } from '@/utils/formatDate';

const invest = useInvestStore()

const props = defineProps<{
  item: IInvest
}>()

const emits = defineEmits(['open-info']);

const isAvailable = computed(() => !!license.value)

const license = computed(() => {
  return invest.availableInvestments.find(el => el.invest_license.id === props.item.invest_license.id)
})


function activate() {
  console.log(props.item)
  if(props.item.buyed_at){
    emits('open-info', props.item.id);
    return;
  }
  if (isAvailable.value) {
    router.push(`/earn/license/${props.item.invest_license.id}`)
  } else {
    router.push(`earn/invest/${props.item.id}`)
  }
}

</script>

<template>
  <div
    :class="[`earn-page__obj earn-page__obj${item.id}`, { available: isAvailable || item.buyed_at }]"
    @click="activate"
  >
    <div v-if="isAvailable && !item.buyed_at" class="available__time">
      <div class="available__img">
        <img src="@/assets/images/earn/caution.png" alt="caution">
      </div>
      <div class="available__content">
        <div class="available__timer">
          <AvaTimer v-if="license" :date="license.available_until" />
        </div>
        <div class="available__text">
          License to start
          mining is valid
        </div>
      </div>
    </div>

    <div v-if="item.buyed_at" class="active__time">
      <div class="active__amount">+{{ (item.month_profit / 2)?.toLocaleString('en-EN') ?? 0 }} AVA</div>
      <div class="active__date">{{ getNextPayDate(item.buyed_at) }}</div>
    </div>
  </div>
  <div
    v-if="item.id === 2"
    :class="['earn-page__obj earn-page__obj5', { available: isAvailable || item.buyed_at }]"
    @click="activate"
  ></div>
</template>

<style scoped lang="scss">

</style>