<script setup lang="ts">
import icon1 from '@/assets/images/users-limit/1.png'
import icon2 from '@/assets/images/users-limit/2.png'
import icon3 from '@/assets/images/users-limit/3.png'
import icon4 from '@/assets/images/users-limit/4.png'
import { useRoute, useRouter } from 'vue-router'
import AvaCard from '@/components/AvaCard.vue'
import AvaButton from '@/components/AvaButton.vue'
import { useBoosterStore } from '@/stores/booster'
import { computed } from 'vue'

const icons = [icon1, icon2, icon3, icon4]

const route = useRoute()
const router = useRouter()
const booster = useBoosterStore()

booster.getBoosters()

const group = computed(() => Number(route.query?.image ?? 1))
const bst = computed(() => booster.boosters?.[0] ?? null)

</script>

<template>
  <div class="page users-limit">
    <div class="page__title">
      Sorry...we've reached <br>
      2,000,000 miners
    </div>

    <div class="users-limit__text">
      Our servers are currently overwhelmed with miners, leading to significant traffic.
      <strong>
        You can buy a booster now to gain priority access and bypass the congestion.
      </strong>
    </div>

    <a href="https://t.me/avagoldcoin" class="users-limit__join join">
      <div class="join__flex">
        <div class="join__icon">
          <img src="@/assets/images/users-limit/users-limit-coin.png" alt="coin">
        </div>
        <div class="join__content">
          <div class="join__title">
            Join Telegram AVACOIN community
          </div>
          <div class="join__text">
            Subscribe for the latest updates
          </div>
        </div>
      </div>
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.828125 0.840027L6.82812 6.84003L0.828125 12.84" stroke="#727272" stroke-width="1.5"/>
      </svg>
    </a>

    <div :class="['users-limit__img', `img-${group}`]">
      <img :src="icons[group - 1]" alt="">
    </div>

    <AvaCard bg-color="#6262621A">
      <div class="users-limit__join no-bg join">
        <div class="join__flex">
          <div class="join__icon">
            <img src="@/assets/images/users-limit/tsikira.png" alt="coin">
          </div>
          <div class="join__content">
            <div class="join__title">
              Auto Tap miner bot
            </div>
            <div class="join__text">
              One click a day collects all dust
            </div>
          </div>
        </div>
        <div class="join__price">
          <img src="@/assets/images/dollars.png" alt="dollars">
          {{ bst?.price ?? 0 }}
        </div>
      </div>

      <div class="active-period">
        <span>Active period </span>
        <strong>1 month</strong>
      </div>
    </AvaCard>

    <AvaButton fixed type="primary" @click="router.push('/buy-booster')">
      Buy booster {{ bst?.price ?? 0 }} USDT
    </AvaButton>
  </div>
</template>

<style scoped lang="scss">
.active-period {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
}
.users-limit {
  background: #F0EFF5;
  .page__title {
    color: #000000;
    text-align: center;
  }
  &__img {
    margin-bottom: 24px;
    text-align: center;
    img {
      height: 200px;
    }
    &.img-1 img{
      height: 272px;
    }
  }
  &__text {
    color: #8E8E8E;
    text-align: center;
    margin-bottom: 24px;
    strong {
      color: #000000;
    }
  }
  .join {
    background: #6262621A;
    border-radius: 24px;
    padding: 6px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 24px;
    text-decoration: none;
    &.no-bg {
      background: transparent;
      padding: 0;
    }
    &__flex {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    &__icon {
      img {
        height: 51px;
      }
    }
    &__price {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #000000;
      font-size: 16px;
      font-weight: 700;
      img {
        height: 20px;
      }
    }
    &__title {
      color: #000000;
      font-size: 14px;
      font-weight: 500;
      line-height: 17px;
    }
    &__text {
      color: #727272;
      font-size: 12px;
      line-height: 15px;
    }
  }
}
</style>