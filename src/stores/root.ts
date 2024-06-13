import { reactive, ref } from 'vue';
import { useAxios } from '@/composables/useAxios';
import { defineStore } from 'pinia';
import { useCounterStore } from '@/stores/counter';
import type { IUser } from '@/types/user';

export const useRootStore = defineStore('root', () => {

  const technicalBannerShow = ref(false)
  const counterStore = useCounterStore()
  const user = ref<IUser>()
  const userLoading = ref<boolean>(false)

  const errorsCount = reactive({
    user: 0,
    balance: 0
  })

  async function fetchUser() {
    try {
      user.value = await useAxios<IUser>('/user/')
      if ([23, 21, 22139, 71113, 24, 27, 26, 28, 22, 25, 413606].includes(user.value.id)) {
        technicalBannerShow.value = false
      }
      counterStore.userPoints = user.value.tokens
      if (user.value?.points >= 0) {
        counterStore.count = user.value?.points
      }
    } catch (e) {
      console.log(e)
      errorsCount.user++
      if (errorsCount.user < 3) {
        await fetchUser()
      }
    }
  }

  async function updateUserInfo() {
    try {
      const data = await useAxios<IUser>('/user/')

      if (user.value) {
        user.value.rank = data.rank
        user.value.team = data.team
      }
    } catch (e) {
      console.log(e)
    }
  }

  return {
    fetchUser,
    user,
    updateUserInfo,
    userLoading,
    errorsCount,
    technicalBannerShow
  }
})
