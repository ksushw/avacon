<script setup lang="ts">
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import AvaCard from '@/components/AvaCard.vue'
import { TonConnectUI } from '@tonconnect/ui'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AvaButton from '@/components/AvaButton.vue'
import { useAxios } from '@/composables/useAxios'
import { useNotificationStore } from '@/stores/notification'
import { useRootStore } from '@/stores/root'

const noty = useNotificationStore()
const root = useRootStore()

const tonConnectUI = ref<TonConnectUI>()


const address = ref('')

function initTonConnection() {
  try {
    tonConnectUI.value = new TonConnectUI({
      manifestUrl: 'https://avacoin.elastoo.com/tonconnect-manifest.json',
      // buttonRootId: 'root-id'
    });

    tonConnectUI.value.onSingleWalletModalStateChange(() => {
      const rawAddress = tonConnectUI.value?.account?.address;
      if (rawAddress) {
        address.value = toUserFriendlyAddress(rawAddress);
        sendAddress(address.value);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

async function sendAddress(address: string) {
  try {
    if (root.user?.crypto_address) return
    await useAxios('/user/crypto/address/', {
      method: 'POST',
      data: { address }
    })
    root.fetchUser()
    noty.push({
      message: 'Address added',
      type: 'info'
    })
  } catch (e) {
    console.log(e)
  }
}

async function connect() {
  if (!tonConnectUI.value?.connected) {
    await tonConnectUI.value?.openModal()
  }
}

async function disconnect() {
  if (tonConnectUI.value?.connected) {
    await tonConnectUI.value?.disconnect()
  }
  await useAxios('/user/crypto/address/', { method: 'DELETE', data: { address: '' } })
  root.fetchUser()
}
const getSliceAddress = (address: string) => {
  return `${address.slice(0,6)}...${address.slice(-6)}`
}

onMounted(() => {
  function safeDecorator(fn: any) {
    return function(...args: any[]) {
      try {
        // @ts-ignore
        return fn.apply(this, args);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.message.includes('has already been used with this registry')
        ) {
          return false;
        }
        throw error;
      }
    };
  }

  customElements.define = safeDecorator(customElements.define);
  initTonConnection()
})

onBeforeUnmount(() => {

})
</script>

<template>
  <AvaCard class="mb-24 mt-24" bg-color="linear-gradient(245.31deg, rgba(255, 255, 255, 0.8) 37.88%, rgba(255, 255, 255, 0.48) 118.16%);">
    <div class="flex gap-12 mb-12">
      <div>
        <img src="@/assets/images/profile/wallet-img.png" alt="qwe">
      </div>
      <div style="text-align: left">
        <div class="black-color text-20 fw-600">AVACOIN NEXT STAGE</div>
        <div class="grey-color">
          The listing of AVACOIN is coming very soon.
          Connect your wallet and get ready for the airdrop and exciting activities!
        </div>
      </div>
    </div>

    <div id="button-id"></div>

    <div v-if="root.user?.crypto_address" class="address">
      {{ getSliceAddress(root.user?.crypto_address) }}
      <span style="color: #007AFF" @click="disconnect()">Disconnect</span>
    </div>

    <AvaButton v-else block vibrationType="success" @click="connect">
      Connect TON wallet
    </AvaButton>
    <div id="root-id"></div>

    <div v-if="root.user?.crypto_address" class="flex mt-13 gap-6 grey-color">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 9.41176L5.87097 14L14 2" stroke="#00CB39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Wallet connected successfully
    </div>

    <div v-else class="flex mt-13 gap-6 grey-color">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.33875 4.57515C5.12721 4.36362 4.78425 4.36362 4.57271 4.57515C4.36118 4.78669 4.36118 5.12965 4.57271 5.34119L9.23156 10L4.65643 14.5752C4.4449 14.7867 4.4449 15.1297 4.65643 15.3412C4.86797 15.5527 5.21093 15.5527 5.42246 15.3412L9.99759 10.7661L14.5727 15.3412C14.7842 15.5527 15.1272 15.5527 15.3387 15.3412C15.5503 15.1297 15.5503 14.7867 15.3387 14.5752L10.7636 10L15.4225 5.34119C15.634 5.12965 15.634 4.78669 15.4225 4.57515C15.2109 4.36362 14.868 4.36362 14.6564 4.57515L9.99759 9.234L5.33875 4.57515Z" fill="#FF0000" stroke="#E50000" stroke-width="1.7" stroke-linecap="round"/>
      </svg>
      You didn't connect wallet
    </div>
  </AvaCard>
</template>

<style scoped lang="scss">
.address {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 8px 12px;
  color: #626262;
  text-wrap: normal;
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