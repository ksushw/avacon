<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { BackButton } from 'vue-tg'
import { useBoosterStore } from '@/stores/booster'
import { useRootStore } from '@/stores/root'
import type { IListItem } from '@/types/props'
import type { IAvailableBooster, IBooster } from '@/types/booster'
import { useAxios } from '@/composables/useAxios'
import { formatDate } from '@/utils/formatDate'
import CongratulationsLeafsAnimation from '@/components/CongratulationsLeafsAnimation.vue'
import ListItem from '@/components/ListItem.vue'
import AvaBottomDrawer from '@/components/AvaBottomDrawer.vue'
import AvaButton from '@/components/AvaButton.vue'
import AvaCard from '@/components/AvaCard.vue'
import boosterIcon from '@/assets/images/booster/booster-1.png'
import bearIcon from '@/assets/images/booster/brown-bear.png'
import coinIcon from '@/assets/images/skin/coin.png'

const router = useRouter()

const boosterStore = useBoosterStore()
const rootStore = useRootStore()

boosterStore.getBoosters()
boosterStore.getAvailableBoosters()

const availableBoosters = computed(() =>
  boosterStore.availableBoosters.reduce((acc: Record<number, IAvailableBooster>, value) => {
    acc[value.booster_id] = value
    return acc
  }, {})
)

const boosters = computed<IListItem[]>(() =>
  boosterStore.boosters.map((el) => ({
    firstName: el.name,
    lastName: '',
    avatar: boosterIcon,
    points: '',
    id: el.id,
    level: el.description || 'One click a day collects all dust',
    clickable: !(el.id in availableBoosters.value),
    reward: `${el.price} USDT`
  }))
)

const buyBoosterModal = ref(false)
const selectedBooster = ref<IBooster>()
const boosterLoading = ref(false)
const boosterSuccess = ref(false)
async function buyBooster() {
  try {
    boosterLoading.value = true

    await useAxios(`/booster/buy/?booster_type_id=${selectedBooster.value?.id}`, {
      method: 'POST'
    })

    await boosterStore.getAvailableBoosters()
    rootStore.fetchUser()

    boosterLoading.value = false
    boosterSuccess.value = true
  } catch (e) {
    console.error('Failed to buy booster', e)
    boosterLoading.value = false
  }
}

watch(buyBoosterModal, (val) => {
  if (!val) {
    boosterSuccess.value = false
  }
})

function selectBooster(item: IListItem) {
  if (
    (item.id as number) in availableBoosters.value &&
    availableBoosters.value[item.id as number].id !== -1
  )
    return

  buyBoosterModal.value = true
  selectedBooster.value = boosterStore.boosters.find((boost) => boost.id === item.id)
}

</script>

<template>
  <BackButton @click="router.push('/')" />

  <div class="page booster-view">
    <div class="booster-view__image">
      <img src="@/assets/images/booster/booster-logo.png" alt="logo" />
    </div>

    <div class="booster-view__text">Your USDT balance</div>
    <div class="booster-view__balance">
      <img src="@/assets/images/booster/dollar.png" alt="dollar" />
      <span>{{ rootStore.user?.usdt?.toLocaleString('en-EN') ?? 0 }} USDT</span>
    </div>

    <div class="booster-view__top-up">
      <router-link to="/profile">Top up your USDT balance</router-link>
      <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 0.833496L5 5.50016L1 10.1668" stroke="#007AFF" stroke-width="1.5" />
      </svg>
    </div>

    <div class="booster-view__subtitle">Boosters</div>

    <AvaCard class="mb-16">
      <ListItem
        v-for="item of boosters"
        :key="item.id"
        :item="item"
        hide-coin
        icon-type="rounded"
        @click="selectBooster(item)"
      >
        <template
          v-if="
            availableBoosters.hasOwnProperty(item.id as number) &&
            availableBoosters[item.id as number].id !== -1
          "
          #reward
        >
          <div class="active-until">
            <span>Active </span>
            {{ formatDate(availableBoosters[item.id as number].available_until) }}
          </div>
        </template>
      </ListItem>
      <ListItem
        :item="{
          firstName: 'More boosts soon, be patient',
          lastName: '',
          avatar: bearIcon,
          points: ''
        }"
        hide-coin
        icon-type="rounded"
      />
    </AvaCard>

    <div class="booster-view__subtitle">Skins</div>
    <AvaCard class="mb-16">
      <ListItem
        :item="{
          firstName: 'Avacoin Skin',
          lastName: '',
          avatar: coinIcon,
          points: '',
          soon: true,
          id: 0,
        }"
        hide-coin
        icon-type="rounded"
      />
      <ListItem
        :item="{
          firstName: 'More skins soon, be patient',
          lastName: '',
          avatar: bearIcon,
          points: ''
        }"
        hide-coin
        icon-type="rounded"
      />
    </AvaCard>

    <AvaBottomDrawer v-model="buyBoosterModal">
      <section class="drawer__info info text-center">
        <CongratulationsLeafsAnimation v-if="boosterSuccess" class="info__anim" />
        <div v-if="boosterSuccess" class="info__title">Congratulations, you have a new booster</div>

        <div v-else class="info__title">Auto Tap miner bot</div>

        <div class="info__text">Only one click a day collects all the dust</div>

        <div v-if="!boosterSuccess" class="info__card">
          <div v-if="selectedBooster" class="info__card__balance">
            <span>Boost USDT price:</span>
            <span class="info__card__balance_usdt">
              <img src="@/assets/images/dollars.png" alt="dollars" />
              {{ selectedBooster.price }}
            </span>
          </div>

          <div class="info__card__balance">
            <span>Your USDT balance:</span>
            <span class="info__card__balance_usdt">
              <img src="@/assets/images/dollars.png" alt="dollars" />
              {{ rootStore.user?.usdt?.toLocaleString('en-EN') ?? 0 }}
            </span>
          </div>

          <div class="info__card__balance">
            <span>Active period </span>
            <span v-if="selectedBooster" class="info__card__balance_usdt"> 1 month </span>
          </div>
        </div>
        <div class="info__card__icon">
          <img src="@/assets/images/booster/bear-miner.png" alt="bear" />
        </div>
        <br />

        <AvaButton
          v-if="selectedBooster && !boosterSuccess && rootStore.user"
          block
          type="primary"
          @click="buyBooster"
          :loading="boosterLoading"
          :disabled="selectedBooster.price > rootStore.user.usdt"
        >
          Buy booster {{ selectedBooster?.price }} USDT
        </AvaButton>

        <AvaButton v-if="boosterSuccess" block type="primary" @click="buyBoosterModal = false">
          Let’s try
        </AvaButton>
      </section>
    </AvaBottomDrawer>

  </div>
</template>

<style scoped lang="scss">
.mb-16 {
  margin-bottom: 16px;
}
.active-until {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  text-align: right;
  font-size: 12px;
  span {
    font-size: 14px;
  }
}
.info {
  position: relative;

  &-skin {
    height: 100%;
    padding-top: 8px;
    display: flex;
    flex-direction: column;

    & > p {
      margin: 0;
    }
    & > .info__title {
      margin-top: 12px;
      margin-bottom: 12px;
    }
    & > .info__text {
      margin-bottom: 12px;
      color: #000;
      text-align: left;
      white-space: pre-line;
    }
    & > .info__subtitle {
      margin: 8px 0;
      color: #000;
      font-weight: 600;
      text-align: left;
    }
    &:deep(.profile-card + .profile-card) {
      padding-top: 0;
      margin-bottom: 12px;

      border-radius: 0;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    &:deep(.profile-card) {
      color: #000;
      border-radius: 20px;

      &[data-doubled='true'] {
        margin-bottom: 0;

        border-radius: 0;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
      }
    }
    & > img {
      margin-bottom: 12px;
      width: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
    & > button {
      margin-top: auto;
    }
    & > button + a {
      margin-top: 6px;
    }
  }
  &__anim {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100% - 50px);
  }
  &__title {
    color: #000000;
    font-size: 32px;
    font-weight: 700;
    margin-top: 15px;
  }

  &__text {
    font-weight: 400;
    font-size: 16px;
    color: #8e8e8e;
    margin-top: 16px;
  }

  &__card {
    padding: 16px;
    background: #d9d9d980;
    border-radius: 24px;
    margin-top: 24px;
    color: #000000;
    font-size: 16px;
    text-align: left;

    &__balance {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      &_usdt {
        display: flex;
        align-items: center;
        font-weight: 600;
      }

      img {
        width: 21px;
        height: 21px;
      }
    }

    &__text {
      font-size: 14px;
      color: #626262;
      margin-top: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__icon img {
      width: 200px;
      margin-top: 25px;
    }

    &__link {
      font-weight: 500;
      color: #007aff;
      margin-top: 8px;
      .spinner {
        display: inline-block;
        margin: 0 8px;
        border-radius: 50%;
        width: 1.5em;
        height: 1.5em;
        border: 0.215em solid transparent;
        vertical-align: middle;
        font-size: 10px;
        border-top-color: #007aff;
        animation: spin 1s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite;
      }
    }
  }
}

.booster-view {
  padding-top: 32px;
  background: url('@/assets/images/booster/bg.png') no-repeat center -50%;
  background-size: contain;
  &__image {
    text-align: center;
    margin-bottom: 16px;
    img {
      height: 168px;
    }
  }
  &__subtitle {
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.02em;
    text-align: left;
    margin-bottom: 16px;
  }
  &__top-up {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #007aff;
    gap: 5px;
    margin-bottom: 30px;
    a {
      text-decoration: none;
      color: #007aff;
    }
  }
  &__balance {
    font-size: 32px;
    font-weight: 700;
    line-height: 39px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    gap: 8px;
    img {
      height: 40px;
    }
  }
  &__text {
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #777777;
    margin-bottom: 16px;
  }
}
</style>
