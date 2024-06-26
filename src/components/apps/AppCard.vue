<script setup lang="ts">

import type { IApp } from '@/types/apps'
import { formatNumber } from '@/utils/formatNumber'
import { useWebAppNavigation } from 'vue-tg'
import { computed } from 'vue'
import { useAxios } from '@/composables/useAxios';

const { app } = defineProps<{
  app: IApp
  full?: boolean
}>()

const { openLink, openTelegramLink } = useWebAppNavigation()

const isTelegram = computed(() => {
  return app.url.includes('https://t.me')
})

async function clickHandler() {
  await  useAxios(`/apps/visit/${app.id}/`, {
    method: 'POST',
  })
  if (isTelegram.value) {
    openTelegramLink(app.url)
  } else {
    openLink(app.url)
  }
}

</script>

<template>
 <div :class="['app-card', {full}]" @click="clickHandler">
   <span v-if="app.is_ad" class="glare"></span>
   <div class="arrow">
     <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M1 1.48975L5 5.48975L1 9.48975" stroke="white" stroke-width="1.5"/>
     </svg>
   </div>
   <div class="image" :style="{ backgroundImage: `url(${app.image_url})` }">
<!--     <div v-if="app.is_verified" class="verified">-->
<!--       <VerificationIcon />-->
<!--     </div>-->
   </div>

   <div class="content">
      <div class="content__header">
        <div class="name">{{ app.name }}</div>
        <div v-if="app.is_ad" class="top-app">
          <img src="@/assets/images/icons/fire.svg" alt="fire">
          TOP APP
        </div>
      </div>

     <div class="top light-color text-12">
       <div>
        Total users
         <div class="white-color text-14 mt-4">
           {{ formatNumber(app.gamers_count) }}
         </div>
       </div>

       <div v-for="soc of app.socials.slice(0, 2)" :key="soc.type">
         <img class="social-img" v-if="soc.type === 'twitter'" src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/social/twitterBlack.svg" alt="twitter">
         <img class="social-img" v-if="soc.type === 'telegram'" src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/social/telegramBlack.svg" alt="telegram">
         <span v-if="soc.type === 'twitter'">X</span>
         <span v-if="soc.type === 'telegram'">TG</span>
         users
         <div class="white-color text-14 mt-4">
           {{ formatNumber(soc.subscribers_count) }}
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<style scoped lang="scss">
.app-card {
  display: grid;
  position: relative;
  grid-template-columns: 56px auto;
  align-items: start;
  column-gap: 16px;
  background-color: #D9D9D933;
  padding: 12px;
  border-radius: 24px;
  text-align: left;
  min-height: 100px;
  box-sizing: border-box;
  overflow: hidden;

  &.full {
    width: 100%;
    box-sizing: border-box;
  }
  .light-color {
    color: rgba(255, 255, 255, .5);
  }
  .arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .white-color {
    color: #ffffff;
  }
  .mt-4 {
    margin-top: 4px;
  }
  .image {
    width: 56px;
    height: 56px;
    background-position: center;
    background-size: cover;
    border-radius: 12px;
    position: relative;
    .verified {
      position: absolute;
      top: -10px;
      right: -10px;
    }
  }
  .content {
    padding-right: 20px;

    &__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    .top {
      gap: 12px;
      display: grid;
      grid-template-columns: repeat(3, auto);
      .mb-4 {
        margin-bottom: 4px;
      }
    }
    .name {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .top-app {
      font-size: 10px;
      font-weight: 600;
      display: flex;
      align-items: center;
      column-gap: 5px;
      background: #D92020;
      border-radius: 17px;
      padding: 5px;
    }
  }
  .social-img {
    width: 16px;
    padding-right: 5px;
  }
}

.glare {
  position: absolute;
  top: 0;
  height: 100%;
  width: 150px;
  transform: skewX(-45deg);
  left: -150%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.4));
  animation: flareAnimation 3s infinite linear;
}

@keyframes flareAnimation {
  0% {
    left: -150%;
  }
  100% {
    left: 150%;
  }
}
</style>