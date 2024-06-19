import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const userPoints = ref(0)
  const clicked = ref(0)

  function increment() {
    count.value++
    userPoints.value++
  }

  return { count, userPoints, increment, clicked }
})
