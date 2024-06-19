<script setup lang="ts">

import { useAxios } from '@/composables/useAxios';
import type { ITeam } from '@/types/team';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRootStore } from '@/stores/root';
import AvaButton from '@/components/AvaButton.vue';
import { BackButton } from 'vue-tg';

const team = ref<ITeam>()
const route = useRoute()
const router = useRouter()
const root = useRootStore()

async function getTeam() {
  try {
    team.value = await useAxios<ITeam>(`/team/${route.params?.id}`)
  } catch (e) {
    console.log(e)
  }
}

async function join() {
  try {
    await useAxios(`/team/${team.value?.id}/join/`, { method: 'POST' })
    await root.fetchUser()
    await router.push(`/guild/${team.value?.id}`)
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  getTeam()
})
</script>

<template>
  <BackButton
    @click="router.go(-1)"
  />
  <section v-if="team" class="page join">
    <div class="join__bg blur-fix"></div>
    <div class="join__images">
      <div class="join__team-icon" :style="`background-image: url(${team.avatar_path})`"></div>
      <div class="join__user-icon" :style="`background-image: url(${root.user?.avatar_path})`"></div>
    </div>
    <div class="page__title text-center">
      Join a {{ team.name }} team guild
    </div>

    <div class="join__text text-center">
      <p>Each click on a coin increases the guild's score in team competitions.</p>
      <p>Information about the participants is available on the guild page.</p>
      <p>More fan play together.</p>
    </div>

    <AvaButton block fixed type="primary" @click="join">
      Join a guild
    </AvaButton>
  </section>
</template>

<style scoped lang="scss">
.join {
  &__bg {
    border-radius: 805px;
    filter: blur(60px);
    height: 400px;
    transform: rotate(180deg);
    background: linear-gradient(3.93deg, #522AB7 51.59%, #FFFFFF 58.25%, #FFFDD6 75.68%);
    position: fixed;
    width: 100%;
    left: 0;
    bottom: -200px;
    z-index: 0;
  }
  &__images {
    margin-top: 80px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  &__team-icon {
    width: 100px;
    height: 100px;
    border-radius: 24px;
    background-position: center;
    background-size: cover;
    background-color: var(--body-background);
    position: relative;
    right: -15px;
  }
  &__user-icon {
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    background-position: center;
    background-size: cover;
    background-color: var(--body-background);
    border: 4px solid var(--body-background);
    position: relative;
    left: -15px;
  }
  &__text {
    font-size: 14px;
    line-height: 17px;
    color: #BEBEBE;
  }
}
</style>