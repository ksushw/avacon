<script setup lang="ts">
import activeSkinImage from '@/assets/images/avacoinbutton.png'

defineProps<{
  blocked: boolean
}>()
</script>

<template>
  <div class="avacoin" :data-clickable="true" :data-custom-boosted="true">
    <img :src="activeSkinImage" alt="Clickable coin" />
    <div class="avacoin__animation">
      <div class="blip"></div>
      <div class="blip"></div>
      <div class="blip"></div>
      <div class="blip"></div>
      <div class="blip"></div>
      <div class="blip"></div>
      <div class="blip"></div>
      <div class="blip"></div>
      <div class="blip"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.avacoin {
  width: 100%;

  & > img {
    width: 100%;
  }
  &.is-boosted > .avacoin__animation {
    display: flex;
  }
}

.avacoin__animation {
  display: none;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & > .blip {
    position: absolute;
    width: 50px;
    height: 20px;
    left: -50px;
    top: 50px;
    background: #fff;
    border-radius: 40px;
    animation: popping 2s ease-in-out infinite;
    &:nth-of-type(2) {
      left: auto;
      right: -100px;
      top: 100px;
      animation-delay: -1s;
    }
    &:nth-of-type(3) {
      width: 20px;
      animation-delay: -0.5s;
      top: 90px;
      left: -80px;
      &:before {
        display: none;
      }
    }
    &:nth-of-type(4) {
      width: 20px;
      animation-delay: -1.75s;
      top: 40px;
      left: auto;
      right: -70px;
      &:before {
        display: none;
      }
    }
    &:nth-of-type(5) {
      width: 20px;
      animation-delay: -1.15s;
      top: 240px;
      left: -50px;
      &:before {
        display: none;
      }
    }
    &:nth-of-type(6) {
      animation-delay: -0.25s;
      top: 220px;
      left: auto;
      right: -70px;
    }
    @keyframes popping {
      0% {
        transform: scale(0);
      }
      20% {
        transform: scale(1);
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }
    &:before {
      content: '';
      position: absolute;
      background: #fff;
      width: 20px;
      height: 50px;
      top: -75%;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 40px;
    }
  }
}
</style>
