<script setup lang="ts">

</script>

<template>
  <div class="invite">
    <div class="invite__coin">
      <img src="@/assets/images/click-coin.png" alt="coin">
    </div>
    <div class="invite__content">
      <div class="invite__title">Invite fren</div>
      <div class="invite__text">
        And earn 30 AvaCoin <img src="@/assets/images/mini-coin.png" alt="coin">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.invite {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  &__title {
    margin-bottom: 4px;
  }
  &__text {
    display: flex;
    align-items: center;
    gap: 4px;
    img {
      height: 16px;
    }
  }
  &__coin {
    img {
      width: 48px;
    }
  }
}
</style>