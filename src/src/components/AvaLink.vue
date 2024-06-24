<script lang="ts" setup>
import router from '@/router';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  isExternal: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ''
  }
})

const openLink = () => {
  if (props.link && !props.isExternal) {
    router.push(props.link);
    return;
  }
  if (props.link && props.isExternal) {
    window.open(props.link);
    return;
  }
}
</script>

<template>
  <div @click="openLink" class="ava-link" :style="{ color }">
    {{ text }}
    <ArrowIcon/>
  </div>
</template>

<style lang="scss" scoped>
.ava-link {
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  color: #007AFF;
  margin-top: 12px;
  text-decoration: none;
  margin-bottom: 16px;
}
</style>