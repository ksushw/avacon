<script setup lang="ts">

import { useBoosterStore } from '@/stores/booster';
import { ref } from 'vue'

const booster = useBoosterStore()

const audio = ref<HTMLAudioElement>()

function activate() {
  if (audio.value && !booster.disabled) {
    console.log(audio.value)
    audio.value?.play()
  }
  setTimeout(() => {
    audio.value?.pause()
  }, 2000)
  booster.activate()
}

</script>

<template>
  <section
    :class="['booster-activate', { disabled: booster.disabled || booster.active }]"
    @click="activate()"
  >
    <div class="booster-activate__rings">
      <div class="ring red"></div>
      <div class="ring green"></div>
      <div class="ring blue"></div>
      <div class="ring yellow"></div>
    </div>
    <img class="booster-activate__mol" src="@/assets/images/booster/molot.png" alt="mol">
  </section>

  <audio ref="audio" class="sound">
    <source src="/zvuk-monety.mp3" type="audio/mpeg">
  </audio>
</template>

<style scoped lang="scss">
.sound {
  visibility: hidden;
}
.booster-activate {
  width: 61px;
  height: 61px;
  border-radius: 0 24px 24px 0;
  position: fixed;
  left: 0;
  top: 130px;
  z-index: 10;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  &.disabled &__rings {
    display: none;
  }
  &.disabled &__mol {
    opacity: 0.3;
  }
  &__mol{
    height: 32px;
  }

  .ring {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    position: absolute;
    mix-blend-mode: screen;
    top: 8px;
    left: 8px;
    background: transparent;
  }

  .red {
    border: 40px * 0.06 solid #d50f1c;
    animation: redanim linear 6s;
    animation-iteration-count: infinite;
  }
  .green {
    border: 40px * 0.06 solid #009927;
    animation: greenanim linear 6s;
    animation-iteration-count: infinite;
  }
  .blue {
    border: 40px * 0.06 solid #3569e1;
    animation: blueanim linear 6s;
    animation-iteration-count: infinite;
  }
  .yellow {
    border: 40px * 0.06 solid #edb40f;
    animation: yellowanim linear 6s;
    animation-iteration-count: infinite;
  }

  @keyframes redanim{
    0%   {transform:  rotate(0deg)   scaleX(0.90) scaleY(1.00);}
    50%  {transform:  rotate(180deg) scaleX(0.90) scaleY(1.00);}
    100% {transform:  rotate(360deg) scaleX(0.90) scaleY(1.00);}
  }

  @keyframes greenanim{
    0%   {transform:  rotate(31deg)  scaleX(0.90) scaleY(1.00);}
    25%  {transform:  rotate(121deg) scaleX(1.00) scaleY(0.90);}
    50%  {transform:  rotate(211deg) scaleX(0.90) scaleY(1.00);}
    75%  {transform:  rotate(301deg) scaleX(1.00) scaleY(0.90);}
    100% {transform:  rotate(391deg) scaleX(0.90) scaleY(1.00);}
  }

  @keyframes blueanim{
    0%   {transform:  rotate(413deg) scaleX(0.90) scaleY(1.00);}
    50%  {transform:  rotate(233deg) scaleX(0.90) scaleY(1.00);}
    100% {transform:  rotate(53deg)  scaleX(0.90) scaleY(1.00);}
  }

  @keyframes yellowanim{
    0%   {transform:  rotate(472deg) scaleX(0.90) scaleY(1.00);}
    25%  {transform:  rotate(382deg) scaleX(1.00) scaleY(0.90);}
    50%  {transform:  rotate(292deg) scaleX(0.90) scaleY(1.00);}
    75%  {transform:  rotate(202deg) scaleX(1.00) scaleY(0.90);}
    100% {transform:  rotate(112deg) scaleX(0.90) scaleY(1.00);}
  }
}
</style>