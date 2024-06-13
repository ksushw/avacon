<script setup lang="ts">

import InviteFrenNote from '@/components/frens/InviteFrenNote.vue';
import { useRouter } from 'vue-router';
import { BackButton } from 'vue-tg';
import LeagueTable from '@/components/frens/LeagueTable.vue';
import InviteButton from '@/components/frens/InviteButton.vue';

const router = useRouter()

</script>

<template>
  <BackButton
    @click="router.push('/frens')"
  />

  <div class="page fren-detail">
    <div class="page__orange blur-fix"></div>
    <div class="page__title">
      Bonuses for frens
    </div>

    <div class="fren-detail__note">
      <InviteFrenNote />
    </div>

    <div class="page__title">
      Bonus for a frens transfer to a new league
    </div>

    <LeagueTable />

    <InviteButton type="warning" fixed />
  </div>
</template>

<style scoped lang="scss">
.fren-detail {
  &__note {
    padding: 16px;
    margin-bottom: 24px;
  }
}
</style>