<script setup lang="ts">
import { range } from '@/utils';
</script>

<template>
    {{ range(0, 10).shuffle().join(', ') }}
</template>
