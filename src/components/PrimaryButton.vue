<script setup lang="ts">
import BaseButton from './BaseButton.vue'
</script>

<template>
    <BaseButton
        class="border border-transparent bg-gray-800 text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 disabled:opacity-50 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
    >
        <slot />
    </BaseButton>
</template>
