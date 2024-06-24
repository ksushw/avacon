<template>
  <div class="sport-bet" :style="{ backgroundImage: `url(${survey?.image_url})` }">
    <div class="sport-bet__buttons-group">
      <AvaButton size="xs" type="warning" block :disabled="isCompleted"
        @click="$emit('check', survey?.id, survey?.points[0].id)">
        WIN <span v-if="survey?.points[0] && survey?.points[0].is_completed">(YOUR VOTE)</span>
      </AvaButton>
      <AvaButton size="xs" type="warning" block :disabled="isCompleted"
        @click="$emit('check', survey?.id, survey?.points[1].id)">
        WIN <span v-if="survey?.points[1] && survey?.points[1].is_completed">(YOUR VOTE)</span>
      </AvaButton>
    </div>
    <AvaButton size="xs" block type="white" :disabled="isCompleted"
      @click="$emit('check', survey?.id, survey?.points[2].id)">
      GOAL DRAW <span v-if="survey?.points[2] && survey?.points[2].is_completed">(YOUR VOTE)</span>
    </AvaButton>
    <span v-if="isCompleted" class="voted">You have already voted, wait for the results</span>
  </div>
</template>
<script lang="ts" setup>

import type { PropType } from 'vue';
import type { ISurvey } from '@/types/survey';
import AvaButton from '@/components/AvaButton.vue';
import { computed } from 'vue';

const props = defineProps({
  survey: Object as PropType<ISurvey>,
  default: () => ({})
});

defineEmits(['check'])

const isCompleted = computed(() => (props.survey?.points[0] && props.survey?.points[0].is_completed) ||
  (props.survey?.points[1] && props.survey?.points[1].is_completed) ||
  (props.survey?.points[2] && props.survey?.points[2].is_completed))
</script>

<style lang="scss" scoped>
.sport-bet {
  width: calc(100vw - 32px);
  padding: 16px 22px;
  border-radius: 28px;
  height: 250px;
  background-size: 100% 100%;
  max-width: 500px;
  margin-top: 35px;

  @media (max-height: 500px) {
    border-radius: 15px;
    padding: 5px 15px;
    height: 155px;
    margin-bottom: 5px;
  }

  &__buttons-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 12px;
    margin-top: 130px;
    margin-bottom: 10px;

    @media (max-height: 500px) {
      column-gap: 5px;
      margin-top: 100px;
    }
  }

  .voted {
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    color: #FFFFFF;

    @media (max-height: 500px) {
      font-size: 10px;
    }
  }
}
</style>