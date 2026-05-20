<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])

const newTaskText = ref('')

function submit() {
  const text = newTaskText.value.trim()
  if (!text) return

  emit('add', text)
  newTaskText.value = ''
}
</script>

<template>
  <form class="todo-form" @submit.prevent="submit">
    <input
      v-model="newTaskText"
      type="text"
      class="input"
      placeholder="Новая задача..."
    />
    <button type="submit" class="btn btn--primary">Добавить</button>
  </form>
</template>

<style scoped>
.todo-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.todo-form .input {
  flex: 1;
}

.todo-form .btn {
  flex-shrink: 0;
}
</style>
