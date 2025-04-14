<script setup lang="ts">
defineProps<{
    seconds: number;
}>();

function formatSeconds(seconds: number): string {
    seconds = Math.abs(Math.floor(seconds));

    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    return String(minutes) + ':' + String(seconds).padStart(2, '0');
}
</script>

<template>
    <div class="whitespace-nowrap">
        <span>{{ formatSeconds(seconds) }}</span>
        <span class="text-[0.5em] opacity-25">
            {{ String(Math.floor((seconds % 1) * 1000)).padStart(3, '0') }}
        </span>
    </div>
</template>
