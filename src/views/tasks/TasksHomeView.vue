<script setup lang="ts">
import { BackButton } from 'vue-tg'
import { useRouter } from 'vue-router'
import AvaCard from '@/components/AvaCard.vue'
import { useTasks } from '@/composables/useTasks'
import moment from 'moment'
import type { IQuest } from '@/types/tasks'
import { onMounted } from 'vue';
import { useWebAppHapticFeedback } from 'vue-tg'
import AvaLink from '@/components/AvaLink.vue';

const router = useRouter()

const { quests, getQuests, loading } = useTasks()

const hapticFeedback = useWebAppHapticFeedback()

getQuests()

const vibrate = () => {
  hapticFeedback.notificationOccurred('success')
}

const isNew = (quest: IQuest) => {
  if (quest.begin_at) {
    const today = moment()
    const begin = moment(quest.begin_at)

    const diff = today.diff(begin, 'days')
    return diff <= 3
  }
  return false
}

const isDev = import.meta.env?.VITE_USER_NODE_ENV === 'development'

onMounted(() => {
  // @ts-ignore
  ;(adsbyslise=window.adsbyslise||[]).push({slot:"leaderboard"});window.adsbyslisesync&&window.adsbyslisesync();
})
</script>

<template>
  <BackButton @click="router.push('/')" />

  <div class="page tasks">
    <div class="page__orange blur-fix"></div>
    <div class="text-center">
      <img src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/tasks/tasks-bear.png" alt="bear">
    </div>

    <div class="page__title text-center">
      Earn more AvaCoin
    </div>
    <div class="tasks__text text-center">
      Complete tasks and get more AvaCoin tokens
    </div>

    <div v-if="isDev">
      <div class="adsbyslise-desk">
        <ins
            class="adsbyslise"
            style="display:inline-block;width:728px;height:90px"
            data-ad-slot="leaderboard"
            data-ad-pub="pub-38"
            data-ad-format="728x90"
        ></ins>
      </div>
    </div>

    <router-link v-else to="/tasks/partnership" class="partnership-link">
      <div class="image flex align-center">
        <img
          style="height: 45px"
          src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/tasks/tasks-mini-bear.png"
          alt="apps"
          class="ml-12"
        >
      </div>

      <div>
        <div class="fw-500">Want partnership?</div>
        <div class="text-12 mt-4">You can connect with us right now</div>
      </div>

      <div>
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L1 9" stroke="white" stroke-width="1.5"/>
        </svg>
      </div>

      <img class="star3" src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/icons/whie-star.svg" alt="star">
    </router-link>

    <div v-if="isDev" class="partnership-block">
      <div>Want partnership?</div>
      <AvaLink text="Connect us" link="/tasks/partnership"/>
    </div>

    <AvaCard :loading="loading">
      <div
        v-for="(quest, i) of quests"
        :key="i"
        class="task-item"
        @click="() => { vibrate(); router.push(`/tasks/${quest.id}`)}"
        
      >
        <div class="icon" :style="`background-image: url(${quest.image_url})`"></div>
        <div>
          <div class="name">{{ quest.name }}</div>
          <div class="text">
            <div class="text-ellipsis" style="max-width: 190px;">
              {{ quest.short_description }}
            </div>
            <img style="height: 16px" src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/mini-coin.png" alt="coin" />
          </div>
          <div class="new-quest" v-if="isNew(quest)">NEW TASK</div>
        </div>
        <div>
          <img src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/icons/chevron-right.svg" alt="right" />
        </div>
      </div>

      <div  class="task-item">
        <div class="icon" :style="{backgroundImage: `url(/temp/task4.png)`}"></div>
        <div>
          <div class="name">More tasks soon, be patient</div>
        </div>
        <div>
        </div>
      </div>
    </AvaCard>
  </div>
</template>

<style scoped lang="scss">
.adsbyslise-desk {
  max-width: 100%;

  ins {
    width: calc(100vw - 32px) !important;
  }

  &:deep(iframe){
    width: calc(100vw - 32px);
  }
}

.partnership-block {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.partnership-link {
  height: 52px;
  width: 100%;
  border-radius: 24px;
  background: linear-gradient(88.54deg, #0A7CFD 25.49%, #61AEAE 116.74%);
  display: grid;
  align-items: center;
  margin-bottom: 22px;
  grid-template-columns: 52px auto 30px;
  gap: 25px;
  position: relative;
  text-decoration: none;
  color: #ffffff;
  .image {
    width: 52px;
    height: 52px;
    position:relative;
  }
  .star3 {
    position: absolute;
    top: -15px;
    right: -10px;
  }
}
.tasks {
  .new-quest {
    font-size: 10px;
    border-radius: 4px;
    background-color: #D92020;
    margin-top: 2px;
    display: inline;
    padding: 2px 4px;
  }
  .task-item {
    display: grid;
    grid-template-columns: 56px auto 12px;
    gap: 12px;
    align-items: center;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    .text {
      font-size: 12px;
      line-height: 15px;
      margin-top: 3px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .name {
      font-size: 14px;
      font-weight: 500;
      line-height: 17px;
    }
    .icon {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      width: 56px;
      min-width: 56px;
      height: 56px;
      background-size: cover;
      background-position: center;
    }
  }
  .page__title {
    font-size: 32px;
    font-weight: 700;
    margin-top: 8px;
    margin-bottom: 16px;
  }
  &__text {
    margin-bottom: 25px;
  }
}
</style>