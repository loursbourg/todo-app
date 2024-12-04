import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Todo } from '@/types/todo'
import useFetchBase from '@/utils/use-fetch-base'

export const useTodoStore = defineStore('todo', () => {
  const fetchBase = useFetchBase()
  /**
   * Todos array
   *
   */
  const todos = ref<Todo[]>([])
  /**
   * Fetches todos from API
   *
   */
  async function fetchTodos() {
    const response = await fetchBase(`/todos`, { method: 'GET' })
    todos.value = response as Todo[]
  }
  /**
   * Adds a new todo
   * @param title
   *
   */
  async function addTodo(title: string) {
    const response = await fetchBase(`/todos`, {
      method: 'POST',
      body: { title },
    })

    const todo = response as Todo
    todos.value.push(todo)
  }

  /**
   * Remove todo by id
   * @param id
   *
   */
  async function removeTodo(id: string) {
    const response = await fetchBase(`/todos/${id}`, {
      method: 'DELETE',
    })
    if (response) {
      todos.value = todos.value.filter((x) => x.id != id)
    }
    return response
  }
  /**
   * Toggle todo status by id
   * @param id
   *
   */
  async function toggleTodo(id: string) {
    const entry = todos.value.find((x) => x.id === id)
    const response = await fetchBase(`/todos/${id}/toggle`, {
      method: 'PUT',
      body: {
        completed: !entry?.completed,
      },
    })
    if (response) {
      if (entry) {
        entry.completed = !entry.completed
      }
    }
  }
  /**
   * Todos filter
   *
   */
  const filters = ref<{ status: 'all' | 'pending' | 'completed' }>({
    status: 'all',
  })
  return { todos, addTodo, toggleTodo, removeTodo, fetchTodos, filters }
})
