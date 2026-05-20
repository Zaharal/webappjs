<script setup>
import TodoTaskCard from './TodoTaskCard.vue'

defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  emptyMessage: {
    type: String,
    default: 'Задач не найдено',
  },
})

const emit = defineEmits(['update-text', 'update-status', 'remove'])
</script>

<template>
  <div class="task-list">
    <p v-if="tasks.length === 0" class="task-list__empty">
      {{ emptyMessage }}
    </p>

    <ul v-else class="task-list__items">
      <li v-for="task in tasks" :key="task.id">
        <TodoTaskCard
          :task="task"
          @update-text="(id, text) => emit('update-text', id, text)"
          @update-status="(id, status) => emit('update-status', id, status)"
          @remove="(id) => emit('remove', id)"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.task-list__empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: 2rem 1rem;
}

.task-list__items {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
