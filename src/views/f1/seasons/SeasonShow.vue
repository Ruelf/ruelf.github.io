<script setup lang="ts">
defineProps<{
    season?: number;
}>();
</script>

<template>
    <div class="px-2 text-4xl sm:px-0">
        {{ season }}
    </div>

    <RouterView />
</template>
