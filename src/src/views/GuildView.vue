<script setup lang="ts">
import AvaButton from '@/components/AvaButton.vue';
import { useRouter } from 'vue-router';
import AvaCard from '@/components/AvaCard.vue';
import { computed, onMounted, ref } from 'vue';
import { useAxios } from '@/composables/useAxios';
import type { ITeam, TeamsResponse } from '@/types/team';
import type { IListItem } from '@/types/props';
import ListItem from '@/components/ListItem.vue';
import { BackButton } from 'vue-tg';
import { useRootStore } from '@/stores/root';
import { useLazyLoading } from '@/composables/useLazyLoading';

const router = useRouter()
const root = useRootStore()
const { pageRef, onScroll, params } = useLazyLoading()

const teamsResponse = ref<TeamsResponse>()
const teamsList = ref<ITeam[]>([])
const loading = ref<boolean>(false)

const teams = computed<IListItem[]>(() => teamsList.value.map((el) => ({
  avatar: el.avatar_path,
  firstName: el.name,
  lastName: '',
  points: el.points,
  id: el.id,
  level: `${el.participants_count} miners`,
  clickable: true
})))

async function getTeams() {
  try {
    loading.value = true
    teamsResponse.value = await useAxios<TeamsResponse>('/team/', {
      params
    })
    teamsList.value.push(...(teamsResponse.value?.data ?? []))
    loading.value = false
  } catch (e) {
    console.log(e)
    loading.value = false
  }
}

function scrollHandle(e: Event) {
  onScroll(e, () => {
    if (teamsResponse.value && teamsResponse.value?.pages_count > params.page) {
      params.page++
      getTeams()
    }
  })
}

onMounted(async () => {
  await getTeams()
})

</script>

<template>
  <BackButton
    @click="router.push('/')"
  />
  <section class="page guild" ref="pageRef" @scroll="scrollHandle">
    <div class="guild__logo">
      <img class="guild__no-icon" src="@/assets/images/guild/disco-ball.png" alt="disko">
    </div>

    <div class="page__title text-center">Join guild</div>
    <div class="guild__text text-center">
      These guilds are actively recruiting players Choose any
    </div>
    <div class="guild__text"></div>

    <AvaCard :loading="loading" min-height="150px">
      <template v-if="teams.length">
        <ListItem
          icon-type="rounded"
          v-for="item of teams"
          :key="item.points"
          :item="item"
          @click="router.push(`/guild/${item?.id}`)"
        />
      </template>
      <div v-else class="text-center">
        {{ loading ? '' : 'No teams' }}
      </div>
    </AvaCard>

    <AvaButton
      v-if="!root.user?.team"
      block
      fixed
      type="warning"
      @click="router.push('/guild/create')"
    >
      Create a new guild
    </AvaButton>
  </section>
</template>

<style scoped lang="scss">
.guild {
  background: url("@/assets/images/guild/guilds-page-bg.png") no-repeat center 200%;
  background-size: 100%;
  &__logo {
    text-align: center;
  }
  &__no-icon {
    height: 168px;
    margin-bottom: 8px;
  }
  &__text {
    margin-bottom: 24px;
    font-size: 16px;
  }
}
</style>