<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todoStore'
import TodoCounters from './TodoCounters.vue'
import TodoFilter from './TodoFilter.vue'
import TodoTaskList from './TodoTaskList.vue'

const store = useTodoStore()
const { counters, filteredTasks, filterStatus } = storeToRefs(store)

const newTaskText = ref('')

function addTask() {
  store.addTask(newTaskText.value)
  newTaskText.value = ''
}
</script>

<template>
  <section class="card">
    <h2 class="section-title">Расширенный TODO List</h2>
    <p class="section-desc">
      Pinia store, счётчики по статусам, фильтрация и разделение на компоненты.
    </p>

    <TodoCounters :counters="counters" />

    <form class="add-form" @submit.prevent="addTask">
      <input
        v-model="newTaskText"
        type="text"
        class="input"
        placeholder="Новая задача..."
      />
      <button type="submit" class="btn btn--primary">Добавить</button>
    </form>

    <TodoFilter
      :active-filter="filterStatus"
      @filter-change="store.setFilter"
    />

    <TodoTaskList
      :tasks="filteredTasks"
      empty-message="Нет задач с выбранным статусом"
      @update-text="store.updateTaskText"
      @update-status="store.updateTaskStatus"
      @remove="store.removeTask"
    />
  </section>
</template>

<style scoped>
.add-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.add-form .input {
  flex: 1;
}
</style>
