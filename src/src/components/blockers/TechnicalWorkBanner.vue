<script setup lang="ts">
import icon from '@/assets/images/avacoinbutton.png'
import ListItem from '@/components/ListItem.vue'
import { useWebAppNavigation } from 'vue-tg'

const { openLink } = useWebAppNavigation()

</script>

<template>
  <div class="technical-work-banner">
    <div class="page__title black-color text-center mb-16">
      So sorry, technical
      work is currently
      underway......
    </div>

    <div class="text-center grey-color">
      Our service was closed for a short time to add new functionality.
      <span class="black-color fw-600">
        We will open very soon and we will be waiting for you
      </span>
    </div>

    <div class="banner">
      <img src="@/assets/images/banners/technical-banner.png" alt="technical">
    </div>

    <ListItem :item="{
      firstName: 'Join AVACOIN Channel',
      lastName: '',
      level: 'Subscribe for the latest updates',
      points: '',
      clickable: true,
      avatar: icon
    }" hideCoin class="clicker" icon-type="rounded"
      @click="openLink('https://t.me/avagoldcoin/142')"
    />
  </div>
</template>

<style lang="scss">
.technical-work-banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0eff5;
  padding-top: 40px;
  padding-inline: 16px;
  box-sizing: border-box;
  .list-item {
    background: #353535;
    padding: 6px 16px;
    border-radius: 24px;
    height: 70px !important;
    box-sizing: border-box;
    &__icon {
      width: 52px !important;
      min-width: 52px !important;
      height: 52px !important;
    }
  }
  .banner {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
    img {
      width: 254px;
    }
  }
}
</style>