<script setup lang="ts">
import BaseButton from './BaseButton.vue';
</script>

<template>
    <BaseButton
        class="border border-gray-300 bg-white text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
    >
        <slot />
    </BaseButton>
</template>
