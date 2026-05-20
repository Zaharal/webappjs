export const TODO_STATUSES = {
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
}

export const STATUS_OPTIONS = [
  { value: TODO_STATUSES.NEW, label: 'Новая' },
  { value: TODO_STATUSES.IN_PROGRESS, label: 'В процессе' },
  { value: TODO_STATUSES.DONE, label: 'Выполнена' },
]

export function getStatusLabel(status) {
  const option = STATUS_OPTIONS.find((item) => item.value === status)
  return option ? option.label : status
}
