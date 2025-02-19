<template>
    <div
        class="card dark:white bg-black bg-opacity-5 shadow-xl sm:rounded-lg dark:bg-white dark:bg-opacity-5 dark:shadow-2xl [&_.card]:rounded-lg"
    >
        <div
            v-if="$slots.header"
            class="border-b border-gray-100 p-3 text-sm font-semibold text-gray-900 sm:rounded-t-lg dark:border-gray-600 dark:text-gray-300"
        >
            <slot name="header" />
        </div>

        <slot />
    </div>
</template>
