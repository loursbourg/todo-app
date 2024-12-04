<script setup lang="ts">
import { computed, onMounted, } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodoStore } from '@/stores/todo';
import TodoItem from '@/components/TodoItem.vue';

const todoStore = useTodoStore()

const { filters } = storeToRefs(todoStore)

onMounted(() => {
    todoStore.fetchTodos()
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
    <div>
        <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" :toggle="todoStore.toggleTodo" />
    </div>
</template>
<style lang="scss" scoped></style>
