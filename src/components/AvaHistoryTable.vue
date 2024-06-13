<script setup lang="ts">
import type { PropType } from 'vue';
import type { ItemHistoryProps } from '@/types/props';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';

const props = defineProps({
  data: {
    type: Array as PropType<ItemHistoryProps[]>,
    default: () => ([])
  },
  type: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['open'])

const openInfo = (item: ItemHistoryProps) => {
  if (props.type === 'sell' && item.status === 'created') {
    emit('open', item.id)
  }
}
</script>

<template>
  <div class="ava-table">
    <div class="ava-table__info">
      <div class="ava-table__header">
        <div>Quantity</div>
        <div>Price</div>
        <div>Date</div>
        <div>Status</div>
      </div>

      <div @click="openInfo(item)" v-for="(item, i) in data" :key="i" class="ava-table__body">
        <div class="quantity">
          <div class="icon" :style="`background-image: url(${item.icon})`"/>
          {{ item.quantity }}
        </div>
        <div>{{ item.price }}</div>
        <div>{{ item.date }}</div>
        <div>
          <span class="status" :class="[item.status]">
            {{ item.statusTitle }}
          </span>
        </div>
        <ArrowIcon v-if="type === 'sell' && item.status === 'created'" class="arrow"/>
      </div>
    </div>
    <div v-if="!data.length" class="ava-table__empty">
      <img src="@/assets/images/market/busy-bear.png" alt="bear">
      <span>No deals yet</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ava-table {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 16px;
  table {
    width: 100%;
    border-collapse: collapse;
  }

  &__header {
    font-size: 14px;
    font-weight: 600;
    line-height: 16.94px;
    color: #000000;
    background: #F0EFF5;
    border-radius: 8px;
    display: grid;
    grid-template-columns: 90px 1fr 1fr 1fr;
    div {
      padding: 8px;
    }
  }

  &__body {
    font-size: 14px;
    font-weight: 400;
    line-height: 19.36px;
    color: #000000;
    display: grid;
    grid-template-columns: 90px 1fr 1fr 1fr;
    position: relative;

    .arrow {
      position: absolute;
      right: 0;
      top: 17px;
    }
    div {
      padding: 8px;
      display: flex;
      align-items: center;
    }
    .status {
      background: #FEB702;
      padding: 0 6px;
      border-radius: 5px;
      font-size: 12px;

      &.closed {
        background: #FF006B;
        color: #ffffff;
      }
      &.executed {
        background: #1BA049;
        color: #ffffff;
      }
    }
    .icon {
      width: 32px;
      height: 32px;
      min-width: 32px;
      background-color: #D9D9D933;
      background-size: 80%;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 100%;
      padding: 0;
    }
    .quantity {
      display: flex;
      align-items: center;
      column-gap: 5px;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 60%;
    }
    span {
      font-size: 12px;
      font-weight: 400;
      line-height: 14.52px;
      color: #8A8A8A;
    }
  }
}
</style>

