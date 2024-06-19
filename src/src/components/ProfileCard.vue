<script lang="ts" setup>
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import type { PropType } from 'vue'
import router from '@/router'
import type { ProfileItem } from '@/types/props'

defineProps({
  item: {
    type: Object as PropType<ProfileItem>,
    default: undefined
  }
})
</script>

<template>
  <div v-if="item" @click="router.push(item?.link)" class="profile-card">
    <div class="profile-card_info">
      <div class="profile-card_info__icon">
        <component :is="item?.icon" />
      </div>
      <div>
        <div class="profile-card_info__title">
          <div v-if="item.loading" class="loader"></div>
          <span v-else>{{ item?.title }} </span>
          <span class="grey">{{ item?.additionalText }}</span>
          <span class="soon" v-if="item.soon">soon</span>
        </div>
        <div class="profile-card_info__subtitle">{{ item?.subtitle }}</div>
      </div>
    </div>
    <div v-if="item?.link !== '#'" class="profile-card_arrow">
      <ArrowIcon />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-card {
  background: #d9d9d933;
  border-radius: 24px;
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--main-text-color);

  &_info {
    display: grid;
    grid-template-columns: 40px 1fr;
    column-gap: 5px;

    &__icon {
      width: 40px;
      height: 40px;
      background: #d9d9d933;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 60%;
      }
    }

    &__title {
      font-size: 16px;
      font-weight: 600;
      text-align: left;
      margin-bottom: 7px;

      .grey {
        color: #626262;
        font-size: 12px;
      }
    }

    &__subtitle {
      font-size: 16px;
      font-weight: 400;
      text-align: left;
    }
  }
  .soon {
    font-size: 10px;
    font-weight: 400;
    line-height: 12.5px;
    letter-spacing: -0.02em;
    text-align: left;
    color: #191919;
    background: #FEB702;
    border-radius: 4px;
    padding: 1px 7px;
    margin-left: 10px;
  }
}

.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #f58630;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
