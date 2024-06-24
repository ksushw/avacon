<script setup lang="ts">

import { computed, onMounted } from 'vue'
import type { IBetPoint } from '@/types/bets'
import { useBet } from '@/stores/bet';

const betStore = useBet();

const tableData = computed(() => {
  return betStore.bets.filter(el => ['in_game', 'win', 'lose'].includes(el.status))
})

function getMyPoint(points: IBetPoint[]) {
  return points.find(el => el.is_completed)
}

onMounted(() => {
  if (!betStore.bets.length) {
    betStore.getBet();
  }
})

</script>

<template>
  <div class="game-table">
    <table class="w-100 black-color">
      <thead>
      <tr>
        <td>Event</td>
        <td>Total</td>
        <td>Bet</td>
        <td>Coef</td>
        <td>Result</td>
      </tr>
      </thead>

      <tbody>
      <tr v-for="row of tableData" :key="row.id">
        <td>
          <div class="black-color fw-500">
            <div class="flex align-center gap-5 mb-8">
              <div class="image" :style="{ backgroundImage: `url(${row.points[0]?.image_url})` }"></div>
              {{ row.points[0]?.title }}
            </div>
            <div v-if="row.points[1]" class="flex align-center gap-5">
              <div class="image" :style="{ backgroundImage: `url(${row.points[1]?.image_url})` }"></div>
              {{ row.points[1]?.title }}
            </div>
          </div>
        </td>
        <td class="fw-500">
          <div class="mb-8">{{ row.points[0]?.win_events_count }}</div>
          <div>{{ row.points[1]?.win_events_count }}</div>
        </td>
        <td class="fw-500">
          {{ getMyPoint(row.points)?.amount }}
        </td>
        <td class="fw-500">
          {{ getMyPoint(row.points)?.coefficent }}
        </td>
        <td :class="row.status">
          {{ row.status === 'in_game' ? 'In game' : `${row.status.slice(0,1).toUpperCase()}${row.status.slice(1,row.status.length)}` }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.game-table {
  table {
    border: 0;
    border-collapse: collapse;
    thead {
      background: #DCDCDC;
      td {
        height: 50px;
        &:first-child {
          text-align: left;
          padding-left: 16px;
          border-radius: 24px 0 0 0;
        }
        &:last-child {
          border-radius: 0 24px 0 0;
        }
      }
    }
    tbody {
      background: #ffffff;
      tr {
        td {
          padding-top: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #DCDCDC;
          &:first-child {
            padding-left: 14px;
          }
          &.in_game {
            color: #FF9D36;
          }
          &.lose {
            color: #C72B27;
          }
          &.win {
            color: #489F37;
          }
        }
        &:last-child {
          td {
            border: none;
            &:first-child {
              border-radius: 0 0 0 24px;
            }
            &:last-child {
              border-radius: 0 0 24px 0;
            }
          }
        }
      }
    }
    tr {
      text-align: center;
    }
  }
  .image {
    width: 20px;
    height: 20px;
    border-radius: 32px;
    background-size: cover;
    background-position: center;
  }
}
</style>