import { debounce } from '@/utils/debounce'
import { ref, watch, computed } from 'vue'
import { useAxios } from '@/composables/useAxios'
import type { IUser } from '@/types/user'
import { useCounterStore } from '@/stores/counter'
import { useRankStore } from '@/stores/rank'
import { useRootStore } from '@/stores/root'

export const usePoints = () => {
  const counterStore = useCounterStore()
  const rankStore = useRankStore()
  const root = useRootStore()

  const points = ref(0)
  const clickLimit = ref(7500)
  const errorsCount = ref(0)

  const levelPoints = computed(() => rankStore.ranks.map((el) => el.points_level_receiving))
  const isCanClick = () => counterStore.clicked < clickLimit.value

  function increment() {
    points.value++
    counterStore.clicked++
  }

  const clickWatcher = debounce(async () => {
    sendPoints()
  }, 1000)

  function clickWatch() {
    increment()
    if (points.value === 250) {
      sendPoints()
    } else {
      clickWatcher()
    }
  }

  async function sendPoints() {
    if (!counterStore.count) return
    points.value = 0
    try {
      await useAxios<IUser>('/user/points/push/', {
        method: 'POST',
        data: { points: counterStore.count }
      })
      errorsCount.value = 0
    } catch (e) {
      console.log(e)
      errorsCount.value++
      if (errorsCount.value < 2) {
        await sendPoints()
      }
      if (errorsCount.value >= 3) {
        window.location.reload()
      }
    } finally {
      setTimeout(() => {
      }, 3000)
    }
  }

  watch(
    () => counterStore.count,
    async () => {
      if (levelPoints.value.includes(counterStore.count)) {
        await sendPoints()
        await root.updateUserInfo()
        rankStore.newRankModal = true
      }
    }
  )

  return {
    sendPoints,
    clickWatcher,
    increment,
    watch: clickWatch,
    isCanClick,
    clickLimit,
    points
  }
}
