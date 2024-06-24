<script setup lang="ts">

import AvaCard from '@/components/AvaCard.vue';
import type { AvaTabProps, IListItem } from '@/types/props';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import AvaTab from '@/components/AvaTab.vue';
import { useAxios } from '@/composables/useAxios';
import type { IRatingItem, RatingsResponse } from '@/types/competition';
import ListItem from '@/components/ListItem.vue';
import GuildRating from '@/components/competition/GuildRating.vue';
import { BackButton } from 'vue-tg';
import { useRouter } from 'vue-router';
import { useLazyLoading } from '@/composables/useLazyLoading';
import StatisticsTotal from '@/components/statistics/StatisticsTotal.vue'

const router = useRouter()
const { pageRef, onScroll } = useLazyLoading()

const ratingsResponse = ref<RatingsResponse>()
const ratingList = ref<IRatingItem[]>([])
const params = reactive<RatingParams>({
  type: 'last_2_weeks',
  per_page: 15,
  page: 1
})
const selectModal = ref<boolean>(false)
const selectedType = ref<SelectedType>('users')
const loading = ref<boolean>(false)

const ratings = computed<IListItem[]>(() => {
  return ratingList.value.map<IListItem>((el, index) => ({
    id: el?.id || 0,
    avatar: el.avatar_path,
    firstName: el?.first_name ?? el?.name ?? '',
    lastName: el?.last_name ?? '',
    points: el.points,
    place: index + 1,
    level: selectedType.value === 'users' ? (el.rank?.name || 'No level') : `${el?.participants_count?.toLocaleString('en-EN') ?? 0} miners`,
    clickable: selectedType.value === 'teams'
  })) ?? []
})

async function getRatings() {
  try {
    loading.value = true
    ratingsResponse.value = await useAxios<RatingsResponse>(`/rating/${selectedType.value}/`, {
      params
    })
    ratingList.value.push(...ratingsResponse.value.data)
    loading.value = false
  } catch (e) {
    console.log(e)
    loading.value = false
  }
}

function go(id: number | undefined) {
  if (id) {
    router.push(`/guild/${id}`)
  }
}

function scrollHandle(e: Event) {
  onScroll(e, () => {
    if (ratingsResponse.value && ratingsResponse.value?.pages_count > params.page) {
      params.page++
    }
  })
}

watch([() => params.type, selectedType], async () => {
  ratingList.value = []
  if (params.page > 1) {
    params.page = 1
  } else {
    await getRatings()
  }
})

watch([ () => params.page], async () => {
  await getRatings()
})

onMounted(async () => {
  await getRatings()
})

const tabOptions: AvaTabProps[] = [
  {
    title: 'In two weeks',
    value: 'last_2_weeks'
  },
  {
    title: 'All time',
    value: 'all'
  }
]

interface RatingParams {
  type: 'all' | 'last_2_weeks'
  per_page: number
  page: number
  order_by?: string
}

type SelectedType = 'teams' | 'users'
</script>

<template>
  <BackButton
    @click="router.go(-1)"
  />
  <section class="page competition" ref="pageRef" @scroll="scrollHandle">
    <StatisticsTotal />
    <div class="text-center">
      <img class="competition__logo" src="@/assets/images/competition/competition-logo.png" alt="logo">
    </div>
    <div class="page__title text-center">Competition</div>

    <div class="competition__text">
      Participate in team competitions and get
      prizes in two weeks competitions
    </div>

    <div class="competition__switch">
      <div class="competition__subtitle">Rating of {{ selectedType === 'users' ? 'participants' : 'guilds' }}</div>
      <div class="competition__choice" @click="selectModal = true">
        {{ selectedType === 'users' ? 'Personal' : 'Guild' }} rating
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
          <path d="M1 1.5L5 5.5L1 9.5" stroke="#FEB702" stroke-width="1.5"/>
        </svg>
      </div>
    </div>

    <AvaCard :loading="loading" min-height="150px">
      <template #header>
        <AvaTab :options="tabOptions" v-model="params.type" />
      </template>
      <ListItem
        v-for="item of ratings"
        :key="item.id"
        :item="item"
        showPlace
        :iconType="selectedType === 'users' ? 'circle' : 'rounded'"
        @click="go(item.id)"
      />
    </AvaCard>

    <GuildRating v-model="selectModal" @type-change="(e) => { selectedType = e }" />
  </section>
</template>

<style scoped lang="scss">
.competition {
  padding-bottom: 30px;
  background-image: url("@/assets/images/competition/competition-bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center -100px;
  &__logo {
    height: 168px;
    margin-bottom: 8px;
  }
  &__text {
    color: #E9E9E9;
    font-size: 16px;
    letter-spacing: -0.32px;
    margin-bottom: 24px;
  }
  &__switch {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  &__subtitle {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -0.4px;
  }
  &__choice {
    color: var(--warning-text-color);
    text-align: right;
    font-size: 16px;
  }
}
</style>