<script setup lang="ts">

import AvaCard from '@/components/AvaCard.vue';
import ListItem from '@/components/ListItem.vue';
import { computed } from 'vue';
import type { TeamParticipants } from '@/types/team';

const props = defineProps<{
  response: TeamParticipants[]
  loading: boolean
}>()

const members = computed(() => {
  return props.response.map((e) => ({
    avatar: e.avatar_path,
    firstName: e.first_name,
    lastName: e.last_name,
    points: e.points,
    level: e.rank?.name ?? ''
  }))
})

</script>

<template>
  <AvaCard class="members" :loading="loading" min-height="150px">
    <template v-if="members.length">
      <ListItem
        v-for="item of members"
        :key="item.points"
        :item="item"
      />
    </template>
    <div v-else class="text-center">
      {{ loading ? '' : 'No members' }}
    </div>
  </AvaCard>
</template>

<style scoped lang="scss">
.members {
  margin-top: 16px;
}
</style>