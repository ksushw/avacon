<script setup lang="ts">
import { BackButton } from 'vue-tg';
import { useRouter } from 'vue-router';
import AvaCard from '@/components/AvaCard.vue';
import AvaTab from '@/components/AvaTab.vue';
import { computed, onMounted, ref, watch } from 'vue';
import NoFrens from '@/components/frens/NoFrens.vue';
import type { AvaTabProps, IListItem } from '@/types/props';
import { useAxios } from '@/composables/useAxios';
import type { ReferralItem, RefsResponse, RefsTotal } from '@/types/refs';
import ListItem from '@/components/ListItem.vue';
import InviteFrenNote from '@/components/frens/InviteFrenNote.vue';
import InviteButton from '@/components/frens/InviteButton.vue';
import { useLazyLoading } from '@/composables/useLazyLoading';

const router = useRouter()
const { pageRef, onScroll, params } = useLazyLoading()

const tabOptions: AvaTabProps[] = [
  {
    title: 'Ordinary',
    value: 'ordinary'
  },
  {
    title: 'Special',
    value: 'special',
  }
]

const activeTab = ref<string>('ordinary')
const refs = ref<RefsResponse>()
const totals = ref<RefsTotal>()
const loading = ref<boolean>(false)
const items = ref<ReferralItem[]>([])

const refsList = computed<IListItem[]>(() => items.value.map((e) => ({
  avatar: e.referral.avatar_path,
  firstName: e.referral.first_name,
  lastName: e.referral.last_name,
  points: e.referral.points,
  reward: e.tokens_reward ? '1' : undefined,
  position: e.position,
  isVerified: e.referral.is_email_verified && e.referral.is_channel_verified
})) ?? [])

async function getRefs() {
  try {
    loading.value = true
    refs.value = await useAxios<RefsResponse>('/user/referrals/', {
      params
    })
    items.value.push(...(refs.value?.data ?? []))
    loading.value = false
  } catch (e) {
    console.log(e)
    loading.value = false
  }
}

async function getRefsUsdt() {
  try {
    loading.value = true
    refs.value = await useAxios<RefsResponse>('/user/referrers/usdt/', {
      params
    })
    items.value.push(...(refs.value?.data ?? []))
    loading.value = false
  } catch (e) {
    console.log(e)
    loading.value = false
  }
}

async function getTotals() {
  try {
    totals.value = await useAxios<RefsTotal>('/user/referrals/total/')
  } catch (e) {
    console.log(e)
  }
}

function scrollHandle(e: Event) {
  onScroll(e, () => {
    if (refs.value && refs.value?.pages_count > params.page) {
      params.page++;
      if(activeTab.value === 'special') {
        getRefsUsdt();
      }
      if(activeTab.value === 'ordinary') {
        getRefs();
      }
    }
  })
}

onMounted(async () => {
  await Promise.all([
    getRefs(),
    getTotals(),
  ])
})

watch(() => activeTab.value, async(val) => {
  params.page = 1;
  refs.value = undefined;
  items.value = [];
  if(val === 'special') {
    await getRefsUsdt();
  }
  if(val === 'ordinary') {
    await getRefs();
  }
})

</script>

<template>
  <div>
    <BackButton
      @click="router.push('/')"
    />

    <div class="page frens" ref="pageRef"  @scroll="scrollHandle">
      <div class="page__orange blur-fix"></div>
      <div class="page__title text-center">
        {{ totals?.invited_count ? `${totals?.invited_count ?? 0} Frens` : 'Fren zone' }}
      </div>

      <div class="frens__subtitle warning-text">
        Invite frens to get bonuses
      </div>

      <div class="frens__invite">
        <InviteFrenNote />

<!--        <div class="frens__details" @click="router.push('/frens/details')">-->
<!--          Open details-->
<!--        </div>-->
      </div>

      <div class="frens__subtitle">
        Frens List
      </div>

      <AvaCard :loading="loading">
        <template #header>
          <AvaTab :options="tabOptions" v-model="activeTab" />
        </template>

        <template v-if="refsList.length">
          <ListItem
            v-for="item of refsList"
            :key="item.points"
            :item="item"
            hide-coin
            hide-points
          />
        </template>

        <NoFrens v-else />
      </AvaCard>
    </div>

    <InviteButton type="warning" fixed />
  </div>
</template>

<style scoped lang="scss">
.frens {
  &__details {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
  }
  &__subtitle {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -0.4px;
    margin-bottom: 16px;
  }
  &__invite {
    border-radius: 16px;
    background: var(--block-dark-backgrond);
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 24px;
  }
}
</style>