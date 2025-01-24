<template>
    <table class="min-w-full divide-y dark:divide-gray-500">
        <thead v-if="$slots.head">
            <slot name="head" />
        </thead>

        <tbody
            v-if="$slots.body"
            class="divide-y divide-gray-200 dark:divide-gray-600"
        >
            <slot name="body" />
        </tbody>

        <tfoot v-if="$slots.foot">
            <slot name="foot" />
        </tfoot>
    </table>
</template>
