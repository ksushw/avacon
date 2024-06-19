<script setup lang="ts">
import { BackButton, Popup } from 'vue-tg'
import { useRouter } from 'vue-router'
import AvaCard from '@/components/AvaCard.vue'
import AvaInput from '@/components/form/AvaInput.vue'
import { ref } from 'vue'
import AvaButton from '@/components/AvaButton.vue'
import AvaBottomDrawer from '@/components/AvaBottomDrawer.vue'
import MoneyIcon from '@/components/icons/MoneyIcon.vue'
import CoinIcon from '@/components/icons/CoinIcon.vue'
import AvaLink from '@/components/AvaLink.vue'
import { useStake } from '@/stores/stake'
import moment from 'moment'
import { useRootStore } from '@/stores/root'
import { formatNumberCommas } from '@/utils/formatNumber'

const isOpen = ref<boolean>(false)
const isPopupOpened = ref<boolean>(false)
const router = useRouter()
const stake = useStake()
const root = useRootStore()

const popupButtons = [
  { type: 'default', id: 'remove', text: 'Remove' },
  { type: 'cancel', id: 'cancel', text: 'Cancel' }
]


Promise.all([stake.getMyStaking(), stake.getTodayStaking()])

const loading = ref(false)
const sum = ref(500)

async function stakeHandle() {
  loading.value = true
  await stake.stake(sum.value)
  loading.value = false
}

function toggleBottomDriver(value: boolean) {
  isOpen.value = value
}

function toggleModal () {
  isPopupOpened.value = !isPopupOpened.value
}

function onCloseModal(id: string) {
  if(id === 'remove' && stake.my?.sum) {
    stake.removeStake(stake.my.sum)
  }
}
</script>

<template>
  <BackButton @click="router.go(-1)" />
  <div class="stacking page">
    <div class="stacking__title">AvaCoin staking</div>
    <AvaCard bg-color="#FFFFFF" class="mb-8">
      <div class="stacking__card-info">
        <div class="content">
          <div class="content-img">
            <CoinIcon />
          </div>
          <div>
            <div class="content-title">{{ formatNumberCommas(stake.my?.sum) }}</div>
            <div class="content-subtitle">My staking</div>
          </div>
        </div>
        <div class="content">
          <div>
            <div class="content-title">{{ formatNumberCommas(stake.my?.all_time_sum) }}</div>
            <div class="content-subtitle">Total rewards</div>
          </div>
        </div>
        <div v-if="stake.my?.staked_at" class="content">
          <div>
            <div class="content-title grey">Stake from:</div>
            <div class="content-subtitle grey">
              {{ moment(stake.my?.staked_at).format('DD.MM.YYYY') }}
            </div>
          </div>
        </div>
      </div>
    </AvaCard>
    <p class="stacking__remove-button" @click="() => toggleBottomDriver(true)">
      Remove AVA from staking
    </p>
    <div class="stacking__header mt-24">Staking statistics</div>
    <div class="stacking__statistics">
      <div class="stacking__statistics__item">
        <div class="stacking__statistics__item-title">
          {{
            stake.stats?.percent
              ? '≈' + Math.floor(stake.stats?.percent).toLocaleString() + '%'
              : '∞'
          }}
        </div>
        <div class="stacking__statistics__item-subtitle">Pool APR 24h</div>
      </div>
      <div class="stacking__statistics__item">
        <div class="stacking__statistics__item-title">
          {{
            stake.stats?.percent
              ? '≈' + Math.floor(stake.stats?.percent * 7).toLocaleString() + '%'
              : '∞'
          }}
        </div>
        <div class="stacking__statistics__item-subtitle">Pool APR 7d</div>
      </div>
      <div class="stacking__statistics__item">
        <div class="stacking__statistics__item-title">
          {{
            stake.stats?.percent
              ? '≈' + Math.floor(stake.stats?.percent * 180).toLocaleString() + '%'
              : '∞'
          }}
        </div>
        <div class="stacking__statistics__item-subtitle">Pool APR 6m</div>
      </div>
    </div>

    <div class="stacking__statistics-users">
      <div class="stacking__statistics-users__item">
        <div class="stacking__statistics-users__item-title">TVL</div>
        <div class="stacking__statistics-users__item-subtitle flex align-center gap-5">
          <span class="mt-2">{{
            stake.stats?.all_stakes_sum?.toLocaleString('en-EN') || '0'
          }}</span>
          <img v-if="stake.stats?.all_stakes_sum" src="@/assets/images/mini-coin.png" alt="coin" />
        </div>
      </div>
      <div class="stacking__statistics-users__item">
        <div class="stacking__statistics-users__item-title">Users in staking</div>
        <div class="stacking__statistics-users__item-subtitle">
          {{ stake.stats?.stakers_count?.toLocaleString('en-EN') ?? 0 }}
        </div>
      </div>
    </div>

    <div class="stacking__header">Earn from staking</div>
    <AvaCard bg-color="#FFFFFF" class="mb-16">
      <div class="stacking__card-info justify-between">
        <div class="content">
          <div class="content-img">
            <CoinIcon />
          </div>
          <div>
            <div class="content-title">
              {{ Math.floor(root.user?.tokens ?? 0).toLocaleString('en-En') }}
            </div>
            <div class="content-subtitle">AvaCoin Balance</div>
          </div>
        </div>
        <AvaLink text="Get more" link="tasks" />
      </div>
    </AvaCard>

    <AvaCard v-if="root.user" bg-color="#FFFFFF">
      <AvaInput
        v-model="sum"
        type="text"
        input-color="#F0EFF5"
        label="Set quantity your AvaCoin to stake"
        hint="500 AvaCoin top up staking balance"
      />
      <AvaButton
        block
        :disabled="root.user.tokens < sum || sum < 500"
        :loading="loading"
        vibrationType="success"
        @click="stakeHandle"
      >
        <div class="button-content">
          Stake {{ sum }} AvaCoin
          <MoneyIcon />
        </div>
      </AvaButton>
    </AvaCard>

    <AvaBottomDrawer
      v-model="isOpen"
      class="market-drawer drawer"
      @close="() => toggleBottomDriver(false)"
    >
      <div class="drawer__title">Remove AvaCoin from staking</div>
      <AvaCard bg-color="#FFFFFF" class="mb-8">
        <div class="stacking__card-info">
          <div class="content">
            <div class="content-img">
              <CoinIcon />
            </div>
            <div>
              <div class="content-title">{{ formatNumberCommas(stake.my?.sum) }}</div>
              <div class="content-subtitle">My staking</div>
            </div>
          </div>
          <div class="content">
            <div>
              <div class="content-title">{{ formatNumberCommas(stake.my?.all_time_sum) }}</div>
              <div class="content-subtitle">Total rewards</div>
            </div>
          </div>
          <div v-if="stake.my?.staked_at" class="content">
            <div>
              <div class="content-title grey">Stake from:</div>
              <div class="content-subtitle grey">
                {{ moment(stake.my?.staked_at).format('DD.MM.YYYY') }}
              </div>
            </div>
          </div>
        </div>
      </AvaCard>
      <AvaCard bg-color="#FFFFFF" class="mb-8">
        <div class="drawer__info">
          <div class="title mb-4">Remove from staking</div>
          <div class="subtitle">
            The Avacoin token is returned to your balance immediately after it is removed from your
            staking balance.
          </div>
        </div>
      </AvaCard>
      <AvaCard bg-color="#FFFFFF" class="mb-8">
        <AvaButton class="drawer__button" type="warning" @click="toggleModal"
          >Remove AVAcoin</AvaButton
        >
      </AvaCard>
      <Popup
        title="Are you sure?"
        message="Your AVAcoins will returned to
your balance"
        :buttons="popupButtons"
        v-if="isPopupOpened"
        @close="onCloseModal"
      />
    </AvaBottomDrawer>
  </div>
</template>

<style scoped lang="scss">
.stacking {
  background: #f0eff5;

  &__title {
    font-size: 32px;
    font-weight: 700;
    line-height: 38.73px;
    letter-spacing: 0.01em;
    margin-bottom: 12px;
    color: #000000;
    margin-top: 16px;
    text-align: center;
  }

  &__header {
    font-size: 20px;
    font-weight: 600;
    line-height: 24.2px;
    text-align: left;
    color: #000000;
    margin-bottom: 16px;
  }

  &__statistics {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    column-gap: 5px;
    padding-bottom: 16px;
    border-bottom: 1px solid #b6b6b6;
    margin-bottom: 16px;

    &__item {
      &-title {
        font-size: 16px;
        font-weight: 500;
        line-height: 19.36px;
        color: #000000;
        margin-bottom: 4px;
      }

      &-subtitle {
        font-size: 14px;
        font-weight: 400;
        line-height: 16.94px;
        color: #818181;
      }
    }
  }

  &__statistics-users {
    padding-bottom: 16px;
    border-bottom: 1px solid #b6b6b6;
    margin-bottom: 16px;

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-title {
        font-size: 16px;
        font-weight: 500;
        line-height: 19.36px;
        color: #000000;
        margin-bottom: 4px;
      }

      &-subtitle {
        font-size: 14px;
        font-weight: 400;
        line-height: 16.94px;
        color: #818181;

        img {
          width: 16px;
        }
      }
    }
  }

  &__card-info {
    display: flex;
    align-items: center;
    gap: 16px;

    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      column-gap: 10px;

      img {
        width: 24px;
      }

      &-img {
        width: 40px;
        height: 40px;
        border-radius: 50px;
        background: #d9d9d933;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &-title {
        font-size: 16px;
        font-weight: 600;
        line-height: 19.36px;
        color: #000000;
        margin-bottom: 5px;

        &.grey {
          color: #b8b8b8;
          font-weight: 400;
        }
      }

      &-subtitle {
        font-size: 16px;
        font-weight: 400;
        line-height: 19.36px;
        color: #000000;

        &.grey {
          color: #818181;
        }
      }
    }
  }

  &__remove-button {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: -0.02em;
    color: #007aff;
    text-align: end;
  }
}

.button-content {
  display: flex;
  align-items: center;
  column-gap: 10px;
  justify-content: center;
}

.drawer {
  &__title {
    font-size: 32px;
    font-weight: 700;
    line-height: 38.73px;
    letter-spacing: 0.01em;
    text-align: center;
    color: #000000;
    margin: 34px auto 16px;
    max-width: 276px;
  }

  &__info {
    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 24.2px;
      letter-spacing: -0.01em;
      color: #000000;
    }

    .subtitle {
      font-size: 16px;
      font-weight: 400;
      line-height: 19.36px;
      letter-spacing: -0.01em;
      color: #000000;
    }
  }

  &__button {
    width: 100%;
  }
}
</style>
