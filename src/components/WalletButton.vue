<script setup lang="ts">

import { computed } from 'vue';
import { useRootStore } from '@/stores/root'
import { useRouter } from 'vue-router';

const rootStore = useRootStore()
const router = useRouter()

const indicatorColor = computed(() =>
  rootStore.user?.crypto_address ? '#BAFB1A' :"#FF001A"
)

const handleWalletClick = () => {
    router.push({path: '/profile'})
}

</script>

<template>
    <div class="wallet" @click="handleWalletClick">
        <div class="wallet__indicator mr-5"></div>
        <img class="wallet__icon" src="@/assets/images/icons/wallet-icon.png" alt="wallet">
    </div>
</template>

<style scoped lang="scss">
.wallet {
    position: absolute;
    right: -16px;
    top: 130px;
    width: 56px;
    height: 40px;
    box-sizing: border-box;
    padding: 8px;
    padding-left: 12px;
    border-radius: 32px 0 0 32px;
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 20;

    &__indicator {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: v-bind(indicatorColor);
        box-shadow: 0 0 4px v-bind(indicatorColor);
    }

    &.disabled &__icon {
        opacity: 0.5;
    }
  img {
    width: 25px;
  }
}
</style>