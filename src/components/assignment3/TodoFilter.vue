<script setup>
import { STATUS_OPTIONS } from '@/constants/todoStatuses'

defineProps({
  activeFilter: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['filter-change'])

const filterOptions = [
  { value: 'all', label: 'Все' },
  ...STATUS_OPTIONS,
]
</script>

<template>
  <div class="filter">
    <button
      v-for="option in filterOptions"
      :key="option.value"
      type="button"
      class="filter__btn"
      :class="{ 'filter__btn--active': activeFilter === option.value }"
      @click="emit('filter-change', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.filter__btn {
  padding: 0.5rem 0.875rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 500;
  background: var(--color-bg);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}

.filter__btn:hover {
  color: var(--color-text);
  border-color: var(--color-primary);
}

.filter__btn--active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
</style>
