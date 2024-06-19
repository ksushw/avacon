<script setup lang="ts">
import { useRootStore } from '@/stores/root';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const root = useRootStore()
const router = useRouter()

const team = computed(() => root.user?.team)

function getRatingPosition(position: number) {
  if (position === 1) {
    return 1
  } else if (position <= 3) {
    return 3
  } else if (position <= 10) {
    return 10
  } else if (position <= 100) {
    return 100
  } else if (position <= 1000) {
    return 1000
  }
}

</script>

<template>
  <div v-if="root.userLoading" class="current-league--loading">

  </div>
  <div v-else-if="team" class="current-league"  @click="router.push(`/guild/${team.id}`)">
    <div class="current-league__icon" :style="`background-image: url(${team.avatar_path})`"></div>
    <div class="current-league__info">
      <div class="current-league__name">{{ team.name }}</div>
      <div class="current-league__coins">
        <img src="@/assets/images/mini-coin.png" alt="coin">
        <span>{{ team.points?.toLocaleString('en-EN') ?? 0 }}</span>
      </div>
    </div>
    <div v-if="team.rating_position <= 1000" class="current-league__rang">
      🔥 top {{ getRatingPosition(team.rating_position) }}
    </div>
  </div>
  <div v-else class="no-league" @click="router.push('/guild')">
    Join a guild
    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L5 5L1 9" stroke="white" stroke-width="1.5"/>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.no-league {
  border-radius: var(--big-border-radius);
  background: var(--block-dark-backgrond);
  backdrop-filter: blur(10px);
  padding: 16px;
  margin-bottom: 35px;
  text-align: center;
  font-size: 16px;
  line-height: 19px;
}
.current-league--loading {
  width: 100%;
  height: 72px;
  border-radius: var(--big-border-radius);
  background: linear-gradient(90deg, transparent 25%, #1f1f1f66 37%, transparent 63%);
  overflow: hidden;
  background-size: 400% 100%;
  animation: el-skeleton-loading 1.4s ease infinite;
  margin-bottom: 24px;
}
.current-league {
  border-radius: var(--big-border-radius);
  background: var(--block-dark-backgrond);
  backdrop-filter: blur(10px);
  padding: 12px;
  display: grid;
  grid-template-columns: 48px auto auto;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  &__icon {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: var(--small-border-radius);
    height: 48px;
    background-color: var(--body-background);
  }
  &__name {
    font-size: 20px;
    font-weight: 500;
  }
  &__coins {
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 4px;
    img {
      height: 18px;
    }
  }
  &__rang {
    text-align: right;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>