<script setup lang="ts">
import type { ITask } from '@/types/tasks'
import { computed, ref } from 'vue'
import { useAxios } from '@/composables/useAxios'
import { useWebAppNavigation } from 'vue-tg'
import { useRoute } from 'vue-router'

const { task } = defineProps<{
  task: ITask
}>()

const route = useRoute()
const { openLink, openTelegramLink } = useWebAppNavigation()

const loading = ref(false)
const completed = ref(false)

const isTelegram = computed(() => {
  return task.handler_kwargs.external_link.includes('https://t.me')
})

async function clickHandler() {
  await trigger()
  if (isTelegram.value) {
    openTelegramLink(task.handler_kwargs.external_link)
  } else {
    openLink(task.handler_kwargs.external_link)
  }
}

async function trigger() {
  try {
    loading.value = true
    await useAxios<{ status: boolean }>(`/quest/${route.params.id}/${task.id}/check/`, {
      method: 'POST'
    })
    setTimeout(() => {
      loading.value = false
      completed.value = true
    }, 10000)
  } catch (e) {
    loading.value = false
    console.log(e)
  }
}

</script>

<template>
  <div
    :class="['task-item', { disable: !loading && task.is_completed || completed}]"
    @click="clickHandler"
  >
    <div class="icon" :style="{backgroundImage: `url(${task.image_url})`}"></div>
    <div>
      <div class="name">{{ task.name }}</div>
      <div class="text">
        +{{ task.reward }}
        <img style="height: 16px" src="@/assets/images/mini-coin.png" alt="coin" />
      </div>
    </div>
    <div>
      <img v-if="loading" src="@/assets/images/icons/spinner.svg" class="spinner" alt="spinner">
      <img v-else-if="task.is_completed || completed" src="@/assets/images/icons/check-simple.svg" alt="right" />
      <img v-else src="@/assets/images/icons/chevron-right.svg" alt="right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-item {
  display: grid;
  grid-template-columns: 56px auto 12px;
  gap: 12px;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
  &.disable {
    opacity: 0.3;
    pointer-events: none;
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
.spinner {
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>