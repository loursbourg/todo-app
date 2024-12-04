<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { ref } from 'vue';

const todoStore = useTodoStore();

const title = ref('');
const error = ref<string | null>(null);
const isLoading = ref(false);

const addTodo = async () => {
    try {
        error.value = null;
        isLoading.value = true;
        await todoStore.addTodo(title.value);
        title.value = '';
    } catch (e: unknown) {
        error.value = e instanceof Error ? e.message : 'An unknown error occurred';
    }
    isLoading.value = false;
};


</script>

<template>
    <div class="result-wrapper">
        <div class="status-container" v-if="error">
            <div class="error-alert" role="alert">
                <div class="error-message">Error: {{ (error) }}</div>
            </div>
        </div>
    </div>
    <div class="todo-input-container">
        <input type="text" v-model="title" class="todo-input" placeholder="Enter your task" aria-label="New Todo" />
        <button :onclick="addTodo" :disabled="isLoading || title.length === 0" class="add-todo-btn">
            Add Todo
        </button>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/create-todo-form.scss' as *;
</style>
