<script setup lang="ts">
import { ref } from 'vue';

const now = ref<Date>();

function update() {
    now.value = new Date();
}

setInterval(update, 10);
</script>

<template>
    <template v-if="now">
        <h1>
            <code>{{ BigInt(Math.floor(now.getTime() - 1420070400000)) << 22n }}</code>
        </h1>
        <p>{{ now.toDateString() }}</p>
        <p>{{ now.toTimeString() }}</p>
    </template>
</template>
