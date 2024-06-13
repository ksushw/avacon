<script setup lang="ts">
import type { ISkin } from '@/types/skin'
import CoinSkin from '@/components/skins/CoinSkin.vue'
import WatchSkin from '@/components/skins/WatchSkin.vue'
import KhachapuriSkin from '@/components/skins/KhachapuriSkin.vue'
import AvacoinSkin from '@/components/skins/AvacoinSkin.vue'
import MoneySkin from '@/components/skins/MoneySkin.vue'
import { skinsNames } from '@/stores/skin'

const props = defineProps<{
  skin?: ISkin
  blocked: boolean
}>()

const skinName = props.skin ? skinsNames[props.skin.id] : null
</script>

<template>
  <CoinSkin v-if="skinName === 'coin' || !skinName" :blocked="blocked" />
  <WatchSkin v-else-if="skinName === 'watch'" :blocked="blocked" />
  <KhachapuriSkin v-else-if="skinName === 'khachapuri'" :blocked="blocked" />
  <AvacoinSkin v-else-if="skinName === 'avacoin'" :blocked="blocked" />
  <MoneySkin v-else-if="skinName === 'money'" :blocked="blocked" />
</template>
