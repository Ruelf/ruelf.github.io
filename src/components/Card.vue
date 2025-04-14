<script setup lang="ts">
withDefaults(
    defineProps<{
        forceRounded?: boolean;
    }>(),
    {
        forceRounded: false,
    },
);
</script>

<template>
    <div
        :class="[
            forceRounded ? 'rounded-lg' : 'sm:rounded-lg [&_.card]:rounded-lg',
        ]"
        class="card dark:white bg-black bg-opacity-5 shadow-xl dark:bg-white dark:bg-opacity-5 dark:shadow-2xl"
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
