<template>
    <!-- Filters Section -->
    <div class="filters">
        <button class="filter-toggle" @click="toggleFilterDropdown">
            <span v-if="isDropdownOpen">Hide Filters</span>
            <span v-else>Show Filters</span>
        </button>

        <div v-if="isDropdownOpen" class="filter-dropdown">
            <label for="status-filter">Status</label>
            <select id="status-filter" v-model="todoStore.filters.status" @change="applyFilter">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, } from 'vue';
import { useTodoStore } from '@/stores/todo';

const todoStore = useTodoStore();

const isDropdownOpen = ref(false);

const toggleFilterDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const applyFilter = (ev: Event) => {
    type Status = 'all' | 'pending' | 'completed'
    const target = ev.target as HTMLSelectElement;
    todoStore.filters.status = (target?.value) as Status;
};
</script>

<style lang="scss" scoped>
@use '@/assets/filters-section.scss' as *;
</style>