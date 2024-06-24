import { useAxios } from '@/composables/useAxios'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IAvaBet, IStat } from '@/types/bets';

export const useBet = defineStore('bet', () => {

    const bets = ref<IAvaBet[]>([]);
    const dataStats = ref<IStat>()

    async function getBet() {
        try {
            bets.value = await useAxios<IAvaBet[]>('/bet/')
        } catch (e) {
            console.log(e)
        }
    }

    async function makeBet(betId: number, coefficientId: number, amount: number) {
        try {
            await useAxios(`/bet/${betId}/${coefficientId}/check/`, {
                method: 'POST',
                data: { amount }
            })
        } catch (e) {
            console.log(e)
        }
    }

    async function getStats() {
        try {
            dataStats.value = await useAxios<IStat>('/bet/statistic/')
        } catch (e) {
            console.log(e)
        }
    }

    return {
        bets,
        dataStats,
        getBet,
        makeBet,
        getStats
    }
})