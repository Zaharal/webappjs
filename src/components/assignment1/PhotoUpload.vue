<script setup>
import { ref } from 'vue'
import PhotoPlaceholder from './PhotoPlaceholder.vue'

const photoUrl = defineModel({ type: String, default: '' })

const fileInput = ref(null)

function openFilePicker() {
  fileInput.value?.click()
}

function onFileChange(event) {
  const file = event.target.files?.[0]
  if (!file || !file.type.startsWith('image/')) return

  // Освобождаем предыдущий blob URL, чтобы не утекала память
  if (photoUrl.value && photoUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(photoUrl.value)
  }

  photoUrl.value = URL.createObjectURL(file)
  event.target.value = ''
}
</script>

<template>
  <div class="photo-upload">
    <div class="photo-upload__preview">
      <img
        v-if="photoUrl"
        :src="photoUrl"
        alt="Фото пользователя"
        class="photo-upload__image"
      />
      <PhotoPlaceholder v-else />
    </div>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="photo-upload__input"
      @change="onFileChange"
    />

    <button type="button" class="btn btn--ghost photo-upload__btn" @click="openFilePicker">
      {{ photoUrl ? 'Изменить фото' : 'Загрузить фото' }}
    </button>
  </div>
</template>

<style scoped>
.photo-upload__preview {
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 1rem;
}

.photo-upload__image {
  display: block;
  width: 100%;
  max-height: 280px;
  object-fit: cover;
}

.photo-upload__input {
  display: none;
}

.photo-upload__btn {
  width: 100%;
}
</style>
