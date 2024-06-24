<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { useRootStore } from '@/stores/root';
import { useBoosterStore } from '@/stores/booster'
import { ref, watch } from 'vue'
import { imageBaseUrl } from '@/constants'
import ball from '@/assets/images/icons/ball.png'
import CongratulationsLeafsAnimation from '@/components/CongratulationsLeafsAnimation.vue';
import { useWebAppHapticFeedback } from 'vue-tg'


const navs = [
  {
    title: 'Apps',
    icon: `${imageBaseUrl}/icons/apps.png`,
    path: '/apps'
  },
  {
    title: 'Tasks',
    icon: `${imageBaseUrl}/icons/tasks.png`,
    path: '/tasks',
    badge: true
  },
  {
    title: 'EURO',
    icon: ball,
    path: '/avabet'
  },
  {
    title: 'Earn',
    icon: `${imageBaseUrl}/icons/earn.png`,
    path: '/earn',
  },
  {
    title: 'Frens',
    icon: `${imageBaseUrl}/icons/frens.png`,
    path: '/frens'
  },
  {
    title: 'Profile',
    icon: `${imageBaseUrl}/icons/profile.png`,
    path: '/profile'
  },
  // {
  //   title: 'Boost',
  //   icon: boostIcon,
  //   path: '/booster'
  // },
  {
    title: 'Market',
    icon: `${imageBaseUrl}/icons/gold.svg`,
    path: '/market',
  },
  // {
  //   title: 'Team',
  //   icon: teamIcon,
  //   path: '/guild'
  // },

]

const isDev = import.meta.env?.VITE_USER_NODE_ENV === 'development'

if (isDev) {
  navs.push({
    title: 'Data',
    icon: `${imageBaseUrl}/icons/tasks.png`,
    path: '/test'
  })
}

const counterStore = useCounterStore()
const root = useRootStore()
const booster = useBoosterStore()
const isAnimation = ref(false);

const countClick = ref(100);

const hapticFeedback = useWebAppHapticFeedback()

function updateCounter() {
  // counterStore.clicked += 1
  // counterStore.count += 1
  counterStore.userPoints += 1;
  countClick.value -= 1;

  if (countClick.value > 0) {
    setTimeout(updateCounter, 10)
  } else {
    // counterStore.clicked = points.clickLimit.value
    // counterStore.count = saved
    countClick.value = 10;
    setTimeout(() => {
      isAnimation.value = false

    }, 2000)
  }
}

const vibrate = () => {
  hapticFeedback.notificationOccurred('success')
}

watch(() => booster.active, (val) => {
  if (val) {
    // saved = counterStore.count + points.clickLimit.value - counterStore.clicked
    updateCounter();
    isAnimation.value = true;
  }
})

</script>

<template>
  <footer class="footer">
    <CongratulationsLeafsAnimation v-if="isAnimation" />
    <div class="footer__scroll">
      <div v-if="root.userLoading" class="footer__scroll--loader"></div>
      <nav class="footer__nav">
        <router-link v-for="nav of navs" :key="nav.title" :to="nav.path" :class="['footer__link']">
          <span @click="vibrate">
            <img :src="nav.icon" :alt="nav.title">
            <span>{{ nav.title }}</span>
            <div v-if="nav?.badge" class="badge">1</div>
          </span>
        </router-link>
      </nav>
    </div>

  </footer>
</template>

<style scoped lang="scss">
.footer {

  &__scroll {
    overflow-x: auto;
    position: relative;
    margin-right: calc(-1 * var(--page-horizontal-offset));
    padding-right: var(--page-horizontal-offset);
    scrollbar-width: none;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      width: 0;
      display: none;
    }

    &--loader {
      width: 510px;
      height: 64px;
      position: absolute;
      top: 20px;
      left: 0;
      border-radius: 10px;
      background: linear-gradient(90deg, transparent 25%, #1f1f1f66 37%, transparent 63%);
      overflow: hidden;
      background-size: 400% 100%;
      animation: el-skeleton-loading 1.4s ease infinite;
      z-index: 5;

      @media (max-height: 500px) {
        height: 45px;
      }
    }
  }

  &__nav {
    display: flex;
    width: fit-content;
    border-radius: var(--base-border-radius);
    background: var(--block-backgrond);
    padding: 4px 8px;
    gap: 17px;
    margin-top: 20px;
  }

  &__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 500;
    width: 56px;
    height: 56px;
    gap: 4px;
    position: relative;
    color: var(--main-text-color);
    text-decoration: none;

    @media (max-height: 500px) {
      height: 45px;
    }

    img {
      height: 24px;
    }

    .badge {
      width: 17px;
      height: 16px;
      position: absolute;
      border-radius: 8px;
      background: #DA0B20;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      right: 0;
    }

    &.soon {
      position: relative;

      img,
      span {
        opacity: 0.6;
      }

      &::after {
        content: 'soon';
        top: 0;
        right: 0;
        position: absolute;
        background: #3B3B3B;
        border-radius: 4px;
        padding: 2px 4px;
        font-size: 10px;
        opacity: 1;
      }
    }

    &::before {
      content: '';
      position: absolute;
      right: -8px;
      height: 36px;
      top: 10px;
      border-left: 1px solid #ffffff;
      opacity: 0.4;
    }
  }
}

@media(max-height: 500px) {
  .footer {
    &__nav {
      margin-top: 5px;
      padding: 0 8px;

      .badge {
        width: 17px;
        height: 8px;
        font-size: 8px;
      }
    }

    &__link {
      height: 40px;
      font-size: 9px;
    }

    &__scroll {
      &--loader {
        top: 5px
      }
    }
  }
}
</style>