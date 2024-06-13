<template>
  <div class="apps">
    <div class="apps__item">
      <div class="apps__item__info">
        <img src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/slider/apps-info.png" alt="apps">
      </div>
      <div class="apps__item__icons">
        <img src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/slider/apps-icons.png" alt="apps">
      </div>
    </div>
    <AvaButton block @click="router.push('/apps')">Go Apps</AvaButton>
  </div>
</template>
<script setup lang="ts">
import AvaButton from '@/components/AvaButton.vue';
import router from '@/router';
</script>

<style lang="scss" scoped>
.apps {
  width: calc(100vw - 32px);
  background: #000000;
  padding: 16px 22px;
  border-radius: 24px;
  max-height: 250px;
  margin-top: 35px;

  &__item {
    display: grid;
    grid-template-columns: 150px 1fr;
    column-gap: 30px;
    margin-bottom: 18px;

    &__info {
      height: fit-content;
      img {
        width: 150px;
      }
    }

    &__icons {
      height: fit-content;
      img {
        width: calc(100vw - 170px);
        max-height: 170px;
        margin-top: -16px;
      }
    }
  }
}
</style>