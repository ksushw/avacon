<script setup lang="ts">
import { ref, watch } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { useRootStore } from '@/stores/root'
import { useBoosterStore } from '@/stores/booster'
import { useSkinStore, defaultSkin } from '@/stores/skin'
import { usePoints } from '@/composables/usePoints'
import AvaSkin from '@/components/skins/AvaSkin.vue'

const router = useRouter()

const counterStore = useCounterStore()
const clickerStore = usePoints()
const skinStore = useSkinStore()
const rootStore = useRootStore()
const boosterStore = useBoosterStore()

skinStore.getSelectedSkin()

const clickableZoneEl = ref<HTMLElement>()

function onClickHandler(event: TouchEvent) {
  if (!clickerStore.isCanClick()) return

  animateClick(clickableZoneEl.value?.querySelector('[data-clickable]') as HTMLElement, event)
}
function onTouchHandler(event: TouchEvent) {
  if (!clickableZoneEl.value) return

  const target = clickableZoneEl.value?.querySelector('[data-clickable]') as HTMLElement
  target.style.transform = 'rotateY(0deg)'
  if (!clickerStore.isCanClick()) {
    router.push('/limit')
    return
  }

  clickerStore.watch()

  vibrate()

  for (const touch of event.changedTouches) {
    counterStore.increment()
    createElement(touch.clientX, touch.clientY)
  }
}

function vibrate() {
  window.navigator?.vibrate?.(20)
}

function animateClick(target: HTMLElement | undefined, event: TouchEvent) {
  if (!target) {
    return
  }
  // Custom animation for this skin
  else if (target.getAttribute('data-custom-clicked') === 'true') {
    customAnimateClick(target)
    return
  }

  const rect = target.getBoundingClientRect()
  const offsetX = event.touches[0].pageX - rect.left
  const offsetY = event.touches[0].pageY - rect.top

  const centerX = target.offsetWidth / 2
  const centerY = target.offsetHeight / 2

  const deltaX = offsetX - centerX
  const deltaY = offsetY - centerY

  const x = deltaY / centerY
  const y = -deltaX / centerX

  defaultAnimateClick(target, x, y)
}

function customAnimateClick(target: HTMLElement) {
  target.classList.add('is-clicked')
  setTimeout(() => {
    target.classList.remove('is-clicked')
  }, 150)
}

function defaultAnimateClick(target: HTMLElement, x: number, y: number) {
  target.style.transform = `rotate3d(${x}, ${y}, 0, -13deg)`
}

function randomBetween(arr: number[]) {
  const range = arr[1] - arr[0] + 1
  return Math.floor(Math.random() * range) + arr[0]
}

function randomElements() {
  if (!clickableZoneEl.value) return

  const offset = (window.innerWidth - 274) / 2
  const x = randomBetween([offset, offset + 274])
  const y = randomBetween([310, 540])
  const size = randomBetween([25, 48])

  createElement(x, y, size)
}

const showShimmer = ref(false)
function animateBooster(target: HTMLElement) {
  if (!boosterStore.active) return

  randomElements()

  setTimeout(() => {
    animateBooster(target)
  }, 50)

  setTimeout(() => {
    if (target.getAttribute('data-custom-clicked') === 'true') {
      customAnimateClick(target)
    } else {
      defaultAnimateClick(target, randomBetween([-0.6, 0.6]), randomBetween([-0.5, 0.5]))
    }
    vibrate()
  }, 200)
}

watch(
  () => boosterStore.active,
  (value) => {
    const target = clickableZoneEl.value?.querySelector('[data-clickable]') as HTMLElement
    if (!target) return

    if (value) {
      showShimmer.value = target.getAttribute('data-custom-boosted') !== 'true'

      animateBooster(target)
      target.classList.add('is-boosted')
    } else {
      showShimmer.value = false
      target.classList.remove('is-boosted')
    }

    //if (!clickerStore.canClick && clickableZoneEl.value) {
    //  clickableZoneEl.value.src = blockedCoinImage
    //}
  }
)

function createElement(x: number, y: number, size = 40) {
  const randomNumber = Math.floor(Math.random() * 11) - 8

  const animationElement = document.createElement('div')
  animationElement.className = 'one'
  animationElement.textContent = '1'
  animationElement.style.left = `${x + randomNumber}px`
  animationElement.style.top = `${y - 60}px`
  animationElement.style.fontSize = `${size}px`
  document.body.appendChild(animationElement)

  animateElement(animationElement)
}

function animateElement(element: HTMLElement) {
  let startTime: number
  const duration = 1200

  // Animate number movement & disappearing
  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const progress = timestamp - startTime
    const percentage = Math.min(progress / duration, 1)

    element.style.top = `${parseInt(element.style.top) - percentage * 5}px`
    element.style.opacity = String(1 - percentage)

    if (percentage < 1) {
      requestAnimationFrame(step)
    } else {
      element?.remove()
    }
  }

  requestAnimationFrame(step)
}

onBeforeRouteLeave(async () => {
  if (clickerStore.points.value > 0) {
    await clickerStore.sendPoints()
  }
})
</script>

<template>
  <section class="click-coin">
    <div
      v-if="rootStore.userLoading"
      class="click-coin__loader"
    ></div>
    <div class="click-coin__shadow"></div>
    <div v-if="showShimmer" class="click-coin__shimmer"></div>

    <div class="click-coin__clickable" ref="clickableZoneEl" >
      <AvaSkin
        :blocked="!clickerStore.isCanClick()"
        :skin="defaultSkin"
        @touchstart.prevent="onClickHandler"
        @touchend.prevent="onTouchHandler"
      />
    </div>
  </section>
</template>

<style lang="scss">
.one {
  font-weight: 600;
  position: absolute;
  z-index: 5;
  color: #ffffff;
  height: 1px;
  pointer-events: none;
}
:root {
  --glow-hue: 222deg;
  --shadow-hue: 180deg;
  --spring-easing: linear(
    0,
    0.002,
    0.01 0.9%,
    0.038 1.8%,
    0.156,
    0.312 5.8%,
    0.789 11.1%,
    1.015 14.2%,
    1.096,
    1.157,
    1.199,
    1.224 20.3%,
    1.231,
    1.231,
    1.226,
    1.214 24.6%,
    1.176 26.9%,
    1.057 32.6%,
    1.007 35.5%,
    0.984,
    0.968,
    0.956,
    0.949 42%,
    0.946 44.1%,
    0.95 46.5%,
    0.998 57.2%,
    1.007,
    1.011 63.3%,
    1.012 68.3%,
    0.998 84%,
    1
  );
  --spring-duration: 1.33s;
}

@property --shimmer {
  syntax: '<angle>';
  inherits: false;
  initial-value: 33deg;
}
</style>

<style scoped lang="scss">
.click-coin {
  width: 100%;
  max-width: 274px;
  margin: 10px auto;
  user-select: none;
  position: relative;
  min-height: 274px;

  @media (max-height: 700px) {
    max-width: 230px;
    min-height: 230px;
  }

  @media (max-height: 640px) {
    max-width: 200px;
    min-height: 200px;
  }

  @media (max-height: 600px) {
    max-width: 170px;
    min-height: 170px;
  }

  &__shimmer {
    width: 354px;
    height: 374px;
    position: absolute;
    z-index: 10;
    inset: -40px;
    transition: all var(--spring-duration) var(--spring-easing);
    mask-image: conic-gradient(
      from var(--shimmer, 0deg),
      transparent 0%,
      transparent 10%,
      black 36%,
      black 45%,
      transparent 50%,
      transparent 60%,
      black 85%,
      black 95%,
      transparent 100%
    );
    mask-size: cover;
    animation: shimmer 1s linear infinite both;
    left: -40px;
    right: 0;
    border-radius: 100%;
    &::after,
    &::before {
      opacity: 1;
      animation: shine 1.2s ease-in infinite;
      transition: all 0.5s ease;
      content: '';
      border-radius: inherit;
      position: absolute;
      mix-blend-mode: color;
      inset: 40px;
      pointer-events: none;
    }
    &::before {
      box-shadow:
        0 0 3px 2px hsl(var(--glow-hue) 20% 95%),
        0 0 7px 4px hsl(var(--glow-hue) 20% 80%),
        0 0 13px 4px hsl(var(--glow-hue) 50% 70%),
        0 0 25px 5px hsl(var(--glow-hue) 100% 70%);
      z-index: -1;
    }
    &::after {
      box-shadow:
        inset 0 0 0 1px hsl(var(--glow-hue) 70% 95%),
        inset 0 0 2px 1px hsl(var(--glow-hue) 100% 80%),
        inset 0 0 5px 2px hsl(var(--glow-hue) 100% 70%);
      z-index: 2;
    }
  }
  &__loader {
    width: 274px;
    height: 290px;
    position: absolute;
    left: 0;
    right: 0;
    background: linear-gradient(90deg, transparent 25%, #1f1f1f66 37%, transparent 63%);
    overflow: hidden;
    background-size: 400% 100%;
    animation: el-skeleton-loading 1.4s ease infinite;
    border-radius: 100%;
    z-index: 2;

    @media (max-height: 700px) {
      width: 230px;
      height: 230px;
    }

    @media (max-height: 640px) {
      width: 200px;
      height: 200px;
    }

    @media (max-height: 600px) {
      width: 170px;
      height: 170px;
    }
  }
  &__shadow {
    box-shadow: 0 0 167px 73px #ffffff;
    background-color: rgba(255, 255, 255, 0.6);
    border: none;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1px;
    height: 1px;
    border-radius: 20px;
    transform: translate(-50%);
    z-index: 0;
  }
  &__clickable {
    width: 100%;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    user-select: none;
    position: relative;
    z-index: 1;
    transition: 0.1s linear transform;
  }
}

@keyframes shimmer {
  0% {
    --shimmer: 0deg;
  }
  100% {
    --shimmer: 360deg;
  }
}

@keyframes shine {
  0% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  55% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
