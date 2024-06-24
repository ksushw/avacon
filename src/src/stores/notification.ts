import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { NotifyItem } from '@/types/props';

export const useNotificationStore = defineStore('notification', () => {
  const message = ref<NotifyItem | null>(null)
  const timeoutId = ref()

  function push(item: NotifyItem) {
    message.value = {
      ...item,
      date: Date.now()
    }

    if (timeoutId.value) clearTimeout(timeoutId.value)

    timeoutId.value = setTimeout(() => {
      message.value = null
    }, 3000)
  }

  return {
    message,
    push
  }
})