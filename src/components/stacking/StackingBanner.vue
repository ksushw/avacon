<script lang="ts" setup>
import AvaLink from '@/components/AvaLink.vue'
import AvaButton from '@/components/AvaButton.vue'
import ProgressLine from '@/components/ProgressLine.vue'
import { useStake } from '@/stores/stake'
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRootStore } from '@/stores/root';
import moment from 'moment/moment';

const stake = useStake();
const root = useRootStore();
const loading = ref(false);
const now = moment().utc();
const time = ref<string>();
const endDate = moment().utc().hour(23).minute(59)
const percent = ref<number>(0)
let timerId: number = 0

const takeStake = async () => {
  loading.value = true
  await stake.takeStake();

  await Promise.all([
    stake.getMyStaking(),
    stake.getTodayStaking(),
    root.fetchUser()
  ])
  loading.value = false
}

function calculateTime() {

  const diff = endDate.diff(moment().utc());
  if (diff <= 0) {
    return '0h 0m';
  }

  const duration = moment.duration(diff);
  const hours = duration.hours();
  const minutes = duration.minutes();

  return `${hours.toString().padStart(2, '0')}h
    ${minutes.toString().padStart(2, '0')}m`;
}


const calculatePercent = () => {
  const minutesFromDayStart = (now.hours() * 60) + now.minutes();
  const totalMinutesInDay = 24 * 60;
  percent.value = Math.round((minutesFromDayStart / totalMinutesInDay) * 100);
}

watch(
  now,
  () => {
    time.value = calculateTime();
  },
  { immediate: true }
)

onMounted(() => {
  setTimeout(calculatePercent, 3000)
  timerId = setInterval(calculatePercent, 60000)
})

onUnmounted(() => {
  clearInterval(timerId)
})
</script>

<template>
  <div class="stacking-banner">
    <div class="stacking-banner__statistics">
      <div class="stacking-banner__statistics__info">
        <img src="@/assets/images/mini-coin.png" alt="coin" class="mt-3">
        <div>
          <div class="stacking-banner__statistics__info-count">
            {{ Math.floor(Number(stake.stats?.my_percent) * 30) || '-' }}
            <span class="text-15">%</span>
          </div>
          <div class="text-12" style="color: #CECECE">Pool APR 1m</div>
        </div>
      </div>
      <AvaLink class="stacking-banner__link" text="Staking stats" color="#F0C777" link="stacking" />
    </div>
    <ProgressLine v-if="stake.stats?.my_percent" :percent="percent" />
    <div class="stacking-banner__actions">
      <img src="@/assets/images/stacking/bag.png" alt="bag">
      <div>
        <div class="stacking-banner__actions__title">
          Storage
        </div>
        <div class="stacking-banner__actions__time">
          {{ time }}
          to fill</div>
      </div>
      <AvaButton block type="warning" :disabled="!stake.my?.not_taken" :loading="loading" @click="takeStake">
        Claim
      </AvaButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stacking-banner {
  background: linear-gradient(258.7deg, #15183F 2.16%, #313891 99.52%);
  border-radius: 24px;
  padding: 16px;

  @media (max-height: 500px) {
    border-radius: 15px;
    padding: 5px;
  }

  &__statistics {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    margin-bottom: 16px;

    @media (max-height: 500px) {
      column-gap: 5px;
      margin-bottom: 0px;
    }

    img {
      width: 24px;

      @media (max-height: 500px) {
        width: 18px;
      }
    }

    &__info {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      column-gap: 7px;

      &-count {
        font-size: 24px;
        font-weight: 700;
        line-height: 29.05px;
        text-align: left;
        color: #F0C777;

        @media (max-height: 500px) {
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
  }

  &__link {
    margin: 5px 0;
  }

  &__actions {
    margin-top: 16px;
    display: grid;
    align-items: center;
    grid-template-columns: 50px 1fr 1fr;
    column-gap: 10px;

    @media (max-height: 500px) {
      margin-top: 0px;
    }

    img {
      width: 48px;

      @media (max-height: 500px) {
        width: 35px;
      }
    }

    &__title {
      font-size: 20px;
      font-weight: 500;
      line-height: 24.2px;
      margin-bottom: 4px;

      @media (max-height: 500px) {
        font-size: 12px;
        line-height: 18px;
      }
    }

    &__time {
      font-size: 16px;
      font-weight: 400;
      line-height: 19.36px;
      color: #CECECE;

      @media (max-height: 500px) {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }
}
</style>