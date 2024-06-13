<script setup lang="ts">

import AvaInput from '@/components/form/AvaInput.vue'
import AvaCard from '@/components/AvaCard.vue'
import AvaButton from '@/components/AvaButton.vue'
import { ref } from 'vue'
import { useNotificationStore } from '@/stores/notification'
import { useAxios } from '@/composables/useAxios'
import type { ErrorResponse } from '@/types/user';
import { useRootStore } from '@/stores/root'

const noty = useNotificationStore()
const root = useRootStore()

const email = ref<string | null>(null)
const EMAIL_REGEXP = /yandex.ru|mail.ru|inbox.ru|yahoo.com|outlook.com|protonmail.com|protonmail.ch|icloud.com/;

const checkEmail = () => {
  if (!(EMAIL_REGEXP.test(email.value ?? ''))){
    throw ('The following email domains are allowed: "yandex.ru", "mail.ru", "inbox.ru", ' +
        '"yahoo.com", "outlook.com", "protonmail.com","protonmail.ch", "icloud.com"')
  }
}

async function sendCode() {
  try {
    if (!email.value) {
      noty.push({
        message: 'Enter your e-mail',
        type: 'danger'
      })
      return
    }
    checkEmail();
    await useAxios('/verification/mail/send/', {
      method: 'POST',
      data: { email: email.value.trim() }
    })
    await root.fetchUser()
    noty.push({
      message: 'Success',
      type: 'info'
    })
  } catch (e: any) {
    const message = (e as unknown as ErrorResponse)?.response?.data?.detail;
    if(message && typeof message === 'string') {
      noty.push({
        message,
        type: 'danger'
      })
      return
    }

    if (e?.response?.status === 400) {
      noty.push({
        message: 'This email has already been registered or the email format has been entered incorrectly.',
        type: 'danger'
      })
      return
    }

    if (typeof e === 'string'){
      noty.push({
        message: e,
        type: 'danger'
      })
    } else {
      noty.push({
        message: 'Server error',
        type: 'danger'
      })
    }
    console.log(e)
  }
}

</script>

<template>
  <AvaCard>
    <AvaInput
      placeholder="Enter your e-mail"
      v-model="email"
      type="text"
      label="E-mail"
    />

    <AvaButton
      block
      type="primary"
      :disabled="!email"
      @click="sendCode"
    >
      Save
    </AvaButton>
  </AvaCard>
</template>

<style scoped lang="scss">
.code {
  position: relative;
  &__send {
    position: absolute;
    color: #007AFF;
    font-size: 16px;
    font-weight: 500;
    bottom: 14px;
    right: 15px;
    &.disabled {
      color: #8E8E8E;
    }
  }
}
</style>