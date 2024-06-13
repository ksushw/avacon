<script setup lang="ts">

import { useRoute, useRouter } from 'vue-router'
import { useTasks } from '@/composables/useTasks'
import ProfileIcon from '@/components/profile/ProfileIcon.vue'
import AvaCard from '@/components/AvaCard.vue'
import TaskItem from '@/components/tasks/TaskItem.vue'
import { onMounted } from 'vue'
import { BackButton } from 'vue-tg'

const router = useRouter()
const route = useRoute()
const { getQuest, quest, loading } = useTasks()

onMounted(async () => {
  await getQuest(Number(route.params.id))
})

</script>

<template>
  <BackButton @click="router.go(-1)" />

  <div class="page" v-if="loading">
    <AvaCard :loading="loading" style="height: 100%" />
  </div>
  <div v-else class="page task-info">
    <div class="page__blue blur-fix"></div>

    <div class="flex justify-center">
      <ProfileIcon size="168px" :image="quest?.image_url" />
    </div>

    <div class="page__title text-center">
      {{ quest?.name }}
    </div>
    <div class="text text-center" v-html="quest?.description">
    </div>

    <AvaCard v-if="quest">
      <div v-if="quest.tasks?.length === 0" class="text-center">
        No tasks
      </div>
      <TaskItem
        v-for="task of quest.tasks"
        :key="task.id"
        :task="task"
      />
    </AvaCard>
  </div>
</template>

<style scoped lang="scss">
.task-info {
  .page__title {
    margin-top: 6px;
    margin-bottom: 16px;
  }
  .text {
    color: #E9E9E9;
    margin-bottom: 23px;
  }
}
</style>