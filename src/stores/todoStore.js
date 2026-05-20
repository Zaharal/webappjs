import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { TODO_STATUSES } from '@/constants/todoStatuses'

const STORAGE_KEY = 'advanced-todos'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref(loadFromStorage())
  const filterStatus = ref('all')

  watch(
    tasks,
    (value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    },
    { deep: true },
  )

  const counters = computed(() => ({
    [TODO_STATUSES.NEW]: tasks.value.filter((t) => t.status === TODO_STATUSES.NEW).length,
    [TODO_STATUSES.IN_PROGRESS]: tasks.value.filter((t) => t.status === TODO_STATUSES.IN_PROGRESS).length,
    [TODO_STATUSES.DONE]: tasks.value.filter((t) => t.status === TODO_STATUSES.DONE).length,
    all: tasks.value.length,
  }))

  const filteredTasks = computed(() => {
    if (filterStatus.value === 'all') {
      return tasks.value
    }
    return tasks.value.filter((task) => task.status === filterStatus.value)
  })

  function addTask(text) {
    const trimmed = text.trim()
    if (!trimmed) return

    tasks.value.unshift({
      id: createId(),
      text: trimmed,
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
      task.text = text.trim()
    }
  }

  function updateTaskStatus(id, status) {
    const task = tasks.value.find((item) => item.id === id)
    if (task) {
      task.status = status
    }
  }

  function setFilter(status) {
    filterStatus.value = status
  }

  return {
    tasks,
    filterStatus,
    counters,
    filteredTasks,
    addTask,
    removeTask,
    updateTaskText,
    updateTaskStatus,
    setFilter,
  }
})
