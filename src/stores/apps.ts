import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AppsResponse, IApp, IAppsCategory } from '@/types/apps'
import { useAxios } from '@/composables/useAxios'

export const useAppsStore = defineStore('apps',() => {
  const data = ref<AppsResponse>()
  const apps = ref<IApp[]>([])
  const category = ref<IAppsCategory[]>([])
  const loading = ref(true)

  async function getApps(params: Record<string, string | number>) {
    try {
      loading.value = true
      data.value = await useAxios<AppsResponse>('/apps/', {
        params
      })
      apps.value.push(...data.value.data)
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }

  async function getAppsCategory() {
    try {
      loading.value = true
      category.value = await useAxios<IAppsCategory[]>('/apps/categories/')
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    category,
    apps,
    getApps,
    getAppsCategory
  }
})