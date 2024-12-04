<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { onMounted, ref } from 'vue';

const todoStore = useTodoStore();

const title = ref('');

const addTodo = () => {
    todoStore.addTodo(title.value);
};

onMounted(() => {
    todoStore.fetchTodos();
});
</script>

<template>
    <div class="todo-input-container">
        <input type="text" v-model="title" class="todo-input" placeholder="Enter your task" aria-label="New Todo" />
        <button :onclick="addTodo" :disabled="title.length === 0" class="add-todo-btn">
            Add Todo
        </button>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/create-todo-form.scss' as *;
</style>
