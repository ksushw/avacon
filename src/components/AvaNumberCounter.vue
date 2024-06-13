<script lang="ts" setup>

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: 'gram'
  }
});

const emit = defineEmits(['update:model-value'])

const minus = () => {
  if (props.modelValue < 1) return;
  emit('update:model-value', props.modelValue - 1);
}

const plus = () => {
  emit('update:model-value', props.modelValue + 1);
}

</script>

<template>
  <div class="number-counter">
    <div @click="minus" class="number-counter__minus">
      <svg width="16" height="3" viewBox="0 0 16 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.01953 1.5H14.0137" stroke="#87878B" stroke-width="2.65" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="number-counter__value">
      {{ modelValue }} {{ unit }}
    </div>
    <div @click="plus" class="number-counter__plus">
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.99935 0.166504C8.69241 0.166504 9.26197 0.695293 9.32658 1.37143L9.33268 1.49984L9.33235 6.16584L13.9993 6.1665C14.7357 6.1665 15.3327 6.76346 15.3327 7.49984C15.3327 8.1929 14.8039 8.76246 14.1278 8.82707L13.9993 8.83317L9.33235 8.83284L9.33268 13.4998C9.33268 14.2362 8.73573 14.8332 7.99935 14.8332C7.30629 14.8332 6.73673 14.3044 6.67212 13.6282L6.66602 13.4998L6.66535 8.83284L1.99935 8.83317C1.26297 8.83317 0.666016 8.23622 0.666016 7.49984C0.666016 6.80677 1.19481 6.23722 1.87094 6.17261L1.99935 6.1665L6.66535 6.16584L6.66602 1.49984C6.66602 0.763458 7.26297 0.166504 7.99935 0.166504Z" fill="#3C3C43" fill-opacity="0.6"/>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.number-counter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 16px;
  background: var(--main-text-color);
  width: 100%;
  box-sizing: border-box;

  &__value {
    font-size: 16px;
    font-weight: 700;
  }

  &__plus, &__minus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #D9D9D933;
    border-radius: 4px;
  }
}
</style>