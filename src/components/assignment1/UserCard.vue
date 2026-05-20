<script setup>
import { ref } from 'vue'
import PhotoUpload from './PhotoUpload.vue'

const userName = ref('')
const greetingVisible = ref(false)
const photoUrl = ref('')

function showGreeting() {
  if (userName.value.trim()) {
    greetingVisible.value = true
  }
}
</script>

<template>
  <section class="card user-card">
    <h2 class="section-title">Интерактивная карточка пользователя</h2>
    <p class="section-desc">Введите имя, нажмите «Показать» и загрузите фотографию</p>

    <div class="user-card__form">
      <label class="user-card__label" for="user-name">Ваше имя</label>
      <input
        id="user-name"
        v-model="userName"
        type="text"
        class="input"
        placeholder="Например, Алексей"
        autocomplete="name"
      />

      <button type="button" class="btn btn--primary user-card__show" @click="showGreeting">
        Показать
      </button>
    </div>

    <p v-if="greetingVisible && userName.trim()" class="user-card__greeting">
      Привет, <strong>{{ userName.trim() }}</strong>
    </p>

    <PhotoUpload v-model="photoUrl" />
  </section>
</template>

<style scoped>
.user-card__form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.user-card__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
}

.user-card__show {
  align-self: flex-start;
}

.user-card__greeting {
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
  padding: 0.75rem 1rem;
  background: #eef2ff;
  border-radius: 8px;
  color: var(--color-primary);
}

.user-card__greeting strong {
  font-weight: 600;
}
</style>
