import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAxios } from '@/composables/useAxios'


export const useStatisticsStore = defineStore('statistics', () => {
  const totals = ref<IStatisticsTotal>()

  async function getTotals() {
    try {
      if (!totals.value) {
        totals.value = await useAxios('/statistic/general/')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return {
    totals,
    getTotals
  }
})

interface IStatisticsTotal {
  total_points: number
  total_users: number
  daily_active_users: number
  total_teams: number
  total_buyed_boosters: number
  total_golds_recieved: number
  users_invests: number
}