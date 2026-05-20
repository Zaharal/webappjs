<template>
  <div class="placeholder">
    <svg
      class="placeholder__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
      />
    </svg>
    <span class="placeholder__text">Загрузите фото</span>
  </div>
</template>

<style scoped>
.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  height: 100%;
  min-height: 200px;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border-radius: var(--radius);
  color: var(--color-text-muted);
}

.placeholder__icon {
  width: 48px;
  height: 48px;
  opacity: 0.5;
}

.placeholder__text {
  font-size: 0.875rem;
}
</style>
