<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import type { Todo } from '@/types/todo';

const todoStore = useTodoStore();

const props = defineProps<{
    todo: Todo;
    toggle: (id: string) => Promise<void>
}>();

const deleteTodo = () => {
    todoStore.removeTodo(props.todo.id);
};
</script>

<template>
    <div class="todo-item">
        <label class="todo-checkbox">
            <input type="checkbox" :checked="todo.completed" @change="() => toggle(todo.id)"
                aria-label="Toggle status" />
            <span class="checkmark"></span>
        </label>
        <div class="todo-details">
            <h3 class="todo-title">{{ todo.title }}</h3>
            <span class="todo-status">{{ todo.completed ? 'COMPLETED' : 'PENDING' }}</span>
        </div>
        <button class="delete-btn" @click="deleteTodo" aria-label="Delete Todo">Delete</button>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/todo-item.scss'
</style>
