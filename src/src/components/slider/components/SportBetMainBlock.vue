<template>
  <div class="bet-slide">
    <AvaButton size="xs" type="green" class="btn" block :small="true">
      <div @click="router.push('/avabet')" class="btn-content">
        Make a bet
        <img src="@/assets/images/icons/coins-black.svg" alt="coins">
      </div>
    </AvaButton>
  </div>
</template>

<script setup lang="ts">
import AvaButton from '@/components/AvaButton.vue';
import router from '@/router';
</script>

<style lang="scss" scoped>
.bet-slide {
  height: 250px;
  background: url("@/assets/images/stacking/bet-bg.png") no-repeat left top;
  background-size: 390px;
  width: calc(100vw - 32px);
  padding: 16px 22px;
  border-radius: 24px;
  max-height: 250px;
  margin-top: 35px;
  max-width: 384px;

  @media (max-height: 500px) {
    border-radius: 15px;
    padding: 0px 5px;
    height: 161px;
    margin-top: 25px;
    margin-bottom: 5px;
    background-size: 100%;
    margin-bottom: 0px;
  }

  .btn {
    margin-top: 180px;

    @media (max-height: 500px) {
      margin-top: 124px;
    }
  }

  .btn-content {
    display: flex;
    align-items: center;
    column-gap: 10px;
    justify-content: center;
  }
}
</style>