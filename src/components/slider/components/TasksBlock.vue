<template>
  <div class="tasks">
    <div class="tasks__item">
      <div class="tasks__item__laptop">
        <img src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/slider/laptop.png" alt="laptop">
      </div>
      <div/>
      <div class="tasks__item__info">
        <div class="title">AVA TASKS</div>
        <div class="subtitle">You have last chance to get more AVA tokens before listing</div>
      </div>
    </div>
    <div class="tasks__item__img">
      <img src="https://s3.timeweb.cloud/44e04f9b-avacoin/production/assets/images/slider/tasks-img.png" alt="img">
    </div>
    <AvaButton block vibrationType="success" @click="router.push('/tasks')">Go tasks</AvaButton>
  </div>
</template>
<script setup lang="ts">
import AvaButton from '@/components/AvaButton.vue';
import router from '@/router';
</script>

<style lang="scss" scoped>
.tasks {
  width: calc(100vw - 32px);
  background: linear-gradient(245.31deg, rgba(255, 255, 255, 0.8) 37.88%, rgba(255, 255, 255, 0.48) 118.16%);
  padding: 16px 22px;
  border-radius: 24px;
  max-height: 250px;
  margin-top: 35px;

  &__item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    position: relative;

    &__laptop {
      position: absolute;
      top: -100px;
      left: -180px;

      img {
        width: 45%;
      }
    }

    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 24.2px;
      text-align: start;
      color: #000000;
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 16px;
      font-weight: 400;
      line-height: 19.36px;
      letter-spacing: -0.02em;
      text-align: left;
      color: #515151;
    }

    &__img img{
      width: calc(100% + 20px);
      padding: 12px 0;
    }
  }
}
</style>