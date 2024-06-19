<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useWebAppTheme, useWebAppViewport, MainButton } from 'vue-tg'
import { useRootStore } from '@/stores/root'
import { useNotificationStore } from '@/stores/notification'
import { useAxios } from '@/composables/useAxios'
import AvaNotification from '@/components/AvaNotification.vue'
import MainLoader from '@/components/MainLoader.vue'
import TechnicalWorkBanner from '@/components/blockers/TechnicalWorkBanner.vue'
import { touchInit } from '@/utils/touch'

const theme = useWebAppTheme()
const viewport = useWebAppViewport()
const rootStore = useRootStore()
const notificationStore = useNotificationStore()

const show = ref(false)

useAxios('/user/check/shield/').finally(() => {
  show.value = true
})

theme.setHeaderColor('#000000')
theme.setBackgroundColor('#000000')
viewport.expand()

loadData()
function loadData() {
  rootStore.userLoading = true
  rootStore.fetchUser().then(() => {
    if (rootStore.user) rootStore.userLoading = false
  })
}

onMounted(async () => {
  document.addEventListener('click', ({ target }: Event) => {
    if (!['INPUT', 'TEXTAREA'].includes((target as HTMLElement)?.tagName)) {
      ;(document.activeElement as HTMLInputElement)?.blur()
    }
  })
  touchInit()
})
</script>

<template>
  <main>
    <TechnicalWorkBanner v-if="rootStore.technicalBannerShow" />
    <RouterView v-else-if="show" />
    <MainLoader />
  </main>

  <Transition name="slide-up">
    <AvaNotification v-if="notificationStore.message" :item="notificationStore.message" />
  </Transition>

  <MainButton :visible="false" />
</template>
