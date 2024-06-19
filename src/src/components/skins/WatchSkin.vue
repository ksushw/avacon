<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{
  blocked: boolean
}>()

/**
 * Code pulled out from https://codepen.io/hacker_107/pen/VwYPBmx
 * Hard to migrate fully to Vue syntax, so its uses DOM API
 */
const updateIntervalTime = ref<ReturnType<typeof setInterval>>()
const updateIntervalDay = ref<ReturnType<typeof setTimeout>>()
onMounted(() => {
  // Get current date
  let day = new Date().getDate()
  const out = document.getElementById('date')
  if (out) out.innerHTML = day.toString()

  updateIntervalTime.value = setInterval(() => getTime(), 50)

  function getTime() {
    const d = new Date()
    const s = d.getSeconds() + d.getMilliseconds() / 1000
    const m = d.getMinutes()
    let h = hour12()

    const secEl = document.querySelector('.hand-sec') as HTMLElement
    const minEl = document.querySelector('.hand-min') as HTMLElement
    const hourEl = document.querySelector('.hand-hour') as HTMLElement

    secEl.style.transform = `rotateZ(${s * 6}deg)`
    minEl.style.transform = `rotateZ(${m * 6 + s * 0.1}deg)`
    hourEl.style.transform = `rotateZ(${h * 30 + m * 0.5}deg)`

    function hour12() {
      let hour = d.getHours()
      if (hour >= 12) {
        hour = hour - 12
      }
      if (hour == 0) {
        h = 12
      }
      return hour
    }
  }

  // Rotate day wheel based on day of the week. Thanks Kaa Kihe @simplesessions!
  const ROTATE_DELTA = 51.42857 /* 360 / 7 */
  const getRotateFactor = (d: number) => d * ROTATE_DELTA
  const rotate = (el: HTMLElement) => (el.style.transform = `rotate(-${getRotateFactor(day)}deg)`)

  day = new Date().getDay()
  const dayWrapper = document.querySelector('.day-wrapper')
  if (dayWrapper) rotate(dayWrapper as HTMLElement)

  updateIntervalDay.value = setTimeout(() => {
    const lastDay = day
    day = new Date().getDay()
    if (day !== lastDay) {
      day += 1
      if (dayWrapper) rotate(dayWrapper as HTMLElement)
    }
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(updateIntervalTime.value)
  clearTimeout(updateIntervalDay.value)
})
</script>

<template>
  <div class="watch-skin-crop" :data-clickable="true">
    <div class="watch-skin">
      <div v-for="_ in 4" :key="_" class="lug"></div>
      <div class="lug-bg"></div>
      <div class="band">
        <div class="band-detail-top-center">
          <div class="band-detail-top-brushed"></div>
          <div class="band-detail-top-brushed"></div>
        </div>
        <div class="band-detail-bottom-center">
          <div class="band-detail-bottom-brushed"></div>
          <div class="band-detail-bottom-brushed"></div>
        </div>
      </div>
      <div class="crown">
        <div v-for="_ in 5" :key="_" class="crown-detail"></div>
      </div>
      <div class="bezel">
        <i v-for="_ in 96" :key="_" class="bez"></i>
      </div>
      <div class="face">
        <div class="content-upper">
          <svg
            class="logo"
            width="32"
            height="27"
            viewBox="0 0 32 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.3288 8.07305C24.3017 8.10631 24.275 8.13917 24.2485 8.1717C27.8594 12.0454 30.0312 16.1228 30.0061 18.7014L29.6177 19.0899C29.6431 16.5163 26.8709 13.0589 23.1817 9.28221C23.0788 9.36372 22.9694 9.44382 22.8502 9.52298L22.6563 9.32917C20.813 11.1802 19.1678 12.8129 17.7173 14.2375C21.8336 18.4598 23.8915 20.737 24.218 21.1743L23.4116 21.9807C22.974 21.654 20.6924 19.592 16.4612 15.4667C12.2302 19.5918 9.94859 21.6538 9.51079 21.9807L8.70436 21.1743C9.03073 20.7372 11.0887 18.46 15.2051 14.2375C13.7546 12.8129 12.1093 11.1802 10.266 9.3291L10.0722 9.52297C9.95262 9.44361 9.84301 9.36331 9.73997 9.28167C6.06809 13.0328 3.28408 16.4617 3.26335 19.0486L2.875 18.6602C2.8962 16.0679 5.07598 12.0155 8.67245 8.17001C8.64407 8.13523 8.61543 8.10005 8.5864 8.0644C8.54729 8.01637 8.50748 7.96748 8.4667 7.91757L8.66634 7.71793C8.4294 7.47857 8.19031 7.23693 7.94747 6.991L7.94916 6.9893C8.46076 6.47784 8.71662 6.22204 9.22824 5.71022C9.47418 5.953 9.71588 6.19215 9.95517 6.4291L10.1548 6.22945C10.2078 6.27276 10.2596 6.31493 10.3105 6.35635C10.3437 6.38339 10.3765 6.41011 10.409 6.43661C12.1337 4.82893 13.8988 3.50653 15.5539 2.53627C14.1114 1.59415 12.7902 1.03529 11.6365 1.02605L12.0249 0.637695C13.2446 0.64767 14.7876 1.13554 16.4802 2.02403C18.18 1.14185 19.7253 0.667165 20.9387 0.67894L21.3272 1.06736C20.1782 1.05601 18.853 1.6023 17.4019 2.53887C19.0492 3.51303 20.8027 4.83363 22.5151 6.43514C22.5499 6.40673 22.5851 6.37805 22.6208 6.34898C22.6688 6.30991 22.7176 6.27014 22.7675 6.2294L22.9672 6.42904C23.2065 6.1921 23.4481 5.95301 23.6941 5.71016C24.2067 6.22289 24.4625 6.47875 24.9749 6.99094C24.7321 7.23687 24.4929 7.47858 24.256 7.71787L24.4556 7.91751C24.4124 7.97044 24.3702 8.02221 24.3288 8.07305ZM16.475 3.17649C18.0155 4.30785 19.6753 5.81103 21.4034 7.50266C21.3218 7.6057 21.2415 7.71532 21.1621 7.83486L21.356 8.02874C19.5108 9.86615 17.8826 11.5068 16.4612 12.954C15.0398 11.5068 13.4116 9.86619 11.5665 8.02879L11.7603 7.83492C11.6811 7.71564 11.601 7.60623 11.5195 7.50339C13.2573 5.80587 14.9274 4.3025 16.475 3.17649Z"
                fill="#3A2A25"
              />
            </g>
          </svg>

          <p class="name">Oyster Perpetual<br />Day &mdash; Date</p>
        </div>
        <div class="content-lower">
          <p class="sub-fine">Superlative Chronometer<br />Officially Certified</p>
        </div>
        <div class="gradient-overlay"></div>
        <div class="black-outline">
          <div v-for="_ in 30" :key="_" class="outline-details"></div>
        </div>
        <div class="five-minute">
          <div v-for="_ in 5" :key="_" class="five-minute-markers"></div>
        </div>
        <div class="date-window"></div>
        <div class="date-window-texture"></div>
        <div id="date"></div>
        <div class="day-window-border">
          <div class="day-window">
            <div class="day-wrapper">
              <div class="day">
                <div class="text-wrapper">
                  <span class="char0">M</span><span class="char1">o</span
                  ><span class="char2">n</span><span class="char3">d</span
                  ><span class="char4">a</span><span class="char5">y</span>
                </div>
              </div>
              <div class="day">
                <div class="text-wrapper">
                  <span class="char0">T</span><span class="char1">u</span
                  ><span class="char2">e</span><span class="char3">s</span
                  ><span class="char4">d</span><span class="char5">a</span
                  ><span class="char6">y</span>
                </div>
              </div>
              <div class="day">
                <div class="text-wrapper">
                  <span class="char0">W</span><span class="char1">e</span
                  ><span class="char2">d</span><span class="char3">n</span
                  ><span class="char4">e</span><span class="char5">s</span
                  ><span class="char6">d</span><span class="char7">a</span>
                  <span class="char8">y</span>
                </div>
              </div>
              <div class="day">
                <div class="text-wrapper">
                  <span class="char0">T</span><span class="char1">h</span
                  ><span class="char2">u</span><span class="char3">r</span
                  ><span class="char4">s</span><span class="char5">d</span
                  ><span class="char6">a</span><span class="char7">y</span>
                </div>
              </div>
              <div class="day">
                <div class="text-wrapper">
                  <span class="char0">F</span><span class="char1">r</span
                  ><span class="char2">i</span><span class="char3">d</span
                  ><span class="char4">a</span><span class="char5">y</span>
                </div>
              </div>
              <div class="day">
                <div class="text-wrapper">
                  <span class="char0">S</span><span class="char1">a</span
                  ><span class="char2">t</span><span class="char3">u</span
                  ><span class="char4">r</span><span class="char5">d</span
                  ><span class="char6">a</span><span class="char7">y</span>
                </div>
              </div>
              <div class="day">
                <div class="text-wrapper">
                  <span class="char0">S</span><span class="char1">u</span
                  ><span class="char2">n</span><span class="char3">d</span
                  ><span class="char4">a</span><span class="char5">y</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hand-hour">
          <div class="shadow"></div>
        </div>
        <div class="hand-min">
          <div class="shadow"></div>
        </div>
        <div class="hand-sec">
          <div class="shadow"></div>
        </div>
      </div>
    </div>
    <div class="watch-skin__animation">
      <span class="wrap" aria-hidden="true"
        ><span
          class="particle"
          style="--a: -45deg; --x: 53%; --y: 15%; --d: 4em; --f: 0.7; --t: 0.15"
        ></span
        ><span
          class="particle"
          style="--a: 150deg; --x: 40%; --y: 70%; --d: 7.5em; --f: 0.8; --t: 0.08"
        ></span
        ><span
          class="particle"
          style="--a: 10deg; --x: 90%; --y: 65%; --d: 7em; --f: 0.6; --t: 0.25"
        ></span
        ><span class="particle" style="--a: -120deg; --x: 15%; --y: 10%; --d: 4em"></span
        ><span
          class="particle"
          style="--a: -175deg; --x: 10%; --y: 25%; --d: 5.25em; --f: 0.6; --t: 0.32"
        ></span
        ><span
          class="particle"
          style="--a: -18deg; --x: 80%; --y: 25%; --d: 4.75em; --f: 0.5; --t: 0.4"
        ></span
        ><span
          class="particle"
          style="--a: -160deg; --x: 30%; --y: 5%; --d: 9em; --f: 0.9; --t: 0.5"
        ></span
        ><span
          class="particle"
          style="--a: 175deg; --x: 9%; --y: 30%; --d: 6em; --f: 0.95; --t: 0.6"
        ></span
        ><span
          class="particle"
          style="--a: -10deg; --x: 89%; --y: 25%; --d: 4.5em; --f: 0.55; --t: 0.67"
        ></span
        ><span
          class="particle"
          style="--a: -140deg; --x: 40%; --y: 10%; --d: 5em; --f: 0.85; --t: 0.75"
        ></span
        ><span
          class="particle"
          style="--a: 90deg; --x: 45%; --y: 65%; --d: 4em; --f: 0.5; --t: 0.83"
        ></span
        ><span
          class="particle"
          style="--a: 30deg; --x: 70%; --y: 80%; --d: 6.5em; --f: 0.75; --t: 0.92"
        ></span
      ></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Day */
@import url('https://fonts.googleapis.com/css?family=Krona+One&display=swap');
/* Text */
@import url('https://fonts.googleapis.com/css?family=Roboto:300i,400&display=swap');
/* Days */
@import url('https://fonts.googleapis.com/css?family=Cousine&display=swap');

/* Band and crown - 316px */
.watch-skin-crop {
  width: 170px;
  height: 220px;
  position: relative;
  overflow: hidden;
  transform: scale(1.2);

  @media (max-height: 700px) {
    width: 160px;
    height: 200px;
  }

  & > .watch-skin__animation {
    display: none;
  }
  &.is-boosted > .watch-skin__animation {
    display: block;
  }
}

.watch-skin {
  position: absolute;
  @extend %ab-center;
  width: 316px;
  height: 316px;
  transform: scale(0.5) translateX(-50%);
}

@property --k {
  syntax: '<number>';
  initial-value: -1;
  inherits: true;
}
$t: 1s;
.watch-skin__animation .particle {
  --m: 1;
  --f: 1;
  --pos-k: max(0, var(--k));
  --neg-k: max(0, -1 * var(--k));
  --low-c: min(1, 4 * (1 - var(--pos-k)));
  --abs-d: max(var(--neg-k) - 0.5, 0.5 - var(--neg-k));
  --mov-f: var(--pos-k);
  display: grid;
  position: absolute;
  left: var(--x);
  top: var(--y);
  rotate: var(--a);
  animation: k calc(var(--m) * #{$t}) linear calc(var(--m) * var(--t, 0) * #{$t}) infinite;
  font-size: 20px;

  @supports (scale: sqrt(4)) {
    --mov-f: sqrt(var(--pos-k));
  }

  &::before,
  &::after {
    grid-area: 1/ 1;
    width: 0.75em;
    aspect-ratio: 1;
  }

  &::before {
    --sa: calc(min(1, 1 - 2 * min(0.5, var(--mov-f))) * 45deg);
    border-radius: calc(1.25 * min(0.8, var(--mov-f)) * 50%) 50% 50%;
    transform-origin: 0 0;
    translate: calc(var(--mov-f) * var(--d));
    rotate: -45deg;
    scale: var(--f);
    transform: skew(var(--sa), var(--sa));
    opacity: var(--low-c);
    filter: Saturate(var(--low-c));
    background: radial-gradient(at 85% 85%, #f1d99c, #feb702 75%);
    content: '';
  }

  &::after {
    translate: -50% -50%;
    scale: calc(var(--f) * (1 - 2 * var(--abs-d)));
    text-align: center;
    filter: blur(0.5px);
    content: '✦';
  }
}

@keyframes k {
  0%,
  33.3% {
    --k: 1;
  }
}

%pseudo {
  content: '';
  display: block;
  position: absolute;
}

%ab-center {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}

$color-text: #100000;
$color-logo: #f2e5b7;

i {
  position: absolute;
  @extend %ab-center;

  &:before,
  &:after {
    @extend %pseudo;
    height: inherit;
    width: inherit;
    border-radius: inherit;
    transform: rotateZ(calc(90deg));
  }
}

/* General frame */
.bezel {
  width: inherit;
  height: inherit;
  border-radius: 100%;
  position: relative;
  background: linear-gradient(to right, #725e32 0%, #e6dfb6 100%);
  box-sizing: initial;

  &:before,
  &:after {
    @extend %pseudo;
    @extend %ab-center;
  }
  &:after {
    height: 278px;
    width: 278px;
    border-radius: inherit;
    background: linear-gradient(to right, #7a6337 0%, #705c32 100%);
  }
  &:before {
    height: 300px;
    width: 300px;
    border-radius: inherit;
    background: linear-gradient(to right, #e6ddb1 0%, #4c391f 100%);
  }
}

/* Texture detail */
.bez {
  z-index: 1;
  opacity: 1;
  position: absolute;
  @extend %ab-center;

  &:before,
  &:after {
    @extend %pseudo;
    @extend %ab-center;
    height: 0;
    width: 16px;
    top: -298px;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
  }

  &:before {
    border-bottom: 5px solid #7c6435;
    left: -5px;
  }
  &:after {
    border-top: 5px solid #fafaeb;
    left: 5px;
  }
}

@for $i from 0 through 96 {
  i.bez:nth-of-type(#{$i}) {
    transform: rotateZ(calc(3.75deg * #{$i}));
  }
}

/* Checkered background, border shine, and gradient overlay */
.face {
  width: 272px;
  height: 272px;
  position: absolute;
  @extend %ab-center;
  border-radius: 100%;

  //overflow:hidden;

  background: linear-gradient(
    to bottom,
    #e6d8ae 0%,
    #a48e64 25%,
    #a48e64 38%,
    #c4af85 60%,
    #dacb9e 80%,
    #fcfbfa 100%
  );
  box-shadow:
    inset 0 0 1px 1px #cec8bb,
    inset 0 0 2px 3px #a28e6a,
    inset 0 0 2px 5px #f4edd2,
    inset 0 0 1px 7px #a28e6a,
    inset 0 0 0 8px #d2c29c;

  /* Checkered BG */
  &:before {
    @extend %pseudo;
    @extend %ab-center;
    border-radius: 100%;
    height: 244px;
    width: 244px;
    background: #dfdcd3;
    box-shadow: inset 1px 1px 6px 2px rgba(0, 0, 0, 0.3);
    background-image: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 4px,
        #b4ab99 4px,
        #b4ab99 7px
      ),
      repeating-linear-gradient(-45deg, transparent, transparent 4px, #b4ab99 4px, #b4ab99 7px);
  }

  /* Shine */
  &:after {
    @extend %pseudo;
    @extend %ab-center;
    border-radius: 100%;
    height: 250px;
    width: 250px;
    box-sizing: content-box;
    border-top: 4px solid rgba(250, 250, 245, 0.8);
    border-bottom: 4px solid rgba(250, 250, 245, 0.8);
    transform: rotateZ(30deg);
    filter: blur(0.02em);
  }

  .gradient-overlay {
    @extend %ab-center;
    position: absolute;
    width: 244px;
    height: 244px;
    overflow: hidden;
    border-radius: 100%;

    &:before,
    &:after {
      @extend %pseudo;
      width: 135px;
      height: 135px;
      background: #ffecd9;
      transform: rotateZ(45deg);
      filter: blur(15px);
      mix-blend-mode: hard-light;
      opacity: 0.6;
      top: 55px;
    }

    &:before {
      left: -42px;
    }
    &:after {
      right: -42px;
    }
  }
}

/* Smaller content*/
.content-lower {
  position: absolute;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  top: 176px;
  color: $color-text;
  width: 100%;

  .sub-fine {
    text-transform: uppercase;
    font-size: 5px; /* Can't use em */
    letter-spacing: 0.04em;
    line-height: 1.3;
  }

  /* Could not add Rolex logo */
  .sub-swiss {
    position: absolute;
    top: 72px;
    width: 100%;
    text-transform: uppercase;
    font-size: 5px; /* Can't use em */
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    span {
      display: inline-block;
      position: relative;
    }
    span:nth-child(1) {
      margin-right: 1px;
      transform: rotateZ(4deg);
    }
    span:nth-child(2) {
      margin-left: 1px;
      transform: rotateZ(-4deg);
    }
  }
}

/* Rolex text */
.content-upper {
  color: $color-text;
  text-transform: uppercase;

  /* Crown */
  .logo {
    top: 54px;
    position: absolute;
    width: 24px;
    height: 24px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  .name {
    font-family: 'Rhodium Libre', serif;
    position: absolute;
    font-size: 0.625em; /* 10px */
    letter-spacing: 0.07em; /* 16px */
    text-align: center;
    width: 100%;
    top: 74px;
  }

  .sub-name {
    font-family: 'Roboto', sans-serif;
    position: absolute;
    text-align: center;
    top: 96px;
    width: 100%;
    line-height: 0.9;
    font-size: 0.5625em; /* 9px */
  }
}

/* Black outlines */
.black-outline {
  position: absolute;
  @extend %ab-center;
  height: 238px;
  width: 238px;
  border-radius: 100%;
  transform: rotateZ(-3deg);

  /* Square details */
  .outline-details {
    position: absolute;
    @extend %ab-center;
    height: 6px;
    width: 13px;

    &:after,
    &:before {
      @extend %pseudo;
      height: inherit;
      width: inherit;
      border-top: 1px solid rgba(0, 0, 0, 0.5);
      border-bottom: 1px solid rgba(0, 0, 0, 0.5);
      border-right: 1px solid rgba(0, 0, 0, 0.5);
    }
    &:after {
      top: -116px;
    }
    &:before {
      top: 116px;
    }
    &:nth-child(30):after {
      border-left: 1px solid rgba(0, 0, 0, 0.5);
    }
    &:nth-child(1):before,
    &:nth-child(2):before,
    &:nth-child(30):before {
      border-top: 0 solid transparent;
      border-right: 0 solid transparent;
    }
    &:nth-child(29):after {
      border-bottom: 0 solid transparent;
      border-right: 0 solid transparent;
    }
  }

  @for $i from 0 through 29 {
    .outline-details:nth-of-type(#{$i}) {
      transform: rotateZ(calc(6deg * #{$i}));
    }
  }
}

/* Five minute markers 6 and 9 */
.five-minute {
  position: absolute;
  @extend %ab-center;
  width: 8px;
  height: 29px;

  &:before,
  &:after {
    @extend %pseudo;
    width: inherit;
    height: inherit;
    background: #eae8e5;
    border: 1px solid #f0e7ca;
  }
  &:before {
    top: 95px;
    box-shadow:
      inset 1px 1px 1px 0 rgba(0, 0, 0, 0.3),
      0 1px 2px 1px rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid #705b2d;
  }
  &:after {
    transform: rotateZ(-90deg);
    left: -95px;
    box-shadow:
      inset -1px 0px 1px 0 rgba(0, 0, 0, 0.3),
      -1px 0px 2px 1px rgba(0, 0, 0, 0.5);
    border-left: 1px solid #705b2d;
    border-top: 1px solid #705b2d;
  }
}

/* Five minute markers 1, 2, 4, 5, 7, 8, 10, 11 */
.five-minute-markers {
  position: absolute;
  @extend %ab-center;
  width: inherit;
  height: inherit;

  &:before,
  &:after {
    @extend %pseudo;
    width: inherit;
    height: inherit;
    background: #eae8e5;
    box-shadow:
      inset -1px -1px 1px 0 rgba(0, 0, 0, 0.3),
      -1px -1px 2px 1px rgba(0, 0, 0, 0.5);
    border: 1px solid #f0e7ca;
    border-top: 1px solid #705b2d;
    border-left: 1px solid #705b2d;
  }
  &:before {
    top: -95px;
  }
  &:after {
    top: 95px;
  }
  &:nth-child(1):before,
  &:nth-child(2):before,
  &:nth-child(1):after,
  &:nth-child(2):after {
    border-top: 1px solid #f0e7ca;
    border-bottom: 1px solid #705b2d;
    border-left: 1px solid #705b2d;
    box-shadow:
      inset -1px 1px 1px 0 rgba(0, 0, 0, 0.3),
      -1px 1px 2px 1px rgba(0, 0, 0, 0.5);
  }

  &:nth-of-type(3) {
    display: none;
  }
}

@for $i from 0 through 5 {
  .five-minute-markers:nth-of-type(#{$i}) {
    transform: rotateZ(calc(-30deg * #{$i}));
  }
}

/* Border, glass, bg, day */
[class^='date-window'] {
  width: 58px;
  height: 48px;
  top: -3px;
  bottom: 0;
  margin: auto;
  right: 24px;
  position: absolute;
  border-radius: 26px / 36px;
  overflow: hidden;
}

.date-window {
  border: 2px solid #c3beb8;
  border-left: 0 solid transparent;
  box-shadow:
    inset 2px -2px 12px 2px rgba(255, 255, 255, 0.3),
    -2px 0 1px 0 rgba(0, 0, 0, 0.3);
  z-index: 1;

  /* Shine */
  &:after {
    @extend %pseudo;
    top: -120px;
    left: -80px;
    width: 172px;
    height: 420px;
    transform: rotateZ(-18deg);
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 48%,
      rgba(255, 255, 255, 0.8) 48%,
      rgba(255, 255, 255, 0) 68%
    );
  }
}

/* BG pattern */
.date-window-texture {
  background: #f8f8f5;
  background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      #e8e6df 6px,
      #e8e6df 8px
    ),
    repeating-linear-gradient(-45deg, transparent, transparent 4px, #e8e6df 6px, #e8e6df 8px);
  z-index: 0;
}

/* Date number */
#date {
  font-family: 'Krona One', sans-serif;
  position: absolute;
  top: 6px;
  bottom: 0;
  margin: auto;
  right: 30px;
  text-align: center;
  text-indent: -1px;
  letter-spacing: -0.06em;
  font-size: 1.5em; /* 24px */
  line-height: 1.3;
  color: #414242;
  height: 36px;
  width: 48px;
  background: #f8f8fa;
  border-top: 6px solid #c9c5bd;
  border-bottom: 2px solid #c9c5bd;
  border-left: 4px solid #a09891;
  border-right: 4px solid #a09891;
  box-shadow: inset -1px 1px 2px 0 rgba(0, 0, 0, 0.5);
  z-index: 0;
}

/* Second hand */
.hand-sec {
  @extend %ab-center;
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transform: rotateZ(88deg);

  &:after,
  &:before {
    @extend %pseudo;
  }

  /* Circles */
  &:after {
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background: #71644a;
    border: 3px solid #e5d396;
    box-shadow:
      inset 1px -2px 1px 0 #f4edd3,
      0 0 2px 1px rgba(0, 0, 0, 0.4);
  }

  /* Hand */
  &:before {
    bottom: -26px;
    left: 3px;
    width: 6px;
    height: 146px;
    clip-path: polygon(30% 0%, 70% 0, 100% 100%, 0% 100%);
    background: linear-gradient(to right, #fffbd2 35%, #69522e 100%);
  }

  .shadow {
    position: absolute;
    height: 140px;
    width: 0;
    bottom: -24px;
    left: 6px;
    z-index: -1;
    transform: rotateZ(2deg);
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.5);
  }
}

/* Minute hand */
.hand-min {
  @extend %ab-center;
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.3);
  transform: rotateZ(85deg);
  opacity: 1.6;
  background: linear-gradient(to right, #fefee9 50%, #977c44 51%);

  &:after,
  &:before {
    @extend %pseudo;
  }

  /* Arm */
  &:before {
    height: 125px;
    width: 12px;
    bottom: -12px;
    left: 2px;
    clip-path: polygon(25% 0%, 75% 0, 100% 100%, 0% 100%);
    background: inherit;
  }

  /* Indent */
  &:after {
    width: 4px;
    height: 62px;
    background: #fff;
    bottom: 44px;
    left: 6px;
    box-shadow: inset 1px 0 2px 0 rgba(0, 0, 0, 0.5);
  }

  .shadow {
    position: absolute;
    @extend %ab-center;
    height: 120px;
    left: -4px;
    width: 5px;
    bottom: 78px;
    box-shadow: 2px 0 4px 3px rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
}

/* Hour hand */
.hand-hour {
  @extend %ab-center;
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.3);
  background: linear-gradient(to right, #735d33 50%, #fefee9 51%);
  transform: rotateZ(80deg);

  &:after,
  &:before {
    @extend %pseudo;
  }

  /* Arm */
  &:before {
    height: 88px;
    width: 14px;
    bottom: -14px;
    left: 4px;
    clip-path: polygon(18% 0%, 82% 0, 100% 100%, 0% 100%);
    background: inherit;
  }

  /* Indent */
  &:after {
    width: 6px;
    height: 25px;
    background: #fff;
    bottom: 42px;
    left: 8px;
    box-shadow: inset -1px 0 3px 0 rgba(0, 0, 0, 0.5);
  }

  .shadow {
    position: absolute;
    @extend %ab-center;
    height: 84px;
    width: 8px;
    bottom: 38px;
    box-shadow: -2px 0 3px 2px rgba(0, 0, 0, 0.4);
    z-index: -1;
  }
}

/* Lug shadow */
.lug-bg {
  position: absolute;
  z-index: -1;
  width: 304px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  left: 6px;
  &:before,
  &:after {
    @extend %pseudo;
    border-bottom: 144px solid #7d7451;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    top: -26px;
  }
  &:after {
    transform: scaleY(-1);
    top: initial;
    left: 1px;
    bottom: -32px;
    border-bottom-color: #bfb281;
  }
}

/* Lug */
.lug {
  position: absolute;
  width: 64px;
  height: 130px;
  left: 11px;
  top: -27px;
  clip-path: polygon(78% 1%, 100% 0, 100% 100%, 8% 100%);

  /* Top right position */
  &:nth-child(2) {
    transform: scaleX(-1);
    right: 11px;
    left: initial;
  }

  /* Bottom left position */
  &:nth-child(3) {
    transform: scaleY(-1);
    top: initial;
    bottom: -34px;
  }

  /* Bottom right position */
  &:nth-child(4) {
    transform: scaleY(-1) scaleX(-1);
    top: initial;
    bottom: -34px;
    right: 11px;
    left: initial;
  }

  /* Top styling */
  &:nth-child(1),
  &:nth-child(2) {
    &:before {
      @extend %pseudo;
      width: 80px;
      height: inherit;
      transform: rotate(-8deg);
      top: 2px;
      background: linear-gradient(
        to bottom,
        #7a756b 2%,
        #e3dcc2 3%,
        #faf7ee 5%,
        #020000 5%,
        #020000 6%,
        #bbb082 8%,
        #ebe2bb 12%,
        #fdfdf1 24%,
        #f3efc6 60%
      );
    }
    &:after {
      @extend %pseudo;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 56px 30px 56px;
      border-color: transparent transparent #010101 transparent;
      bottom: 45px;
      left: -14px;
      transform: rotate(-38deg);
    }
  }

  /* Bottom styling */
  &:nth-child(3),
  &:nth-child(4) {
    &:before {
      @extend %pseudo;
      width: 80px;
      height: inherit;
      transform: rotate(-8deg);
      top: 2px;
      background: linear-gradient(
        to bottom,
        #e3dcc2 3%,
        #020000 4%,
        #020000 8%,
        #71683f 9%,
        #ebe2bb 16%,
        #f6e7b2 26%,
        #fdfdf1 40%
      );
    }
    &:after {
      @extend %pseudo;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 60px 32px 60px;
      border-color: transparent transparent #010101 transparent;
      bottom: 38px;
      left: -17px;
      transform: rotate(-38deg);
    }
  }
}

/* Band details */
.band {
  @extend %ab-center;
  position: absolute;
  height: 594px;
  top: 84px;
  width: 74px;

  /* Top */
  .band-detail-top-center {
    height: 46px;
    width: inherit;
    position: absolute;
    top: 8px;
    background: linear-gradient(
      to bottom,
      #666457 1%,
      #eae7dd 6%,
      #17140a 10%,
      #17140a 16%,
      #d3caa8 22%,
      #f7f4dd 30%,
      #f7f4dd 42%,
      #ab9862 48%,
      // one band
      #666457 51%,
      #eae7dd 56%,
      #17140a 60%,
      #17140a 66%,
      #d3caa8 72%,
      #f7f4dd 80%,
      #f7f4dd 92%,
      #ab9862 98%
    );

    &:before {
      @extend %pseudo;
      height: 8px;
      width: inherit;
      top: -8px;
      background: linear-gradient(to bottom, #17140a 30%, #d3caa8 31%, #f7f4dd 100%);
    }

    &:after {
      @extend %pseudo;
      width: inherit;
      height: 52px;
      bottom: -52px;
      background: linear-gradient(
        to bottom,
        #4f3e19 0%,
        #cfc7a8 7%,
        #a1985f 8%,
        #cfc7a8 9%,
        #a1985f 11%,
        #cfc7a8 12%,
        #17140a 14%,
        #17140a 18%,
        #faf6d7 20%,
        #fffdf3 40%,
        #8d7c49 48%,
        #ab9862 48%,
        // one band
        #4a391a 51%,
        #d2c895 54%,
        #a1985f 55%,
        #d2c895 60%,
        #17140a 60%,
        #17140a 64%,
        #f7f4dd 65%,
        #f7f4dd 80%,
        #ab9862 94%
      );
    }
  }

  /* Bottom */
  .band-detail-bottom-center {
    height: 28px;
    width: inherit;
    position: absolute;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      #17140a 4%,
      #fffdef 5%,
      #f0e9c1 20%,
      #907a46 52%,
      #17140a 54%,
      #17140a 70%,
      #b1a26b 72%,
      #d2cb9e 80%,
      #b1a26b 88%,
      #d2cb9e 90%,
      #17140a 96%
    );

    &:before {
      @extend %pseudo;
      width: inherit;
      height: 64px;
      bottom: 28px;
      background: linear-gradient(
        to bottom,
        #9c8e5d 0%,
        #bfae74 5%,
        #968851 5%,
        #bbb39c 10%,
        #1b100a 12%,
        #1b100a 13%,
        #e2dbac 14%,
        #fffbea 20%,
        #f2ebc4 26%,
        #af9e67 34%,
        #010102 36%,
        #010102 40%,
        #8d7e50 41%,
        #b3a673 46%,
        #010102 49%,
        #010102 50%,
        #f0e8c9 51%,
        #c6bd99 53%,
        #f9f2ca 65%,
        #fffbea 70%,
        #a2925d 84%,
        #1b100a 86%,
        #1b100a 92%,
        #8d7e50 94%,
        #b3a673 99%,
        #d3c382 100%
      );
    }

    &:after {
      @extend %pseudo;
      width: inherit;
      height: 92px;
      bottom: 92px;
      background: linear-gradient(
        to bottom,
        #f2ebc2 0%,
        #fffff2 12%,
        #c8bb88 18%,
        #17140a 20%,
        #e5d588 22%,
        #17140a 24%,
        #17140a 26%,
        #dcd8b8 27%,
        #fffff2 32%,
        #fffff2 45%,
        #f1eac3 48%,
        #b4a26a 56%,
        #17140a 58%,
        #17140a 60%,
        #b39f5d 61%,
        #17140a 63%,
        #b39f5d 64%,
        #17140a 66%,
        #17140a 67%,
        #dcd8b8 68%,
        #fffff2 74%,
        #fffff2 86%,
        #b09f64 94%,
        #645837 96%,
        #17140a 98%
      );
    }
  }
}

.band-detail-top-brushed {
  position: absolute;
  left: -39px;
  top: -7px;
  width: 152px;
  height: 16px;
  border-radius: 4px 4px 0 0;
  z-index: -1;
  background-image: linear-gradient(
    180deg,
    #5c4d36 10%,
    #f1eaca 12%,
    #a6925d 50%,
    #816d3b 60%,
    #816d3b 65%,
    #a6925d 70%,
    #7a6938 80%
  );
  &:before,
  &:after {
    @extend %pseudo;
    border-radius: 2% 2% 0 0 / 90% 90% 0 0;
  }
  &:before {
    top: 16px;
    height: 24px;
    width: 158px;
    left: -3px;
    background-image: linear-gradient(
      180deg,
      #45350f 8%,
      #e7dfbf 10%,
      #dbce9a 34%,
      #ab9b63 44%,
      #e8deb2 54%,
      #8c7744 80%,
      #6e592e 96%
    );
  }
  &:after {
    top: 40px;
    height: 28px;
    width: 164px;
    left: -6px;
    background-image: linear-gradient(
      180deg,
      #a4956a 8%,
      #faf3d4 9%,
      #dbce9a 38%,
      #ab9b63 46%,
      #e8deb2 52%,
      #8c7744 70%,
      #634a23 78%,
      #634a23 82%,
      #a29054 88%
    );
  }
}

.band-detail-top-brushed:nth-child(2) {
  top: 61px;
  width: 164px;
  border-radius: 0;
  height: 30px;
  left: -45px;
  box-shadow: 0 1px 0 1px #827a5f;
  background-image: linear-gradient(
    180deg,
    #62552a 4%,
    #faf3d4 9%,
    #dbce9a 38%,
    #917f47 46%,
    #e8deb2 52%,
    #876c2f 100%
  );
  &:before {
    top: 30px;
    border-radius: 0;
    width: inherit;
    left: 0;
    height: 28px;
    background-image: linear-gradient(
      180deg,
      #432e04 4%,
      #faf3d4 20%,
      #dbce9a 32%,
      #917f47 38%,
      #e8deb2 56%,
      #876c2f 100%
    );
  }
  &:after {
    display: none;
    opacity: 0;
  }
}

.band-detail-bottom-brushed {
  position: absolute;
  left: -33px;
  bottom: 1px;
  width: 140px;
  height: 14px;
  border-radius: 0 0 4% 4% / 0 0 100% 100%;
  z-index: -1;
  background-image: linear-gradient(180deg, #d1cba3 10%, #927e4a 70%, #5c4d36 84%);
  &:before,
  &:after {
    @extend %pseudo;
    border-radius: 0 0 2% 2% / 0 0 100% 100%;
  }
  &:before {
    bottom: 14px;
    left: -3px;
    height: 24px;
    width: 146px;
    background-image: linear-gradient(
      180deg,
      #aa9c6a 4%,
      #dbce9a 18%,
      #ab9b63 26%,
      #f7f4d4 32%,
      #e8deb2 60%,
      #8c7744 83%,
      #45350f 98%
    );
  }
  &:after {
    bottom: 38px;
    height: 32px;
    width: 152px;
    left: -6px;
    background-image: linear-gradient(
      180deg,
      #836a3b 3%,
      #aa9c6a 12%,
      #dbce9a 22%,
      #ab9b63 30%,
      #f7f4d4 54%,
      #e8deb2 66%,
      #8c7744 88%,
      #45350f 96%
    );
  }
}

.band-detail-bottom-brushed:nth-child(2) {
  position: absolute;
  left: -42px;
  bottom: 70px;
  width: 158px;
  height: 37px;
  border-radius: 0 0 2% 2% / 0 0 100% 100%;
  background-image: linear-gradient(
    180deg,
    #705c34 6%,
    #432e0b 10%,
    #705c34 14%,
    #b9aa6f 18%,
    #ebe1b9 36%,
    #c2b381 46%,
    #eee7bb 52%,
    #8e7b46 84%,
    #432e0b 96%
  );

  &:before,
  &:after {
    @extend %pseudo;
  }
  &:before {
    bottom: 37px;
    left: -3px;
    height: 38px;
    width: 164px;
    border-radius: 0 0 2% 2% / 0 0 80% 80%;
    background-image: linear-gradient(
      180deg,
      #3f2c11 3%,
      #7b5f35 8%,
      #c0b276 16%,
      #e4dbaf 32%,
      #9a8956 40%,
      #9a8956 48%,
      #eee7bb 52%,
      #e4dbaf 68%,
      #cabc87 74%,
      #91804c 88%,
      #9d8c5a 98%
    );
  }
  &:after {
    border-radius: 0 0 2px 2px;
    box-shadow: 0 -1px 0 1px #837445;
    bottom: 75px;
    height: 60px;
    width: 164px;
    left: -3px;
    background-image: linear-gradient(
      180deg,
      #f1eac2 28%,
      #c5b783 36%,
      #bbb184 40%,
      #50390d 43%,
      #b3a367 46%,
      #b9aa6d 48%,
      #e4dbaf 52%,
      #e4dbaf 56%,
      #9a8956 62%,
      #9a8956 66%,
      #eee7bb 74%,
      #e4dbaf 78%,
      #5c481e 88%,
      #998551 98%
    );
  }
}

/* Crown */
.crown {
  width: 24px;
  height: 48px;
  position: absolute;
  right: -22px;
  top: 0;
  bottom: 0;
  margin: auto;
  box-shadow: 6px 0 0 -5px #8c7c4f;
  border-radius: 10px;

  /* Bottom detail */
  &:before {
    @extend %pseudo;
    width: 8px;
    height: inherit;
    clip-path: polygon(0 10%, 100% 0, 100% 100%, 0 90%);
    background: linear-gradient(to bottom, #f7f1d1 0%, #977a35 40%, #37291b 70%, #877245 100%);
  }

  /* Top detail */
  &:after {
    @extend %pseudo;
    width: 8px;
    height: 43px;
    right: 0;
    top: 3px;
    clip-path: polygon(0 0, 100% 5%, 100% 95%, 0 100%);
    background: linear-gradient(
      to bottom,
      #010200 8%,
      #dbcd8f 11%,
      #fefff6 32%,
      #dbcd8f 84%,
      #010200 90%
    );
  }

  .crown-detail {
    position: absolute;
    z-index: 1;
    border-bottom: 3px solid #786e50;
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
    width: 14px;
    right: 5px;
    filter: drop-shadow(2px 0 0 #c0b079);

    &:before {
      @extend %pseudo;
      border-top: 3px solid #d1c398;
      border-left: 2px solid transparent;
      border-right: 2px solid transparent;
      height: 0;
      width: 14px;
      left: -2px;
      top: 3px;
      filter: drop-shadow(0 6px 0 #c2b693);
    }
    &:after {
      @extend %pseudo;
      border-bottom: 3px solid #faf7e0;
      border-left: 2px solid transparent;
      border-right: 2px solid transparent;
      height: 0;
      width: 14px;
      left: -2px;
      top: 6px;
    }

    &:nth-of-type(2) {
      top: 12px;
      border-bottom-color: #fdf8e1;
      &:before {
        border-top-color: #c5b577;
        filter: drop-shadow(0 6px 0 #eae3a5);
      }
      &:after {
        border-bottom-color: #020202;
      }
    }

    &:nth-of-type(3) {
      top: 24px;
    }
    &:nth-of-type(4) {
      top: 36px;
    }
  }
}

/* Day */
/* Window style */
.day-window-border {
  position: absolute;
  @extend %ab-center;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  clip-path: polygon(28% 0, 72% 0, 50% 50%, 50% 50%);
  box-shadow: inset 0 0 0 22px #968d7d;

  &:before {
    @extend %ab-center;
    @extend %pseudo;
    border-radius: inherit;
    width: 218px;
    height: 218px;
    clip-path: polygon(29% 0, 71% 0, 50% 50%, 50% 50%);
    box-shadow: inset 0 0 0 20px #b8af9f;
  }
}

/* Clip left and right */
.day-window {
  position: absolute;
  @extend %ab-center;
  border-radius: inherit;
  width: 218px;
  height: 218px;
  clip-path: polygon(31% 0, 69% 0, 50% 50%, 50% 50%);

  /* White window */
  &:before {
    @extend %ab-center;
    @extend %pseudo;
    border-radius: inherit;
    width: 214px;
    height: 214px;
    clip-path: polygon(31% 0, 69% 0, 50% 50%, 50% 50%);
    box-shadow:
      inset 0 0 1px 2px #635d58,
      inset 0 0 0 14px #fdf9fb;
  }
}

/* Rotate by 51.4285deg for proper day */

/* Rotate by 51.4285deg for proper day */
.day-wrapper {
  position: absolute;
  @extend %ab-center;
  width: 208px;
  height: 208px;
  border-radius: 50%;

  /* Monday
  transform:rotateZ(-51.4285deg);*/

  /* Tuesday
  transform:rotateZ(-102.857deg);*/

  /* Wednesday
  transform:rotateZ(-154.2855deg);*/

  /* Thursday
  transform:rotateZ(-205.714deg);*/

  /* Friday
  transform:rotateZ(-257.1425deg);*/

  /* Saturday
  transform:rotateZ(-308.571deg);*/

  /* Divide circle into 7 equal parts */
  .day {
    height: 104px;
    width: 100px;
    clip-path: polygon(50% 100%, 0 0, 100% 0);
    transform-origin: bottom center;
    position: absolute;
    left: 54px;
    top: 0;
    text-align: center;
    font-size: 12px;
    font-family: 'Cousine', monospace;
    color: #3a3737;
    text-transform: uppercase;
  }
}

.text-wrapper {
  transform-origin: bottom center;
  position: absolute;
  margin: auto;
  left: -5px;
  top: 0.08em;
  bottom: 0;
  right: 0;
}

.day {
  span {
    height: 100px;
    position: absolute;
    transform-origin: bottom center;
  }

  &:nth-child(1) {
    .text-wrapper {
      transform: rotateZ(-10.5deg);
    }
  }
  &:nth-child(2) {
    .text-wrapper {
      transform: rotateZ(-12.5deg);
    }
  }
  &:nth-child(3) {
    .text-wrapper {
      transform: rotateZ(-16.5deg);
    }
  }
  &:nth-child(4) {
    .text-wrapper {
      transform: rotateZ(-14.5deg);
    }
  }
  &:nth-child(5) {
    .text-wrapper {
      transform: rotateZ(-10.5deg);
    }
  }
  &:nth-child(6) {
    .text-wrapper {
      transform: rotateZ(-14deg);
    }
  }
  &:nth-child(7) {
    .text-wrapper {
      transform: rotateZ(-9.5deg);
    }
  }
}

@for $i from 0 through 7 {
  .day:nth-child(#{$i}) {
    transform: rotateZ(calc(51.4285deg * #{$i}));
  }
}

@for $i from 0 through 8 {
  .char#{$i} {
    transform: rotateZ(calc(4deg * #{$i}));
  }
}
</style>
