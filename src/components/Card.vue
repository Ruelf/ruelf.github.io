<template>
    <div class="bg-white dark:bg-gray-800 shadow-xl dark:shadow-2xl sm:rounded-lg">
        <div v-if="$slots.header" class="p-3 text-sm font-semibold text-gray-900 dark:text-gray-300 border-b border-gray-100 dark:border-gray-600 sm:rounded-t-lg">
            <slot name="header" />
        </div>

        <slot />
    </div>
</template>
