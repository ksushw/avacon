<script setup lang="ts">
import AvaCard from '@/components/AvaCard.vue'
import { onMounted, reactive, ref } from 'vue';
import type { ITeam, TeamParticipants } from '@/types/team';
import { useAxios } from '@/composables/useAxios';
import { useRoute, useRouter } from 'vue-router';
import AvaButton from '@/components/AvaButton.vue';
import { useRootStore } from '@/stores/root';
import InviteButton from '@/components/frens/InviteButton.vue';
import { BackButton, Popup } from 'vue-tg'
import TeamMembers from '@/components/guild/TeamMembers.vue';
import { useNotificationStore } from '@/stores/notification';
import { useLazyLoading } from '@/composables/useLazyLoading';
import type { TeamsParticipantsResponse } from '@/types/team';

const team = ref<ITeam>()
const route = useRoute()
const router = useRouter()
const root = useRootStore()
const noty = useNotificationStore()
const { pageRef, onScroll } = useLazyLoading()

const leaveModal = ref(false)
const response = ref<TeamsParticipantsResponse>()
const members = ref<TeamParticipants[]>([])
const loading = ref<boolean>(false)
const params = reactive({
  per_page: 15,
  page: 1
})

const buttons = [
  {
    id: 'cancel',
    type: 'cancel',
  },
  {
    id: 'leave',
    text: 'Leave'
  }
]

async function getTeam() {
  try {
    team.value = await useAxios<ITeam>(`/team/${route.params?.id}/`)
  } catch (e) {
    console.log(e)
  }
}

async function getParticipants() {
  try {
    loading.value = true
    response.value = await useAxios(`/team/${route.params?.id}/participants/`, {
      params
    })
    members.value.push(...(response.value?.data ?? []))
    loading.value = false
  } catch (e) {
    console.log(e)
    loading.value = false
  }
}

async function handlePopupClose(id: string) {
  leaveModal.value = false
  if (id === 'leave') {
    try {
      await useAxios(`/team/exit/`, {
        method: 'POST'
      })
      await root.fetchUser()
      router.push('/guild')
    } catch (e) {
      const detail = (e as any)?.response?.data?.detail;
      if (detail) {
        noty.push({
          message: detail,
          type: 'danger'
        });
      }
      console.log(e)
    }
  }
}

function scrollHandle(e: Event) {
  onScroll(e, () => {
    if (response.value && response.value.pages_count > params.page) {
      params.page++
      getParticipants()
    }
  })
}

onMounted(() => {
  Promise.all([
    getTeam(),
    getParticipants()
  ])
})

</script>

<template>
  <BackButton @click="router.go(-1)" />
  <section v-if="team" class="page team" ref="pageRef" @scroll="scrollHandle">
    <div v-if="team.avatar_path" class="team__logo" :style="`background-image: url(${team.avatar_path})`"></div>
    <div v-else class="team__initials">{{ team.name.slice(0, 1) }}</div>
    <div class="page__title text-center">{{ team.name }}</div>
    <div
      v-if="root.user?.owned_team?.id === team.id"
      class="team__edit"
      @click="router.push('/guild/create')"
    >
      Edit
    </div>

    <div v-if="team.description" class="team__text">
      {{ team.description }}
    </div>

    <AvaCard>
      <div class="team__grid">
        <div>
          <div>
            <img src="@/assets/images/mini-coin.png" alt="coin">
            {{ team.points?.toLocaleString('en-EN') ?? 0 }}
          </div>
          <span>total gold</span>
        </div>
        <div>
          <div> {{ team.participants_count }} </div>
          <span>miners</span>
        </div>
      </div>

      <div v-if="!root.user?.team || root.user?.team?.id === team.id" class="team__actions">
        <AvaButton
          v-if="!root.user?.team"
          block
          type="primary"
          @click="router.push(`/guild/join/${team.id}`)"
        >Join a guild</AvaButton>
        <template v-if="root.user?.team?.id === team.id">
          <InviteButton type="primary" />
          <AvaButton block type="info" @click="leaveModal = true">Leave the guild</AvaButton>
        </template>
      </div>
    </AvaCard>

    <TeamMembers :response="members" :loading="loading" />

    <Popup
      v-if="leaveModal"
      title="Are you sure?"
      :message="`You leave the ${team.name}.`"
      :buttons="buttons"
      @close="handlePopupClose"
    />
  </section>
</template>

<style scoped lang="scss">
.team {
  background: url("@/assets/images/guild/guild-info-bg.png") no-repeat center 200%;
  background-size: 100%;
  &__actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
  }
  &__edit {
    position: absolute;
    top: 24px;
    right: var(--page-horizontal-offset);
    font-size: 14px;
    background: rgba(0, 0, 0, 0.2);
    padding: 4px 8px;
    border-radius: 4px;
  }
  &__logo {
    width: 100px;
    height: 100px;
    border-radius: 24px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin: 0 auto 24px;
  }
  &__initials {
    width: 100px;
    height: 100px;
    border-radius: 24px;
    margin: 0 auto 24px;
    display: grid;
    place-items: center;
    background: #BB96DF;
    font-size: 38px;
    font-weight: 500;
  }
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 24px;
    font-weight: 500;
    &>div {
      text-align: center;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      div {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      &:nth-child(1)::after {
        content: '';
        border-right: 1px solid #ffffff;
        opacity: 0.5;
        height: 36px;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -18px;
      }
    }
    img {
      height: 24px;
      margin-right: 4px;
    }
    span {
      color: #A8A8A8;
      font-size: 16px;
    }
  }
  &__text {
    font-size: 16px;
    color: #F1F1F1;
    text-align: center;
    margin-bottom: 24px;
  }
}
</style>