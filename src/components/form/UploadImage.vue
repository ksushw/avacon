<script setup lang="ts">
import { onMounted, ref } from 'vue';
import defaultIcon from '@/assets/images/upload-icon.png'

const props = defineProps<{
  currentImage?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: any): void
}>()

const defaultImage = ref(defaultIcon)
const previewImage = ref<string | null>(null);
const uploadStatus = ref<string>("");

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    uploadStatus.value = "Please select an image file";
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);

  if (file) {
    emit('update:modelValue', file)
  }
}

onMounted(() => {
  if (props.currentImage) {
    previewImage.value = props.currentImage
  }
})
</script>

<template>
  <div class="upload">
    <label for="file" class="upload__trigger">
      <span class="upload__preview" :style="{backgroundImage: `url(${previewImage || defaultImage})`}">
      </span>
      <input
        type="file"
        id="file"
        @change="handleFileChange"
        accept="image/*"
      >
    </label>
    <div class="upload__text">
      Set new photo
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload {
  margin-bottom: 24px;
  &__trigger {
    background: #141414;
    width: 100px;
    height: 100px;
    border-radius: 24px;
    margin: 0 auto;
    box-sizing: border-box;
    display: block;

    input {
      display: none;
    }
  }

  &__preview {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    border-radius: 24px;
  }

  &__text {
    text-align: center;
    font-size: 16px;
    line-height: 19px;
    margin-top: 12px;
    color: var(--warning-text-color);
  }
}
</style>