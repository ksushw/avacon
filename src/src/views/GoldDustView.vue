<script lang="ts" setup>
import { BackButton } from 'vue-tg';
import router from '@/router';
import AvaButton from '@/components/AvaButton.vue';
import { useRootStore } from '@/stores/root';
import { ref } from 'vue';
import { useNotificationStore } from '@/stores/notification';
import { useAxios } from '@/composables/useAxios';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import VerificationIcon from '@/components/icons/VerificationIcon.vue';
import AvaNumberCounter from '@/components/AvaNumberCounter.vue';
import AvaBottomDrawer from '@/components/AvaBottomDrawer.vue';
import CongratulationsLeafsAnimation from '@/components/CongratulationsLeafsAnimation.vue';

const root = useRootStore();
const notificationStore = useNotificationStore();

const grCount = ref(1);
const rate = ref(800000);

const visibleModal = ref(false);
const isLoading = ref(false);

async function swapGolds() {
  try {
    isLoading.value = true;
    await useAxios('/user/coins/swap/golds', {
      method: 'POST',
      data: { golds: grCount.value }
    })
    isLoading.value = false;
    visibleModal.value = true;
    notificationStore.push({
      message: 'Success!',
      type: 'info'
    })
    root.fetchUser()
  } catch (e) {
    isLoading.value = false;
    notificationStore.push({
      message: (e as any)?.response?.data?.detail ?? '',
      type: 'danger'
    })
  }
}
</script>

<template>
  <BackButton
      @click="router.go(-1)"
  />
  <div class="gold-dust page">
    <div>
      <div class="gold-dust__title">Swap dust into gold </div>
      <div class="gold-dust__text">
        Exchange dust for gold and get more advantages in the game, or withdraw to USDT
      </div>
      <div class="gold-dust__card">
        <div class="gold-dust__card__info">
          <span>Current rate:</span>
          <span>
            <img class="profile__coin" src="@/assets/images/mini-coin.png" alt="coin">
            <b> &nbsp;{{ rate.toLocaleString('en-EN') }} = </b>
            <img class="profile__coin" src="@/assets/images/icons/gold.svg" alt="gold">
            <b> 1</b>
          </span>
        </div>

        <div class="gold-dust__card__info">
          <span>Collected gold dust:</span>
          <span>
            <img class="profile__coin" src="@/assets/images/mini-coin.png" alt="coin">
            <b v-if="root.user">&nbsp;{{ (root.user?.coins + root.user?.coins_legit)?.toLocaleString('en-EN') ?? 0 }}</b>
          </span>
        </div>

        <div class="gold-dust__card__info">
          <span>Legalized ref dust:</span>
          <span>
            <img class="profile__coin" src="@/assets/images/mini-coin.png" alt="best">
            <b> {{ root.user?.coins_legit?.toLocaleString('en-EN') ?? 0 }}</b>
          </span>
        </div>

        <div class="gold-dust__card__info">
         <div> <VerificationIcon/></div>
          <div>You can swap dust only from your verificated frens
            <router-link to="/frens" class="link">Watch frens list <ArrowIcon/></router-link>
          </div>
        </div>

        <div class="gold-dust__card__info">
          <AvaNumberCounter v-model="grCount"/>
        </div>

        <div class="gold-dust__card__info__text">
          Enter the amount of dust you want to swap
        </div>

      </div>
      <div class="gold-dust__bear">
        <img src="@/assets/images/bear-with-gold.png" alt="bear"/>
      </div>
    </div>
    <AvaButton
      v-if="root.user"
      :loading="isLoading"
      :disabled="root.user.coins_legit < grCount * rate || grCount < 1"
      @click="swapGolds"
      block
      type="warning"
    >
      Swap {{ (rate * grCount).toLocaleString('en-EN') }} dust to {{ grCount }} gram
    </AvaButton>
  </div>

  <AvaBottomDrawer v-model="visibleModal">
    <section class="drawer__info info text-center">
      <CongratulationsLeafsAnimation class="info__anim" />
      <div class="info__title">
        Congratulations, you have swap dust into gold
      </div>

      <div class="info__card__icon">
        <img src="@/assets/images/bear-with-gold.png" alt="bear" />
      </div>

      <AvaButton
          block
          type="primary"
          @click="router.push('/profile')"
      >
        Return to profile
      </AvaButton>
    </section>
  </AvaBottomDrawer>

</template>

<style lang="scss" scoped>
.drawer__info {
  .info {
    &__title {
      color: #000000;
      font-size: 32px;
      font-weight: 700;
      margin-top: 15px;
    }
    &__card__icon img {
      width: 60%;
      margin-bottom: 16px;
    }
  }
}
.gold-dust {
  height: 100vh;
  max-height: 100vh;
  background: #F0EFF5;
  padding: 24px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  &__bear {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;

    img{
      width: 60%;
    }
  }

  &__title {
    font-size: 32px;
    font-weight: 500;
    color: #000000;
    text-align: center;
  }

  &__text {
    margin-top: 15px;
    font-size: 16px;
    font-weight: 400;
    color: #8E8E8E;
    text-align: center;
  }

  &__subtitle{
    font-size: 14px;
    font-weight: 400;
    color: #8F8F8F;
    &.right {
      text-align: right;
    }
  }

  &__card {
    background: #6262621A;
    padding: 16px;
    border-radius: 24px;
    margin-top: 24px;
    margin-bottom: 25px;
    color: #000000;
    &__info {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      column-gap: 10px;

      &__text {
        font-size: 14px;
        font-weight: 400;
        color: #8F8F8F;
      }

      &:not(:last-child) {
        margin-bottom: 24px;
      }

      .link {
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        color: #007AFF;
        text-align: center;
        margin-top: 12px;
        text-decoration: none;
      }
    }
  }
}

</style>