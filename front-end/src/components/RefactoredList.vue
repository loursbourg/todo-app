<template>
    <div>
        <h1>Todos</h1>
        <div v-for="todo in todos" :key="todo.id">
            <p>{{ todo.title }}</p>
            <button @click="markDone(todo.id)">
                {{ todo.done ? 'Done' : 'Pending' }}
            </button>
        </div>

        <h1>Important: </h1>
        <p>
            The data here is not persisted in DB.
            This is related to Part 4 and is included only to
            demonstrate the vue 3 refactoring process.
        </p>
    </div>
</template>

<script setup lang="ts">
import { useRefactoredTodoStore } from '@/stores/refactored-todos';
const { todos, markDone } = useRefactoredTodoStore()
</script>