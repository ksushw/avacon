<script setup lang="ts">

import AvaInput from '@/components/form/AvaInput.vue'
import { reactive, ref } from 'vue'
import AvaButton from '@/components/AvaButton.vue'
import { useAxios } from '@/composables/useAxios'
import { useNotificationStore } from '@/stores/notification'
import { BackButton } from 'vue-tg'
import { useRouter } from 'vue-router'

const noty = useNotificationStore()
const router = useRouter()

const form = reactive({
  url: '',
  description: ''
})
const loading = ref(false)

async function save() {
  try {
    loading.value = true
    await useAxios('/apps/proposal/', {
      method: 'POST',
      params: { type: 'app' },
      data: form
    })
    noty.push({
      type: 'info',
      message: 'Request sent'
    })
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <BackButton @click="router.go(-1)" />

  <div class="page partnership">
    <div class="page__title text-center mb-12 black-color">
      Partnership request
    </div>
    <div class="text-center grey-color mb-16">
      Do you have your own application and want to reach a new audience? You have a unique chance - just write to us
    </div>

    <div class="text-center mb-24">
      <img style="height: 168px" src="@/assets/images/apps/banner.png" alt="banner">
    </div>

    <div class="form">
      <AvaInput
        v-model="form.url"
        type="text"
        hint="Enter your project link in telegram"
        placeholder="@tglink"
        bordered
      />

      <AvaInput
        v-model="form.description"
        type="textarea"
        hint="Some details about your project"
        placeholder="Description (optional)"
        bordered
      />
    </div>

    <AvaButton
      block
      fixed
      :disabled="!form.url"
      :loading="loading"
      vibrationType="success"
      @click="save"
    >
      Send
    </AvaButton>
  </div>
</template>

<style scoped lang="scss">
.partnership {
  background: url(https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/apps/partnership-bg.png) no-repeat center;
  background-size: cover;
}
</style>
