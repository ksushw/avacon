<template>
  <section class="socials">
    <div class="socials__icons">
      <a href="https://t.me/avagoldcoin" target="_blank">
        <img src='@/assets/images/social/telegram.svg' alt="telegram">
      </a>

      <a href="https://www.instagram.com/avagoldcoin/" target="_blank">
        <img src='@/assets/images/social/instagram.svg' alt="instagram">
      </a>

      <a href="https://twitter.com/avagoldcoin" target="_blank">
        <img src="@/assets/images/social/twitter.svg" alt="twitter">
      </a>
    </div>

    <div class="socials__text">
      Have any questions? Welcome to
      <a href="https://t.me/avagoldcoin_chat" target="_blank">our support in Telegram</a>
    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.socials {
  padding-top: 30px;
  padding-bottom: 30px;
  &__icons {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
  &__text {
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: var(--main-text-color);
    max-width: 300px;
    margin-inline: auto;
    margin-top: 16px;
    a {
      color: #487CB9;
      text-decoration: none;
    }
  }
}
</style>