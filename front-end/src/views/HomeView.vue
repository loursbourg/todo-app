<script setup lang="ts">
import { onMounted, } from 'vue';
import { useTodoStore } from '@/stores/todo';
import AppHeader from '@/components/AppHeader.vue';
import CreateTodoForm from '@/components/CreateTodoForm.vue';
import FiltersSection from '@/components/FiltersSection.vue';
import TodoList from '@/components/TodoList.vue';

const todoStore = useTodoStore()

onMounted(() => {
  todoStore.fetchTodos()
})

</script>

<template>
  <main class="app-container">
    <AppHeader />
    <FiltersSection />
    <TodoList />
    <CreateTodoForm />
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/home-view.scss' as *;
</style>
