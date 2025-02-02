<template>
    <div class="bg-white shadow-xl sm:rounded-lg dark:bg-gray-800 dark:shadow-2xl">
        <div
            v-if="$slots.header"
            class="border-b border-gray-100 p-3 text-sm font-semibold text-gray-900 sm:rounded-t-lg dark:border-gray-600 dark:text-gray-300"
        >
            <slot name="header" />
        </div>

        <slot />
    </div>
</template>
