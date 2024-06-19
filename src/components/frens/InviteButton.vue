<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification'
import { useRootStore } from '@/stores/root'
import { copyToClipboard } from '@/utils/copy'
import type { ButtonType } from '@/types/props'
import AvaButton from '@/components/AvaButton.vue'

const notificationStore = useNotificationStore()
const root = useRootStore()

defineProps<{
  type: ButtonType
  fixed?: boolean
}>()

function copy() {
  copyToClipboard(
    `Invite your friends and get bonuses for each invited friend! 🎁 \n\n Your referral link: ${root.user?.referral_url}`
  )
  notificationStore.push({
    message: 'The invitation has been copied!',
    type: 'info'
  })
}
</script>

<template>
  <section>
    <AvaButton block :fixed="fixed" :type="type" vibrationType="success" @click="copy">
      Invite a fren
    </AvaButton>
  </section>
</template>
