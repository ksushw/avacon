import { ref } from 'vue'
import { useAxios } from '@/composables/useAxios'
import { copyToClipboard } from '@/utils/copy'
import { useRootStore } from '@/stores/root'
import { useNotificationStore } from '@/stores/notification'

export const useWallet = () => {
  const root = useRootStore();
  const notificationStore = useNotificationStore();

  const isLoading = ref(false);

  const createWalletAddress = async() => {
    try {
      isLoading.value = true;
      const data = await useAxios('/user/wallet/address/', {
        method: 'POST',
      });
      isLoading.value = false;
      if (data) {
        await root.fetchUser();
      }
    } catch (e){
      console.log(e)
      isLoading.value = false;
    }
  }

  function copy(text: string) {
    copyToClipboard(text)
    notificationStore.push({
      message: 'Copied!',
      type: 'info'
    })
  }

  return {
    copy,
    createWalletAddress,
    isLoading
  }
}