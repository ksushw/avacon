<script setup lang="ts">
import type { IListItem } from '@/types/props'
import gold from '@/assets/images/medals/gold.png'
import silver from '@/assets/images/medals/silver.png'
import bronza from '@/assets/images/medals/bronza.png'
import VerificationIcon from '@/components/icons/VerificationIcon.vue'

const props = withDefaults(
  defineProps<{
    iconType?: 'circle' | 'rounded'
    showPlace?: boolean
    hideCoin?: boolean
    hidePoints?: boolean
    item: IListItem
  }>(),
  {
    showPlace: false,
    hideCoin: false,
    hidePoints: false,
    iconType: 'circle'
  }
)

function getPlaceIcon() {
  if (props.item?.place === 1) {
    return gold
  } else if (props.item?.place === 2) {
    return silver
  } else if (props.item?.place === 3) {
    return bronza
  }

  return props.item?.place
}
</script>

<template>
  <section class="list-item">
    <div v-if="showPlace && item.place" class="list-item__place">
      <img v-if="item.place < 4" :src="getPlaceIcon() as string" alt="medal" />
      <span v-else>{{ item.place }}</span>
    </div>
    <div v-if="item?.new" class="list-item__new">new</div>
    <div
      v-if="item.avatar"
      :class="['list-item__icon', iconType]"
      :style="`background-image: url(${item.avatar})`"
    ></div>
    <div v-else class="list-item__initials">
      {{ item.firstName?.slice(0, 1) }}{{ item.lastName?.slice(0, 1) }}
    </div>
    <div v-if="item.isVerified" class="list-item__verified">
      <VerificationIcon />
    </div>
    <div v-if="item.position" class="list-item__position">{{ item.position }}</div>
    <div class="list-item__info">
      <div class="list-item__title text-ellipsis">
        {{ item.firstName }} {{ item.lastName }}
        <span class="grey">{{ item.infoText }}</span>
      </div>
      <div class="list-item__coins">
        <template v-if="item.level">
          <span>{{ item.level }}</span>
          <span v-if="!hideCoin">•</span>
        </template>
        <img v-if="!hideCoin" src="@/assets/images/mini-coin.png" alt="coin" />
        <span v-if="!hidePoints">{{ item.points?.toLocaleString('en-EN') ?? 0 }}</span>
      </div>
    </div>
    <div class="list-item__right">
      <div v-if="item?.soon" class="list-item__soon">soon</div>
      <div v-if="item.reward" class="list-item__reward warning-text">
        <slot v-if="$slots?.reward" name="reward"></slot>
        <span
          v-else-if="typeof item.reward === 'number'"
          :class="{ 'not-verified': !item.isVerified }"
        >
          +{{ item.reward?.toLocaleString('en-EN') ?? 0 }}
        </span>
        <span v-else>
          {{ item.reward }}
        </span>
      </div>
      <div v-if="item.usdtRefReward" class="list-item__reward warning-text">
        +{{ item.usdtRefReward?.toLocaleString('en-EN') ?? 0 }} USDT
      </div>
      <div v-if="item?.clickable" class="list-item__arrow">
        <img src="@/assets/images/icons/chevron-right.svg" alt="right" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.list-item {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;

  &:not(:last-child) {
    padding-bottom: 12px;
  }

  &__verified {
    position: absolute;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
  }

  &__position {
    position: absolute;
    background: #717681;
    width: 14px;
    height: 14px;
    border-radius: 50px;
    border: 1px solid #ffffff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 30px;
    left: 30px;
  }

  &__new {
    padding: 2px 4px 2px 4px;
    border-radius: 4px;
    background: #feb702;
    color: #191919;
    font-size: 8px;
    position: absolute;
    top: 4px;
    left: 4px;
  }
  &__soon {
    padding: 2px 4px 2px 4px;
    border-radius: 4px;
    background: #feb702;
    color: #191919;
    font-size: 10px;
  }
  &__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    width: 150px;
  }
  &__info {
    width: 100%;
  }
  &__arrow {
    height: 14px;
  }
  &__place {
    width: 24px;
    min-width: 24px;
    text-align: center;
    font-size: 16px;
    img {
      width: 100%;
    }
  }
  &__initials {
    width: 44px;
    height: 44px;
    min-width: 44px;
    border-radius: 100%;
    background: #bb96df;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__icon {
    width: 44px;
    height: 44px;
    min-width: 44px;
    background-color: #d9d9d933;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 100%;

    &.rounded {
      border-radius: var(--base-border-radius);
    }
  }
  &__title {
    font-size: 14px;
    font-weight: 600;
    line-height: 135%;
    margin-bottom: 4px;
    max-width: 200px;
    .grey {
      font-size: 12px;
      color: #8a8a8a;
    }
  }
  &__reward {
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;

    .not-verified {
      color: #717681;
    }
  }
  &__coins {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    line-height: 160%;
    color: #c6bfb7;
    img {
      height: 20px;
    }
  }
}
</style>
