<script setup lang="ts">
import activeSkinImage from '@/assets/images/khachapuri-coin.png'

// TODO: add idle animation (fly from center)
// https://codepen.io/v_Bauer/details/zYrBoJa
// https://codepen.io/gambhirsharma/pen/OJGjGZd

defineProps<{
  blocked: boolean
}>()
</script>

<template>
  <div class="khachapuri" :data-clickable="true" :data-custom-boosted="true">
    <img :src="activeSkinImage" alt="Clickable khachapuri coin" class="icon" />

    <div class="khachapuri__steam-wrapper">
      <div class="khachapuri__steam"></div>
    </div>

    <svg width="0" height="0">
      <filter id="fog">
        <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="10" />
        <feDisplacementMap in="SourceGraphic" scale="180" />
      </filter>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.khachapuri {
  width: 100%;

  &.is-boosted > img {
    animation: spin 3s infinite linear;
  }
  &.is-boosted > .khachapuri__steam-wrapper {
    display: flex;
  }

  & > img {
    width: 100%;
  }
}

@keyframes spin {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
}

.khachapuri__steam-wrapper {
  width: 50%;
  height: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 100;
  display: none;
  justify-content: center;
  align-items: center;
}

.khachapuri__steam {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: -156px 492px 123px -252px #fff;
  filter: url(#fog);
  min-width: 600px;
  min-height: 600px;
  animation-name: steamAnimation;
  animation-duration: 2s;
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  will-change: transform, opacity;
}

@keyframes steamAnimation {
  0% {
    transform: translate(30%, -70%);
    opacity: 0.2;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translate(50%, -120%);
    opacity: 0;
  }
}
</style>
