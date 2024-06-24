<script setup lang="ts">

import AvaBottomDrawer from '@/components/AvaBottomDrawer.vue'
import CongratulationsLeafsAnimation from '@/components/CongratulationsLeafsAnimation.vue'
import AvaButton from '@/components/AvaButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isOpen = defineModel({ default: false })

</script>

<template>
  <AvaBottomDrawer v-model="isOpen" class="status-drawer">
    <CongratulationsLeafsAnimation />
    <div class="status-drawer__title text-center">
      Congratulations, you've bought Dubai stamp gold
    </div>
    <div class="status-drawer__img">
      <img src="@/assets/images/market/bear-suite.png" alt="bear">
    </div>
    <br><br>

    <AvaButton type="primary" block @click="router.push('/market')">
      Return to market
    </AvaButton>
  </AvaBottomDrawer>
</template>

<style scoped lang="scss">

</style>