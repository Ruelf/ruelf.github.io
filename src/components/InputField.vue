<script setup lang="ts" generic="T">
const model = defineModel<T>();
</script>
<template>
    <input
        v-model="model"
        class="rounded-md border border-gray-300 px-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
    />
</template>
