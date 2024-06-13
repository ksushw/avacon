import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAxios } from '@/composables/useAxios'
import type { IAvailableInvestment, IInvest } from '@/types/invest'

export const useInvestStore = defineStore('invest', () => {
  const investments = ref<IInvest[]>([])
  const availableInvestments = ref<IAvailableInvestment[]>([])

  async function getInvestments() {
    try {
      const data = await useAxios<IInvest[]>('/token/invest/')
      investments.value = data.sort((a, b) => a.id - b.id)
    } catch (e) {
      console.log(e)
    }
  }

  async function getAvailableInvestments() {
    try {
      availableInvestments.value = await useAxios<IAvailableInvestment[]>('/token/invest/license/available/')
    } catch (e) {
      console.log(e)
    }
  }

  async function buyLicense(id: number) {
    try {
      await useAxios(`/token/invest/license/buy/?license_id=${id}`, {
        method: 'POST'
      })
    } catch (e) {
      console.log(e)
    }
  }

  async function buy(id: number) {
    try {
      await useAxios(`/token/invest/buy/?invest_id=${id}`, {
        method: 'POST'
      })
    } catch (e) {
      console.log(e)
    }
  }

  return {
    investments,
    getInvestments,
    getAvailableInvestments,
    buyLicense,
    buy,
    availableInvestments
  }
})