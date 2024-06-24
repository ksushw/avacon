<script setup lang="ts">
import VerificationIcon from '@/components/icons/VerificationIcon.vue'

defineProps<{
  rounded?: boolean
  verified?: boolean
  image?: string
  initials?: string
  size: string
}>()
</script>

<template>
  <div :class="['profile-icon', { rounded }]" :style="{ width: size, height: size }">
    <div v-if="image" class="profile-icon__image" :style="`background-image: url(${image})`"></div>
    <div
      v-else
      class="profile-icon__initials flex align-center"
      :style="{ fontSize: `calc(${size} / 2.5)` }"
    >
      {{ initials }}
    </div>
    <VerificationIcon class="profile-icon__verified" v-if="verified" width="40%" height="40%" />
  </div>
</template>

<style scoped lang="scss">
.profile-icon {
  position: relative;
  &__initials {
    border-radius: 100%;
    background-color: #bb96df;
    width: 100%;
    height: 100%;
    justify-content: center;
    color: #ffffff;
    font-weight: 500;
  }
  &__image {
    border-radius: 100%;
    width: 100%;
    height: 100%;
    background-size: cover;
  }
  &.rounded &__initials,
  &.rounded &__image {
    border-radius: 8px;
  }
  &__verified {
    position: absolute;
    top: -7%;
    left: -7%;
  }
}
</style>
