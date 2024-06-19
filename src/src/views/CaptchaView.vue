<script setup lang="ts">
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
import { ref } from 'vue'
import { useAxios } from '@/composables/useAxios'
import { useNotificationStore } from '@/stores/notification'
// import { useRootStore } from '@/stores/root'
// import { useRouter } from 'vue-router'
// import { useBoosterStore } from '@/stores/booster'
// import { useInvestStore } from '@/stores/invest'

const noty = useNotificationStore()
// const root = useRootStore()
// const router = useRouter()
// const booster = useBoosterStore()
// const invest = useInvestStore()

const hCaptchaRef = ref()

// async function checkUser() {
//   try {
//     await Promise.all([
//       root.fetchUser(),
//       booster.getAvailableBoosters(),
//       invest.getInvestments()
//     ])
//     const hasBooster = booster.availableBoosters.length
//     const hasInvest = invest.investments.filter(el => el.buyed_at).length
//     if (hasBooster || hasInvest) {
//       window.location.href = "/";
//     } else if (root.user) {
//       const group = getGroup(root.user?.id)
//       await router.push(`/users-limit?image=${group}`)
//     }
//   } catch (e) {
//     console.log(e)
//     window.location.reload()
//   }
// }
//
// function getGroup(id: number) {
//   const groupNumber = Math.floor(id / 50000) + 1;
//   return groupNumber % 4 === 0 ? 4 : groupNumber % 4;
// }

async function verifyCaptcha(token: string) {
  try {
    const data = await useAxios<{status: boolean}>('/captcha/verify/', {
      method: 'POST',
      headers: {
        'H-Captcha-Response': token
      }
    })
    if (data.status) {
      window.location.href = "/";
    } else {
      hCaptchaRef.value?.reset()
    }
  } catch (e: any) {
    console.log(e)
    if (e?.response?.data?.detail) {
      noty.push({
        message: e?.response?.data?.detail,
        type: 'danger'
      })
    }
    hCaptchaRef.value?.reset()
  }
}

</script>

<template>
  <div class="page captcha-view">
    <VueHcaptcha
      ref="hCaptchaRef"
      sitekey="e96a2797-0e05-4093-8711-68a231222bdb"
      @verify="verifyCaptcha"
    />
  </div>
</template>

<style scoped lang="scss">

.captcha-view {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>