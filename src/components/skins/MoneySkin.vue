<script setup lang="ts">
// TODO: booster effect https://codepen.io/thejacobdev/pen/OJJKPxz

defineProps<{
  blocked: boolean
}>()
</script>

<template>
  <div
    class="money plastic"
    :data-clickable="true"
    :data-custom-clicked="true"
    :data-custom-boosted="true"
  >
    <div class="money__inner plastic">
      <p>MONEY</p>
    </div>
    <div class="money__animation">
      <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i
      ><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i
      ><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i
      ><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i
      ><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i
      ><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i
      ><i></i><i></i><i></i><i></i><i></i><i></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.money {
  width: 100%;

  background: #cc0000;
  border-radius: 50%;
  display: block;
  height: 260px;
  margin-top: 40px;
  position: relative;
  width: 260px;
  z-index: 20;

  &.is-clicked &__inner {
    box-shadow:
      0 0 0.5em rgba(0, 0, 0, 1),
      inset 0 0.1em 0.3em rgba(0, 0, 0, 0.5),
      inset 0 -0.1em 0.3em rgba(0, 0, 0, 0.5);
    &:before {
      top: 12%;
    }
  }

  &.is-boosted &__animation {
    display: block;
  }
}

.money__inner {
  border-radius: 50%;
  box-shadow:
    0 0 0.5em rgba(0, 0, 0, 1),
    inset 0 0.25em 0.3em rgba(255, 255, 255, 0.3),
    inset 0 -0.25em 0.3em rgba(0, 0, 0, 0.5);
  cursor: pointer;
  height: 100%;
  padding: 0;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;

  &:before {
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.14) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 50%;
    content: ' ';
    height: 80%;
    left: 10%;
    position: absolute;
    top: 10%;
    width: 80%;
  }
}

.plastic {
  background: linear-gradient(to bottom, #b01e1e 0%, #920f0f 100%);
}

.money__animation {
  display: none;
  width: 100%;
  height: 1200px;
  position: fixed;
  top: -200px;
  left: 0;

  i {
    display: inline-block;
    animation: money 3s linear 2s 20;
    animation-delay: 3s;
    position: relative;
    background-image: url('data:image/svg+xml,%3Csvg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"%3E%3Cg%3E%3Cg%3E%3Cpath style="fill:%2374D24F;" d="M496,112H16c-8.82,0-16,7.18-16,16v256c0,8.82,7.18,16,16,16h480c8.82,0,16-7.18,16-16V128 C512,119.18,504.82,112,496,112z"/%3E%3C/g%3E%3Cg%3E%3Cpath style="fill:%23FFEFBC;" d="M472,192c-22.055,0-40-17.945-40-40c0-4.422-3.578-8-8-8H88c-4.422,0-8,3.578-8,8 c0,22.055-17.945,40-40,40c-4.422,0-8,3.578-8,8v112c0,4.422,3.578,8,8,8c22.055,0,40,17.945,40,40c0,4.422,3.578,8,8,8h336 c4.422,0,8-3.578,8-8c0-22.055,17.945-40,40-40c4.422,0,8-3.578,8-8V200C480,195.578,476.422,192,472,192z"/%3E%3C/g%3E%3Cg%3E%3Cpath style="fill:%23869B55;" d="M128,256c0,48.221,26.691,90.175,66.081,112h123.839C357.309,346.175,384,304.221,384,256 s-26.691-90.175-66.081-112H194.08C154.691,165.825,128,207.779,128,256z"/%3E%3C/g%3E%3Cg%3E%3Cpath style="fill:%23FFEFBC;" d="M256,244c-16.023,0-28-8.445-28-16c0-7.555,11.977-16,28-16s28,8.445,28,16c0,6.625,5.375,12,12,12 s12-5.375,12-12c0-19.236-16.824-34.862-40-38.932V184c0-6.625-5.375-12-12-12s-12,5.375-12,12v5.068 c-23.176,4.07-40,19.695-40,38.932c0,22.43,22.844,40,52,40c16.023,0,28,8.445,28,16c0,7.555-11.977,16-28,16s-28-8.445-28-16 c0-6.625-5.375-12-12-12s-12,5.375-12,12c0,19.236,16.824,34.862,40,38.932V328c0,6.625,5.375,12,12,12s12-5.375,12-12v-5.068 c23.176-4.07,40-19.695,40-38.932C308,261.57,285.156,244,256,244z"/%3E%3C/g%3E%3Cg%3E%3Ccircle style="fill:%2374D24F;" cx="80" cy="256" r="24"/%3E%3C/g%3E%3Cg%3E%3Ccircle style="fill:%2374D24F;" cx="432" cy="256" r="24"/%3E%3C/g%3E%3Cg%3E%3Ccircle style="fill:%23869B55;" cx="40" cy="152" r="16"/%3E%3C/g%3E%3Cg%3E%3Ccircle style="fill:%23869B55;" cx="472" cy="152" r="16"/%3E%3C/g%3E%3Cg%3E%3Ccircle style="fill:%23869B55;" cx="40" cy="360" r="16"/%3E%3C/g%3E%3Cg%3E%3Ccircle style="fill:%23869B55;" cx="472" cy="360" r="16"/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A');
  }
  i:nth-child(3n) {
    width: 40px;
    height: 40px;
    animation-duration: 4s;
    animation-iteration-count: 30;
    transform-origin: right -45px;
  }
  i:nth-child(3n + 1) {
    width: 50px;
    height: 50px;
    animation-duration: 6s;
    animation-iteration-count: 45;
    transform-origin: right -30px;
  }
  i:nth-child(3n + 2) {
    width: 65px;
    height: 65px;
    animation-duration: 8s;
    animation-iteration-count: 60;
    transform-origin: right -15px;
  }

  /* different delays so they don't all start at the same time */
  i:nth-child(7n) {
    opacity: 0.3;
    animation-delay: 0s;
    animation-timing-function: ease-in;
  }
  i:nth-child(7n + 1) {
    opacity: 0.4;
    animation-delay: 1s;
    animation-timing-function: ease-out;
  }
  i:nth-child(7n + 2) {
    opacity: 0.5;
    animation-delay: 1.5s;
    animation-timing-function: linear;
  }
  i:nth-child(7n + 3) {
    opacity: 0.6;
    animation-delay: 2s;
    animation-timing-function: ease-in;
  }
  i:nth-child(7n + 4) {
    opacity: 0.7;
    animation-delay: 2.5s;
    animation-timing-function: linear;
  }
  i:nth-child(7n + 5) {
    opacity: 0.8;
    animation-delay: 3s;
    animation-timing-function: ease-out;
  }
  i:nth-child(7n + 6) {
    opacity: 0.9;
    animation-delay: 3.5s;
    animation-timing-function: ease-in;
  }
}

@keyframes money {
  0% {
    transform: translate3d(15px, 1200px, 0px) rotate(360deg) scale(0.6);
  }
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg) scale(0.6);
  }
}
</style>
