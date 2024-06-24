<script setup lang="ts">

import AvaButton from '@/components/AvaButton.vue'
import { ref } from 'vue'
import AvaCard from '@/components/AvaCard.vue'
import { useRoute } from 'vue-router'
import { useAxios } from '@/composables/useAxios'
import { useNotificationStore } from '@/stores/notification'

declare global {
  interface Window {
    okxwallet?: any;
  }
}

const route = useRoute()
const noty = useNotificationStore()

const address = ref('')

console.log(route.query.token)

async function connect() {
  try {
    const res = await window.okxwallet.request({ method: 'eth_requestAccounts' });
    address.value = res[0]
    await useAxios('/user/crypto/address/', {
      method: 'POST',
      data: { address: address.value }
    }, route.query?.token as string)

    noty.push({
      message: 'Address added',
      type: 'info'
    })
  } catch (e) {
    console.log(e)
    noty.push({
      message: JSON.stringify(e),
      type: 'danger'
    })
  }
}

</script>

<template>
  <div class="page flex align-center">

    <AvaCard bg-color="#FFFFFF" class="w-100">
      <div class="text-center mb-12">
        <img src="@/assets/images/profile/okx-connect.png" alt="okx">
      </div>

      <pre class="black-color">
        {{ route.query?.token }}
      </pre>

      <div class="text-center black-color fw-500 mb-16">
        Authorize the third party for the following services
      </div>

      <div v-if="!address" class="terms">
        <div>
          <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.82094 11.1226C9.55094 11.4126 9.09094 11.4226 8.81094 11.1426L6.43589 8.75633C6.18589 8.50633 6.18589 8.08633 6.43589 7.83633C6.68589 7.58633 7.10589 7.58633 7.35589 7.83633L9.29094 9.78259L12.5277 6.27612C12.7677 6.00612 13.1877 5.99612 13.4477 6.23612C13.7077 6.47612 13.7277 6.88612 13.4877 7.15612L9.82094 11.1226Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.65 0.349609C15.3069 0.349609 16.65 1.69276 16.65 3.34961V13.3496C16.65 15.0065 15.3069 16.3496 13.65 16.3496H5.65C3.99314 16.3496 2.65 15.0065 2.65 13.3496V3.34961C2.65 1.69276 3.99314 0.349609 5.65 0.349609H13.65ZM5.65 1.64961H13.65C14.5889 1.64961 15.35 2.41073 15.35 3.34961V13.3496C15.35 14.2885 14.5889 15.0496 13.65 15.0496H5.65C4.71112 15.0496 3.95 14.2885 3.95 13.3496V3.34961C3.95 2.41073 4.71112 1.64961 5.65 1.64961Z" fill="black"/>
            <path d="M0 6.34961C0 5.99062 0.291014 5.69961 0.65 5.69961C1.00898 5.69961 1.3 5.99062 1.3 6.34961V15.7496C1.3 16.8266 2.17304 17.6996 3.25 17.6996H11.65C12.009 17.6996 12.3 17.9906 12.3 18.3496C12.3 18.7086 12.009 18.9996 11.65 18.9996H3.25C1.45507 18.9996 0 17.5445 0 15.7496V6.34961Z" fill="black"/>
          </svg>
        </div>
        <div>
          <div class="black-color text-16 fw-600">Read only</div>
          <div class="grey-color fw-500 mt-8">
            View your asset details such as balance, bills and portfolios
          </div>
        </div>

        <div class="flex align-center">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 8.1C2.5 6.57206 2.50617 5.92667 2.6713 5.41844C3.01751 4.35291 3.85291 3.51751 4.91844 3.1713C5.42667 3.00617 6.07206 3 7.6 3H16.4C17.9279 3 18.5733 3.00617 19.0816 3.1713C20.1471 3.51751 20.9825 4.35291 21.3287 5.41844C21.4938 5.92667 21.5 6.57206 21.5 8.1V16.9C21.5 18.4279 21.4938 19.0733 21.3287 19.5816C20.9825 20.6471 20.1471 21.4825 19.0816 21.8287C18.5733 21.9938 17.9279 22 16.4 22H7.6C6.07206 22 5.42667 21.9938 4.91844 21.8287C3.85291 21.4825 3.01751 20.6471 2.6713 19.5816C2.50617 19.0733 2.5 18.4279 2.5 16.9V8.1Z" fill="#E5E7EB" stroke="#C4C4C4"/>
            <path d="M18.8393 9.7556C19.1647 9.43016 19.1647 8.90252 18.8393 8.57709C18.5138 8.25165 17.9862 8.25165 17.6607 8.57709L10.75 15.4878L7.17259 11.9104C6.84715 11.585 6.31951 11.585 5.99408 11.9104C5.66864 12.2359 5.66864 12.7635 5.99408 13.0889L10.1607 17.2556C10.4862 17.581 11.0138 17.581 11.3393 17.2556L18.8393 9.7556Z" fill="#C4C4C4"/>
          </svg>
        </div>
      </div>

      <AvaButton v-if="!address" block type="info" @click="connect">
        Connect
      </AvaButton>

      <div v-else class="flex align-center gap-5 black-color justify-center mt-30">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 9.41176L5.87097 14L14 2" stroke="#00CB39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        Connected successfully
      </div>
    </AvaCard>

  </div>
</template>

<style scoped lang="scss">
.terms {
  border: 1px solid #C4C4C4;
  border-radius: 8px;
  margin-bottom: 56px;
  padding: 12px;
  display: flex;
  gap: 8px;
}
</style>