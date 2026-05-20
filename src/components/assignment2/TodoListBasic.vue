<script setup>
import { computed } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { TODO_STATUSES } from '@/constants/todoStatuses'
import TodoForm from './TodoForm.vue'
import TodoItem from './TodoItem.vue'

const STORAGE_KEY = 'basic-todos'

const tasks = useLocalStorage(STORAGE_KEY, [])

const hasTasks = computed(() => tasks.value.length > 0)

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function addTask(text) {
  tasks.value.unshift({
    id: createId(),
    text,
    status: TODO_STATUSES.NEW,
    createdAt: Date.now(),
  })
}

function removeTask(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

function updateTaskText(id, text) {
  const task = tasks.value.find((item) => item.id === id)
  if (task) {
    task.text = text
  }
}

function updateTaskStatus(id, status) {
  const task = tasks.value.find((item) => item.id === id)
  if (task) {
    task.status = status
  }
}
</script>

<template>
  <section class="card">
    <h2 class="section-title">TODO List</h2>
    <p class="section-desc">
      Добавление, редактирование и удаление задач. Данные сохраняются в localStorage.
    </p>

    <TodoForm @add="addTask" />

    <p v-if="!hasTasks" class="empty">Задач пока нет. Добавьте первую!</p>

    <ul v-else class="todo-list">
      <li v-for="task in tasks" :key="task.id" class="todo-list__item">
        <TodoItem
          :task="task"
          @update-text="updateTaskText"
          @update-status="updateTaskStatus"
          @remove="removeTask"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: 2rem 1rem;
}

.todo-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
