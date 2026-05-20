<script setup>
import { ref, watch } from 'vue'
import { STATUS_OPTIONS } from '@/constants/todoStatuses'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update-text', 'update-status', 'remove'])

const isEditing = ref(false)
const editText = ref(props.task.text)

watch(
  () => props.task.text,
  (value) => {
    if (!isEditing.value) {
      editText.value = value
    }
  },
)

function startEdit() {
  isEditing.value = true
  editText.value = props.task.text
}

function saveEdit() {
  const trimmed = editText.value.trim()
  if (trimmed) {
    emit('update-text', props.task.id, trimmed)
  }
  isEditing.value = false
}

function cancelEdit() {
  editText.value = props.task.text
  isEditing.value = false
}

function onStatusChange(event) {
  emit('update-status', props.task.id, event.target.value)
}
</script>

<template>
  <article class="todo-item" :class="`todo-item--${task.status}`">
    <div class="todo-item__body">
      <input
        v-if="isEditing"
        v-model="editText"
        type="text"
        class="input todo-item__edit"
        @keyup.enter="saveEdit"
        @keyup.escape="cancelEdit"
      />
      <p v-else class="todo-item__text">{{ task.text }}</p>
    </div>

    <div class="todo-item__actions">
      <select
        class="todo-item__select"
        :value="task.status"
        @change="onStatusChange"
      >
        <option
          v-for="option in STATUS_OPTIONS"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <template v-if="isEditing">
        <button type="button" class="btn btn--primary btn--sm" @click="saveEdit">
          Сохранить
        </button>
        <button type="button" class="btn btn--ghost btn--sm" @click="cancelEdit">
          Отмена
        </button>
      </template>
      <template v-else>
        <button type="button" class="btn btn--ghost btn--sm" @click="startEdit">
          Изменить
        </button>
        <button type="button" class="btn btn--danger btn--sm" @click="emit('remove', task.id)">
          Удалить
        </button>
      </template>
    </div>
  </article>
</template>

<style scoped>
.todo-item {
  padding: 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  transition: border-color 0.2s;
}

.todo-item--new {
  border-left: 4px solid var(--color-primary);
}

.todo-item--in_progress {
  border-left: 4px solid var(--color-warning);
}

.todo-item--done {
  border-left: 4px solid var(--color-success);
  opacity: 0.85;
}

.todo-item--done .todo-item__text {
  text-decoration: line-through;
  color: var(--color-text-muted);
}

.todo-item__body {
  margin-bottom: 0.75rem;
}

.todo-item__text {
  font-size: 1rem;
  word-break: break-word;
}

.todo-item__edit {
  width: 100%;
}

.todo-item__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.todo-item__select {
  padding: 0.375rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 0.875rem;
  background: var(--color-surface);
  margin-right: auto;
}

.btn--sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
}
</style>
