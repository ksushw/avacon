import type { IQuest } from '@/types/tasks'
import { useAxios } from '@/composables/useAxios'
import { ref } from 'vue'


export const useTasks = () => {
  const quests = ref<IQuest[]>([])
  const quest = ref<IQuest>()
  const loading = ref(false)

  async function getQuests() {
    try {
      loading.value = true
      quests.value =  await useAxios<IQuest[]>('/quest/')
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }

  async function getQuest(id: number) {
    try {
      loading.value = true
      quest.value = await useAxios<IQuest>(`/quest/${id}/`)
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }

  async function checkQuest(id: number) {
    try {
      quest.value = await useAxios(`/quest/${id}/check/`, {
        method: 'POST'
      })
    } catch (e) {
      console.log(e)
    }
  }

  return {
    getQuests,
    getQuest,
    checkQuest,
    loading,
    quests,
    quest
  }
}