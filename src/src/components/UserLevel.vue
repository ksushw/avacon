<script setup lang="ts">
import icon0 from '@/assets/images/levels/no-level.png'
import icon1 from '@/assets/images/levels/1.png'
import icon2 from '@/assets/images/levels/2.png'
import icon3 from '@/assets/images/levels/3.png'
import icon4 from '@/assets/images/levels/4.png'
import icon5 from '@/assets/images/levels/5.png'
import icon6 from '@/assets/images/levels/6.png'
import type { IRank } from '@/types/user'

const icons: Record<number, string> = {
  0: icon0,
  1: icon1,
  2: icon2,
  3: icon3,
  4: icon4,
  5: icon5,
  6: icon6
}

const props = defineProps<{
  rank: IRank | null
}>()
</script>

<template>
  <img class="profile__level-icon" :src="icons[props.rank?.id || 0]" alt="rank" />
  {{ rank?.name || 'No level' }}
</template>

<style scoped lang="scss"></style>
