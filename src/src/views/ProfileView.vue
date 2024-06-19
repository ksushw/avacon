<script setup lang="ts">

import { useRootStore } from '@/stores/root';
import AvaCard from '@/components/AvaCard.vue';
import { BackButton } from 'vue-tg'
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import StatisticsTotal from '@/components/statistics/StatisticsTotal.vue'
import ProfileCard from '@/components/ProfileCard.vue';
import type { ProfileItem } from '@/types/props';
import CoinIcon from '@/components/icons/CoinIcon.vue';
import StarIcon from '@/components/icons/StarIcon.vue';
import AvaBottomDrawer from '@/components/AvaBottomDrawer.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import SocialButton from '@/components/profile/SocialButton.vue';
import VerificationIcon from '@/components/icons/VerificationIcon.vue';
import ConnectWallet from '@/components/profile/ConnectWallet.vue';

const root = useRootStore()
const router = useRouter()
const route = useRoute();

const isLoading = ref(true);
const isWithdrawnModal = ref(false);
const isFromWithdrawn = computed(() => route.query.isFromWithdrawn as string);
const isVerified = computed(() => root.user?.is_channel_verified && root.user?.is_email_verified)

onMounted(async() => {
  if(isFromWithdrawn.value){
    isWithdrawnModal.value = true;
  }
  isLoading.value = true;
  await root.fetchUser();
  isLoading.value = false;
})

const profileCards = computed<ProfileItem[]>(() => (
  [
    {
      title:   (Math.floor(Number(root.user?.tokens)))?.toLocaleString('en-EN') ?? 0,
      subtitle: 'AvaCoin Token',
      icon: CoinIcon,
      link: '#',
      loading: isLoading.value
    },
    // {
    //   title: root.user?.usdt?.toLocaleString('en-EN') ?? 0,
    //   subtitle: 'Active USDT balance:',
    //   icon: DollarIcon,
    //   link: 'active-usdt-balance',
    //   loading: isLoading.value
    // },
    {
      title: 'Telegram STARS',
      subtitle: 'First Telegram official payment method',
      icon: StarIcon,
      link: '#',
      soon: true,
    },
    // {
    //   title: root.user?.usdt_ref?.toLocaleString('en-EN') ?? 0,
    //   subtitle: 'Frozen USDT balance:',
    //   icon: BlueDollarIcon,
    //   link: '/frozen',
    //   loading: isLoading.value
    // },
    // {
    //   title: root.user.golds?.toLocaleString('en-EN') ?? 0,
    //   additionalText: `=${(root.user.golds * 800000)?.toLocaleString('en-EN') ?? 0} gold dust`,
    //   subtitle: 'Gold grams from dust',
    //   icon: SilverGoldIcon,
    //   link: '/market',
    // },
    // {
    //   title: root.user.golds_stamp?.toLocaleString('en-EN') ?? 0,
    //   subtitle: 'Stamp DUBAI gold bars',
    //   icon: GoldIcon,
    //   link: '/market',
    // },
  ]
));



</script>

<template>
  <BackButton @click="router.go(-1)"/>
  <section v-if="root.user" class="page profile">
    <StatisticsTotal />
    <div v-if="root.user?.avatar_path" class="profile__image" :style="`background-image: url(${root.user?.avatar_path})`">
      <VerificationIcon v-if="isVerified" class="profile__verified" />
    </div>
    <div v-else class="profile__initials">
      {{ root.user?.first_name.slice(0, 1) }}{{ root.user?.last_name.slice(0, 1) }}
      <VerificationIcon v-if="isVerified" class="profile__verified" />
    </div>
    <div class="page__title text-center profile__name">
      {{ root.user?.first_name }} {{ root.user?.last_name }}
    </div>

    <AvaCard class="mb-12">
      <div class="profile__info">
        <div>Verification status:</div>
        <div v-if="isVerified" class="center">
          <VerificationIcon style="height: 20px" />
          1 Level
        </div>
        <div v-else @click="router.push('/verification')" class="center">
          <CloseIcon />
          No verification
          <ArrowIcon />
        </div>
      </div>
    </AvaCard>

    <ConnectWallet />

<!--    <div class="profile__info-balance mt-30">-->
<!--      <div>Total balance:</div>-->
<!--      <div v-if="root.user" class="profile__info-balance__level">-->
<!--        {{ (root.user?.usdt + root.user?.usdt_ref)?.toLocaleString('en-EN') ?? 0 }} USDT-->
<!--      </div>-->
<!--    </div>-->

    <ProfileCard v-for="item in profileCards" :key="item.title" :item="item"/>

    <SocialButton />

    <AvaBottomDrawer v-model="isWithdrawnModal" @update:modelValue="router.replace('/profile')">
      <section class="drawer__info text-center">
        <div class="drawer__info__title">Waiting...</div>
        <div class="drawer__info__icon">
          <img src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/golds-bar.png" alt="bear" />
        </div>
        <div class="drawer__info__text">
          Your application has been accepted. Very soon we will send USDT to your address
        </div>
      </section>
    </AvaBottomDrawer>
  </section>
</template>

<style lang="scss" scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.drawer__info {
  img {
    width: 60%;
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
    color: #8E8E8E;
    margin-top: 16px;
  }
}
</style>

<style lang="scss">
.mb-12 {
  margin-bottom: 12px;
}
.profile {
  padding-bottom: 30px;
  background-image: url("https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/profile/profile-bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center -100px;
  text-align: center;
  &__coin {
    height: 16px;
  }
  &__initials {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    background: #BB96DF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    font-size: 30px;
    font-weight: 500;
    position: relative;
  }
  &__image {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    background-position: center;
    background-size: cover;
    margin: 0 auto 24px;
    position: relative;
  }
  &__verified {
    position: absolute;
    top: -5px;
    left: -5px;
    height: 40px;
    width: 40px;
  }
  &__level {
    display: flex;
    align-items: center;
    gap: 5px;
    &-icon {
      height: 32px;
    }
  }
  &__date {
    color: #F1F1F1;
    font-size: 16px;
    margin-bottom: 24px;
  }
  &__name {
    margin-bottom: 12px;
  }
  &__info {
    display: flex;
    justify-content: space-between;
    text-align: left;
    font-size: 16px;
    align-items: center;

    &-balance {
      font-size: 20px;
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      &__level {
        font-weight: 700;
        color: var(--warning-text-color)
      }
    }

    &.soon {
      color: #848484;
      span {
        background: var(--warning-text-color);
        padding: 1px 4px;
        border-radius: 4px;
        color: #191919;
      }
    }

    &:first-child {
      font-weight: 500;
    }
    &:not(:last-child) {
      margin-bottom: 14px;
    }
  }
}

.button-block {
  display: grid;
  row-gap: 15px;
}

</style>