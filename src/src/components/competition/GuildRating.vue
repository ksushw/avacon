<script setup lang="ts">
import AvaButton from '@/components/AvaButton.vue';
import AvaButtonGroup from '@/components/AvaButtonGroup.vue';

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'typeChange', val: 'teams' | 'users'): void
}>()

function select(type: 'teams' | 'users') {
  emit('typeChange', type)
  emit('update:modelValue', false)
}


</script>

<template>
  <section v-if="props.modelValue" class="guild">
    <div class="guild__bg" @click="emit('update:modelValue', false)"></div>
    <div class="guild__body">
      <AvaButtonGroup>
        <AvaButton block small @click="select('teams')">
          Guild rating
        </AvaButton>
        <AvaButton block small @click="select('users')">
          Personal rating
        </AvaButton>
      </AvaButtonGroup>
      <AvaButton block small @click="emit('update:modelValue', false)">
        Cancel
      </AvaButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
.guild {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  transition: 0.3s;
  &__bg {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  &__body {
    width: 100%;
    position: relative;
    z-index: 1;
    padding: var(--page-horizontal-offset) 30px;
  }
}
</style>