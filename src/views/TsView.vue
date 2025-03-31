<script setup lang="ts">
import { computed, ref } from 'vue';

const input = ref();

function getType(value: unknown): string {
    if (value === null) {
        return 'null';
    } else if (typeof value === 'boolean') {
        return 'boolean';
    } else if (typeof value === 'string') {
        return 'string';
    } else if (typeof value === 'number') {
        return 'number';
    } else if (Array.isArray(value)) {
        return `Array<${value.length ? getType(value[0]) : 'unknown'}>`;
    } else if (typeof value === 'object') {
        return `{\n${Object.keys(value)
            .map(
                (key) =>
                    `${!key.match(/^[a-zA-Z0-9_\$]+$/)?.length ? JSON.stringify(key) : key}: ${getType((value as Record<string, unknown>)[key])};`,
            )
            .join('\n')}\n}`;
    } else {
        throw new Error('Unknown type');
    }
}

const output = computed(() => {
    try {
        const lines = getType(JSON.parse(input.value)).split('\n');

        // Chaos
        return `export type TestType = ${lines
            .map((line, index) => {
                return `${'    '.repeat(
                    (
                        lines
                            .filter((_, i) => i < index)
                            .join('\n')
                            .match(/{/g) || []
                    ).length -
                        (
                            lines
                                .filter((_, i) => i <= index)
                                .join('\n')
                                .match(/}/g) || []
                        ).length,
                )}${line}`;
            })
            .join('\n')};`;
    } catch (error) {
        // @ts-expect-error Shut up im too lazy to fix this
        return `Error: ${error.message}`;
    }
});
</script>

<template>
    <div
        class="* grid grid-cols-12 gap-4 *:col-span-6 *:max-h-[40rem] *:overflow-scroll"
    >
        <textarea
            v-model="input"
            rows="20"
            class="w-full rounded-md border border-gray-300 px-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
        ></textarea>

        <highlightjs language="typescript" :code="output" :style="'monokai-'" />
    </div>
</template>
