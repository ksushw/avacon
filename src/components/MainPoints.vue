<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { useRootStore } from '@/stores/root';

const counterStore = useCounterStore()
const root = useRootStore()
</script>

<template>
  <section class="points">
    <div class="points__amount">
      <div v-if="root.userLoading" class="points__amount--loader"></div>
      <template v-else>
        <img src="@/assets/images/mini-coin.png" alt="coin">
        <div :style="`width: ${Math.floor(counterStore.userPoints)?.toLocaleString('en-US').length * 25}px`">
          {{ Math.floor(counterStore.userPoints)?.toLocaleString('en-US') ?? 0 }}
        </div>
      </template>

    </div>
    <div class="points__level">
      <div v-if="root.userLoading" class="points__level--loader"></div>
      <div class="token">
        AvaCoin Token
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.loading {
  background: linear-gradient(90deg, transparent 25%, #1f1f1f66 37%, transparent 63%);
  overflow: hidden;
  background-size: 400% 100%;
  animation: el-skeleton-loading 1.4s ease infinite;
}

.sending {
  animation: spin 1s cubic-bezier(.55, .15, .45, .85) infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.points {
  .token {
    color: #626262;
    font-size: 12px;
    margin-bottom: 25px;
    margin-top: 5px;
  }

  &__amount {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 48px;
    font-weight: 700;
    color: var(--main-text-color);

    @media (max-height: 700px) {
      font-size: 40px;
    }

    @media (max-height: 640px) {
      font-size: 35px;
    }

    @media (max-height: 600px) {
      font-size: 30px;
    }

    @media (max-height: 500px) {
      font-size: 25px;

    }

    img {
      height: 40px;
    }

    &--loader {
      @extend .loading;
      border-radius: var(--base-border-radius);
      width: 200px;
      height: 55px;

      @media (max-height: 500px) {
        height: 35px;

      }
    }
  }

  &__level {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 16px;
    color: var(--main-text-color);

    img {
      height: 32px;
    }

    &--loader {
      @extend .loading;
      width: 100px;
      height: 30px;
      margin-top: 2px;
      border-radius: var(--base-border-radius);
    }
  }
}
</style>