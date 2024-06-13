<script setup lang="ts">

import UploadImage from '@/components/form/UploadImage.vue';
import AvaInput from '@/components/form/AvaInput.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import AvaButton from '@/components/AvaButton.vue';
import { useAxios } from '@/composables/useAxios';
import { useRootStore } from '@/stores/root';
import { useRouter } from 'vue-router';
import { BackButton } from 'vue-tg';

const root =  useRootStore()
const router = useRouter()

const file = ref()
const form = reactive({
  name: '',
  description: ''
})

const editMode = computed(() => !!root.user?.owned_team)

async function uploadImage() {
  if (!file.value) return

  const formData = new FormData();
  formData.append('field', 'file')
  formData.append('avatar_file', file.value)

  try {
    await useAxios("/team/avatar/", {
      method: 'PUT',
      data: formData,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    })
  } catch (error) {
    console.error(error);
  }
}

async function create() {
  try {
    await useAxios('/team/', {
      method: editMode.value ? 'PUT' : 'POST',
      data: {
        name: form.name,
        description: form.description
      }
    })
    await uploadImage()
    await root.fetchUser()
    await router.push(`/guild/${root.user?.owned_team?.id}`)
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  if (editMode.value) {
    form.name = root.user?.owned_team.name ?? ''
    form.description = root.user?.owned_team.description ?? ''
  }
})

</script>

<template>
  <BackButton
    @click="router.go(-1)"
  />
  <section class="page creating">
    <div class="page__title text-center">
      {{ editMode ? 'Edit your guild' : 'New guild creating' }}
    </div>

    <UploadImage v-model="file" :currentImage="root.user?.owned_team?.avatar_path" />

    <div class="creating__form">
      <AvaInput
        type="text"
        v-model="form.name"
        placeholder="Guild name"
        :disabled="editMode"
        hint="Enter your guild name and add an optional photo."
      />

      <AvaInput
        type="textarea"
        v-model="form.description"
        placeholder="Description (optional)"
        hint="Any details about yours, your guild, including tg links"
      />
    </div>

    <AvaButton
      :disabled="!form.name"
      :type="form.name ? 'primary' : 'info'"
      fixed
      block
      @click="create"
    >
      {{ editMode ? 'Save' : 'Create guild' }}
    </AvaButton>
  </section>
</template>

<style scoped lang="scss">
.creating {
  background: url("@/assets/images/guild/create-page-bg.png") no-repeat center 150%;
  background-size: 100%;
}
</style>