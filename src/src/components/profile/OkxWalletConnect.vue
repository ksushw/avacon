<script setup lang="ts">
import AvaCard from '@/components/AvaCard.vue'
import { computed, ref } from 'vue'
import AvaButton from '@/components/AvaButton.vue'
import { useAxios } from '@/composables/useAxios'
import { useRootStore } from '@/stores/root'
import { useWebAppNavigation } from 'vue-tg'

const { openLink } = useWebAppNavigation()
const root = useRootStore()

const APP_URL = import.meta.env.VITE_APP_URL

const authToken = ref('')

const url = computed(() => {
  const dappUrl = APP_URL + `/okx?token=${authToken.value}`
  const encodedDappUrl = encodeURIComponent(dappUrl);
  const deepLink = "okx://wallet/dapp/url?dappUrl=" + encodedDappUrl;
  return "https://www.okx.com/download?deeplink=" + encodeURIComponent(deepLink);
})

async function connect() {
  openLink(url.value)
}

getToken()
async function getToken() {
  try {
    const { token } = await useAxios<{ token: string }>(`/user/crypto/address/1/token/`, {})
    authToken.value = token
  } catch (e) {
    console.log(e)
  }
}

async function disconnect() {
  await useAxios('/user/crypto/address/', { method: 'DELETE', data: { address: '' } })
  root.fetchUser()
}
const getSliceAddress = (address: string) => {
  return `${address.slice(0,6)}...${address.slice(-6)}`
}

</script>

<template>
  <AvaCard class="mb-24 mt-24" bg-color="linear-gradient(245.31deg, rgba(255, 255, 255, 0.8) 37.88%, rgba(255, 255, 255, 0.48) 118.16%);">
    <div class="flex gap-12 mb-12">
      <div>
        <img src="@/assets/images/profile/okx.png" alt="qwe">
      </div>
      <div style="text-align: left">
        <div class="black-color text-20 fw-600">OKX cryptocyrrency</div>
        <div v-if="root.user?.crypto_address_1" class="flex mt-4 gap-6 grey-color">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 9.41176L5.87097 14L14 2" stroke="#00CB39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Connected successfully
        </div>

        <div v-else class="flex mt-4 gap-6 grey-color">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.33875 4.57515C5.12721 4.36362 4.78425 4.36362 4.57271 4.57515C4.36118 4.78669 4.36118 5.12965 4.57271 5.34119L9.23156 10L4.65643 14.5752C4.4449 14.7867 4.4449 15.1297 4.65643 15.3412C4.86797 15.5527 5.21093 15.5527 5.42246 15.3412L9.99759 10.7661L14.5727 15.3412C14.7842 15.5527 15.1272 15.5527 15.3387 15.3412C15.5503 15.1297 15.5503 14.7867 15.3387 14.5752L10.7636 10L15.4225 5.34119C15.634 5.12965 15.634 4.78669 15.4225 4.57515C15.2109 4.36362 14.868 4.36362 14.6564 4.57515L9.99759 9.234L5.33875 4.57515Z" fill="#FF0000" stroke="#E50000" stroke-width="1.7" stroke-linecap="round"/>
          </svg>
          You didn't connect wallet
        </div>
      </div>
    </div>


    <div v-if="root.user?.crypto_address_1" class="address">
      {{ getSliceAddress(root.user?.crypto_address_1) }}
      <span style="color: #007AFF" @click="disconnect()">Disconnect</span>
    </div>

    <AvaButton
      v-else
      block
      vibrationType="success"
      @click="connect"
      type="info"
    >
      Connect wallet
    </AvaButton>
  </AvaCard>
</template>

<style scoped lang="scss">
.address {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 8px 12px;
  color: #626262;
  word-wrap: break-word;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fw-600 {
  font-weight: 600;
}
</style>