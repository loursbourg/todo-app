import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * This is a refactor of the legacy vue store code
 *
 */
export const useRefactoredTodoStore = defineStore('refactored-todos', () => {
  const todos = ref([
    { id: 1, title: 'Learn Vue 3', done: false },
    { id: 2, title: 'Build a to-do app', done: false },
  ])

  const markDone = (id: number) => {
    const todo = todos.value.find((t) => t.id === id)

    if (todo) {
      todo.done = !todo?.done
    }
  }
  return { todos, markDone }
})
