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
  <article class="task-card" :class="`task-card--${task.status}`">
    <input
      v-if="isEditing"
      v-model="editText"
      type="text"
      class="input"
      @keyup.enter="saveEdit"
      @keyup.escape="cancelEdit"
    />
    <p v-else class="task-card__text">{{ task.text }}</p>

    <div class="task-card__footer">
      <select
        class="task-card__select"
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

      <div class="task-card__buttons">
        <template v-if="isEditing">
          <button type="button" class="btn btn--primary btn--sm" @click="saveEdit">
            OK
          </button>
          <button type="button" class="btn btn--ghost btn--sm" @click="cancelEdit">
            ✕
          </button>
        </template>
        <template v-else>
          <button type="button" class="btn btn--ghost btn--sm" @click="startEdit">
            ✎
          </button>
          <button type="button" class="btn btn--danger btn--sm" @click="emit('remove', task.id)">
            🗑
          </button>
        </template>
      </div>
    </div>
  </article>
</template>

<style scoped>
.task-card {
  padding: 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

.task-card--new {
  border-left: 4px solid var(--color-primary);
}

.task-card--in_progress {
  border-left: 4px solid var(--color-warning);
}

.task-card--done {
  border-left: 4px solid var(--color-success);
}

.task-card--done .task-card__text {
  text-decoration: line-through;
  color: var(--color-text-muted);
}

.task-card__text {
  margin-bottom: 0.75rem;
  word-break: break-word;
}

.task-card__footer {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.task-card__select {
  flex: 1;
  padding: 0.375rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 0.875rem;
}

.task-card__buttons {
  display: flex;
  gap: 0.25rem;
}

.btn--sm {
  padding: 0.375rem 0.625rem;
  font-size: 0.8125rem;
}
</style>
