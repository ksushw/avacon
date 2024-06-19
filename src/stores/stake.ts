import { useAxios } from '@/composables/useAxios'
import { ref } from 'vue'
import type { IMyStaking, IStakingStats } from '@/types/staking'
import { defineStore } from 'pinia'
import { useNotificationStore } from '@/stores/notification'
import { useRootStore } from '@/stores/root'


export const useStake = defineStore('stake', () => {

  const noty = useNotificationStore()
  const root = useRootStore()

  const hasStaking = ref(false)
  const my = ref<IMyStaking>()
  const stats = ref<IStakingStats>()

  async function getMyStaking() {
    try {
      my.value = await useAxios<IMyStaking>('/stake/')
      hasStaking.value = my.value?.sum > 0
    } catch (e) {
      console.log(e)
      hasStaking.value = false
    }
  }

  async function getTodayStaking() {
    try {
      stats.value = await useAxios<IStakingStats>('/stake/today/')
    } catch (e) {
      console.log(e)
    }
  }

  async function stake(sum: number) {
    try {
      const url = hasStaking.value ? '/stake/topup/' : '/stake/'
      await useAxios(url, {
        method: 'POST',
        data: {sum}
      })
      noty.push({
        type: 'info',
        message: 'Staked'
      })

      await Promise.all([
        getMyStaking(),
        getTodayStaking(),
        root.fetchUser()
      ])
    } catch (e) {
      console.log(e)
    }
  }

  async function removeStake(sum:number) {
    try {
      const url = '/stake/withdrawal/'
      await useAxios(url, {
        method: 'POST',
        data: {sum}
      })
      noty.push({
        type: 'info',
        message: 'Succesfuly returned'
      })
      await Promise.all([
        getMyStaking(),
        getTodayStaking(),
        root.fetchUser()
      ])
    } catch (e) {
      console.log(e)
      noty.push({
        type: 'warning',
        message: 'Can not remove'
      })
    }
  }

  async function takeStake() {
    try {
     await useAxios<IMyStaking>('/stake/take/', {
       method: 'POST'
     })
    } catch (e) {
      console.log(e)
    }
  }

  return {
    getMyStaking,
    getTodayStaking,
    stake,
    removeStake,
    takeStake,
    hasStaking,
    my,
    stats
  }
})