import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useNotificationStore } from '@/stores/notification'
import { useAxios } from '@/composables/useAxios'
import type { IAvailableBooster, IBooster } from '@/types/booster'
import { useRootStore } from '@/stores/root'

export const useBoosterStore = defineStore('booster', () => {
  const noty = useNotificationStore()
  const root = useRootStore()

  const BOOSTER_LIMIT = 3
  const BOOSTER_TIME = 10

  const active = ref(false)
  const activatedBoosters = ref(0)
  const boosters = ref<IBooster[]>([])
  const availableBoosters = ref<IAvailableBooster[]>([])

  const disabled = computed(() => {
    return !availableBoosters.value.find((el) => !el.is_today_activated)
  })

  async function activate() {
    try {
      const bst = availableBoosters.value.find((el) => !el.is_today_activated)

      if (bst && !bst.is_today_activated) {
        await useAxios(`/booster/activate/?booster_id=${bst.id}`, { method: 'POST' })
        activatedBoosters.value++
        active.value = true
        getAvailableBoosters()

        setTimeout(() => {
          active.value = false
          root.fetchUser()
        }, 1000)
      } else {
        noty.push({
          message: 'You’ve already used boost today',
          type: 'danger'
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function getBoosters() {
    try {
      boosters.value = await useAxios<IBooster[]>('/booster/')
    } catch (e) {
      console.log(e)
    }
  }

  async function getAvailableBoosters() {
    try {
      availableBoosters.value = await useAxios<IAvailableBooster[]>('/booster/available/')
    } catch (e) {
      console.log(e)
    }
  }

  return {
    disabled,
    BOOSTER_LIMIT,
    BOOSTER_TIME,
    activate,
    active,
    getBoosters,
    boosters,
    getAvailableBoosters,
    availableBoosters
  }
})
