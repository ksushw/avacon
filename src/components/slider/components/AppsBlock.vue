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
    <AvaButton block vibrationType="success" @click="router.push('/apps')">Go Apps</AvaButton>
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

  @media (max-height: 500px) {
    border-radius: 15px;
    padding: 5px 15px;
    height: 155px;
    margin-bottom: 5px;
    overflow: hidden;
  }

  &__item {
    display: grid;
    grid-template-columns: 150px 1fr;
    column-gap: 30px;
    margin-bottom: 18px;

    @media (max-height: 500px) {
      grid-template-columns: 130px 1fr;
      margin-bottom: 3px;
    }


    &__info {
      height: fit-content;

      img {
        width: 150px;

        @media (max-height: 500px) {
          width: 120px;
        }
      }
    }

    &__icons {
      height: fit-content;

      img {
        width: calc(100vw - 170px);
        max-height: 170px;
        margin-top: -16px;

        @media (max-height: 500px) {
          max-height: 114px;
          margin-top: 0px;
        }
      }
    }
  }
}
</style>