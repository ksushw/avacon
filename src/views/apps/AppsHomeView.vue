<script setup lang="ts">
import { BackButton } from 'vue-tg'
import { useRouter } from 'vue-router'
import AppCard from '@/components/apps/AppCard.vue'
import 'vue3-carousel/dist/carousel.css'
import AvaCard from '@/components/AvaCard.vue'
import { useAppsStore } from '@/stores/apps'

const router = useRouter()
const apps = useAppsStore()

apps.getAppsCategory()

const items = [
  'TAPP’s',
  'Games',
  'AI',
  'Finance',
  'Education',
  '+'
]

</script>

<template>
  <BackButton @click="router.go(-1)" />

  <div class="page apps">
    <div class="want-more">
      <div class="image">
        <div class="flex">
          <div v-for="item of items" :key="item" class="item">
            {{ item }}
          </div>
        </div>

        <div class="flex">
          <div class="item soon">
            More App’s
          </div>
        </div>
      </div>

      <div class="content">
        <div>
          <div class="title">
            Applications
          </div>
          <div class="text">
            In our catalog you can find a huge number of trending applications in the ton ecosystem.
          </div>
        </div>
      </div>
    </div>

    <AvaCard v-if="apps.loading" :loading="apps.loading" style="height: 150px" />
    <template v-for="cat of apps.category" :key="cat.type">
      <div v-if="cat.count" class="list">
        <div class="header">
          <div class="title">
            {{ cat.name }}
          </div>

          <router-link :to="`/apps/${cat.type}?count=${cat.count}`" class="see-all">
            See all
            ({{cat.count}})
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L1 9" stroke="#007AFF" stroke-width="1.5"/>
            </svg>
          </router-link>
        </div>


        <div>
          <AppCard
            v-for="app in cat.apps"
            :key="app.id"
            :app="app"
            class="mb-12 mr-10"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.apps {
  .slider {
    margin-right: -16px;
  }
  .scroll-panel {
    width: calc(100% + 10px);
    height: 330px;
  }
  .list {
    margin-bottom: 30px;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      .title {
        font-size: 20px;
        font-weight: 600;
        text-transform: capitalize;
      }
      .see-all {
        color: #007AFF;
        text-decoration: none;
      }
    }
  }
  .want-more {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 200px;
    border-radius: 24px;
    overflow: hidden;
    margin-bottom: 32px;
    .content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #171717;
      .title {
        font-weight: 700;
        margin-bottom: 12px;
      }
      .text {
        font-size: 12px;
        line-height: 14px;
      }
    }
    .image {
      background: url("https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/apps/more.png") no-repeat left bottom;
      background-size: contain;
      padding: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .item {
        font-weight: 500;
        font-size: 14px;
        height: 21px;
        border-radius: 12px;
        padding-inline: 8px;
        background-color: #ffffff;
        color: #000000;
        align-items: center;
        display: flex;
        &.soon {
          position: relative;
          &::after {
            content: 'soon';
            position: absolute;
            top: -5px;
            right: -10px;
            background-color: #D92020;
            border-radius: 4px;
            height: 11px;
            padding-inline: 3px;
            color: #ffffff;
            font-size: 10px;
            rotate: 30deg;
          }
        }
      }
      .flex {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;

      }
    }
  }
}
</style>