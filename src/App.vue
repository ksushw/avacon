<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWebAppTheme, useWebAppViewport, useWebApp, MainButton, useWebAppPopup , Popup } from 'vue-tg'
import { useRootStore } from '@/stores/root'
import { useNotificationStore } from '@/stores/notification'
import { useAxios } from '@/composables/useAxios'
import AvaNotification from '@/components/AvaNotification.vue'
import DesktopBlocker from '@/components/DesktopBlocker.vue'
import MainLoader from '@/components/MainLoader.vue'
import TechnicalWorkBanner from '@/components/blockers/TechnicalWorkBanner.vue'
import { touchInit } from '@/utils/touch'


const theme = useWebAppTheme()
const viewport = useWebAppViewport()
const webApp = useWebApp()
const rootStore = useRootStore()
const notificationStore = useNotificationStore()

const show = ref(false)

useAxios('/user/check/shield/').finally(() => {
  show.value = true
})

const isMobile = computed(() => {
  const devise = /iPhone|iPod|iPad|Android|BlackBerry/.test(navigator.userAgent)
  return (devise && !!webApp.initData) || import.meta.env?.VITE_MODE === 'local'
})

theme.setHeaderColor('#000000')
theme.setBackgroundColor('#000000')
viewport.expand()

loadData()
function loadData() {
  if (!isMobile.value) return

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

const popup = useWebAppPopup()
const test = (id: Number) => {
  popup.showAlert('message[, callback]')
}

</script>

<template>
  <!--  {{ webApp.initData }}-->
  <main v-if="true" >
    <TechnicalWorkBanner v-if="rootStore.technicalBannerShow" />
    <RouterView v-else-if="show" />
    <MainLoader />
    <p>cfghjkl</p>
    <Popup title="Are you sure?" message="Your AVAcoins will returned to
your balance" :buttons="[{'type':'default', id: 'remove', 'text': 'Remove'},{'type':'cancel', id: 'cancel'}]" @close="true" @popupClosed="test" />
  </main>
  <DesktopBlocker v-else />

  <Transition name="slide-up">
    <AvaNotification v-if="notificationStore.message" :item="notificationStore.message" />
  </Transition>

  <MainButton :visible="false" />
</template>

<style>
.popup {
  opacity: 0.5;
}
</style>