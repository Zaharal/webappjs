<script setup>
import { ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import UserCard from './components/assignment1/UserCard.vue'
import TodoListBasic from './components/assignment2/TodoListBasic.vue'
import TodoListAdvanced from './components/assignment3/TodoListAdvanced.vue'

const activeTab = ref(1)

const tabs = [
  { id: 1, label: 'Задание 1', subtitle: 'Карточка пользователя' },
  { id: 2, label: 'Задание 2', subtitle: 'TODO List' },
  { id: 3, label: 'Задание 3', subtitle: 'Расширенный TODO' },
]
</script>

<template>
  <div class="app">
    <AppHeader />

    <nav class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="tabs__item"
        :class="{ 'tabs__item--active': activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <span class="tabs__label">{{ tab.label }}</span>
        <span class="tabs__subtitle">{{ tab.subtitle }}</span>
      </button>
    </nav>

    <main class="main">
      <UserCard v-if="activeTab === 1" />
      <TodoListBasic v-if="activeTab === 2" />
      <TodoListAdvanced v-if="activeTab === 3" />
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1.25rem 3rem;
}

.tabs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tabs__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.875rem 1rem;
  border-radius: var(--radius);
  background: var(--color-surface);
  border: 2px solid transparent;
  text-align: left;
  box-shadow: var(--shadow);
}

.tabs__item:hover {
  border-color: var(--color-border);
}

.tabs__item--active {
  border-color: var(--color-primary);
  background: #eef2ff;
}

.tabs__label {
  font-weight: 600;
  font-size: 0.9375rem;
}

.tabs__subtitle {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.main {
  animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
