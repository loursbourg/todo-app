<script setup lang="ts">
import { computed, onMounted, ref, } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodoStore } from '@/stores/todo';
import TodoItem from '@/components/TodoItem.vue';

const todoStore = useTodoStore()

const error = ref<string | null>(null);

const isLoading = ref(false);

const { filters } = storeToRefs(todoStore)

const fetchTodos = async () => {
    try {
        error.value = null;
        isLoading.value = true;
        await todoStore.fetchTodos()
    } catch (e: unknown) {
        error.value = e instanceof Error ? e.message : 'An unknown error occurred';
    }
    isLoading.value = false;
}

onMounted(() => {
    fetchTodos()
})

const filteredTodos = computed(() => {
    if (filters.value.status === 'completed') {
        return todoStore.todos.filter(todo => todo.completed);
    } else if (filters.value.status === 'pending') {
        return todoStore.todos.filter(todo => !todo.completed);
    } else {
        return todoStore.todos;
    }
});

</script>

<template>
    <div class="result-wrapper">
        <div class="status-container" v-if="error">
            <div class="error-alert" role="alert">
                <div class="error-message">Error: {{ (error) }}</div>
            </div>
        </div>
    </div>
    <div>
        <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" :toggle="todoStore.toggleTodo" />
    </div>
</template>
<style lang="scss" scoped></style>
