<script setup lang="ts">

import { ref, watchEffect } from 'vue'

const animBg = ref<HTMLElement>()

const colors = ['#fce18a', '#ff726d', '#b48def', '#f4306d', '#15EC49'];

function generateLeaf() {
  if (animBg.value) {
    const el = document.createElement('div');
    const size = `${Math.floor(Math.random() * 3) + 9}px`;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = `${Math.floor(Math.random() * animBg.value.offsetWidth)}px`;
    const animationDuration = Math.floor(Math.random() * 2) + 1; // 2-4 секунды
    const rotate = Math.floor(Math.random() * 10) - 5; // Вращение в пределах -5° - 5°

    el.classList.add('confetti', `confetti--animation-slow`);
    el.style.cssText = `
    left: ${left};
    width: ${size};
    height: ${size};
    background-color: ${color};
    transform: rotate(${rotate}deg);
  `;

    animBg.value.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, animationDuration * 500);
  }
}

async function startSnowfall() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    for (let i = 0; i < 10; i++) {
      generateLeaf();
      await wait()
    }
  }
}

async function wait() {
  return new Promise(resolve => setTimeout(resolve, Math.random() * 200))
}

watchEffect(() => {
  startSnowfall()
})

</script>

<template>
  <div ref="animBg"></div>
</template>

<style scoped lang="scss">

</style>