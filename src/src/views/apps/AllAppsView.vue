<script setup lang="ts">
import AppCard from '@/components/apps/AppCard.vue'
import { BackButton } from 'vue-tg'
import { useRoute, useRouter } from 'vue-router'
import AvaCard from '@/components/AvaCard.vue'
import { useAppsStore } from '@/stores/apps'
import { reactive } from 'vue'
import { useLazyLoading } from '@/composables/useLazyLoading'

const router = useRouter()
const apps = useAppsStore()
const route = useRoute()
const { pageRef, onScroll } = useLazyLoading()

const params = reactive({
  category: route.params.type as string,
  per_page: 15,
  page: 1
})
apps.apps = []
apps.getApps(params)

function scrollHandle(e: Event) {
  onScroll(e, () => {
    if (apps.data && apps.data.pages_count > params.page) {
      params.page++
      apps.getApps(params)
    }
  })
}

</script>

<template>
  <BackButton @click="router.go(-1)" />

  <div class="page" ref="pageRef" @scroll="scrollHandle">
    <router-link to="/apps/partnership" class="partnership-link">
      <div class="image flex align-center">
        <img class="star1" src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/icons/whie-star.svg" alt="star">
        <img class="star2" src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/icons/whie-star.svg" alt="star">
        <img
          style="height: 45px"
          src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/icons/apps.png"
          alt="apps"
          class="ml-12"
        >
      </div>

      <div>
        <div class="fw-500">Want in our catalog?</div>
        <div class="text-12 mt-4">You can connect with us right now</div>
      </div>

      <div>
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L1 9" stroke="white" stroke-width="1.5"/>
        </svg>
      </div>

      <img class="star3" src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/icons/whie-star.svg" alt="star">
    </router-link>

    <AvaCard v-if="apps.loading && !apps.apps?.length" :loading="apps.loading" style="height: 300px" />
    <div v-else class="list">
      <div class="title">
        TAPP’s ({{ route.query?.count }})
      </div>

      <AppCard
        full
        v-for="app in apps.apps"
        :key="app.id"
        :app="app"
        class="mb-16"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.partnership-link {
  height: 52px;
  width: 100%;
  border-radius: 24px;
  background: linear-gradient(88.54deg, #0A7CFD 25.49%, #61AEAE 116.74%);
  display: grid;
  align-items: center;
  margin-bottom: 22px;
  grid-template-columns: 52px auto 30px;
  gap: 25px;
  position: relative;
  text-decoration: none;
  color: #ffffff;
  .image {
    width: 52px;
    height: 52px;
    position:relative;
  }
  .star1 {
    position: absolute;
    top: -10px;
    right: -20px;
  }
  .star2 {
    position: absolute;
    top: 15px;
    left: -10px;
  }
  .star3 {
    position: absolute;
    top: -15px;
    right: -10px;
  }
}
.list {
  .title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
  }
}
</style>