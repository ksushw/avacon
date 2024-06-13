<script setup lang="ts">
import activeSkinImage from '@/assets/images/click-coin.png'
import blockedSkinImage from '@/assets/images/blocked-coin.png'

defineProps<{
  blocked: boolean
}>()
</script>

<template>
  <img
    :src="blocked ? blockedSkinImage : activeSkinImage"
    alt="Clickable coin"
    :data-clickable="true"
    class="icon"
  />
</template>

<style lang="scss" scoped>
.icon {
  width: 100%;
}
</style>
