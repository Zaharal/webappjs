import { ref, watch } from 'vue'

/**
 * Синхронизирует ref с localStorage.
 * При изменении ref — сохраняет в storage, при инициализации — читает.
 */
export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key)
  let initial = defaultValue

  if (stored !== null) {
    try {
      initial = JSON.parse(stored)
    } catch {
      initial = defaultValue
    }
  }

  const data = ref(initial)

  watch(
    data,
    (value) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    { deep: true },
  )

  return data
}
