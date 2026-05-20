<script setup>
import { STATUS_OPTIONS } from '@/constants/todoStatuses'

defineProps({
  counters: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="counters">
    <div
      v-for="option in STATUS_OPTIONS"
      :key="option.value"
      class="counters__item"
      :class="`counters__item--${option.value}`"
    >
      <span class="counters__value">{{ counters[option.value] ?? 0 }}</span>
      <span class="counters__label">{{ option.label }}</span>
    </div>
    <div class="counters__item counters__item--all">
      <span class="counters__value">{{ counters.all ?? 0 }}</span>
      <span class="counters__label">Всего</span>
    </div>
  </div>
</template>

<style scoped>
.counters {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

@media (min-width: 480px) {
  .counters {
    grid-template-columns: repeat(4, 1fr);
  }
}

.counters__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.875rem;
  border-radius: var(--radius);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
}

.counters__item--new .counters__value {
  color: var(--color-primary);
}

.counters__item--in_progress .counters__value {
  color: var(--color-warning);
}

.counters__item--done .counters__value {
  color: var(--color-success);
}

.counters__item--all .counters__value {
  color: var(--color-text);
}

.counters__value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.counters__label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 0.25rem;
  text-align: center;
}
</style>
