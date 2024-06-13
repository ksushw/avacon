import { computed } from 'vue';
import type { IRank } from '@/types/user';
import { useRankStore } from '@/stores/rank';
import { useRootStore } from '@/stores/root';

export const useRanks = () => {
  const rankStore = useRankStore()
  const root = useRootStore()

  const user = computed(() => root.user)
  const currentRank = computed<IRank>(() => user.value?.rank)
  const nextRank = computed<IRank>(() => {
    return rankStore.ranks.find((el) => {
      return el.id === ((currentRank.value?.id ?? 0) + 1)
    }) as IRank
  })


  return {
    getRanks: rankStore.getRanks,
    ranks: rankStore.ranks,
    currentRank,
    nextRank
  }
}