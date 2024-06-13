import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IRank } from '@/types/user';
import { useAxios } from '@/composables/useAxios';


export const useRankStore = defineStore('rank', () => {
  const ranks = ref<IRank[]>([])
  const newRankModal = ref(false)

  let rankErrors = 0

  async function getRanks() {
    try {
      if (ranks.value.length) return
      const res = await useAxios<IRank[]>('/rank/')
      ranks.value = res.sort((a, b) => a.points_level_receiving - b.points_level_receiving)
    } catch (e) {
      console.log(e)
      rankErrors++
      if (rankErrors < 3) {
        await getRanks()
      }
    }
  }

  return {
    getRanks,
    ranks,
    newRankModal
  }
})